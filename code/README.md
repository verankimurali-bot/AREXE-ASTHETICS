# AURA ATELIER - Contemporary Luxury & Streetwear E-Commerce Storefront

A high-fashion, production-ready clothing storefront engineered with modern web standards (Semantic HTML5, Vanilla CSS3 with Custom Properties & Glassmorphic design tokens, and Vanilla ESNext JavaScript).

---

## 🌟 Key Features for Apparel & Clothing

1. **Haute-Couture Editorial Aesthetic**:
   - Distinctive typography using Google Fonts **Syne** (editorial headings) & **Plus Jakarta Sans** (clean legible body text).
   - Editorial Dark Mode ("Obsidian") and Runway Clean Light Mode with instant toggle.
   - Smooth Ken-Burns ambient hero animation featuring campaign photography.
   - Marquee ticker displaying fabric hallmarks: *Japanese Organic Cotton, Italian Virgin Wool, Carbon-Neutral Delivery*.

2. **Full-Featured Product Catalog**:
   - Filter by categories: `All Drops`, `Outerwear`, `Streetwear`, `Knitwear`.
   - Real-time search bar filtering across names, materials, and categories.
   - Color swatch picker updating active selection per card.
   - Interactive Wishlist heart toggle with count indicator in the navbar.
   - Dynamic currency selector with live rate conversion (`USD $`, `EUR €`, `GBP £`, `INR ₹`).

3. **Interactive Sliding Cart Drawer**:
   - Slides from right with backdrop blur.
   - **Dynamic Free Shipping Progress Bar**: Automatically calculates progress toward the $150 threshold and unlocks complimentary worldwide express shipping.
   - Incremental quantity adjusters (`+` / `-`) and item removal.
   - **VIP Promo Engine**: Enter code `AURA15` to automatically apply a 15% discount.
   - Instant simulated checkout with unique generated order references.

4. **Editorial Lookbook & Shoppable Hotspots**:
   - Interactive street style photography with pulsating `+` hotspot pins.
   - Clicking hotspots lets shoppers inspect and buy the exact pieces worn by the models.
   - "Add Complete Look to Bag" one-click action.

5. **Quick-View & Size Guide Modals**:
   - Detailed product view with size selector (XS, S, M, L, XL), fabric composition, and instant Add-to-Bag.
   - Comprehensive garment measurement specifications table (Chest, Length, Sleeve in both inches and cm).

---

## 🚀 How to Open and View

No build tools or installation needed! Simply open:
```
file:///C:/Users/RAJINI%20CR/.gemini/antigravity-ide/scratch/modern-website/index.html
```
*(Or double-click [index.html](file:///C:/Users/RAJINI%20CR/.gemini/antigravity-ide/scratch/modern-website/index.html) in your Windows File Explorer).*

---

## 📂 Project Structure

```
code/
├── index.html       # Storefront semantic markup, modals, cart drawer
├── styles.css       # Complete luxury apparel styling, responsive breakpoints, swatches
├── script.js        # E-commerce store engine (cart, search, currency, lookbook hotspots)
├── admin.html       # Protected Admin Portal (Security authentication gate)
├── admin.css        # Admin portal styling, KPI cards, form layout, inventory list
├── admin.js         # Admin authentication, product creation, live catalog sync
└── README.md        # Documentation and customization guide
```

---

## 🔐 Admin Portal & Product Management

Only authorized store admins can access the backend inventory manager:

- **Direct Admin Link**: [admin.html](file:///c:/Users/RAJINI%20CR/Desktop/code/admin.html) *(or click the ⚙️ gear icon in the store navbar)*
- **Default Master Credentials**:
  - **Username**: `admin`
  - **Passcode**: `admin123`

### Features in the Admin Panel:
1. **Security Gate**: Restricts access so only the admin with credentials can open the dashboard.
2. **Add New Garments**: Fill in Title, Category, Base Price, Fabric Specs, Badge, Description, and Color Swatches.
3. **⚡ Quick Photo Presets**: Click preset sample chips to auto-fill high-res fashion photography with one click.
4. **Live Card Preview**: See the thumbnail and price preview in real-time as you type.
5. **Real-Time Store Sync**: Items published in the admin panel immediately appear on [index.html](file:///c:/Users/RAJINI%20CR/Desktop/code/index.html).
6. **Live Inventory Management**: Search, filter, and delete pieces from the store with one click.
