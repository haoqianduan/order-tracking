# Order Tracking Component

A framework-agnostic, lightweight order tracking search component that works with any frontend framework or vanilla JavaScript.

## Features

- 🚀 Framework-agnostic (works with React, Vue, Angular, Svelte, or vanilla JS)
- 📱 Responsive design with mobile support
- 🎨 Customizable text labels
- 🌙 Dark mode support
- 📦 Lightweight (~5KB minified + gzipped)
- ♿ Accessible
- 🔌 Easy to integrate

## Installation

```bash
npm install @bestvoy/order-tracking
```

Or via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/@bestvoy/order-tracking/dist/order-tracking.min.css">
<script src="https://unpkg.com/@bestvoy/order-tracking/dist/order-tracking.min.js"></script>
```

## Usage

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<body>
  <div id="tracking-container"></div>

  <!-- CSS is automatically injected, no need to include separately -->
  <script src="node_modules/@bestvoy/order-tracking/dist/order-tracking.js"></script>
  <script>
    const tracker = new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container: '#tracking-container',
      onSuccess: (data) => {
        console.log('Tracking successful:', data);
      },
      onError: (error) => {
        console.error('Tracking error:', error);
      }
    });
  </script>
</body>
</html>
```

### React

```jsx
import { useEffect, useRef } from 'react';
import OrderTracking from '@bestvoy/order-tracking';
import '@bestvoy/order-tracking/dist/order-tracking.css';

function TrackingComponent() {
  const containerRef = useRef(null);
  const trackerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      trackerRef.current = new OrderTracking({
        apiUrl: '/api/common/order_tracking',
        container: containerRef.current,
        texts: {
          title: 'Track Your Order',
          placeholder: 'Enter order number',
          trackButton: 'Track'
        },
        onSuccess: (data) => {
          console.log('Success:', data);
        },
        onError: (error) => {
          console.error('Error:', error);
        }
      });
    }

    return () => {
      if (trackerRef.current) {
        trackerRef.current.destroy();
      }
    };
  }, []);

  return <div ref={containerRef}></div>;
}
```

### Vue 3

```vue
<template>
  <div ref="trackingContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import OrderTracking from '@bestvoy/order-tracking';
import '@bestvoy/order-tracking/dist/order-tracking.css';

const trackingContainer = ref(null);
let tracker = null;

onMounted(() => {
  tracker = new OrderTracking({
    apiUrl: '/api/common/order_tracking',
    container: trackingContainer.value,
    onSuccess: (data) => {
      console.log('Success:', data);
    },
    onError: (error) => {
      console.error('Error:', error);
    }
  });
});

onUnmounted(() => {
  if (tracker) {
    tracker.destroy();
  }
});
</script>
```

### Angular

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import OrderTracking from '@bestvoy/order-tracking';

@Component({
  selector: 'app-tracking',
  template: '<div #trackingContainer></div>',
  styles: [`@import '@bestvoy/order-tracking/dist/order-tracking.css';`]
})
export class TrackingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('trackingContainer') containerRef!: ElementRef;
  private tracker: any;

  ngAfterViewInit() {
    this.tracker = new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container: this.containerRef.nativeElement,
      onSuccess: (data) => {
        console.log('Success:', data);
      },
      onError: (error) => {
        console.error('Error:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.tracker) {
      this.tracker.destroy();
    }
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
      container: container,
      onSuccess: (data) => {
        console.log('Success:', data);
      },
      onError: (error) => {
        console.error('Error:', error);
      }
    });
  });

  onDestroy(() => {
    if (tracker) {
      tracker.destroy();
    }
  });
</script>

<div bind:this={container}></div>
```

## API

### Constructor Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `apiUrl` | `string` | Yes | - | API endpoint URL (e.g., '/api/common/order_tracking') |
| `container` | `string \| HTMLElement` | Yes | - | CSS selector or DOM element for the container |
| `texts` | `object` | No | See below | Custom text labels |
| `onError` | `function` | No | `() => {}` | Error callback function |
| `onSuccess` | `function` | No | `() => {}` | Success callback function |

### Text Options

```javascript
{
  title: 'Order Tracking',
  placeholder: 'Enter your order number',
  trackButton: 'Track',
  errorEmpty: 'Please enter an order number',
  errorNotFound: 'Could Not Find Order',
  errorNotShipped: 'This order has not been shipped yet. Please check again after it has been shipped',
  errorGeneric: 'An error occurred while tracking your order'
}
```

### Methods

#### `destroy()`
Clean up and remove the component.

```javascript
tracker.destroy();
```

#### `updateConfig(options)`
Update component configuration.

```javascript
tracker.updateConfig({
  texts: {
    title: 'New Title'
  }
});
```

## API Response Format

The component expects the API to return JSON in the following format:

```json
{
  "delivery_id": "1234567890"
}
```

If `delivery_id` exists, the component will open a tracking page at 17track.net.

## Styling

The component uses CSS classes prefixed with `order-tracking-` to avoid conflicts. You can override styles:

```css
.order-tracking-search-title {
  color: #your-color;
  font-size: 32px;
}

.order-tracking-search-button {
  background: #your-brand-color;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT

## Support

For issues and questions, please visit [GitHub Issues](https://github.com/bestvoy/order-tracking/issues)

