import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import PortfolioGallery from './components/PortfolioGallery';
import CourseList from './components/CourseList';
import CourseDetailModal from './components/CourseDetailModal';
import ClassroomView from './components/ClassroomView';
import PaymentModal from './components/PaymentModal';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import AboutSection from './components/AboutSection';
import LightboxModal from './components/LightboxModal';
import UploadPhotoModal from './components/UploadPhotoModal';
import FirebaseSyncModal from './components/FirebaseSyncModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App() {
  const { currentView } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'portfolio' && <PortfolioGallery />}
        {currentView === 'courses' && <CourseList />}
        {currentView === 'classroom' && <ClassroomView />}
        {currentView === 'profile' && <UserProfile />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'about' && <AboutSection />}
      </main>

      {/* Interactive Global Modals */}
      <LightboxModal />
      <UploadPhotoModal />
      <FirebaseSyncModal />
      <CourseDetailModal />
      <PaymentModal />
      <AuthModal />

      {/* Toast Notification Container */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
