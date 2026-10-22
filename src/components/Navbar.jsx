import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Aperture, BookOpen, Image, User, Shield, LogOut, Sparkles, ChevronUp, ChevronDown, Cloud, Check, RefreshCw } from 'lucide-react';

export default function Navbar() {
  const {
    currentUser,
    setCurrentUser,
    currentView,
    setCurrentView,
    switchRole,
    setAuthModalOpen,
    setAuthMode,
    setFirebaseModalOpen,
    isFirebaseConnected,
    cloudSyncStatus
  } = useApp();

  const [roleDockOpen, setRoleDockOpen] = useState(true);

  return (
    <>
      {/* Modern Minimalist Navigation Bar */}
      <header className="header-nav">
        <div className="container nav-container">
          {/* Brand Logo */}
          <div
            className="brand-logo"
            onClick={() => setCurrentView('portfolio')}
            title="Trang chủ YVO VISUAL"
          >
            <div className="brand-mark">
              <Aperture size={20} strokeWidth={1.8} />
            </div>
            <div>
              <div className="brand-name">YVO VISUAL</div>
              <div className="brand-sub">STUDIO & ARCHIVE</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <button
                  className={`nav-item-btn ${currentView === 'portfolio' ? 'active' : ''}`}
                  onClick={() => setCurrentView('portfolio')}
                >
                  <Image size={16} strokeWidth={1.8} />
                  Triển Lãm
                </button>
              </li>
              <li>
                <button
                  className={`nav-item-btn ${currentView === 'courses' ? 'active' : ''}`}
                  onClick={() => setCurrentView('courses')}
                >
                  <BookOpen size={16} strokeWidth={1.8} />
                  Khóa Học
                </button>
              </li>
              <li>
                <button
                  className={`nav-item-btn ${currentView === 'about' ? 'active' : ''}`}
                  onClick={() => setCurrentView('about')}
                >
                  <User size={16} strokeWidth={1.8} />
                  Tiểu Sử
                </button>
              </li>

              {currentUser && (
                <li>
                  <button
                    className={`nav-item-btn ${currentView === 'profile' ? 'active' : ''}`}
                    onClick={() => setCurrentView('profile')}
                  >
                    <span>Lớp Của Tôi</span>
                    {currentUser.enrolledCourses?.length > 0 && (
                      <span className="badge badge-gold" style={{ padding: '2px 7px', fontSize: '0.68rem' }}>
                        {currentUser.enrolledCourses.length}
                      </span>
                    )}
                  </button>
                </li>
              )}

              {currentUser?.role === 'admin' && (
                <li>
                  <button
                    className={`nav-item-btn ${currentView === 'admin' ? 'active' : ''}`}
                    onClick={() => setCurrentView('admin')}
                    style={{ border: '1px solid rgba(223, 203, 181, 0.4)', color: 'var(--gold-primary)' }}
                  >
                    <Shield size={16} strokeWidth={1.8} />
                    Quản Trị
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* User Account / Auth Actions */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Auto-Sync Cloud Status Pill */}
            <button
              onClick={() => setFirebaseModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: isFirebaseConnected 
                  ? (cloudSyncStatus === 'saving' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(34, 197, 94, 0.1)') 
                  : 'rgba(255, 255, 255, 0.04)',
                border: isFirebaseConnected 
                  ? (cloudSyncStatus === 'saving' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(34, 197, 94, 0.35)') 
                  : '1px solid var(--border-glass)',
                color: isFirebaseConnected 
                  ? (cloudSyncStatus === 'saving' ? '#38bdf8' : '#4ade80') 
                  : 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              title={
                isFirebaseConnected 
                  ? 'Chế độ Tự Động Lưu Cloud đang BẬT: Mọi thay đổi dữ liệu đều được lưu tự động lên Firebase' 
                  : 'Bấm để kết nối Firebase và kích hoạt tự động lưu đám mây'
              }
            >
              {isFirebaseConnected ? (
                cloudSyncStatus === 'saving' ? (
                  <>
                    <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Đang Auto Lưu...</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
                  </>
                ) : (
                  <>
                    <Check size={13} color="#22c55e" strokeWidth={2.5} />
                    <span>Auto Lưu: Bật</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34, 197, 94, 0.8)' }} />
                  </>
                )
              ) : (
                <>
                  <Cloud size={13} color="var(--gold-primary)" />
                  <span>Bật Auto Lưu Cloud</span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
                </>
              )}
            </button>

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  onClick={() => setCurrentView('profile')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '5px 14px 5px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glass)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="Xem trang cá nhân & khóa học đã sở hữu"
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#08090b',
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}
                  >
                    {currentUser.fullName ? currentUser.fullName.charAt(0) : 'Y'}
                  </div>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
                      {currentUser.fullName.split(' ').slice(-2).join(' ')}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      {currentUser.role === 'admin' ? 'Quản Trị Viên' : 'Học Viên'}
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentUser(null)}
                  title="Đăng xuất"
                  style={{ padding: '7px 10px', borderRadius: 'var(--radius-full)' }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                >
                  Đăng Nhập
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }}
                >
                  Đăng Ký
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Floating Demo Role Switcher Dock (Clean, Unobtrusive) */}
      <aside className="floating-role-dock" aria-label="Demo role selector">
        <button
          onClick={() => setRoleDockOpen(!roleDockOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--gold-primary)',
            padding: '4px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.74rem',
            fontWeight: 600
          }}
          title="Thu gọn / Mở rộng bảng chuyển vai trò demo"
        >
          <Sparkles size={13} />
          <span>Demo</span>
          {roleDockOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>

        {roleDockOpen && (
          <>
            <button
              className={`floating-role-pill ${!currentUser ? 'active' : ''}`}
              onClick={() => switchRole('guest')}
              title="Khách vãng lai"
            >
              Khách
            </button>
            <button
              className={`floating-role-pill ${currentUser?.role === 'student' ? 'active' : ''}`}
              onClick={() => switchRole('student')}
              title="Học viên đã mua khóa học"
            >
              Học Viên
            </button>
            <button
              className={`floating-role-pill ${currentUser?.role === 'admin' ? 'active' : ''}`}
              onClick={() => switchRole('admin')}
              title="Quản trị viên (Upload ảnh, quản lý khóa học)"
            >
              Quản Trị
            </button>
          </>
        )}
      </aside>
    </>
  );
}
