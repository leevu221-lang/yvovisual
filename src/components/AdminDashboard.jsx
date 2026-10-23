import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, DollarSign, Users, BookOpen, Image, Plus, 
  Trash2, Edit, Check, Search, Filter, CheckCircle2, 
  TrendingUp, Award, Camera, MapPin, Eye, X, Sparkles
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    currentUser, 
    courses, 
    saveCourse, 
    deleteCourse, 
    photos, 
    savePhoto, 
    deletePhoto, 
    orders, 
    completePayment, 
    users, 
    grantCourseAccess,
    setCurrentView,
    switchRole,
    showToast 
  } = useApp();

  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'courses' | 'photos' | 'orders' | 'users'

  // Admin Access Guard
  if (currentUser?.role !== 'admin') {
    return (
      <div className="container" style={{ padding: '80px 20px', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '520px', padding: '48px 36px', textAlign: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--gold-primary)' }}>
            <Shield size={32} />
          </div>
          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>KHU VỰC BẢO MẬT</span>
          <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
            Yêu Cầu Quyền Quản Trị Viên (Admin)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '28px' }}>
            Bạn hiện đang ở chế độ: <strong style={{ color: '#fff' }}>{currentUser ? (currentUser.role === 'student' ? 'Học Viên' : currentUser.role) : 'Khách vãng lai'}</strong>. 
            Khu vực Quản trị chỉ dành riêng cho Quản trị viên để theo dõi doanh thu, kích hoạt khóa học và quản trị tác phẩm.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              className="btn btn-gold btn-lg" 
              onClick={() => switchRole('admin')}
              style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
            >
              <Sparkles size={18} />
              <span>Đăng Nhập Quyền Quản Trị Viên (Y Võ)</span>
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setCurrentView('portfolio')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Quay Lại Trang Triển Lãm</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Photo modal state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'portrait',
    image: '',
    aspectRatio: 'portrait',
    camera: 'Sony A7R V',
    lens: 'FE 50mm F1.2 GM',
    settings: {
      aperture: 'f/1.4',
      shutter: '1/500s',
      iso: '100',
      focalLength: '50mm'
    },
    location: '',
    story: '',
    featured: false
  });

  // Course modal state
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    subtitle: '',
    category: 'portrait',
    badge: 'Masterclass',
    level: 'Trung cấp - Master',
    duration: '16 giờ học • 20 bài giảng',
    originalPrice: 3000000,
    salePrice: 1690000,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85',
    instructor: 'Nhiếp ảnh gia Y Võ',
    description: ''
  });

  // User search
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState('ALL');

  // Stats calculation
  const totalRevenue = orders
    .filter(o => o.status === 'PAID')
    .reduce((sum, o) => sum + (o.amount || 0), 0);

  const totalStudents = users.filter(u => u.role !== 'admin').length;
  const totalOrdersPaid = orders.filter(o => o.status === 'PAID').length;

  const formatPrice = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);
  };

  // Open photo editor
  const handleOpenPhotoModal = (photo = null) => {
    if (photo) {
      setEditingPhoto(photo);
      setPhotoForm({ ...photo });
    } else {
      setEditingPhoto(null);
      setPhotoForm({
        title: '',
        category: 'portrait',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
        aspectRatio: 'portrait',
        camera: 'Sony A7R V',
        lens: 'FE 50mm F1.2 GM',
        settings: {
          aperture: 'f/1.4',
          shutter: '1/800s',
          iso: '100',
          focalLength: '50mm'
        },
        location: 'Y Võ Visual Studio, Hà Nội',
        story: 'Khoảnh khắc chụp với ánh sáng tự nhiên.',
        featured: false
      });
    }
    setPhotoModalOpen(true);
  };

  const handleSavePhotoForm = (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.image) {
      showToast('Vui lòng nhập tiêu đề và link ảnh', 'info');
      return;
    }
    savePhoto({
      ...(editingPhoto || {}),
      ...photoForm
    });
    setPhotoModalOpen(false);
  };

  // Open course editor
  const handleOpenCourseModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm({ ...course });
    } else {
      setEditingCourse(null);
      setCourseForm({
        title: '',
        subtitle: '',
        category: 'portrait',
        badge: 'Khóa học mới 2026',
        level: 'Mọi cấp độ',
        duration: '12 giờ học • 16 bài giảng',
        originalPrice: 2500000,
        salePrice: 1290000,
        thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=85',
        instructor: 'Nhiếp ảnh gia Y Võ',
        description: 'Mô tả chi tiết nội dung khóa học...'
      });
    }
    setCourseModalOpen(true);
  };

  const handleSaveCourseForm = (e) => {
    e.preventDefault();
    if (!courseForm.title) {
      showToast('Vui lòng nhập tên khóa học', 'info');
      return;
    }
    saveCourse({
      ...(editingCourse || {}),
      ...courseForm,
      originalPrice: Number(courseForm.originalPrice),
      salePrice: Number(courseForm.salePrice)
    });
    setCourseModalOpen(false);
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.phoneNumber.includes(orderSearch) ||
                        o.customerName.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = orderFilterStatus === 'ALL' || o.status === orderFilterStatus;
    return matchSearch && matchStatus;
  });

  const filteredUsers = users.filter(u => {
    return u.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
           u.phoneNumber.includes(userSearch);
  });

  return (
    <div style={{ padding: '50px 0 100px' }}>
      <div className="container">
        {/* Admin Header */}
        <div className="glass-panel" style={{ padding: '24px 32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212,175,55,0.15)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-primary)' }}>
                <Shield size={26} />
              </div>
              <div>
                <h1 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff', margin: 0 }}>
                  Trung Tâm Quản Trị Hệ Thống (Admin Portal)
                </h1>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                  Xin chào, {currentUser?.fullName || 'Quản trị viên Y Võ Visual'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-gold btn-sm" onClick={() => handleOpenCourseModal()}>
                <Plus size={15} /> Thêm Khóa Học Mới
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleOpenPhotoModal()}>
                <Plus size={15} /> Thêm Ảnh Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '32px', overflowX: 'auto' }}>
          <button
            className={`btn btn-sm ${adminTab === 'overview' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setAdminTab('overview')}
          >
            <TrendingUp size={16} />
            <span>Tổng Quan & Doanh Thu</span>
          </button>

          <button
            className={`btn btn-sm ${adminTab === 'courses' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setAdminTab('courses')}
          >
            <BookOpen size={16} />
            <span>Quản Lý Khóa Học ({courses.length})</span>
          </button>

          <button
            className={`btn btn-sm ${adminTab === 'photos' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setAdminTab('photos')}
          >
            <Image size={16} />
            <span>Quản Lý Gallery Ảnh ({photos.length})</span>
          </button>

          <button
            className={`btn btn-sm ${adminTab === 'orders' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setAdminTab('orders')}
          >
            <DollarSign size={16} />
            <span>Đơn Hàng & Thanh Toán ({orders.length})</span>
          </button>

          <button
            className={`btn btn-sm ${adminTab === 'users' ? 'btn-gold' : 'btn-secondary'}`}
            onClick={() => setAdminTab('users')}
          >
            <Users size={16} />
            <span>Quản Lý Học Viên ({users.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {adminTab === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>DOANH THU ĐÃ THU</span>
                  <DollarSign size={20} color="var(--gold-primary)" />
                </div>
                <div className="font-serif gold-text" style={{ fontSize: '2rem', fontWeight: 800 }}>
                  {formatPrice(totalRevenue)}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', marginTop: '6px' }}>
                  +24.5% so với tháng trước
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ĐƠN HÀNG THÀNH CÔNG</span>
                  <CheckCircle2 size={20} color="var(--accent-emerald)" />
                </div>
                <div className="font-serif" style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                  {totalOrdersPaid} đơn
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                  {orders.length} đơn khởi tạo tổng cộng
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>HỌC VIÊN ĐĂNG KÝ</span>
                  <Users size={20} color="var(--accent-blue)" />
                </div>
                <div className="font-serif" style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                  {totalStudents} người
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                  Tất cả đều xác thực bằng SĐT
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>TÁC PHẨM GALLERY</span>
                  <Camera size={20} color="var(--gold-light)" />
                </div>
                <div className="font-serif" style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                  {photos.length} tác phẩm
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', marginTop: '6px' }}>
                  {photos.filter(p => p.featured).length} ảnh tiêu điểm
                </div>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
                Đơn Hàng Gần Đây
              </h3>
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mã Đơn</th>
                      <th>Khách Hàng</th>
                      <th>SĐT</th>
                      <th>Khóa Học</th>
                      <th>Số Tiền</th>
                      <th>Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id}>
                        <td style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{o.id}</td>
                        <td style={{ color: '#fff' }}>{o.customerName}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{o.phoneNumber}</td>
                        <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.courseTitle}</td>
                        <td style={{ fontWeight: 700, color: '#fff' }}>{formatPrice(o.amount)}</td>
                        <td>
                          <span className={`badge ${o.status === 'PAID' ? 'badge-emerald' : 'badge-amber'}`}>
                            {o.status === 'PAID' ? '✓ Đã Thanh Toán' : 'Chờ Thanh Toán'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE COURSES */}
        {adminTab === 'courses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff' }}>
                Danh Sách Khóa Học Trong Học Viện
              </h3>
              <button className="btn btn-gold btn-sm" onClick={() => handleOpenCourseModal()}>
                <Plus size={16} /> Thêm Khóa Học Mới
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {courses.map(course => (
                <div key={course.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                        {course.badge}
                      </span>
                      <h4 className="font-serif" style={{ fontSize: '1.05rem', color: '#fff', lineHeight: 1.3 }}>
                        {course.title}
                      </h4>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <div>Giá bán: <strong className="gold-text">{formatPrice(course.salePrice)}</strong> (Gốc: {formatPrice(course.originalPrice)})</div>
                    <div>Thời lượng: {course.duration}</div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ flex: 1 }}
                      onClick={() => handleOpenCourseModal(course)}
                    >
                      <Edit size={14} /> Chỉnh Sửa
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm(`Bạn có chắc chắn muốn xóa khóa học "${course.title}"?`)) {
                          deleteCourse(course.id);
                        }
                      }}
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE PHOTOS GALLERY */}
        {adminTab === 'photos' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff' }}>
                Quản Lý Triển Lãm Ảnh Portfolio
              </h3>
              <button className="btn btn-gold btn-sm" onClick={() => handleOpenPhotoModal()}>
                <Plus size={16} /> Thêm Tác Phẩm Mới
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {photos.map(photo => (
                <div key={photo.id} className="glass-card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '180px', position: 'relative' }}>
                    <img 
                      src={photo.image} 
                      alt={photo.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="badge badge-gold" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      {photo.category.toUpperCase()}
                    </span>
                    {photo.featured && (
                      <span className="badge badge-amber" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        ★ Tiêu Điểm
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h4 className="font-serif" style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '6px' }}>
                      {photo.title}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                      {photo.camera} • {photo.settings?.aperture} • {photo.location}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        style={{ flex: 1 }}
                        onClick={() => handleOpenPhotoModal(photo)}
                      >
                        <Edit size={14} /> Sửa
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (confirm(`Xóa ảnh "${photo.title}" khỏi Gallery?`)) {
                            deletePhoto(photo.id);
                          }
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS & PAYMENTS */}
        {adminTab === 'orders' && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff' }}>
                Quản Lý Đơn Hàng & Thanh Toán
              </h3>

              <div style={{ display: 'flex', gap: '12px' }}>
                <select
                  value={orderFilterStatus}
                  onChange={(e) => setOrderFilterStatus(e.target.value)}
                  className="form-select"
                  style={{ width: '170px' }}
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="PAID">Đã thanh toán</option>
                  <option value="PENDING">Chờ thanh toán</option>
                </select>

                <div style={{ position: 'relative', width: '240px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input
                    type="text"
                    placeholder="Tìm theo mã đơn/SĐT..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            </div>

            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Số Điện Thoại</th>
                    <th>Khóa Học</th>
                    <th>Số Tiền</th>
                    <th>Phương Thức</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600, color: 'var(--gold-light)' }}>{order.id}</td>
                      <td style={{ color: '#fff' }}>{order.customerName}</td>
                      <td>{order.phoneNumber}</td>
                      <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.courseTitle}</td>
                      <td style={{ fontWeight: 700, color: '#fff' }}>{formatPrice(order.amount)}</td>
                      <td style={{ color: 'var(--text-dim)' }}>{order.paymentMethod}</td>
                      <td>
                        <span className={`badge ${order.status === 'PAID' ? 'badge-emerald' : 'badge-amber'}`}>
                          {order.status === 'PAID' ? '✓ Đã Thanh Toán' : 'Chờ Thanh Toán'}
                        </span>
                      </td>
                      <td>
                        {order.status !== 'PAID' && (
                          <button
                            className="btn btn-gold btn-sm"
                            onClick={() => {
                              completePayment(order.id);
                              showToast(`Đã duyệt đơn ${order.id} thành công!`, 'success');
                            }}
                            title="Xác nhận đã nhận tiền chuyển khoản"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          >
                            <Check size={13} /> Duyệt Tiền
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: USERS MANAGEMENT */}
        {adminTab === 'users' && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#fff' }}>
                Danh Sách Học Viên Đăng Ký
              </h3>

              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  placeholder="Tìm theo họ tên hoặc SĐT..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Họ và Tên</th>
                    <th>Số Điện Thoại</th>
                    <th>Vai Trò</th>
                    <th>Ngày Tham Gia</th>
                    <th>Khóa Học Sở Hữu</th>
                    <th>Cấp Quyền Khóa Học</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id || user.phoneNumber}>
                      <td style={{ fontWeight: 600, color: '#fff' }}>{user.fullName}</td>
                      <td style={{ color: 'var(--gold-light)' }}>{user.phoneNumber}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'badge-gold' : 'badge-gray'}`}>
                          {user.role === 'admin' ? 'Quản Trị' : 'Học Viên'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>{user.joinedDate || '2026-08-15'}</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {(user.enrolledCourses || []).map(cid => (
                            <span key={cid} className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                              {courses.find(c => c.id === cid)?.title.slice(0, 18)}...
                            </span>
                          ))}
                          {(!user.enrolledCourses || user.enrolledCourses.length === 0) && (
                            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Chưa có khóa nào</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          style={{ padding: '4px 8px', fontSize: '0.8rem', width: '180px' }}
                          onChange={(e) => {
                            if (e.target.value) {
                              grantCourseAccess(user.phoneNumber, e.target.value);
                              e.target.value = '';
                            }
                          }}
                          defaultValue=""
                        >
                          <option value="" disabled>+ Mở khóa trực tiếp...</option>
                          {courses.map(c => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* EDIT / CREATE PHOTO MODAL */}
      {photoModalOpen && (
        <div className="modal-overlay" onClick={() => setPhotoModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setPhotoModalOpen(false)}>
              <X size={18} />
            </button>
            <div style={{ padding: '28px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '18px' }}>
                {editingPhoto ? 'Chỉnh Sửa Tác Phẩm' : 'Thêm Tác Phẩm Vào Gallery'}
              </h3>

              <form onSubmit={handleSavePhotoForm}>
                <div className="form-group">
                  <label className="form-label">Tiêu đề tác phẩm:</label>
                  <input
                    type="text"
                    value={photoForm.title}
                    onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Thể loại:</label>
                    <select
                      value={photoForm.category}
                      onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                      className="form-select"
                    >
                      <option value="wedding">Cưới & Phóng sự</option>
                      <option value="portrait">Chân dung nghệ thuật</option>
                      <option value="landscape">Phong cảnh & Du ký</option>
                      <option value="commercial">Thương mại & Thời trang</option>
                      <option value="street">Đường phố</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tỉ lệ khung hình:</label>
                    <select
                      value={photoForm.aspectRatio}
                      onChange={(e) => setPhotoForm({ ...photoForm, aspectRatio: e.target.value })}
                      className="form-select"
                    >
                      <option value="portrait">Dọc (Portrait 4:5)</option>
                      <option value="landscape">Ngang (Landscape 16:9)</option>
                      <option value="square">Vuông (Square 1:1)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Link ảnh (URL ảnh chất lượng cao):</label>
                  <input
                    type="url"
                    value={photoForm.image}
                    onChange={(e) => setPhotoForm({ ...photoForm, image: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Body Máy ảnh:</label>
                    <input
                      type="text"
                      value={photoForm.camera}
                      onChange={(e) => setPhotoForm({ ...photoForm, camera: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ống kính (Lens):</label>
                    <input
                      type="text"
                      value={photoForm.lens}
                      onChange={(e) => setPhotoForm({ ...photoForm, lens: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label">Khẩu độ:</label>
                    <input
                      type="text"
                      value={photoForm.settings?.aperture}
                      onChange={(e) => setPhotoForm({ ...photoForm, settings: { ...photoForm.settings, aperture: e.target.value } })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tốc độ:</label>
                    <input
                      type="text"
                      value={photoForm.settings?.shutter}
                      onChange={(e) => setPhotoForm({ ...photoForm, settings: { ...photoForm.settings, shutter: e.target.value } })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ISO:</label>
                    <input
                      type="text"
                      value={photoForm.settings?.iso}
                      onChange={(e) => setPhotoForm({ ...photoForm, settings: { ...photoForm.settings, iso: e.target.value } })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tiêu cự:</label>
                    <input
                      type="text"
                      value={photoForm.settings?.focalLength}
                      onChange={(e) => setPhotoForm({ ...photoForm, settings: { ...photoForm.settings, focalLength: e.target.value } })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Địa điểm chụp:</label>
                  <input
                    type="text"
                    value={photoForm.location}
                    onChange={(e) => setPhotoForm({ ...photoForm, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Câu chuyện hậu trường:</label>
                  <textarea
                    rows={2}
                    value={photoForm.story}
                    onChange={(e) => setPhotoForm({ ...photoForm, story: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={photoForm.featured}
                    onChange={(e) => setPhotoForm({ ...photoForm, featured: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label htmlFor="featuredCheck" style={{ color: '#fff', fontSize: '0.9rem', cursor: 'pointer' }}>
                    Đánh dấu là tác phẩm tiêu điểm (Featured on homepage)
                  </label>
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Check size={16} /> Lưu Tác Phẩm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE COURSE MODAL */}
      {courseModalOpen && (
        <div className="modal-overlay" onClick={() => setCourseModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setCourseModalOpen(false)}>
              <X size={18} />
            </button>
            <div style={{ padding: '28px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '18px' }}>
                {editingCourse ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới'}
              </h3>

              <form onSubmit={handleSaveCourseForm}>
                <div className="form-group">
                  <label className="form-label">Tên khóa học:</label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tiêu đề phụ / Slogan:</label>
                  <input
                    type="text"
                    value={courseForm.subtitle}
                    onChange={(e) => setCourseForm({ ...courseForm, subtitle: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Giá ưu đãi (VND):</label>
                    <input
                      type="number"
                      value={courseForm.salePrice}
                      onChange={(e) => setCourseForm({ ...courseForm, salePrice: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Giá gốc (VND):</label>
                    <input
                      type="number"
                      value={courseForm.originalPrice}
                      onChange={(e) => setCourseForm({ ...courseForm, originalPrice: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Badge huy hiệu:</label>
                    <input
                      type="text"
                      value={courseForm.badge}
                      onChange={(e) => setCourseForm({ ...courseForm, badge: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cấp độ:</label>
                    <input
                      type="text"
                      value={courseForm.level}
                      onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ảnh Thumbnail (URL):</label>
                  <input
                    type="url"
                    value={courseForm.thumbnail}
                    onChange={(e) => setCourseForm({ ...courseForm, thumbnail: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mô tả khóa học:</label>
                  <textarea
                    rows={3}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Check size={16} /> Lưu Khóa Học
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
