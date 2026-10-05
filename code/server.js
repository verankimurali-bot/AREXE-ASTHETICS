/**
 * PANDU COLLECTIONS & AURA ATELIER - BACKEND SERVER
 * Zero-dependency Node.js HTTP & REST API Server
 * 
 * Run with: node server.js
 * Default Port: 3000 (http://localhost:3000)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json');

// MIME types for static asset serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

// Ensure data folder and files exist
function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(NEWSLETTER_FILE)) {
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify([], null, 2));
  }
}
ensureDatabase();

// Helper to read JSON file safely
function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Helper to write JSON file safely
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Helper to parse incoming request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Safeguard against huge payloads (max 2MB)
      if (body.length > 2 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Send JSON HTTP response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Send CORS preflight response
function handleCorsPreflight(res) {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end();
}

// Static file server
function serveStaticFile(req, res, pathname) {
  let relativePath = pathname === '/' ? 'index.html' : pathname;
  if (relativePath === '/admin') relativePath = 'admin.html';
  
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 Not Found
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// Master HTTP Request Listener
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS OPTIONS
  if (method === 'OPTIONS') {
    return handleCorsPreflight(res);
  }

  /* =========================================================================
     REST API ROUTING
     ========================================================================= */

  // 1. GET /api/products - Retrieve full catalog
  if (pathname === '/api/products' && method === 'GET') {
    const products = readJson(PRODUCTS_FILE);
    return sendJson(res, 200, { success: true, count: products.length, data: products });
  }

  // 2. POST /api/products - Add new product (Admin)
  if (pathname === '/api/products' && method === 'POST') {
    try {
      const payload = await parseRequestBody(req);

      if (!payload.name || !payload.price) {
        return sendJson(res, 400, { success: false, message: 'Name and price are required.' });
      }

      const products = readJson(PRODUCTS_FILE);
      const newProduct = {
        id: payload.id || `pandu-${(payload.category || 'drop').slice(0, 3)}-${Date.now().toString().slice(-4)}`,
        name: payload.name,
        category: payload.category || 'streetwear',
        price: parseFloat(payload.price),
        material: payload.material || 'Organic Fabric',
        badge: payload.badge || 'NEW DROP',
        image: payload.image || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
        description: payload.description || '',
        swatches: payload.swatches || [{ name: 'Obsidian Black', hex: '#121214' }],
        createdAt: new Date().toISOString()
      };

      // Prepend so newly added piece is immediately at the front
      products.unshift(newProduct);
      writeJson(PRODUCTS_FILE, products);

      console.log(`[API] Added new product: ${newProduct.name} (${newProduct.id})`);
      return sendJson(res, 201, { success: true, message: 'Product added successfully', data: newProduct });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // 3. DELETE /api/products/:id - Remove product (Admin)
  if (pathname.startsWith('/api/products/') && method === 'DELETE') {
    const id = pathname.replace('/api/products/', '');
    let products = readJson(PRODUCTS_FILE);
    const initialLength = products.length;

    products = products.filter(p => p.id !== id);

    if (products.length === initialLength) {
      return sendJson(res, 404, { success: false, message: `Product with ID '${id}' not found.` });
    }

    writeJson(PRODUCTS_FILE, products);
    console.log(`[API] Deleted product: ${id}`);
    return sendJson(res, 200, { success: true, message: `Product '${id}' deleted successfully.` });
  }

  // 4. POST /api/admin/login - Admin authentication
  if (pathname === '/api/admin/login' && method === 'POST') {
    const { username, password } = await parseRequestBody(req);

    if (username === 'admin' && password === 'admin123') {
      const token = `adm_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      console.log(`[API] Admin successfully authorized.`);
      return sendJson(res, 200, {
        success: true,
        message: 'Admin authorization granted',
        token,
        admin: { username: 'admin', role: 'master_admin' }
      });
    }

    return sendJson(res, 401, { success: false, message: 'Invalid admin credentials' });
  }

  // 5. POST /api/orders - Storefront checkout order placement
  if (pathname === '/api/orders' && method === 'POST') {
    try {
      const payload = await parseRequestBody(req);
      const orders = readJson(ORDERS_FILE);

      const orderRef = `AU-${Math.floor(10000 + Math.random() * 90000)}-X`;
      const newOrder = {
        orderId: orderRef,
        items: payload.items || [],
        subtotal: payload.subtotal || 0,
        discount: payload.discount || 0,
        shipping: payload.shipping || 0,
        total: payload.total || 0,
        currency: payload.currency || 'USD',
        status: 'Confirmed & In Processing',
        customer: payload.customer || { email: 'client@atelier.com' },
        createdAt: new Date().toISOString()
      };

      orders.unshift(newOrder);
      writeJson(ORDERS_FILE, orders);

      console.log(`[API] Received new customer order: ${orderRef} ($${newOrder.total})`);
      return sendJson(res, 201, { success: true, orderRef, order: newOrder });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // 6. GET /api/orders - View customer orders (Admin)
  if (pathname === '/api/orders' && method === 'GET') {
    const orders = readJson(ORDERS_FILE);
    return sendJson(res, 200, { success: true, count: orders.length, data: orders });
  }

  // 7. POST /api/newsletter - Join VIP Newsletter
  if (pathname === '/api/newsletter' && method === 'POST') {
    const { email } = await parseRequestBody(req);
    if (!email) {
      return sendJson(res, 400, { success: false, message: 'Email is required' });
    }

    const subscribers = readJson(NEWSLETTER_FILE);
    const existing = subscribers.find(s => s.email === email);

    if (!existing) {
      subscribers.push({ email, subscribedAt: new Date().toISOString() });
      writeJson(NEWSLETTER_FILE, subscribers);
      console.log(`[API] New newsletter subscriber: ${email}`);
    }

    return sendJson(res, 200, {
      success: true,
      message: 'Subscribed to Atelier Circle',
      promoCode: 'AURA15'
    });
  }

  // 8. GET /api/status - Server health check
  if (pathname === '/api/status' && method === 'GET') {
    return sendJson(res, 200, {
      status: 'online',
      brand: 'Pandu Collections & Aura Atelier',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }

  /* =========================================================================
     STATIC FILE SERVING (Fallback for all frontend assets)
     ========================================================================= */
  serveStaticFile(req, res, pathname);
});

// Start Server
server.listen(PORT, () => {
  console.log(`
============================================================
  PANDU COLLECTIONS & AURA ATELIER - BACKEND SERVER
============================================================
  Status   : RUNNING
  URL      : http://localhost:${PORT}
  Admin    : http://localhost:${PORT}/admin.html
  API Base : http://localhost:${PORT}/api/products
============================================================
  Press Ctrl+C to terminate the server.
`);
});
