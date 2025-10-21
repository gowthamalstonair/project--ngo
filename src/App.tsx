import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { DonatePage } from './components/pages/DonatePage';
import { EnquiryPage } from './components/pages/EnquiryPage';
import { JoinPage } from './components/pages/JoinPage';
import { NGOListPage } from './components/pages/NGOListpage';
import { NGODetailsPage } from './components/pages/NGODetailspage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { Chatbot } from './components/Chatbot';
import { useChatbot } from './hooks/useChatbot';
import { VolunteerPage } from './components/pages/Volunteer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { WhatsAppChat } from './components/pages/WhatsAppChat';
import { AddDonation } from './components/pages/AddDonation';
import { RecordExpense } from './components/pages/RecordExpense';
import { UpdateProject } from './components/pages/UpdateProject';
import { DonorDetails } from './components/pages/DonorDetails';
import { AddNGO } from './components/pages/AddNGO';
import { WhatsAppCommunication } from './components/pages/WhatsAppCommunication';
import { JoinNetwork } from './components/pages/JoinNetwork';
import { AddEmployee } from './components/pages/AddEmployee';
import StaffProfile from './components/pages/StaffProfile';
import PerformanceReviewDetails from './components/pages/PerformanceReviewDetails';


function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const { isOpen, toggleChatbot } = useChatbot();

  // Handle browser back/forward and navigation
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    
    // Also update on initial load
    setCurrentPage(window.location.pathname);
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update current page when location changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (window.location.pathname !== currentPage) {
        setCurrentPage(window.location.pathname);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentPage]);

  // ---------- Routing ----------
  if (currentPage === '/donate') {
    return <DonatePage />;
  }

  if (currentPage === '/join') {
    return <JoinPage />;
  }

  if (currentPage === '/enquiry') {
    return <EnquiryPage />;
  }

  // ✅ New NGO List Page
  if (currentPage === '/ngos') {
    return <NGOListPage />;
  }

  // ✅ New NGO Details Page (/ngos/1, /ngos/2, etc.)
  if (currentPage.startsWith('/ngos/')) {
    const id = currentPage.split('/')[2]; // e.g., /ngos/2 → "2"
    return <NGODetailsPage id={id} />;
  }

  if (currentPage === '/volunteers') {
  return <VolunteerPage />;
}
if (currentPage === '/whatsappchat') {
  return <WhatsAppChat />;
}
if (currentPage === '/add-donation') {
  return (
    <DashboardProvider>
      <AddDonation />
    </DashboardProvider>
  );
}
if (currentPage === '/record-expense') {
  return (
    <DashboardProvider>
      <RecordExpense />
    </DashboardProvider>
  );
}
if (currentPage === '/update-project') {
  return (
    <DashboardProvider>
      <UpdateProject />
    </DashboardProvider>
  );
}
if (currentPage === '/donor-details') {
  return (
    <DashboardProvider>
      <DonorDetails />
    </DashboardProvider>
  );
}
if (currentPage === '/add-ngo') {
  return (
    <DashboardProvider>
      <AddNGO />
    </DashboardProvider>
  );
}
if (currentPage === '/whatsapp-communication') {
  return <WhatsAppCommunication />;
}
if (currentPage === '/join-network') {
  return <JoinNetwork />;
}
if (currentPage === '/add-employee') {
  return <AddEmployee />;
}
if (currentPage === '/staff-profile') {
  return <StaffProfile />;
}
if (currentPage === '/performance-review-details') {
  return <PerformanceReviewDetails />;
}


  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Main app content
  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <DashboardProvider>
          <Dashboard />
          <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
        </DashboardProvider>
      ) : (
        <>
          <LandingPage />
          <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
