import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 4321;
const BASE = '/knowledge-base';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // Strip base path
  if (url.startsWith(BASE)) url = url.slice(BASE.length) || '/';

  // Map to file
  let filePath = path.join(DIST_DIR, url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    filePath += '.html';
  }

  if (!fs.existsSync(filePath)) {
    const notFound = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(notFound));
    } else {
      res.writeHead(404); res.end('Not found');
    }
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`\n✅ Preview server running!`);
  console.log(`   http://localhost:${PORT}${BASE}/\n`);
  console.log(`   (Note: build still running — pages appear as they finish)`);
});
