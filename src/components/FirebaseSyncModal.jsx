import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Cloud, CloudOff, Check, RefreshCw, Key, 
  Database, HardDrive, ExternalLink, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { 
  getSavedFirebaseConfig, saveFirebaseConfig, clearFirebaseConfig, 
  initFirebase, testFirebaseConnection, batchSyncToCloud 
} from '../services/firebase';

export default function FirebaseSyncModal() {
  const { 
    firebaseModalOpen, setFirebaseModalOpen, 
    photos, albums, showToast, refreshFromCloud 
  } = useApp();

  const [config, setConfig] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  });

  const [rawJson, setRawJson] = useState('');
  const [inputMode, setInputMode] = useState('paste'); // 'paste' | 'fields'
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const saved = getSavedFirebaseConfig();
    if (saved) {
      setConfig(saved);
      setRawJson(JSON.stringify(saved, null, 2));
      const { isConfigured } = initFirebase(saved);
      setIsConnected(isConfigured);
    } else {
      setIsConnected(false);
    }
  }, [firebaseModalOpen]);

  if (!firebaseModalOpen) return null;

  const handleParseRawJson = (text) => {
    setRawJson(text);
    try {
      // Find JSON object even if user pasted "const firebaseConfig = { ... };"
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        // Convert JS object keys to valid JSON if needed
        let cleaned = match[0]
          .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
          .replace(/'/g, '"')
          .replace(/,\s*\}/g, '}');
        const parsed = JSON.parse(cleaned);
        if (parsed.apiKey && parsed.projectId) {
          setConfig(prev => ({ ...prev, ...parsed }));
          setTestResult({ type: 'success', message: `Đã nhận diện dự án: ${parsed.projectId}` });
        }
      }
    } catch {
      // ignore while typing
    }
  };

  const handleSaveAndConnect = async (e) => {
    e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    let targetConfig = { ...config };
    if (inputMode === 'paste' && rawJson.trim()) {
      try {
        const match = rawJson.match(/\{[\s\S]*\}/);
        if (match) {
          let cleaned = match[0]
            .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
            .replace(/'/g, '"')
            .replace(/,\s*\}/g, '}');
          targetConfig = JSON.parse(cleaned);
        }
      } catch (err) {
        setIsTesting(false);
        setTestResult({ type: 'error', message: 'Mã cấu hình JSON không hợp lệ: ' + err.message });
        return;
      }
    }

    if (!targetConfig.apiKey || !targetConfig.projectId) {
      setIsTesting(false);
      setTestResult({ type: 'error', message: 'Vui lòng cung cấp ít nhất apiKey và projectId' });
      return;
    }

    const res = await testFirebaseConnection(targetConfig);
    setIsTesting(false);

    if (res.success) {
      saveFirebaseConfig(targetConfig);
      initFirebase(targetConfig);
      setIsConnected(true);
      setTestResult({ type: 'success', message: 'Kết nối Firebase thành công!' });
      showToast('Đã kết nối thành công với Firebase Cloud!', 'success');
      if (refreshFromCloud) refreshFromCloud();
    } else {
      setTestResult({ 
        type: 'error', 
        message: `Lỗi kết nối: ${res.error}. Vui lòng kiểm tra lại apiKey và quyền truy cập Firestore.` 
      });
    }
  };

  const handleBatchSync = async () => {
    setIsSyncing(true);
    showToast('Đang đồng bộ dữ liệu lên Firebase Firestore...', 'info');
    const res = await batchSyncToCloud(photos, albums);
    setIsSyncing(false);

    if (res.success) {
      showToast(`Đã đồng bộ thành công ${res.countPhotos} tác phẩm và ${res.countAlbums} album lên Cloud!`, 'success');
    } else {
      showToast(`Lỗi đồng bộ: ${res.error || res.message}`, 'error');
    }
  };

  const handleDisconnect = () => {
    if (window.confirm('Bạn có chắc muốn ngắt kết nối Firebase trên máy này?')) {
      clearFirebaseConfig();
      setIsConnected(false);
      setConfig({
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
      });
      setRawJson('');
      setTestResult(null);
      showToast('Đã ngắt kết nối Firebase. Dữ liệu sẽ lưu cục bộ.', 'info');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 6, 8, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={() => setFirebaseModalOpen(false)}
    >
      <div
        style={{
          background: '#0e1117',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: isConnected ? 'rgba(34, 197, 94, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                border: isConnected ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isConnected ? '#22c55e' : 'var(--gold-primary)'
              }}
            >
              {isConnected ? <Cloud size={22} /> : <CloudOff size={22} />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Đồng Bộ Đám Mây Firebase
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                Lưu trữ ảnh và album vĩnh viễn trên Google Firebase
              </div>
            </div>
          </div>

          <button
            onClick={() => setFirebaseModalOpen(false)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-glass)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Current Status Box */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              background: isConnected ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: isConnected ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(239, 68, 68, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isConnected ? '#22c55e' : '#ef4444' }} />
              <div>
                <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.92rem' }}>
                  {isConnected ? `Đã kết nối với dự án: ${config.projectId}` : 'Chưa kết nối Firebase'}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {isConnected 
                    ? 'Ảnh và album đang được đồng bộ đám mây với cơ sở dữ liệu Firestore.' 
                    : 'Dữ liệu hiện tại chỉ lưu trên trình duyệt của máy bạn (localStorage).'}
                </div>
              </div>
            </div>

            {isConnected && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleBatchSync}
                  disabled={isSyncing}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '6px', fontSize: '0.8rem' }}
                >
                  <RefreshCw size={13} className={isSyncing ? 'spin' : ''} />
                  <span>{isSyncing ? 'Đang đẩy...' : 'Đẩy Tất Cả Lên Cloud'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#ef4444', fontSize: '0.8rem' }}
                >
                  Ngắt Kết Nối
                </button>
              </div>
            )}
          </div>

          {/* Quick Guide to get Firebase Config */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(212, 175, 55, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              marginBottom: '24px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--gold-light)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>Cách lấy mã cấu hình Firebase trong 2 phút (Hoàn toàn miễn phí):</span>
            </div>
            <ol style={{ paddingLeft: '18px', margin: '4px 0 0' }}>
              <li>Truy cập <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-primary)', textDecoration: 'underline' }}>console.firebase.google.com</a> và tạo một dự án mới (VD: <code>yvo-visual</code>).</li>
              <li>Bật <strong>Cloud Firestore</strong> (chọn Test mode để cho phép đọc/ghi).</li>
              <li>Vào <strong>Cài đặt dự án (Project settings)</strong> &gt; phần <strong>Ứng dụng của bạn (Your apps)</strong> &gt; chọn biểu tượng Web <strong>&lt;/&gt;</strong> để lấy đoạn mã <code>firebaseConfig</code>.</li>
              <li>Dán đoạn mã đó vào ô bên dưới và bấm <strong>"Kiểm Tra &amp; Kết Nối"</strong>.</li>
            </ol>
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSaveAndConnect}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label className="form-label" style={{ margin: 0, fontWeight: 600 }}>
                Cấu Hình Firebase (firebaseConfig)
              </label>

              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setInputMode('paste')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: inputMode === 'paste' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)',
                    color: inputMode === 'paste' ? '#000' : 'var(--text-muted)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Dán nhanh JSON / Đoạn mã
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('fields')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: inputMode === 'fields' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)',
                    color: inputMode === 'fields' ? '#000' : 'var(--text-muted)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Nhập từng trường
                </button>
              </div>
            </div>

            {inputMode === 'paste' ? (
              <div>
                <textarea
                  rows={7}
                  placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "yvo-visual.firebaseapp.com",\n  projectId: "yvo-visual",\n  storageBucket: "yvo-visual.appspot.com",\n  messagingSenderId: "123456789",\n  appId: "1:123456789:web:abcdef"\n};`}
                  value={rawJson}
                  onChange={(e) => handleParseRawJson(e.target.value)}
                  className="form-input"
                  style={{ fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical' }}
                />
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>apiKey *</label>
                  <input
                    type="text"
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.82rem' }}
                    placeholder="AIzaSy..."
                    required
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>projectId *</label>
                  <input
                    type="text"
                    value={config.projectId}
                    onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.82rem' }}
                    placeholder="yvo-visual"
                    required
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>authDomain</label>
                  <input
                    type="text"
                    value={config.authDomain}
                    onChange={(e) => setConfig({ ...config, authDomain: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.82rem' }}
                    placeholder="yvo-visual.firebaseapp.com"
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>storageBucket</label>
                  <input
                    type="text"
                    value={config.storageBucket}
                    onChange={(e) => setConfig({ ...config, storageBucket: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.82rem' }}
                    placeholder="yvo-visual.appspot.com"
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>messagingSenderId</label>
                  <input
                    type="text"
                    value={config.messagingSenderId}
                    onChange={(e) => setConfig({ ...config, messagingSenderId: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.82rem' }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>appId</label>
                  <input
                    type="text"
                    value={config.appId}
                    onChange={(e) => setConfig({ ...config, appId: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.82rem' }}
                  />
                </div>
              </div>
            )}

            {testResult && (
              <div
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: testResult.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: testResult.type === 'success' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: testResult.type === 'success' ? '#4ade80' : '#f87171',
                  fontSize: '0.84rem'
                }}
              >
                {testResult.message}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setFirebaseModalOpen(false)}
              >
                Đóng
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isTesting}
                style={{ gap: '8px' }}
              >
                {isTesting ? <RefreshCw size={15} className="spin" /> : <Check size={15} />}
                <span>{isTesting ? 'Đang kiểm tra...' : 'Kiểm Tra & Kết Nối'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
