/* ===== LOADER ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) { setTimeout(() => loader.classList.add('hide'), 400); }
  updateCartCount();
});

/* ===== HAMBURGER ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

/* ===== ACTIVE NAV LINK ===== */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ===== CART HELPERS ===== */
function getCart() { return JSON.parse(localStorage.getItem('royaltime_cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('royaltime_cart', JSON.stringify(cart)); }

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total ? 'flex' : 'none';
  });
}

function addToCart(id, name, price, image, category) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx > -1) { cart[idx].qty++; }
  else { cart.push({ id, name, price, image, category, qty: 1 }); }
  saveCart(cart);
  updateCartCount();
  showToast(`<span>${name}</span>Added to your collection`);
}

/* ===== TOAST ===== */
function showToast(html) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.innerHTML = html;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ===== WATCHES DATA (12 products) ===== */
const WATCHES = [
  { id:1, name:'Sovereign Noir', category:'Dress', price:4850,
    image:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
    desc:'An embodiment of refined power. The Sovereign Noir features a midnight-black ceramic case, guilloché dial, and Swiss automatic movement.',
    material:'Black Ceramic & Titanium', movement:'Swiss Automatic', water:'100m', crystal:'Sapphire Crystal' },
  { id:2, name:'Aurum Prestige', category:'Luxury', price:7200,
    image:'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    desc:'Draped in 18k yellow gold, the Aurum Prestige is a timeless icon of opulence. A status symbol crafted for the discerning collector.',
    material:'18K Yellow Gold', movement:'Manual Wind', water:'30m', crystal:'Sapphire Anti-Reflective' },
  { id:3, name:'Neptune Diver Pro', category:'Sport', price:3490,
    image:'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80',
    desc:'Engineered for the ocean depths. Uncompromising precision at 300m, with luminous indices and a brushed stainless case.',
    material:'Brushed Stainless Steel', movement:'Swiss Automatic', water:'300m', crystal:'Sapphire Crystal' },
  { id:4, name:'Classique Blanc', category:'Dress', price:5650,
    image:'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    desc:'White-lacquer dial with diamond hour markers. The Classique Blanc is the pinnacle of understated elegance for formal occasions.',
    material:'Stainless Steel & White Gold Bezel', movement:'Swiss Quartz', water:'50m', crystal:'Sapphire' },
  { id:5, name:'Chrono Velocity', category:'Sport', price:4200,
    image:'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
    desc:'Racing pedigree in every detail. The Chrono Velocity combines tachymeter bezel, triple-register chronograph and a sporty silicone strap.',
    material:'PVD-Coated Stainless Steel', movement:'Swiss Chronograph', water:'100m', crystal:'Hardlex' },
  { id:6, name:'Rose Élégance', category:'Luxury', price:6980,
    image:'https://images.unsplash.com/photo-1548171915-e79a380a2a4e?w=600&q=80',
    desc:'A love letter in rose gold. Delicate hour markers set with pavé diamonds circle a champagne sunburst dial of unmatched beauty.',
    material:'18K Rose Gold', movement:'Swiss Automatic', water:'30m', crystal:'Sapphire Crystal' },
  { id:7, name:'Obsidian GMT', category:'GMT', price:5100,
    image:'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&q=80',
    desc:'Track two time zones with surgical precision. The Obsidian GMT features a distinct dual-color bezel and legible 40mm case.',
    material:'Matte Black Steel', movement:'Swiss GMT Automatic', water:'200m', crystal:'Scratch-Resistant Sapphire' },
  { id:8, name:'Heritage Tourbillon', category:'Luxury', price:18500,
    image:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
    desc:'The pinnacle of horological mastery. An exposed flying tourbillon dances beneath a domed sapphire crystal in platinum grandeur.',
    material:'Platinum 950', movement:'Hand-Wound Tourbillon', water:'30m', crystal:'Domed Sapphire' },
  { id:9, name:'Stealth Pilot', category:'Sport', price:3800,
    image:'https://images.unsplash.com/photo-1638188832073-a9c1c78b6ca1?w=600&q=80',
    desc:'Inspired by aviation legends. Large onion crown, matte dial with oversized Arabic numerals, and a supple leather pilot strap.',
    material:'Sandblasted Titanium', movement:'Swiss Automatic', water:'100m', crystal:'Anti-Reflective Sapphire' },
  { id:10, name:'Lumière Skeletal', category:'Dress', price:8900,
    image:'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=600&q=80',
    desc:'When art meets mechanism. Every gear, spring and jewel is revealed through the skeletonised dial in this architectural masterpiece.',
    material:'Stainless Steel with PVD', movement:'Skeleton Automatic', water:'50m', crystal:'Sapphire Front & Back' },
  { id:11, name:'Riviera Sport', category:'Sport', price:2990,
    image:'https://images.unsplash.com/photo-1595579336852-79c8b18c27ee?w=600&q=80',
    desc:'A Mediterranean spirit captured in steel and rubber. Bold, sporty, and built to perform from yacht decks to city streets.',
    material:'Polished Stainless Steel', movement:'Swiss Quartz', water:'200m', crystal:'Mineral Crystal' },
  { id:12, name:'Moonphase Collector', category:'Luxury', price:11200,
    image:'https://images.unsplash.com/photo-1600003264479-4e750c51ede2?w=600&q=80',
    desc:'A celestial complication of rare beauty. The hand-painted moonphase disc shows lunar phases accurate to 122 years.',
    material:'White Gold', movement:'Swiss Automatic Moonphase', water:'30m', crystal:'Domed Sapphire' }
];

/* ===== RENDER CARDS ===== */
function renderCards(watches, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = watches.map(w => `
    <div class="watch-card" data-category="${w.category}">
      <div class="card-img-wrap" onclick="location.href='product.html?id=${w.id}'">
        <img src="${w.image}" alt="${w.name}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-category">${w.category}</div>
        <h3>${w.name}</h3>
        <p>${w.desc.substring(0,80)}…</p>
        <div class="card-footer">
          <span class="price">$${w.price.toLocaleString()}</span>
          <button class="btn btn-gold add-cart-btn"
            onclick="addToCart(${w.id},'${w.name}',${w.price},'${w.image}','${w.category}')">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ===== SHOP: FILTER + SORT ===== */
function initShop() {
  renderCards(WATCHES, 'watches-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSel    = document.getElementById('sort-select');
  if (!filterBtns.length) return;

  let active = 'All';
  function applyFilter() {
    let list = [...WATCHES];
    if (active !== 'All') list = list.filter(w => w.category === active);
    const sort = sortSel ? sortSel.value : 'default';
    if (sort === 'low')  list.sort((a,b) => a.price - b.price);
    if (sort === 'high') list.sort((a,b) => b.price - a.price);
    if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
    renderCards(list, 'watches-grid');
  }
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      active = btn.dataset.filter;
      applyFilter();
    });
  });
  if (sortSel) sortSel.addEventListener('change', applyFilter);
}

/* ===== PRODUCT DETAIL ===== */
function initProduct() {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'));
  const w  = WATCHES.find(x => x.id === id) || WATCHES[0];

  document.getElementById('pd-name')     && (document.getElementById('pd-name').textContent     = w.name);
  document.getElementById('pd-category') && (document.getElementById('pd-category').textContent = w.category);
  document.getElementById('pd-price')    && (document.getElementById('pd-price').textContent    = '$' + w.price.toLocaleString());
  document.getElementById('pd-desc')     && (document.getElementById('pd-desc').textContent     = w.desc);
  document.getElementById('pd-material') && (document.getElementById('pd-material').textContent = w.material);
  document.getElementById('pd-movement') && (document.getElementById('pd-movement').textContent = w.movement);
  document.getElementById('pd-water')    && (document.getElementById('pd-water').textContent    = w.water);
  document.getElementById('pd-crystal')  && (document.getElementById('pd-crystal').textContent  = w.crystal);
  document.getElementById('pd-main-img') && (document.getElementById('pd-main-img').src         = w.image);
  document.querySelectorAll('.thumb img').forEach(img => img.src = w.image);
  document.title = w.name + ' – RoyalTime';

  let qty = 1;
  const qtyDisplay = document.getElementById('qty-display');
  document.getElementById('qty-dec') && document.getElementById('qty-dec').addEventListener('click', () => {
    if (qty > 1) { qty--; qtyDisplay.textContent = qty; }
  });
  document.getElementById('qty-inc') && document.getElementById('qty-inc').addEventListener('click', () => {
    qty++; qtyDisplay.textContent = qty;
  });
  document.getElementById('pd-add-cart') && document.getElementById('pd-add-cart').addEventListener('click', () => {
    for (let i = 0; i < qty; i++) addToCart(w.id, w.name, w.price, w.image, w.category);
  });

  const related = WATCHES.filter(x => x.id !== w.id).slice(0, 4);
  renderCards(related, 'related-grid');
}

/* ===== CART ===== */
function initCart() { renderCart(); }

function renderCart() {
  const cart      = getCart();
  const container = document.getElementById('cart-body');
  const emptyEl   = document.getElementById('cart-empty');
  const tableWrap = document.getElementById('cart-table-wrap');
  if (!container) return;

  if (cart.length === 0) {
    emptyEl    && (emptyEl.style.display    = 'block');
    tableWrap  && (tableWrap.style.display  = 'none');
    document.getElementById('cart-summary') && (document.getElementById('cart-summary').style.display = 'none');
    return;
  }
  emptyEl   && (emptyEl.style.display   = 'none');
  tableWrap && (tableWrap.style.display = 'block');
  document.getElementById('cart-summary') && (document.getElementById('cart-summary').style.display = 'block');

  container.innerHTML = cart.map(item => `
    <tr>
      <td>
        <div class="cart-product">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-product-info">
            <strong>${item.name}</strong>
            <span>${item.category}</span>
          </div>
        </div>
      </td>
      <td class="price">$${item.price.toLocaleString()}</td>
      <td>
        <div class="qty-cell">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </td>
      <td class="price">$${(item.price * item.qty).toLocaleString()}</td>
      <td><button class="remove-btn" onclick="removeItem(${item.id})">✕</button></td>
    </tr>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 50;
  const total    = subtotal + shipping;

  document.getElementById('cart-subtotal') && (document.getElementById('cart-subtotal').textContent = '$' + subtotal.toLocaleString());
  document.getElementById('cart-shipping') && (document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : '$' + shipping);
  document.getElementById('cart-total')    && (document.getElementById('cart-total').textContent    = '$' + total.toLocaleString());
}

function changeQty(id, delta) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx < 0) return;
  cart[idx].qty += delta;
  if (cart[idx].qty < 1) cart.splice(idx, 1);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function removeItem(id) {
  saveCart(getCart().filter(i => i.id !== id));
  updateCartCount();
  renderCart();
}

function checkout() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('show');
  saveCart([]);
  updateCartCount();
}

function closeModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('show');
  location.href = 'index.html';
}

/* ===== CONTACT FORM ===== */
function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast("<span>Message Sent!</span>We'll respond within 24 hours.");
    form.reset();
  });
}

/* ===== PAGE INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  const p = location.pathname.split('/').pop();
  if (p === 'shop.html')    initShop();
  if (p === 'product.html') initProduct();
  if (p === 'cart.html')    initCart();
  if (p === 'contact.html') initContact();
  if (p === 'index.html' || p === '') renderCards(WATCHES.slice(0,6), 'featured-grid');
});
