# Build Guide

## Prerequisites

- Node.js >= 14.x
- npm >= 6.x

## Installation

Install dependencies:

```bash
cd order-tracking
npm install
```

## Build

### Development Build (with watch mode)

```bash
npm run dev
```

This will:
- Watch for file changes
- Rebuild automatically
- Generate source maps

### Production Build

```bash
npm run build
```

This will generate the following files in `dist/`:

```
dist/
├── order-tracking.js          # UMD build (for browsers)
├── order-tracking.js.map      # Source map
├── order-tracking.min.js      # UMD build (minified)
├── order-tracking.min.js.map  # Source map (minified)
├── order-tracking.esm.js      # ES Module build
├── order-tracking.esm.js.map  # Source map
├── order-tracking.cjs.js      # CommonJS build
├── order-tracking.cjs.js.map  # Source map
├── order-tracking.css         # Styles
├── order-tracking.css.map     # Source map
├── order-tracking.min.css     # Styles (minified)
└── order-tracking.min.css.map # Source map (minified)
```

## Build Formats

### UMD (Universal Module Definition)
- **File**: `order-tracking.js` / `order-tracking.min.js`
- **Usage**: `<script>` tag in browsers
- **Global**: `window.OrderTracking`

```html
<script src="order-tracking.min.js"></script>
<script>
  new OrderTracking({ ... });
</script>
```

### ESM (ES Modules)
- **File**: `order-tracking.esm.js`
- **Usage**: Modern bundlers (Webpack, Rollup, Vite)

```javascript
import OrderTracking from '@bestvoy/order-tracking';
```

### CommonJS
- **File**: `order-tracking.cjs.js`
- **Usage**: Node.js, older bundlers

```javascript
const OrderTracking = require('@bestvoy/order-tracking');
```

## Testing

### Test in Browser

1. Build the package:
```bash
npm run build
```

2. Open the example:
```bash
# Open examples/vanilla.html in your browser
open examples/vanilla.html
```

### Test with npm link

1. Link the package locally:
```bash
npm link
```

2. In your test project:
```bash
npm link @bestvoy/order-tracking
```

3. Use it in your project:
```javascript
import OrderTracking from '@bestvoy/order-tracking';
```

## Publishing

### Prepare for Publishing

1. Update version in `package.json`:
```json
{
  "version": "1.0.0"
}
```

2. Update `CHANGELOG.md` with changes

3. Build the package:
```bash
npm run build
```

### Publish to npm

```bash
# Login to npm
npm login

# Publish (will run prepublishOnly script automatically)
npm publish
```

### Publish to GitHub Packages

1. Update `package.json`:
```json
{
  "name": "@your-org/order-tracking",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

2. Create `.npmrc`:
```
@your-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

3. Publish:
```bash
npm publish
```

## Development Workflow

### 1. Make Changes
Edit files in `src/`:
- `order-tracking.js` - Main component logic
- `order-tracking.css` - Styles
- `order-tracking.d.ts` - TypeScript definitions

### 2. Test Locally
```bash
npm run dev
# Open examples/vanilla.html
```

### 3. Build for Production
```bash
npm run build
```

### 4. Verify Build
Check `dist/` folder for generated files

### 5. Update Documentation
- Update `README.md`
- Update `CHANGELOG.md`
- Update `USAGE.md` if needed

### 6. Commit and Push
```bash
git add .
git commit -m "feat: add new feature"
git push
```

## Rollup Configuration

The build uses Rollup with the following plugins:

- **@rollup/plugin-node-resolve**: Resolve node_modules
- **@rollup/plugin-commonjs**: Convert CommonJS to ES6
- **@rollup/plugin-terser**: Minify code
- **rollup-plugin-postcss**: Process CSS

### Customizing Build

Edit `rollup.config.js`:

```javascript
export default [
  {
    input: 'src/order-tracking.js',
    output: {
      name: 'OrderTracking',
      file: 'dist/order-tracking.js',
      format: 'umd'
    },
    plugins: [
      // Add or modify plugins
    ]
  }
];
```

## CI/CD

### GitHub Actions Example

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Troubleshooting

### Build Errors

**Error**: `Module not found`
- Run `npm install`
- Check import paths

**Error**: `Unexpected token`
- Check JavaScript syntax
- Ensure Rollup config is correct

### CSS Not Bundling

- Check `postcss` plugin configuration
- Verify CSS import in JS file

### TypeScript Errors

- Update `src/order-tracking.d.ts`
- Run `tsc --noEmit` to check types

## File Structure

```
order-tracking/
├── src/                    # Source files
│   ├── order-tracking.js   # Main component
│   ├── order-tracking.css  # Styles
│   └── order-tracking.d.ts # TypeScript definitions
├── dist/                   # Built files (generated)
├── examples/               # Usage examples
│   ├── vanilla.html
│   ├── react.jsx
│   └── vue.vue
├── package.json
├── rollup.config.js
├── README.md
├── USAGE.md
├── BUILD.md
├── CHANGELOG.md
├── LICENSE
├── .gitignore
└── .npmignore
```

## Best Practices

1. **Always build before publishing**
2. **Test in multiple browsers**
3. **Update version according to semver**
4. **Document breaking changes**
5. **Keep dist/ out of version control** (add to .gitignore)
6. **Use npm scripts for consistency**

## Scripts Reference

```json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "prepublishOnly": "npm run build"
  }
}
```

- `build`: Production build
- `dev`: Development build with watch mode
- `prepublishOnly`: Runs automatically before `npm publish`

