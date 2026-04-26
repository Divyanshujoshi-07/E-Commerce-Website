/* =====================================================
   FROMTRND — E-Commerce JavaScript
   Features: Products, Cart, Wishlist, Filters,
             Search, Checkout, LocalStorage
   ===================================================== */

"use strict";

/* =====================
   DATA — PRODUCTS
===================== */
const PRODUCTS = [
  {
    id: 1, name: "Onyx Oversized Tee", category: "apparel",
    price: 1299, oldPrice: 1899,
    emoji: "🖤", rating: 4.8, reviews: 124,
    badge: "New", tag: "bestseller",
    desc: "Premium 280gsm cotton with a relaxed boxy silhouette. Pre-washed for an effortlessly lived-in feel."
  },
  {
    id: 2, name: "Structured Cargo Pant", category: "apparel",
    price: 3499, oldPrice: null,
    emoji: "👖", rating: 4.6, reviews: 87,
    badge: null, tag: null,
    desc: "Six-pocket technical cargo with articulated knees. Built for the city, tested everywhere."
  },
  {
    id: 3, name: "Minimalist Bucket Hat", category: "accessories",
    price: 899, oldPrice: 1299,
    emoji: "🪣", rating: 4.9, reviews: 203,
    badge: "Sale", tag: "sale",
    desc: "Structured ripstop nylon with a tonal embroidered logo. UV-protective and crushable for travel."
  },
  {
    id: 4, name: "Phantom Runner", category: "footwear",
    price: 7999, oldPrice: 9999,
    emoji: "👟", rating: 4.7, reviews: 312,
    badge: "Sale", tag: "sale",
    desc: "Full-length foam midsole with a breathable mesh upper. Engineered for all-day comfort."
  },
  {
    id: 5, name: "Linen Utility Shirt", category: "apparel",
    price: 2199, oldPrice: null,
    emoji: "👕", rating: 4.5, reviews: 68,
    badge: "New", tag: null,
    desc: "100% stonewashed linen with chest patch pockets and a relaxed camp collar."
  },
  {
    id: 6, name: "Cord Tote Bag", category: "accessories",
    price: 1599, oldPrice: 2299,
    emoji: "👜", rating: 4.8, reviews: 156,
    badge: "Sale", tag: "sale",
    desc: "Washed cotton cord body with contrast leather straps and interior zip pocket."
  },
  {
    id: 7, name: "Sport Slides", category: "footwear",
    price: 1299, oldPrice: null,
    emoji: "🩴", rating: 4.4, reviews: 91,
    badge: null, tag: null,
    desc: "Contoured EVA footbed with textured grip sole. The perfect off-duty companion."
  },
  {
    id: 8, name: "Retro Sunglasses", category: "accessories",
    price: 2499, oldPrice: 3499,
    emoji: "🕶️", rating: 4.9, reviews: 287,
    badge: "Sale", tag: "sale",
    desc: "Polarised lenses in a vintage keyhole frame. UV400 protection with spring hinges."
  },
  {
    id: 9, name: "Ribbed Knit Beanie", category: "accessories",
    price: 699, oldPrice: null,
    emoji: "🧢", rating: 4.7, reviews: 174,
    badge: "New", tag: null,
    desc: "Merino wool blend with a fine rib knit and subtle logo tab. Naturally temperature-regulating."
  },
  {
    id: 10, name: "Washed Denim Jacket", category: "apparel",
    price: 4299, oldPrice: 5499,
    emoji: "🧥", rating: 4.6, reviews: 102,
    badge: "Sale", tag: "sale",
    desc: "Classic trucker silhouette in a mid-weight denim. Acid washed for a vintage-inspired look."
  },
  {
    id: 11, name: "Ceramic Diffuser Set", category: "lifestyle",
    price: 2899, oldPrice: null,
    emoji: "🕯️", rating: 4.8, reviews: 63,
    badge: "New", tag: null,
    desc: "Handcrafted ceramic diffuser with three signature reed scents. Elevate your space."
  },
  {
    id: 12, name: "Travel Notebook", category: "lifestyle",
    price: 599, oldPrice: 899,
    emoji: "📓", rating: 4.5, reviews: 45,
    badge: "Sale", tag: "sale",
    desc: "A5 dotted pages with a vegan leather cover and elastic closure. 192 pages of inspiration."
  },
  {
    id: 13, name: "Platform Chelsea Boot", category: "footwear",
    price: 8499, oldPrice: null,
    emoji: "🥾", rating: 4.7, reviews: 198,
    badge: "New", tag: "bestseller",
    desc: "Full-grain leather upper on a 40mm stacked platform. Elastic gussets for an easy pull-on fit."
  },
  {
    id: 14, name: "Fleece Zip Hoodie", category: "apparel",
    price: 3799, oldPrice: 4999,
    emoji: "🧶", rating: 4.6, reviews: 134,
    badge: "Sale", tag: "sale",
    desc: "400gsm recycled polyester fleece with a full-length zip and kangaroo pocket."
  },
  {
    id: 15, name: "Stainless Tumbler", category: "lifestyle",
    price: 1499, oldPrice: null,
    emoji: "🥤", rating: 4.9, reviews: 420,
    badge: "New", tag: "bestseller",
    desc: "Double-wall vacuum insulated. Keeps cold 24hr, hot 12hr. Powder-coated finish."
  },
  {
    id: 16, name: "Nylon Crossbody Bag", category: "accessories",
    price: 1899, oldPrice: 2699,
    emoji: "🎒", rating: 4.5, reviews: 79,
    badge: "Sale", tag: "sale",
    desc: "Lightweight ripstop nylon with magnetic clasp closure and adjustable webbing strap."
  }
];

/* =====================
   STATE
===================== */
let state = {
  cart:      JSON.parse(localStorage.getItem("fromtrnd_cart"))      || [],
  wishlist:  JSON.parse(localStorage.getItem("fromtrnd_wishlist"))  || [],
  filter:    "all",
  sort:      "default",
  search:    "",
  maxPrice:  10000,
  currentStep: 1
};

/* =====================
   DOM REFS
===================== */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const productsGrid    = $("productsGrid");
const productsCount   = $("productsCount");
const noResults       = $("noResults");
const cartBadge       = $("cartBadge");
const wishlistBadge   = $("wishlistBadge");
const cartItems       = $("cartItems");
const cartEmpty       = $("cartEmpty");
const cartFooter      = $("cartFooter");
const wishlistItems   = $("wishlistItems");
const wishlistEmpty   = $("wishlistEmpty");
const cartDrawer      = $("cartDrawer");
const wishlistDrawer  = $("wishlistDrawer");
const cartOverlay     = $("cartOverlay");
const wishlistOverlay = $("wishlistOverlay");
const checkoutModal   = $("checkoutModal");
const quickViewModal  = $("quickViewModal");
const toastEl         = $("toast");
const searchOverlay   = $("searchOverlay");
const searchInput     = $("searchInput");
const priceRange      = $("priceRange");
const priceVal        = $("priceVal");

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
  bindEvents();
});

/* =====================
   RENDER PRODUCTS
===================== */
function getFilteredProducts() {
  let list = [...PRODUCTS];

  // Category filter
  if (state.filter !== "all") {
    list = list.filter(p => p.category === state.filter);
  }

  // Price filter
  list = list.filter(p => p.price <= state.maxPrice);

  // Search filter
  if (state.search.trim()) {
    const q = state.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q))
    );
  }

  // Sort
  if (state.sort === "price-asc")  list.sort((a,b) => a.price - b.price);
  if (state.sort === "price-desc") list.sort((a,b) => b.price - a.price);
  if (state.sort === "name")       list.sort((a,b) => a.name.localeCompare(b.name));

  return list;
}

function renderProducts() {
  const list = getFilteredProducts();
  productsGrid.innerHTML = "";

  if (list.length === 0) {
    noResults.classList.remove("hidden");
    productsCount.textContent = "No products found";
    return;
  }
  noResults.classList.add("hidden");
  productsCount.textContent = `Showing ${list.length} product${list.length !== 1 ? "s" : ""}`;

  list.forEach((p, i) => {
    const inCart    = state.cart.some(c => c.id === p.id);
    const inWishlist = state.wishlist.some(w => w.id === p.id);
    const stars     = renderStars(p.rating);

    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${Math.min(i * 0.06, 0.5)}s`;
    card.setAttribute("data-id", p.id);

    card.innerHTML = `
      <div class="card-image">
        <div class="card-img-placeholder">${p.emoji}</div>
        ${p.badge ? `<span class="card-badge ${p.tag === 'sale' ? 'sale' : ''}">${p.badge}</span>` : ""}
        <div class="card-actions">
          <button class="action-btn wish-btn ${inWishlist ? 'wished' : ''}" data-id="${p.id}" title="Wishlist">
            <svg viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="action-btn quick-view-btn" data-id="${p.id}" title="Quick View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <div class="card-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-current">₹${p.price.toLocaleString("en-IN")}</span>
            ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice.toLocaleString("en-IN")}</span>` : ""}
          </div>
          <button class="btn-add-cart ${inCart ? 'in-cart' : ''}" data-id="${p.id}">
            ${inCart ? "In Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

/* =====================
   BIND EVENTS
===================== */
function bindEvents() {

  // Header scroll
  window.addEventListener("scroll", () => {
    $("header") && document.querySelector(".header").classList.toggle("scrolled", scrollY > 10);
  });

  // Delegated click on product grid
  productsGrid.addEventListener("click", e => {
    const cartBtn = e.target.closest(".btn-add-cart");
    const wishBtn = e.target.closest(".wish-btn");
    const qvBtn   = e.target.closest(".quick-view-btn");
    const card    = e.target.closest(".product-card");

    if (cartBtn)  { e.stopPropagation(); toggleCart(+cartBtn.dataset.id); return; }
    if (wishBtn)  { e.stopPropagation(); toggleWishlist(+wishBtn.dataset.id); return; }
    if (qvBtn)    { e.stopPropagation(); openQuickView(+qvBtn.dataset.id); return; }
    if (card)     openQuickView(+card.dataset.id);
  });

  // Category filter buttons (sidebar + header nav)
  document.querySelectorAll(".filter-btn[data-filter], .nav-link[data-filter]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      state.filter = btn.dataset.filter;
      // Update active states
      $$(".filter-btn[data-filter]").forEach(b => b.classList.toggle("active", b.dataset.filter === state.filter));
      $$(".nav-link[data-filter]").forEach(b => b.classList.toggle("active", b.dataset.filter === state.filter));
      renderProducts();
    });
  });

  // Sort buttons
  $$(".sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.sort = btn.dataset.sort;
      $$(".sort-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts();
    });
  });

  // Price range
  priceRange.addEventListener("input", () => {
    state.maxPrice = +priceRange.value;
    priceVal.textContent = `₹${(+priceRange.value).toLocaleString("en-IN")}`;
    renderProducts();
  });

  // Search toggle
  $("searchToggle").addEventListener("click", () => {
    searchOverlay.classList.toggle("open");
    if (searchOverlay.classList.contains("open")) searchInput.focus();
  });
  $("searchClose").addEventListener("click", () => {
    searchOverlay.classList.remove("open");
    searchInput.value = "";
    state.search = "";
    renderProducts();
  });
  searchInput.addEventListener("input", () => {
    state.search = searchInput.value;
    renderProducts();
  });

  // Cart drawer
  $("cartToggle").addEventListener("click", openCartDrawer);
  $("cartClose").addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);

  // Wishlist drawer
  $("wishlistToggle").addEventListener("click", openWishlistDrawer);
  $("wishlistClose").addEventListener("click", closeWishlistDrawer);
  wishlistOverlay.addEventListener("click", closeWishlistDrawer);

  // Cart: qty + remove (delegated)
  cartItems.addEventListener("click", e => {
    const inc = e.target.closest(".qty-inc");
    const dec = e.target.closest(".qty-dec");
    const rem = e.target.closest(".cart-item-remove");
    if (inc) changeQty(+inc.dataset.id, 1);
    if (dec) changeQty(+dec.dataset.id, -1);
    if (rem) removeFromCart(+rem.dataset.id);
  });

  // Clear cart
  $("clearCartBtn").addEventListener("click", () => {
    if (state.cart.length === 0) return;
    state.cart = [];
    saveCart();
    renderCartDrawer();
    renderProducts();
    showToast("Cart cleared", "red");
  });

  // Checkout btn
  $("checkoutBtn").addEventListener("click", openCheckout);
  $("modalClose").addEventListener("click", closeModal);
  $("placeOrderBtn").addEventListener("click", placeOrder);
  checkoutModal.addEventListener("click", e => { if (e.target === checkoutModal) closeModal(); });

  // Quick view
  $("quickViewClose").addEventListener("click", () => quickViewModal.classList.add("hidden"));
  quickViewModal.addEventListener("click", e => { if (e.target === quickViewModal) quickViewModal.classList.add("hidden"); });

  // Payment tabs
  $$(".pay-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".pay-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      $$(".pay-content").forEach(c => c.classList.add("hidden"));
      $(`${tab.dataset.tab}Content`).classList.remove("hidden");
    });
  });

  // Card number formatting
  const cardNum = $("cardNum");
  if (cardNum) {
    cardNum.addEventListener("input", function() {
      let val = this.value.replace(/\D/g, "").slice(0, 16);
      this.value = val.match(/.{1,4}/g)?.join(" ") || val;
    });
  }

  // Hamburger / mobile menu
  $("hamburgerBtn").addEventListener("click", () => {
    $("headerNav").classList.toggle("mobile-open");
  });

  // Mobile filter toggle
  $("filterToggleMobile").addEventListener("click", () => {
    $("sidebar").classList.toggle("mobile-open");
  });

  // Wishlist: cart add + remove (delegated)
  wishlistItems.addEventListener("click", e => {
    const addBtn = e.target.closest(".btn-wish-cart");
    const remBtn = e.target.closest(".btn-wish-remove");
    if (addBtn) { addToCartFromWishlist(+addBtn.dataset.id); }
    if (remBtn) { removeFromWishlist(+remBtn.dataset.id); }
  });

  // Keyboard: close modals with Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeWishlistDrawer();
      closeModal();
      quickViewModal.classList.add("hidden");
      searchOverlay.classList.remove("open");
    }
  });
}

/* =====================
   CART LOGIC
===================== */
function toggleCart(id) {
  const inCart = state.cart.some(c => c.id === id);
  if (inCart) {
    removeFromCart(id);
  } else {
    addToCart(id);
  }
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = state.cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  renderProducts();
  showToast(`${product.name} added to cart 🛒`, "gold");
}

function removeFromCart(id) {
  state.cart = state.cart.filter(c => c.id !== id);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  renderProducts();
}

function changeQty(id, delta) {
  const item = state.cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartDrawer();
}

function saveCart() {
  localStorage.setItem("fromtrnd_cart", JSON.stringify(state.cart));
}

function updateCartBadge() {
  const total = state.cart.reduce((s, c) => s + c.qty, 0);
  cartBadge.textContent = total;
  cartBadge.classList.toggle("show", total > 0);
}

function renderCartDrawer() {
  cartItems.innerHTML = "";
  if (state.cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    cartFooter.style.display = "none";
    return;
  }
  cartEmpty.classList.add("hidden");
  cartFooter.style.display = "";

  state.cart.forEach(item => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="cart-item-image">${item.emoji}</div>
      <div class="cart-item-info">
        <p class="cart-item-cat">${item.category}</p>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</p>
        <div class="qty-control">
          <button class="qty-btn qty-dec" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn qty-inc" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">✕</button>
    `;
    cartItems.appendChild(el);
  });

  // Totals
  const subtotal = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping  = subtotal >= 2999 ? "Free" : "₹99";
  const total     = subtotal + (subtotal >= 2999 ? 0 : 99);
  $("cartSubtotal").textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  $("cartShipping").textContent = shipping;
  $("cartTotal").textContent    = `₹${total.toLocaleString("en-IN")}`;
}

/* =====================
   WISHLIST LOGIC
===================== */
function toggleWishlist(id) {
  const inWishlist = state.wishlist.some(w => w.id === id);
  if (inWishlist) {
    removeFromWishlist(id);
  } else {
    addToWishlist(id);
  }
}

function addToWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  if (!state.wishlist.some(w => w.id === id)) {
    state.wishlist.push(product);
  }
  saveWishlist();
  updateWishlistBadge();
  renderWishlistDrawer();
  renderProducts();
  showToast(`${product.name} added to wishlist ♡`, "");
}

function removeFromWishlist(id) {
  state.wishlist = state.wishlist.filter(w => w.id !== id);
  saveWishlist();
  updateWishlistBadge();
  renderWishlistDrawer();
  renderProducts();
}

function addToCartFromWishlist(id) {
  addToCart(id);
}

function saveWishlist() {
  localStorage.setItem("fromtrnd_wishlist", JSON.stringify(state.wishlist));
}

function updateWishlistBadge() {
  wishlistBadge.textContent = state.wishlist.length;
  wishlistBadge.classList.toggle("show", state.wishlist.length > 0);
}

function renderWishlistDrawer() {
  wishlistItems.innerHTML = "";
  if (state.wishlist.length === 0) {
    wishlistEmpty.classList.remove("hidden");
    return;
  }
  wishlistEmpty.classList.add("hidden");
  state.wishlist.forEach(item => {
    const el = document.createElement("div");
    el.className = "wishlist-item";
    el.innerHTML = `
      <div class="wishlist-img">${item.emoji}</div>
      <div class="wishlist-info">
        <p class="wishlist-name">${item.name}</p>
        <p class="wishlist-price">₹${item.price.toLocaleString("en-IN")}</p>
      </div>
      <div class="wishlist-actions">
        <button class="btn-wish-cart" data-id="${item.id}">Add to Cart</button>
        <button class="btn-wish-remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    wishlistItems.appendChild(el);
  });
}

/* =====================
   DRAWERS
===================== */
function openCartDrawer() {
  renderCartDrawer();
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("show");
  document.body.style.overflow = "";
}
function openWishlistDrawer() {
  renderWishlistDrawer();
  wishlistDrawer.classList.add("open");
  wishlistOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeWishlistDrawer() {
  wishlistDrawer.classList.remove("open");
  wishlistOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

/* =====================
   QUICK VIEW
===================== */
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const inCart = state.cart.some(c => c.id === p.id);
  const inWish = state.wishlist.some(w => w.id === p.id);

  $("quickViewContent").innerHTML = `
    <div class="qv-image">${p.emoji}</div>
    <div class="qv-info">
      <p class="qv-cat">${p.category}</p>
      <h2 class="qv-name">${p.name}</h2>
      <div class="qv-rating">
        <span class="stars">${renderStars(p.rating)}</span>
        <span class="rating-count">(${p.reviews} reviews)</span>
      </div>
      <p class="qv-desc">${p.desc}</p>
      <p class="qv-price">
        ₹${p.price.toLocaleString("en-IN")}
        ${p.oldPrice ? `<del>₹${p.oldPrice.toLocaleString("en-IN")}</del>` : ""}
      </p>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        <button class="btn-add-cart ${inCart ? 'in-cart' : ''}" onclick="toggleCart(${p.id});closeQuickView()" style="flex:2;padding:0.75rem 1.25rem;font-size:0.85rem;">
          ${inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button class="action-btn wish-btn ${inWish ? 'wished' : ''}" onclick="toggleWishlist(${p.id});closeQuickView()" style="width:44px;height:44px;border-radius:8px;" title="Wishlist">
          <svg viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  quickViewModal.classList.remove("hidden");
}

function closeQuickView() {
  quickViewModal.classList.add("hidden");
}

/* =====================
   CHECKOUT MODAL
===================== */
function openCheckout() {
  if (state.cart.length === 0) { showToast("Your cart is empty!", "red"); return; }
  closeCartDrawer();
  state.currentStep = 1;
  renderCheckoutSteps();
  buildOrderSummary();
  checkoutModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  checkoutModal.classList.add("hidden");
  document.body.style.overflow = "";
  // Reset to step 1 after a delay
  setTimeout(() => {
    state.currentStep = 1;
    renderCheckoutSteps();
  }, 400);
}

function nextStep(step) {
  state.currentStep = step;
  renderCheckoutSteps();
}

function renderCheckoutSteps() {
  $$(".modal-page").forEach(p => p.classList.remove("active"));
  const pageMap = { 1: "page1", 2: "page2", 3: "page3", success: "pageSuccess" };
  const key = state.currentStep === "success" ? "success" : state.currentStep;
  const page = $(pageMap[key]);
  if (page) page.classList.add("active");

  // Update step indicators
  $$(".step").forEach(s => {
    const n = +s.dataset.step;
    s.classList.remove("active", "done");
    if (state.currentStep === "success") { s.classList.add("done"); }
    else if (n === state.currentStep) { s.classList.add("active"); }
    else if (n < state.currentStep)   { s.classList.add("done"); }
  });
}

function buildOrderSummary() {
  const mini = $("orderSummaryMini");
  if (!mini) return;
  const subtotal = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping  = subtotal >= 2999 ? 0 : 99;
  const total     = subtotal + shipping;
  mini.innerHTML = `
    ${state.cart.map(c => `
      <div class="osm-row">
        <span>${c.emoji} ${c.name} ×${c.qty}</span>
        <span>₹${(c.price * c.qty).toLocaleString("en-IN")}</span>
      </div>
    `).join("")}
    <div class="osm-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? "Free" : "₹" + shipping}</span>
    </div>
    <div class="osm-row">
      <span>Total</span>
      <span>₹${total.toLocaleString("en-IN")}</span>
    </div>
  `;
}

function placeOrder() {
  // Basic validation
  const firstName = $("firstName")?.value.trim();
  const email     = $("email")?.value.trim();
  if (!firstName || !email) {
    showToast("Please fill in all required fields", "red");
    nextStep(1);
    return;
  }

  // Simulate order placement
  $("placeOrderBtn").textContent = "Processing…";
  $("placeOrderBtn").disabled = true;

  setTimeout(() => {
    const orderId = "FT" + Date.now().toString().slice(-8).toUpperCase();
    $("orderId").textContent = `Order ID: ${orderId}`;
    state.currentStep = "success";
    renderCheckoutSteps();

    // Clear cart after successful order
    state.cart = [];
    saveCart();
    updateCartBadge();

    $("placeOrderBtn").textContent = "Place Order ✦";
    $("placeOrderBtn").disabled = false;
    renderProducts();
  }, 1800);
}

/* =====================
   TOAST
===================== */
let toastTimer;
function showToast(msg, type = "") {
  toastEl.textContent = msg;
  toastEl.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2800);
}

/* =====================
   EXPOSE GLOBALS
   (called from inline HTML onclick attrs)
===================== */
window.nextStep         = nextStep;
window.closeModal       = closeModal;
window.toggleCart       = toggleCart;
window.toggleWishlist   = toggleWishlist;
window.closeQuickView   = closeQuickView;
