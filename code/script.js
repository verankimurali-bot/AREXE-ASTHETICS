/**
 * AURA ATELIER - LUXURY APPAREL & E-COMMERCE CLIENT LOGIC
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize E-Commerce Store Engine
  initStore();
});

/* ==========================================================================
   Store State & Product Catalog Database
   ========================================================================== */
const DEFAULT_PRODUCTS = [
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

// Load active catalog from LocalStorage or seed with defaults
function getStoredProducts() {
  try {
    const raw = localStorage.getItem('pandu_products');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse catalog from localStorage', err);
  }
  localStorage.setItem('pandu_products', JSON.stringify(DEFAULT_PRODUCTS));
  return [...DEFAULT_PRODUCTS];
}

let PRODUCTS = getStoredProducts();

// Currency Converter Engine
const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83.5 }
};

let currentCurrency = 'USD';
let activeFilter = 'all';
let searchQuery = '';
let cart = [];
let wishlist = new Set();
let promoDiscount = 0; // 0.15 when AURA15 is applied
let currentQvProduct = null;
let currentQvSize = 'S';
let currentQvColor = '';

/* ==========================================================================
   Store Initialization
   ========================================================================== */
function initStore() {
  loadSavedState();
  initTheme();
  initCurrency();
  initSearch();
  initFilters();
  initProductsGrid();
  initCartDrawer();
  initQuickViewModal();
  initLookbookHotspots();
  initNewsletter();
  initModals();
  initMobileNav();
  loadCatalogFromBackend();
}

async function loadCatalogFromBackend() {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        PRODUCTS = json.data;
        localStorage.setItem('pandu_products', JSON.stringify(PRODUCTS));
        renderProducts();
      }
    }
  } catch (e) {
    // Offline or static preview fallback
  }
}

/* ==========================================================================
   State & LocalStorage Management
   ========================================================================== */
function loadSavedState() {
  try {
    const savedCart = localStorage.getItem('aura_cart');
    if (savedCart) cart = JSON.parse(savedCart);

    const savedWish = localStorage.getItem('aura_wishlist');
    if (savedWish) wishlist = new Set(JSON.parse(savedWish));
  } catch (e) {
    console.error('Failed to load local storage state', e);
  }
  updateWishlistBadge();

  // Sync catalog updates made from the Admin Panel in real time
  window.addEventListener('storage', (e) => {
    if (e.key === 'pandu_products') {
      PRODUCTS = getStoredProducts();
      renderProducts();
    }
  });
}

function saveCartState() {
  localStorage.setItem('aura_cart', JSON.stringify(cart));
  localStorage.setItem('aura_wishlist', JSON.stringify([...wishlist]));
}

/* ==========================================================================
   Theme Management (Editorial Dark & Runway Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('aura_theme') || 'dark';

  root.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('aura_theme', next);
      showToast(`Switched to ${next === 'dark' ? 'Editorial Obsidian' : 'Runway Light'} mode`);
    });
  }
}

/* ==========================================================================
   Currency Conversion
   ========================================================================== */
function initCurrency() {
  const currencySelect = document.getElementById('currency-select');
  if (!currencySelect) return;

  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    renderProducts();
    updateCartUI();
    if (currentQvProduct) updateQvPrice();
    showToast(`Currency converted to ${currentCurrency}`);
  });
}

function formatPrice(usdPrice) {
  const currencyInfo = CURRENCIES[currentCurrency] || CURRENCIES.USD;
  const converted = usdPrice * currencyInfo.rate;
  return `${currencyInfo.symbol}${Math.round(converted).toLocaleString()}`;
}

/* ==========================================================================
   Search & Filter System
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const statusBar = document.getElementById('catalog-status');
  const queryDisplay = document.getElementById('search-query-display');
  const clearBtn = document.getElementById('clear-search-btn');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    if (searchQuery) {
      statusBar.style.display = 'flex';
      queryDisplay.textContent = searchQuery;
    } else {
      statusBar.style.display = 'none';
    }
    renderProducts();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      statusBar.style.display = 'none';
      renderProducts();
    });
  }
}

function initFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-filter');
      renderProducts();
    });
  });

  // Handle nav filter links
  const navFilterLinks = document.querySelectorAll('[data-filter]');
  navFilterLinks.forEach((link) => {
    if (!link.classList.contains('filter-pill')) {
      link.addEventListener('click', (e) => {
        const cat = link.getAttribute('data-filter');
        if (cat) {
          activeFilter = cat;
          const targetPill = document.querySelector(`.filter-pill[data-filter="${cat}"]`);
          if (targetPill) {
            document.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('active'));
            targetPill.classList.add('active');
          }
          renderProducts();
        }
      });
    }
  });
}

/* ==========================================================================
   Catalog Product Grid Rendering
   ========================================================================== */
function initProductsGrid() {
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = PRODUCTS.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.material.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 1rem;">🔍</span>
        <h3>No garments matched your criteria</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your keywords or category selection.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((product) => {
    const isWished = wishlist.has(product.id);
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    card.innerHTML = `
      <div class="product-image-box">
        <img src="${product.image}" alt="${product.name}" class="product-primary-img" loading="lazy">
        <span class="card-badge">${product.badge}</span>
        <button class="card-wishlist-btn ${isWished ? 'active' : ''}" aria-label="Toggle Wishlist" data-id="${product.id}">
          ♥
        </button>
        <button class="quick-view-overlay-btn" data-id="${product.id}">
          Quick View &bull; Inspect Fit
        </button>
      </div>

      <div class="product-meta-row">
        <h3 class="product-name">${product.name}</h3>
        <span class="product-price">${formatPrice(product.price)}</span>
      </div>

      <div class="product-material-tag">${product.material}</div>

      <div class="product-card-controls">
        <div class="swatches-row">
          ${product.swatches
            .map(
              (s, idx) => `
            <span class="swatch-dot ${idx === 0 ? 'active' : ''}" 
                  style="background-color: ${s.hex};" 
                  title="${s.name}" 
                  data-color="${s.name}"></span>
          `
            )
            .join('')}
        </div>
        <button class="card-add-btn" data-id="${product.id}">+ Add to Bag</button>
      </div>
    `;

    // Wishlist Toggle
    const wishBtn = card.querySelector('.card-wishlist-btn');
    wishBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(product.id);
      wishBtn.classList.toggle('active', wishlist.has(product.id));
    });

    // Quick View Trigger
    const qvBtn = card.querySelector('.quick-view-overlay-btn');
    qvBtn.addEventListener('click', () => openQuickView(product));

    // Card Add to Bag
    const addBtn = card.querySelector('.card-add-btn');
    addBtn.addEventListener('click', () => {
      const activeSwatch = card.querySelector('.swatch-dot.active');
      const selectedColor = activeSwatch ? activeSwatch.getAttribute('data-color') : product.swatches[0].name;
      addToCart(product, 'M', selectedColor);
    });

    // Swatch Clicks
    const swatches = card.querySelectorAll('.swatch-dot');
    swatches.forEach((sw) => {
      sw.addEventListener('click', (e) => {
        e.stopPropagation();
        swatches.forEach((s) => s.classList.remove('active'));
        sw.classList.add('active');
      });
    });

    grid.appendChild(card);
  });
}

function toggleWishlist(productId) {
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    showToast('Removed piece from your wishlist');
  } else {
    wishlist.add(productId);
    showToast('Piece saved to your curated wishlist ♥');
  }
  updateWishlistBadge();
  saveCartState();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-count');
  if (badge) badge.textContent = wishlist.size;
}

/* ==========================================================================
   Shopping Cart Engine & Slide-Over Drawer
   ========================================================================== */
function initCartDrawer() {
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close-btn');
  const emptyBrowseBtn = document.getElementById('empty-cart-browse-btn');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const removePromoBtn = document.getElementById('remove-promo-btn');
  const promoInput = document.getElementById('promo-input');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cartToggle && cartDrawer) {
    cartToggle.addEventListener('click', () => openCart());
  }

  if (cartClose && cartDrawer) {
    cartClose.addEventListener('click', () => closeCart());
  }

  if (cartDrawer) {
    cartDrawer.addEventListener('click', (e) => {
      if (e.target === cartDrawer) closeCart();
    });
  }

  if (emptyBrowseBtn) {
    emptyBrowseBtn.addEventListener('click', () => {
      closeCart();
      const col = document.getElementById('collection');
      if (col) col.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Promo Code Validation
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'AURA15') {
        promoDiscount = 0.15;
        document.getElementById('promo-tag-applied').style.display = 'flex';
        promoInput.value = '';
        updateCartUI();
        showToast('VIP Promo Code AURA15 Applied (-15%)');
      } else {
        showToast('Invalid promo code. Try AURA15 for 15% off.');
      }
    });
  }

  if (removePromoBtn) {
    removePromoBtn.addEventListener('click', () => {
      promoDiscount = 0;
      document.getElementById('promo-tag-applied').style.display = 'none';
      updateCartUI();
      showToast('Promo code removed');
    });
  }

  // Checkout Action (Sends order to backend /api/orders)
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      if (cart.length === 0) return;
      closeCart();

      const checkoutModal = document.getElementById('checkout-modal');
      const orderRef = document.getElementById('order-ref-num');

      try {
        const orderPayload = {
          items: cart,
          subtotal: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
          discount: promoDiscount,
          currency: currentCurrency
        };
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        const data = await res.json();
        if (data.success && orderRef) {
          orderRef.textContent = `#${data.orderRef}-${currentCurrency}`;
        }
      } catch (err) {
        if (orderRef) {
          orderRef.textContent = `#AU-${Math.floor(10000 + Math.random() * 90000)}-${currentCurrency}`;
        }
      }

      if (checkoutModal) checkoutModal.classList.add('active');
      cart = [];
      promoDiscount = 0;
      saveCartState();
      updateCartUI();
    });
  }

  updateCartUI();
}

function openCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function addToCart(product, size = 'M', color = '') {
  const selectedColor = color || (product.swatches[0] ? product.swatches[0].name : 'Default');
  const existingIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === size && item.color === selectedColor
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      color: selectedColor,
      qty: 1
    });
  }

  saveCartState();
  updateCartUI();
  openCart();
  showToast(`Added ${product.name} (${size}) to your bag`);
}

function updateCartUI() {
  const countBadge = document.getElementById('cart-count');
  const drawerQty = document.getElementById('cart-drawer-qty');
  const itemsContainer = document.getElementById('cart-items-list');
  const emptyState = document.getElementById('cart-empty-state');
  const cartFooter = document.getElementById('cart-footer');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  const discountRow = document.getElementById('discount-row');
  const discountVal = document.getElementById('cart-discount-val');
  const shippingVal = document.getElementById('cart-shipping-val');
  const totalVal = document.getElementById('cart-total-val');
  const shippingBarFill = document.getElementById('shipping-bar-fill');
  const shippingText = document.getElementById('shipping-status-text');

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  if (countBadge) countBadge.textContent = totalQty;
  if (drawerQty) drawerQty.textContent = `(${totalQty} items)`;

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '';
    if (emptyState) emptyState.classList.add('visible');
    if (cartFooter) cartFooter.style.display = 'none';
    if (shippingBarFill) shippingBarFill.style.width = '0%';
    if (shippingText) {
      shippingText.innerHTML = `Add <strong>${formatPrice(150)}</strong> more to unlock complimentary global express shipping.`;
    }
    return;
  }

  if (emptyState) emptyState.classList.remove('visible');
  if (cartFooter) cartFooter.style.display = 'flex';

  // Render items
  itemsContainer.innerHTML = '';
  let subtotalUsd = 0;

  cart.forEach((item, index) => {
    subtotalUsd += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-thumb">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div class="cart-item-spec">Size: ${item.size} &bull; ${item.color}</div>
        <div class="qty-control-row">
          <button class="qty-btn" data-action="dec" data-index="${index}">-</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-index="${index}">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
        <button class="cart-remove-item" data-index="${index}">Remove</button>
      </div>
    `;

    // Quantity controls
    row.querySelectorAll('.qty-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'inc') {
          cart[index].qty += 1;
        } else if (action === 'dec') {
          cart[index].qty -= 1;
          if (cart[index].qty <= 0) {
            cart.splice(index, 1);
          }
        }
        saveCartState();
        updateCartUI();
      });
    });

    row.querySelector('.cart-remove-item').addEventListener('click', () => {
      cart.splice(index, 1);
      saveCartState();
      updateCartUI();
    });

    itemsContainer.appendChild(row);
  });

  // Calculate Shipping Progress ($150 threshold)
  const freeShippingThresholdUsd = 150;
  const progressPercent = Math.min((subtotalUsd / freeShippingThresholdUsd) * 100, 100);
  if (shippingBarFill) shippingBarFill.style.width = `${progressPercent}%`;

  if (shippingText) {
    if (subtotalUsd >= freeShippingThresholdUsd) {
      shippingText.innerHTML = `🎉 <strong>Complimentary Worldwide Express Shipping Unlocked!</strong>`;
    } else {
      const remainingUsd = freeShippingThresholdUsd - subtotalUsd;
      shippingText.innerHTML = `Add <strong>${formatPrice(remainingUsd)}</strong> more for Complimentary Global Express Delivery.`;
    }
  }

  // Price Totals
  const discountUsd = subtotalUsd * promoDiscount;
  const finalTotalUsd = subtotalUsd - discountUsd;

  if (subtotalVal) subtotalVal.textContent = formatPrice(subtotalUsd);

  if (discountRow && discountVal) {
    if (promoDiscount > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `-${formatPrice(discountUsd)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (shippingVal) {
    shippingVal.textContent = subtotalUsd >= freeShippingThresholdUsd ? 'FREE' : formatPrice(25);
  }

  if (totalVal) {
    totalVal.textContent = formatPrice(finalTotalUsd);
  }
}

/* ==========================================================================
   Quick View Modal
   ========================================================================== */
function initQuickViewModal() {
  const modal = document.getElementById('quick-view-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const addBtn = document.getElementById('qv-add-to-bag-btn');
  const sizeBtns = document.querySelectorAll('#qv-sizes .size-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => closeQuickView());
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuickView();
    });
  }

  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentQvSize = btn.getAttribute('data-size');
    });
  });

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (currentQvProduct) {
        addToCart(currentQvProduct, currentQvSize, currentQvColor);
        closeQuickView();
      }
    });
  }
}

function openQuickView(product) {
  currentQvProduct = product;
  currentQvSize = 'S';

  const modal = document.getElementById('quick-view-modal');
  const img = document.getElementById('qv-img');
  const title = document.getElementById('qv-title');
  const cat = document.getElementById('qv-category');
  const badge = document.getElementById('qv-badge');
  const desc = document.getElementById('qv-desc');
  const colorName = document.getElementById('qv-color-name');
  const swatchesContainer = document.getElementById('qv-swatches');

  if (img) img.src = product.image;
  if (title) title.textContent = product.name;
  if (cat) cat.textContent = product.category.toUpperCase();
  if (badge) badge.textContent = product.badge;
  if (desc) desc.textContent = product.description;

  updateQvPrice();

  // Swatches
  if (swatchesContainer) {
    swatchesContainer.innerHTML = '';
    currentQvColor = product.swatches[0] ? product.swatches[0].name : '';
    if (colorName) colorName.textContent = currentQvColor;

    product.swatches.forEach((s, idx) => {
      const dot = document.createElement('span');
      dot.className = `swatch-dot ${idx === 0 ? 'active' : ''}`;
      dot.style.backgroundColor = s.hex;
      dot.title = s.name;
      dot.addEventListener('click', () => {
        swatchesContainer.querySelectorAll('.swatch-dot').forEach((d) => d.classList.remove('active'));
        dot.classList.add('active');
        currentQvColor = s.name;
        if (colorName) colorName.textContent = s.name;
      });
      swatchesContainer.appendChild(dot);
    });
  }

  // Reset Size
  const sizeBtns = document.querySelectorAll('#qv-sizes .size-btn');
  sizeBtns.forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-size') === 'S');
  });

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function updateQvPrice() {
  const priceEl = document.getElementById('qv-price');
  if (priceEl && currentQvProduct) {
    priceEl.textContent = formatPrice(currentQvProduct.price);
  }
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Editorial Lookbook Hotspots
   ========================================================================== */
function initLookbookHotspots() {
  const pins = document.querySelectorAll('.hotspot-pin');
  pins.forEach((pin) => {
    pin.addEventListener('click', () => {
      const pid = pin.getAttribute('data-product-id');
      const product = PRODUCTS.find((p) => p.id === pid);
      if (product) {
        openQuickView(product);
      }
    });
  });

  const shopEntireLookBtn = document.getElementById('shop-entire-look-btn');
  if (shopEntireLookBtn) {
    shopEntireLookBtn.addEventListener('click', () => {
      const coat = PRODUCTS.find((p) => p.id === 'coat-01');
      const knit = PRODUCTS.find((p) => p.id === 'knit-01');
      if (coat) addToCart(coat, 'M', 'Charcoal Melange');
      if (knit) addToCart(knit, 'M', 'Oatmeal Heather');
      showToast('Added complete Monolith Uniform look to bag ($620)');
    });
  }
}

/* ==========================================================================
   Size Guide Modal & General Modals
   ========================================================================== */
function initModals() {
  const sizeGuideModal = document.getElementById('size-guide-modal');
  const sizeGuideTrigger = document.getElementById('size-guide-trigger');
  const sizeGuideClose = document.getElementById('size-guide-close');
  const footerSizeGuide = document.getElementById('footer-size-guide');

  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutModalClose = document.getElementById('checkout-modal-close');
  const continueShoppingBtn = document.getElementById('continue-shopping-btn');

  function openModal(m) {
    if (!m) return;
    m.classList.add('active');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(m) {
    if (!m) return;
    m.classList.remove('active');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (sizeGuideTrigger) {
    sizeGuideTrigger.addEventListener('click', () => openModal(sizeGuideModal));
  }
  if (footerSizeGuide) {
    footerSizeGuide.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(sizeGuideModal);
    });
  }
  if (sizeGuideClose) {
    sizeGuideClose.addEventListener('click', () => closeModal(sizeGuideModal));
  }

  if (checkoutModalClose) {
    checkoutModalClose.addEventListener('click', () => closeModal(checkoutModal));
  }
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => closeModal(checkoutModal));
  }

  // Global escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      closeCart();
      closeModal(sizeGuideModal);
      closeModal(checkoutModal);
    }
  });
}

/* ==========================================================================
   VIP Newsletter Form
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('store-newsletter-form');
  const input = document.getElementById('vip-email');
  const feedback = document.getElementById('vip-feedback');

  if (!form || !input) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (email) {
      input.value = '';
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      } catch (err) {
        // Fallback for offline mode
      }
      if (feedback) {
        feedback.textContent = '✓ VIP Membership Confirmed! Use code AURA15 at checkout for 15% off.';
      }
      showToast('Welcome to the Atelier Circle. Code AURA15 activated.');
    }
  });
}

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mob-link');

  if (!menuToggle || !drawer) return;

  menuToggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  links.forEach((l) => {
    l.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   Global Toast Feedback System
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✦</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
