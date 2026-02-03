import React, { memo, useRef, useState, useMemo, useCallback } from 'react';

const VirtualizedList = memo(({ 
  items, 
  itemHeight = 50, 
  visibleItems = 8,
  overscan = 5
}) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const containerHeight = visibleItems * itemHeight;
  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  // Calculate visible range
  const { startIndex, endIndex } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, items.length, itemHeight, containerHeight, overscan]);

  // Get visible items
  const visibleItemsData = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        height: `${containerHeight}px`,
        overflowY: 'auto',
        borderRadius: '8px',
        position: 'relative',
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0'
      }}
      onScroll={handleScroll}
    >
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#3498db',
        color: 'white',
        padding: '15px 20px',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #2980b9'
      }}>
        <div>
          <strong>Virtualized List</strong>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>
            Showing {visibleItemsData.length} of {items.length} items
          </div>
        </div>
        <div style={{ fontSize: '14px' }}>
          Scroll to navigate
        </div>
      </div>

      {/* Spacer to maintain total height */}
      <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {/* Render only visible items */}
        {visibleItemsData.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: `${actualIndex * itemHeight}px`,
                height: `${itemHeight}px`,
                width: '100%',
                padding: '0 20px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: actualIndex % 2 === 0 ? '#f8fafc' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e3f2fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = actualIndex % 2 === 0 ? '#f8fafc' : '#fff';
              }}
              onClick={() => console.log('Clicked item:', item.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{
                  fontWeight: 'bold',
                  color: '#3498db',
                  minWidth: '50px',
                  fontSize: '14px'
                }}>
                  #{actualIndex + 1}
                </span>
                <span style={{ fontSize: '15px', color: '#2c3e50' }}>{item.text}</span>
              </div>
              {item.value && (
                <span style={{
                  backgroundColor: '#e3f2fd',
                  color: '#3498db',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  {item.value}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: '#f8fafc',
        padding: '10px 20px',
        borderTop: '1px solid #e2e8f0',
        fontSize: '12px',
        color: '#64748b',
        textAlign: 'center'
      }}>
        Virtualization active • Item height: {itemHeight}px • Viewport: {visibleItems} items
      </div>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;