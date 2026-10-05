/** - ATELIER ADMIN ENGINE
 * Authentication Gate, Product Creation & Live Inventory Management
 */

// Master Admin Security Credentials
const ADMIN_CONFIG = {
  USER: 'admin',
  PASS: 'admin123',
  USD_TO_INR: 83.5
};

// Initial Factory Default Products (Fallback & Seeding)
const DEFAULT_SEED_PRODUCTS = [
  {
    id: 'hoodie-01',
    name: 'Oversized Monolith Hoodie',
    category: 'streetwear',
    price: 180,
    material: '650GSM Japanese Combed Fleece',
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
    description: 'Constructed from custom 650GSM organic loopback cotton with sculptural double-layered hood and tonal architectural embroidery. Designed for an effortless dropped shoulder drape.',
    swatches: [
      { name: 'Obsidian Black', hex: '#121214' },
      { name: 'Dune Sand', hex: '#d4cfcb' },
      { name: 'Forest Olive', hex: '#444a3c' }
    ]
  },
  {
    id: 'coat-01',
    name: 'Atelier Double-Breasted Trench',
    category: 'outerwear',
    price: 380,
    material: 'Italian Double-Faced Virgin Wool',
    badge: 'SIGNATURE DROP',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
    description: 'Masterfully tailored double-breasted overcoat featuring an exaggerated storm flap, hand-stitched horn buttons, and a removable architectural waist belt.',
    swatches: [
      { name: 'Charcoal Melange', hex: '#262629' },
      { name: 'Warm Camel', hex: '#b89467' }
    ]
  },
  {
    id: 'blazer-01',
    name: 'Sculpted Minimalist Blazer',
    category: 'outerwear',
    price: 320,
    material: 'Worsted Wool & Technical Twill',
    badge: 'LIMITED ARCHIVE',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    description: 'Clean single-button front closure with concealed seam pockets and unstructured shoulders for a contemporary fluid silhouette suitable for day-to-evening wear.',
    swatches: [
      { name: 'Obsidian Black', hex: '#121214' },
      { name: 'Slate Grey', hex: '#52525b' }
    ]
  },
  {
    id: 'knit-01',
    name: 'Alpaca Ribbed Turtleneck',
    category: 'knitwear',
    price: 240,
    material: 'Traceable Baby Alpaca & Organic Merino',
    badge: 'NEW DROP',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=80',
    description: 'Substantial chunky 7-gauge fisherman rib knit with a protective rollover collar and natural heat retention properties without synthetic microfiber blending.',
    swatches: [
      { name: 'Oatmeal Heather', hex: '#e5e0db' },
      { name: 'Espresso Brown', hex: '#3d2b22' }
    ]
  },
  {
    id: 'jacket-01',
    name: 'Technical Waxed Chore Jacket',
    category: 'outerwear',
    price: 290,
    material: 'Waxed Japanese Ripstop Cotton',
    badge: 'WEATHERPROOF',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
    description: 'Utility jacket with water-resistant paraffin wax finish, Fidlock magnetic chest closures, and articulated sleeves engineered for maximum mobility.',
    swatches: [
      { name: 'Olive Drab', hex: '#464d3f' },
      { name: 'Washed Black', hex: '#27272a' }
    ]
  },
  {
    id: 'pants-01',
    name: 'Wide-Leg Pleated Trousers',
    category: 'streetwear',
    price: 210,
    material: 'Italian Tropical Wool Blend',
    badge: 'RUNWAY ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80',
    description: 'High-waisted trousers with dual forward knife pleats, side adjusters, and a generous full break over luxury sneakers or dress boots.',
    swatches: [
      { name: 'Graphite Black', hex: '#1c1c1f' },
      { name: 'Pebble Beige', hex: '#cfc9c2' }
    ]
  },
  {
    id: 'sweatpants-01',
    name: 'Heavyweight Darted Sweatpants',
    category: 'streetwear',
    price: 175,
    material: '500GSM Loopwheel Fleece',
    badge: 'COMFORT ARCHIVE',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80',
    description: 'Relaxed sweatpants with anatomical knee darts, concealed zip security pockets, and thick cotton drawstrings with engraved matte metal aglets.',
    swatches: [
      { name: 'Obsidian Black', hex: '#121214' },
      { name: 'Ash Grey', hex: '#71717a' }
    ]
  },
  {
    id: 'dress-01',
    name: 'Silk-Ribbed Column Maxi Dress',
    category: 'knitwear',
    price: 260,
    material: 'Mulberry Silk & Fine Organic Viscose',
    badge: 'CAPSULE EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
    description: 'Sculptural body-contouring column dress with clean square neckline, subtle side leg slit, and luxurious silky texture against bare skin.',
    swatches: [
      { name: 'Midnight Navy', hex: '#0f172a' },
      { name: 'Burgundy Wine', hex: '#4c0519' }
    ]
  }
];

// App State
let activeInvCategory = 'all';
let invSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initFormInteractivity();
  initPresetChips();
  initInventoryControls();
});

/* ==========================================================================
   1. ADMIN AUTHENTICATION GATE (Security Control)
   ========================================================================== */
function initAdminAuth() {
  const authGate = document.getElementById('admin-auth-gate');
  const dashboard = document.getElementById('admin-dashboard');
  const loginForm = document.getElementById('admin-login-form');
  const userInput = document.getElementById('admin-user');
  const passInput = document.getElementById('admin-pass');
  const errorMsg = document.getElementById('auth-error-msg');
  const logoutBtn = document.getElementById('admin-logout-btn');

  // Verify if already logged in this browser session
  const isAuthenticated = sessionStorage.getItem('pandu_admin_auth') === 'verified';

  if (isAuthenticated) {
    unlockDashboard();
  } else {
    lockDashboard();
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredUser = userInput.value.trim();
      const enteredPass = passInput.value;

      if (enteredUser === ADMIN_CONFIG.USER && enteredPass === ADMIN_CONFIG.PASS) {
        sessionStorage.setItem('pandu_admin_auth', 'verified');
        errorMsg.style.display = 'none';
        unlockDashboard();
        showAdminToast('✨ Access Granted: Welcome to Pandu Collections Admin Portal');
      } else {
        errorMsg.textContent = '❌ Access Denied: Incorrect Admin Username or Passcode.';
        errorMsg.style.display = 'block';
        passInput.value = '';
        passInput.focus();
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('pandu_admin_auth');
      lockDashboard();
      showAdminToast('🔒 Admin session terminated. Portal locked.');
    });
  }

  function unlockDashboard() {
    authGate.style.display = 'none';
    dashboard.style.display = 'block';
    refreshInventoryAndKPIs();
  }

  function lockDashboard() {
    authGate.style.display = 'flex';
    dashboard.style.display = 'none';
  }
}

/* ==========================================================================
   2. LOCAL STORAGE CATALOG MANAGEMENT
   ========================================================================== */
function getProductsCatalog() {
  try {
    const raw = localStorage.getItem('pandu_products');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading pandu_products from localStorage', e);
  }
  // Initialize with seed catalog
  localStorage.setItem('pandu_products', JSON.stringify(DEFAULT_SEED_PRODUCTS));
  return [...DEFAULT_SEED_PRODUCTS];
}

function saveProductsCatalog(products) {
  localStorage.setItem('pandu_products', JSON.stringify(products));
  refreshInventoryAndKPIs();
}

/* ==========================================================================
   3. KPI CALCULATION
   ========================================================================== */
function updateKPIs(products) {
  const totalCountEl = document.getElementById('kpi-total-items');
  const catCountEl = document.getElementById('kpi-categories');
  const avgPriceEl = document.getElementById('kpi-avg-price');
  const avgInrEl = document.getElementById('kpi-avg-inr');
  const totalValEl = document.getElementById('kpi-total-val');

  const count = products.length;
  const categories = new Set(products.map(p => p.category)).size;
  const totalPrice = products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  const avgPrice = count > 0 ? Math.round(totalPrice / count) : 0;
  const avgInr = Math.round(avgPrice * ADMIN_CONFIG.USD_TO_INR);

  if (totalCountEl) totalCountEl.textContent = count;
  if (catCountEl) catCountEl.textContent = categories;
  if (avgPriceEl) avgPriceEl.textContent = `$${avgPrice}`;
  if (avgInrEl) avgInrEl.textContent = `≈ ₹${avgInr.toLocaleString()} INR`;
  if (totalValEl) totalValEl.textContent = `$${totalPrice.toLocaleString()}`;

  const allBadge = document.getElementById('cat-count-all');
  if (allBadge) allBadge.textContent = count;
}

/* ==========================================================================
   4. ADD PRODUCT FORM & LIVE PREVIEWS
   ========================================================================== */
function initFormInteractivity() {
  const form = document.getElementById('add-product-form');
  const nameInput = document.getElementById('item-name');
  const priceInput = document.getElementById('item-price');
  const badgeSelect = document.getElementById('item-badge');
  const imgInput = document.getElementById('item-image');
  const inrPreview = document.getElementById('price-inr-preview');

  // Preview elements
  const prevTitle = document.getElementById('preview-title-display');
  const prevPrice = document.getElementById('preview-price-display');
  const prevBadge = document.getElementById('preview-badge-display');
  const prevImg = document.getElementById('live-img-preview');

  // Live Title Preview
  nameInput.addEventListener('input', (e) => {
    prevTitle.textContent = e.target.value.trim() || 'Product Title';
  });

  // Live Price Preview & INR converter
  priceInput.addEventListener('input', (e) => {
    const usd = parseFloat(e.target.value) || 0;
    const inr = Math.round(usd * ADMIN_CONFIG.USD_TO_INR);
    prevPrice.textContent = `$${usd}`;
    inrPreview.textContent = `Estimated: ₹${inr.toLocaleString()} INR`;
  });

  // Live Badge Preview
  badgeSelect.addEventListener('change', (e) => {
    prevBadge.textContent = e.target.value;
  });

  // Live Image Preview
  imgInput.addEventListener('input', (e) => {
    const url = e.target.value.trim();
    if (url) {
      prevImg.src = url;
    }
  });

  prevImg.addEventListener('error', () => {
    prevImg.src = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80';
  });

  // Form Submit: Add New Product
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const category = document.getElementById('item-category').value;
    const price = parseFloat(priceInput.value);
    const material = document.getElementById('item-material').value.trim();
    const badge = badgeSelect.value;
    const image = imgInput.value.trim();
    const desc = document.getElementById('item-desc').value.trim();

    // Collect Color Swatches
    const swatches = [];
    for (let i = 1; i <= 3; i++) {
      const col = document.getElementById(`swatch-color-${i}`);
      const nam = document.getElementById(`swatch-name-${i}`);
      if (nam && nam.value.trim()) {
        swatches.push({
          name: nam.value.trim(),
          hex: col ? col.value : '#000000'
        });
      }
    }

    if (swatches.length === 0) {
      swatches.push({ name: 'Standard Obsidian', hex: '#121214' });
    }

    // Generate new unique product ID
    const newId = `pandu-${category.slice(0, 3)}-${Date.now().toString().slice(-4)}`;

    const newProduct = {
      id: newId,
      name,
      category,
      price,
      material,
      badge,
      image,
      description: desc,
      swatches
    };

    // Prepend to catalog so it appears at top of store
    const products = getProductsCatalog();
    products.unshift(newProduct);
    saveProductsCatalog(products);

    // Reset Form
    form.reset();
    document.getElementById('swatch-color-1').value = '#121214';
    document.getElementById('swatch-name-1').value = 'Obsidian Black';
    document.getElementById('swatch-color-2').value = '#d4cfcb';
    document.getElementById('swatch-name-2').value = 'Dune Sand';
    document.getElementById('swatch-color-3').value = '#444a3c';
    document.getElementById('swatch-name-3').value = 'Forest Olive';

    // Reset Live Preview
    prevTitle.textContent = 'Product Title';
    prevPrice.textContent = '$0';
    prevBadge.textContent = 'NEW DROP';
    inrPreview.textContent = 'Estimated: ₹0 INR';

    showAdminToast(`✨ "${name}" published to Pandu Collections storefront!`);
  });
}

/* ==========================================================================
   5. SAMPLE QUICK-PRESET CHIPS
   ========================================================================== */
function initPresetChips() {
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const img = chip.getAttribute('data-img');
      const name = chip.getAttribute('data-name');
      const cat = chip.getAttribute('data-cat');
      const price = chip.getAttribute('data-price');
      const mat = chip.getAttribute('data-mat');

      if (name) document.getElementById('item-name').value = name;
      if (cat) document.getElementById('item-category').value = cat;
      if (price) {
        document.getElementById('item-price').value = price;
        const inr = Math.round(parseFloat(price) * ADMIN_CONFIG.USD_TO_INR);
        document.getElementById('price-inr-preview').textContent = `Estimated: ₹${inr.toLocaleString()} INR`;
      }
      if (mat) document.getElementById('item-material').value = mat;
      if (img) {
        document.getElementById('item-image').value = img;
        document.getElementById('live-img-preview').src = img;
      }

      // Update Preview
      document.getElementById('preview-title-display').textContent = name || 'Product Title';
      document.getElementById('preview-price-display').textContent = `$${price || 0}`;

      showAdminToast(`Loaded preset sample: ${name}`);
    });
  });
}

/* ==========================================================================
   6. INVENTORY CONTROLS & CATALOG RENDERING
   ========================================================================== */
function initInventoryControls() {
  const searchInput = document.getElementById('inv-search-input');
  const filterPills = document.querySelectorAll('#inv-filter-tags .filter-pill');
  const resetBtn = document.getElementById('reset-catalog-btn');

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      invSearchQuery = e.target.value.trim().toLowerCase();
      renderInventoryList();
    });
  }

  // Category filter pills
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeInvCategory = pill.getAttribute('data-cat') || 'all';
      renderInventoryList();
    });
  });

  // Reset Catalog Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const ok = confirm('Are you sure you want to reset the inventory to the factory default 8 capsule garments? Any custom items will be replaced.');
      if (ok) {
        localStorage.setItem('pandu_products', JSON.stringify(DEFAULT_SEED_PRODUCTS));
        refreshInventoryAndKPIs();
        showAdminToast('↺ Catalog restored to factory default capsule');
      }
    });
  }
}

function refreshInventoryAndKPIs() {
  const products = getProductsCatalog();
  updateKPIs(products);
  renderInventoryList();
}

function renderInventoryList() {
  const container = document.getElementById('inventory-items-container');
  if (!container) return;

  const products = getProductsCatalog();

  const filtered = products.filter((item) => {
    const matchCat = activeInvCategory === 'all' || item.category === activeInvCategory;
    const matchSearch =
      !invSearchQuery ||
      item.name.toLowerCase().includes(invSearchQuery) ||
      item.material.toLowerCase().includes(invSearchQuery) ||
      item.category.toLowerCase().includes(invSearchQuery);
    return matchCat && matchSearch;
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="inv-empty-state">
        <span class="inv-empty-icon">🔍</span>
        <h4>No garments found matching criteria</h4>
        <p style="font-size: 0.8rem; margin-top: 0.35rem;">Try modifying your search query or selected category filter.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'inventory-item-card';

    const inrPrice = Math.round((parseFloat(item.price) || 0) * ADMIN_CONFIG.USD_TO_INR);

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="inv-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80'">
      
      <div class="inv-details">
        <div class="inv-title-row">
          <strong class="inv-title">${item.name}</strong>
          <span class="inv-badge">${item.badge}</span>
        </div>
        
        <div class="inv-meta-row">
          <span class="inv-price-val">$${item.price}</span>
          <span class="inv-inr-val">≈ ₹${inrPrice.toLocaleString()} INR</span>
          <span style="opacity: 0.5;">&bull;</span>
          <span style="text-transform: capitalize;">${item.category}</span>
        </div>

        <div class="inv-fabric">${item.material}</div>

        <div class="inv-swatches">
          ${item.swatches ? item.swatches.map(s => `
            <span class="inv-swatch-dot" style="background-color: ${s.hex};" title="${s.name}"></span>
          `).join('') : ''}
        </div>
      </div>

      <div class="inv-actions">
        <button class="inv-del-btn" data-id="${item.id}" title="Remove piece from store">
          🗑️ Delete
        </button>
      </div>
    `;

    // Delete handler
    const delBtn = card.querySelector('.inv-del-btn');
    delBtn.addEventListener('click', () => {
      deleteProduct(item.id, item.name);
    });

    container.appendChild(card);
  });
}

function deleteProduct(id, name) {
  const ok = confirm(`Remove "${name}" from the Pandu Collections storefront?`);
  if (!ok) return;

  let products = getProductsCatalog();
  products = products.filter(p => p.id !== id);
  saveProductsCatalog(products);

  showAdminToast(`🗑️ "${name}" removed from catalog`);
}

/* ==========================================================================
   7. ADMIN TOAST NOTIFICATION
   ========================================================================== */
function showAdminToast(msg) {
  const toast = document.getElementById('admin-toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
