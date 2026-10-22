import React from 'react';
import { useApp } from '../context/AppContext';
import { Aperture, MapPin, Phone, Mail, Award, Heart } from 'lucide-react';

export default function Footer() {
  const { setCurrentView } = useApp();

  return (
    <footer style={{ background: '#050608', borderTop: '1px solid var(--border-subtle)', padding: '70px 0 36px', color: 'var(--text-muted)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px', marginBottom: '56px' }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#fff' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Aperture size={18} strokeWidth={1.8} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.14em' }}>
                YVO VISUAL
              </div>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '18px', color: 'var(--text-dim)' }}>
              Nền tảng lưu trữ tác phẩm thị giác đương đại và học viện đào tạo nhiếp ảnh chuyên nghiệp trực tuyến.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--gold-primary)' }}>
              <Award size={15} />
              <span>Sony Artisan of Imagery &amp; Leica Ambassador</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '18px' }}>
              Danh Mục
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); setCurrentView('portfolio'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Triển Lãm Tác Phẩm
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => { e.preventDefault(); setCurrentView('courses'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Học Viện Masterclass
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Tiểu Sử Nghệ Sĩ
                </a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Đặt Lịch Chụp
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Activation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '18px' }}>
              Kích Hoạt Tự Động
            </h4>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '16px', color: 'var(--text-dim)' }}>
              Hệ thống tự động kích hoạt tài khoản học viên ngay lập tức qua quét mã VietQR 24/7.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>VietQR Pro</span>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>Techcombank</span>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>MoMo</span>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>VNPAY</span>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '18px' }}>
              Liên Hệ Trực Tiếp
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="var(--gold-primary)" />
                <span>18 Đặng Thai Mai, Q. Tây Hồ, Hà Nội</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--gold-primary)" />
                <span>Hotline: 0988 888 888</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--gold-primary)" />
                <span>contact@yvovisual.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '28px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          <div>
            © 2026 YVO VISUAL. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Nghệ thuật ánh sáng &amp; thị giác đương đại</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
