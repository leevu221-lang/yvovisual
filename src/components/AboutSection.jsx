import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Camera, Award, Heart, CheckCircle2, Mail, Phone, 
  MapPin, Sparkles, Send
} from 'lucide-react';

export default function AboutSection() {
  const { photographerInfo, showToast } = useApp();
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    serviceType: 'wedding',
    date: '',
    message: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    showToast(`Cảm ơn bạn ${bookingForm.name}! YVO VISUAL sẽ liên hệ tư vấn lịch chụp trong 24 giờ.`, 'success');
    setBookingForm({ name: '', phone: '', serviceType: 'wedding', date: '', message: '' });
  };

  return (
    <div style={{ padding: '80px 0 120px' }}>
      <div className="container">
        {/* Top Hero Bio - Editorial Split */}
        <div className="glass-panel" style={{ padding: '52px', marginBottom: '48px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 400px) 1fr', gap: '56px', alignItems: 'center' }}>
            {/* Portrait Image */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <img
                  src={photographerInfo.avatar}
                  alt={photographerInfo.fullName}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>

              {/* Accolade badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-14px',
                  right: '-14px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Award size={20} color="var(--gold-primary)" />
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AMBASSADOR</div>
                  <strong style={{ fontSize: '0.82rem', color: '#fff' }}>Sony Artisan &amp; Leica</strong>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--gold-primary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
                VISUAL ARTIST &amp; FOUNDER
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: '6px', lineHeight: 1.15 }}>
                {photographerInfo.fullName}
              </h1>
              <div style={{ fontSize: '1rem', color: 'var(--text-dim)', marginBottom: '22px' }}>
                {photographerInfo.title}
              </div>

              <blockquote
                style={{
                  borderLeft: '2px solid var(--gold-primary)',
                  paddingLeft: '18px',
                  fontStyle: 'italic',
                  color: 'var(--text-main)',
                  fontSize: '1.02rem',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '16px 20px',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
                }}
              >
                "{photographerInfo.quote}"
              </blockquote>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.94rem', marginBottom: '28px' }}>
                {photographerInfo.bio}
              </p>

              {/* Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.86rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <CheckCircle2 size={15} color="var(--gold-primary)" />
                  <span>Vogue Italia Featured Artist</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <CheckCircle2 size={15} color="var(--gold-primary)" />
                  <span>Leica M Ambassador Vietnam</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <CheckCircle2 size={15} color="var(--gold-primary)" />
                  <span>Giám khảo Nhiếp Ảnh Trẻ 2025</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <CheckCircle2 size={15} color="var(--gold-primary)" />
                  <span>14+ Năm cống hiến thị giác</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gear Bag & Booking Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
          {/* Gear Bag (Thiết Bị Sử Dụng) */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Camera size={20} color="var(--gold-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                Thiết Bị Tiêu Chuẩn (My Gear Bag)
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '22px', lineHeight: 1.6 }}>
              Chất lượng hình ảnh bắt nguồn từ sự kết hợp giữa độ phân giải cao, dải màu trung thực và hệ thống ánh sáng chủ động.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {photographerInfo.gearList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.025)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-glass)',
                    fontSize: '0.88rem',
                    color: '#fff'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--gold-primary)', fontSize: '0.8rem' }}>0{idx + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="var(--gold-primary)" />
                <span>Studio: 18 Đặng Thai Mai, P. Quảng An, Q. Tây Hồ, Hà Nội</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--gold-primary)" />
                <span>Hotline: 0988 888 888 • 08:30 - 20:30 hàng ngày</span>
              </div>
            </div>
          </div>

          {/* Booking & Consultation Form */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Sparkles size={20} color="var(--gold-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                Đặt Lịch Chụp &amp; Hợp Tác
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '22px' }}>
              Dành cho khách hàng cần chụp ảnh cưới nghệ thuật, lookbook thời trang hoặc dự án thương mại cao cấp.
            </p>

            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label className="form-label">Họ và tên quý khách:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Phương Thảo"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Số điện thoại liên hệ:</label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gói dịch vụ:</label>
                  <select
                    value={bookingForm.serviceType}
                    onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                    className="form-select"
                  >
                    <option value="wedding">Phóng Sự Cưới Trọn Gói</option>
                    <option value="portrait">Chân Dung Nghệ Thuật</option>
                    <option value="commercial">Thương Mại &amp; Bìa Tạp Chí</option>
                    <option value="destination">Pre-Wedding Ngoại Cảnh</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Dự kiến ngày thực hiện:</label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ý tưởng hoặc yêu cầu đặc biệt:</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả phong cách mong muốn hoặc địa điểm yêu thích..."
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={15} />
                <span>Gửi Yêu Cầu Tư Vấn</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
