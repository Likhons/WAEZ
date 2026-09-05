'use strict';

const PRODUCTS = [
  {id:'form-tee-001', name:'Form Tee 001', price:1490, cat:'tees', shape:'tee', bg:'var(--taupe-1)', mark:'#141311', badge:null, sizes:['XS','S','M','L','XL'], oos:[], colors:['#141311','#DED2BE'], colorNames:['Black','Beige'], rating:4.6, reviewCount:128, tags:['tee','t-shirt','essential','cotton']},
  {id:'core-overshirt', name:'Core Overshirt', price:2490, cat:'outerwear', shape:'shirt', bg:'var(--taupe-2)', mark:'#EFE9DC', badge:'new', sizes:['S','M','L','XL'], oos:['XL'], colors:['#C9BCA4','#141311'], colorNames:['Taupe','Black'], rating:4.8, reviewCount:41, tags:['overshirt','shirt','jacket','outerwear','taupe']},
  {id:'relaxed-polo', name:'Relaxed Polo', price:1890, cat:'tees', shape:'polo', bg:'var(--taupe-3)', mark:'#141311', badge:null, sizes:['XS','S','M','L','XL'], oos:[], colors:['#141311','#7A756A'], colorNames:['Black','Stone'], rating:4.3, reviewCount:76, tags:['polo','tee','collar','casual']},
  {id:'heavyweight-tee', name:'Heavyweight Tee', price:1690, cat:'tees', shape:'tee', bg:'var(--taupe-4)', mark:'#EFE9DC', badge:'low', sizes:['S','M','L'], oos:[], colors:['#B9AF9C','#141311'], colorNames:['Sand','Black'], rating:4.7, reviewCount:203, tags:['tee','t-shirt','heavyweight','cotton']},
  {id:'structured-hoodie', name:'Structured Hoodie', price:3290, cat:'outerwear', shape:'hoodie', bg:'var(--taupe-6)', mark:'#141311', badge:'new', sizes:['S','M','L','XL'], oos:[], colors:['#141311','#D2C6AE'], colorNames:['Black','Clay'], rating:4.9, reviewCount:19, tags:['hoodie','outerwear','sweatshirt']},
  {id:'wide-trouser', name:'Wide Trouser', price:2790, cat:'bottoms', shape:'trouser', bg:'var(--taupe-5)', mark:'#141311', badge:null, sizes:['XS','S','M','L'], oos:['XS'], colors:['#141311'], colorNames:['Black'], rating:4.4, reviewCount:57, tags:['trouser','pants','bottoms','wide leg']},
  {id:'boxy-jacket', name:'Boxy Jacket', price:4290, cat:'outerwear', shape:'jacket', bg:'var(--taupe-1)', mark:'#141311', badge:'low', sizes:['S','M','L','XL'], oos:[], colors:['#DED2BE','#141311'], colorNames:['Beige','Black'], rating:4.5, reviewCount:34, tags:['jacket','outerwear','boxy']},
  {id:'ribbed-crew', name:'Ribbed Crew', price:2190, cat:'tees', shape:'crew', bg:'var(--taupe-2)', mark:'#EFE9DC', badge:null, sizes:['XS','S','M','L','XL'], oos:[], colors:['#C9BCA4'], colorNames:['Taupe'], rating:4.2, reviewCount:88, tags:['crew','sweater','knit','tee']},
  {id:'cargo-pant', name:'Cargo Pant', price:2990, cat:'bottoms', shape:'trouser', bg:'var(--taupe-4)', mark:'#EFE9DC', badge:null, sizes:['S','M','L','XL'], oos:['S'], colors:['#B9AF9C','#141311'], colorNames:['Sand','Black'], rating:4.6, reviewCount:62, tags:['cargo','pant','trouser','bottoms','utility']},
  {id:'essential-crop', name:'Essential Crop Tee', price:1390, cat:'tees', shape:'tee', bg:'var(--taupe-3)', mark:'#141311', badge:null, sizes:['XS','S','M','L'], oos:[], colors:['#141311'], colorNames:['Black'], rating:4.5, reviewCount:97, tags:['tee','crop','t-shirt','cotton']},
  {id:'utility-shirt', name:'Utility Shirt', price:2690, cat:'outerwear', shape:'shirt', bg:'var(--taupe-6)', mark:'#EFE9DC', badge:'soon', sizes:['S','M','L','XL'], oos:[], colors:['#D2C6AE','#141311'], colorNames:['Clay','Black'], rating:0, reviewCount:0, tags:['shirt','utility','outerwear','coming soon']},
  {id:'track-pant', name:'Track Pant', price:2390, cat:'bottoms', shape:'trouser', bg:'var(--taupe-1)', mark:'#141311', badge:null, sizes:['XS','S','M','L','XL'], oos:[], colors:['#DED2BE'], colorNames:['Beige'], rating:4.1, reviewCount:44, tags:['track pant','trouser','bottoms','sport']},
];

const BADGES = {
  new:  {label:'New', className:'badge-new'},
  low:  {label:'Low Stock', className:'badge-low'},
  soon: {label:'Coming Soon', className:'badge-soon'},
};

const BDT = n => 'BDT ' + n.toLocaleString('en-US');
const FREE_SHIP_THRESHOLD = 3000;
const SHIPPING_FLAT = 120;

const CART = [];
const WISHLIST = new Set();

function garmentSVG(shape, color){
  const shapes = {
    tee: `<rect x="35" y="10" width="30" height="22" fill="${color}"/><rect x="10" y="24" width="80" height="20" fill="${color}"/><rect x="30" y="30" width="40" height="60" fill="${color}"/>`,
    shirt: `<rect x="34" y="8" width="32" height="16" fill="${color}"/><rect x="12" y="20" width="76" height="14" fill="${color}"/><rect x="26" y="26" width="48" height="64" fill="${color}"/><rect x="46" y="26" width="8" height="64" fill="none" stroke="${color}" stroke-width="1.4" opacity="0.5"/>`,
    polo: `<rect x="36" y="9" width="28" height="14" fill="${color}"/><rect x="14" y="19" width="72" height="14" fill="${color}"/><rect x="28" y="25" width="44" height="65" fill="${color}"/><rect x="46" y="25" width="8" height="24" fill="none" stroke="${color}" stroke-width="1.4" opacity="0.5"/>`,
    hoodie: `<circle cx="50" cy="14" r="15" fill="none" stroke="${color}" stroke-width="6"/><rect x="10" y="26" width="80" height="18" fill="${color}"/><rect x="26" y="34" width="48" height="56" fill="${color}"/>`,
    trouser: `<rect x="30" y="8" width="40" height="18" fill="${color}"/><rect x="30" y="24" width="17" height="66" fill="${color}"/><rect x="53" y="24" width="17" height="66" fill="${color}"/>`,
    jacket: `<rect x="30" y="8" width="40" height="14" fill="${color}"/><rect x="10" y="18" width="80" height="16" fill="${color}"/><rect x="22" y="24" width="56" height="66" fill="${color}"/><rect x="46" y="24" width="8" height="66" fill="none" stroke="${color}" stroke-width="1.4" opacity="0.5"/>`,
    crew: `<rect x="36" y="10" width="28" height="14" fill="none" stroke="${color}" stroke-width="6"/><rect x="12" y="22" width="76" height="16" fill="${color}"/><rect x="28" y="30" width="44" height="60" fill="${color}"/>`,
  };
  return `<svg viewBox="0 0 100 100" role="img" aria-hidden="true" focusable="false">${shapes[shape] || shapes.tee}</svg>`;
}

function escapeHTML(str){
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function announce(msg){
  const region = document.getElementById('liveRegion');
  if(region){ region.textContent = ''; requestAnimationFrame(()=>{ region.textContent = msg; }); }
}
function focusMain(){
  const app = document.getElementById('app');
  if(app){ app.setAttribute('tabindex','-1'); app.focus({preventScroll:true}); }
}
function fakeFetch(data, {delay = 260, failRate = 0} = {}){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(failRate > 0 && Math.random() < failRate) reject(new Error('Network error'));
      else resolve(data);
    }, delay);
  });
}

function starRatingHTML(rating, reviewCount, {onClickTargetId} = {}){
  if(!rating) return '';
  const rounded = Math.round(rating * 2) / 2;
  let stars = '';
  for(let i = 1; i <= 5; i++){
    const filled = rounded >= i;
    stars += `<span class="${filled ? '' : 'dim'}" aria-hidden="true">${filled ? '\u2605' : '\u2606'}</span>`;
  }
  const countLabel = `${reviewCount} review${reviewCount !== 1 ? 's' : ''}`;
  const countEl = onClickTargetId
    ? `<button type="button" class="count" data-scroll-to="${onClickTargetId}">${countLabel}</button>`
    : `<span class="count">${countLabel}</span>`;
  return `
    <div class="pdp-rating" role="img" aria-label="Rated ${rating} out of 5 stars, ${countLabel}">
      <span class="stars">${stars}</span>
      ${countEl}
    </div>`;
}

function shippingProgressHTML(subtotal){
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));
  const complete = remaining <= 0;
  const msg = complete
    ? `You\u2019ve unlocked free shipping.`
    : `Add <strong>${BDT(remaining)}</strong> more for free shipping.`;
  return `
    <div class="shipping-progress${complete ? ' is-complete' : ''}" role="status" aria-live="polite">
      <p class="shipping-progress-msg">${msg}</p>
      <div class="shipping-progress-track"><div class="shipping-progress-fill" style="width:${pct}%"></div></div>
    </div>`;
}

function matchesSearchQuery(p, query){
  const q = query.trim().toLowerCase();
  if(!q) return true;
  if(p.name.toLowerCase().includes(q)) return true;
  if(p.cat.toLowerCase().includes(q)) return true;
  if(p.shape.toLowerCase().includes(q)) return true;
  if(p.tags && p.tags.some(t => t.toLowerCase().includes(q))) return true;
  return false;
}
function searchProducts(query){
  if(!query.trim()) return [];
  return PRODUCTS.filter(p => matchesSearchQuery(p, query));
}

// Shared body-scroll lock. Multiple overlays (Quick View, Cart Drawer,
// Search, mobile menu) can be open at the same time -- e.g. "Add To Bag"
// inside Quick View opens the Cart Drawer on top of it. A plain
// body.style.overflow='' on close would unlock scrolling even while
// another overlay is still open underneath, so we count how many
// overlays currently want the lock and only release it at zero.
let openOverlayCount = 0;
function lockScroll(){
  openOverlayCount++;
  document.body.style.overflow = 'hidden';
}
function unlockScroll(){
  openOverlayCount = Math.max(0, openOverlayCount - 1);
  if(openOverlayCount === 0) document.body.style.overflow = '';
}

const app = document.getElementById('app');

function parseHash(){
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, query] = raw.split('?');
  const params = new URLSearchParams(query || '');
  return {path: path || '/', params};
}

function setActiveNav(path, params){
  const currentCat = (params && params.get('cat')) || '';
  document.querySelectorAll('nav.primary a').forEach(a=>{
    const route = a.getAttribute('data-route');
    const navCat = a.getAttribute('data-cat') || '';
    // For /shop links, also match the ?cat= param so "New In", "Shop" and
    // "Essentials" don't all light up together just for sharing a route.
    const isActive = route === path && (route !== '/shop' || navCat === currentCat);
    a.classList.toggle('active', isActive);
    if(isActive) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
}

function navigate(){
  const {path, params} = parseHash();

  window.scrollTo(0, 0);
  closeDrawer();
  closeCartDrawer();
  closeQuickView();
  closeSearchModal();
  setActiveNav(path === '/' ? '/' : path, params);

  if(path === '/') return renderHome();
  if(path === '/shop') return renderShop(params);
  if(path.startsWith('/product/')){
    return renderPDP(
      decodeURIComponent(path.split('/product/')[1] || '')
    );
  }

  if(path === '/about') return renderAbout();
  if(path === '/account') return renderAccount();
  if(path === '/contact') return renderContact();
  if(path === '/shipping') return renderShipping();
  if(path === '/returns') return renderReturns();
  if(path === '/size-guide') return renderSizeGuide();

  if(path === '/cart') return renderCart();
  if(path === '/checkout') return renderCheckout();
  if(path === '/order-confirmed') return renderConfirm();

  return renderNotFound();
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);
const siteHeader = document.querySelector('header.site');
function updateHeaderScrollState(){
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 4);
}
window.addEventListener('scroll', updateHeaderScrollState, {passive:true});
updateHeaderScrollState();

const burgerBtn = document.getElementById('burgerBtn');
const drawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');
let lastFocusedBeforeDrawer = null;

function openDrawer(){
  lastFocusedBeforeDrawer = document.activeElement;
  drawer.classList.add('open');
  drawerOverlay.hidden = false;
  requestAnimationFrame(()=>drawerOverlay.classList.add('open'));
  drawer.setAttribute('aria-hidden','false');
  burgerBtn.setAttribute('aria-expanded','true');
  lockScroll();
  drawerCloseBtn.focus();
}
function closeDrawer(){
  if(!drawer.classList.contains('open')) return;
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
  burgerBtn.setAttribute('aria-expanded','false');
  unlockScroll();
  setTimeout(()=>{ drawerOverlay.hidden = true; }, 250);
  if(lastFocusedBeforeDrawer) lastFocusedBeforeDrawer.focus();
}
burgerBtn.addEventListener('click', ()=>{
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerCloseBtn.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
drawer.addEventListener('click', e=>{ if(e.target.tagName === 'A' && e.target.id !== 'mobileSearchBtn') closeDrawer(); });
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
});
drawer.addEventListener('keydown', e=>{
  if(e.key !== 'Tab') return;
  const focusables = drawer.querySelectorAll('a, button');
  if(!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length-1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});

function cartLines(){
  return CART.map(item=>({item, product: PRODUCTS.find(p=>p.id===item.id)})).filter(l=>l.product);
}
function cartColorName(product, colorIdx){
  return product.colorNames[colorIdx ?? 0] || product.colorNames[0];
}
function addToCart(id, size, qty, color = 0){
  const existing = CART.find(i => i.id === id && i.size === size && (i.color ?? 0) === color);
  if(existing) existing.qty += qty;
  else CART.push({id, size, qty, color});
  updateBagCount();
}

function updateBagCount(){
  const n = CART.reduce((s,i)=>s+i.qty,0);
  const el = document.getElementById('bagCount');
  el.textContent = n;
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
  if(isCartDrawerOpen()) renderCartDrawer();
}

let searchLastFocused = null;
let searchDebounceTimer = null;

function ensureSearchModal(){
  if(document.getElementById('searchModal')) return;

  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'searchOverlay';
  overlay.hidden = true;

  const modal = document.createElement('div');
  modal.className = 'search-modal';
  modal.id = 'searchModal';
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label','Search products');
  modal.hidden = true;
  modal.innerHTML = `
    <form class="search-head" id="searchForm">
      <label class="visually-hidden" for="searchInput">Search products</label>
      <input type="text" id="searchInput" placeholder="Search WAEZ" autocomplete="off">
      <button type="button" class="search-close" id="searchCloseBtn" aria-label="Close search">&times;</button>
    </form>
    <div class="search-body" id="searchBody">
      <p class="search-hint">Search by product name, category or fabric.</p>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  overlay.addEventListener('click', closeSearchModal);
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && !modal.hidden) closeSearchModal();
  });
  modal.addEventListener('keydown', e=>{
    if(e.key !== 'Tab') return;
    const focusables = modal.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    if(!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });

  document.getElementById('searchCloseBtn').addEventListener('click', closeSearchModal);
  document.getElementById('searchForm').addEventListener('submit', e=>{
    e.preventDefault();
    goToSearchResults(document.getElementById('searchInput').value);
  });
  document.getElementById('searchInput').addEventListener('input', e=>{
    clearTimeout(searchDebounceTimer);
    const val = e.target.value;
    searchDebounceTimer = setTimeout(()=>renderSearchResults(val), 180);
  });
}

function renderSearchResults(query){
  const body = document.getElementById('searchBody');
  const q = query.trim();

  if(!q){
    body.innerHTML = `<p class="search-hint">Search by product name, category or fabric.</p>`;
    return;
  }

  const results = searchProducts(q);

  if(!results.length){
    body.innerHTML = `<div class="search-empty">No products found for &ldquo;${escapeHTML(q)}&rdquo;.</div>`;
    return;
  }

  const LIMIT = 8;
  const shown = results.slice(0, LIMIT);

  body.innerHTML = `
    <div class="search-count">${results.length} Product${results.length !== 1 ? 's' : ''}</div>
    ${shown.map(p=>`
      <a class="search-result" href="#/product/${encodeURIComponent(p.id)}" data-search-result>
        <div class="thumb" style="background:${p.bg}">${garmentSVG(p.shape, p.mark)}</div>
        <div class="info">
          <div class="n">${escapeHTML(p.name)}</div>
          <div class="c">${escapeHTML(p.cat)}</div>
        </div>
        <div class="p">${BDT(p.price)}</div>
      </a>
    `).join('')}
    ${results.length > shown.length ? `
      <a class="search-viewall" href="#/shop?search=${encodeURIComponent(q)}" data-search-result>
        View all ${results.length} results
      </a>` : ''}
  `;

  body.querySelectorAll('[data-search-result]').forEach(el=>{
    el.addEventListener('click', closeSearchModal);
  });
}

function goToSearchResults(query){
  const q = query.trim();
  if(!q) return;
  closeSearchModal();
  location.hash = `#/shop?search=${encodeURIComponent(q)}`;
}

function openSearchModal(){
  ensureSearchModal();
  searchLastFocused = document.activeElement;

  const overlay = document.getElementById('searchOverlay');
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');

  input.value = '';
  renderSearchResults('');

  modal.hidden = false;
  overlay.hidden = false;
  lockScroll();
  requestAnimationFrame(()=>{ modal.classList.add('open'); overlay.classList.add('open'); });
  input.focus();
}

function closeSearchModal(){
  const overlay = document.getElementById('searchOverlay');
  const modal = document.getElementById('searchModal');
  if(!modal || modal.hidden) return;
  modal.classList.remove('open');
  overlay.classList.remove('open');
  setTimeout(()=>{ modal.hidden = true; overlay.hidden = true; }, 200);
  unlockScroll();
  if(searchLastFocused) searchLastFocused.focus();
}

document.getElementById('searchBtn').addEventListener('click', openSearchModal);
document.getElementById('mobileSearchBtn')?.addEventListener('click', e=>{
  e.preventDefault();
  closeDrawer();
  openSearchModal();
});

function loadingGrid(count = 8){
  return `<div class="p-grid" aria-hidden="true">${Array.from({length:count}).map(()=>`
    <div class="p-card p-skel">
      <div class="p-media"></div>
      <div class="p-meta">
             <div class="p-meta-line w60"></div>
        <div class="p-meta-line w35"></div>
        <div class="p-meta-line w20"></div>
      </div>
    </div>`).join('')}</div>`;
}
function emptyState({icon='\u2014', title, body}){
  return `
    <div class="state-block">
      <div class="state-icon" aria-hidden="true">${icon}</div>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(body)}</p>
    </div>`;
}
function errorState({title='Something went wrong', body='We could not load this page. Please try again.', retryId='retryBtn'}={}){
  return `
    <div class="state-block is-error">
      <div class="state-icon" aria-hidden="true">!</div>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(body)}</p>
      <button type="button" class="btn ghost" id="${retryId}">Try Again</button>
    </div>`;
}

function productCard(p){
  const badge = BADGES[p.badge];
  const isComingSoon = p.badge === 'soon';
  const isWished = WISHLIST.has(p.id);
  const altColor = p.colors[1] || p.colors[0];
  const colorLabel = p.colorNames.join(' / ');

  return `
  <div class="p-card" data-product-id="${p.id}">
    <div class="p-media-wrap">
      <a class="p-media-link" href="#/product/${encodeURIComponent(p.id)}" aria-label="${escapeHTML(p.name)}, ${BDT(p.price)}${isComingSoon ? ', coming soon' : ''}">
        <div class="p-media" style="background:${p.bg}">${garmentSVG(p.shape, p.mark)}</div>
        <div class="p-media-hover" style="background:${p.bg}">${garmentSVG(p.shape, altColor)}</div>
      </a>

      ${badge ? `<span class="p-tag ${badge.className}">${badge.label}</span>` : ''}

      <button type="button" class="wishlist-btn" data-wishlist="${p.id}" aria-pressed="${isWished}" aria-label="${isWished ? 'Remove ' + p.name + ' from wishlist' : 'Add ' + p.name + ' to wishlist'}">
        <span aria-hidden="true">${isWished ? '\u2665' : '\u2661'}</span>
      </button>

      <div class="card-actions">
        ${isComingSoon
          ? `<button type="button" class="card-action-btn" data-notify="${p.id}">Notify Me</button>`
          : `<button type="button" class="card-action-btn" data-quick-add="${p.id}">Quick Add</button>`
        }
        <button type="button" class="card-action-btn ghost" data-quick-view="${p.id}" aria-haspopup="dialog">Quick View</button>
      </div>
    </div>

    <div class="p-meta">
      <a class="p-name" href="#/product/${encodeURIComponent(p.id)}">${escapeHTML(p.name)}</a>
      <div class="p-price">${BDT(p.price)}</div>
      <div class="p-colors" aria-label="Available in ${p.colors.length} color${p.colors.length!==1?'s':''}: ${escapeHTML(colorLabel)}">
        ${p.colors.map(c=>`<span class="color-dot" style="background:${c}"></span>`).join('')}
      </div>
    </div>
  </div>`;
}

function refreshWishlistButtons(id){
  document.querySelectorAll(`[data-wishlist="${id}"]`).forEach(btn=>{
    const wished = WISHLIST.has(id);
    btn.setAttribute('aria-pressed', String(wished));
    btn.innerHTML = `<span aria-hidden="true">${wished ? '\u2665' : '\u2661'}</span>`;
  });
}

document.addEventListener('click', e=>{
  const wishBtn = e.target.closest('[data-wishlist]');
  if(wishBtn){
    const id = wishBtn.getAttribute('data-wishlist');
    const p = PRODUCTS.find(x=>x.id===id);
    if(WISHLIST.has(id)){ WISHLIST.delete(id); announce(`${p?.name || 'Item'} removed from wishlist`); }
    else { WISHLIST.add(id); announce(`${p?.name || 'Item'} added to wishlist`); }
    refreshWishlistButtons(id);
    return;
  }

  const notifyBtn = e.target.closest('[data-notify]');
  if(notifyBtn){
    const original = notifyBtn.textContent;
    notifyBtn.textContent = 'We\u2019ll Notify You';
    notifyBtn.disabled = true;
    setTimeout(()=>{ notifyBtn.textContent = original; notifyBtn.disabled = false; }, 1800);
    return;
  }

  const quickAddBtn = e.target.closest('[data-quick-add]');
  if(quickAddBtn){
    const id = quickAddBtn.getAttribute('data-quick-add');
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return;
    const size = p.sizes.find(s=>!p.oos.includes(s));
    if(!size) return;
    const original = quickAddBtn.textContent;
    quickAddBtn.textContent = 'Adding\u2026';
    quickAddBtn.disabled = true;
    fakeFetch(true, {delay:350}).then(()=>{
      addToCart(p.id, size, 1, 0);
      announce(`${p.name} added to bag`);
      quickAddBtn.textContent = 'Added \u2713';
      quickAddBtn.disabled = false;
      setTimeout(()=>{ quickAddBtn.textContent = original; }, 1400);
      openCartDrawer();
    });
    return;
  }

  const quickViewBtn = e.target.closest('[data-quick-view]');
  if(quickViewBtn){
    const id = quickViewBtn.getAttribute('data-quick-view');
    const p = PRODUCTS.find(x=>x.id===id);
    if(p) openQuickView(p, quickViewBtn);
  }
});

let qvLastFocused = null;

function ensureQuickViewModal(){
  if(document.getElementById('quickViewModal')) return;
  const overlay = document.createElement('div');
  overlay.className = 'qv-overlay';
  overlay.id = 'quickViewOverlay';
  overlay.hidden = true;

  const modal = document.createElement('div');
  modal.className = 'qv-modal';
  modal.id = 'quickViewModal';
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label','Quick view');
  modal.hidden = true;
  modal.innerHTML = `<div class="qv-body" id="quickViewBody"></div>`;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  overlay.addEventListener('click', closeQuickView);
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && !modal.hidden) closeQuickView();
  });
  modal.addEventListener('keydown', e=>{
    if(e.key !== 'Tab') return;
    const focusables = modal.querySelectorAll('a, button, input, select, [tabindex]:not([tabindex="-1"])');
    if(!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
}

function closeQuickView(){
  const overlay = document.getElementById('quickViewOverlay');
  const modal = document.getElementById('quickViewModal');
  if(!modal || modal.hidden) return;
  modal.classList.remove('open');
  overlay.classList.remove('open');
  setTimeout(()=>{ modal.hidden = true; overlay.hidden = true; }, 200);
  unlockScroll();
  if(qvLastFocused) qvLastFocused.focus();
}

function openQuickView(p, triggerEl){
  ensureQuickViewModal();
  qvLastFocused = triggerEl || document.activeElement;

  const overlay = document.getElementById('quickViewOverlay');
  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('quickViewBody');
  const isComingSoon = p.badge === 'soon';

  let selectedSize = p.sizes.find(s=>!p.oos.includes(s)) || null;
  let selectedColorIdx = 0;
  let qty = 1;

  body.innerHTML = `
    <button type="button" class="qv-close" id="qvCloseBtn" aria-label="Close quick view">&times;</button>
    <div class="qv-media" style="background:${p.bg}">${garmentSVG(p.shape, p.mark)}</div>
    <div class="qv-info">
      <div class="eyebrow">${escapeHTML(p.cat)}</div>
      <h2 id="qvHeading">${escapeHTML(p.name)}</h2>
      <div class="pdp-price">${BDT(p.price)}</div>

      ${p.colors.length > 1 ? `
      <div class="pdp-block" style="border-top:none;padding-top:0;">
        <h4 id="qvColorLabel">Color</h4>
        <div class="swatches" id="qvSwatches" role="group" aria-labelledby="qvColorLabel">
          ${p.colors.map((c,i)=>`<button type="button" class="swatch" data-color-i="${i}" aria-pressed="${i===0}" aria-label="${escapeHTML(p.colorNames[i])}" style="background:${c}"></button>`).join('')}
        </div>
      </div>` : ''}

      <div class="pdp-block" ${p.colors.length > 1 ? '' : 'style="border-top:none;padding-top:0;"'}>
        <h4 id="qvSizeLabel">Size</h4>
        <div class="size-grid" id="qvSizeGrid" role="group" aria-labelledby="qvSizeLabel">
          ${p.sizes.map(s=>{
            const oos = p.oos.includes(s);
            return `<button type="button" class="size-opt" data-size="${s}" aria-pressed="${!oos && s===selectedSize}" ${oos?'disabled aria-label="'+s+', out of stock"':''}>${s}</button>`;
          }).join('')}
        </div>
      </div>

      ${isComingSoon
        ? `<p class="pdp-note">This piece is not available yet. We will let you know the moment it drops.</p>
           <button type="button" class="btn block" id="qvNotifyBtn" style="margin-top:8px;">Notify Me</button>`
        : `<div class="qty-add" style="margin-top:8px;">
             <div class="qty-stepper">
               <button type="button" id="qvQtyMinus" aria-label="Decrease quantity">&minus;</button>
               <span id="qvQtyVal" aria-live="polite">1</span>
               <button type="button" id="qvQtyPlus" aria-label="Increase quantity">+</button>
             </div>
             <button class="btn block" id="qvAddBtn" style="flex:1;" ${!selectedSize?'disabled':''}>
               <span class="spinner" aria-hidden="true"></span>
               <span class="btn-label">${selectedSize ? 'Add To Bag' : 'Out Of Stock'}</span>
             </button>
           </div>
           <p class="pdp-add-msg" id="qvAddMsg" role="status" aria-live="polite"></p>`
      }
      <a href="#/product/${encodeURIComponent(p.id)}" class="qv-full-link" id="qvFullLink">View Full Details</a>
    </div>
  `;

  document.getElementById('qvCloseBtn').addEventListener('click', closeQuickView);
  document.getElementById('qvFullLink').addEventListener('click', closeQuickView);

  document.getElementById('qvSwatches')?.querySelectorAll('.swatch').forEach(sw=>{
    sw.addEventListener('click', ()=>{
      document.querySelectorAll('#qvSwatches .swatch').forEach(s=>s.setAttribute('aria-pressed','false'));
      sw.setAttribute('aria-pressed','true');
      selectedColorIdx = +sw.getAttribute('data-color-i');
    });
  });

  body.querySelectorAll('#qvSizeGrid .size-opt:not(:disabled)').forEach(so=>{
    so.addEventListener('click', ()=>{
      body.querySelectorAll('#qvSizeGrid .size-opt').forEach(s=>s.setAttribute('aria-pressed','false'));
      so.setAttribute('aria-pressed','true');
      selectedSize = so.getAttribute('data-size');
      const addBtn = document.getElementById('qvAddBtn');
      if(addBtn){ addBtn.disabled = false; addBtn.querySelector('.btn-label').textContent = 'Add To Bag'; }
    });
  });

  if(isComingSoon){
    document.getElementById('qvNotifyBtn').addEventListener('click', function(){
      this.textContent = 'We\u2019ll Notify You';
      this.disabled = true;
    });
  } else {
    document.getElementById('qvQtyMinus').addEventListener('click', ()=>{
      qty = Math.max(1, qty-1);
      document.getElementById('qvQtyVal').textContent = qty;
    });
    document.getElementById('qvQtyPlus').addEventListener('click', ()=>{
      qty = Math.min(9, qty+1);
      document.getElementById('qvQtyVal').textContent = qty;
    });
    document.getElementById('qvAddBtn').addEventListener('click', function(){
      if(!selectedSize) return;
      const btn = this;
      const label = btn.querySelector('.btn-label');
      btn.classList.add('is-loading');
      btn.disabled = true;
      fakeFetch(true, {delay:350}).then(()=>{
        addToCart(p.id, selectedSize, qty, selectedColorIdx);
        btn.classList.remove('is-loading');
        btn.disabled = false;
        label.textContent = 'Added \u2713';
        document.getElementById('qvAddMsg').textContent = `${qty} \u00d7 ${p.name} (${selectedSize}) added to your bag.`;
        announce(`${p.name} added to bag`);
        setTimeout(()=>{ label.textContent = 'Add To Bag'; }, 1400);
        openCartDrawer();
      });
    });
  }

  modal.hidden = false;
  overlay.hidden = false;
  lockScroll();
  requestAnimationFrame(()=>{ modal.classList.add('open'); overlay.classList.add('open'); });
  document.getElementById('qvCloseBtn').focus();
}

let cartDrawerLastFocused = null;

function ensureCartDrawer(){
  if(document.getElementById('cartDrawer')) return;

  const overlay = document.createElement('div');
  overlay.className = 'cart-drawer-overlay';
  overlay.id = 'cartDrawerOverlay';
  overlay.hidden = true;

  const cd = document.createElement('div');
  cd.className = 'cart-drawer';
  cd.id = 'cartDrawer';
  cd.setAttribute('role','dialog');
  cd.setAttribute('aria-modal','true');
  cd.setAttribute('aria-label','Your bag');
  cd.hidden = true;
  cd.innerHTML = `
    <div class="cart-drawer-head">
      <h2 id="cartDrawerHeading">Your Bag</h2>
      <button type="button" class="cart-drawer-close" id="cartDrawerClose" aria-label="Close bag">&times;</button>
    </div>
    <div class="cart-drawer-body" id="cartDrawerBody"></div>
    <div class="cart-drawer-footer" id="cartDrawerFooter"></div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(cd);

  overlay.addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerClose').addEventListener('click', closeCartDrawer);
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && !cd.hidden) closeCartDrawer();
  });
  cd.addEventListener('keydown', e=>{
    if(e.key !== 'Tab') return;
    const focusables = cd.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    if(!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
}

function isCartDrawerOpen(){
  const cd = document.getElementById('cartDrawer');
  return !!(cd && !cd.hidden);
}

function openCartDrawer(){
  ensureCartDrawer();
  cartDrawerLastFocused = document.activeElement;
  renderCartDrawer();

  const overlay = document.getElementById('cartDrawerOverlay');
  const cd = document.getElementById('cartDrawer');
  overlay.hidden = false;
  cd.hidden = false;
  lockScroll();
  requestAnimationFrame(()=>{ overlay.classList.add('open'); cd.classList.add('open'); });
  document.getElementById('cartDrawerClose').focus();
}

function closeCartDrawer(){
  const overlay = document.getElementById('cartDrawerOverlay');
  const cd = document.getElementById('cartDrawer');
  if(!cd || cd.hidden) return;
  cd.classList.remove('open');
  overlay.classList.remove('open');
  setTimeout(()=>{ cd.hidden = true; overlay.hidden = true; }, 260);
  unlockScroll();
  if(cartDrawerLastFocused) cartDrawerLastFocused.focus();
}

function renderCartDrawer(){
  const cd = document.getElementById('cartDrawer');
  if(!cd) return;
  const body = document.getElementById('cartDrawerBody');
  const footer = document.getElementById('cartDrawerFooter');
  const lines = cartLines();

  if(!lines.length){
    body.innerHTML = emptyState({title:'Your bag is empty', body:'Add something you like and it will show up here.'});
    footer.innerHTML = `<a href="#/shop" class="btn block" id="cartDrawerShopBtn">Continue Shopping</a>`;
    document.getElementById('cartDrawerShopBtn').addEventListener('click', closeCartDrawer);
    return;
  }

  const subtotal = lines.reduce((s,l)=>s + l.product.price * l.item.qty, 0);

  body.innerHTML = lines.map((l,idx)=>`
    <div class="cart-drawer-item" data-idx="${idx}">
      <div class="cdi-thumb" style="background:${l.product.bg}">${garmentSVG(l.product.shape, '#141311')}</div>
      <div class="cdi-info">
        <a class="cdi-name" href="#/product/${encodeURIComponent(l.product.id)}">${escapeHTML(l.product.name)}</a>
        <div class="cdi-meta">${escapeHTML(cartColorName(l.product, l.item.color))} / ${escapeHTML(l.item.size)}</div>
        <div class="cdi-row">
          <div class="qty-stepper">
            <button type="button" class="cdi-dec" aria-label="Decrease quantity of ${escapeHTML(l.product.name)}" ${l.item.qty<=1?'disabled':''}>&minus;</button>
            <span aria-live="polite">${l.item.qty}</span>
            <button type="button" class="cdi-inc" aria-label="Increase quantity of ${escapeHTML(l.product.name)}" ${l.item.qty>=9?'disabled':''}>+</button>
          </div>
          <button type="button" class="remove-link cdi-remove">Remove</button>
        </div>
      </div>
      <div class="cdi-price">${BDT(l.product.price * l.item.qty)}</div>
    </div>`).join('');

  footer.innerHTML = `
    ${shippingProgressHTML(subtotal)}
    <div class="summary-row subtotal"><span>Subtotal</span><span>${BDT(subtotal)}</span></div>
    <p class="pdp-note" style="margin:2px 0 16px;">Shipping and taxes calculated at checkout.</p>
    <a href="#/cart" class="btn ghost block" id="cartDrawerViewBag">View Bag</a>
    <a href="#/checkout" class="btn block" id="cartDrawerCheckout" style="margin-top:10px;">Checkout</a>
  `;

  document.getElementById('cartDrawerViewBag').addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerCheckout').addEventListener('click', closeCartDrawer);

  body.querySelectorAll('.cart-drawer-item').forEach(row=>{
    const idx = +row.getAttribute('data-idx');
    row.querySelector('.cdi-inc').addEventListener('click', ()=>{
      CART[idx].qty = Math.min(9, CART[idx].qty+1);
      updateBagCount();
      renderCartDrawer();
    });
    row.querySelector('.cdi-dec').addEventListener('click', ()=>{
      CART[idx].qty = Math.max(1, CART[idx].qty-1);
      updateBagCount();
      renderCartDrawer();
    });
    row.querySelector('.cdi-remove').addEventListener('click', ()=>{
      const removed = CART.splice(idx,1)[0];
      updateBagCount();
      renderCartDrawer();
      if(removed) announce('Item removed from bag');
    });
  });
}

const CATEGORY_TILES = [
  {key:'tees', label:'Tees & Polos', shape:'tee', bg:'var(--taupe-1)'},
  {key:'outerwear', label:'Outerwear', shape:'jacket', bg:'var(--taupe-6)'},
  {key:'bottoms', label:'Bottoms', shape:'trouser', bg:'var(--taupe-4)'},
  {key:'new', label:'New In', shape:'hoodie', bg:'var(--taupe-2)'},
];

function renderHome(){
  const featured = PRODUCTS.slice(0,8);

  app.innerHTML = `
    <section class="hero">
      <div class="hero-left">
        <div class="eyebrow">WAEZ / Drop 01</div>
        <h1>WEAR YOUR<br>WAY.</h1>
        <p>Modern essentials designed for movement, confidence and everyday expression.</p>
        <a href="#/shop?cat=new" class="btn">Shop The Drop</a>
      </div>
      <div class="hero-right">
        <div class="hero-frame">
          <span class="frame-tag">WAEZ / Form 01</span>
          <div class="hero-garment">${garmentSVG('tee', '#141311')}</div>
          <div class="hero-garment-label">WAEZ<br>Essential / 001</div>
        </div>
      </div>
    </section>

    <section class="new-drop wrap" aria-labelledby="newDropHeading">
      <div class="new-drop-panel">
        <div class="new-drop-text">
          <div class="eyebrow">Just Landed</div>
          <h2 id="newDropHeading">Drop 01 is live.</h2>
          <p>Twelve pieces, one fabric problem solved at a time. Heavyweight cottons and structured outerwear, built to earn a place in daily rotation.</p>
          <a href="#/shop?cat=new" class="btn ghost">Shop The Drop</a>
        </div>
        <div class="new-drop-visual" style="background:var(--taupe-2)">
          ${garmentSVG('hoodie', '#141311')}
        </div>
      </div>
    </section>

    <section class="wrap home-section" aria-labelledby="categoryHeading">
      <div class="page-strip" style="border-bottom:1px solid var(--line);">
      <h2 id="categoryHeading" style="font-size:34px;font-family:'Space Grotesk',sans-serif;font-weight:700;">Shop By Category</h2>
        <span class="count">4 Collections</span>
      </div>
      <div class="category-grid">
        ${CATEGORY_TILES.map(c=>`
          <a class="category-tile" href="#/shop?cat=${c.key}">
            <div class="category-media" style="background:${c.bg}">${garmentSVG(c.shape, '#141311')}</div>
            <div class="category-label">
              <span>${c.label}</span>
              <span class="category-arrow" aria-hidden="true">&rarr;</span>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="wrap home-section" aria-labelledby="featuredHeading">
      <div class="page-strip" style="border-bottom:1px solid var(--line);">
       <h2 id="featuredHeading" style="font-size:34px;font-family:'Space Grotesk',sans-serif;font-weight:700;">Featured Products</h2>
        <a href="#/shop" class="count view-all">View All</a>
      </div>
      <div class="p-grid" style="margin-top:32px;">
        ${featured.map(productCard).join('')}
      </div>
    </section>

    <section class="brand-story wrap" aria-labelledby="storyHeading">
      <div class="brand-story-visual" style="background:var(--taupe-5)">${garmentSVG('shirt', '#141311')}</div>
      <div class="brand-story-text">
        <div class="eyebrow">Our Story</div>
        <h2 id="storyHeading">Clothes built for how you actually move through a day.</h2>
        <p>WAEZ started in 2024 as a small pattern-making studio in Chattogram. Every piece we make has to earn its place: in a commute, a work day, a night out, and back again the next morning.</p>
        <a href="#/about" class="btn ghost">Read Our Story</a>
      </div>
    </section>

    <section class="editorial" aria-labelledby="editorialHeading">
      <div class="editorial-media">${garmentSVG('jacket', 'rgba(245,242,234,0.9)')}</div>
      <div class="wrap editorial-inner">
        <div class="eyebrow" style="color:var(--taupe-2);">Campaign / Drop 01</div>
        <h2 id="editorialHeading">Built for the walk, the meeting, and everything after.</h2>
        <a href="#/shop" class="btn">Explore The Lookbook</a>
      </div>
    </section>

    <section class="home-newsletter wrap" aria-labelledby="newsletterHeading">
      <h2 id="newsletterHeading">Get the next drop first.</h2>
      <p>Join the list for early access, restock alerts, and the occasional studio update.</p>
      <form class="home-newsletter-form" id="homeNewsletterForm" novalidate>
        <label class="visually-hidden" for="homeNewsletterEmail">Email address</label>
        <input type="email" id="homeNewsletterEmail" placeholder="Your email" required autocomplete="email">
        <button type="submit" class="btn">Join The List</button>
      </form>
      <p class="form-msg" id="homeNewsletterMsg" role="status" aria-live="polite"></p>
    </section>
  `;

  wireNewsletterForm('homeNewsletterForm', 'homeNewsletterEmail', 'homeNewsletterMsg');
  focusMain();
  updateBagCount();
}

function renderShop(params){
  let cat = params.get('cat') || 'all';
  let sort = params.get('sort') || 'featured';
  let searchQuery = params.get('search') || '';
  let selectedSizes = new Set((params.get('sizes') || '').split(',').filter(Boolean));
  let selectedPrices = new Set((params.get('price') || '').split(',').filter(Boolean));
  let loading = true;
  let loadError = false;

  const categories = [
    {key:'all', label:'All Products'},
    {key:'new', label:'New In'},
    {key:'tees', label:'Tees'},
    {key:'shirts', label:'Shirts'},
    {key:'outerwear', label:'Outerwear'},
    {key:'bottoms', label:'Bottoms'},
  ];
  const sizeOptions = ['XS','S','M','L','XL'];
  const priceOptions = [
    {key:'under2000', label:'Under BDT 2,000'},
    {key:'2000-3000', label:'BDT 2,000 \u2013 3,000'},
    {key:'over3000', label:'Over BDT 3,000'},
  ];

  function matchesCategory(p){
    if(cat === 'all') return true;
    if(cat === 'new') return p.badge === 'new';
    if(cat === 'shirts') return p.shape === 'shirt';
    if(cat === 'outerwear') return p.cat === 'outerwear' && p.shape !== 'shirt';
    return p.cat === cat;
  }
  function matchesSize(p){
    if(!selectedSizes.size) return true;
    return [...selectedSizes].some(s => p.sizes.includes(s) && !p.oos.includes(s));
  }
  function matchesPrice(p){
    if(!selectedPrices.size) return true;
    return [...selectedPrices].some(key=>{
      if(key === 'under2000') return p.price < 2000;
      if(key === '2000-3000') return p.price >= 2000 && p.price <= 3000;
      if(key === 'over3000') return p.price > 3000;
      return false;
    });
  }
  function matchesSearch(p){
    return matchesSearchQuery(p, searchQuery);
  }

  function filtered(){
    let list = PRODUCTS.filter(p => matchesCategory(p) && matchesSize(p) && matchesPrice(p) && matchesSearch(p));

    if(sort === 'price-asc'){
      list.sort((a,b)=>a.price-b.price);
    } else if(sort === 'price-desc'){
      list.sort((a,b)=>b.price-a.price);
    } else if(sort === 'newest'){
      list = list
        .map(p => ({p, i: PRODUCTS.indexOf(p)}))
        .sort((a,b)=>{
          const an = a.p.badge === 'new' ? 0 : 1;
          const bn = b.p.badge === 'new' ? 0 : 1;
          if(an !== bn) return an - bn;
          return b.i - a.i;
        })
        .map(x => x.p);
    }
    return list;
  }

  function syncHash(){
    const q = new URLSearchParams();
    if(cat !== 'all') q.set('cat', cat);
    if(sort !== 'featured') q.set('sort', sort);
    if(searchQuery.trim()) q.set('search', searchQuery.trim());
    if(selectedSizes.size) q.set('sizes', [...selectedSizes].join(','));
    if(selectedPrices.size) q.set('price', [...selectedPrices].join(','));
    const qs = q.toString();
    history.replaceState(null, '', `#/shop${qs ? '?' + qs : ''}`);
  }

  function activeFilterChips(){
    const chips = [];
    if(cat !== 'all'){
      const c = categories.find(c=>c.key===cat);
      chips.push({label: c ? c.label : cat, onRemove: ()=>{ cat = 'all'; }});
    }
    selectedSizes.forEach(s=>{
      chips.push({label:`Size ${s}`, onRemove: ()=>selectedSizes.delete(s)});
    });
    selectedPrices.forEach(k=>{
      const opt = priceOptions.find(o=>o.key===k);
      chips.push({label: opt ? opt.label : k, onRemove: ()=>selectedPrices.delete(k)});
    });
    if(searchQuery.trim()){
      chips.push({label:`\u201c${searchQuery.trim()}\u201d`, onRemove: ()=>{ searchQuery = ''; }});
    }
    return chips;
  }

  function shell(){
    app.innerHTML = `
      <div class="wrap">
        <div class="page-strip">
          <h1 id="shopHeading">Shop</h1>
          <span class="count" id="shopCount" aria-live="polite"></span>
        </div>
        <div class="shop-layout">
          <aside class="filters" id="filtersPanel" aria-label="Filter products">
            <button type="button" class="filters-close" id="filtersClose" aria-label="Close filters">&times;</button>
            <div class="filter-group">
              <h4 id="catLabel">Category</h4>
              <div role="group" aria-labelledby="catLabel" id="catGroup">
                ${categories.map(c=>`
                  <button type="button" class="filter-opt" data-cat="${c.key}" aria-pressed="${cat===c.key}">
                    <span>${c.label}</span>
                  </button>`).join('')}
              </div>
            </div>
            <div class="filter-group">
              <h4 id="sizeLabel">Size</h4>
              <div role="group" aria-labelledby="sizeLabel" id="sizeGroup">
                ${sizeOptions.map(s=>`
                  <button type="button" class="filter-opt" data-size="${s}" aria-pressed="${selectedSizes.has(s)}">
                    <span>${s}</span>
                  </button>`).join('')}
              </div>
            </div>
            <div class="filter-group">
              <h4 id="priceLabel">Price</h4>
              <div role="group" aria-labelledby="priceLabel" id="priceGroup">
                ${priceOptions.map(o=>`
                  <button type="button" class="filter-opt" data-price="${o.key}" aria-pressed="${selectedPrices.has(o.key)}">
                    <span>${o.label}</span>
                  </button>`).join('')}
              </div>
            </div>
            <button type="button" class="clear-filters" id="clearFiltersBtn">Clear All Filters</button>
          </aside>
          <div>
            <div class="shop-toolbar">
              <button class="btn ghost filters-toggle" id="filtersOpen">Filter</button>
              <label class="visually-hidden" for="sortSelect">Sort products</label>
              <select class="sort-select" id="sortSelect">
                <option value="featured" ${sort==='featured'?'selected':''}>Sort: Featured</option>
                <option value="newest" ${sort==='newest'?'selected':''}>Sort: Newest</option>
                <option value="price-asc" ${sort==='price-asc'?'selected':''}>Price: Low to High</option>
                <option value="price-desc" ${sort==='price-desc'?'selected':''}>Price: High to Low</option>
              </select>
            </div>
            <div id="activeFilters"></div>
            <div id="shopGrid">${loadingGrid(8)}</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('catGroup').addEventListener('click', e=>{
      const btn = e.target.closest('[data-cat]');
      if(!btn) return;
      cat = btn.getAttribute('data-cat');
      afterFilterChange();
    });
    document.getElementById('sizeGroup').addEventListener('click', e=>{
      const btn = e.target.closest('[data-size]');
      if(!btn) return;
      const s = btn.getAttribute('data-size');
      selectedSizes.has(s) ? selectedSizes.delete(s) : selectedSizes.add(s);
      afterFilterChange();
    });
    document.getElementById('priceGroup').addEventListener('click', e=>{
      const btn = e.target.closest('[data-price]');
      if(!btn) return;
      const k = btn.getAttribute('data-price');
      selectedPrices.has(k) ? selectedPrices.delete(k) : selectedPrices.add(k);
      afterFilterChange();
    });
    document.getElementById('clearFiltersBtn').addEventListener('click', ()=>{
      cat = 'all';
      selectedSizes.clear();
      selectedPrices.clear();
      searchQuery = '';
      afterFilterChange();
    });
    document.getElementById('sortSelect').addEventListener('change', e=>{
      sort = e.target.value;
      syncHash();
      draw();
    });
    document.getElementById('filtersOpen').addEventListener('click', ()=>{
      document.getElementById('filtersPanel').classList.add('open');
    });
    document.getElementById('filtersClose').addEventListener('click', ()=>{
      document.getElementById('filtersPanel').classList.remove('open');
    });
  }

  function afterFilterChange(){
    syncPressedStates();
    syncHash();
    draw();
  }

  function syncPressedStates(){
    document.querySelectorAll('#catGroup [data-cat]').forEach(b=>
      b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === cat)));
    document.querySelectorAll('#sizeGroup [data-size]').forEach(b=>
      b.setAttribute('aria-pressed', String(selectedSizes.has(b.getAttribute('data-size')))));
    document.querySelectorAll('#priceGroup [data-price]').forEach(b=>
      b.setAttribute('aria-pressed', String(selectedPrices.has(b.getAttribute('data-price')))));
  }

  function drawActiveFilters(){
    const wrap = document.getElementById('activeFilters');
    const chips = activeFilterChips();
    if(!chips.length){ wrap.innerHTML = ''; return; }
    wrap.innerHTML = `<div class="active-filters">${chips.map((c,i)=>`
      <span class="active-filter-chip" data-chip="${i}">
        ${escapeHTML(c.label)}
        <button type="button" aria-label="Remove ${escapeHTML(c.label)} filter">&times;</button>
      </span>`).join('')}</div>`;
    wrap.querySelectorAll('[data-chip]').forEach((el,i)=>{
      el.querySelector('button').addEventListener('click', ()=>{
        chips[i].onRemove();
        afterFilterChange();
      });
    });
  }

  function draw(){
    const grid = document.getElementById('shopGrid');
    const count = document.getElementById('shopCount');
    drawActiveFilters();
    if(loadError){
      grid.innerHTML = `<div class="p-grid">${errorState({body:'We could not load products. Please try again.'})}</div>`;
      count.textContent = '';
      document.getElementById('retryBtn')?.addEventListener('click', load);
      return;
    }
    const list = filtered();
    grid.innerHTML = list.length
      ? `<div class="p-grid">${list.map(productCard).join('')}</div>`
      : `<div class="p-grid">${emptyState({title:'No products match', body:'Try a different category, size, price range or search term.'})}</div>`;
    count.textContent = `${list.length} item${list.length!==1?'s':''}`;
  }

  function load(){
    loading = true; loadError = false;
    document.getElementById('shopGrid').innerHTML = loadingGrid(8);
    document.getElementById('shopCount').textContent = 'Loading\u2026';
    fakeFetch(true, {delay:280})
      .then(()=>{ loading = false; draw(); })
      .catch(()=>{ loading = false; loadError = true; draw(); });
  }

  shell();
  load();
  focusMain();
  updateBagCount();
}

function renderPDP(id){
  const p = PRODUCTS.find(x=>x.id===id);

  if(!p){
    app.innerHTML = `
      <div class="wrap">
        <div class="empty-state-page">
          ${emptyState({icon:'?', title:'Product not found', body:'This item may have sold out or the link is no longer valid.'})}
          <a href="#/shop" class="btn" style="margin-top:8px;">Back to Shop</a>
        </div>
      </div>`;
    focusMain();
    updateBagCount();
    return;
  }

  let selectedSize = p.sizes.find(s=>!p.oos.includes(s)) || null;
  let selectedColor = 0;
  let qty = 1;

  const related = PRODUCTS.filter(x=>x.cat===p.cat && x.id!==p.id).slice(0,4);

  app.innerHTML = `
    <div class="wrap">
      <div class="pdp">
        <div class="pdp-gallery">
          <div class="shot">${garmentSVG(p.shape, '#141311')}</div>
          <div class="shot">${garmentSVG(p.shape, '#7A756A')}</div>
        </div>
        <div class="pdp-info">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="#/shop">Shop</a> / ${escapeHTML(p.cat)} / ${escapeHTML(p.name)}</nav>
          <h1>${escapeHTML(p.name)}</h1>
          <div class="pdp-price">${BDT(p.price)}</div>

          ${starRatingHTML(p.rating, p.reviewCount)}

          <div class="pdp-block">
            <h4 id="colorLabel">Color: <span id="selectedColorName">${escapeHTML(p.colorNames[0])}</span></h4>
            <div class="swatches" id="swatches" role="group" aria-labelledby="colorLabel">
             ${p.colors.map((c,i)=>`<button type="button" class="swatch" data-i="${i}" aria-pressed="${i===0}" aria-label="${escapeHTML(p.colorNames[i])}" style="background:${c}"></button>`).join('')}
            </div>
          </div>

             <div class="pdp-block">
            <div class="size-head">
              <h4 id="sizeLabel2">Size: <span id="selectedSizeName">${escapeHTML(selectedSize || 'Select a size')}</span></h4>
              <button type="button" class="size-guide-link" data-scroll-to="acc-size-guide">Size Guide</button>
            </div>
            <div class="size-grid" id="sizeGrid" role="group" aria-labelledby="sizeLabel2">
              ${p.sizes.map(s=>{
                const oos = p.oos.includes(s);
                return `<button type="button" class="size-opt" data-size="${s}" aria-pressed="${!oos && s===selectedSize}" ${oos?'disabled aria-label="'+s+', out of stock"':''}>${s}</button>`;
              }).join('')}
            </div>
            <div class="pdp-note">Runs true to size. See size guide for full measurements.</div>
          </div>

          <div class="qty-add">
            <div class="qty-stepper">
              <button type="button" id="qtyMinus" aria-label="Decrease quantity">&minus;</button>
              <span id="qtyVal" aria-live="polite">1</span>
              <button type="button" id="qtyPlus" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn block" id="addToCartBtn" style="flex:1;" ${!selectedSize?'disabled':''}>
              <span class="spinner" aria-hidden="true"></span>
              <span class="btn-label">${selectedSize ? 'Add To Bag' : 'Out Of Stock'}</span>
            </button>
          </div>
          <p class="pdp-add-msg" id="addMsg" role="status" aria-live="polite"></p>

          <div class="accordion" style="margin-top:36px;">
            <div class="accordion-item open">
              <button type="button" class="accordion-head" aria-expanded="true" aria-controls="acc-1">Product Details<span class="chev" aria-hidden="true">+</span></button>
              <div class="accordion-body" id="acc-1"><p>Heavyweight cotton jersey with a structured drape. Designed in-house for everyday movement, cut with a relaxed, considered fit.</p></div>
            </div>
            <div class="accordion-item">
              <button type="button" class="accordion-head" aria-expanded="false" aria-controls="acc-2">Shipping &amp; Returns<span class="chev" aria-hidden="true">+</span></button>
              <div class="accordion-body" id="acc-2"><p>Dispatched within 2 business days across Bangladesh. Free returns within 14 days of delivery, unworn with tags attached.</p></div>
            </div>
            <div class="accordion-item">
              <button type="button" class="accordion-head" aria-expanded="false" aria-controls="acc-3">Care<span class="chev" aria-hidden="true">+</span></button>
              <div class="accordion-body" id="acc-3"><p>100% combed cotton, 240gsm. Machine wash cold, inside out. Do not tumble dry. Iron on reverse.</p></div>
            </div>
            <div class="accordion-item" id="acc-size-guide">
  <button
    type="button"
    class="accordion-head"
    aria-expanded="false"
    aria-controls="acc-4"
  >
    Size Guide
    <span class="chev" aria-hidden="true">+</span>
  </button>

  <div class="accordion-body" id="acc-4">

    <table>
      <caption>Measurements are in inches.</caption>

      <thead>
        <tr>
          <th scope="col">Size</th>
          <th scope="col">Chest</th>
          <th scope="col">Length</th>
          <th scope="col">Shoulder</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">S</th>
          <td>40"</td>
          <td>27"</td>
          <td>17"</td>
        </tr>

        <tr>
          <th scope="row">M</th>
          <td>42"</td>
          <td>28"</td>
          <td>18"</td>
        </tr>

        <tr>
          <th scope="row">L</th>
          <td>44"</td>
          <td>29"</td>
          <td>19"</td>
        </tr>

        <tr>
          <th scope="row">XL</th>
          <td>46"</td>
          <td>30"</td>
          <td>20"</td>
        </tr>
      </tbody>
    </table>

    <p>
      Between sizes? We recommend sizing up for a more relaxed fit.
    </p>

    <a href="#/size-guide" class="size-guide-link">
      View Full Size Guide
    </a>

  </div>
</div>
          </div>
        </div>
      </div>
    </div>

    ${related.length ? `
    <div class="wrap related-wrap">
      <section class="related" aria-labelledby="relatedHeading">
        <h2 id="relatedHeading">You May Also Like</h2>
        <div class="p-grid">${related.map(productCard).join('')}</div>
      </section>
    </div>` : ''}
  `;

  function openAccordionItem(item){
    if(!item) return;
    document.querySelectorAll('.accordion-item').forEach(other=>{
      if(other !== item){
        other.classList.remove('open');
        other.querySelector('.accordion-head')?.setAttribute('aria-expanded','false');
      }
    });
    item.classList.add('open');
    item.querySelector('.accordion-head')?.setAttribute('aria-expanded','true');
    item.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  document.querySelectorAll('.accordion-head').forEach(h=>{
    h.addEventListener('click', ()=>{
      const item = h.parentElement;
      const open = item.classList.toggle('open');
      h.setAttribute('aria-expanded', String(open));
    });
  });
  document.querySelectorAll('[data-scroll-to]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const target = document.getElementById(el.getAttribute('data-scroll-to'));
      openAccordionItem(target);
    });
  });
  document.querySelectorAll('.swatch').forEach(sw=>{
    sw.addEventListener('click', ()=>{
      document.querySelectorAll('.swatch').forEach(s=>s.setAttribute('aria-pressed','false'));
      sw.setAttribute('aria-pressed','true');
      selectedColor = +sw.getAttribute('data-i');
      document.getElementById('selectedColorName').textContent = p.colorNames[selectedColor];
    });
  });
  document.querySelectorAll('.size-opt:not(:disabled)').forEach(so=>{
    so.addEventListener('click', ()=>{
      document.querySelectorAll('.size-opt').forEach(s=>s.setAttribute('aria-pressed','false'));
      so.setAttribute('aria-pressed','true');
      selectedSize = so.getAttribute('data-size');
      document.getElementById('selectedSizeName').textContent = selectedSize;
      const addBtn = document.getElementById('addToCartBtn');
      addBtn.disabled = false;
      addBtn.querySelector('.btn-label').textContent = 'Add To Bag';
    });
  });
  function updateQtyButtons(){
    document.getElementById('qtyMinus').disabled = qty <= 1;
    document.getElementById('qtyPlus').disabled = qty >= 9;
  }
  document.getElementById('qtyMinus').addEventListener('click', ()=>{
    qty = Math.max(1, qty-1);
    document.getElementById('qtyVal').textContent = qty;
    updateQtyButtons();
  });
  document.getElementById('qtyPlus').addEventListener('click', ()=>{
    qty = Math.min(9, qty+1);
    document.getElementById('qtyVal').textContent = qty;
    updateQtyButtons();
  });
  updateQtyButtons();
  document.getElementById('addToCartBtn').addEventListener('click', function(){
    if(!selectedSize) return;
    const btn = this;
    const label = btn.querySelector('.btn-label');
    btn.classList.add('is-loading');
    btn.disabled = true;
    fakeFetch(true, {delay:400}).then(()=>{
      addToCart(p.id, selectedSize, qty, selectedColor);
      btn.classList.remove('is-loading');
      btn.disabled = false;
      const original = label.textContent;
      label.textContent = 'Added \u2713';
      document.getElementById('addMsg').textContent = `${qty} \u00d7 ${p.name} (${selectedSize}) added to your bag.`;
      announce(`${p.name} added to bag`);
      setTimeout(()=>{ label.textContent = original; }, 1400);
      openCartDrawer();
    });
  });

  focusMain();
  updateBagCount();
}

function renderAbout(){
  app.innerHTML = `
    <div class="wrap static-page about-page">

      <section class="static-hero about-hero">
        <div class="eyebrow">WAEZ / Our Story</div>

        <h1>
          Clothes built for how you actually
          move through a day.
        </h1>

        <p class="static-lead">
          WAEZ started in 2024 as a small pattern-making studio
          in Chattogram, frustrated by essentials that looked good
          on a hanger and nowhere else.
        </p>

        <p>
          We believe everyday clothing should feel considered
          without feeling complicated. Every piece is designed
          around movement, comfort, proportion and repeat wear.
        </p>
      </section>

      <section class="static-visual about-band" aria-hidden="true">
        ${garmentSVG('shirt', '#141311')}
        <div class="visual-label">
          WAEZ / FORM 01<br>
          EVERYDAY ESSENTIALS
        </div>
      </section>

      <section class="static-copy-grid">

        <div class="static-copy">
          <div class="eyebrow">01 / Approach</div>
          <h2>Small drops.<br>Better decisions.</h2>

          <p>
            We design in small, deliberate drops rather than
            constant releases. Each collection starts from one
            fabric, one silhouette or one everyday problem we
            want to solve.
          </p>

          <p>
            We don't move on until the piece feels right.
            That's why our collections stay small and why
            our essentials are designed to stay relevant
            beyond one season.
          </p>
        </div>

        <div class="static-copy">
          <div class="eyebrow">02 / Materials</div>
          <h2>Made to be<br>worn repeatedly.</h2>

          <p>
            We work with heavyweight cottons, structured twills
            and brushed fleece selected for everyday durability,
            comfort and shape.
          </p>

          <p>
            The goal isn't to make more clothes. It's to make
            pieces you'll actually want to wear again tomorrow.
          </p>
        </div>

      </section>

      <section class="values">

        <article class="value-card">
          <div class="num">01</div>
          <h3>Made to be worn out</h3>
          <p>
            Fit is considered around real movement, real bodies
            and real days &mdash; not just how something looks standing still.
          </p>
        </article>

        <article class="value-card">
          <div class="num">02</div>
          <h3>Small, considered runs</h3>
          <p>
            We produce close to what we expect to sell.
            Fewer units, less waste and less disposable clothing.
          </p>
        </article>

        <article class="value-card">
          <div class="num">03</div>
          <h3>Local first</h3>
          <p>
            Designed and developed with a Bangladesh-first
            mindset and a supply chain we can understand and improve.
          </p>
        </article>

      </section>

      <section class="drops-timeline">

        <div class="page-strip">
          <h2>Drops Archive</h2>
          <span class="count">2024 &mdash; 2026</span>
        </div>

        <div class="drop-row">
          <div class="yr">2024</div>
          <div class="ttl">Studio Zero</div>
          <p class="dsc">
            The first WAEZ run &mdash; four tee fits tested privately
            before release.
          </p>
        </div>

        <div class="drop-row">
          <div class="yr">2025</div>
          <div class="ttl">Form &amp; Function</div>
          <p class="dsc">
            Structured outerwear and our first bottoms line
            entered the collection.
          </p>
        </div>

        <div class="drop-row">
          <div class="yr">2026</div>
          <div class="ttl">Drop 01</div>
          <p class="dsc">
            Our most refined essentials range yet &mdash;
            the current collection.
          </p>
        </div>

      </section>

    </div>
  `;

  focusMain();
  updateBagCount();
}

function renderAccount(){
  app.innerHTML = `
    <div class="wrap static-page">

      <section class="static-hero">
        <div class="eyebrow">WAEZ / Account</div>
        <h1>Sign In.</h1>
        <p class="static-lead">
          Customer accounts are on the way. In the meantime, check an order
          or reach out and we\u2019ll sort it out by hand.
        </p>
      </section>

      <section class="policy-note">
        <div class="eyebrow">Coming Soon</div>
        <h2>Order tracking &amp; saved details.</h2>
        <p>
          We\u2019re building account sign-in so you can track orders and save
          your details for faster checkout. Until then, your order
          confirmation email has everything you need.
        </p>
      </section>

      <section class="policy-contact">
        <div>
          <div class="eyebrow">Need Help Now?</div>
          <h2>Have a question about an order?</h2>
        </div>
        <a href="#/contact" class="btn">Contact Us</a>
      </section>

    </div>
  `;

  focusMain();
  updateBagCount();
}

function renderContact(){
  app.innerHTML = `
    <div class="wrap static-page contact-page">

      <section class="static-hero">
        <div class="eyebrow">WAEZ / Contact</div>
        <h1>Get In Touch.</h1>
        <p class="static-lead">
          Questions about an order, sizing, shipping or just
          want to say hello? We'd love to hear from you.
        </p>
      </section>

      <section class="contact-layout">

        <div class="contact-details">

          <div class="contact-detail">
            <span class="eyebrow">Email</span>
            <a href="mailto:hello@waez.bd">
              hello@waez.bd
            </a>
          </div>

          <div class="contact-detail">
            <span class="eyebrow">Instagram</span>
            <a href="https://instagram.com/waez.bd"
               target="_blank"
               rel="noopener noreferrer">
              @waez.bd
            </a>
          </div>

          <div class="contact-detail">
            <span class="eyebrow">Phone</span>
            <a href="tel:+8801XXXXXXXXX">
              +880 1XXXXXXXXX
            </a>
          </div>

          <div class="contact-note">
            <span class="eyebrow">Response Time</span>
            <p>
              We usually reply within 1 business day.
            </p>
          </div>

        </div>

        <div class="contact-form-wrap">

          <div class="eyebrow">Send A Message</div>
          <h2>Let's talk.</h2>

          <form id="contactForm" class="contact-form" novalidate>

            <div class="field">
              <label for="contactName">Name</label>
              <input
                type="text"
                id="contactName"
                name="name"
                required
                autocomplete="name"
                placeholder="Your name"
              >
              <span class="field-error"
                    data-contact-error="contactName"></span>
            </div>

            <div class="field">
              <label for="contactEmail">Email</label>
              <input
                type="email"
                id="contactEmail"
                name="email"
                required
                autocomplete="email"
                placeholder="you@example.com"
              >
              <span class="field-error"
                    data-contact-error="contactEmail"></span>
            </div>

            <div class="field">
              <label for="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                name="message"
                rows="6"
                required
                placeholder="How can we help?"
              ></textarea>
              <span class="field-error"
                    data-contact-error="contactMessage"></span>
            </div>

            <button type="submit" class="btn" id="contactSubmit">
              <span class="spinner" aria-hidden="true"></span>
              <span class="btn-label">Send</span>
            </button>

            <p
              class="form-msg"
              id="contactFormMsg"
              role="status"
              aria-live="polite">
            </p>

          </form>

        </div>

      </section>

    </div>
  `;

  const form = document.getElementById('contactForm');
  const msg = document.getElementById('contactFormMsg');
  const submit = document.getElementById('contactSubmit');

  form.addEventListener('submit', e=>{
    e.preventDefault();

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');

    const fields = [name, email, message];
    let valid = true;

    fields.forEach(input=>{
      const error = form.querySelector(
        `[data-contact-error="${input.id}"]`
      );

      if(!input.checkValidity()){
        valid = false;

        if(input.validity.valueMissing){
          error.textContent = 'This field is required.';
        }else{
          error.textContent = 'Please enter a valid value.';
        }
      }else{
        error.textContent = '';
      }
    });

    if(!valid){
      fields.find(input=>!input.checkValidity())?.focus();
      return;
    }

    submit.classList.add('is-loading');
    submit.disabled = true;
    msg.textContent = '';

    fakeFetch(true, {delay:700}).then(()=>{
      submit.classList.remove('is-loading');
      submit.disabled = false;

      msg.textContent =
        'Thanks \u2014 your message has been received. We\u2019ll get back to you soon.';
      msg.className = 'form-msg success';

      form.reset();
      announce('Your message has been sent');
    });
  });

  focusMain();
  updateBagCount();
}

function renderShipping(){
  app.innerHTML = `
    <div class="wrap static-page">

      <section class="static-hero">
        <div class="eyebrow">WAEZ / Shipping</div>
        <h1>Shipping & Delivery.</h1>
        <p class="static-lead">
          We deliver WAEZ orders across Bangladesh.
          Here's everything you need to know before placing your order.
        </p>
      </section>

      <section class="policy-grid">

        <article class="policy-card">
          <span class="policy-number">01</span>
          <div class="eyebrow">Dhaka</div>
          <h2>Inside Dhaka</h2>
          <p>
            Delivery usually takes
            <strong>2\u20133 business days</strong>
            after your order is confirmed.
          </p>
        </article>

        <article class="policy-card">
          <span class="policy-number">02</span>
          <div class="eyebrow">Bangladesh</div>
          <h2>Outside Dhaka</h2>
          <p>
            Delivery usually takes
            <strong>3\u20135 business days</strong>
            after your order is confirmed.
          </p>
        </article>

        <article class="policy-card">
          <span class="policy-number">03</span>
          <div class="eyebrow">Shipping Charge</div>
          <h2>BDT 120</h2>
          <p>
            Standard delivery is BDT 120.
            Orders above BDT 3,000 qualify for free shipping.
          </p>
        </article>

        <article class="policy-card">
          <span class="policy-number">04</span>
          <div class="eyebrow">Processing</div>
          <h2>2 Business Days</h2>
          <p>
            Orders are normally dispatched within
            2 business days after confirmation.
          </p>
        </article>

      </section>

      <section class="policy-note">
        <div class="eyebrow">Please Note</div>
        <h2>Delivery times are estimates.</h2>
        <p>
          Delivery may take a little longer during campaigns,
          public holidays, weekends or periods of unusually high
          order volume.
        </p>
      </section>

    </div>
  `;

  focusMain();
  updateBagCount();
}

function renderReturns(){
  app.innerHTML = `
    <div class="wrap static-page">

      <section class="static-hero">
        <div class="eyebrow">WAEZ / Returns</div>
        <h1>Returns & Exchanges.</h1>
        <p class="static-lead">
          We want you to feel right about what you order.
          If something isn't right, here's how our return policy works.
        </p>
      </section>

      <section class="return-steps">

        <article class="return-step">
          <span>01</span>
          <div>
            <div class="eyebrow">14 Days</div>
            <h2>Return Window</h2>
            <p>
              Return requests must be made within
              <strong>14 days of delivery</strong>.
            </p>
          </div>
        </article>

        <article class="return-step">
          <span>02</span>
          <div>
            <div class="eyebrow">Condition</div>
            <h2>Keep It Unworn</h2>
            <p>
              Items must be unworn, unused and returned with
              the original tags attached.
            </p>
          </div>
        </article>

        <article class="return-step">
          <span>03</span>
          <div>
            <div class="eyebrow">Contact</div>
            <h2>Start A Return</h2>
            <p>
              Contact us with your order number and reason
              for the return before sending anything back.
            </p>
          </div>
        </article>

        <article class="return-step">
          <span>04</span>
          <div>
            <div class="eyebrow">Approval</div>
            <h2>We\u2019ll Guide You</h2>
            <p>
              Once your request is reviewed, we'll provide
              the next steps for returning the item.
            </p>
          </div>
        </article>

      </section>

      <section class="policy-note">
        <div class="eyebrow">Not Eligible</div>
        <h2>Items that have been worn or washed.</h2>
        <p>
          Items showing signs of wear, washing, damage or missing
          original tags may not qualify for return.
        </p>
      </section>

      <section class="policy-contact">
        <div>
          <div class="eyebrow">Need Help?</div>
          <h2>Still have a question?</h2>
        </div>

        <a href="#/contact" class="btn">
          Contact Us
        </a>
      </section>

    </div>
  `;

  focusMain();
  updateBagCount();
}

function renderSizeGuide(){
  app.innerHTML = `
    <div class="wrap static-page">

      <section class="static-hero">
        <div class="eyebrow">WAEZ / Size Guide</div>
        <h1>Find Your Fit.</h1>
        <p class="static-lead">
          Use the measurements below as a guide when choosing
          your WAEZ size.
        </p>
      </section>

      <section class="size-guide-section">

        <div class="size-table-wrap">

          <table class="size-guide-table">

            <caption>
              Measurements are in inches.
            </caption>

            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col">Chest</th>
                <th scope="col">Length</th>
                <th scope="col">Shoulder</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">S</th>
                <td>40"</td>
                <td>27"</td>
                <td>17"</td>
              </tr>

              <tr>
                <th scope="row">M</th>
                <td>42"</td>
                <td>28"</td>
                <td>18"</td>
              </tr>

              <tr>
                <th scope="row">L</th>
                <td>44"</td>
                <td>29"</td>
                <td>19"</td>
              </tr>

              <tr>
                <th scope="row">XL</th>
                <td>46"</td>
                <td>30"</td>
                <td>20"</td>
              </tr>
            </tbody>

          </table>

        </div>

        <div class="size-guide-help">

          <div>
            <div class="eyebrow">Between Sizes?</div>
            <h2>Go one size up for a more relaxed fit.</h2>
            <p>
              If you're between two sizes, we recommend choosing
              the larger size for a more relaxed everyday fit.
            </p>
          </div>

          <a href="#/contact" class="btn ghost">
            Need Help?
          </a>

        </div>

      </section>

    </div>
  `;

  focusMain();
  updateBagCount();
}

function renderCart(preserveFocus){
  const lines = cartLines();
  if(!lines.length){
    app.innerHTML = `
      <div class="wrap">
        <div class="empty-cart">
          <div class="state-icon" aria-hidden="true">\u2014</div>
          <h2>Your bag is empty</h2>
          <p>Everything you add will show up here.</p>
          <a href="#/shop" class="btn">Continue Shopping</a>
        </div>
      </div>`;
    focusMain();
    updateBagCount();
    return;
  }

  const subtotal = lines.reduce((s,l)=>s + l.product.price * l.item.qty, 0);
  const shipping = subtotal > FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  app.innerHTML = `
    <div class="wrap">
      <div class="page-strip"><h1>Your Bag</h1><span class="count">${lines.length} item${lines.length!==1?'s':''}</span></div>
      <div class="cart-layout">
        <div id="cartItems">
          ${lines.map((l,idx)=>`
            <div class="cart-item" data-idx="${idx}">
              <div class="thumb" style="background:${l.product.bg}">${garmentSVG(l.product.shape, '#141311')}</div>
              <div>
                <div class="ci-name">${escapeHTML(l.product.name)}</div>
                <div class="ci-meta">${escapeHTML(cartColorName(l.product, l.item.color))} / ${escapeHTML(l.item.size)}</div>
                <div class="ci-price">${BDT(l.product.price)}</div>
              </div>
              <div class="ci-actions">
                <div class="qty-stepper">
                  <button type="button" class="dec" aria-label="Decrease quantity of ${escapeHTML(l.product.name)}" ${l.item.qty<=1?'disabled':''}>&minus;</button>
                  <span aria-live="polite">${l.item.qty}</span>
                  <button type="button" class="inc" aria-label="Increase quantity of ${escapeHTML(l.product.name)}" ${l.item.qty>=9?'disabled':''}>+</button>
                </div>
                <button type="button" class="remove-link" data-remove="${idx}">Remove</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="summary-box">
          <h3>Order Summary</h3>
          ${shippingProgressHTML(subtotal)}
          <div class="summary-row"><span>Subtotal</span><span>${BDT(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : BDT(shipping)}</span></div>
          <form id="promoForm" class="promo">
            <label class="visually-hidden" for="promoInput">Promo code</label>
            <input type="text" id="promoInput" placeholder="Promo code">
            <button type="submit">Apply</button>
          </form>
          <p class="promo-msg" id="promoMsg" role="status" aria-live="polite"></p>
          <div class="summary-row total"><span>Total</span><span>${BDT(total)}</span></div>
          <a href="#/checkout" class="btn block" style="margin-top:22px;">Checkout</a>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.cart-item').forEach(row=>{
    const idx = +row.getAttribute('data-idx');
    row.querySelector('.inc').addEventListener('click', ()=>{
      CART[idx].qty = Math.min(9, CART[idx].qty+1);
      renderCart(true);
    });
    row.querySelector('.dec').addEventListener('click', ()=>{
      CART[idx].qty = Math.max(1, CART[idx].qty-1);
      renderCart(true);
    });
  });
  document.querySelectorAll('[data-remove]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const removed = CART.splice(+el.getAttribute('data-remove'), 1)[0];
      renderCart(true);
      if(removed) announce('Item removed from bag');
    });
  });
  document.getElementById('promoForm').addEventListener('submit', e=>{
    e.preventDefault();
    const val = document.getElementById('promoInput').value.trim();
    const msg = document.getElementById('promoMsg');
    if(!val){ msg.textContent = 'Enter a promo code.'; msg.className = 'promo-msg error'; return; }
    msg.textContent = `"${val}" is not a valid code.`;
    msg.className = 'promo-msg error';
  });

  updateBagCount();
  if(!preserveFocus) focusMain();
}

function renderCheckout(){
  const lines = cartLines();
  if(!lines.length){ location.hash = '#/cart'; return; }
  const subtotal = lines.reduce((s,l)=>s + l.product.price * l.item.qty, 0);
  const shipping = subtotal > FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;
  let payMethod = 'card';

  app.innerHTML = `
    <div class="wrap">
      <div class="page-strip"><h1>Checkout</h1><span class="count">${lines.length} item${lines.length!==1?'s':''}</span></div>


      <div class="checkout-layout">
        <form id="checkoutForm" novalidate>
          <div class="checkout-error" id="checkoutError" role="alert"></div>

          <fieldset>
            <legend>Contact</legend>
            <div class="field-row">
              <div class="field full">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="you@example.com" autocomplete="email">
                <span class="field-error" data-error-for="email"></span>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Shipping Address</legend>
            <div class="field-row">
              <div class="field">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required autocomplete="given-name">
                <span class="field-error" data-error-for="firstName"></span>
              </div>
              <div class="field">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" required autocomplete="family-name">
                <span class="field-error" data-error-for="lastName"></span>
              </div>
            </div>
            <div class="field-row">
              <div class="field full">
                <label for="address">Address</label>
                <input type="text" id="address" name="address" required placeholder="House, Road, Area" autocomplete="street-address">
                <span class="field-error" data-error-for="address"></span>
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label for="city">City</label>
                <input type="text" id="city" name="city" required value="Chattogram" autocomplete="address-level2">
                <span class="field-error" data-error-for="city"></span>
              </div>
              <div class="field">
                <label for="postal">Postal Code</label>
                <input type="text" id="postal" name="postal" required autocomplete="postal-code">
                <span class="field-error" data-error-for="postal"></span>
              </div>
            </div>
            <div class="field-row">
              <div class="field full">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required placeholder="+880" autocomplete="tel">
                <span class="field-error" data-error-for="phone"></span>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <div class="pay-methods" role="group" aria-label="Payment method">
              <button type="button" class="pay-method" data-pay="card" aria-pressed="true">Card</button>
              <button type="button" class="pay-method" data-pay="bkash" aria-pressed="false">bKash</button>
              <button type="button" class="pay-method" data-pay="cod" aria-pressed="false">Cash on Delivery</button>
            </div>
            <div id="cardFields">
              <div class="field-row">
                <div class="field full">
                  <label for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" autocomplete="cc-number" required>
                  <span class="field-error" data-error-for="cardNumber"></span>
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="expiry">Expiry</label>
                  <input type="text" id="expiry" name="expiry" placeholder="MM / YY" autocomplete="cc-exp">
                </div>
                <div class="field">
                  <label for="cvc">CVC</label>
                  <input type="text" id="cvc" name="cvc" placeholder="123" autocomplete="cc-csc">
                </div>
              </div>
            </div>
          </fieldset>

          <button type="submit" class="btn block" id="placeOrderBtn">
            <span class="spinner" aria-hidden="true"></span>
            <span class="btn-label">Place Order &mdash; ${BDT(total)}</span>
          </button>
        </form>

        <div class="co-summary">
          <div class="co-summary-head">
            <h3>Order Summary</h3>
            <a href="#/cart" class="size-guide-link">Edit Bag</a>
          </div>
          ${lines.map(l=>`
            <div class="co-line-item">
              <div class="thumb" style="background:${l.product.bg}">${garmentSVG(l.product.shape, '#141311')}</div>
              <div class="info">
                <div class="n">${escapeHTML(l.product.name)}</div>
                <div class="m">${escapeHTML(cartColorName(l.product, l.item.color))} &middot; Size ${escapeHTML(l.item.size)} &middot; Qty ${l.item.qty}</div>
              </div>
              <div class="p">${BDT(l.product.price * l.item.qty)}</div>
            </div>
          `).join('')}
          <div class="summary-row" style="margin-top:14px;"><span>Subtotal</span><span>${BDT(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping===0?'Free':BDT(shipping)}</span></div>
          <div class="summary-row total"><span>Total</span><span>${BDT(total)}</span></div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.pay-method').forEach(pm=>{
    pm.addEventListener('click', ()=>{
      document.querySelectorAll('.pay-method').forEach(x=>x.setAttribute('aria-pressed','false'));
      pm.setAttribute('aria-pressed','true');
      payMethod = pm.getAttribute('data-pay');
      document.getElementById('cardFields').style.display = payMethod === 'card' ? 'block' : 'none';
      const cardNumberInput = document.getElementById('cardNumber');
      cardNumberInput.required = payMethod === 'card';
      if(payMethod !== 'card'){
        form.querySelector('[data-error-for="cardNumber"]').textContent = '';
      }
    });
  });

  const form = document.getElementById('checkoutForm');
  form.querySelectorAll('input[required]').forEach(input=>{
    input.addEventListener('blur', ()=>{ input.setAttribute('data-touched','true'); validateField(input); });
  });

  function validateField(input){
    const errEl = form.querySelector(`[data-error-for="${input.id}"]`);
    if(!errEl) return true;
    if(!input.checkValidity()){
      errEl.textContent = input.validity.valueMissing ? 'This field is required.' : 'Please enter a valid value.';
      return false;
    }
    errEl.textContent = '';
    return true;
  }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const requiredInputs = Array.from(form.querySelectorAll('input[required]'));
    let allValid = true;
    requiredInputs.forEach(input=>{
      input.setAttribute('data-touched','true');
      if(!validateField(input)) allValid = false;
    });

    const errorBanner = document.getElementById('checkoutError');
    if(!allValid){
      errorBanner.textContent = 'Please fix the highlighted fields before placing your order.';
      errorBanner.classList.add('show');
      requiredInputs.find(i=>!i.checkValidity())?.focus();
      return;
    }
    errorBanner.classList.remove('show');

    const submitBtn = document.getElementById('placeOrderBtn');
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    fakeFetch(true, {delay:900})
      .then(()=>{
        CART.length = 0;
        location.hash = '#/order-confirmed';
      })
      .catch(()=>{
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        errorBanner.textContent = 'We could not process your order. Please try again.';
        errorBanner.classList.add('show');
      });
  });

  focusMain();
  updateBagCount();
}

function renderConfirm(){
  const oid = 'WAEZ-' + Math.floor(100000 + Math.random()*900000);
  app.innerHTML = `
    <div class="wrap">
      <div class="confirm-screen">
        <div class="mark" aria-hidden="true">&#10003;</div>
        <h1>Order Confirmed</h1>
        <p>Thank you &mdash; your order has been placed successfully.</p>
        <div class="oid">Order ${oid}</div>
        <a href="#/shop" class="btn">Continue Shopping</a>
      </div>
    </div>
  `;
  announce('Order confirmed');
  focusMain();
  updateBagCount();
}

function renderNotFound(){
  app.innerHTML = `
    <div class="wrap">
      <div class="empty-state-page">
        ${emptyState({icon:'?', title:'Page not found', body:'The page you are looking for does not exist or has moved.'})}
        <a href="#/" class="btn" style="margin-top:8px;">Back to Home</a>
      </div>
    </div>`;
  focusMain();
  updateBagCount();
}

function wireNewsletterForm(formId, inputId, msgId){
  const form = document.getElementById(formId);
  if(!form || form.dataset.wired) return;
  form.dataset.wired = 'true';
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const input = document.getElementById(inputId);
    const msg = document.getElementById(msgId);
    if(!input.checkValidity()){
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'form-msg error';
      input.focus();
      return;
    }
    msg.textContent = `Thanks \u2014 we'll send drops to ${input.value}.`;
    msg.className = 'form-msg success';
    input.value = '';
  });
}

wireNewsletterForm('newsletterForm', 'newsletterEmail', 'newsletterMsg');
document.getElementById('year').textContent = new Date().getFullYear();
