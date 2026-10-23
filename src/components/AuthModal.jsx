import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Phone, User, ShieldCheck, ArrowRight, Sparkles, 
  MessageSquare, CheckCircle2, RotateCw, Shield, GraduationCap 
} from 'lucide-react';
import { INITIAL_USERS } from '../data/initialData';

export default function AuthModal() {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    users, 
    setUsers, 
    setCurrentUser, 
    showToast 
  } = useApp();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState(1); // 1: input phone, 2: input OTP
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [resendCountdown, setResendCountdown] = useState(60);

  useEffect(() => {
    if (authModalOpen) {
      setStep(1);
      setPhoneNumber('');
      setFullName('');
      setEnteredOtp(['', '', '', '', '', '']);
    }
  }, [authModalOpen, authMode]);

  useEffect(() => {
    let timer;
    if (step === 2 && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCountdown]);

  if (!authModalOpen) return null;

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\s+/g, '');
    return /^(0[3|5|7|8|9])[0-9]{8}$/.test(cleanPhone);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\s+/g, '');

    if (!validatePhone(cleanPhone)) {
      showToast('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, VD: 0912345678)', 'info');
      return;
    }

    if (authMode === 'register' && !fullName.trim()) {
      showToast('Vui lòng nhập họ và tên của bạn', 'info');
      return;
    }

    // Generate 6 digit OTP
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockCode);
    setStep(2);
    setResendCountdown(60);

    // Simulated SMS notification
    showToast(`💬 [SMS OTP]: Mã xác thực của bạn là ${mockCode}. Có hiệu lực trong 5 phút.`, 'success');
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...enteredOtp];
    newOtp[index] = value.slice(-1);
    setEnteredOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setEnteredOtp(generatedOtp.split(''));
      showToast('Đã tự động điền mã OTP!', 'info');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const fullOtp = enteredOtp.join('');

    if (fullOtp.length < 6) {
      showToast('Vui lòng nhập đủ 6 chữ số OTP', 'info');
      return;
    }

    if (fullOtp !== generatedOtp && fullOtp !== '123456') {
      showToast('Mã OTP không chính xác. Vui lòng kiểm tra lại!', 'info');
      return;
    }

    const cleanPhone = phoneNumber.replace(/\s+/g, '');

    // Check if admin phone
    if (cleanPhone === '0988888888') {
      const admin = users.find(u => u.role === 'admin') || INITIAL_USERS[0];
      setCurrentUser(admin);
      showToast(`Đăng nhập thành công với quyền Quản Trị Viên: ${admin.fullName}`, 'success');
      setAuthModalOpen(false);
      return;
    }

    // Check if user exists
    let existingUser = users.find(u => u.phoneNumber === cleanPhone);

    if (authMode === 'register') {
      if (existingUser) {
        // Log in to existing
        setCurrentUser(existingUser);
        showToast(`Số điện thoại đã tồn tại. Đã tự động đăng nhập vào tài khoản: ${existingUser.fullName}`, 'success');
      } else {
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          phoneNumber: cleanPhone,
          fullName: fullName.trim(),
          role: 'student',
          joinedDate: new Date().toISOString().split('T')[0],
          enrolledCourses: [],
          totalSpent: 0
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        showToast(`Chào mừng bạn ${newUser.fullName} gia nhập Y VÕ Visual Academy!`, 'success');
      }
    } else {
      // Login mode
      if (!existingUser) {
        // Quick create student account if not registered yet
        const newUser = {
          id: `user-${Date.now()}`,
          phoneNumber: cleanPhone,
          fullName: fullName.trim() || `Học viên ${cleanPhone.slice(-4)}`,
          role: 'student',
          joinedDate: new Date().toISOString().split('T')[0],
          enrolledCourses: [],
          totalSpent: 0
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        showToast(`Đăng nhập thành công! Chào mừng ${newUser.fullName}`, 'success');
      } else {
        setCurrentUser(existingUser);
        showToast(`Đăng nhập thành công! Chào mừng quay trở lại, ${existingUser.fullName}`, 'success');
      }
    }

    setAuthModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div 
        className="modal-content"
        style={{ maxWidth: '480px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn"
          onClick={() => setAuthModalOpen(false)}
          title="Đóng"
        >
          <X size={18} />
        </button>

        <div style={{ padding: '32px 30px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--gold-primary)' }}>
              <Phone size={24} />
            </div>

            <h2 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
              {authMode === 'register' ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập Học Viên'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {step === 1 
                ? 'Chỉ cần Số điện thoại & Họ tên (Không bắt buộc email)'
                : `Nhập mã OTP 6 số vừa gửi tới ${phoneNumber}`}
            </p>
          </div>

          {/* Step 1: Input Phone & Name */}
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              {authMode === 'register' && (
                <div className="form-group">
                  <label className="form-label">Họ và Tên của bạn:</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input
                      type="text"
                      placeholder="Ví dụ: Đỗ Hoàng Long"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '44px' }}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Số điện thoại di động:</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input
                    type="tel"
                    placeholder="Ví dụ: 0912345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '44px' }}
                    required
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                  Hệ thống sẽ gửi mã xác thực OTP miễn phí qua SMS.
                </div>
              </div>

              <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: '12px' }}>
                <span>Tiếp Tục & Nhận Mã OTP</span>
                <ArrowRight size={18} />
              </button>

              {/* Mode Toggle */}
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {authMode === 'register' ? (
                  <span>
                    Đã có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Đăng nhập ngay
                    </button>
                  </span>
                ) : (
                  <span>
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Đăng ký mới
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}

          {/* Step 2: Input 6-Digit OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              {/* Simulated SMS Helper Box */}
              <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>MÃ OTP MÔ PHỎNG SMS:</div>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--gold-light)', letterSpacing: '4px' }}>
                    {generatedOtp}
                  </strong>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-gold btn-sm"
                  onClick={handleAutoFillOtp}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Sparkles size={14} /> Tự Điền Nhanh
                </button>
              </div>

              {/* 6 OTP Inputs */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  {enteredOtp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="form-input"
                      style={{
                        width: '46px',
                        height: '52px',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        padding: 0
                      }}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%' }}>
                <CheckCircle2 size={18} />
                <span>Xác Nhận & Đăng Nhập</span>
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                >
                  ← Đổi số điện thoại
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(mockCode);
                    setResendCountdown(60);
                    showToast(`💬 Mã OTP mới: ${mockCode}`, 'info');
                  }}
                  disabled={resendCountdown > 0}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: resendCountdown > 0 ? 'var(--text-dim)' : 'var(--gold-light)',
                    cursor: resendCountdown > 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {resendCountdown > 0 ? `Gửi lại sau (${resendCountdown}s)` : 'Gửi lại mã OTP'}
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Role Access Box */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
              <Sparkles size={13} color="var(--gold-primary)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Đăng Nhập Nhanh Theo Phân Quyền (Demo)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  const admin = users.find(u => u.role === 'admin') || INITIAL_USERS[0];
                  setCurrentUser(admin);
                  setAuthModalOpen(false);
                  showToast(`Đã đăng nhập với tư cách Quản Trị Viên: ${admin.fullName}`, 'success');
                }}
                style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Shield size={14} color="var(--gold-primary)" />
                  <strong style={{ fontSize: '0.82rem', color: 'var(--gold-light)' }}>👑 Quản Trị (Admin)</strong>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Y Võ (0988888888)
                </div>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  Upload ảnh, đổi album, quản lý học viện
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  const student = users.find(u => u.role === 'student') || INITIAL_USERS[1];
                  setCurrentUser(student);
                  setAuthModalOpen(false);
                  showToast(`Đã đăng nhập với tư cách Học Viên: ${student.fullName}`, 'success');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <GraduationCap size={14} color="#60a5fa" />
                  <strong style={{ fontSize: '0.82rem', color: '#fff' }}>🎓 Học Viên</strong>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Đỗ Hoàng Long (0912345678)
                </div>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  Xem bài giảng, tải preset, xem gallery
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
