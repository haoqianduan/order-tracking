import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

export default [
  // UMD build (for browsers via script tag) - CSS injected
  {
    input: 'src/order-tracking.js',
    output: {
      name: 'OrderTracking',
      file: 'dist/order-tracking.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: true,  // Inject CSS into JS
        minimize: production,
        sourceMap: true
      })
    ]
  },
  // UMD build (minified) - CSS injected
  {
    input: 'src/order-tracking.js',
    output: {
      name: 'OrderTracking',
      file: 'dist/order-tracking.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: true,  // Inject CSS into JS
        minimize: true,
        sourceMap: true
      }),
      terser()
    ]
  },
  // ESM build (for modern bundlers) - CSS injected
  {
    input: 'src/order-tracking.js',
    output: {
      file: 'dist/order-tracking.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: true,  // Inject CSS into JS
        minimize: production,
        sourceMap: true
      })
    ]
  },
  // CommonJS build (for Node.js) - CSS injected
  {
    input: 'src/order-tracking.js',
    output: {
      file: 'dist/order-tracking.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: true,  // Inject CSS into JS
        minimize: production,
        sourceMap: true
      })
    ]
  },
  // Standalone CSS file (optional, for those who want separate CSS)
  {
    input: 'src/order-tracking.js',
    output: {
      file: 'dist/order-tracking-standalone.js',
      format: 'esm'
    },
    plugins: [
      postcss({
        extract: 'order-tracking.css',  // Extract CSS to separate file
        minimize: production,
        sourceMap: true
      })
    ]
  }
];

