import React, { useState, useMemo, useCallback, memo } from 'react';
import OptimizedImage from './OptimizedImage';
import VirtualizedList from './VirtualizedList';

// Memoized child component
const CounterButton = memo(({ onClick, count }) => {
  console.log('CounterButton rendered');
  return (
    <button onClick={onClick} style={styles.button}>
      Clicked {count} times
    </button>
  );
});

// Another memoized component
const UserInfo = memo(({ user }) => {
  console.log('UserInfo rendered');
  return (
    <div style={styles.userInfo}>
      <h3 style={styles.userName}>{user.name}</h3>
      <p style={styles.userEmail}>{user.email}</p>
    </div>
  );
});

function HomePage() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    { id: 1, name: 'Arif', email: 'arif@gmail.com' },
    { id: 2, name: 'Billah', email: 'billah@gmail.com' },
    { id: 3, name: 'Arafat', email: 'arafat@gmail.com' },
    { id: 4, name: 'Alice Williams', email: 'alice@gmail.com' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@gmail.com' },
    { id: 6, name: 'Diana Prince', email: 'diana@gmail.com' },
    { id: 7, name: 'Bruce Wayne', email: 'bruce@gmail.com' },
    { id: 8, name: 'Clark Kent', email: 'clark@gmail.com' }
  ]);

  // useMemo for expensive calculations
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // useCallback to prevent function recreation
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Home Page</h1>
        
        <div style={styles.optimizationDemo}>
          <h2 style={styles.subtitle}>Performance Optimizations</h2>
          
          {/* 1. Memoized Component */}
          <div style={styles.demoSection}>
            <h3 style={styles.sectionTitle}>1. React.memo Example</h3>
            <p style={styles.description}>
              These components only re-render when their props change. Check the console to see render logs.
            </p>
            <div style={styles.demoContent}>
              <CounterButton onClick={handleIncrement} count={count} />
              <UserInfo user={{ name: 'Arif', email: 'arif@gmail.com' }} />
            </div>
          </div>

          {/* 2. useMemo Example */}
          <div style={styles.demoSection}>
            <h3 style={styles.sectionTitle}>2. useMemo Example</h3>
            <p style={styles.description}>
              The user filtering calculation is memoized and only runs when users or search term changes.
            </p>
            <div style={styles.demoContent}>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={handleSearch}
                style={styles.searchInput}
              />
              <div style={styles.resultsContainer}>
                <p style={styles.resultText}>
                  Showing {filteredUsers.length} of {users.length} users
                </p>
                {filteredUsers.length > 0 && (
                  <div style={styles.usersGrid}>
                    {filteredUsers.map(user => (
                      <div key={user.id} style={styles.userCard}>
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Image Optimization */}
          <div style={styles.demoSection}>
            <h3 style={styles.sectionTitle}>3. Image Optimization</h3>
            <p style={styles.description}>
              Images are lazy-loaded with optimized dimensions and quality settings.
            </p>
            <div style={styles.demoContent}>
              <div style={styles.imageGrid}>
                <OptimizedImage
                  src="images/image1.png"
                  alt="image 1"
                  width={350}
                  height={250}
                />
                <OptimizedImage
                  src="images/im2.png"
                  alt="Image 2"
                  width={350}
                  height={250}
                />
                <OptimizedImage
                  src="images/im3.png"
                  alt="Image 3"
                  width={350}
                  height={250}
                />
                <OptimizedImage
                  src="images/4.avif"
                  alt="Image 3"
                  width={350}
                  height={250}
                />
              </div>
            </div>
          </div>

          {/* 4. Virtualized List */}
          <div style={styles.demoSection}>
            <h3 style={styles.sectionTitle}>4. Virtualized List</h3>
            <p style={styles.description}>
              Rendering 1000 items efficiently using virtualization. Only visible items are rendered.
            </p>
            <div style={styles.demoContent}>
              <div style={styles.virtualListContainer}>
                <VirtualizedList
                  items={Array.from({ length: 1000 }, (_, i) => ({
                    id: i,
                    text: `List Item ${i + 1}`,
                    value: Math.floor(Math.random() * 1000)
                  }))}
                  itemHeight={50}
                  visibleItems={8}
                />
              </div>
              <p style={styles.note}>
                Scroll to see virtualization in action. Only ~15 items are rendered at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles object
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  content: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '2.5rem',
    marginBottom: '10px',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: '#3498db',
    fontSize: '1.8rem',
    marginBottom: '40px',
    fontWeight: '600',
  },
  optimizationDemo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  demoSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '30px',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  demoSectionHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    color: '#2c3e50',
    fontSize: '1.5rem',
    marginBottom: '15px',
    fontWeight: '600',
  },
  description: {
    color: '#64748b',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '25px',
  },
  demoContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '25px',
    border: '1px solid #e2e8f0',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    display: 'block',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(52, 152, 219, 0.3)',
  },
  userInfo: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    maxWidth: '300px',
  },
  userName: {
    margin: '0 0 8px 0',
    color: '#2c3e50',
    fontSize: '18px',
  },
  userEmail: {
    margin: '0',
    color: '#64748b',
    fontSize: '14px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '20px',
    transition: 'border-color 0.3s ease',
    maxWidth: '400px',
  },
  searchInputFocus: {
    borderColor: '#3498db',
    outline: 'none',
  },
  resultsContainer: {
    marginTop: '20px',
  },
  resultText: {
    color: '#64748b',
    marginBottom: '15px',
    fontSize: '14px',
  },
  usersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
  },
  userCard: {
    backgroundColor: '#f8fafc',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  },
  virtualListContainer: {
    height: '400px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
  },
  note: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '14px',
    marginTop: '15px',
    fontStyle: 'italic',
  },
};

// Add hover effects
const addHoverEffects = () => {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    button:hover {
      background-color: #2980b9 !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3) !important;
    }
    
    input:focus {
      border-color: #3498db !important;
      outline: none;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
    
    .demo-section:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
    }
    
    .user-card:hover {
      background-color: #f1f5f9 !important;
      border-color: #3498db !important;
    }
  `;
  document.head.appendChild(styleSheet);
};

// Initialize hover effects
if (typeof window !== 'undefined') {
  addHoverEffects();
}

export default React.memo(HomePage);