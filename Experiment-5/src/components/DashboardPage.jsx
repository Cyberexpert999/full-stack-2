import React, { memo, useMemo, useState, useCallback } from 'react';

const DashboardPage = memo(() => {
  const [stats, setStats] = useState({
    views: 1500,
    users: 450,
    revenue: 12500,
    conversion: 3.2
  });

  // Expensive calculation memoized
  const calculatedMetrics = useMemo(() => {
    console.log('Calculating dashboard metrics...');
    return {
      averagePerUser: stats.revenue / stats.users,
      growthRate: ((stats.views - 1000) / 1000) * 100,
      estimatedRevenue: stats.revenue * (1 + stats.conversion / 100)
    };
  }, [stats]);

  const updateStat = useCallback((key, value) => {
    setStats(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div style={{ 
      padding: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        marginBottom: '30px',
        borderBottom: '3px solid #2ecc71',
        paddingBottom: '10px'
      }}>
        Dashboard - Performance Metrics
      </h1>
      
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        
        <h2 style={{ color: '#2ecc71', marginBottom: '25px' }}>Business Statistics</h2>
        
        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <StatCard title="Total Views" value={stats.views.toLocaleString()} color="#3498db" />
          <StatCard title="Active Users" value={stats.users.toLocaleString()} color="#2ecc71" />
          <StatCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} color="#9b59b6" />
          <StatCard title="Conversion Rate" value={`${stats.conversion}%`} color="#e74c3c" />
        </div>

        {/* Memoized Calculations */}
        <div style={{ 
          padding: '25px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Calculated Metrics (useMemo)</h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <MetricCard 
              label="Average Revenue per User" 
              value={`$${calculatedMetrics.averagePerUser.toFixed(2)}`} 
            />
            <MetricCard 
              label="Growth Rate" 
              value={`${calculatedMetrics.growthRate.toFixed(1)}%`} 
            />
            <MetricCard 
              label="Estimated Next Month Revenue" 
              value={`$${calculatedMetrics.estimatedRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`} 
            />
          </div>
          <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            These calculations are memoized and only recompute when stats change (check console)
          </p>
        </div>

        {/* Update Controls */}
        <div style={{ 
          padding: '25px',
          backgroundColor: '#e8f4fc',
          borderRadius: '10px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Update Statistics</h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <StatInput 
              label="Views" 
              value={stats.views} 
              onChange={(val) => updateStat('views', val)} 
            />
            <StatInput 
              label="Users" 
              value={stats.users} 
              onChange={(val) => updateStat('users', val)} 
            />
            <StatInput 
              label="Revenue" 
              value={stats.revenue} 
              onChange={(val) => updateStat('revenue', val)} 
            />
            <StatInput 
              label="Conversion %" 
              value={stats.conversion} 
              onChange={(val) => updateStat('conversion', val)} 
              step="0.1"
            />
          </div>
        </div>

      </div>
    </div>
  );
});

// Memoized Stat Card Component
const StatCard = memo(({ title, value, color = '#3498db' }) => {
  console.log(`StatCard "${title}" rendered`);
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '25px',
      borderRadius: '10px',
      textAlign: 'center',
      border: `2px solid ${color}20`,
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s, box-shadow 0.3s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    }}>
      <h3 style={{ 
        margin: '0 0 15px 0', 
        color: '#666',
        fontSize: '16px',
        fontWeight: 'normal'
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        margin: 0, 
        color: color 
      }}>
        {value}
      </p>
    </div>
  );
});

// Memoized Metric Card Component
const MetricCard = memo(({ label, value }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #eee'
    }}>
      <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
        {value}
      </p>
    </div>
  );
});

// Memoized Stat Input Component
const StatInput = memo(({ label, value, onChange, step = 1 }) => {
  return (
    <div>
      <label style={{ 
        display: 'block', 
        marginBottom: '8px',
        fontWeight: '500',
        color: '#2c3e50'
      }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        style={{
          width: '100%',
          padding: '10px',
          border: '2px solid #ddd',
          borderRadius: '6px',
          fontSize: '16px',
          transition: 'border-color 0.3s'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#3498db';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#ddd';
        }}
      />
    </div>
  );
});

export default DashboardPage;