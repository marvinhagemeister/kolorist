const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '..', 'dist', 'esm');
fs.copyFileSync(path.join(dir, 'index.js'), path.join(dir, 'index.mjs'));
