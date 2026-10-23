import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, Pause, CheckCircle2, Circle, ArrowLeft, Download, 
  MessageSquare, FileText, ChevronRight, FastForward, Rewind, 
  Sparkles, Lock, ShieldCheck, Share2, Send
} from 'lucide-react';

export default function ClassroomView() {
  const { 
    selectedCourseId, 
    courses, 
    currentUser, 
    setCurrentView, 
    initiateCoursePurchase,
    showToast 
  } = useApp();

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  const isEnrolled = currentUser?.role === 'admin' || currentUser?.enrolledCourses?.includes(course?.id);

  // Completed lessons state (stored in localStorage)
  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    const saved = localStorage.getItem(`minhvu_progress_${currentUser?.phoneNumber}_${course?.id}`);
    return saved ? JSON.parse(saved) : ['l1'];
  });

  // Active lesson
  const allLessons = course?.modules?.flatMap(m => m.lessons) || [];
  const [activeLesson, setActiveLesson] = useState(allLessons[0] || null);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'resources' | 'qa'

  // Q&A list
  const [qaList, setQaList] = useState([
    {
      id: 1,
      author: 'Trần Văn Mạnh',
      time: '2 ngày trước',
      question: 'Thầy cho em hỏi khi chụp ngoài trời nắng gắt 12h trưa thì nên dùng chóa gì để giảm bóng đổ dưới mũi mẫu?',
      answer: 'Chào Mạnh, em nên dùng 1 dù Parabolic khuếch tán lớn (165cm) làm Key Light và dùng tấm Reflector trắng bạc hắt nhẹ từ dưới ngực lên nhé.'
    },
    {
      id: 2,
      author: 'Đỗ Hoàng Long',
      time: 'Hôm qua',
      question: 'Bộ Preset Cinematic có tương thích tốt với Lightroom trên iPhone/iPad không thầy?',
      answer: 'Có đầy đủ cả 2 định dạng: .XMP cho máy tính (Mac/Windows) và .DNG cho Lightroom Mobile trên điện thoại em nhé!'
    }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  // Playback rate
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (currentUser?.phoneNumber && course?.id) {
      localStorage.setItem(`minhvu_progress_${currentUser.phoneNumber}_${course.id}`, JSON.stringify(completedLessonIds));
    }
  }, [completedLessonIds, currentUser, course]);

  const toggleLessonComplete = (lessonId) => {
    setCompletedLessonIds(prev => {
      const exists = prev.includes(lessonId);
      if (exists) {
        showToast('Đã bỏ đánh dấu hoàn thành', 'info');
        return prev.filter(id => id !== lessonId);
      } else {
        showToast('Tuyệt vời! Đã hoàn thành bài giảng!', 'success');
        return [...prev, lessonId];
      }
    });
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
    if (currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
    if (currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const item = {
      id: Date.now(),
      author: currentUser?.fullName || 'Học viên',
      time: 'Vừa xong',
      question: newQuestion,
      answer: 'Cảm ơn bạn đã đặt câu hỏi. Giảng viên Y Võ sẽ phản hồi chi tiết trong ít phút!'
    };
    setQaList([item, ...qaList]);
    setNewQuestion('');
    showToast('Đã gửi câu hỏi lên diễn đàn học viên!', 'success');
  };

  const progressPercent = Math.round((completedLessonIds.length / (allLessons.length || 1)) * 100);

  // If user hasn't enrolled in this course
  if (!isEnrolled) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--gold-primary)' }}>
            <Lock size={32} />
          </div>
          <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
            Nội Dung Khóa Học Đang Khóa
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            Khóa học <strong>{course?.title}</strong> chỉ dành cho học viên đã đăng ký. Bạn hãy đăng ký để mở khóa toàn bộ bài giảng 4K, tài liệu và bộ preset độc quyền.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setCurrentView('courses')}>
              <ArrowLeft size={16} /> Quay Lại Danh Sách
            </button>
            <button className="btn btn-gold" onClick={() => initiateCoursePurchase(course)}>
              <Sparkles size={16} /> Đăng Ký Mở Khóa Ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#07080a', minHeight: 'calc(100vh - 80px)', paddingBottom: '60px' }}>
      {/* Classroom Top Bar */}
      <div style={{ background: '#0e1117', borderBottom: '1px solid var(--border-subtle)', padding: '14px 24px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('courses')}
              title="Quay lại danh mục khóa học"
            >
              <ArrowLeft size={16} />
              <span>Khóa học</span>
            </button>
            <div>
              <h1 className="font-serif" style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                {course.title}
              </h1>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                Giảng viên: {course.instructor}
              </div>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Tiến độ học tập</span>
                <strong style={{ color: 'var(--gold-primary)' }}>{progressPercent}%</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--gold-gradient)', borderRadius: '3px', transition: 'width 0.3s ease' }} />
              </div>
            </div>
            <span className="badge badge-emerald" style={{ whiteSpace: 'nowrap' }}>
              {completedLessonIds.length}/{allLessons.length} Bài
            </span>
          </div>
        </div>
      </div>

      {/* Classroom Content Grid */}
      <div className="container" style={{ marginTop: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '24px' }}>
          {/* Main Video & Discussion Area */}
          <div>
            {/* Cinema Video Player */}
            <div style={{ background: '#000', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-lg)' }}>
              <video
                key={activeLesson?.id}
                src={activeLesson?.videoUrl || course.previewVideoUrl}
                controls
                autoPlay
                style={{ width: '100%', maxHeight: '520px', display: 'block', backgroundColor: '#000' }}
              >
                Trình duyệt của bạn không hỗ trợ video HTML5.
              </video>

              {/* Player Bottom Control Bar */}
              <div style={{ padding: '16px 20px', background: '#0e1117', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    className={`btn btn-sm ${completedLessonIds.includes(activeLesson?.id) ? 'btn-gold' : 'btn-secondary'}`}
                    onClick={() => toggleLessonComplete(activeLesson?.id)}
                  >
                    <CheckCircle2 size={16} />
                    <span>
                      {completedLessonIds.includes(activeLesson?.id) ? 'Đã hoàn thành bài này' : 'Đánh dấu hoàn thành'}
                    </span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handlePrevLesson}
                    disabled={allLessons.findIndex(l => l.id === activeLesson?.id) === 0}
                  >
                    <Rewind size={15} /> Bài trước
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleNextLesson}
                    disabled={allLessons.findIndex(l => l.id === activeLesson?.id) === allLessons.length - 1}
                  >
                    Bài tiếp <FastForward size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Lesson Header */}
            <div style={{ marginTop: '20px', marginBottom: '24px' }}>
              <h2 className="font-serif" style={{ fontSize: '1.45rem', color: '#fff', marginBottom: '6px' }}>
                {activeLesson?.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Thời lượng: {activeLesson?.duration}</span>
                <span>•</span>
                <span style={{ color: 'var(--gold-light)' }}>Độ phân giải: 4K Cinema DCI</span>
              </div>
            </div>

            {/* Sub Tabs: Ghi Chú, Tài Nguyên Tải Về, Hỏi Đáp */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '20px' }}>
                <button
                  className={`btn btn-sm ${activeTab === 'notes' ? 'btn-gold' : 'btn-secondary'}`}
                  onClick={() => setActiveTab('notes')}
                >
                  <FileText size={15} />
                  <span>Nội Dung & Tóm Tắt</span>
                </button>
                <button
                  className={`btn btn-sm ${activeTab === 'resources' ? 'btn-gold' : 'btn-secondary'}`}
                  onClick={() => setActiveTab('resources')}
                >
                  <Download size={15} />
                  <span>Tài Nguyên & Presets ({course.modules.flatMap(m => m.lessons).filter(l => l.hasAttachment).length})</span>
                </button>
                <button
                  className={`btn btn-sm ${activeTab === 'qa' ? 'btn-gold' : 'btn-secondary'}`}
                  onClick={() => setActiveTab('qa')}
                >
                  <MessageSquare size={15} />
                  <span>Hỏi Đáp Học Viên ({qaList.length})</span>
                </button>
              </div>

              {/* Tab 1: Notes & Overview */}
              {activeTab === 'notes' && (
                <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  <h4 style={{ color: '#fff', marginBottom: '8px' }}>Các Điểm Cốt Lõi Cần Nhớ:</h4>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Luôn quan sát hướng đổ bóng của mũi và hốc mắt để xác định vị trí đặt đèn chính (Key Light).</li>
                    <li>Không bao giờ nâng ISO quá mức trước khi tối ưu khẩu độ và cường độ đèn Studio.</li>
                    <li>Sử dụng lưới tổ ong (Grid) khi muốn ánh sáng tập trung cục bộ vào chủ thể mà không làm tràn ra hậu cảnh.</li>
                  </ul>
                </div>
              )}

              {/* Tab 2: Resources & Presets Download */}
              {activeTab === 'resources' && (
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '14px' }}>Tệp Đính Kèm Của Khóa Học Này:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Sparkles size={20} color="var(--gold-primary)" />
                        <div>
                          <div style={{ color: '#fff', fontWeight: 600 }}>Bộ 20 Presets Chân Dung Tone Film (.XMP + .DNG)</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Dung lượng: 45 MB • Dành cho Lightroom PC & Mobile</div>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-gold btn-sm"
                        onClick={() => showToast('Đang tải xuống tệp Presets Pack...', 'success')}
                      >
                        <Download size={14} /> Tải Về
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText size={20} color="var(--accent-blue)" />
                        <div>
                          <div style={{ color: '#fff', fontWeight: 600 }}>Cheat Sheet Sơ Đồ Ánh Sáng Studio PDF</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Dung lượng: 12 MB • In ấn & tra cứu nhanh</div>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-gold btn-sm"
                        onClick={() => showToast('Đang tải xuống tệp Cheatsheet PDF...', 'success')}
                      >
                        <Download size={14} /> Tải Về
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Q&A Forum */}
              {activeTab === 'qa' && (
                <div>
                  <form onSubmit={handleAddQuestion} style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Đặt câu hỏi cho nhiếp ảnh gia Y Võ..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="form-input"
                        style={{ flex: 1 }}
                      />
                      <button type="submit" className="btn btn-gold btn-sm">
                        <Send size={15} /> Gửi
                      </button>
                    </div>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {qaList.map(item => (
                      <div key={item.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--gold-light)', marginBottom: '6px' }}>
                          <strong>{item.author}</strong>
                          <span style={{ color: 'var(--text-dim)' }}>{item.time}</span>
                        </div>
                        <p style={{ color: '#fff', fontSize: '0.92rem', marginBottom: '10px' }}>
                          ❓ {item.question}
                        </p>
                        <div style={{ background: 'rgba(212,175,55,0.06)', borderLeft: '3px solid var(--gold-primary)', padding: '10px 14px', borderRadius: '4px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                          <strong style={{ color: 'var(--gold-primary)' }}>Nhiếp ảnh gia Y Võ:</strong> {item.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Curriculum Sidebar */}
          <div>
            <div className="glass-panel" style={{ padding: '20px', position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <h3 className="font-serif" style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '16px' }}>
                Nội Dung Giáo Trình
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {course.modules?.map((mod, mIdx) => (
                  <div key={mod.id || mIdx}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      {mod.title}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {mod.lessons?.map((lesson, lIdx) => {
                        const isCurrent = activeLesson?.id === lesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id || lIdx}
                            onClick={() => setActiveLesson(lesson)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px 12px',
                              borderRadius: 'var(--radius-md)',
                              background: isCurrent ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.02)',
                              border: isCurrent ? '1px solid var(--gold-primary)' : '1px solid transparent',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLessonComplete(lesson.id);
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: isDone ? 'var(--accent-emerald)' : 'var(--text-dim)' }}
                              >
                                {isDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                              </button>
                              <span style={{ fontSize: '0.85rem', color: isCurrent ? '#fff' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {lesson.title}
                              </span>
                            </div>

                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', flexShrink: 0, marginLeft: '8px' }}>
                              {lesson.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
