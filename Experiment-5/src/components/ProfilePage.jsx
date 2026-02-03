import React, { memo, useState, useCallback } from 'react';

const ProfilePage = memo(() => {
  const [profile, setProfile] = useState({
    name: 'Arif',
    email: 'arif@gmail.com',
    bio: 'Frontend developer focused on performance optimization',
    location: 'Bangladesh',
    website: 'https://arif-billah.netlify.app/'
  });

  const updateProfile = useCallback((field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div style={{ 
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        marginBottom: '30px',
        borderBottom: '3px solid #9b59b6',
        paddingBottom: '10px'
      }}>
        Profile Page
      </h1>
      
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        
        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Name:
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => updateProfile('name', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9b59b6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Email:
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => updateProfile('email', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9b59b6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Bio:
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => updateProfile('bio', e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              resize: 'vertical',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9b59b6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Location:
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => updateProfile('location', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9b59b6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            Website:
          </label>
          <input
            type="url"
            value={profile.website}
            onChange={(e) => updateProfile('website', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#9b59b6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
            }}
          />
        </div>

        <button
          onClick={() => alert('Profile saved!')}
          style={{
            padding: '12px 30px',
            backgroundColor: '#9b59b6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#8e44ad';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#9b59b6';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Save Profile
        </button>

      </div>
    </div>
  );
});

export default ProfilePage;