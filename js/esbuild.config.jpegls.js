const esbuild = require('esbuild');
const fs = require('fs');

esbuild.build({
  entryPoints: ['./src/index.jpegls.js'],
  outfile: './dist/index.jpegls.js',
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  minify: false,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}).then(() => {
  // copy worker.js, dcm2niix.wasm, dcm2niix.js to dist folder
  // (they do not require any processing by esbuild).
  // Technically, none of the files in the src folder require processing by esbuild, 
  // but it does allow minification (optional), and ES version target specification if needed.
  // In the future, if we use Typescript, we can use esbuild to transpile the Typescript to JS.
  fs.copyFileSync('./src/worker.jpegls.js', './dist/worker.jpegls.js');
  fs.copyFileSync('./src/dcm2niix.jpegls.wasm', './dist/dcm2niix.jpegls.wasm');
  fs.copyFileSync('./src/dcm2niix.jpegls.js', './dist/dcm2niix.jpegls.js');
  console.log('Build completed!');
}).catch(() => process.exit(1));