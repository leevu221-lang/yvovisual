import React, { createContext, useContext, useState, useEffect } from 'react';
import { PHOTOGRAPHER_INFO, INITIAL_PHOTOS, INITIAL_COURSES, INITIAL_ORDERS, INITIAL_USERS, INITIAL_ALBUMS } from '../data/initialData';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('minhvu_current_user');
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : INITIAL_USERS[1];
    } catch {
      return INITIAL_USERS[1];
    }
  });

  // 2. Users List
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('minhvu_users');
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // 3. Courses List
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('minhvu_courses');
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  // 4. Albums / Categories List
  const [albums, setAlbums] = useState(() => {
    try {
      const saved = localStorage.getItem('minhvu_albums');
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : INITIAL_ALBUMS;
    } catch {
      return INITIAL_ALBUMS;
    }
  });

  // 5. Photos Gallery List
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('minhvu_photos');
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  // 6. Orders List
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('minhvu_orders');
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Navigation & Modals State
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'courses' | 'about' | 'profile' | 'admin' | 'classroom'
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Upload Photo & Album Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [albumManagerOpen, setAlbumManagerOpen] = useState(false);
  
  // Payment & Auth Modals
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('minhvu_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('minhvu_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('minhvu_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('minhvu_albums', JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem('minhvu_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('minhvu_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Switch demo account role
  const switchRole = (roleType) => {
    if (roleType === 'guest') {
      setCurrentUser(null);
      showToast('Đã chuyển sang chế độ Khách (Chưa đăng nhập)', 'info');
    } else if (roleType === 'student') {
      const student = users.find(u => u.role === 'student') || INITIAL_USERS[1];
      setCurrentUser(student);
      showToast(`Đã chuyển sang Học viên: ${student.fullName}`, 'success');
    } else if (roleType === 'admin') {
      const admin = users.find(u => u.role === 'admin') || INITIAL_USERS[0];
      setCurrentUser(admin);
      showToast(`Đã chuyển sang Quản trị viên: ${admin.fullName}`, 'success');
    }
  };

  // Like a photo
  const toggleLikePhoto = (photoId) => {
    setPhotos(prev => prev.map(p => {
      if (p.id === photoId) {
        const isLiked = p.isLiked;
        return {
          ...p,
          likes: isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !isLiked
        };
      }
      return p;
    }));
  };

  // Start buying a course
  const initiateCoursePurchase = (course) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      showToast('Vui lòng đăng nhập bằng Số điện thoại để tiến hành đăng ký học', 'info');
      return;
    }

    // Check if user already owns it
    if (currentUser.enrolledCourses && currentUser.enrolledCourses.includes(course.id)) {
      showToast('Bạn đã sở hữu khóa học này rồi! Đang chuyển đến phòng học...', 'info');
      setSelectedCourseId(course.id);
      setCurrentView('classroom');
      return;
    }

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: currentUser.fullName,
      phoneNumber: currentUser.phoneNumber,
      courseId: course.id,
      courseTitle: course.title,
      amount: course.salePrice || course.originalPrice,
      paymentMethod: 'VietQR (Techcombank)',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
    };

    setPendingOrder(newOrder);
    setPaymentModalOpen(true);
  };

  // Complete Payment (either simulated or confirmed)
  const completePayment = (orderId) => {
    let targetOrder = pendingOrder;
    if (orderId && orderId !== pendingOrder?.id) {
      targetOrder = orders.find(o => o.id === orderId);
    }
    if (!targetOrder) return;

    const updatedOrder = {
      ...targetOrder,
      status: 'PAID',
      paidAt: new Date().toISOString()
    };

    // Update orders list
    setOrders(prev => {
      const exists = prev.some(o => o.id === updatedOrder.id);
      if (exists) {
        return prev.map(o => o.id === updatedOrder.id ? updatedOrder : o);
      }
      return [updatedOrder, ...prev];
    });

    // Update user's enrolled courses
    const targetPhone = targetOrder.phoneNumber;
    setUsers(prev => prev.map(u => {
      if (u.phoneNumber === targetPhone) {
        const enrolled = u.enrolledCourses || [];
        if (!enrolled.includes(targetOrder.courseId)) {
          return {
            ...u,
            enrolledCourses: [...enrolled, targetOrder.courseId],
            totalSpent: (u.totalSpent || 0) + targetOrder.amount
          };
        }
      }
      return u;
    }));

    if (currentUser && currentUser.phoneNumber === targetPhone) {
      setCurrentUser(prev => ({
        ...prev,
        enrolledCourses: [...(prev.enrolledCourses || []), targetOrder.courseId],
        totalSpent: (prev.totalSpent || 0) + targetOrder.amount
      }));
    }

    // Trigger fireworks confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn("Confetti error", e);
    }

    setPaymentModalOpen(false);
    showToast(`Thanh toán thành công đơn hàng ${targetOrder.id}! Đã mở khóa toàn bộ khóa học.`, 'success');

    // Automatically navigate to Classroom
    setSelectedCourseId(targetOrder.courseId);
    setCurrentView('classroom');
  };

  // Update user profile
  const updateUserProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.phoneNumber === currentUser.phoneNumber ? updated : u));
    showToast('Cập nhật thông tin cá nhân thành công!', 'success');
  };

  // Admin: Update/Add Course
  const saveCourse = (courseData) => {
    if (courseData.id) {
      setCourses(prev => prev.map(c => c.id === courseData.id ? courseData : c));
      showToast('Cập nhật khóa học thành công!', 'success');
    } else {
      const newCourse = {
        ...courseData,
        id: `course-${Date.now()}`,
        studentsCount: 0,
        rating: 5.0,
        reviewsCount: 1
      };
      setCourses(prev => [newCourse, ...prev]);
      showToast('Tạo khóa học mới thành công!', 'success');
    }
  };

  // Admin: Delete Course
  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    showToast('Đã xóa khóa học khỏi hệ thống', 'info');
  };

  // Admin: Save/Add Photo
  const savePhoto = (photoData) => {
    if (photoData.id) {
      setPhotos(prev => prev.map(p => p.id === photoData.id ? photoData : p));
      showToast('Cập nhật ảnh triển lãm thành công!', 'success');
    } else {
      const newPhoto = {
        ...photoData,
        id: `photo-${Date.now()}`,
        likes: 0,
        date: new Date().toISOString().split('T')[0]
      };
      setPhotos(prev => [newPhoto, ...prev]);
      showToast('Thêm tác phẩm vào Gallery thành công!', 'success');
    }
  };

  // Admin: Delete Photo
  const deletePhoto = (photoId) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
    showToast('Đã xóa ảnh khỏi Gallery', 'info');
  };

  // Add / Create Album
  const addAlbum = (albumName) => {
    if (!albumName || !albumName.trim()) {
      showToast('Vui lòng nhập tên album', 'error');
      return null;
    }
    const trimmed = albumName.trim();
    // Generate clean id
    const baseSlug = trimmed
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || `album-${Date.now()}`;

    // Ensure unique id
    let uniqueId = baseSlug;
    let counter = 1;
    while (albums.some(a => a.id === uniqueId)) {
      uniqueId = `${baseSlug}-${counter++}`;
    }

    const newAlbum = { id: uniqueId, label: trimmed };
    setAlbums(prev => [...prev, newAlbum]);
    showToast(`Đã tạo album mới: "${trimmed}"`, 'success');
    return newAlbum;
  };

  // Rename Album
  const renameAlbum = (albumId, newLabel) => {
    if (!newLabel || !newLabel.trim()) return;
    const trimmed = newLabel.trim();
    setAlbums(prev => prev.map(a => a.id === albumId ? { ...a, label: trimmed } : a));
    showToast(`Đã đổi tên album thành: "${trimmed}"`, 'success');
  };

  // Delete Album
  const deleteAlbum = (albumId) => {
    if (albums.length <= 1) {
      showToast('Cần giữ lại ít nhất một album', 'warning');
      return;
    }
    const fallbackCategory = albums.find(a => a.id !== albumId)?.id || 'general';
    // Reassign photos in this album to fallback
    setPhotos(prev => prev.map(p => p.category === albumId ? { ...p, category: fallbackCategory } : p));
    setAlbums(prev => prev.filter(a => a.id !== albumId));
    showToast('Đã xóa album và chuyển các ảnh liên quan sang album khác', 'info');
  };

  // Change Photo's Album
  const changePhotoAlbum = (photoId, newAlbumId) => {
    setPhotos(prev => prev.map(p => p.id === photoId ? { ...p, category: newAlbumId } : p));
    const albumName = albums.find(a => a.id === newAlbumId)?.label || newAlbumId;
    showToast(`Đã chuyển tác phẩm sang album "${albumName}"!`, 'success');
  };

  // Open Upload / Edit Photo Modal
  const openUploadModal = (photo = null) => {
    setEditingPhoto(photo);
    setUploadModalOpen(true);
  };

  // Admin: Grant Course directly to a student
  const grantCourseAccess = (phoneNumber, courseId) => {
    setUsers(prev => prev.map(u => {
      if (u.phoneNumber === phoneNumber) {
        const enrolled = u.enrolledCourses || [];
        if (!enrolled.includes(courseId)) {
          return {
            ...u,
            enrolledCourses: [...enrolled, courseId]
          };
        }
      }
      return u;
    }));
    if (currentUser && currentUser.phoneNumber === phoneNumber) {
      setCurrentUser(prev => ({
        ...prev,
        enrolledCourses: [...(prev.enrolledCourses || []), courseId]
      }));
    }
    showToast(`Đã cấp quyền học khóa học cho học viên SĐT ${phoneNumber}!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        courses,
        setCourses,
        albums,
        setAlbums,
        photos,
        setPhotos,
        orders,
        setOrders,
        currentView,
        setCurrentView,
        selectedCourseId,
        setSelectedCourseId,
        selectedCourseForDetail,
        setSelectedCourseForDetail,
        selectedPhoto,
        setSelectedPhoto,
        uploadModalOpen,
        setUploadModalOpen,
        editingPhoto,
        setEditingPhoto,
        albumManagerOpen,
        setAlbumManagerOpen,
        openUploadModal,
        addAlbum,
        renameAlbum,
        deleteAlbum,
        changePhotoAlbum,
        paymentModalOpen,
        setPaymentModalOpen,
        pendingOrder,
        setPendingOrder,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        toast,
        showToast,
        switchRole,
        toggleLikePhoto,
        initiateCoursePurchase,
        completePayment,
        updateUserProfile,
        saveCourse,
        deleteCourse,
        savePhoto,
        deletePhoto,
        grantCourseAccess,
        photographerInfo: PHOTOGRAPHER_INFO
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
