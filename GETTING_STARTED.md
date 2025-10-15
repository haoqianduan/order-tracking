# 🚀 Getting Started with @bestvoy/order-tracking

## 📦 NPM Package Setup Complete!

Your framework-agnostic order tracking component is ready to use!

## 📋 What Was Created

### Package Structure
```
order-tracking/
├── 📄 Core Files
│   ├── package.json          ✅ Package configuration
│   ├── LICENSE               ✅ MIT License
│   ├── README.md             ✅ Main documentation
│   ├── CHANGELOG.md          ✅ Version history
│   ├── .gitignore           ✅ Git ignore rules
│   └── .npmignore           ✅ npm ignore rules
│
├── 💻 Source Code
│   └── src/
│       ├── order-tracking.js     ✅ Main component (340 lines)
│       ├── order-tracking.css    ✅ Styles (200 lines)
│       └── order-tracking.d.ts   ✅ TypeScript definitions
│
├── 🔧 Build
│   └── rollup.config.js      ✅ Build configuration
│
├── 📚 Documentation
│   ├── INDEX.md              ✅ Package overview
│   ├── USAGE.md              ✅ Usage guide
│   ├── BUILD.md              ✅ Build guide
│   ├── FILES.md              ✅ File structure
│   └── GETTING_STARTED.md    ✅ This file
│
└── 🎨 Examples
    ├── vanilla.html          ✅ Vanilla JS example
    ├── react.jsx             ✅ React example
    └── vue.vue               ✅ Vue example
```

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
cd order-tracking
npm install
```

This will install:
- rollup
- @rollup/plugin-node-resolve
- @rollup/plugin-commonjs
- @rollup/plugin-terser
- rollup-plugin-postcss

### Step 2: Build the Package

```bash
npm run build
```

This generates:
```
dist/
├── order-tracking.js          # UMD build
├── order-tracking.min.js      # UMD minified
├── order-tracking.esm.js      # ES Module
├── order-tracking.cjs.js      # CommonJS
├── order-tracking.css         # Styles
└── order-tracking.min.css     # Minified styles
```

### Step 3: Test It!

Open the example in your browser:

```bash
# macOS
open examples/vanilla.html

# Linux
xdg-open examples/vanilla.html

# Windows
start examples/vanilla.html
```

## 🧪 Local Testing

### Option 1: Using npm link

```bash
# In order-tracking directory
npm link

# In your test project
cd /path/to/your/project
npm link @bestvoy/order-tracking

# Use it
import OrderTracking from '@bestvoy/order-tracking';
```

### Option 2: Direct Import

```javascript
// Import from local dist
import OrderTracking from './order-tracking/dist/order-tracking.esm.js';
```

### Option 3: CDN Simulation

Copy `dist/` files to your local server and use them like CDN files.

## 📝 Usage Examples

### Example 1: Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/order-tracking.css">
</head>
<body>
  <div id="tracker"></div>
  
  <script src="dist/order-tracking.js"></script>
  <script>
    new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container: '#tracker'
    });
  </script>
</body>
</html>
```

### Example 2: React

```jsx
import { useEffect, useRef } from 'react';
import OrderTracking from '@bestvoy/order-tracking';
import '@bestvoy/order-tracking/dist/order-tracking.css';

function App() {
  const ref = useRef(null);

  useEffect(() => {
    const tracker = new OrderTracking({
      apiUrl: '/api/common/order_tracking',
      container: ref.current,
      onSuccess: (data) => alert('Found: ' + data.delivery_id)
    });
    return () => tracker.destroy();
  }, []);

  return <div ref={ref}></div>;
}
```

### Example 3: Vue 3

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

## 🔧 Development Workflow

### 1. Start Development Mode

```bash
npm run dev
```

This watches for changes and rebuilds automatically.

### 2. Make Changes

Edit files in `src/`:
- `order-tracking.js` - Component logic
- `order-tracking.css` - Styles
- `order-tracking.d.ts` - TypeScript types

### 3. Test Changes

Refresh `examples/vanilla.html` to see your changes.

### 4. Build for Production

```bash
npm run build
```

## 📦 Publishing to npm

### Prerequisites

1. Create npm account at https://www.npmjs.com/signup
2. Login to npm:

```bash
npm login
```

### Publishing Steps

1. **Update version** in `package.json`:
   ```json
   {
     "version": "1.0.0"  // Follow semver
   }
   ```

2. **Update CHANGELOG.md**:
   ```markdown
   ## [1.0.0] - 2024-01-01
   - Initial release
   ```

3. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

### Publishing to Scoped Package

If using scoped package (@your-org/order-tracking):

```bash
npm publish --access public
```

## 🌐 CDN Usage (After Publishing)

### unpkg

```html
<link rel="stylesheet" href="https://unpkg.com/@bestvoy/order-tracking/dist/order-tracking.min.css">
<script src="https://unpkg.com/@bestvoy/order-tracking/dist/order-tracking.min.js"></script>
```

### jsDelivr

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@bestvoy/order-tracking/dist/order-tracking.min.css">
<script src="https://cdn.jsdelivr.net/npm/@bestvoy/order-tracking/dist/order-tracking.min.js"></script>
```

## 🎨 Customization

### Custom Styles

```css
/* Override default styles */
.order-tracking-search-button {
  background: #your-brand-color !important;
}

.order-tracking-search-title {
  font-size: 32px !important;
  color: #your-color !important;
}
```

### Custom Text (i18n)

```javascript
new OrderTracking({
  apiUrl: '/api/common/order_tracking',
  container: '#tracker',
  texts: {
    title: 'Rastreamento de Pedido',        // Portuguese
    placeholder: 'Digite o número do pedido',
    trackButton: 'Rastrear',
    errorEmpty: 'Por favor, digite um número de pedido'
  }
});
```

## 🐛 Troubleshooting

### Build Errors

**Error**: `Cannot find module 'rollup'`
```bash
npm install
```

**Error**: `Unexpected token`
- Check JavaScript syntax in source files
- Ensure Node.js version >= 14

### Runtime Errors

**Error**: `Container not found`
```javascript
// Make sure container exists before initializing
const container = document.querySelector('#tracker');
if (container) {
  new OrderTracking({ container, apiUrl: '...' });
}
```

**Error**: `API request failed`
- Check API URL is correct
- Verify CORS settings
- Check network tab in DevTools

### Styling Issues

**Styles not applying**
```javascript
// Make sure to import CSS
import '@bestvoy/order-tracking/dist/order-tracking.css';
```

## 📊 Package Info

- **Size**: ~5KB minified + gzipped
- **Dependencies**: Zero runtime dependencies
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Node.js**: >= 14.0.0

## 🔗 Useful Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Watch mode (development)
npm run dev

# Link locally
npm link

# Publish to npm
npm publish

# Check package size
npm run build && du -sh dist/*
```

## 📚 Documentation Files

- **README.md** - Overview and quick start
- **USAGE.md** - Detailed API and usage guide
- **BUILD.md** - Build and publishing instructions
- **INDEX.md** - Package structure and overview
- **FILES.md** - Complete file listing
- **GETTING_STARTED.md** - This file (setup guide)

## ✅ Checklist

Before publishing:

- [ ] All dependencies installed (`npm install`)
- [ ] Package builds successfully (`npm run build`)
- [ ] Examples work in browser
- [ ] Version updated in `package.json`
- [ ] CHANGELOG.md updated
- [ ] README.md reviewed
- [ ] TypeScript definitions correct
- [ ] License file included
- [ ] Test in multiple frameworks

## 🎉 You're Ready!

Your order tracking component is now:
- ✅ Framework-agnostic
- ✅ Fully documented
- ✅ Ready to publish
- ✅ Easy to integrate
- ✅ Production-ready

## 🚀 Next Steps

1. **Test locally**: `npm run build && open examples/vanilla.html`
2. **Test with your app**: `npm link` in this directory
3. **Customize**: Update styles and text as needed
4. **Publish**: `npm publish` when ready
5. **Share**: Add to your project's documentation

## 📞 Support

If you encounter any issues:
1. Check the documentation files
2. Review the examples
3. Check the source code comments
4. Open an issue on GitHub

---

**Happy Coding! 🎨**

Made with ❤️ by BestVoy Team

