import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, BookOpen, Clock, Play, Download, Receipt, 
  Settings, CheckCircle2, ShieldCheck, Sparkles, Phone, 
  Calendar, FileText, Printer, X
} from 'lucide-react';

export default function UserProfile() {
  const { 
    currentUser, 
    courses, 
    orders, 
    setCurrentView, 
    setSelectedCourseId, 
    updateUserProfile,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'resources' | 'orders' | 'settings'
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Settings form state
  const [formName, setFormName] = useState(currentUser?.fullName || '');
  const [formPhone, setFormPhone] = useState(currentUser?.phoneNumber || '');
  const [formBio, setFormBio] = useState(currentUser?.bio || 'Học viên đam mê nhiếp ảnh chân dung và phóng sự cưới.');

  if (!currentUser) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px' }}>
          <User size={48} color="var(--gold-primary)" style={{ marginBottom: '16px' }} />
          <h2 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
            Vui Lòng Đăng Nhập
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Đăng nhập để xem danh sách khóa học của bạn và tải bộ Presets độc quyền.
          </p>
          <button 
            className="btn btn-gold"
            onClick={() => setCurrentView('courses')}
          >
            Khám Phá Khóa Học
          </button>
        </div>
      </div>
    );
  }

  // Filter enrolled courses
  const enrolledCourses = courses.filter(c => currentUser.enrolledCourses?.includes(c.id));

  // Filter orders for this user
  const userOrders = orders.filter(o => o.phoneNumber === currentUser.phoneNumber);

  const formatPrice = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Họ tên không được để trống', 'info');
      return;
    }
    updateUserProfile({
      fullName: formName.trim(),
      phoneNumber: formPhone.trim(),
      bio: formBio.trim()
    });
  };

  return (
    <div style={{ padding: '50px 0 100px' }}>
      <div className="container">
        {/* Profile Header Hero */}
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: 'var(--gold-gradient)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  color: '#000',
                  boxShadow: 'var(--gold-glow)'
                }}
              >
                {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>
                    {currentUser.fullName}
                  </h1>
                  <span className={`badge ${currentUser.role === 'admin' ? 'badge-gold' : 'badge-emerald'}`}>
                    {currentUser.role === 'admin' ? '👑 Quản Trị Viên' : '🎓 Học Viên Chính Thức'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} color="var(--gold-primary)" />
                    <span>{currentUser.phoneNumber}</span>
                  </div>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    <span>Tham gia: {currentUser.joinedDate || '2026-08-15'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill & Admin Shortcut */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {currentUser.role === 'admin' && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setCurrentView('admin')}
                  style={{ gap: '6px', border: '1px solid var(--border-gold)' }}
                >
                  <ShieldCheck size={16} />
                  <span>Vào Trang Quản Trị</span>
                </button>
              )}

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div className="gold-text font-serif" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  {enrolledCourses.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Khóa Học Sở Hữu</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div className="gold-text font-serif" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  {formatPrice(currentUser.totalSpent)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tổng Đã Đầu Tư</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '32px', overflowX: 'auto' }}>
          <button
            className={`btn btn-sm ${activeTab === 'courses' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setActiveTab('courses')}
          >
            <BookOpen size={16} />
            <span>Khóa Học Của Tôi ({enrolledCourses.length})</span>
          </button>

          <button
            className={`btn btn-sm ${activeTab === 'resources' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setActiveTab('resources')}
          >
            <Download size={16} />
            <span>Kho Tài Nguyên & Presets</span>
          </button>

          <button
            className={`btn btn-sm ${activeTab === 'orders' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setActiveTab('orders')}
          >
            <Receipt size={16} />
            <span>Lịch Sử Giao Dịch ({userOrders.length})</span>
          </button>

          <button
            className={`btn btn-sm ${activeTab === 'settings' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            <span>Cập Nhật Thông Tin</span>
          </button>
        </div>

        {/* TAB 1: ENROLLED COURSES */}
        {activeTab === 'courses' && (
          <div>
            {enrolledCourses.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <BookOpen size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: '#fff', marginBottom: '8px' }}>Bạn chưa đăng ký khóa học nào</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 20px' }}>
                  Khám phá các khóa học nhiếp ảnh và hậu kỳ chuẩn quốc tế của Y VÕ Visual để bắt đầu nâng tầm tay nghề!
                </p>
                <button className="btn btn-gold" onClick={() => setCurrentView('courses')}>
                  Xem Danh Sách Khóa Học
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                {enrolledCourses.map(course => (
                  <div key={course.id} className="glass-card" style={{ overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: '180px' }}>
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }} />
                      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                        <span className="badge badge-emerald">✓ Đã Mở Khóa</span>
                      </div>
                    </div>

                    <div style={{ padding: '20px' }}>
                      <h3 className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '10px', minHeight: '52px' }}>
                        {course.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        <Clock size={14} />
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.modules?.flatMap(m => m.lessons).length || 20} bài giảng</span>
                      </div>

                      <button
                        className="btn btn-gold"
                        style={{ width: '100%' }}
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setCurrentView('classroom');
                        }}
                      >
                        <Play size={16} />
                        <span>Vào Phòng Học Ngay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESOURCES & PRESETS */}
        {activeTab === 'resources' && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '6px' }}>
              Kho Tài Nguyên Dành Riêng Cho Bạn
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Tất cả các bộ Preset Lightroom, Action Photoshop và tệp RAW đính kèm theo các khóa học bạn đã sở hữu.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-primary)' }}>
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>Trọn Bộ 20 Cinematic Portrait Presets</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Định dạng: .XMP & .DNG (Lightroom PC/Mobile)</span>
                  </div>
                </div>
                <button
                  className="btn btn-outline-gold btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => showToast('Đang tải xuống bộ Presets 45MB...', 'success')}
                >
                  <Download size={14} /> Tải Về Trọn Bộ (45 MB)
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>Ebook & Sơ Đồ Bố Trí Đèn Studio PDF</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Tài liệu 120 trang in màu độ phân giải cao</span>
                  </div>
                </div>
                <button
                  className="btn btn-outline-gold btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => showToast('Đang tải xuống tài liệu Ebook...', 'success')}
                >
                  <Download size={14} /> Tải Về Ebook (28 MB)
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
                    <Download size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>Thư Viện 15 File RAW 61MP Thực Hành</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>File RAW gốc từ Sony A7R V & Hasselblad</span>
                  </div>
                </div>
                <button
                  className="btn btn-outline-gold btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => showToast('Đang tải thư viện file RAW...', 'success')}
                >
                  <Download size={14} /> Tải Thư Viện RAW (1.2 GB)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER HISTORY & INVOICE */}
        {activeTab === 'orders' && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '18px' }}>
              Lịch Sử Đơn Hàng & Giao Dịch
            </h3>

            {userOrders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>Chưa có giao dịch phát sinh nào trên tài khoản này.</p>
            ) : (
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mã Đơn Hàng</th>
                      <th>Khóa Học</th>
                      <th>Số Tiền</th>
                      <th>Phương Thức</th>
                      <th>Thời Gian</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map(order => (
                      <tr key={order.id}>
                        <td style={{ fontWeight: 600, color: 'var(--gold-light)' }}>{order.id}</td>
                        <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {order.courseTitle}
                        </td>
                        <td style={{ fontWeight: 700, color: '#fff' }}>{formatPrice(order.amount)}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{order.paymentMethod}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </td>
                        <td>
                          <span className={`badge ${order.status === 'PAID' ? 'badge-emerald' : 'badge-amber'}`}>
                            {order.status === 'PAID' ? '✓ Đã Thanh Toán' : 'Chờ Thanh Toán'}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setSelectedInvoice(order)}
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          >
                            <Receipt size={13} /> Xem Hóa Đơn
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS / PROFILE UPDATE */}
        {activeTab === 'settings' && (
          <div className="glass-panel" style={{ maxWidth: '600px', padding: '32px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '20px' }}>
              Cập Nhật Thông Tin Cá Nhân
            </h3>

            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label className="form-label">Họ và Tên:</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số Điện Thoại:</label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mô tả ngắn / Mục tiêu học tập:</label>
                <textarea
                  rows={3}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn btn-gold">
                <CheckCircle2 size={16} /> Lưu Thay Đổi
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Electronic Invoice Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div 
            className="modal-content"
            style={{ maxWidth: '580px', background: '#0e1117' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedInvoice(null)}
              title="Đóng"
            >
              <X size={18} />
            </button>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <div className="font-serif gold-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                    Y VÕ VISUAL ACADEMY
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>HÓA ĐƠN ĐIỆN TỬ DỊCH VỤ ĐÀO TẠO</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{selectedInvoice.invoiceNumber || selectedInvoice.id}</div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>ĐÃ THANH TOÁN</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem', marginBottom: '24px' }}>
                <div>
                  <div style={{ color: 'var(--text-dim)' }}>KHÁCH HÀNG:</div>
                  <strong style={{ color: '#fff' }}>{selectedInvoice.customerName}</strong>
                  <div style={{ color: 'var(--text-muted)' }}>SĐT: {selectedInvoice.phoneNumber}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)' }}>ĐƠN VỊ CUNG CẤP:</div>
                  <strong style={{ color: '#fff' }}>Học Viện Nhiếp Ảnh Y VÕ Visual</strong>
                  <div style={{ color: 'var(--text-muted)' }}>Tây Hồ, Hà Nội, Việt Nam</div>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  <span>NỘI DUNG</span>
                  <span>THÀNH TIỀN</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '0.9rem' }}>
                  <span style={{ color: '#fff' }}>{selectedInvoice.courseTitle}</span>
                  <strong style={{ color: 'var(--gold-light)' }}>{formatPrice(selectedInvoice.amount)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '0.95rem' }}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>Tổng Thanh Toán:</span>
                  <span className="gold-text font-serif" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                    {formatPrice(selectedInvoice.amount)}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Phương thức: {selectedInvoice.paymentMethod}
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    window.print();
                  }}
                >
                  <Printer size={14} /> In Hóa Đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
