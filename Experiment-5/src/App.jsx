import React, { Suspense, lazy } from 'react';

// Lazy load all pages
const HomePage = lazy(() => import('./components/HomePage'));
const DashboardPage = lazy(() => import('./components/DashboardPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const SettingsPage = lazy(() => import('./components/SettingsPage'));

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Suspense fallback={<LoadingFallback />}>
        {renderPage()}
      </Suspense>
    </div>
  );
}

// Navigation Component
const Navbar = React.memo(({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <nav style={{
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '0 30px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '10px',
        margin: 0,
        padding: 0,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {navItems.map(item => (
          <li key={item.id}>
            <button
              onClick={() => setCurrentPage(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === item.id ? '#3498db' : '#666',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '20px 15px',
                fontWeight: currentPage === item.id ? 'bold' : 'normal',
                position: 'relative',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.color = '#3498db';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.color = '#666';
                }
              }}
            >
              {item.label}
              {currentPage === item.id && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#3498db'
                }} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

// Loading Fallback Component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    height: '400px'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }}></div>
    <h3 style={{ color: '#666', margin: 0 }}>Loading Page...</h3>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default React.memo(App);