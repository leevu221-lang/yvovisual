import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, UploadCloud, Image as ImageIcon, FolderPlus, 
  Trash2, Check, Sparkles, MapPin, Camera, Info, 
  Layers, Plus, Edit2, AlertCircle
} from 'lucide-react';

export default function UploadPhotoModal() {
  const { 
    uploadModalOpen, setUploadModalOpen, 
    editingPhoto, setEditingPhoto,
    albums, addAlbum, renameAlbum, deleteAlbum,
    savePhoto, deletePhoto, photos, showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('photo'); // 'photo' | 'albums'
  const [imageMode, setImageMode] = useState('file'); // 'file' | 'url'
  const [previewUrl, setPreviewUrl] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  
  // New Album inline input
  const [showNewAlbumInput, setShowNewAlbumInput] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');

  // Album edit states
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [editingAlbumLabel, setEditingAlbumLabel] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'wedding',
    aspectRatio: 'portrait',
    location: '',
    camera: 'Sony A7R V',
    lens: 'FE 50mm F1.2 GM',
    aperture: 'f/1.4',
    shutter: '1/800s',
    iso: '100',
    focalLength: '50mm',
    story: ''
  });

  const fileInputRef = useRef(null);

  // Synchronize when modal opens or editingPhoto changes
  useEffect(() => {
    if (editingPhoto) {
      setPreviewUrl(editingPhoto.image || '');
      setFormData({
        title: editingPhoto.title || '',
        category: editingPhoto.category || (albums[0]?.id || 'wedding'),
        aspectRatio: editingPhoto.aspectRatio || 'portrait',
        location: editingPhoto.location || '',
        camera: editingPhoto.camera || 'Sony A7R V',
        lens: editingPhoto.lens || 'FE 50mm F1.2 GM',
        aperture: editingPhoto.settings?.aperture || 'f/1.4',
        shutter: editingPhoto.settings?.shutter || '1/800s',
        iso: editingPhoto.settings?.iso || '100',
        focalLength: editingPhoto.settings?.focalLength || '50mm',
        story: editingPhoto.story || ''
      });
      setActiveTab('photo');
    } else {
      setPreviewUrl('');
      setFormData({
        title: '',
        category: albums[0]?.id || 'wedding',
        aspectRatio: 'portrait',
        location: '',
        camera: 'Sony A7R V',
        lens: 'FE 50mm F1.2 GM',
        aperture: 'f/1.4',
        shutter: '1/800s',
        iso: '100',
        focalLength: '50mm',
        story: ''
      });
    }
  }, [editingPhoto, uploadModalOpen, albums]);

  if (!uploadModalOpen) return null;

  // Client-side image compression using canvas
  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, WEBP)', 'error');
      return;
    }

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPreviewUrl(compressedDataUrl);
        setIsCompressing(false);

        // Auto detect aspect ratio
        if (width / height > 1.2) {
          setFormData(prev => ({ ...prev, aspectRatio: 'landscape' }));
        } else if (height / width > 1.2) {
          setFormData(prev => ({ ...prev, aspectRatio: 'portrait' }));
        } else {
          setFormData(prev => ({ ...prev, aspectRatio: 'square' }));
        }

        // Set default title if empty
        if (!formData.title) {
          const fileName = file.name.replace(/\.[^/.]+$/, "");
          setFormData(prev => ({ ...prev, title: fileName }));
        }
      };
      img.onerror = () => {
        setIsCompressing(false);
        showToast('Không thể đọc file ảnh này', 'error');
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      setIsCompressing(false);
      showToast('Lỗi khi tải tệp tin', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleCreateNewAlbum = (e) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;
    const created = addAlbum(newAlbumName);
    if (created) {
      setFormData(prev => ({ ...prev, category: created.id }));
      setNewAlbumName('');
      setShowNewAlbumInput(false);
    }
  };

  const handleSavePhoto = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      showToast('Vui lòng tải lên ảnh hoặc nhập URL hình ảnh', 'error');
      return;
    }
    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tên tác phẩm', 'error');
      return;
    }

    const photoPayload = {
      ...(editingPhoto || {}),
      title: formData.title.trim(),
      category: formData.category,
      image: previewUrl,
      aspectRatio: formData.aspectRatio,
      location: formData.location.trim() || 'Studio YVO Visual',
      camera: formData.camera.trim() || 'Sony A7R V',
      lens: formData.lens.trim() || 'FE 50mm F1.2 GM',
      settings: {
        aperture: formData.aperture.trim() || 'f/1.4',
        shutter: formData.shutter.trim() || '1/800s',
        iso: formData.iso.trim() || '100',
        focalLength: formData.focalLength.trim() || '50mm'
      },
      story: formData.story.trim() || 'Tác phẩm được ghi lại trong khoảnh khắc cảm xúc thăng hoa và ánh sáng tự nhiên tuyệt mỹ.',
      featured: editingPhoto ? editingPhoto.featured : true
    };

    savePhoto(photoPayload);
    setUploadModalOpen(false);
    setEditingPhoto(null);
  };

  const handleDeleteCurrentPhoto = () => {
    if (!editingPhoto) return;
    if (window.confirm(`Bạn có chắc chắn muốn xóa tác phẩm "${editingPhoto.title}" khỏi triển lãm không?`)) {
      deletePhoto(editingPhoto.id);
      setUploadModalOpen(false);
      setEditingPhoto(null);
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
      onClick={() => {
        setUploadModalOpen(false);
        setEditingPhoto(null);
      }}
    >
      <div
        style={{
          background: '#0e1117',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-gold font-display">YVO STUDIO ARCHIVE</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                {editingPhoto ? 'ID: ' + editingPhoto.id : 'MỚI'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', margin: '4px 0 0', letterSpacing: '-0.02em' }}>
              {editingPhoto ? 'Chỉnh Sửa Tác Phẩm & Đổi Album' : 'Tải Ảnh Mới Lên Bộ Sưu Tập'}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Tab switch button */}
            <button
              onClick={() => setActiveTab(activeTab === 'photo' ? 'albums' : 'photo')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.82rem', gap: '6px' }}
            >
              <Layers size={14} />
              <span>{activeTab === 'photo' ? 'Quản Lý Album' : 'Về Form Ảnh'}</span>
            </button>

            <button
              onClick={() => {
                setUploadModalOpen(false);
                setEditingPhoto(null);
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Đóng (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'albums' ? (
            /* ================= TAB: QUẢN LÝ ALBUM ================= */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    Danh Sách Album Ảnh ({albums.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                    Thêm mới, đổi tên hoặc xóa các phân loại album trong triển lãm.
                  </p>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowNewAlbumInput(true)}
                  style={{ gap: '6px' }}
                >
                  <Plus size={15} />
                  <span>Tạo Album Mới</span>
                </button>
              </div>

              {/* Add Album Bar */}
              {showNewAlbumInput && (
                <form
                  onSubmit={handleCreateNewAlbum}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--gold-primary)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '20px'
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nhập tên album mới (VD: Kỷ Yếu 2026, Du Lịch Châu Âu...)"
                    value={newAlbumName}
                    onChange={(e) => setNewAlbumName(e.target.value)}
                    className="form-input"
                    autoFocus
                    style={{ flex: 1, fontSize: '0.9rem' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Tạo Ngay
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setShowNewAlbumInput(false);
                      setNewAlbumName('');
                    }}
                  >
                    Hủy
                  </button>
                </form>
              )}

              {/* Albums List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {albums.map((album) => {
                  const count = photos.filter(p => p.category === album.id).length;
                  const isEditing = editingAlbumId === album.id;

                  return (
                    <div
                      key={album.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gold-primary)'
                          }}
                        >
                          <Layers size={18} />
                        </div>

                        {isEditing ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <input
                              type="text"
                              value={editingAlbumLabel}
                              onChange={(e) => setEditingAlbumLabel(e.target.value)}
                              className="form-input"
                              style={{ padding: '6px 12px', fontSize: '0.88rem', maxWidth: '300px' }}
                              autoFocus
                            />
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                renameAlbum(album.id, editingAlbumLabel);
                                setEditingAlbumId(null);
                              }}
                              style={{ padding: '6px 12px' }}
                            >
                              <Check size={14} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditingAlbumId(null)}
                              style={{ padding: '6px 12px' }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.95rem' }}>
                              {album.label}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                              Mã ID: <code style={{ color: 'var(--gold-light)' }}>{album.id}</code> • {count} tác phẩm
                            </div>
                          </div>
                        )}
                      </div>

                      {!isEditing && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setEditingAlbumId(album.id);
                              setEditingAlbumLabel(album.label);
                            }}
                            title="Đổi tên album"
                            style={{ padding: '6px 10px' }}
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              if (window.confirm(`Xóa album "${album.label}"? Các ảnh trong album này sẽ được tự động chuyển sang album khác.`)) {
                                deleteAlbum(album.id);
                              }
                            }}
                            title="Xóa album này"
                            style={{ padding: '6px 10px', color: '#f43f5e' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ================= TAB: UPLOAD / EDIT ẢNH ================= */
            <form onSubmit={handleSavePhoto}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '24px' }}>
                {/* Left Column: Image Upload Area & Preview */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label className="form-label" style={{ margin: 0, fontWeight: 600 }}>
                      Hình Ảnh Tác Phẩm *
                    </label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        type="button"
                        onClick={() => setImageMode('file')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          background: imageMode === 'file' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)',
                          color: imageMode === 'file' ? '#000' : 'var(--text-muted)',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Chọn Tệp
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageMode('url')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          background: imageMode === 'url' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)',
                          color: imageMode === 'url' ? '#000' : 'var(--text-muted)',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Nhập URL
                      </button>
                    </div>
                  </div>

                  {imageMode === 'file' ? (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '320px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '2px dashed var(--border-glass)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s'
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            processImageFile(e.target.files[0]);
                          }
                        }}
                        style={{ display: 'none' }}
                      />

                      {previewUrl ? (
                        <>
                          <img
                            src={previewUrl}
                            alt="Xem trước ảnh"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(0,0,0,0.45)',
                              opacity: 0,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              color: '#fff',
                              transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                          >
                            <UploadCloud size={28} />
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Bấm để đổi ảnh khác</span>
                          </div>
                        </>
                      ) : (
                        <div>
                          {isCompressing ? (
                            <div style={{ color: 'var(--gold-primary)' }}>
                              <Sparkles size={32} style={{ animation: 'spin 1.5s linear infinite', marginBottom: '8px' }} />
                              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Đang tối ưu dung lượng ảnh...</div>
                            </div>
                          ) : (
                            <>
                              <div
                                style={{
                                  width: '54px',
                                  height: '54px',
                                  borderRadius: '50%',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  margin: '0 auto 12px',
                                  color: 'var(--gold-primary)'
                                }}
                              >
                                <UploadCloud size={26} />
                              </div>
                              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                                Kéo thả hoặc bấm để chọn ảnh
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                                Hỗ trợ JPG, PNG, WEBP • Tự động nén tối ưu
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={previewUrl}
                        onChange={(e) => setPreviewUrl(e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.85rem', marginBottom: '12px' }}
                      />
                      <div
                        style={{
                          height: '270px',
                          background: '#12151c',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="URL preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={() => showToast('Không thể tải ảnh từ URL này', 'error')}
                          />
                        ) : (
                          <div style={{ color: 'var(--text-dim)', textAlign: 'center', fontSize: '0.84rem' }}>
                            <ImageIcon size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                            <div>Xem trước ảnh URL tại đây</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Aspect Ratio Selector */}
                  <div style={{ marginTop: '16px' }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>
                      Định Dạng Khung Hình
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      {[
                        { id: 'portrait', label: 'Dọc (3:4)' },
                        { id: 'landscape', label: 'Ngang (16:9)' },
                        { id: 'square', label: 'Vuông (1:1)' }
                      ].map(ar => (
                        <button
                          key={ar.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, aspectRatio: ar.id }))}
                          style={{
                            padding: '8px 4px',
                            borderRadius: 'var(--radius-sm)',
                            border: formData.aspectRatio === ar.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                            background: formData.aspectRatio === ar.id ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.02)',
                            color: formData.aspectRatio === ar.id ? 'var(--gold-light)' : 'var(--text-muted)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {ar.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Title, Album Selection, EXIF & Story */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Photo Title */}
                  <div>
                    <label className="form-label">
                      Tên Tác Phẩm / Bộ Ảnh *
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Hoàng Hôn Trên Đèo Ô Quy Hồ..."
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>

                  {/* Album Selector with Instant + Album Option */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="form-label" style={{ margin: 0 }}>
                        Thuộc Album / Danh Mục *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowNewAlbumInput(!showNewAlbumInput)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--gold-primary)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Plus size={13} />
                        <span>{showNewAlbumInput ? 'Đóng' : '+ Tạo album mới'}</span>
                      </button>
                    </div>

                    {showNewAlbumInput && (
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          marginBottom: '10px',
                          padding: '10px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--gold-primary)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Tên album mới..."
                          value={newAlbumName}
                          onChange={(e) => setNewAlbumName(e.target.value)}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.84rem' }}
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={handleCreateNewAlbum}
                          style={{ padding: '6px 12px' }}
                        >
                          Lưu
                        </button>
                      </div>
                    )}

                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="form-input"
                      style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                    >
                      {albums.map((album) => (
                        <option key={album.id} value={album.id}>
                          {album.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="form-label">
                      Địa Điểm Chụp
                    </label>
                    <div style={{ position: 'relative' }}>
                      <MapPin
                        size={15}
                        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-primary)' }}
                      />
                      <input
                        type="text"
                        placeholder="VD: Đỉnh đèo Ô Quy Hồ, Sapa, Lào Cai"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="form-input"
                        style={{ paddingLeft: '36px' }}
                      />
                    </div>
                  </div>

                  {/* EXIF Specs Accordion / Grid */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Camera size={15} color="var(--gold-primary)" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Thông Số Kỹ Thuật (EXIF Pro)
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '3px' }}>MÁY ẢNH</div>
                        <input
                          type="text"
                          placeholder="Sony A7R V"
                          value={formData.camera}
                          onChange={(e) => setFormData(prev => ({ ...prev, camera: e.target.value }))}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '3px' }}>ỐNG KÍNH</div>
                        <input
                          type="text"
                          placeholder="FE 50mm F1.2 GM"
                          value={formData.lens}
                          onChange={(e) => setFormData(prev => ({ ...prev, lens: e.target.value }))}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '3px' }}>KHẨU ĐỘ</div>
                        <input
                          type="text"
                          placeholder="f/1.4"
                          value={formData.aperture}
                          onChange={(e) => setFormData(prev => ({ ...prev, aperture: e.target.value }))}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '3px' }}>TỐC ĐỘ MÀN TRẬP</div>
                        <input
                          type="text"
                          placeholder="1/800s"
                          value={formData.shutter}
                          onChange={(e) => setFormData(prev => ({ ...prev, shutter: e.target.value }))}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '3px' }}>ĐỘ NHẠY SÁNG ISO</div>
                        <input
                          type="text"
                          placeholder="100"
                          value={formData.iso}
                          onChange={(e) => setFormData(prev => ({ ...prev, iso: e.target.value }))}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '3px' }}>TIÊU CỰ</div>
                        <input
                          type="text"
                          placeholder="50mm"
                          value={formData.focalLength}
                          onChange={(e) => setFormData(prev => ({ ...prev, focalLength: e.target.value }))}
                          className="form-input"
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div>
                    <label className="form-label">
                      Câu Chuyện Hậu Trường / Lời Bộc Bạch
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Cảm xúc, ánh sáng hoặc câu chuyện đặc biệt đằng sau bức ảnh này..."
                      value={formData.story}
                      onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                      className="form-input"
                      style={{ fontSize: '0.85rem', resize: 'vertical' }}
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                {editingPhoto ? (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleDeleteCurrentPhoto}
                    style={{ color: '#f43f5e', gap: '6px' }}
                  >
                    <Trash2 size={15} />
                    <span>Xóa Ảnh Này</span>
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setUploadModalOpen(false);
                      setEditingPhoto(null);
                    }}
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isCompressing}
                    style={{ gap: '8px' }}
                  >
                    <Check size={16} />
                    <span>{editingPhoto ? 'Cập Nhật Tác Phẩm' : 'Đăng Tác Phẩm Lên Triển Lãm'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
