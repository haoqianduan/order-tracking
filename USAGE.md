# Usage Guide

## Quick Start

### 1. Install the package

```bash
npm install @bestvoy/order-tracking
```

### 2. Import and use

```javascript
import OrderTracking from '@bestvoy/order-tracking';
import '@bestvoy/order-tracking/dist/order-tracking.css';

const tracker = new OrderTracking({
  apiUrl: '/api/common/order_tracking',
  container: '#tracking-container'
});
```

## Configuration

### Required Options

#### `apiUrl` (string)
The API endpoint URL for tracking orders. The component will append the order ID to this URL.

Example:
```javascript
apiUrl: '/api/common/order_tracking'
// Will request: /api/common/order_tracking/ORDER123
```

#### `container` (string | HTMLElement)
The container element where the component will be rendered.

Examples:
```javascript
// CSS selector
container: '#tracking-container'

// DOM element
container: document.getElementById('tracking-container')
```

#### `texts` (object)
Custom text labels for internationalization.

```javascript
texts: {
  title: 'Order Tracking',
  placeholder: 'Enter your order number',
  trackButton: 'Track',
  errorEmpty: 'Please enter an order number',
  errorNotFound: 'Could Not Find Order',
  errorNotShipped: 'This order has not been shipped yet',
  errorGeneric: 'An error occurred while tracking your order'
}
```

#### `onSuccess` (function)
Callback function called when tracking is successful.

```javascript
onSuccess: (data) => {
  console.log('Tracking data:', data);
  // data contains the API response
}
```

#### `onError` (function)
Callback function called when an error occurs.

```javascript
onError: (error) => {
  console.error('Error:', error);
  // Handle error
}
```

## API Response Format

The component expects the API to return JSON with the following structure:

### Success Response (with tracking ID)
```json
{
  "delivery_id": "1234567890"
}
```

### Success Response (no tracking ID - not shipped)
```json
{
  "message": "Order not shipped yet"
}
```

### Error Response
```json
{
  "error": "Order not found"
}
```

## Methods

### `destroy()`
Clean up and remove the component.

```javascript
tracker.destroy();
```

### `updateConfig(options)`
Update component configuration dynamically.

```javascript
// Update text labels
tracker.updateConfig({
  texts: {
    title: 'Track Your Package'
  }
});
```

## Styling

### Using Default Styles
Import the CSS file:

```javascript
import '@bestvoy/order-tracking/dist/order-tracking.css';
```

### Customizing Styles
Override CSS variables or classes:

```css
/* Override primary color */
.order-tracking-search-button {
  background: #your-brand-color !important;
}

/* Override title font size */
.order-tracking-search-title {
  font-size: 36px !important;
}

/* Override input border color */
.order-tracking-search-box {
  border-color: #your-color !important;
}
```

### Dark Mode
The component supports automatic dark mode based on system preferences. To customize:

```css
@media (prefers-color-scheme: dark) {
  .order-tracking-search-button {
    background: #your-dark-mode-color !important;
  }
}
```

## Framework-Specific Examples

### React with Hooks

```jsx
import { useEffect, useRef } from 'react';
import OrderTracking from '@bestvoy/order-tracking';
import '@bestvoy/order-tracking/dist/order-tracking.css';

function TrackingComponent() {
  const containerRef = useRef(null);
  const trackerRef = useRef(null);

  useEffect(() => {
    trackerRef.current = new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container: containerRef.current,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    });

    return () => trackerRef.current?.destroy();
  }, []);

  return <div ref={containerRef}></div>;
}
```

### Vue 3 Composition API

```vue
<template>
  <div ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import OrderTracking from '@bestvoy/order-tracking';
import '@bestvoy/order-tracking/dist/order-tracking.css';

const container = ref(null);
let tracker = null;

onMounted(() => {
  tracker = new OrderTracking({
    apiUrl: '/api/common/order_tracking',
    container: container.value
  });
});

onUnmounted(() => tracker?.destroy());
</script>
```

### Angular Component

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import OrderTracking from '@bestvoy/order-tracking';

@Component({
  selector: 'app-tracking',
  template: '<div #container></div>',
  styles: [`@import '@bestvoy/order-tracking/dist/order-tracking.css';`]
})
export class TrackingComponent implements AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef;
  private tracker: any;

  ngAfterViewInit() {
    this.tracker = new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container: this.containerRef.nativeElement
    });
  }

  ngOnDestroy() {
    this.tracker?.destroy();
  }
}
```

### Svelte

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import OrderTracking from '@bestvoy/order-tracking';
  import '@bestvoy/order-tracking/dist/order-tracking.css';

  let container;
  let tracker;

  onMount(() => {
    tracker = new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container
    });
  });

  onDestroy(() => tracker?.destroy());
</script>

<div bind:this={container}></div>
```

## Responsive Design

The component automatically handles responsive layouts:

```javascript
// Desktop layout (default)
const tracker = new OrderTracking({
  apiUrl: '/api/common/order_tracking',
  container: '#tracking-container',
});

```

## Internationalization (i18n)

Support multiple languages:

```javascript
const translations = {
  en: {
    title: 'Order Tracking',
    placeholder: 'Enter your order number',
    trackButton: 'Track'
  },
  es: {
    title: 'Seguimiento de Pedido',
    placeholder: 'Ingrese su número de pedido',
    trackButton: 'Rastrear'
  },
  fr: {
    title: 'Suivi de Commande',
    placeholder: 'Entrez votre numéro de commande',
    trackButton: 'Suivre'
  }
};

const currentLang = 'en'; // Get from your i18n system

const tracker = new OrderTracking({
  apiUrl: '/api/common/order_tracking',
  container: '#tracking-container',
  texts: translations[currentLang]
});
```

## Troubleshooting

### Component not rendering
- Ensure the container element exists in the DOM
- Check that CSS is imported
- Verify the container selector is correct

### API errors
- Check the API URL is correct
- Verify the API returns the expected JSON format
- Check CORS settings if API is on different domain

### Styling issues
- Ensure CSS is imported before initializing the component
- Check for CSS conflicts with other libraries
- Use `!important` if needed to override styles

## Best Practices

1. **Always clean up**: Call `destroy()` when component is unmounted
2. **Handle errors**: Provide `onError` callback for user feedback
3. **Accessibility**: Ensure proper focus management
4. **Performance**: Reuse component instance instead of recreating

## Advanced Usage

### Custom API Handler

```javascript
const tracker = new OrderTracking({
  apiUrl: '/api/common/order_tracking',
  container: '#tracking-container',
  onSuccess: async (data) => {
    // Custom handling
    if (data.delivery_id) {
      // Track analytics
      analytics.track('order_tracked', { orderId: data.delivery_id });
      
      // Show custom notification
      showNotification('Order found!');
    }
  },
  onError: (error) => {
    // Custom error handling
    Sentry.captureException(error);
    showErrorNotification(error.message);
  }
});
```

### Multiple Instances

```javascript
// Create multiple tracking widgets
const headerTracker = new OrderTracking({
  apiUrl: '/api/common/order_tracking',
  container: '#header-tracking'
});

const footerTracker = new OrderTracking({
  apiUrl: '/api/common/order_tracking',
  container: '#footer-tracking'
});

// Clean up all
[headerTracker, footerTracker].forEach(t => t.destroy());
```

