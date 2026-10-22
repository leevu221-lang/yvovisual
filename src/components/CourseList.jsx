import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, Star, Clock, Users, Play, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, Gift, Layers, Search
} from 'lucide-react';

export default function CourseList() {
  const { 
    courses, 
    currentUser, 
    setSelectedCourseForDetail, 
    setSelectedCourseId, 
    setCurrentView,
    initiateCoursePurchase 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tất Cả Khóa Học' },
    { id: 'portrait', label: 'Chân Dung & Ánh Sáng' },
    { id: 'post-processing', label: 'Hậu Kỳ Lightroom/Photoshop' },
    { id: 'wedding', label: 'Phóng Sự Cưới Pro' },
    { id: 'basics', label: 'Nhiếp Ảnh Nhập Môn' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <div>
      {/* Academy Minimalist Hero Header */}
      <section
        style={{
          padding: '100px 0 70px',
          background: 'linear-gradient(180deg, rgba(14, 17, 23, 0.9) 0%, rgba(8, 9, 11, 0.98) 100%)',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-full)', marginBottom: '20px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              YVO ACADEMY • ONLINE MASTERCLASSES
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: '18px', maxWidth: '900px', margin: '0 auto 18px' }}>
            Làm Chủ Ống Kính &amp; <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold-primary)' }}>Tư Duy Thị Giác</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Giáo trình thực chiến đúc kết từ 14 năm chụp bìa tạp chí và thương mại. Học trực tuyến mọi lúc mọi nơi, cấp chứng chỉ và sở hữu trọn đời bộ Preset màu độc quyền.
          </p>

          {/* Minimalist Value Props */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', flexWrap: 'wrap', color: 'var(--text-main)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="var(--gold-primary)" />
              <span>Video chất lượng 4K</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="var(--gold-primary)" />
              <span>Tặng Presets &amp; File RAW độc quyền</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="var(--gold-primary)" />
              <span>Hỗ trợ giải đáp 1-1 từ YVO VISUAL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={15} color="var(--gold-primary)" />
              <span>Kích hoạt học ngay qua VietQR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog Section */}
      <section style={{ padding: '70px 0 110px' }}>
        <div className="container">
          {/* Controls: Search & Category Chips */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    background: activeCategory === cat.id ? '#ffffff' : 'rgba(255, 255, 255, 0.035)',
                    color: activeCategory === cat.id ? '#08090b' : 'var(--text-muted)',
                    fontWeight: activeCategory === cat.id ? 600 : 400,
                    fontSize: '0.85rem',
                    border: activeCategory === cat.id ? '1px solid #ffffff' : '1px solid var(--border-glass)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
              <Search
                size={15}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}
              />
              <input
                type="text"
                placeholder="Tìm tên khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px', borderRadius: 'var(--radius-full)', fontSize: '0.86rem' }}
              />
            </div>
          </div>

          {/* Courses Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '28px'
            }}
          >
            {filteredCourses.map(course => {
              const isEnrolled = currentUser?.enrolledCourses?.includes(course.id);

              return (
                <div
                  key={course.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  {/* Thumbnail Cover */}
                  <div
                    style={{
                      position: 'relative',
                      height: '220px',
                      overflow: 'hidden',
                      backgroundColor: '#12151b'
                    }}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,11,0.92) 0%, transparent 60%)' }} />

                    {/* Badge */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px' }}>
                      <span
                        style={{
                          backdropFilter: 'blur(10px)',
                          background: 'rgba(8, 9, 11, 0.75)',
                          border: '1px solid var(--border-glass)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        {course.badge}
                      </span>
                    </div>

                    {isEnrolled && (
                      <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                        <span className="badge badge-emerald" style={{ backdropFilter: 'blur(8px)' }}>
                          ✓ ĐÃ SỞ HỮU
                        </span>
                      </div>
                    )}

                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                      <span>{course.level}</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold-primary)' }}>
                        <Star size={14} fill="var(--gold-primary)" />
                        <strong>{course.rating}</strong>
                      </div>
                      <span style={{ color: 'var(--text-dim)' }}>•</span>
                      <span style={{ color: 'var(--text-muted)' }}>{course.studentsCount?.toLocaleString()} học viên</span>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#fff',
                        marginBottom: '8px',
                        lineHeight: 1.35,
                        letterSpacing: '-0.01em',
                        minHeight: '48px'
                      }}
                    >
                      {course.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.86rem',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {course.subtitle || course.description}
                    </p>

                    {/* Bottom Pricing & Action Buttons */}
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Học phí:</div>
                          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                            {formatPrice(course.salePrice)}
                          </div>
                        </div>
                        {course.originalPrice && (
                          <div style={{ textDecoration: 'line-through', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                            {formatPrice(course.originalPrice)}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: isEnrolled ? '1fr' : '1fr 1fr', gap: '8px' }}>
                        {isEnrolled ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelectedCourseId(course.id);
                              setCurrentView('classroom');
                            }}
                          >
                            <Play size={15} />
                            <span>Vào Học Ngay</span>
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setSelectedCourseForDetail(course)}
                              title="Xem chi tiết giáo trình"
                            >
                              <span>Giáo Trình</span>
                            </button>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => initiateCoursePurchase(course)}
                              title="Đăng ký khóa học"
                            >
                              <span>Đăng Ký</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
