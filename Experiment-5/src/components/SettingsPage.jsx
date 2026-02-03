import React, { memo, useState, useCallback } from 'react';

const SettingsPage = memo(() => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
    autosave: true,
    fontSize: 'medium'
  });

  const toggleSetting = useCallback((key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
        borderBottom: '3px solid #e74c3c',
        paddingBottom: '10px'
      }}>
        Settings Page
      </h1>
      
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        
        <SettingItem
          title="Theme"
          type="select"
          value={settings.theme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ]}
          onChange={(value) => updateSetting('theme', value)}
        />

        <SettingItem
          title="Notifications"
          type="toggle"
          value={settings.notifications}
          onChange={() => toggleSetting('notifications')}
        />

        <SettingItem
          title="Language"
          type="select"
          value={settings.language}
          options={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' }
          ]}
          onChange={(value) => updateSetting('language', value)}
        />

        <SettingItem
          title="Auto Save"
          type="toggle"
          value={settings.autosave}
          onChange={() => toggleSetting('autosave')}
        />

        <SettingItem
          title="Font Size"
          type="select"
          value={settings.fontSize}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'x-large', label: 'Extra Large' }
          ]}
          onChange={(value) => updateSetting('fontSize', value)}
        />

      </div>
    </div>
  );
});

// Memoized Setting Item Component
const SettingItem = memo(({ title, type, value, options, onChange }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      borderBottom: '1px solid #eee'
    }}>
      <div>
        <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          {getDescription(title, value, options)}
        </p>
      </div>
      
      {type === 'toggle' ? (
        <button
          onClick={onChange}
          style={{
            width: '60px',
            height: '30px',
            backgroundColor: value ? '#2ecc71' : '#e0e0e0',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background-color 0.3s'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '3px',
            left: value ? '33px' : '3px',
            width: '24px',
            height: '24px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.3s'
          }} />
        </button>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '2px solid #ddd',
            borderRadius: '6px',
            backgroundColor: '#fff',
            fontSize: '14px',
            minWidth: '120px',
            cursor: 'pointer',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#e74c3c';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ddd';
          }}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
});

// Helper function for descriptions
function getDescription(title, value, options) {
  switch (title) {
    case 'Theme':
      return `Current theme: ${value}`;
    case 'Notifications':
      return value ? 'Notifications are enabled' : 'Notifications are disabled';
    case 'Language':
      const lang = options?.find(opt => opt.value === value)?.label || value;
      return `Interface language: ${lang}`;
    case 'Auto Save':
      return value ? 'Documents are saved automatically' : 'Manual save required';
    case 'Font Size':
      return `Text size: ${value}`;
    default:
      return 'Setting description';
  }
}

export default SettingsPage;