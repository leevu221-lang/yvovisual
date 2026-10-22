import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Camera, Heart, MapPin, Eye, ArrowRight, Search, 
  Sparkles, Compass, Sliders
} from 'lucide-react';

export default function PortfolioGallery() {
  const { photos, setSelectedPhoto, toggleLikePhoto, photographerInfo, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'wedding', label: 'Cưới & Phóng Sự' },
    { id: 'portrait', label: 'Chân Dung Nghệ Thuật' },
    { id: 'landscape', label: 'Phong Cảnh' },
    { id: 'commercial', label: 'Thời Trang & Editorial' },
    { id: 'street', label: 'Đời Thường' }
  ];

  // Filtering logic
  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch = 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.lens.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Modern Minimalist Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: '120px 0 90px',
          background: `linear-gradient(to bottom, rgba(8, 9, 11, 0.72) 0%, rgba(8, 9, 11, 0.96) 100%), url('${photographerInfo.heroBg}') center/cover no-repeat`,
          borderBottom: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Subtle Editorial Kicker */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-full)', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--gold-primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              YVO VISUAL ARCHIVE 2026
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '940px',
              margin: '0 auto 22px',
              color: '#ffffff'
            }}
          >
            Kể Chuyện Bằng Ánh Sáng &amp; <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold-primary)' }}>Cảm Xúc</span> Thuần Khiết
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              maxWidth: '680px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Bộ sưu tập các tác phẩm nhiếp ảnh nghệ thuật, phóng sự cưới và chân dung editorial được kiến tạo bởi nghệ sĩ thị giác YVO VISUAL.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                const el = document.getElementById('gallery-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Eye size={17} />
              Khám Phá Gallery
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => setCurrentView('courses')}
            >
              <span>Học Viện Đào Tạo</span>
              <ArrowRight size={17} />
            </button>
          </div>

          {/* Minimalist Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              maxWidth: '920px',
              margin: '64px auto 0',
              padding: '24px 32px',
              background: 'rgba(14, 17, 23, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            {photographerInfo.stats.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery-section" style={{ padding: '80px 0 120px' }}>
        <div className="container">
          {/* Header & Filter Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '44px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold-primary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  SELECTED WORKS
                </div>
                <h2 style={{ fontSize: '2.1rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>
                  Tuyển Tập Tác Phẩm
                </h2>
              </div>

              {/* Minimal Search Box */}
              <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
                <Search
                  size={16}
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}
                />
                <input
                  type="text"
                  placeholder="Tìm theo chủ đề, địa điểm, camera..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '44px', borderRadius: 'var(--radius-full)', fontSize: '0.86rem' }}
                />
              </div>
            </div>

            {/* Minimalist Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-full)',
                    background: selectedCategory === cat.id ? '#ffffff' : 'rgba(255, 255, 255, 0.035)',
                    color: selectedCategory === cat.id ? '#08090b' : 'var(--text-muted)',
                    fontWeight: selectedCategory === cat.id ? 600 : 400,
                    fontSize: '0.85rem',
                    border: selectedCategory === cat.id ? '1px solid #ffffff' : '1px solid var(--border-glass)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photos Grid */}
          {filteredPhotos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '90px 20px', background: 'rgba(255, 255, 255, 0.015)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-subtle)' }}>
              <Camera size={44} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
              <h3 style={{ color: '#fff', marginBottom: '8px', fontWeight: 600 }}>Không tìm thấy tác phẩm phù hợp</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm.</p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                style={{ marginTop: '18px' }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '24px'
              }}
            >
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="photo-card"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Photo Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: photo.aspectRatio === 'landscape' ? '300px' : photo.aspectRatio === 'square' ? '360px' : '460px',
                      overflow: 'hidden',
                      backgroundColor: '#101217'
                    }}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                    />

                    {/* Top Badges */}
                    <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                      <span
                        style={{
                          backdropFilter: 'blur(12px)',
                          background: 'rgba(8, 9, 11, 0.75)',
                          border: '1px solid var(--border-glass)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        {photo.category}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLikePhoto(photo.id);
                        }}
                        style={{
                          background: 'rgba(8, 9, 11, 0.75)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid var(--border-glass)',
                          borderRadius: 'var(--radius-full)',
                          padding: '5px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: photo.isLiked ? '#f43f5e' : '#fff',
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                        title="Thả tim tác phẩm"
                      >
                        <Heart size={13} fill={photo.isLiked ? '#f43f5e' : 'none'} />
                        <span>{photo.likes}</span>
                      </button>
                    </div>

                    {/* Minimalist Bottom Overlay */}
                    <div className="photo-overlay">
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          marginBottom: '6px',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {photo.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '12px' }}>
                        <MapPin size={13} color="var(--gold-primary)" />
                        <span>{photo.location}</span>
                      </div>

                      {/* Minimalist Camera Specs */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: 'var(--text-dim)',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          paddingTop: '10px'
                        }}
                      >
                        <Camera size={13} color="var(--gold-primary)" />
                        <span>{photo.camera} • {photo.settings.aperture} • {photo.settings.shutter}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
