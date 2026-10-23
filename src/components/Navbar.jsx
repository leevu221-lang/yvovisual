import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Aperture, BookOpen, Image, User, Shield, LogOut, 
  Sparkles, ChevronUp, ChevronDown, Crown, GraduationCap, Eye 
} from 'lucide-react';

export default function Navbar() {
  const {
    currentUser,
    setCurrentUser,
    currentView,
    setCurrentView,
    switchRole,
    setAuthModalOpen,
    setAuthMode
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
          <div className="nav-actions">
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
                    background: currentUser.role === 'admin' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                    border: currentUser.role === 'admin' ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--border-glass)',
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
                      background: currentUser.role === 'admin' ? 'var(--gold-gradient)' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#08090b',
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}
                  >
                    {currentUser.role === 'admin' ? <Crown size={14} color="#000" /> : (currentUser.fullName ? currentUser.fullName.charAt(0) : 'U')}
                  </div>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: currentUser.role === 'admin' ? 'var(--gold-light)' : '#fff' }}>
                      {currentUser.fullName.split(' ').slice(-2).join(' ')}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: currentUser.role === 'admin' ? 'var(--gold-primary)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      {currentUser.role === 'admin' ? (
                        <>
                          <Shield size={10} />
                          <span>Quản Trị Viên</span>
                        </>
                      ) : (
                        <>
                          <GraduationCap size={10} />
                          <span>Học Viên</span>
                        </>
                      )}
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
          <span>Phân Quyền</span>
          {roleDockOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>

        {roleDockOpen && (
          <>
            <button
              className={`floating-role-pill ${!currentUser ? 'active' : ''}`}
              onClick={() => switchRole('guest')}
              title="Khách vãng lai: Chỉ xem ảnh và thả tim"
            >
              <Eye size={12} />
              <span>Khách</span>
            </button>
            <button
              className={`floating-role-pill ${currentUser?.role === 'student' ? 'active' : ''}`}
              onClick={() => switchRole('student')}
              title="Học viên: Đã sở hữu khóa học, học bài giảng & tải preset"
            >
              <GraduationCap size={12} />
              <span>Học Viên</span>
            </button>
            <button
              className={`floating-role-pill ${currentUser?.role === 'admin' ? 'active' : ''}`}
              onClick={() => switchRole('admin')}
              title="Quản trị viên: Upload ảnh, đổi album, quản trị doanh thu & bài học"
              style={currentUser?.role === 'admin' ? { background: 'var(--gold-gradient)', color: '#000', borderColor: 'var(--gold-primary)' } : {}}
            >
              <Crown size={12} />
              <span>Quản Trị</span>
            </button>
          </>
        )}
      </aside>
    </>
  );
}
