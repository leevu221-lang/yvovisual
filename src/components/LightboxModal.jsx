import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, ChevronLeft, ChevronRight, Heart, Camera, MapPin, 
  Calendar, Eye, Maximize, ZoomIn, ZoomOut, Share2, Download, Info, Edit2
} from 'lucide-react';

export default function LightboxModal() {
  const { 
    currentUser,
    selectedPhoto, setSelectedPhoto, photos, 
    toggleLikePhoto, showToast, albums, openUploadModal 
  } = useApp();
  const isAdmin = currentUser?.role === 'admin';
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, photos]);

  if (!selectedPhoto) return null;

  const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
  const totalPhotos = photos.length;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % totalPhotos;
    setSelectedPhoto(photos[nextIndex]);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
    setSelectedPhoto(photos[prevIndex]);
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleDownload = () => {
    showToast(`Đang tải ảnh chất lượng gốc: ${selectedPhoto.title}`, 'info');
    const a = document.createElement('a');
    a.href = selectedPhoto.image || selectedPhoto.url || selectedPhoto.previewUrl;
    a.download = `${selectedPhoto.title}.jpg`;
    a.target = '_blank';
    a.click();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Đã sao chép liên kết tác phẩm vào bộ nhớ tạm!', 'success');
  };

  return (
    <div className="lightbox-container" role="dialog" aria-modal="true">
      {/* Lightbox Header */}
      <div className="lightbox-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="badge badge-gold font-display">Y VÕ VISUAL GALLERY</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {currentIndex + 1} / {totalPhotos}
          </span>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', margin: 0 }}>
            {selectedPhoto.title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAdmin && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => openUploadModal(selectedPhoto)}
              style={{ fontSize: '0.8rem', gap: '6px' }}
              title="Đổi album hoặc chỉnh sửa thông số tác phẩm (Quyền Admin)"
            >
              <Edit2 size={14} />
              <span>Đổi Album</span>
            </button>
          )}

          <button
            className="btn btn-secondary btn-sm"
            onClick={handleZoomIn}
            title="Phóng to ảnh"
          >
            <ZoomIn size={16} />
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleZoomOut}
            title="Thu nhỏ ảnh"
          >
            <ZoomOut size={16} />
          </button>
          {zoomLevel !== 1 && (
            <button className="btn btn-secondary btn-sm" onClick={handleResetZoom}>
              100%
            </button>
          )}
          <button
            className="btn btn-secondary btn-sm"
            onClick={toggleFullscreen}
            title="Toàn màn hình"
          >
            <Maximize size={16} />
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleDownload}
            title="Tải ảnh gốc 4K"
          >
            <Download size={16} />
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleShare}
            title="Chia sẻ liên kết"
          >
            <Share2 size={16} />
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setSelectedPhoto(null)}
            title="Đóng cửa sổ (Esc)"
            style={{ marginLeft: '12px', background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox Body: Photo + EXIF details */}
      <div className="lightbox-body">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid var(--border-glass)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s'
          }}
          title="Tác phẩm trước (←)"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Central Photo View */}
        <div className="lightbox-main-view">
          <div
            className="lightbox-img-wrapper"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="lightbox-img"
              loading="eager"
            />
          </div>
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '400px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid var(--border-glass)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s'
          }}
          title="Tác phẩm tiếp theo (→)"
        >
          <ChevronRight size={28} />
        </button>

        {/* EXIF Metadata & Story Sidebar */}
        <div className="lightbox-sidebar">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge badge-gold">
                {albums.find(a => a.id === selectedPhoto.category)?.label?.toUpperCase() || selectedPhoto.category.toUpperCase()}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isAdmin && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => openUploadModal(selectedPhoto)}
                    style={{ padding: '6px 10px', fontSize: '0.78rem', gap: '4px' }}
                    title="Đổi album tác phẩm này (Quyền Admin)"
                  >
                    <Edit2 size={13} />
                    <span>Đổi Album</span>
                  </button>
                )}
                <button
                  className={`btn btn-sm ${selectedPhoto.isLiked ? 'btn-gold' : 'btn-secondary'}`}
                  onClick={() => toggleLikePhoto(selectedPhoto.id)}
                  style={{ padding: '6px 12px' }}
                >
                  <Heart size={15} fill={selectedPhoto.isLiked ? '#000' : 'none'} />
                  <span>{selectedPhoto.likes}</span>
                </button>
              </div>
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              {selectedPhoto.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <MapPin size={15} color="var(--gold-primary)" />
              <span>{selectedPhoto.location}</span>
            </div>
          </div>

          {/* Camera EXIF Box */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <Camera size={18} color="var(--gold-primary)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-light)', margin: 0 }}>
                Thông Số Chụp (EXIF Pro)
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>MÁY ẢNH</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{selectedPhoto.camera}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>ỐNG KÍNH</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{selectedPhoto.lens}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>KHẨU ĐỘ</div>
                <div style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{selectedPhoto.settings?.aperture || 'f/2.8'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>TỐC ĐỘ MÀN TRẬP</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{selectedPhoto.settings?.shutter || '1/250s'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>ĐỘ NHẠY SÁNG ISO</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>ISO {selectedPhoto.settings?.iso || '100'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>TIÊU CỰ</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{selectedPhoto.settings?.focalLength || '50mm'}</div>
              </div>
            </div>
          </div>

          {/* Story Behind the Shot */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
              <Info size={16} />
              <span>CÂU CHUYỆN HẬU TRƯỜNG</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{selectedPhoto.story}"
            </p>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            <span>Tác quyền: © Y VÕ Visual</span>
            <span>Ngày chụp: {selectedPhoto.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
