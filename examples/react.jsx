import React, { useEffect, useRef } from 'react';
import OrderTracking from '@bestvoy/order-tracking';
// No need to import CSS separately - it's automatically injected!

function OrderTrackingComponent() {
  const containerRef = useRef(null);
  const trackerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !trackerRef.current) {
      trackerRef.current = new OrderTracking({
        apiUrl: '/api/common/order_tracking',
        container: containerRef.current,
        // mobileBreakpoint: 768, // Optional: customize breakpoint (default: 700)
        texts: {
          title: 'Track Your Order',
          placeholder: 'Enter your order number',
          trackButton: 'Track'
        },
        onSuccess: (data) => {
          console.log('Tracking successful:', data);
          // Handle success (e.g., show notification)
        },
        onError: (error) => {
          console.error('Tracking error:', error);
          // Handle error (e.g., show error notification)
        }
      });
    }

    return () => {
      if (trackerRef.current) {
        trackerRef.current.destroy();
        trackerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="order-tracking-wrapper">
      <div ref={containerRef}></div>
    </div>
  );
}

export default OrderTrackingComponent;

