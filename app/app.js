/* DigitNotes 2.0 – aplikacija (brez zunanjih knjižnic) */
'use strict';
const API = (window.DN_API || '').replace(/\/$/, '');
const SITE = '../';
const VER = '2.1.0';

// ============================================================ ikone
const P = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M20 17v4H6.5A2.5 2.5 0 0 1 4 18.5"/>',
  spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  star: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.9 17 22l-5-3-5 3 1.5-8.1"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>', l: '<path d="m15 18-6-6 6-6"/>', r: '<path d="m9 18 6-6-6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="M20 6 9 17l-5-5"/>', edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash: '<path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>', up: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  pdf: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 18h4"/>',
  cam: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  img: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>', user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>', swap: '<path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', alert: '<path d="m10.3 3.9-8.5 14.7A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.4L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>', chart: '<path d="M3 3v18h18"/><path d="M7 16v-5M12 16V8M17 16v-3"/>',
  u_cup: '<path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 2v2M10 2v2M14 2v2"/>', u_flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.4.5 1.4 2 2.4 2.5 2.9z"/>',
  u_note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>', u_okc: '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>', u_ban: '<circle cx="12" cy="12" r="10"/><path d="m5 5 14 14"/>',
  u_chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>', u_cards: '<rect x="3" y="6" width="14" height="15" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>', u_quiz: '<path d="M9 11l2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="3"/>', u_sum: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  u_pin: '<path d="M12 17v5M9 3h6l-1 6 4 4H6l4-4z"/>', u_hw: '<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>', u_mailo: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/>', u_palm: '<path d="M12 22V11M12 11c-2-4-6-5-9-4 3 0 6 2 7 5M12 11c2-4 6-5 9-4-3 0-6 2-7 5M12 11c0-4-2-7-5-8 2 2 3 5 3 8M12 11c0-4 2-7 5-8-2 2-3 5-3 8"/>',
  s_ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>', s_calc: '<rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M8.5 6h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18.5h.01M12 18.5h.01M15.5 18.5h.01"/>', s_sigma: '<path d="M18 4H6l6 8-6 8h12"/>',
  s_book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>', s_pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>', s_lang: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
  s_flask: '<path d="M9 2h6M10 2v6.5L4.3 18.6A2.3 2.3 0 0 0 6.3 22h11.4a2.3 2.3 0 0 0 2-3.4L14 8.5V2"/><path d="M7 15h10"/>', s_atom: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  s_dna: '<path d="M7 2c0 6 10 8 10 14v6M17 2c0 6-10 8-10 14v6M8.5 6h7M8.5 18h7M10 10h4M10 14h4"/>', s_leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 6-10 16-10 0 10-4 16-9 17z"/><path d="M4 21c4-6 8-9 12-11"/>', s_globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  s_map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>', s_hist: '<path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10l10-7 10 7z"/>', s_brush: '<path d="M18.4 2.6a2 2 0 0 1 3 3L12 15l-3-3z"/><path d="M9 12c-3 0-4 2-4 4s-1 3-3 4c3 1 8 1 9-3 .4-1.4 0-3-2-5z"/>',
  s_music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>', s_sport: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>', s_laptop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>', s_code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
  s_gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>', s_heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>', s_mask: '<path d="M2 4h20v6a10 10 0 0 1-20 0z"/><path d="M8 9h.01M16 9h.01M8 14s1.5 2 4 2 4-2 4-2"/>',
  s_coins: '<circle cx="9" cy="9" r="6"/><path d="M15.4 4.6A6 6 0 1 1 9.6 15.4M9 6.5v5M7 9h4"/>', s_chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/>', s_planet: '<circle cx="12" cy="12" r="5"/><path d="M5.6 15.5C3 17.6 2.3 19.4 3.2 20s3.4-.3 6.8-2.6M18.4 8.5C21 6.4 21.7 4.6 20.8 4s-3.4.3-6.8 2.6"/>',
  s_cam: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>', s_brain: '<path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5A3 3 0 0 0 4 8a3 3 0 0 0 .5 5A3 3 0 0 0 7 18a3 3 0 0 0 5 1V4.5A2.5 2.5 0 0 0 9.5 2zM14.5 2A2.5 2.5 0 0 1 17 4.5v.5a3 3 0 0 1 3 3 3 3 0 0 1-.5 5A3 3 0 0 1 17 18a3 3 0 0 1-5 1"/>',
  s_star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6M12 2v3"/>', mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>', globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>', vol: '<path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>', copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', rot: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>', crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2"/>', play: '<path d="m6 4 14 8-14 8z"/>', pause: '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>', stop: '<rect x="5" y="5" width="14" height="14" rx="2"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.7-4 3-9 3s-9-1.3-9-3M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/>', more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>'
};
const ic = (n, c = 'ic') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[n] || ''}</svg>`;

// ============================================================ pomočniki
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const pd = s => new Date(s + 'T00:00:00');
const addD = (s, n) => { const d = pd(s); d.setDate(d.getDate() + n); return iso(d); };
const today = () => iso(new Date());
const wdOf = s => (pd(s).getDay() + 6) % 7;
const fmtD = s => pd(s).toLocaleDateString('sl-SI', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtS = s => pd(s).toLocaleDateString('sl-SI', { day: 'numeric', month: 'numeric' });
const fmtT = t => new Date(t).toLocaleString('sl-SI', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const DAYS = ['Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek'];
const nodia = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
const isApp = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const DT = { 1: ['07:10', '07:55'], 2: ['08:00', '08:45'], 3: ['08:50', '09:35'], 4: ['09:40', '10:25'], 5: ['10:30', '11:15'], 6: ['11:20', '12:05'], 7: ['12:10', '12:55'], 8: ['13:00', '13:45'], 9: ['13:50', '14:35'] };
const toMin = x => +x.slice(0, 2) * 60 + +x.slice(3, 5);
const pl = (n, a, b, c, d) => `${n} ${n % 100 === 1 ? a : n % 100 === 2 ? b : (n % 100 === 3 || n % 100 === 4) ? c : d}`;
const nphoto = n => pl(n, 'fotografija', 'fotografiji', 'fotografije', 'fotografij');
const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };

function toast(m, err) { const t = document.createElement('div'); t.className = 'toast' + (err ? ' err' : ''); t.textContent = m; $('toasts').appendChild(t); setTimeout(() => t.remove(), 3800); }
let MODAL_CLOSE = null;
function modal(html, opt = {}) { const m = $('modal'); m.innerHTML = `<div class="sheet ${opt.wide ? 'wide' : ''}" role="dialog" aria-modal="true">${html}</div>`; m.classList.remove('hide'); MODAL_CLOSE = opt.onClose || null; const f = m.querySelector('[autofocus]'); if (f) setTimeout(() => f.focus(), 50); }
function closeModal() { $('modal').classList.add('hide'); $('modal').innerHTML = ''; const f = MODAL_CLOSE; MODAL_CLOSE = null; if (f) f(); }
const sheetHead = (title, sub = '', icon = '') => `<div class="sheet-h">${icon}<div><h3>${title}</h3>${sub ? `<p class="mut sm">${sub}</p>` : ''}</div><button class="btn btn-s btn-i x" data-a="closeModal" aria-label="Zapri">${ic('x')}</button></div>`;
let _cf = null;
function confirmBox(msg, fn, label = 'Potrdi', danger = true) { _cf = fn; modal(`<div class="row" style="align-items:flex-start;margin-bottom:18px"><span style="color:#f59e0b">${ic('alert', 'ic-l')}</span><p>${msg}</p></div><div class="row" style="justify-content:flex-end"><button class="btn btn-s" data-a="closeModal">Prekliči</button><button class="btn ${danger ? 'btn-d' : 'btn-p'}" data-a="cfOk">${label}</button></div>`); }

// ============================================================ API
const TOKEN_KEY = 'dn2_t';
let TOK = localStorage.getItem(TOKEN_KEY) || '';
async function api(path, body, raw) {
  if (!API) throw new Error('Strežnik ni nastavljen (config.js).');
  let r;
  try { r = await fetch(API + path, { method: body !== undefined ? 'POST' : 'GET', headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(TOK ? { Authorization: 'Bearer ' + TOK } : {}) }, body: body !== undefined ? JSON.stringify(body) : undefined }); }
  catch { throw new Error('Ni povezave s strežnikom. Preveri internet.'); }
  if (raw && r.ok) return r;
  const j = await r.json().catch(() => ({}));
  if (r.status === 401 && TOK && !path.startsWith('/auth/')) { hardLogout(); throw new Error(j.error || 'Prijava je potekla.'); }
  if (r.status === 428) { await refreshMe(); throw new Error('__gate'); }
  if (!r.ok) throw new Error(j.error || 'Napaka (' + r.status + ')');
  return j;
}
// fotografije: varno nalaganje z žetonom → blob URL
const PHC = new Map(), PHQ = new Map();
function photoUrl(id, share) {
  const k = id + (share || '');
  if (PHC.has(k)) return Promise.resolve(PHC.get(k));
  if (PHQ.has(k)) return PHQ.get(k);
  const p = api('/photo?id=' + encodeURIComponent(id) + (share ? '&s=' + encodeURIComponent(share) : ''), undefined, true).then(r => r.blob()).then(b => { const u = URL.createObjectURL(b); PHC.set(k, u); PHQ.delete(k); return u; }).catch(e => { PHQ.delete(k); throw e; });
  PHQ.set(k, p); return p;
}
function hydrate(root = document) {
  root.querySelectorAll('img[data-pid]:not([src])').forEach(im => photoUrl(im.dataset.pid, im.dataset.s).then(u => { im.src = u; }).catch(() => { im.alt = '⚠'; }));
}
async function photoBytes(id, share) { const u = await photoUrl(id, share); return new Uint8Array(await (await fetch(u)).arrayBuffer()); }

// zmanjšanje fotografije (odstrani tudi metapodatke EXIF, npr. lokacijo)
function resize(file, max = 1600) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      URL.revokeObjectURL(url);
      const k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
      let q = .74, d = c.toDataURL('image/jpeg', q);
      while (d.length > 1_900_000 && q > .35) { q -= .1; d = c.toDataURL('image/jpeg', q); }
      res(d);
    };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('Slike ni mogoče prebrati.')); };
    im.src = url;
  });
}

// ============================================================ stanje
let U = null, CFG = {}, D = {}, A = { users: [], sent: [], stats: null };
let S = { view: 'home', date: today(), week: false, nb: null, tab: 'nb', ai: { nid: null, mode: 'chat', chat: null, msgs: [], busy: false }, adm: 'users' };
const SHARE = new URLSearchParams(location.search).get('share');

async function boot() {
  try { CFG = await fetch(API + '/config').then(r => r.json()); } catch { CFG = {}; }
  if (!API) return renderFatal('Strežnik ni nastavljen. V datoteki app/config.js vpiši naslov strežnika.');
  if (!TOK) return renderLogin();
  try { const r = await api('/me'); U = r.user; await afterLogin(); }
  catch (e) { if (e.message !== '__gate') renderLogin(); }
}
function renderFatal(m) { $('app').innerHTML = `<div class="auth"><div class="authbox"><div class="authlogo"><img src="../Logo.png" alt=""><b>DigitNotes</b></div><div class="notice o">${ic('alert')}<div>${esc(m)}</div></div></div></div>`; }
async function refreshMe() { try { const r = await fetch(API + '/me', { headers: { Authorization: 'Bearer ' + TOK } }); if (r.ok) { U = (await r.json()).user; gate(); } } catch { } }
function gate() { // vrne true, če je uporabnik ustavljen pred aplikacijo
  if (!U) { renderLogin(); return true; }
  if (U.role !== 'admin' && (!U.termsOk || U.status === 'onboard')) { renderOnboard(); return true; }
  if (U.role !== 'admin' && U.status === 'parent') { renderParentWait(); return true; }
  return false;
}
async function afterLogin() {
  if (gate()) return;
  if (U.role === 'admin') { S.view = 'admin'; await loadAdmin(); }
  else { await loadData(); const qv = new URLSearchParams(location.search).get('v'); S.view = SHARE ? 'shared' : ['sched', 'nbs', 'ai', 'grades'].includes(qv) ? qv : 'home'; pushSync(); startPolling(); }
  render();
  if (U.mustChange) pwForce();
  if (SHARE && U.role !== 'admin') openShared();
}
async function loadData() { const r = await api('/data'); U = r.user; D = r; D.lsMap = {}; (D.ls || []).forEach(l => D.lsMap[l.k] = l); }
function hardLogout() { TOK = ''; localStorage.removeItem(TOKEN_KEY); U = null; D = {}; PHC.forEach(u => URL.revokeObjectURL(u)); PHC.clear(); stopPolling(); renderLogin(); }
async function logout() { const sid = localStorage.getItem('dn2_push'); try { if (sid) await api('/push/unsub', { id: sid }); await api('/auth/logout', {}); } catch { } localStorage.removeItem('dn2_push'); try { const reg = await navigator.serviceWorker?.getRegistration(); const s = await reg?.pushManager?.getSubscription(); await s?.unsubscribe(); } catch { } hardLogout(); }

// ============================================================ PRIJAVA, POZABLJENO GESLO, REGISTRACIJA
let AUTH = { mode: 'login', email: '' };
function authShell(inner) {
  return `<div class="auth"><div class="authbox"><div class="authlogo"><img src="../Logo.png" alt="DigitNotes"><div><div class="h1" style="font-size:24px">DigitNotes</div><div class="mut sm">Vsi šolski zapiski na enem mestu</div></div></div>${CFG.maintenance ? `<div class="notice o" style="margin-bottom:14px">${ic('alert')}<div><b>Aplikacija je v prenovi.</b><br><span class="sm">Prijava je trenutno mogoča samo administratorju.</span></div></div>` : ''}${inner}</div>
  <div class="authfoot"><a href="${SITE}index.html">Domov</a> · <a href="${SITE}zasebnost.html">Zasebnost</a> · <a href="${SITE}pogoji.html">Pogoji uporabe</a></div></div>`;
}
function renderLogin(err) {
  const m = AUTH.mode; let h = '';
  if (m === 'login') h = `<form data-f="login">${err ? `<div class="err">${esc(err)}</div>` : ''}${SHARE ? '<div class="notice b sm" style="margin-bottom:14px">' + ic('share') + '<div>Za ogled deljenega zvezka se prijavi.</div></div>' : ''}
    <div class="field"><label class="lbl" for="lu">Uporabniško ime ali e-pošta</label><input id="lu" class="inp" autocomplete="username" autocapitalize="none" required autofocus></div>
    <div class="field"><label class="lbl" for="lp">Geslo</label><input id="lp" type="password" class="inp" autocomplete="current-password" required></div>
    <button class="btn btn-p btn-w" type="submit">Prijavi se</button>
    <div class="row" style="justify-content:space-between;margin-top:14px"><button type="button" class="linkbtn" data-a="authMode" data-m="forgot">Pozabljeno geslo?</button>${CFG.regOpen ? '<button type="button" class="linkbtn" data-a="authMode" data-m="reg">Ustvari račun</button>' : ''}</div></form>`;
  if (m === 'forgot') h = `<form data-f="forgot"><h2 class="h2" style="margin-top:0">Pozabljeno geslo</h2><p class="mut sm" style="margin-bottom:14px">Vpiši e-poštni naslov svojega računa. Poslali ti bomo enkratno kodo, ki velja 10 minut.</p>${err ? `<div class="err">${esc(err)}</div>` : ''}
    <div class="field"><label class="lbl" for="fe">E-pošta</label><input id="fe" type="email" class="inp" autocomplete="email" required autofocus value="${esc(AUTH.email)}"></div>
    <button class="btn btn-p btn-w" type="submit">Pošlji kodo</button><button type="button" class="btn btn-s btn-w" style="margin-top:8px" data-a="authMode" data-m="login">Nazaj na prijavo</button></form>`;
  if (m === 'code') h = `<form data-f="reset"><h2 class="h2" style="margin-top:0">Vpiši kodo</h2><p class="mut sm" style="margin-bottom:14px">Če račun s tem naslovom obstaja, smo na <b>${esc(AUTH.email)}</b> poslali 6-mestno kodo. Preveri tudi mapo z neželeno pošto.</p>${err ? `<div class="err">${esc(err)}</div>` : ''}
    <div class="field"><label class="lbl" for="rc">Koda</label><input id="rc" class="inp code" inputmode="numeric" maxlength="6" autocomplete="one-time-code" required autofocus></div>
    <div class="field"><label class="lbl" for="rp">Novo geslo</label><input id="rp" type="password" class="inp" minlength="8" autocomplete="new-password" required><p class="hint">Vsaj 8 znakov. Geslo velja takoj.</p></div>
    <button class="btn btn-p btn-w" type="submit">Nastavi geslo</button><button type="button" class="btn btn-s btn-w" style="margin-top:8px" data-a="authMode" data-m="forgot">Pošlji novo kodo</button></form>`;
  if (m === 'reg') h = `<form data-f="reg"><h2 class="h2" style="margin-top:0">Nov račun</h2>${err ? `<div class="err">${esc(err)}</div>` : ''}
    <div class="field"><label class="lbl" for="gn">Ime in priimek</label><input id="gn" class="inp" autocomplete="name" required autofocus></div>
    <div class="field"><label class="lbl" for="gu">Uporabniško ime</label><input id="gu" class="inp" autocapitalize="none" pattern="[A-Za-z0-9._-]{3,30}" required></div>
    <div class="field"><label class="lbl" for="ge">E-pošta</label><input id="ge" type="email" class="inp" autocomplete="email" required></div>
    <div class="field"><label class="lbl" for="gp">Geslo</label><input id="gp" type="password" class="inp" minlength="8" autocomplete="new-password" required><p class="hint">Vsaj 8 znakov.</p></div>
    <p class="hint" style="margin-bottom:12px">Po potrditvi e-pošte boš vpisal še mesec in leto rojstva. Če si mlajši od 15 let, bomo prosili za privolitev starša.</p>
    <button class="btn btn-p btn-w" type="submit">Pošlji potrditveno kodo</button><button type="button" class="btn btn-s btn-w" style="margin-top:8px" data-a="authMode" data-m="login">Že imam račun</button></form>`;
  if (m === 'regcode') h = `<form data-f="regcode"><h2 class="h2" style="margin-top:0">Potrdi e-pošto</h2><p class="mut sm" style="margin-bottom:14px">Na <b>${esc(AUTH.email)}</b> smo poslali 6-mestno kodo.</p>${err ? `<div class="err">${esc(err)}</div>` : ''}
    <div class="field"><input id="gc" class="inp code" inputmode="numeric" maxlength="6" autocomplete="one-time-code" required autofocus></div><button class="btn btn-p btn-w" type="submit">Potrdi</button></form>`;
  $('app').innerHTML = authShell(h);
}
const FORMS = {
  async login() {
    const b = document.querySelector('[data-f=login] button[type=submit]'); b.disabled = true;
    try { const r = await api('/auth/login', { login: $('lu').value.trim(), password: $('lp').value }); TOK = r.token; localStorage.setItem(TOKEN_KEY, TOK); U = r.user; await afterLogin(); }
    catch (e) { if (e.message !== '__gate') renderLogin(e.message); }
  },
  async forgot() { AUTH.email = $('fe').value.trim(); try { await api('/auth/reset/request', { email: AUTH.email }); AUTH.mode = 'code'; renderLogin(); } catch (e) { renderLogin(e.message); } },
  async reset() { try { await api('/auth/reset/confirm', { email: AUTH.email, code: $('rc').value, password: $('rp').value }); AUTH.mode = 'login'; renderLogin(); toast('Geslo je nastavljeno. Prijavi se.'); } catch (e) { renderLogin(e.message); } },
  async reg() { AUTH.email = $('ge').value.trim(); try { await api('/auth/register/request', { name: $('gn').value, username: $('gu').value.trim(), email: AUTH.email, password: $('gp').value }); AUTH.mode = 'regcode'; renderLogin(); } catch (e) { renderLogin(e.message); } },
  async regcode() { try { const r = await api('/auth/register/confirm', { email: AUTH.email, code: $('gc').value }); TOK = r.token; localStorage.setItem(TOKEN_KEY, TOK); U = r.user; await afterLogin(); } catch (e) { if (e.message !== '__gate') renderLogin(e.message); } },
  async onboard() {
    const y = $('ob_y').value, m = $('ob_m').value, acc = $('ob_a').checked;
    try { const r = await api('/me/onboard', { accept: acc, birthYm: y && m ? `${y}-${m}` : '', parentEmail: $('ob_p')?.value.trim() }); U = r.user; await afterLogin(); }
    catch (e) { if (e.message !== '__gate') { const er = $('ob_err'); er.textContent = e.message; er.classList.remove('hide'); } }
  },
  async pwforce() {
    const a = $('fp_n').value, b = $('fp_r').value;
    if (a.length < 8) return toast('Geslo mora imeti vsaj 8 znakov.', true); if (a !== b) return toast('Gesli se ne ujemata.', true);
    try { await api('/me/password', { password: a }); U.mustChange = false; closeModal(); toast('Geslo je nastavljeno.'); } catch (e) { toast(e.message, true); }
  }
};

// ---- privolitev ob prvi prijavi (GDPR, ZVOP-2 čl. 8)
function ageFrom(y, m) { const n = new Date(); let a = n.getFullYear() - y; if (n.getMonth() + 1 <= m) a--; return a; }
function renderOnboard() {
  const yNow = new Date().getFullYear(), ys = []; for (let y = yNow - 6; y >= yNow - 70; y--) ys.push(y);
  const months = ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december'];
  const upd = U.termsOk === false && U.status === 'active';
  $('app').innerHTML = authShell(`<form data-f="onboard">
    <h2 class="h2" style="margin-top:0">${upd ? 'Posodobljeni pogoji' : `Dobrodošel, ${esc((U.name || '').split(' ')[0])}!`}</h2>
    <p class="mut sm" style="margin-bottom:14px">${upd ? 'Pogoji uporabe ali politika zasebnosti so se spremenili. Preberi jih in jih potrdi za nadaljnjo uporabo.' : 'Preden začneš, potrebujemo nekaj tvojih potrditev. Tvoje podatke obdelujemo samo za delovanje aplikacije.'}</p>
    <div class="field"><label class="lbl">Mesec in leto rojstva</label><div class="row"><select id="ob_m" class="inp" data-c="obAge"><option value="">Mesec</option>${months.map((x, i) => `<option value="${String(i + 1).padStart(2, '0')}" ${U.birthYm && +U.birthYm.slice(5) === i + 1 ? 'selected' : ''}>${x}</option>`).join('')}</select><select id="ob_y" class="inp" data-c="obAge"><option value="">Leto</option>${ys.map(y => `<option ${U.birthYm && +U.birthYm.slice(0, 4) === y ? 'selected' : ''}>${y}</option>`).join('')}</select></div>
    <p class="hint">Potrebujemo samo za preverjanje, ali je potrebna privolitev staršev (zakonska starost je 15 let).</p></div>
    <div id="ob_parent" class="hide"><div class="notice b sm" style="margin-bottom:10px">${ic('info')}<div>Ker si mlajši od 15 let, mora uporabo odobriti eden od staršev ali skrbnik. Poslali mu bomo e-pošto s pojasnilom. Do potrditve aplikacije še ne moreš uporabljati.</div></div>
      <div class="field"><label class="lbl" for="ob_p">E-pošta starša ali skrbnika</label><input id="ob_p" type="email" class="inp" autocomplete="off"></div></div>
    <label class="chk" style="margin:6px 0 16px"><input type="checkbox" id="ob_a"><span>Prebral sem in se strinjam s <a href="${SITE}pogoji.html" target="_blank" rel="noopener">pogoji uporabe</a> ter <a href="${SITE}zasebnost.html" target="_blank" rel="noopener">politiko zasebnosti</a>.</span></label>
    <div id="ob_err" class="err hide"></div>
    <button class="btn btn-p btn-w" type="submit">Nadaljuj</button>
    <button type="button" class="btn btn-s btn-w" style="margin-top:8px" data-a="logout">Odjava</button></form>`);
  CHANGE.obAge();
}
function renderParentWait() {
  $('app').innerHTML = authShell(`<div style="text-align:center">${tile('u_mailo', 214, 85, 'xl')}<h2 class="h2" style="justify-content:center">Čakamo na privolitev starša</h2>
    <p class="mut sm">Na <b>${esc(U.parentEmail || '')}</b> smo poslali prošnjo za privolitev. Ko jo starš potrdi, lahko začneš uporabljati DigitNotes.</p>
    <p class="mut xs" style="margin:10px 0 18px">Če privolitev ne bo dana v 14 dneh, se račun samodejno izbriše.</p>
    <button class="btn btn-p btn-w" data-a="parentCheck">Preveri znova</button>
    <button class="btn btn-s btn-w" style="margin-top:8px" data-a="parentResend">Pošlji prošnjo še enkrat</button>
    <button class="btn btn-s btn-w" style="margin-top:8px" data-a="logout">Odjava</button></div>`);
}
function pwForce() {
  modal(`<form data-f="pwforce">${sheetHead('Nastavi svoje geslo', 'Prijavil si se z začasnim geslom. Izberi novo geslo, ki ga poznaš samo ti.', `<span style="color:var(--g600)">${ic('lock', 'ic-l')}</span>`).replace('data-a="closeModal"', 'data-a="logout"')}
    <div class="field"><label class="lbl" for="fp_n">Novo geslo (vsaj 8 znakov)</label><input id="fp_n" type="password" class="inp" autocomplete="new-password" autofocus></div>
    <div class="field"><label class="lbl" for="fp_r">Ponovi geslo</label><input id="fp_r" type="password" class="inp" autocomplete="new-password"></div>
    <button class="btn btn-p btn-w" type="submit">Shrani geslo</button></form>`);
}


// ---- predmetne ikone (sodobne ikone v barvnih ploščicah; stari emojiji se samodejno preslikajo)
const SUBJ = ['ruler', 'calc', 'sigma', 'book', 'pen', 'lang', 'flask', 'atom', 'dna', 'leaf', 'globe', 'map', 'hist', 'brush', 'music', 'sport', 'laptop', 'code', 'gear', 'heart', 'mask', 'coins', 'chart', 'planet', 'cam', 'brain', 'star'];
const SUBJ_C = { ruler: 2, calc: 3, sigma: 3, book: 6, pen: 8, lang: 4, flask: 1, atom: 3, dna: 5, leaf: 0, globe: 1, map: 7, hist: 8, brush: 5, music: 4, sport: 7, laptop: 9, code: 9, gear: 9, heart: 6, mask: 5, coins: 8, chart: 2, planet: 3, cam: 9, brain: 4, star: 8 };
const HUES = [[152, 62], [174, 70], [214, 85], [238, 72], [268, 70], [330, 75], [355, 78], [22, 88], [40, 90], [215, 20]];
const EMO2IC = { '📐': 'ruler', '📏': 'ruler', '🧮': 'calc', '🔢': 'calc', '➗': 'sigma', '📖': 'book', '📚': 'book', '📓': 'book', '📒': 'book', '📕': 'book', '📗': 'book', '📘': 'book', '📙': 'book', '✏️': 'pen', '📝': 'pen', '🇬🇧': 'lang', '🇩🇪': 'lang', '🇫🇷': 'lang', '🇮🇹': 'lang', '🇪🇸': 'lang', '🇸🇮': 'lang', '🗣️': 'lang', '🧪': 'flask', '⚗️': 'flask', '🔬': 'atom', '🧬': 'dna', '🌱': 'leaf', '🌿': 'leaf', '🐾': 'leaf', '🌍': 'globe', '🌎': 'globe', '🌏': 'globe', '🌋': 'globe', '🗺️': 'map', '🧭': 'map', '🏛️': 'hist', '📜': 'hist', '⚔️': 'hist', '🏺': 'hist', '🎨': 'brush', '🖌️': 'brush', '🎵': 'music', '🎹': 'music', '🎸': 'music', '🎻': 'music', '⚽': 'sport', '🏃': 'sport', '🏀': 'sport', '🏐': 'sport', '🤸': 'sport', '💻': 'laptop', '🖥️': 'laptop', '🤖': 'code', '⚙️': 'gear', '🔧': 'gear', '🔨': 'gear', '🔌': 'gear', '❤️': 'heart', '🩺': 'heart', '🎭': 'mask', '🎬': 'mask', '💰': 'coins', '📊': 'chart', '🔭': 'planet', '🪐': 'planet', '📷': 'cam', '🧠': 'brain', '⭐': 'star' };
const hashC = t => { let h = 0; for (const c of String(t || '')) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 9; };
function subjOf(n) {
  const e = String(n?.emoji || ''), m = /^i:([a-z]+):(\d)$/.exec(e);
  if (m && SUBJ.includes(m[1])) return { i: m[1], c: +m[2] };
  const k = EMO2IC[e] || EMO2IC[e.replace(/️/g, '')];
  if (k) return { i: k, c: SUBJ_C[k] };
  if (!e) return { i: 'book', c: hashC(n?.id || n?.name) };
  return { e, c: hashC(n?.id || n?.name) };
}
function sIc(n, size = '') { const o = subjOf(n), [h, sa] = HUES[o.c] || HUES[0]; return `<span class="si ${size}" style="--h:${h};--s:${sa}%" aria-hidden="true">${o.i ? ic('s_' + o.i) : esc(o.e)}</span>`; }
const optN = n => { const o = subjOf(n); return (o.e ? esc(o.e) + ' ' : '') + esc(n.name); };
const tile = (icon, h, sa = 75, size = '') => `<span class="si ${size}" style="--h:${h};--s:${sa}%" aria-hidden="true">${ic(icon)}</span>`;
// ---- vrste ocen in barve: pisna = rdeča, ustna = črna, drugo = modra
const GT = [['Ustna', 'Ustna ocena', 'u'], ['Pisna', 'Pisna ocena', 'p'], ['Drugo', 'Drugo', 'd']];
const gcat = t => { t = String(t || '').toLowerCase(); return /pisn|test|kontroln|izpit/.test(t) ? 'p' : /ustn|spra/.test(t) ? 'u' : t ? 'd' : 'u'; };
const gLabel = t => ({ p: 'Pisna ocena', u: 'Ustna ocena', d: 'Drugo' })[gcat(t)];
const gChip = (g, big) => `<span class="gc ${gcat(g.gtype)}${big ? ' big' : ''}" title="${gLabel(g.gtype)}">${esc(g.grade)}</span>`;

// ============================================================ OKVIR
const NAV = [['home', 'Domov', 'home'], ['sched', 'Urnik', 'cal'], ['nbs', 'Zvezki', 'book'], ['ai', 'Uči se', 'spark'], ['grades', 'Ocene', 'star']];
const NAV_A = [['admin', 'Uporabniki', 'users'], ['amsg', 'Sporočila', 'send'], ['asys', 'Sistem', 'db']];
function shell(inner) {
  const items = U.role === 'admin' ? NAV_A : NAV, act = { nb: 'nbs', shared: 'nbs', set: 'set', focus: 'ai', grade: 'grades' }[S.view] || S.view;
  const un = (D.inbox || []).filter(m => !m.read).length;
  return `<div class="app"><header class="top" id="top"><div class="topin">
    <a class="brand" href="#" data-a="go" data-v="${U.role === 'admin' ? 'admin' : 'home'}"><img src="../Logo.png" alt="">DigitNotes</a><span style="flex:1"></span>
    ${U.role !== 'admin' ? `<button class="topbtn" data-a="go" data-v="search" aria-label="Iskanje">${ic('search')}</button>` : ''}
    ${U.role !== 'admin' ? `<button class="topbtn" data-a="openInbox" aria-label="Obvestila">${ic('bell')}${un ? `<span class="badge">${un}</span>` : ''}</button>` : ''}
    <button class="topbtn" data-a="go" data-v="set" aria-label="Nastavitve">${ic('gear')}</button></div></header>
    <main class="wrap" id="main"><div class="${S.view !== LASTVIEW ? 'view' : ''}">${inner}</div></main>
    <nav class="nav">${items.map(([v, l, i]) => `<button class="${act === v ? 'on' : ''}" data-a="go" data-v="${v}">${ic(i)}<span>${l}</span></button>`).join('')}</nav></div>`;
}
let LASTVIEW = null;
function render() {
  if (!U || gate()) return;
  const V = U.role === 'admin' ? { admin: vAdmin, amsg: vAdminMsg, asys: vAdminSys, set: vSet } : { home: vHome, sched: vSched, nbs: vNbs, nb: vNb, shared: vShared, ai: vAi, grades: vGrades, grade: vGrade, set: vSet, search: vSearch, focus: vFocus };
  const f = V[S.view] || V[U.role === 'admin' ? 'admin' : 'home'];
  const ae = document.activeElement, keep = ae && ae.id && ae.tagName === 'INPUT' ? { id: ae.id, v: ae.value, s: ae.selectionStart } : null;
  $('app').innerHTML = shell(f()); LASTVIEW = S.view; hydrate(); tick(); focusTick();
  if (keep) { const el = $(keep.id); if (el) { el.value = keep.v; el.focus(); try { el.setSelectionRange(keep.s, keep.s); } catch { } } }
  const t = $('top'); if (t) t.classList.toggle('sc', scrollY > 4);
  if (S.view === 'ai') { const c = $('chatEnd'); if (c) c.scrollIntoView({ block: 'end' }); }
}
function go(v) { S.view = v; render(); scrollTo(0, 0); }
addEventListener('scroll', () => { const t = $('top'); if (t) t.classList.toggle('sc', scrollY > 4); }, { passive: true });
function tick() { const c = $('clock'); if (c) c.textContent = new Date().toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' }); }
setInterval(tick, 15000);

// ============================================================ URNIK – logika
function tm(h) { const t = (D.times || []).find(x => x.h === h); return t ? [t.s, t.e] : DT[h]; }
const trng = h => tm(h)[0].replace(/^0/, '') + '–' + tm(h)[1].replace(/^0/, '');
function slot(date, h) { const wd = wdOf(date); if (wd > 4) return null; return (D.tt || []).find(x => x.d === wd && x.h === h) || null; }
const nbOf = id => (D.nb || []).find(n => n.id === id);
const isOff = d => (D.off || []).includes(d);
function status(date, h) {
  const s = slot(date, h); if (!s) return 'empty'; if (s.malica) return 'malica';
  const l = D.lsMap[date + '_' + h];
  if (l) return l.kind === 'cancel' ? 'cx' : l.kind === 'grade' ? 'gr' : 'ok';
  const t = today(), past = date < t || (date === t && nowMin() >= toMin(tm(h)[1]));
  if (past && date >= addD(t, -7) && date >= (U.since || '')) return 'red';
  return 'open';
}
function daySlots(date) { const r = []; if (wdOf(date) > 4 || isOff(date)) return r; for (let h = 1; h <= 9; h++) { const s = slot(date, h); if (s && !s.malica) r.push(h); } return r; }
function dayDone(date) { const hs = daySlots(date); return { total: hs.length, done: hs.filter(h => D.lsMap[date + '_' + h]).length }; }
function streak() {
  let d = today(), n = 0; const td = dayDone(d);
  if (!(td.total && td.done === td.total)) d = addD(d, -1);
  for (let i = 0; i < 400; i++) {
    if (U.since && d < U.since) break;
    const x = dayDone(d);
    if (x.total) { if (x.done === x.total) n++; else break; }
    d = addD(d, -1);
  }
  return n;
}
function nextLesson() {
  const t = today(), m = nowMin();
  for (let i = 0; i < 8; i++) { const d = addD(t, i); for (let h = 1; h <= 9; h++) { const s = slot(d, h); if (!s || s.malica || isOff(d)) continue; if (i === 0 && toMin(tm(h)[0]) <= m) continue; const n = nbOf(s.nid); return { d, h, n, i }; } }
  return null;
}
function lessonRow(date, h, compact) {
  const s = slot(date, h), st = status(date, h);
  if (!s) return compact ? '' : `<div class="free"><b style="width:22px;text-align:center">${h}.</b>prosto<span style="margin-left:auto">${trng(h)}</span></div>`;
  if (s.malica) return `<div class="malica"><b style="width:22px;text-align:center">${h}.</b>${ic('u_cup', 'ic-s')} Malica<span style="margin-left:auto;font-weight:500;font-size:12px">${trng(h)}</span></div>`;
  const n = nbOf(s.nid), l = D.lsMap[date + '_' + h], pc = (D.ph || []).filter(p => p.lk === date + '_' + h).length;
  const nowCls = date === today() && nowMin() >= toMin(tm(h)[0]) && nowMin() < toMin(tm(h)[1]) ? ' now' : '';
  const icons = (l?.kind === 'notes' ? `<span title="Zapiski" class="row" style="gap:3px">${ic('u_note', 'ic-s')}${pc ? `<small class="xs">${pc}</small>` : ''}</span>` : '') + (l?.kind === 'nonotes' ? `<span title="Brez zapiskov" style="color:var(--g600)">${ic('u_okc', 'ic-s')}</span>` : '') + (l?.grade ? gChip(l) : '') + (l?.kind === 'cancel' ? '<span class="xs">odpadla</span>' : '') + (st === 'red' ? `<span style="color:var(--red600)">${ic('alert', 'ic-s')}</span>` : '') + (st === 'ok' && !l?.grade && l?.kind !== 'nonotes' && l?.kind !== 'notes' ? ic('check', 'ic-s') : '');
  return `<button class="lesson ${st}${nowCls}" data-a="openLesson" data-d="${date}" data-h="${h}"><span class="n">${h}.</span>${sIc(n)}<span class="grow"><span class="t">${esc(n?.name || '(izbrisan zvezek)')}</span><span class="s">${trng(h)}${s.teacher ? ' · ' + esc(s.teacher) : ''}${st === 'red' ? ' · <b style="color:var(--red600)">vpiši uro</b>' : ''}</span></span><span class="st">${icons}</span></button>`;
}
function dayList(date, compact) {
  if (wdOf(date) > 4) return `<div class="card empty">${tile('u_palm', 174, 70, 'lg')}<div style="margin-top:10px">Vikend – ni pouka.</div></div>`;
  if (isOff(date)) return `<div class="card empty">Urnik je za ta dan izklopljen.</div>`;
  if (!(D.tt || []).length) return `<div class="card empty">Urnik še ni nastavljen.<br><button class="btn btn-p btn-sm" style="margin-top:12px" data-a="setTab" data-t="tt">Nastavi urnik</button></div>`;
  let o = ''; for (let h = 1; h <= 9; h++) o += lessonRow(date, h, compact);
  return o || `<div class="card empty">Ta dan nimaš pouka.</div>`;
}

// ============================================================ DOMOV
function vHome() {
  const t = today(), dd = dayDone(t), pct = dd.total ? dd.done / dd.total : 0, st = streak(), nx = nextLesson();
  const items = (D.items || []).filter(i => !i.done && i.due >= t).sort((a, b) => a.due.localeCompare(b.due)).slice(0, 6);
  const hr = new Date().getHours(), greet = hr < 10 ? 'Dobro jutro' : hr < 18 ? 'Dober dan' : 'Dober večer';
  const red = []; for (let i = 0; i <= 7; i++) { const d = addD(t, -i); for (const h of daySlots(d)) if (status(d, h) === 'red') red.push([d, h]); }
  return `${installCard()}${notifCard()}
  <div class="hello"><div><div class="mut sm">${greet}</div><div class="h1">Živjo, <span style="color:var(--g700)">${esc((U.name || '').split(' ')[0])}</span>!</div></div><div style="text-align:right"><div class="mut xs" style="text-transform:capitalize">${fmtD(t)}</div><div class="clock" id="clock"></div></div></div>
  <div class="stats">
    <div class="card ringc"><div class="ring"><svg width="70" height="70"><circle cx="35" cy="35" r="29" class="tr" stroke-width="8" fill="none"/><circle cx="35" cy="35" r="29" stroke="#10b981" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="182.2" stroke-dashoffset="${182.2 * (1 - pct)}"/></svg><b>${dd.total ? dd.done + '/' + dd.total : '–'}</b></div>
      <div><b>${!dd.total ? 'Danes ni pouka' : dd.done === dd.total ? 'Dan je popoln!' : `Danes ${dd.done} od ${dd.total} ur`}</b><div class="mut sm">${dd.total && dd.done < dd.total ? `Še ${pl(dd.total - dd.done, 'ura', 'uri', 'ure', 'ur')} do popolnega dne` : 'Odlično delo.'}</div></div></div>
    <div class="chip fire"><span class="row" style="gap:6px">${ic('u_flame')}${st}</span><small>${st % 100 === 1 ? 'dan' : st % 100 === 2 ? 'dneva' : 'dni'} zapored</small></div>
    <div class="chip next">${nx ? `<span class="row" style="gap:8px">${sIc(nx.n, 'xs')}${nx.i === 0 ? tm(nx.h)[0].replace(/^0/, '') : nx.i === 1 ? 'jutri' : fmtS(nx.d)}</span><small>naslednja: ${esc(nx.n?.name || '')}</small>` : `${ic('cal')}<small>ni prihajajočih ur</small>`}</div>
  </div>
  <div class="quick"><button data-a="go" data-v="search">${tile('search', 214, 85)}Iskanje</button><button data-a="go" data-v="focus">${tile('timer', 22, 88)}${FT.phase ? fmtClock(focusLeft()) : 'Fokus'}</button><button data-a="go" data-v="ai">${tile('spark', 268, 70)}Vprašaj AI</button><button data-a="itemForm">${tile('u_pin', 152, 62)}Nov rok</button></div>
  ${red.length ? `<div class="notice r" style="margin-top:14px">${ic('alert')}<div class="grow"><b>${pl(red.length, 'ura čaka', 'uri čakata', 'ure čakajo', 'ur čaka')} na vpis</b><div class="sm">${red.length === 1 ? "Vpiši jo" : "Vpiši jih"}, da ohraniš niz.</div></div><button class="btn btn-sm btn-d" data-a="openLesson" data-d="${red[0][0]}" data-h="${red[0][1]}">Vpiši</button></div>` : ''}
  <h2 class="h2">${ic('cal')} Današnji urnik</h2>${dayList(t)}
  <h2 class="h2">${ic('clock')} Roki <button class="btn btn-s btn-sm r" data-a="itemForm">${ic('plus', 'ic-s')} Dodaj</button></h2>
  ${items.length ? `<div class="card list">${items.map(itemRow).join('')}</div>` : `<div class="card empty sm">Ni prihajajočih testov ali nalog. Dodaj jih in dan prej dobiš opomnik.</div>`}`;
}
function itemRow(i) {
  const n = nbOf(i.nid), days = Math.round((pd(i.due) - pd(today())) / 864e5);
  const when = days === 0 ? 'danes' : days === 1 ? 'jutri' : days < 7 ? DAYS[wdOf(i.due)]?.toLowerCase() || fmtS(i.due) : fmtS(i.due);
  return `<div class="it"><label class="chk" style="align-items:center"><input type="checkbox" data-c="itemDone" data-id="${i.id}" ${i.done ? 'checked' : ''}></label>${i.kind === 'test' ? tile('u_quiz', 355, 78, 'xs') : i.kind === 'hw' ? tile('u_hw', 214, 85, 'xs') : tile('u_pin', 152, 62, 'xs')}<div class="grow"><b style="${i.done ? 'text-decoration:line-through;color:var(--mut)' : ''}">${esc(i.title)}</b><div class="mut xs">${esc(n?.name || '')}${n ? ' · ' : ''}${{ test: 'Test', hw: 'Domača naloga', other: 'Drugo' }[i.kind]}</div></div><span class="pill ${days <= 1 ? 'o' : ''}">${when}</span><button class="btn btn-s btn-i" data-a="itemForm" data-id="${i.id}" aria-label="Uredi">${ic('edit', 'ic-s')}</button></div>`;
}
function installCard() {
  if (isApp() || localStorage.getItem('dn2_noinst')) return '';
  if (isIOS()) return `<div class="notice b" style="margin-bottom:14px">${ic('info')}<div class="grow sm"><b>Namesti DigitNotes na iPhone</b><br>V Safariju tapni <b>Deli</b> ⎋ in nato <b>»Dodaj na domači zaslon«</b>. Samo tako delujejo obvestila.</div><button class="btn btn-s btn-i" data-a="noInst" aria-label="Skrij">${ic('x', 'ic-s')}</button></div>`;
  if (DEFERRED) return `<div class="notice b" style="margin-bottom:14px">${ic('info')}<div class="grow sm"><b>Namesti DigitNotes</b><br>Kot prava aplikacija na domačem zaslonu.</div><button class="btn btn-p btn-sm" data-a="install">Namesti</button></div>`;
  return '';
}
let DEFERRED = null; addEventListener('beforeinstallprompt', e => { e.preventDefault(); DEFERRED = e; if (S.view === 'home' && U) render(); });

// ============================================================ VPIS URE
let LM = null;
function openLesson(date, h) {
  const s = slot(date, h); if (!s || s.malica) return;
  const n = nbOf(s.nid); if (!n) return toast('Zvezek za to uro ne obstaja več.', true);
  const k = date + '_' + h, l = D.lsMap[k];
  LM = { date, h, k, nid: s.nid, n, s, rec: l ? { ...l } : null, kind: l?.kind || null, grade: l?.grade || '', gtype: l?.gtype ? GT.find(x => x[2] === gcat(l.gtype))[0] : 'Ustna', addGrade: !!(l?.grade) };
  if (date > today()) return lmChoose(true);
  l ? lmSummary() : lmChoose();
}
const lmHead = () => sheetHead(esc(LM.n.name), `${LM.h}. ura · ${trng(LM.h)} · ${fmtD(LM.date)}${LM.s.teacher ? ' · ' + esc(LM.s.teacher) : ''}`, sIc(LM.n, 'sm'));
function lmChoose(future) {
  modal(`${lmHead()}${future ? '<div class="notice b sm" style="margin-bottom:12px">' + ic('info') + '<div>Ta ura je šele pred tabo. Vpis je mogoč že zdaj (npr. odpadla ura).</div></div>' : ''}
  <p class="b" style="margin-bottom:10px">Kako je bila ura?</p>
  <button class="opt" data-a="lmKind" data-k="notes">${tile('cam', 214, 85, 'md')}<span><b>Ura z zapiski</b><small>Fotografiraj zapiske ali vpiši snov</small></span></button>
  <button class="opt" data-a="lmKind" data-k="nonotes">${tile('u_okc', 152, 62, 'md')}<span><b>Ura brez zapiskov</b><small>Pri uri ni bilo snovi za zapisati</small></span></button>
  <button class="opt" data-a="lmKind" data-k="grade">${tile('s_star', 40, 90, 'md')}<span><b>Ocena</b><small>Test, spraševanje, pisno ocenjevanje …</small></span></button>
  <button class="opt" data-a="lmKind" data-k="cancel">${tile('u_ban', 215, 20, 'md')}<span><b>Odpadla ura</b><small>Ura ni bila izvedena – ne šteje v statistiko</small></span></button>`);
}
function lmSummary() {
  const l = LM.rec, ph = (D.ph || []).filter(p => p.lk === LM.k);
  const kindL = { notes: 'Ura z zapiski', nonotes: 'Ura brez zapiskov', grade: 'Ocena', cancel: 'Odpadla ura' }[l.kind];
  modal(`${lmHead()}<div class="card pad" style="margin-bottom:12px"><div class="row"><b class="grow">${kindL}</b>${l.grade ? `<span class="row" style="gap:8px"><span class="mut sm">${gLabel(l.gtype)}</span>${gChip(l, true)}</span>` : ''}</div>
    ${l.text ? `<p style="margin-top:10px;white-space:pre-wrap">${esc(l.text)}</p>` : ''}${l.note ? `<p class="mut sm" style="margin-top:8px;white-space:pre-wrap">${esc(l.note)}</p>` : ''}
    ${ph.length ? `<div class="phgrid" style="margin-top:12px">${ph.map(p => `<div class="ph" data-a="viewPhoto" data-id="${p.id}" data-nid="${LM.nid}"><img data-pid="${p.id}" alt="Zapiski"></div>`).join('')}</div>` : ''}</div>
    <div class="row" style="justify-content:space-between"><button class="btn btn-d" data-a="lmDelete">${ic('trash', 'ic-s')} Izbriši vnos</button><button class="btn btn-p" data-a="lmEdit">${ic('edit', 'ic-s')} Uredi</button></div>`);
  hydrate($('modal'));
}
async function lmKind(k) {
  LM.kind = k;
  if (k === 'nonotes' || k === 'cancel') return lmSave();
  if (k === 'grade') return lmGradeForm();
  lmNotesForm();
}
function gradePicker() {
  return `<div class="field"><label class="lbl">Vrsta ocene</label><div class="gtpick">${GT.map(([v, l, c]) => `<button type="button" class="${c} ${LM.gtype === v ? 'on' : ''}" data-a="pickGt" data-v="${v}"><i></i>${v}</button>`).join('')}</div><input type="hidden" id="lm_gt" value="${LM.gtype}"></div>
  <div class="field"><label class="lbl">Ocena</label><div class="gradepick">${[1, 2, 3, 4, 5].map(g => `<button type="button" class="${String(LM.grade) === String(g) ? 'on' : ''}" data-a="pickGrade" data-g="${g}">${g}</button>`).join('')}</div><input id="lm_g" class="inp" style="margin-top:8px" placeholder="ali vpiši (npr. 4+, 85 %, odlično)" maxlength="6" value="${esc(LM.grade)}" data-c="gradeTyped"></div>`;
}
function lmGradeForm() {
  modal(`${lmHead()}<h4 class="b" style="margin-bottom:12px">Ocena</h4>${gradePicker()}
  <div class="field"><label class="lbl" for="lm_note">Opomba (neobvezno)</label><textarea id="lm_note" class="inp" rows="2" maxlength="1000" placeholder="npr. snov: kvadratna funkcija">${esc(LM.rec?.note || '')}</textarea></div>
  <div class="row" style="justify-content:space-between"><button class="btn btn-s" data-a="lmBack">Nazaj</button><button class="btn btn-p" data-a="lmSave">${ic('check', 'ic-s')} Shrani</button></div>`);
}
function lmNotesForm() {
  const ph = (D.ph || []).filter(p => p.lk === LM.k);
  modal(`${lmHead()}<h4 class="b">Zapiski</h4>
  <div class="camrow"><label>${ic('cam', 'ic-l')}Fotografiraj<input type="file" accept="image/*" capture="environment" class="hide" data-c="lmFiles"></label><label>${ic('img', 'ic-l')}Iz galerije<input type="file" accept="image/*" multiple class="hide" data-c="lmFiles"></label></div>
  <div class="phgrid" id="lm_ph">${ph.map(p => `<div class="ph"><img data-pid="${p.id}" alt="Zapiski"><button class="del" data-a="lmDelPhoto" data-id="${p.id}" aria-label="Odstrani">${ic('x', 'ic-s')}</button></div>`).join('')}</div>
  <div class="field" style="margin-top:12px"><label class="lbl" for="lm_text">Snov (neobvezno, če imaš fotografije)</label><textarea id="lm_text" class="inp" rows="3" maxlength="5000" placeholder="Povzetek snovi …">${esc(LM.rec?.text || '')}</textarea></div>
  <label class="row" style="justify-content:space-between;padding:12px 0;border-top:1px solid var(--line2)"><span class="b">Dodaj oceno</span><span class="sw"><input type="checkbox" id="lm_ag" ${LM.addGrade ? 'checked' : ''} data-c="lmAddGrade"><span></span></span></label>
  <div id="lm_gbox" class="${LM.addGrade ? '' : 'hide'}">${gradePicker()}</div>
  <div class="row" style="justify-content:space-between;margin-top:6px"><button class="btn btn-s" data-a="lmBack">Nazaj</button><button class="btn btn-p" data-a="lmSave">${ic('check', 'ic-s')} Shrani uro</button></div>`);
  hydrate($('modal'));
}
async function uploadFiles(files, nid, lk, date, onDone) {
  let ok = 0;
  for (const f of files) {
    try {
      const data = files.length === 1 ? await editPhoto(f) : await resize(f);
      if (!data) continue;
      const r = await api('/photo/upload', { nid, data, lk: lk || null, date: date || today() });
      (D.ph = D.ph || []).push({ id: r.id, nid, lk: lk || null, date: date || today(), t: Date.now(), size: data.length * .75, hasOcr: 0 }); ok++;
      onDone && onDone();
    } catch (e) { toast(e.message, true); }
  }
  if (ok) toast(ok === 1 ? 'Fotografija naložena.' : `Naloženo: ${nphoto(ok)}.`);
}
async function lmSave() {
  const k = LM.kind, body = { k: LM.k, nid: LM.nid, kind: k };
  if (k === 'notes') {
    body.text = $('lm_text').value.trim();
    const ph = (D.ph || []).filter(p => p.lk === LM.k).length;
    if (!body.text && !ph) return toast('Dodaj fotografijo ali vpiši snov.', true);
    if ($('lm_ag').checked) { body.grade = ($('lm_g').value || '').trim(); body.gtype = $('lm_gt').value; if (!body.grade) return toast('Izberi oceno ali izklopi »Dodaj oceno«.', true); }
  }
  if (k === 'grade') { body.grade = ($('lm_g').value || '').trim(); body.gtype = $('lm_gt').value; body.note = $('lm_note').value.trim(); if (!body.grade) return toast('Izberi oceno.', true); }
  if (LM.rec?.note && k !== 'grade') body.note = LM.rec.note;
  try {
    await api('/lesson/save', body);
    const rec = { k: LM.k, nid: LM.nid, kind: k, text: body.text || '', grade: body.grade || '', gtype: body.gtype || '', note: body.note || '', upd: Date.now() };
    D.lsMap[LM.k] = rec; D.ls = (D.ls || []).filter(x => x.k !== LM.k).concat(rec);
    closeModal(); render();
    const dd = dayDone(today());
    toast(k === 'cancel' ? 'Ura označena kot odpadla.' : dd.total && dd.done === dd.total && LM.date === today() ? `Dan je popoln! Niz: ${streak()} dni` : 'Ura shranjena ✓');
  } catch (e) { if (e.message !== '__gate') toast(e.message, true); }
}

// ============================================================ URNIK (pogled)
function vSched() {
  const d = S.date; let body;
  if (S.week) { const mon = addD(d, -wdOf(d)); body = `<div class="week">${[0, 1, 2, 3, 4].map(i => { const x = addD(mon, i); return `<div><div class="b sm" style="margin-bottom:6px;color:${x === today() ? 'var(--g700)' : 'inherit'}">${DAYS[i]} <span class="mut" style="font-weight:500">${fmtS(x)}</span></div>${dayList(x, true)}</div>`; }).join('')}</div>`; }
  else body = `<h2 class="h2" style="text-transform:capitalize;margin-top:4px">${fmtD(d)}</h2>${dayList(d)}`;
  return `<div class="h1" style="margin:6px 0 12px">Urnik</div>
  <div class="card datebar"><button class="btn btn-s btn-i" data-a="shiftDate" data-n="-1" aria-label="Nazaj">${ic('l')}</button><input type="date" class="inp" style="width:auto;padding:8px 10px" value="${d}" data-c="setDate"><button class="btn btn-s btn-i" data-a="shiftDate" data-n="1" aria-label="Naprej">${ic('r')}</button><button class="btn btn-s btn-sm" data-a="goToday">Danes</button><span style="flex:1"></span><div class="seg" style="width:150px"><button class="${!S.week ? 'on' : ''}" data-a="setWeek" data-w="0">Dan</button><button class="${S.week ? 'on' : ''}" data-a="setWeek" data-w="1">Teden</button></div></div>${body}`;
}

// ============================================================ ZVEZKI
function vNbs() {
  const ids = D.nb || [];
  return `<div class="row" style="margin:6px 0 14px"><div class="h1 grow">Zvezki</div><button class="btn btn-p btn-sm" data-a="nbForm">${ic('plus', 'ic-s')} Nov zvezek</button></div>
  ${ids.length ? `<div class="nbs">${ids.map(n => { const c = (D.ph || []).filter(p => p.nid === n.id).length; return `<button class="nbc" data-a="openNb" data-id="${n.id}">${sIc(n, 'lg')}<b>${esc(n.name)}</b><span class="mut xs">${nphoto(c)}${n.share ? ' · deljen' : ''}</span></button>`; }).join('')}</div>`
    : `<div class="card empty">Še nimaš zvezkov.<br><button class="btn btn-p btn-sm" style="margin-top:12px" data-a="nbForm">Ustvari prvi zvezek</button></div>`}`;
}
function sortedPhotos(nid, list) { return (list || (D.ph || []).filter(p => p.nid === nid)).slice().sort((a, b) => (a.date || '').localeCompare(b.date || '') || a.t - b.t); }
function photoGrid(ph, own, share) {
  if (!ph.length) return '<div class="card empty">Zvezek je prazen. Dodaj fotografije zapiskov.</div>';
  let last = '', o = '';
  ph.forEach((p, i) => { if (p.date !== last) { last = p.date; o += `<div class="daysep">${p.date ? fmtD(p.date) : ''}</div>`; } o += `<div><div class="ph" data-a="viewer" data-i="${i}" ${own ? `data-ctx="${p.id}"` : ''}><img data-pid="${p.id}" ${share ? `data-s="${share}"` : ''} alt="Stran ${i + 1}" loading="lazy"></div><div class="cap">Stran ${i + 1}${p.lk ? ' · ' + p.lk.split('_')[1] + '. ura' : ''}</div></div>`; });
  return `<div class="photos">${o}</div>`;
}
function vNb() {
  const n = nbOf(S.nb); if (!n) { S.view = 'nbs'; return vNbs(); }
  const ph = sortedPhotos(n.id), grades = (D.ls || []).filter(l => l.nid === n.id && l.grade).sort((a, b) => a.k.localeCompare(b.k));
  const items = (D.items || []).filter(i => i.nid === n.id && !i.done);
  return `<button class="btn btn-s btn-sm" style="margin:4px 0 12px" data-a="go" data-v="nbs">${ic('l', 'ic-s')} Zvezki</button>
  <div class="row" style="margin-bottom:14px;align-items:flex-start">${sIc(n, 'xl')}<div class="grow"><div class="h1">${esc(n.name)}</div><div class="mut sm">${nphoto(ph.length)} · ${esc(n.teachers.join(', '))}</div></div><button class="btn btn-s btn-i" data-a="nbForm" data-id="${n.id}" aria-label="Uredi zvezek">${ic('edit')}</button></div>
  <div class="row-w" style="margin-bottom:16px"><label class="btn btn-p btn-sm">${ic('cam', 'ic-s')} Dodaj<input type="file" accept="image/*" multiple class="hide" data-c="nbFiles"></label>
    <button class="btn btn-s btn-sm" data-a="makePdf">${ic('pdf', 'ic-s')} PDF</button>
    <button class="btn btn-s btn-sm" data-a="shareNb">${ic('share', 'ic-s')} ${n.share ? 'Deljeno' : 'Deli'}</button>
    ${U.ai.on ? `<button class="btn btn-s btn-sm" data-a="aiFor" data-id="${n.id}">${ic('spark', 'ic-s')} Uči se z AI</button>` : ''}</div>
  ${grades.length ? `<div class="card pad" style="margin-bottom:14px"><div class="row" style="margin-bottom:8px"><b class="grow">Ocene</b><button class="pill g" data-a="openGrades" data-id="${n.id}">povprečje ${avgOf(grades.map(g => g.grade)) || '–'} ›</button></div><div class="row-w">${grades.map(g => `<span class="row" style="gap:6px">${gChip(g)}<span class="mut xs">${fmtS(g.k.split('_')[0])}</span></span>`).join('')}</div></div>` : ''}
  ${items.length ? `<div class="card list" style="margin-bottom:14px">${items.map(itemRow).join('')}</div>` : ''}
  ${photoGrid(ph, true)}
  ${ph.length ? '<p class="hint" style="margin-top:12px">Namig: dolg pritisk (ali desni klik) na fotografijo jo zamenja, prenese ali izbriše.</p>' : ''}`;
}
// deljeni zvezek
let SH = null;
async function openShared() { try { const r = await api('/shared?t=' + encodeURIComponent(SHARE)); if (r.own) { const n = (D.nb || []).find(x => x.shareToken === SHARE); if (n) { S.nb = n.id; S.view = 'nb'; render(); return; } } SH = { ...r, token: SHARE }; S.view = 'shared'; render(); } catch (e) { if (e.message !== '__gate') { toast(e.message, true); S.view = 'home'; history.replaceState(null, '', location.pathname); render(); } } }
function vShared() {
  if (!SH) return '<div class="card empty">Nalagam …</div>';
  return `<button class="btn btn-s btn-sm" style="margin:4px 0 12px" data-a="closeShared">${ic('l', 'ic-s')} Domov</button>
  <div class="row" style="margin-bottom:14px">${sIc(SH.nb, 'xl')}<div class="grow"><div class="h1">${esc(SH.nb.name)}</div><div class="mut sm">Deljeni zvezek · avtor: ${esc(SH.author)} · ${nphoto(SH.photos.length)}</div></div></div>
  <div class="row-w" style="margin-bottom:14px"><button class="btn btn-s btn-sm" data-a="makePdf">${ic('pdf', 'ic-s')} PDF</button></div>
  <div class="notice b sm" style="margin-bottom:14px">${ic('info')}<div>Zapiske je delil sošolec. Uporabljaj jih samo za učenje in jih ne posreduj naprej brez njegovega dovoljenja.</div></div>
  ${photoGrid(SH.photos, false, SH.token)}`;
}
function curPhotos() { return S.view === 'shared' ? { list: SH.photos, share: SH.token, name: SH.nb.name, author: SH.author } : { list: sortedPhotos(S.nb), share: null, name: nbOf(S.nb)?.name, author: U.name }; }
// pregledovalnik
let VI = 0, VP = [];
function openViewer(i) { VP = curPhotos(); VI = i; drawViewer(); }
function drawViewer() {
  const v = $('viewer'), p = VP.list[VI]; v.classList.remove('hide');
  v.innerHTML = `<button class="vb" style="top:calc(14px + env(safe-area-inset-top,0px));right:14px" data-a="closeViewer" aria-label="Zapri">${ic('x')}</button>
  <button class="vb" style="top:calc(14px + env(safe-area-inset-top,0px));left:14px" data-a="dlPhoto" data-id="${p.id}" aria-label="Prenesi">${ic('dl')}</button>
  ${VP.list.length > 1 ? `<button class="vb" style="left:10px;top:50%" data-a="vStep" data-n="-1" aria-label="Prejšnja">${ic('l')}</button><button class="vb" style="right:10px;top:50%" data-a="vStep" data-n="1" aria-label="Naslednja">${ic('r')}</button>` : ''}
  <img id="vimg" alt="Zapiski" draggable="false"><div class="cap">${p.date ? fmtS(p.date) + ' · ' : ''}${VI + 1}/${VP.list.length} · ${'ontouchstart' in window ? 'razširi s prsti' : 'dvoklik za povečavo'}</div>`;
  ZM = { s: 1, x: 0, y: 0 };
  photoUrl(p.id, VP.share).then(u => { const im = $('vimg'); if (im) im.src = u; });
}
// povečava: dva prsta, dvojni dotik, kolesce miške; premik pri povečavi; poteg za naslednjo stran
let ZM = { s: 1, x: 0, y: 0 }; const PTR = new Map(); let pinch0 = null, pan0 = null, lastTap = 0, swipe0 = null;
function zApply(anim) { const im = $('vimg'); if (!im) return; im.classList.toggle('drag', !anim); im.style.transform = `translate(${ZM.x}px,${ZM.y}px) scale(${ZM.s})`; }
function zClamp() { ZM.s = Math.min(5, Math.max(1, ZM.s)); if (ZM.s === 1) { ZM.x = 0; ZM.y = 0; } const lim = (ZM.s - 1) * Math.max(innerWidth, innerHeight) / 2; ZM.x = Math.max(-lim, Math.min(lim, ZM.x)); ZM.y = Math.max(-lim, Math.min(lim, ZM.y)); }
const VW = $('viewer');
VW.addEventListener('pointerdown', e => {
  if (e.target.closest('.vb')) return;
  PTR.set(e.pointerId, { x: e.clientX, y: e.clientY }); VW.setPointerCapture?.(e.pointerId);
  if (PTR.size === 2) { const [a, b] = [...PTR.values()]; pinch0 = { d: Math.hypot(a.x - b.x, a.y - b.y), s: ZM.s }; pan0 = null; swipe0 = null; }
  else if (PTR.size === 1) {
    const now = Date.now();
    if (now - lastTap < 300) { ZM.s = ZM.s > 1 ? 1 : 2.5; zClamp(); zApply(true); lastTap = 0; return; }
    lastTap = now; pan0 = { x: e.clientX, y: e.clientY, ox: ZM.x, oy: ZM.y }; swipe0 = ZM.s === 1 ? { x: e.clientX, t: now } : null;
  }
});
VW.addEventListener('pointermove', e => {
  if (!PTR.has(e.pointerId)) return; PTR.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (PTR.size === 2 && pinch0) { const [a, b] = [...PTR.values()]; ZM.s = pinch0.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch0.d; zClamp(); zApply(false); }
  else if (PTR.size === 1 && pan0 && ZM.s > 1) { ZM.x = pan0.ox + e.clientX - pan0.x; ZM.y = pan0.oy + e.clientY - pan0.y; zClamp(); zApply(false); }
});
const pEnd = e => {
  PTR.delete(e.pointerId);
  if (PTR.size < 2) pinch0 = null;
  if (swipe0 && PTR.size === 0) { const d = e.clientX - swipe0.x; if (Math.abs(d) > 60 && Date.now() - swipe0.t < 600 && VP.list.length > 1) { VI = (VI + (d < 0 ? 1 : -1) + VP.list.length) % VP.list.length; drawViewer(); } swipe0 = null; }
  if (PTR.size === 0) { pan0 = null; zApply(true); }
};
VW.addEventListener('pointerup', pEnd); VW.addEventListener('pointercancel', pEnd);
VW.addEventListener('wheel', e => { if (VW.classList.contains('hide')) return; e.preventDefault(); ZM.s *= e.deltaY < 0 ? 1.15 : 1 / 1.15; zClamp(); zApply(true); }, { passive: false });
function closeViewer() { $('viewer').classList.add('hide'); $('viewer').innerHTML = ''; }
addEventListener('keydown', e => { if (e.key === 'Escape') { if (!$('viewer').classList.contains('hide')) closeViewer(); else if (!$('modal').classList.contains('hide')) closeModal(); } if (!$('viewer').classList.contains('hide') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { VI = (VI + (e.key === 'ArrowRight' ? 1 : -1) + VP.list.length) % VP.list.length; drawViewer(); } });
async function dlPhoto(id) {
  const c = VP.list ? VP : curPhotos(), i = c.list.findIndex(p => p.id === id), p = c.list[i];
  const a = document.createElement('a'); a.href = await photoUrl(id, c.share); a.download = `${String(i + 1).padStart(2, '0')}_${nodia(c.name).replace(/\W+/g, '_')}_${p?.date || ''}.jpg`; a.click();
}
// kontekstni meni (dolg pritisk)
let lpT = null;
function showCtx(x, y, id) {
  const m = $('ctx');
  m.innerHTML = `<button data-a="editExisting" data-id="${id}">${ic('crop', 'ic-s')} Obreži / zasukaj</button><button data-a="replacePhoto" data-id="${id}">${ic('swap', 'ic-s')} Zamenjaj fotografijo</button><button data-a="dlPhotoCtx" data-id="${id}">${ic('dl', 'ic-s')} Prenesi</button><button class="d" data-a="delPhoto" data-id="${id}">${ic('trash', 'ic-s')} Izbriši</button>`;
  m.style.left = Math.min(x, innerWidth - 215) + 'px'; m.style.top = Math.min(y, innerHeight - 210) + 'px'; m.classList.remove('hide');
}
document.addEventListener('contextmenu', e => { const el = e.target.closest('[data-ctx]'); if (el) { e.preventDefault(); showCtx(e.clientX, e.clientY, el.dataset.ctx); } });
document.addEventListener('touchstart', e => { const el = e.target.closest('[data-ctx]'); if (!el) return; const t = e.touches[0]; lpT = setTimeout(() => { lpT = 'fired'; showCtx(t.clientX, t.clientY, el.dataset.ctx); }, 550); }, { passive: true });
['touchend', 'touchmove'].forEach(ev => document.addEventListener(ev, () => { if (lpT && lpT !== 'fired') clearTimeout(lpT); setTimeout(() => lpT = null, 50); }, { passive: true }));

// ---- PDF (lasten generator – brez zunanjih knjižnic)
function jpegSize(b) { let i = 2; while (i < b.length) { if (b[i] !== 0xFF) { i++; continue; } const m = b[i + 1], len = (b[i + 2] << 8) | b[i + 3]; if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) return { h: (b[i + 5] << 8) | b[i + 6], w: (b[i + 7] << 8) | b[i + 8] }; i += 2 + len; } return { w: 1000, h: 1400 }; }
function buildPdf(title, author, images) {
  const W = 595.28, H = 841.89, te = new TextEncoder(), parts = [], offs = []; let len = 0;
  const add = x => { const b = typeof x === 'string' ? te.encode(x) : x; parts.push(b); len += b.length; };
  const pdfs = s => '(' + nodia(s).replace(/[\\()]/g, '\\$&').replace(/[^\x20-\x7e]/g, '') + ')';
  const objs = []; // [content generator]
  const N = 4 + images.length * 3; // 1 katalog, 2 strani, 3 pisava, 4 naslovna vsebina, 5 naslovna stran ... nato po 3 na sliko
  add('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const obj = (n, body, stream) => { offs[n] = len; add(`${n} 0 obj\n${body}\n`); if (stream) { add('stream\n'); add(stream); add('\nendstream'); } add('\nendobj\n'); };
  const pageIds = [5]; images.forEach((_, i) => pageIds.push(6 + i * 3 + 2));
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, `<< /Type /Pages /Kids [${pageIds.map(i => i + ' 0 R').join(' ')}] /Count ${pageIds.length} >>`);
  obj(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
  const cover = te.encode(`0.02 0.59 0.41 rg 0 ${H - 330} ${W} 330 re f 1 1 1 rg BT /F1 14 Tf 1 0 0 1 60 ${H - 160} Tm (ZVEZEK) Tj /F1 34 Tf 1 0 0 1 60 ${H - 210} Tm ${pdfs(title)} Tj ET 0.2 0.25 0.33 rg BT /F1 16 Tf 1 0 0 1 60 ${H - 400} Tm ${pdfs('Avtor: ' + author)} Tj /F1 11 Tf 0.45 0.5 0.55 rg 1 0 0 1 60 ${H - 425} Tm ${pdfs('DigitNotes - ' + new Date().toLocaleDateString('sl-SI'))} Tj ET`);
  obj(4, `<< /Length ${cover.length} >>`, cover);
  obj(5, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R >> >> /Contents 4 0 R >>`);
  images.forEach((b, i) => {
    const base = 6 + i * 3, { w, h } = jpegSize(b), k = Math.min((W - 40) / w, (H - 60) / h), dw = w * k, dh = h * k, x = (W - dw) / 2, y = H - 20 - dh;
    obj(base, `<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${b.length} >>`, b);
    const c = te.encode(`q ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im0 Do Q BT /F1 9 Tf 0.5 0.5 0.5 rg 1 0 0 1 ${W / 2 - 6} 18 Tm (${i + 1}) Tj ET`);
    obj(base + 1, `<< /Length ${c.length} >>`, c);
    obj(base + 2, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im0 ${base} 0 R >> /Font << /F1 3 0 R >> >> /Contents ${base + 1} 0 R >>`);
  });
  const total = 6 + images.length * 3, xref = len;
  add(`xref\n0 ${total}\n0000000000 65535 f \n` + Array.from({ length: total - 1 }, (_, i) => String(offs[i + 1]).padStart(10, '0') + ' 00000 n \n').join(''));
  add(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts, { type: 'application/pdf' });
}
async function makePdf() {
  const c = curPhotos(); if (!c.list.length) return toast('Zvezek je prazen.', true);
  toast('Pripravljam PDF …');
  try {
    const imgs = []; for (const p of c.list) imgs.push(await photoBytes(p.id, c.share));
    const a = document.createElement('a'); a.href = URL.createObjectURL(buildPdf(c.name, c.author || '', imgs)); a.download = nodia(c.name).replace(/\W+/g, '_') + '.pdf'; a.click();
  } catch (e) { toast('PDF ni uspel: ' + e.message, true); }
}

// ============================================================ UČI SE (AI)
function aiGate() {
  if (!U.ai.on) return `<div class="card empty">${tile('spark', 268, 70, 'lg')}<br><b>AI pomočnik za tvoj račun še ni omogočen.</b><p class="sm" style="margin-top:6px">Omogoči ga lahko administrator.</p></div>`;
  if (!U.ai.consent) return `<div class="card pad"><div class="aihead" style="margin-bottom:12px"><span class="ailogo">${ic('spark')}</span><div><b>Vklopi AI pomočnika</b> <span class="beta">BETA</span></div></div>
    <p class="sm">AI pomočnik iz tvojih zapiskov pripravi povzetke, kartice in teste ter odgovarja na vprašanja o snovi. Lahko se z njim pogovarjaš tudi brez zapiskov.</p>
    <div class="notice b sm" style="margin:12px 0">${ic('shield')}<div><b>Kaj se zgodi s tvojimi podatki:</b><br>• Izbrani zapiski in vprašanja se pošljejo v obdelavo storitvi <b>Cloudflare Workers AI</b> (model Mistral Small).<br>• Podatki se <b>ne uporabljajo za učenje</b> AI modelov.<br>• Spletno iskanje (Wikipedija) se uporabi <b>samo, ko ga sam vklopiš</b> – takrat se iskalna poizvedba pošlje Wikipediji.<br>• Pogovori se shranijo v tvoj račun; izbrišeš jih lahko kadarkoli.<br>• AI se lahko zmoti – vedno preveri odgovore.</div></div>
    <label class="chk" style="margin-bottom:14px"><input type="checkbox" id="ai_ok"><span>Razumem in želim uporabljati AI pomočnika. Privolitev lahko kadarkoli prekličem v nastavitvah.</span></label>
    <button class="btn btn-p btn-w" data-a="aiConsent">Vklopi AI pomočnika</button></div>`;
  return '';
}
function vAi() {
  const g = aiGate(), A = S.ai;
  const head = `<div class="row" style="margin:6px 0 4px"><div class="aihead grow"><span class="ailogo">${ic('spark')}</span><div><div class="h1" style="font-size:26px">Uči se <span class="beta">BETA</span></div><div class="mut xs">Pogovarjaš se z umetno inteligenco. Odgovori so lahko napačni.</div></div></div><button class="btn btn-s btn-sm" data-a="go" data-v="focus">${ic('timer', 'ic-s')} ${FT.phase ? fmtClock(focusLeft()) : 'Fokus'}</button></div>`;
  if (g) return head + g;
  if (!A.nid) A.nid = (D.nb || [])[0]?.id || 'general';
  if (A.nid !== 'general' && !nbOf(A.nid)) A.nid = (D.nb || [])[0]?.id || 'general';
  const gen = A.nid === 'general';
  if (gen && A.mode === 'summary') A.mode = 'chat';
  const n = gen ? { id: 'general', name: 'Splošni pogovor' } : nbOf(A.nid), ph = gen ? [] : (D.ph || []).filter(p => p.nid === n.id), noOcr = ph.filter(p => !p.hasOcr).length;
  const chats = (D.chats || []).filter(c => gen ? !c.nid : c.nid === n.id).slice(0, 8);
  const lim = U.ai.limit || 0, used = D.aiUsed || 0;
  const modes = gen ? [['chat', 'Pogovor', 'u_chat'], ['cards', 'Kartice', 'u_cards'], ['test', 'Test', 'u_quiz']] : [['chat', 'Pogovor', 'u_chat'], ['summary', 'Povzetek', 'u_sum'], ['cards', 'Kartice', 'u_cards'], ['test', 'Test', 'u_quiz']];
  const needText = A.mode === 'chat' || gen;
  const ph_ = A.mode === 'chat' ? (gen ? 'Vprašaj karkoli …' : 'Vprašaj o snovi …') : 'Tema (npr. celica, ulomki) …';
  return `${head}
  <div class="row" style="margin-top:12px"><select class="inp grow" data-c="aiNb" aria-label="Vir"><option value="general" ${gen ? 'selected' : ''}>Splošni pogovor (brez zapiskov)</option><optgroup label="Moji zvezki">${(D.nb || []).map(x => `<option value="${x.id}" ${x.id === n.id ? 'selected' : ''}>${optN(x)}</option>`).join('')}</optgroup></select><button class="btn btn-s btn-i" data-a="aiNew" title="Nov pogovor" aria-label="Nov pogovor">${ic('plus')}</button></div>
  <div class="row-w xs mut" style="margin:8px 4px 0">${gen ? '<span>Odgovarja iz splošnega znanja' + (A.web ? ' in Wikipedije' : '') + '</span>' : `<span>${nphoto(ph.length)} · prebranih ${ph.length - noOcr}</span>`}<span>· porabljeno ${used}/${lim} ta mesec</span></div>
  ${!gen && noOcr ? `<div class="notice o sm" style="margin-top:10px">${ic('info')}<div class="grow"><b>${noOcr} ${noOcr === 1 ? 'fotografija še ni prebrana' : noOcr === 2 ? 'fotografiji še nista prebrani' : noOcr < 5 ? 'fotografije še niso prebrane' : 'fotografij še ni prebranih'}.</b> AI mora zapiske najprej prebrati (enkrat na fotografijo).</div><button class="btn btn-sm btn-p" data-a="aiOcr">Preberi</button></div>` : ''}
  <div class="modes">${modes.map(([m, l, i]) => `<button class="${A.mode === m ? 'on' : ''}" data-a="aiMode" data-m="${m}">${ic(i, 'ic-s')} ${l}</button>`).join('')}</div>
  <div class="chat">${A.msgs.length ? A.msgs.map(aiMsg).join('') : `<div class="card empty sm">${A.mode === 'chat' ? (gen ? 'Vprašaj karkoli – razložim snov po korakih. Vklopi <b>Splet</b> za odgovore z viri iz Wikipedije.' : 'Vprašaj karkoli o snovi iz zvezka <b>' + esc(n.name) + '</b>.') : gen ? 'Vpiši temo in AI pripravi ' + { cards: 'kartice za učenje', test: 'preizkus znanja' }[A.mode] + '.' : 'Klikni gumb spodaj in AI bo iz tvojih zapiskov pripravil ' + { summary: 'povzetek', cards: 'kartice za učenje', test: 'preizkus znanja' }[A.mode] + '.'}</div>`}
  ${A.busy ? '<div class="bub a"><span class="typing"><i></i><i></i><i></i></span></div>' : ''}<div id="chatEnd"></div></div>
  ${needText ? `<form class="ask" data-f="aiAsk"><input id="ai_q" class="inp grow" placeholder="${ph_}" maxlength="2000" autocomplete="off" ${A.busy ? 'disabled' : ''}>${A.mode === 'chat' ? `<button type="button" class="tog ${A.web ? 'on' : ''}" data-a="webToggle" title="Išči na spletu (Wikipedija)">${ic('globe', 'ic-s')}<span>Splet</span></button>` : ''}<button class="btn btn-p btn-i" type="submit" ${A.busy ? 'disabled' : ''} aria-label="Pošlji" style="border-radius:50%;width:44px;height:44px">${ic('send')}</button></form>`
      : `<button class="btn btn-p btn-w" data-a="aiRun" ${A.busy ? 'disabled' : ''}>${ic('spark', 'ic-s')} Pripravi ${{ summary: 'povzetek', cards: 'kartice', test: 'test' }[A.mode]}</button>`}
  ${chats.length ? `<h2 class="h2">Prejšnji pogovori</h2><div class="card list">${chats.map(c => `<div class="it"><button class="grow" style="text-align:left" data-a="aiOpen" data-id="${c.id}"><b class="sm">${esc(c.title)}</b><div class="mut xs">${fmtT(c.upd)}</div></button><button class="btn btn-s btn-i" data-a="aiDel" data-id="${c.id}" aria-label="Izbriši">${ic('trash', 'ic-s')}</button></div>`).join('')}</div>` : ''}`;
}
const AIL = `<div class="lab">${ic('spark', 'ic-s')} Ustvarila umetna inteligenca · lahko vsebuje napake</div>`;
function parseJSON(t) { try { return JSON.parse(t.slice(t.indexOf('['), t.lastIndexOf(']') + 1)); } catch { return null; } }
function mdLite(t) { return esc(t).split('\n').map(l => /^#+\s/.test(l) ? `<h4>${l.replace(/^#+\s/, '')}</h4>` : /^\s*[-*•]\s/.test(l) ? `<li>${l.replace(/^\s*[-*•]\s/, '')}</li>` : l.trim() ? `<p>${l}</p>` : '').join('').replace(/(<li>.*?<\/li>)+/g, m => `<ul>${m}</ul>`).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }
const srcHtml = w => w && w.length ? `<div class="srcs"><span class="xs mut">Viri (Wikipedija, CC BY-SA):</span>${w.map((x, i) => `<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${ic('globe', 'ic-s')} [${i + 1}] ${esc(x.title)}</a>`).join('')}</div>` : '';
function aiMsg(m, idx) {
  if (m.role === 'user') return `<div class="bub u">${esc(m.content)}</div>`;
  let o; try { o = JSON.parse(m.content); } catch { o = { mode: 'chat', text: m.content }; }
  if (o.mode === 'cards') { const a = parseJSON(o.text); if (a?.length) return `<div class="bub a" style="max-width:100%;width:100%">${AIL}${cardsHtml(a, idx)}</div>`; }
  if (o.mode === 'test') { const a = parseJSON(o.text); if (a?.length) return `<div class="bub a" style="max-width:100%;width:100%;white-space:normal">${AIL}${testHtml(a, idx)}</div>`; }
  return `<div class="bub a md" style="white-space:normal">${AIL}${mdLite(o.text)}${srcHtml(o.web)}<div class="acts"><button data-a="copyMsg" data-i="${idx}">${ic('copy', 'ic-s')} Kopiraj</button></div></div>`;
}
const FCS = {};
function cardsHtml(a, idx) { const st = FCS[idx] || (FCS[idx] = { i: 0, ok: 0 }), c = a[st.i % a.length]; return `<div class="deck"><div class="fc" data-a="flip"><div class="f"><small>Kartica ${st.i % a.length + 1}/${a.length}</small><div class="q">${esc(c.q)}</div><span class="xs" style="position:absolute;bottom:14px;right:16px;opacity:.6">tapni za odgovor ↻</span></div><div class="bk"><small style="color:var(--g700)">Odgovor</small><div class="q" style="font-size:16px">${esc(c.a)}</div></div></div></div><div class="row"><button class="btn btn-s grow" data-a="fcNext" data-i="${idx}" data-k="0">Še ne znam</button><button class="btn btn-p grow" data-a="fcNext" data-i="${idx}" data-k="1">Znam ✓</button></div>${st.i ? `<p class="mut xs" style="margin-top:6px">Znaš ${st.ok} od ${st.i}</p>` : ''}`; }
const QZ = {};
function testHtml(a, idx) { const st = QZ[idx] || (QZ[idx] = {}); const n = Object.keys(st).length, ok = Object.entries(st).filter(([q, v]) => a[q] && v === a[q].c).length; return a.map((q, qi) => `<div class="qz"><b>${qi + 1}. ${esc(q.q)}</b>${(q.o || []).map((o, oi) => `<button data-a="qzPick" data-i="${idx}" data-q="${qi}" data-o="${oi}" class="${st[qi] != null ? (oi === q.c ? 'ok' : st[qi] === oi ? 'no' : '') : ''}" ${st[qi] != null ? 'disabled' : ''}>${'ABCD'[oi]}) ${esc(o)}</button>`).join('')}${st[qi] != null && q.e ? `<div class="ex">${esc(q.e)}</div>` : ''}</div>`).join('') + (n === a.length ? `<div class="notice g"><b>Rezultat: ${ok}/${a.length} (${Math.round(ok / a.length * 100)} %)</b></div>` : ''); }
async function aiAsk(mode, message, opt = {}) {
  const A = S.ai; if (A.busy) return null;
  const web = mode === 'chat' && !!A.web;
  A.busy = true; A.msgs.push({ role: 'user', content: (message && mode === 'chat' ? message : ({ summary: 'Pripravi povzetek', cards: 'Pripravi kartice', test: 'Pripravi test' }[mode] + (message ? ': ' + message : ''))) + (web ? ' 🌐' : '') }); if (!opt.quiet) render();
  let reply = null;
  try {
    const r = await api('/ai/ask', { nid: A.nid, mode, message, chatId: A.chat, web });
    A.chat = r.chatId; A.msgs.push({ role: 'ai', content: JSON.stringify({ mode: r.mode, text: r.reply, web: r.web }) }); D.aiUsed = (D.aiUsed || 0) + 1 + (web ? 0 : 0);
    reply = r.reply;
    if (!r.general && !r.sources.photos && !r.sources.texts) toast('V zvezku ni prebranih zapiskov – odgovor je splošen.', true);
    if (web && !r.web.length) toast('Na Wikipediji ni bilo zadetkov – odgovor je brez spletnih virov.');
    const ch = await api('/ai/chats'); D.chats = ch.chats;
  } catch (e) { A.msgs.pop(); if (e.message !== '__gate') toast(e.message, true); }
  A.busy = false; if (!opt.quiet) render();
  return reply;
}

async function aiOcr() {
  const n = nbOf(S.ai.nid), list = (D.ph || []).filter(p => p.nid === n.id && !p.hasOcr);
  modal(`${sheetHead('Branje zapiskov', 'AI bere fotografije in shrani prepis. Vsaka fotografija se prebere samo enkrat.', `<span class="ailogo">${ic('spark')}</span>`)}<div class="prog"><i id="ocr_p" style="width:0"></i></div><p class="sm" id="ocr_t">0 / ${list.length}</p>`);
  let i = 0;
  for (const p of list) {
    if ($('modal').classList.contains('hide')) break;
    try { await api('/ai/ocr', { id: p.id }); p.hasOcr = 1; D.aiUsed = (D.aiUsed || 0) + 1; } catch (e) { toast(e.message, true); break; }
    i++; const b = $('ocr_p'), t = $('ocr_t'); if (b) b.style.width = (i / list.length * 100) + '%'; if (t) t.textContent = `${i} / ${list.length}`;
  }
  closeModal(); render(); if (i) toast(`Prebrano: ${nphoto(i)}.`);
}

// ============================================================ ISKANJE
let SQ = { q: '', res: null, busy: false, tm: null };
function hl(t, q) { const e = esc(t); if (!q) return e; const i = e.toLowerCase().indexOf(esc(q).toLowerCase()); return i < 0 ? e : e.slice(0, i) + '<mark>' + e.slice(i, i + esc(q).length) + '</mark>' + e.slice(i + esc(q).length); }
function vSearch() {
  const q = SQ.q.trim(), ql = q.toLowerCase(), r = SQ.res && SQ.res.q === q ? SQ.res : null;
  const nbs = q.length >= 2 ? (D.nb || []).filter(n => n.name.toLowerCase().includes(ql) || n.teachers.some(t => t.toLowerCase().includes(ql))) : [];
  let body = '';
  if (q.length < 2) body = `<div class="card empty sm">Išči po zvezkih, snovi pri urah, opombah, rokih in <b>prebranih fotografijah</b> zapiskov.<br><span class="xs">Fotografije postanejo iskalne, ko jih v »Uči se« prebere AI.</span></div>`;
  else {
    const sec = (title, list) => list ? `<h2 class="h2">${title}</h2><div class="card list">${list}</div>` : '';
    body += sec('Zvezki', nbs.map(n => `<button class="it" style="width:100%;text-align:left" data-a="openNb" data-id="${n.id}">${sIc(n, 'sm')}<div class="grow"><b>${hl(n.name, q)}</b><div class="mut xs">${hl(n.teachers.join(', '), q)}</div></div></button>`).join(''));
    if (r) {
      body += sec('Ure in zapiski', r.ls.map(x => { const n = nbOf(x.nid), [d, h] = x.k.split('_'); return `<button class="it" style="width:100%;text-align:left" data-a="openLesson" data-d="${d}" data-h="${h}">${sIc(n, 'sm')}<div class="grow"><b class="sm">${esc(n?.name || '')} · ${fmtS(d)}, ${h}. ura</b><div class="mut xs">${hl(x.snip, q)}</div></div></button>`; }).join(''));
      body += sec('Fotografije zapiskov', r.ph.map(x => { const n = nbOf(x.nid); return `<button class="it" style="width:100%;text-align:left" data-a="openFound" data-id="${x.id}" data-nid="${x.nid}"><div class="ph" style="width:46px;flex-shrink:0;border-radius:10px"><img data-pid="${x.id}" alt=""></div><div class="grow"><b class="sm">${esc(n?.name || '')}${x.date ? ' · ' + fmtS(x.date) : ''}</b><div class="mut xs">${hl(x.snip, q)}</div></div></button>`; }).join(''));
      body += sec('Roki', r.items.map(itemRow).join(''));
      if (!nbs.length && !r.ls.length && !r.ph.length && !r.items.length) body += `<div class="card empty">Ni zadetkov za »${esc(q)}«.</div>`;
    } else body += `<div class="card empty sm">${SQ.busy ? 'Iščem …' : ''}</div>`;
  }
  return `<div class="h1" style="margin:6px 2px 4px">Iskanje</div><div class="sbox">${ic('search')}<input id="sq" class="inp" type="search" placeholder="npr. Pitagorov izrek, test, Novak …" value="${esc(SQ.q)}" data-c="sq" autocomplete="off" enterkeyhint="search" autofocus></div>${body}`;
}
function searchRun() {
  clearTimeout(SQ.tm); const q = SQ.q.trim();
  if (q.length < 2) { SQ.res = null; render(); return; }
  SQ.busy = true; render();
  SQ.tm = setTimeout(async () => { try { const r = await api('/search?q=' + encodeURIComponent(q)); if (SQ.q.trim() === q) { SQ.res = r; } } catch (e) { if (e.message !== '__gate') toast(e.message, true); } SQ.busy = false; if (S.view === 'search') render(); }, 350);
}

// ============================================================ FOKUS ČASOVNIK
const FKEY = 'dn2_focus';
let FT = (() => { try { return JSON.parse(localStorage.getItem(FKEY)) || {}; } catch { return {}; } })();
FT.work = FT.work || 25; FT.brk = FT.brk || 5;
const fSave = () => { try { localStorage.setItem(FKEY, JSON.stringify(FT)); } catch { } };
const focusLeft = () => !FT.phase ? FT.work * 60 : FT.paused != null ? FT.paused : Math.max(0, Math.round((FT.end - Date.now()) / 1000));
const fmtClock = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
function focusStart() { FT.phase = 'work'; FT.end = Date.now() + FT.work * 60000; FT.paused = null; fSave(); render(); }
function focusPause() { if (FT.paused != null) { FT.end = Date.now() + FT.paused * 1000; FT.paused = null; } else FT.paused = focusLeft(); fSave(); render(); }
function focusReset() { FT.phase = null; FT.paused = null; FT.end = null; fSave(); render(); document.title = 'DigitNotes'; }
async function focusDone() {
  const was = FT.phase;
  if (was === 'work') {
    try { await api('/focus/save', { nid: FT.nid || null, min: FT.work }); (D.focus = D.focus || []).unshift({ nid: FT.nid || null, min: FT.work, t: Date.now() }); } catch (e) { if (e.message !== '__gate') toast(e.message, true); }
    FT.phase = 'brk'; FT.end = Date.now() + FT.brk * 60000; notifyLocal('Odlično!', `${FT.work} minut učenja je za tabo. Zdaj ${FT.brk} minut odmora.`);
  } else { FT.phase = null; FT.end = null; notifyLocal('Odmor je končan', 'Pripravljen na naslednji krog?'); }
  FT.paused = null; fSave(); try { navigator.vibrate?.([200, 100, 200]); } catch { }
  if (S.view === 'focus' || S.view === 'home' || S.view === 'ai') render();
}
async function notifyLocal(title, body) { toast(title + ' ' + body); try { if (Notification.permission === 'granted') { const r = await navigator.serviceWorker?.getRegistration(); r ? r.showNotification(title, { body, icon: '../icon-192.png', tag: 'focus' }) : new Notification(title, { body }); } } catch { } }
function focusTick() {
  if (!FT.phase) return;
  const left = focusLeft();
  if (FT.paused == null && left <= 0) { focusDone(); return; }
  if (S.view === 'focus') { const t = $('f_t'), c = $('f_c'); const tot = (FT.phase === 'work' ? FT.work : FT.brk) * 60; if (t) t.textContent = fmtClock(left); if (c) c.style.strokeDashoffset = 722.6 * (left / tot); }
  document.title = (FT.phase === 'work' ? '⏱️ ' : '☕ ') + fmtClock(left) + ' · DigitNotes';
}
setInterval(focusTick, 1000);
function vFocus() {
  const left = focusLeft(), tot = (FT.phase === 'brk' ? FT.brk : FT.work) * 60, run = FT.phase && FT.paused == null;
  const f = D.focus || [], dayStart = pd(today()).getTime(), wk = pd(addD(today(), -wdOf(today()))).getTime();
  const sumT = f.filter(x => x.t >= dayStart).reduce((a, x) => a + x.min, 0), sumW = f.filter(x => x.t >= wk).reduce((a, x) => a + x.min, 0);
  const days = [...Array(7)].map((_, i) => { const d = addD(today(), i - 6), a = pd(d).getTime(), b = a + 864e5; return { d, m: f.filter(x => x.t >= a && x.t < b).reduce((s, x) => s + x.min, 0) }; });
  const mx = Math.max(30, ...days.map(x => x.m));
  const per = {}; f.filter(x => x.t >= Date.now() - 30 * 864e5).forEach(x => per[x.nid || ''] = (per[x.nid || ''] || 0) + x.min);
  const perL = Object.entries(per).sort((a, b) => b[1] - a[1]);
  const hm = m => m >= 60 ? `${Math.floor(m / 60)} h ${m % 60 ? (m % 60) + ' min' : ''}` : `${m} min`;
  return `<div class="row" style="margin:6px 2px 4px"><div class="h1 grow">Fokus</div><button class="btn btn-s btn-sm" data-a="go" data-v="ai">${ic('spark', 'ic-s')} Uči se</button></div>
  <p class="mut sm" style="margin:0 2px 8px">Uči se v kratkih, zbranih krogih (metoda Pomodoro). Telefon odloži in se posveti snovi.</p>
  <div class="card pad focus">
    <div class="fring ${FT.phase === 'brk' ? 'brk' : ''}"><svg width="250" height="250"><circle class="tr" cx="125" cy="125" r="115" stroke-width="14" fill="none"/><circle id="f_c" class="fg" cx="125" cy="125" r="115" stroke="url(#fg)" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="722.6" stroke-dashoffset="${722.6 * (left / tot)}"/><defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#0d9488"/></linearGradient></defs></svg>
      <div class="tm"><b id="f_t">${fmtClock(left)}</b><span>${!FT.phase ? 'pripravljen' : FT.phase === 'work' ? (FT.paused != null ? 'premor' : 'učenje') : 'odmor'}</span></div></div>
    <div class="row" style="margin-top:18px;gap:10px">${!FT.phase ? `<button class="btn btn-p" data-a="fStart" style="min-width:160px">${ic('play', 'ic-s')} Začni</button>` : `<button class="btn btn-s" data-a="fReset">${ic('stop', 'ic-s')} Ustavi</button><button class="btn btn-p" data-a="fPause" style="min-width:140px">${ic(run ? 'pause' : 'play', 'ic-s')} ${run ? 'Premor' : 'Nadaljuj'}</button>`}</div>
    ${!FT.phase ? `<div style="width:100%;margin-top:18px"><label class="lbl">Predmet</label><select class="inp" data-c="fNb"><option value="">Splošno</option>${(D.nb || []).map(n => `<option value="${n.id}" ${FT.nid === n.id ? 'selected' : ''}>${optN(n)}</option>`).join('')}</select>
    <label class="lbl" style="margin-top:12px">Dolžina</label><div class="seg">${[[25, 5], [45, 10], [15, 3]].map(([w, b]) => `<button class="${FT.work === w ? 'on' : ''}" data-a="fLen" data-w="${w}" data-b="${b}">${w} + ${b} min</button>`).join('')}</div></div>` : `<p class="mut sm" style="margin-top:12px">${FT.nid ? esc(nbOf(FT.nid)?.name || '') : 'Splošno'} · ${FT.work} + ${FT.brk} min</p>`}
  </div>
  <div class="stats" style="grid-template-columns:1fr 1fr;margin-top:12px"><div class="chip next">${hm(sumT)}<small>danes</small></div><div class="chip fire">${hm(sumW)}<small>ta teden</small></div></div>
  <h2 class="h2">${ic('chart')} Zadnjih 7 dni</h2><div class="card pad"><div class="fbar">${days.map(x => `<div><i style="height:${Math.round(x.m / mx * 100)}%" title="${x.m} min"></i><small>${['N', 'P', 'T', 'S', 'Č', 'P', 'S'][pd(x.d).getDay()]}</small></div>`).join('')}</div></div>
  ${perL.length ? `<h2 class="h2">Po predmetih (30 dni)</h2><div class="card">${perL.map(([nid, m]) => { const n = nbOf(nid); return `<div class="avg">${n ? sIc(n, 'sm') : tile('timer', 22, 88, 'sm')}<b class="sm" style="width:34%">${esc(n?.name || 'Splošno')}</b><div class="bar"><i style="width:${m / perL[0][1] * 100}%"></i></div><b class="sm" style="width:70px;text-align:right">${hm(m)}</b></div>`; }).join('')}</div>` : ''}
  ${FT.phase ? '<p class="hint" style="text-align:center;margin-top:12px">Časovnik teče tudi, če zapustiš ta zaslon. Ob koncu dobiš obvestilo, če je aplikacija odprta.</p>' : ''}`;
}

// ============================================================ UREJEVALNIK FOTOGRAFIJ (obreži, zasukaj)
function loadImg(src) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error('Slike ni mogoče prebrati.')); im.src = src; }); }
function editPhoto(file) {
  return new Promise(async resolve => {
    let srcUrl; try { srcUrl = URL.createObjectURL(file); } catch { return resolve(await resize(file)); }
    let img; try { img = await loadImg(srcUrl); } catch (e) { URL.revokeObjectURL(srcUrl); toast(e.message, true); return resolve(null); }
    let rot = 0; const ed = $('editor');
    ed.innerHTML = `<div class="top2"><button class="btn btn-sm" style="background:rgba(255,255,255,.12);color:#fff" data-e="cancel">Prekliči</button><span>Uredi fotografijo</span><button class="btn btn-sm btn-p" data-e="ok">Uporabi</button></div>
      <div class="stage" id="ed_st"><canvas id="ed_c"></canvas><div class="crop" id="ed_cr"><div class="g2"></div><span class="hd tl" data-h="tl"></span><span class="hd tr" data-h="tr"></span><span class="hd bl" data-h="bl"></span><span class="hd br" data-h="br"></span></div></div>
      <div class="bar2"><button class="btn btn-s btn-sm" data-e="rot">${ic('rot', 'ic-s')} Zasukaj</button><button class="btn btn-s btn-sm" data-e="full">Celotna slika</button><button class="btn btn-s btn-sm" data-e="skip">Brez urejanja</button></div>`;
    ed.classList.remove('hide');
    const st = $('ed_st'), cv = $('ed_c'), cr = $('ed_cr');
    let disp = { w: 0, h: 0, k: 1, ox: 0, oy: 0 }, box = { x: 0, y: 0, w: 0, h: 0 };
    const srcW = () => rot % 180 ? img.height : img.width, srcH = () => rot % 180 ? img.width : img.height;
    function draw() {
      const W = st.clientWidth - 24, H = st.clientHeight - 24, k = Math.min(W / srcW(), H / srcH(), 1.5);
      cv.width = Math.round(srcW() * k); cv.height = Math.round(srcH() * k);
      const x = cv.getContext('2d'); x.save(); x.translate(cv.width / 2, cv.height / 2); x.rotate(rot * Math.PI / 180); const dw = img.width * k, dh = img.height * k; x.drawImage(img, -dw / 2, -dh / 2, dw, dh); x.restore();
      disp = { w: cv.width, h: cv.height, k, ox: cv.offsetLeft, oy: cv.offsetTop };
      box = { x: disp.w * .04, y: disp.h * .04, w: disp.w * .92, h: disp.h * .92 }; place();
    }
    function place() { cr.style.left = disp.ox + box.x + 'px'; cr.style.top = disp.oy + box.y + 'px'; cr.style.width = box.w + 'px'; cr.style.height = box.h + 'px'; }
    let drag = null;
    cr.onpointerdown = e => { e.preventDefault(); cr.setPointerCapture(e.pointerId); drag = { h: e.target.dataset.h || 'move', x: e.clientX, y: e.clientY, b: { ...box } }; };
    cr.onpointermove = e => {
      if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y, b = { ...drag.b }, min = 40;
      if (drag.h === 'move') { b.x = Math.max(0, Math.min(disp.w - b.w, b.x + dx)); b.y = Math.max(0, Math.min(disp.h - b.h, b.y + dy)); }
      else {
        if (drag.h.includes('l')) { const nx = Math.max(0, Math.min(b.x + b.w - min, b.x + dx)); b.w += b.x - nx; b.x = nx; }
        if (drag.h.includes('r')) b.w = Math.max(min, Math.min(disp.w - b.x, b.w + dx));
        if (drag.h.includes('t')) { const ny = Math.max(0, Math.min(b.y + b.h - min, b.y + dy)); b.h += b.y - ny; b.y = ny; }
        if (drag.h.includes('b')) b.h = Math.max(min, Math.min(disp.h - b.y, b.h + dy));
      }
      box = b; place();
    };
    cr.onpointerup = cr.onpointercancel = () => drag = null;
    const onRs = () => draw(); addEventListener('resize', onRs);
    const finish = v => { removeEventListener('resize', onRs); ed.classList.add('hide'); ed.innerHTML = ''; URL.revokeObjectURL(srcUrl); resolve(v); };
    ed.onclick = async e => {
      const a = e.target.closest('[data-e]')?.dataset.e; if (!a) return;
      if (a === 'cancel') return finish(null);
      if (a === 'rot') { rot = (rot + 90) % 360; draw(); return; }
      if (a === 'full') { box = { x: 0, y: 0, w: disp.w, h: disp.h }; place(); return; }
      if (a === 'skip') return finish(await resize(file));
      if (a === 'ok') {
        const full = document.createElement('canvas'); full.width = srcW(); full.height = srcH();
        const fx = full.getContext('2d'); fx.fillStyle = '#fff'; fx.fillRect(0, 0, full.width, full.height); fx.translate(full.width / 2, full.height / 2); fx.rotate(rot * Math.PI / 180); fx.drawImage(img, -img.width / 2, -img.height / 2);
        const sx = box.x / disp.k, sy = box.y / disp.k, sw = box.w / disp.k, sh = box.h / disp.k, M = 1600, kk = Math.min(1, M / Math.max(sw, sh));
        const out = document.createElement('canvas'); out.width = Math.round(sw * kk); out.height = Math.round(sh * kk);
        const ox = out.getContext('2d'); ox.fillStyle = '#fff'; ox.fillRect(0, 0, out.width, out.height); ox.drawImage(full, sx, sy, sw, sh, 0, 0, out.width, out.height);
        let q = .76, d = out.toDataURL('image/jpeg', q); while (d.length > 1_900_000 && q > .35) { q -= .1; d = out.toDataURL('image/jpeg', q); }
        return finish(d);
      }
    };
    requestAnimationFrame(draw);
  });
}

// ============================================================ TEMA
function setTheme(t) {
  try { localStorage.setItem('dn2_theme', t); } catch { }
  if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
  const dark = t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#08100e' : '#f2f5f4');
}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { let t = 'auto'; try { t = localStorage.getItem('dn2_theme') || 'auto'; } catch { } if (t === 'auto') setTheme('auto'); });

// ============================================================ OCENE
function gradeNum(g) { const m = /^\s*([1-5])\s*([+-])?/.exec(String(g)); return m ? +m[1] + (m[2] === '+' ? .25 : m[2] === '-' ? -.25 : 0) : null; }
function avgOf(list) { const n = list.map(gradeNum).filter(x => x != null); return n.length ? (n.reduce((a, b) => a + b, 0) / n.length).toFixed(2).replace('.', ',') : ''; }
function gradeLegend() { return `<div class="glegend">${GT.map(([v, l, c]) => `<span><i class="gd ${c}"></i>${l}</span>`).join('')}</div>`; }
function vGrades() {
  const gs = (D.ls || []).filter(l => l.grade);
  const by = {}; gs.forEach(g => (by[g.nid] = by[g.nid] || []).push(g));
  const all = avgOf(gs.map(g => g.grade));
  if (!gs.length) return `<div class="h1" style="margin:6px 2px 14px">Ocene</div><div class="card empty">${tile('s_star', 40, 90, 'lg')}<div style="margin-top:10px">Še nimaš vpisanih ocen.</div><span class="sm">Oceno dodaš pri vpisu ure (»Ocena« ali »Ura z zapiski« → Dodaj oceno).</span></div>`;
  const cnt = c => gs.filter(g => gcat(g.gtype) === c).length;
  return `<div class="h1" style="margin:6px 2px 14px">Ocene</div>
  <div class="card pad gsum"><div><div class="mut sm">Skupno povprečje</div><div class="gbig">${all || '–'}</div><div class="mut xs">${pl(gs.length, 'ocena', 'oceni', 'ocene', 'ocen')} · številčne ocene 1–5</div></div>
    <div class="gsplit">${GT.map(([v, l, c]) => `<div><i class="gd ${c}"></i><b>${avgOf(gs.filter(g => gcat(g.gtype) === c).map(g => g.grade)) || '–'}</b><small>${l.replace(' ocena', '')} · ${cnt(c)}</small></div>`).join('')}</div></div>
  <h2 class="h2">Po predmetih</h2>
  <div class="gsubj">${Object.entries(by).sort((a, b) => (nbOf(a[0])?.name || '').localeCompare(nbOf(b[0])?.name || '')).map(([nid, l]) => { const n = nbOf(nid), a = avgOf(l.map(x => x.grade)); return `<button class="card gsub" data-a="openGrades" data-id="${nid}">${sIc(n || { name: '?' })}<div class="grow" style="min-width:0"><b>${esc(n?.name || '(izbrisan)')}</b><div class="gchips">${l.sort((x, y) => x.k.localeCompare(y.k)).map(g => gChip(g)).join('')}</div></div><div class="gavg">${a || '–'}<small>povp.</small></div>${ic('r', 'ic-s')}</button>`; }).join('')}</div>
  ${gradeLegend()}`;
}
function vGrade() {
  const n = nbOf(S.gnid), gs = (D.ls || []).filter(l => l.grade && l.nid === S.gnid).sort((a, b) => b.k.localeCompare(a.k));
  if (!gs.length) { S.view = 'grades'; return vGrades(); }
  const a = avgOf(gs.map(g => g.grade));
  return `<button class="btn btn-s btn-sm" style="margin:4px 0 12px" data-a="go" data-v="grades">${ic('l', 'ic-s')} Ocene</button>
  <div class="row" style="margin-bottom:16px;gap:14px">${sIc(n || { name: '?' }, 'xl')}<div class="grow"><div class="h1">${esc(n?.name || '(izbrisan)')}</div><div class="mut sm">${pl(gs.length, 'ocena', 'oceni', 'ocene', 'ocen')}${n?.teachers?.length ? ' · ' + esc(n.teachers.join(', ')) : ''}</div></div></div>
  <div class="card pad gsum"><div><div class="mut sm">Povprečje</div><div class="gbig">${a || '–'}</div></div>
    <div class="gsplit">${GT.map(([v, l, c]) => { const x = gs.filter(g => gcat(g.gtype) === c); return `<div><i class="gd ${c}"></i><b>${avgOf(x.map(g => g.grade)) || '–'}</b><small>${l.replace(' ocena', '')} · ${x.length}</small></div>`; }).join('')}</div></div>
  ${GT.map(([v, l, c]) => { const x = gs.filter(g => gcat(g.gtype) === c); return x.length ? `<h2 class="h2"><i class="gd ${c}"></i>${{ u: 'Ustne ocene', p: 'Pisne ocene', d: 'Druge ocene' }[c]}</h2><div class="card list">${x.map(g => { const [d, h] = g.k.split('_'); return `<button class="it" style="width:100%;text-align:left" data-a="openLesson" data-d="${d}" data-h="${h}">${gChip(g, true)}<div class="grow"><b class="sm">${fmtD(d)}</b><div class="mut xs">${h}. ura${g.note ? ' · ' + esc(g.note.split('\n')[0].slice(0, 80)) : ''}</div></div>${ic('r', 'ic-s')}</button>`; }).join('')}</div>` : ''; }).join('')}
  ${gradeLegend()}`;
}

// ============================================================ OBVESTILA
let IBOPEN = false, IBSEL = null;
function openInbox() { IBOPEN = true; IBSEL = null; renderInbox(); }
function renderInbox() {
  const list = D.inbox || [];
  if (IBSEL) { const m = list.find(x => x.id === IBSEL); if (m) return modal(`${sheetHead(esc(m.title), fmtT(m.t))}<p style="white-space:pre-wrap;margin-bottom:18px">${esc(m.text)}</p><div class="row" style="justify-content:space-between"><button class="btn btn-s" data-a="ibBack">${ic('l', 'ic-s')} Nazaj</button><button class="btn btn-d" data-a="ibDel" data-id="${m.id}">${ic('trash', 'ic-s')} Izbriši</button></div>`, { onClose: () => IBOPEN = false }); }
  modal(`${sheetHead('Obvestila')}${list.length ? `<div class="card list">${list.map(m => `<button class="it" style="width:100%;text-align:left;${m.read ? '' : 'background:var(--g50)'}" data-a="ibRead" data-id="${m.id}"><span style="width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${m.read ? 'transparent' : 'var(--g500)'}"></span><div class="grow" style="min-width:0"><b class="sm" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(m.title)}</b><div class="mut xs" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(m.text)}</div><div class="mut xs">${fmtT(m.t)}</div></div></button>`).join('')}</div>${list.some(m => !m.read) ? `<button class="btn btn-s btn-sm" style="margin-top:12px" data-a="ibAll">${ic('check', 'ic-s')} Označi vse kot prebrano</button>` : ''}` : '<div class="empty">Nimaš obvestil.</div>'}`, { onClose: () => IBOPEN = false });
}
let POLL = null;
function startPolling() { stopPolling(); POLL = setInterval(pollInbox, 60000); }
function stopPolling() { if (POLL) clearInterval(POLL); POLL = null; }
async function pollInbox() {
  if (document.hidden || !U || U.role === 'admin') return;
  try { const r = await api('/inbox'), before = (D.inbox || []).filter(m => !m.read).length; D.inbox = r.inbox; const un = r.inbox.filter(m => !m.read).length; if (un > before) toast('Novo obvestilo: ' + r.inbox.find(m => !m.read).title); if (un !== before && $('modal').classList.contains('hide')) render(); else if (IBOPEN) renderInbox(); setBadge(un); } catch { }
}
function setBadge(n) { try { if (navigator.setAppBadge) n ? navigator.setAppBadge(n) : navigator.clearAppBadge(); } catch { } }
document.addEventListener('visibilitychange', () => { if (!document.hidden && U && U.role !== 'admin') { pollInbox(); if (S.view === 'home' || S.view === 'sched') render(); } });
navigator.serviceWorker?.addEventListener('message', e => { if (e.data === 'push') pollInbox(); });

// ============================================================ PUSH
const b64u2buf = x => { const p = '='.repeat((4 - x.length % 4) % 4), b = atob((x + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, c => c.charCodeAt(0)); };
const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && (!isIOS() || isApp());
let PUSHERR = '';
async function pushSync(ask) {
  if (!pushSupported() || !CFG.vapid) return;
  if (Notification.permission !== 'granted') { if (!ask) return; const r = await Notification.requestPermission(); if (r !== 'granted') { toast('Obvestila niso dovoljena. Vklopiš jih v nastavitvah naprave.', true); render(); return; } }
  try {
    const reg = await navigator.serviceWorker.ready; let sub = await reg.pushManager.getSubscription();
    if (sub) { const cur = new Uint8Array(sub.options.applicationServerKey || []), want = b64u2buf(CFG.vapid); if (cur.length !== want.length || cur.some((v, i) => v !== want[i])) { await sub.unsubscribe(); sub = null; } }
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u2buf(CFG.vapid) });
    const r = await api('/push/sub', { sub: sub.toJSON() }); localStorage.setItem('dn2_push', r.id); PUSHERR = '';
    if (ask) { toast('Obvestila so vklopljena.'); render(); }
  } catch (e) { PUSHERR = (e.name || '') + ' ' + (e.message || ''); if (ask) toast('Vklop obvestil ni uspel: ' + e.message, true); }
}
function notifCard() {
  if (!pushSupported() || !CFG.vapid || Notification.permission !== 'default' || localStorage.getItem('dn2_nonotif')) return '';
  return `<div class="notice g" style="margin-bottom:14px">${ic('bell')}<div class="grow sm"><b>Vklopi obvestila</b><br>Opomnik ob koncu ure, roki in sporočila – tudi ko je aplikacija zaprta.</div><div class="row" style="flex-direction:column;gap:6px"><button class="btn btn-p btn-sm" data-a="pushOn">Vklopi</button><button class="linkbtn xs" data-a="noNotif">Ne zdaj</button></div></div>`;
}

// ============================================================ NASTAVITVE
function vSet() {
  const tabs = U.role === 'admin' ? [['ac', 'Račun', 'user']] : [['nb', 'Zvezki', 'book'], ['tt', 'Urnik', 'cal'], ['ac', 'Račun', 'user'], ['pr', 'Zasebnost', 'shield']];
  if (!tabs.find(t => t[0] === S.tab)) S.tab = tabs[0][0];
  return `<div class="h1" style="margin:6px 0 12px">Nastavitve</div><div class="row" style="gap:8px;overflow-x:auto;margin-bottom:16px">${tabs.map(([k, l, i]) => `<button class="btn btn-sm ${S.tab === k ? 'btn-k' : 'btn-s'}" data-a="setTab" data-t="${k}">${ic(i, 'ic-s')} ${l}</button>`).join('')}</div>` + ({ nb: setNb, tt: setTt, ac: setAc, pr: setPr }[S.tab])();
}
function setNb() {
  const l = D.nb || [];
  return `<div class="row" style="margin-bottom:10px"><b class="grow">Moji zvezki ${U.maxNb != null ? `<span class="mut sm">(${l.length}/${U.maxNb})</span>` : ''}</b><button class="btn btn-p btn-sm" data-a="nbForm">${ic('plus', 'ic-s')} Dodaj</button></div>
  ${l.length ? `<div class="card list">${l.map(n => `<div class="it">${sIc(n, 'sm')}<div class="grow"><b>${esc(n.name)}</b><div class="mut xs">${esc(n.teachers.join(', '))}</div></div><button class="btn btn-s btn-i" data-a="nbForm" data-id="${n.id}" aria-label="Uredi">${ic('edit', 'ic-s')}</button><button class="btn btn-d btn-i" data-a="delNb" data-id="${n.id}" aria-label="Izbriši">${ic('trash', 'ic-s')}</button></div>`).join('')}</div>` : '<div class="card empty">Ni zvezkov.</div>'}`;
}
let NF = { i: 'book', c: 6 };
function nfPicker() { return `<div id="nfp"><div class="row" style="gap:14px;margin-bottom:10px">${sIc({ emoji: `i:${NF.i}:${NF.c}` }, 'lg')}<div class="cpick">${HUES.map(([h, sa], i) => `<button type="button" class="${NF.c === i ? 'on' : ''}" style="--h:${h};--s:${sa}%" data-a="nfC" data-c="${i}" aria-label="Barva ${i + 1}"></button>`).join('')}</div></div><div class="ipick">${SUBJ.map(k => `<button type="button" class="${NF.i === k ? 'on' : ''}" data-a="nfIc" data-i="${k}" aria-label="${k}">${ic('s_' + k)}</button>`).join('')}</div></div>`; }
function nbForm(id) {
  const n = id ? nbOf(id) : {};
  modal(`${sheetHead(id ? 'Uredi zvezek' : 'Nov zvezek')}
  <div class="field"><label class="lbl" for="nf_n">Predmet / ime zvezka</label><input id="nf_n" class="inp" maxlength="60" value="${esc(n.name || '')}" placeholder="npr. Matematika" autofocus></div>
  <div class="field"><label class="lbl">Ikona in barva</label>${(() => { const o = subjOf(n.name ? n : { emoji: '', id: 'x', name: 'x' }); NF = { i: o.i || 'book', c: n.name ? o.c : SUBJ_C.book, cm: !!n.name }; return nfPicker(); })()}<input type="hidden" id="nf_e"></div>
  <div class="field"><label class="lbl" for="nf_t">Učitelji (ločeni z vejico)</label><input id="nf_t" class="inp" maxlength="300" value="${esc((n.teachers || []).join(', '))}" placeholder="npr. Novak, Kovač"><p class="hint">Vpiši samo priimek ali kratico – dovolj je za izbiro v urniku.</p></div>
  <div class="row" style="justify-content:flex-end"><button class="btn btn-s" data-a="closeModal">Prekliči</button><button class="btn btn-p" data-a="nbSave" data-id="${id || ''}">Shrani</button></div>`);
}
function setTt() {
  const opts = cur => `<option value="">— prosto —</option><option value="M" ${cur === 'M' ? 'selected' : ''}>Malica</option>` + (D.nb || []).flatMap(n => n.teachers.map(t => { const v = n.id + '|' + t; return `<option value="${esc(v)}" ${cur === v ? 'selected' : ''}>${optN(n)} – ${esc(t)}</option>`; })).join('');
  let rows = ''; for (let h = 1; h <= 9; h++) { rows += `<tr><td class="h">${h}.</td>`; for (let d = 0; d < 5; d++) { const s = (D.tt || []).find(x => x.d === d && x.h === h), cur = !s ? '' : s.malica ? 'M' : s.nid + '|' + s.teacher; rows += `<td><select class="inp" data-c="ttSet" data-d="${d}" data-h="${h}" aria-label="${DAYS[d]} ${h}. ura">${opts(cur)}</select></td>`; } rows += '</tr>'; }
  let times = ''; for (let h = 1; h <= 9; h++) { const t = tm(h); times += `<div class="row" style="margin-bottom:6px"><b style="width:26px;color:var(--mut2)">${h}.</b><input type="time" class="inp" style="width:auto" value="${t[0]}" data-c="timeSet" data-h="${h}" data-k="s"><span class="mut">–</span><input type="time" class="inp" style="width:auto" value="${t[1]}" data-c="timeSet" data-h="${h}" data-k="e"></div>`; }
  const off = (D.off || []).slice().sort();
  return `${!(D.nb || []).length ? '<div class="notice o sm" style="margin-bottom:12px">' + ic('info') + '<div>Najprej ustvari zvezke – v urniku izbiraš med njimi.</div></div>' : ''}
  <b>Tedenski urnik</b><p class="mut sm" style="margin-bottom:8px">Za vsako uro izberi predmet in učitelja.</p>
  <div class="card ttwrap" style="padding:6px;margin-bottom:22px"><table class="tt"><thead><tr><th></th>${DAYS.map(d => `<th>${d}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
  <b>Čas ur</b><p class="mut sm" style="margin-bottom:8px">Ko se ura konča in ni vpisana, se obarva rdeče. Prilagodi čase svoji šoli.</p>
  <div class="card pad" style="margin-bottom:22px">${times}<button class="btn btn-s btn-sm" style="margin-top:6px" data-a="timesReset">Privzeti časi</button></div>
  <b>Prosti dnevi</b><p class="mut sm" style="margin-bottom:8px">Počitnice, ekskurzije … Takrat aplikacija ne zahteva vpisa ur.</p>
  <div class="card pad"><div class="row-w" style="align-items:flex-end"><div><label class="lbl" for="of1">Od</label><input id="of1" type="date" class="inp"></div><div><label class="lbl" for="of2">Do</label><input id="of2" type="date" class="inp"></div><button class="btn btn-p" data-a="offAdd">Dodaj</button></div>
  <div class="row-w" style="margin-top:12px">${off.map(d => `<span class="tag">${fmtS(d)}<button data-a="offDel" data-d="${d}" aria-label="Odstrani">${ic('x', 'ic-s')}</button></span>`).join('') || '<span class="mut sm">Ni prostih dni.</span>'}</div></div>`;
}
function setAc() {
  const perm = 'Notification' in window ? Notification.permission : 'ni podprto', row = (ok, t) => `<div class="${ok ? 'y' : 'n'}">${ic(ok ? 'check' : 'x', 'ic-s')}<span>${t}</span></div>`;
  let th = 'auto'; try { th = localStorage.getItem('dn2_theme') || 'auto'; } catch { }
  return `<div class="card pad" style="margin-bottom:14px"><b>Videz</b><div class="themes" style="margin-top:10px">${[['auto', 'Samodejno', 'linear-gradient(135deg,#f2f5f4 50%,#121c19 50%)'], ['light', 'Svetlo', '#f2f5f4'], ['dark', 'Temno', '#121c19']].map(([k, l, bg]) => `<button class="${th === k ? 'on' : ''}" data-a="theme" data-t="${k}"><span class="sw2" style="background:${bg}"></span>${l}</button>`).join('')}</div><p class="hint">»Samodejno« sledi nastavitvi telefona.</p></div>
  <div class="card pad" style="margin-bottom:14px"><b>Profil</b>
    <div class="field" style="margin-top:10px"><label class="lbl" for="ac_n">Ime</label><input id="ac_n" class="inp" maxlength="80" value="${esc(U.name)}"></div>
    <div class="field"><label class="lbl" for="ac_u">Uporabniško ime</label><input id="ac_u" class="inp" maxlength="30" value="${esc(U.username)}" autocapitalize="none"></div>
    <button class="btn btn-p btn-sm" data-a="saveProfile">Shrani</button></div>
  <div class="card pad" style="margin-bottom:14px"><b>E-pošta</b><p class="mut sm">${esc(U.email)}</p>
    <div class="field" style="margin-top:10px"><label class="lbl" for="ac_e">Nov e-poštni naslov</label><input id="ac_e" type="email" class="inp" autocomplete="email"></div>
    <div class="field"><label class="lbl" for="ac_ep">Trenutno geslo</label><input id="ac_ep" type="password" class="inp" autocomplete="current-password"></div><button class="btn btn-s btn-sm" data-a="saveEmail">Spremeni e-pošto</button></div>
  <div class="card pad" style="margin-bottom:14px"><b>Geslo</b>
    <div class="field" style="margin-top:10px"><label class="lbl" for="ac_o">Trenutno geslo</label><input id="ac_o" type="password" class="inp" autocomplete="current-password"></div>
    <div class="field"><label class="lbl" for="ac_p">Novo geslo (vsaj 8 znakov)</label><input id="ac_p" type="password" class="inp" autocomplete="new-password"></div><button class="btn btn-s btn-sm" data-a="savePw">Spremeni geslo</button>
    <p class="hint">Ob spremembi gesla se odjaviš z vseh drugih naprav.</p></div>
  ${U.role !== 'admin' ? `<div class="card pad" style="margin-bottom:14px"><b>Obvestila</b>
    <label class="row" style="justify-content:space-between;padding:12px 0"><span class="sm">Opomnik ob koncu vsake ure</span><span class="sw"><input type="checkbox" data-c="setOpt" data-k="remind" ${U.remind ? 'checked' : ''}><span></span></span></label>
    <label class="row" style="justify-content:space-between;padding:12px 0;border-top:1px solid var(--line2)"><span class="sm">Obvestila o storitvi po e-pošti<br><span class="mut xs">Kode za geslo prejmeš vedno.</span></span><span class="sw"><input type="checkbox" data-c="setOpt" data-k="emailOpt" ${U.emailOpt ? 'checked' : ''}><span></span></span></label>
    ${U.ai.on ? `<label class="row" style="justify-content:space-between;padding:12px 0;border-top:1px solid var(--line2)"><span class="sm">AI pomočnik (privolitev)</span><span class="sw"><input type="checkbox" data-c="setOpt" data-k="aiConsent" ${U.ai.consent ? 'checked' : ''}><span></span></span></label>` : ''}
    <div class="diag" style="margin:10px 0;padding:10px;border-radius:12px;background:var(--fill);border:1px solid var(--line)"><div class="b xs" style="color:var(--ink2)">Stanje obvestil na tej napravi</div>
      ${row(isApp() || !isIOS(), isApp() ? 'Aplikacija je nameščena' : isIOS() ? 'Na iPhonu jo moraš dodati na domači zaslon' : 'Brskalnik')}${row(perm === 'granted', 'Dovoljenje: ' + perm)}${row(!!navigator.serviceWorker?.controller, 'Service worker aktiven')}${row(!!localStorage.getItem('dn2_push'), 'Naprava prijavljena za push')}${PUSHERR ? `<div class="n xs">${esc(PUSHERR)}</div>` : ''}</div>
    <div class="row-w">${perm !== 'granted' ? `<button class="btn btn-p btn-sm" data-a="pushOn">${ic('bell', 'ic-s')} Vklopi obvestila</button>` : ''}<button class="btn btn-s btn-sm" data-a="pushTest">Pošlji testno obvestilo</button></div></div>` : ''}
  <button class="btn btn-s btn-w" data-a="logout">${ic('out', 'ic-s')} Odjava</button>
  <p class="mut xs" style="text-align:center;margin-top:12px">DigitNotes ${VER}</p>`;
}
function setPr() {
  return `<div class="card pad" style="margin-bottom:14px"><b>Moji podatki</b><p class="mut sm" style="margin:6px 0 12px">Prenesi kopijo vseh svojih podatkov (profil, urnik, ure, ocene, roki, pogovori z AI, privolitve) in vseh fotografij v datoteki ZIP.</p>
    <button class="btn btn-p btn-sm" data-a="exportData">${ic('dl', 'ic-s')} Prenesi moje podatke</button><div id="exp_p"></div></div>
  <div class="card pad" style="margin-bottom:14px"><b>Privolitve</b><div class="list" style="margin-top:6px">
    <div class="it" style="padding-left:0"><span class="grow sm">Pogoji uporabe in politika zasebnosti</span><span class="pill g">sprejeto</span></div>
    ${U.parentEmail ? `<div class="it" style="padding-left:0"><span class="grow sm">Privolitev starša (${esc(U.parentEmail)})</span><span class="pill g">dana</span></div>` : ''}
    <div class="it" style="padding-left:0"><span class="grow sm">AI pomočnik</span><span class="pill ${U.ai.consent ? 'g' : ''}">${U.ai.consent ? 'vklopljen' : 'izklopljen'}</span></div>
    <div class="it" style="padding-left:0"><span class="grow sm">Push obvestila</span><span class="pill ${'Notification' in window && Notification.permission === 'granted' ? 'g' : ''}">${'Notification' in window && Notification.permission === 'granted' ? 'dovoljena' : 'niso dovoljena'}</span></div></div>
    <p class="hint">Privolitve spreminjaš v zavihku Račun. Dovoljenje za obvestila prekličeš v nastavitvah naprave.</p></div>
  <div class="card pad" style="margin-bottom:14px"><b>Statistika fokusa</b><p class="mut sm" style="margin:6px 0 12px">Čas učenja s fokus časovnikom (zadnjih 60 dni je vidnih v aplikaciji).</p><button class="btn btn-s btn-sm" data-a="focusDel">${ic('trash', 'ic-s')} Izbriši statistiko fokusa</button></div>
  <div class="card pad" style="margin-bottom:14px"><b>Dokumenti</b><div class="row-w" style="margin-top:10px"><a class="btn btn-s btn-sm" href="${SITE}zasebnost.html" target="_blank" rel="noopener">Politika zasebnosti</a><a class="btn btn-s btn-sm" href="${SITE}pogoji.html" target="_blank" rel="noopener">Pogoji uporabe</a></div>
    <p class="hint">Vprašanja o zasebnosti: <a href="mailto:${esc(window.DN_CONTACT || '')}">${esc(window.DN_CONTACT || '')}</a>. Pritožbo lahko vložiš tudi pri Informacijskem pooblaščencu RS (ip-rs.si).</p></div>
  <div class="card pad" style="border-color:var(--red200)"><b style="color:var(--red600)">Izbriši račun</b><p class="mut sm" style="margin:6px 0 12px">Račun in vsi podatki (zvezki, fotografije, ocene, pogovori) bodo <b>takoj in trajno izbrisani</b>. Tega ni mogoče razveljaviti.</p>
    <div class="field"><label class="lbl" for="del_p">Za potrditev vpiši geslo</label><input id="del_p" type="password" class="inp" autocomplete="current-password"></div><button class="btn btn-d btn-sm" data-a="deleteMe">${ic('trash', 'ic-s')} Trajno izbriši račun</button></div>`;
}
// ---- izvoz podatkov v ZIP (lasten zapis ZIP brez zunanjih knjižnic)
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function zip(files) {
  const te = new TextEncoder(), parts = [], cen = []; let off = 0;
  const nd = new Date(), dtime = (nd.getHours() << 11) | (nd.getMinutes() << 5) | (nd.getSeconds() >> 1), ddate = ((nd.getFullYear() - 1980) << 9) | ((nd.getMonth() + 1) << 5) | nd.getDate();
  for (const f of files) {
    const name = te.encode(f.name), data = typeof f.data === 'string' ? te.encode(f.data) : f.data, crc = crc32(data);
    const h = new DataView(new ArrayBuffer(30)); h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(10, dtime, true); h.setUint16(12, ddate, true); h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true);
    parts.push(new Uint8Array(h.buffer), name, data);
    const c = new DataView(new ArrayBuffer(46)); c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(12, dtime, true); c.setUint16(14, ddate, true); c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
    cen.push(new Uint8Array(c.buffer), name); off += 30 + name.length + data.length;
  }
  const cs = cen.reduce((a, b) => a + b.length, 0), e = new DataView(new ArrayBuffer(22)); e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cs, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...cen, new Uint8Array(e.buffer)], { type: 'application/zip' });
}
async function exportData() {
  const box = $('exp_p'); box.innerHTML = '<div class="prog"><i id="exp_i" style="width:5%"></i></div><p class="sm" id="exp_t">Pripravljam …</p>';
  try {
    const d = await api('/me/export'), files = [{ name: 'podatki.json', data: JSON.stringify(d, null, 2) }], nbn = {}; (d.nb || []).forEach(n => nbn[n.id] = nodia(n.name).replace(/\W+/g, '_'));
    files.push({ name: 'PREBERI.txt', data: 'Izvoz podatkov DigitNotes (' + d.exportedAt + ')\r\n\r\npodatki.json – vsi tvoji podatki v strojno berljivi obliki (JSON)\r\nfotografije/ – vse fotografije zapiskov po zvezkih\r\n' });
    let i = 0; for (const p of d.ph) { i++; try { files.push({ name: `fotografije/${nbn[p.nid] || 'zvezek'}/${p.date || ''}_${p.id}.jpg`, data: await photoBytes(p.id) }); } catch { } const b = $('exp_i'), t = $('exp_t'); if (b) b.style.width = (5 + i / d.ph.length * 90) + '%'; if (t) t.textContent = `Fotografije ${i}/${d.ph.length}`; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(zip(files)); a.download = `DigitNotes_${U.username}_${today()}.zip`; a.click();
    box.innerHTML = '<p class="sm" style="color:var(--g700);margin-top:8px">✓ Datoteka je prenesena.</p>';
  } catch (e) { box.innerHTML = `<div class="err" style="margin-top:8px">${esc(e.message)}</div>`; }
}

// ============================================================ ROKI
function itemForm(id) {
  const it = id ? (D.items || []).find(x => x.id === id) : { kind: 'test', due: addD(today(), 1) };
  modal(`${sheetHead(id ? 'Uredi rok' : 'Nov rok', 'Dan prej ob 17:00 dobiš opomnik.')}
  <div class="field"><div class="seg">${[['test', 'Test'], ['hw', 'Naloga'], ['other', 'Drugo']].map(([k, l]) => `<button type="button" class="${it.kind === k ? 'on' : ''}" data-a="itKind" data-k="${k}">${l}</button>`).join('')}</div><input type="hidden" id="it_k" value="${it.kind}"></div>
  <div class="field"><label class="lbl" for="it_t">Opis</label><input id="it_t" class="inp" maxlength="200" value="${esc(it.title || '')}" placeholder="npr. Test iz kvadratne funkcije" autofocus></div>
  <div class="row"><div class="field grow"><label class="lbl" for="it_n">Predmet</label><select id="it_n" class="inp"><option value="">—</option>${(D.nb || []).map(n => `<option value="${n.id}" ${it.nid === n.id ? 'selected' : ''}>${optN(n)}</option>`).join('')}</select></div><div class="field"><label class="lbl" for="it_d">Datum</label><input id="it_d" type="date" class="inp" value="${it.due}"></div></div>
  <div class="row" style="justify-content:space-between">${id ? `<button class="btn btn-d" data-a="itDel" data-id="${id}">${ic('trash', 'ic-s')}</button>` : '<span></span>'}<button class="btn btn-p" data-a="itSave" data-id="${id || ''}">Shrani</button></div>`);
}

// ============================================================ ADMINISTRATOR
async function loadAdmin() { const [u, s, st] = await Promise.all([api('/admin/users'), api('/admin/sent'), api('/admin/stats')]); A.users = u.users; A.sent = s.sent; A.stats = st; }
const mb = b => (b / 1048576).toFixed(1).replace('.', ',') + ' MB';
const since = t => { if (!t) return 'nikoli'; const d = Math.floor((Date.now() - t) / 864e5); return d < 1 ? 'danes' : d === 1 ? 'včeraj' : `pred ${d} dnevi`; };
function vAdmin() {
  const us = A.users.filter(u => u.role === 'user');
  return `<div class="row" style="margin:6px 0 6px"><div class="h1 grow">Uporabniki</div><button class="btn btn-p btn-sm" data-a="userForm">${ic('plus', 'ic-s')} Dodaj</button></div>
  <div class="notice b sm" style="margin:10px 0 14px">${ic('shield')}<div>Zaradi varstva podatkov administrator <b>ne vidi</b> zapiskov, fotografij, ocen in pogovorov uporabnikov – samo podatke o računu.</div></div>
  ${us.length ? `<div class="card list">${us.map(u => `<div class="it" style="flex-wrap:wrap"><div class="grow" style="min-width:200px"><b>${esc(u.name)}</b> <span class="mut sm">@${esc(u.username)}</span><div class="mut xs">${esc(u.email)}</div>
    <div class="row-w" style="gap:5px;margin-top:5px">${statusPill(u)}${u.minor ? '<span class="pill">&lt;15</span>' : ''}<span class="pill">${pl(u.nbs, 'zvezek', 'zvezka', 'zvezki', 'zvezkov')} · ${nphoto(u.phs)} · ${mb(u.bytes)}</span>${u.ai_on ? `<span class="pill g">AI ${u.ai_used || 0}/${u.ai_limit}${u.ai_consent ? '' : ' (ni privolitve)'}</span>` : ''}${u.devices ? `<span class="pill">${ic('bell', 'ic-s')} ${u.devices}</span>` : ''}<span class="pill">aktiven ${since(u.last_active)}</span></div></div>
    <button class="btn btn-s btn-i" data-a="msgForm" data-id="${u.id}" title="Sporočilo">${ic('send', 'ic-s')}</button><button class="btn btn-s btn-i" data-a="userForm" data-id="${u.id}" title="Uredi">${ic('edit', 'ic-s')}</button><button class="btn btn-d btn-i" data-a="delUser" data-id="${u.id}" title="Izbriši">${ic('trash', 'ic-s')}</button></div>`).join('')}</div>` : '<div class="card empty">Še ni uporabnikov.</div>'}`;
}
function statusPill(u) { return u.status === 'active' ? '<span class="pill g">aktiven</span>' : u.status === 'parent' ? '<span class="pill o">čaka starša</span>' : '<span class="pill">še ni potrdil</span>'; }
function userForm(id) {
  const u = id ? A.users.find(x => x.id === id) : { ai_limit: 60 };
  modal(`${sheetHead(id ? 'Uredi uporabnika' : 'Nov uporabnik')}
  <div class="field"><label class="lbl" for="uf_n">Ime in priimek</label><input id="uf_n" class="inp" value="${esc(u.name || '')}" autofocus></div>
  <div class="field"><label class="lbl" for="uf_e">E-pošta</label><input id="uf_e" type="email" class="inp" value="${esc(u.email || '')}"></div>
  <div class="field"><label class="lbl" for="uf_u">Uporabniško ime</label><input id="uf_u" class="inp" value="${esc(u.username || '')}" autocapitalize="none"></div>
  ${!id ? `<label class="chk" style="margin-bottom:12px"><input type="checkbox" id="uf_inv" checked><span>Pošlji vabilo po e-pošti <span class="mut xs">(uporabnik si sam nastavi geslo prek »Pozabljeno geslo«)</span></span></label>` : ''}
  <div class="field"><label class="lbl" for="uf_p">${id ? 'Ponastavi geslo (neobvezno)' : 'Začasno geslo (neobvezno)'}</label><input id="uf_p" class="inp" autocomplete="off" placeholder="vsaj 8 znakov"><p class="hint">Uporabnik ga bo moral ob prvi prijavi zamenjati. Gesel ne pošiljaj po e-pošti.</p></div>
  <div class="row"><div class="field grow"><label class="lbl" for="uf_m">Največ zvezkov</label><input id="uf_m" type="number" min="0" class="inp" placeholder="brez omejitve" value="${u.max_nb ?? ''}"></div><div class="field grow"><label class="lbl" for="uf_al">AI uporab / mesec</label><input id="uf_al" type="number" min="0" class="inp" value="${u.ai_limit ?? 60}"></div></div>
  <label class="chk" style="margin-bottom:16px"><input type="checkbox" id="uf_ai" ${u.ai_on ? 'checked' : ''}><span>Omogoči AI pomočnika <span class="mut xs">(uporabnik ga mora še sam vklopiti)</span></span></label>
  <div class="row" style="justify-content:space-between">${id ? `<button class="btn btn-s btn-sm" data-a="userLogout" data-id="${id}">Odjavi z vseh naprav</button>` : '<span></span>'}<button class="btn btn-p" data-a="userSave" data-id="${id || ''}">Shrani</button></div>`);
}
function vAdminMsg() {
  return `<div class="row" style="margin:6px 0 14px"><div class="h1 grow">Sporočila</div><button class="btn btn-p btn-sm" data-a="msgForm">${ic('send', 'ic-s')} Novo</button></div>
  ${A.sent.length ? `<div class="card list">${A.sent.map(m => { const to = JSON.parse(m.to_json || '[]'); return `<div class="it" style="align-items:flex-start"><div class="grow"><b>${esc(m.title)}</b>${m.email ? ' <span class="pill">✉ e-pošta</span>' : ''}<p class="sm" style="white-space:pre-wrap;margin:4px 0">${esc(m.text)}</p><div class="mut xs">${fmtT(m.t)} · ${m.all_users ? 'vsi uporabniki' : to.map(id => A.users.find(u => u.id === id)?.name || '(izbrisan)').join(', ')}</div></div><button class="btn btn-d btn-i" data-a="delSent" data-id="${m.id}" title="Umakni">${ic('trash', 'ic-s')}</button></div>`; }).join('')}</div>` : '<div class="card empty">Še ni poslanih sporočil.</div>'}`;
}
function msgForm(pre) {
  const us = A.users.filter(u => u.role === 'user'); if (!us.length) return toast('Ni uporabnikov.', true);
  modal(`${sheetHead('Novo sporočilo')}
  <div class="field"><label class="lbl" for="mf_t">Naslov</label><input id="mf_t" class="inp" maxlength="120" autofocus></div>
  <div class="field"><label class="lbl" for="mf_x">Besedilo</label><textarea id="mf_x" class="inp" rows="5" maxlength="4000"></textarea></div>
  <div class="field"><label class="lbl">Prejemniki</label><div class="seg" style="margin-bottom:8px"><button type="button" class="${pre ? '' : 'on'}" data-a="mfMode" data-m="all">Vsi (${us.length})</button><button type="button" class="${pre ? 'on' : ''}" data-a="mfMode" data-m="sel">Izbrani</button></div>
    <div id="mf_l" class="card ${pre ? '' : 'hide'}" style="max-height:200px;overflow-y:auto;padding:8px">${us.map(u => `<label class="chk" style="padding:5px"><input type="checkbox" class="mf_c" value="${u.id}" ${u.id === pre ? 'checked' : ''}><span>${esc(u.name)} <span class="mut xs">@${esc(u.username)}</span></span></label>`).join('')}</div><input type="hidden" id="mf_m" value="${pre ? 'sel' : 'all'}"></div>
  <label class="chk" style="margin-bottom:8px"><input type="checkbox" id="mf_e"><span>Pošlji tudi po e-pošti</span></label>
  <p class="hint" style="margin-bottom:14px">Sporočilo se prikaže v aplikaciji in kot push obvestilo. Po e-pošti dobijo le uporabniki, ki tega niso izklopili. Pošiljaj samo obvestila o storitvi – za oglasna sporočila bi potreboval posebno privolitev (ZEKom-2).</p>
  <div class="row" style="justify-content:flex-end"><button class="btn btn-s" data-a="closeModal">Prekliči</button><button class="btn btn-p" data-a="sendMsg">${ic('send', 'ic-s')} Pošlji</button></div>`);
}
function vAdminSys() {
  const s = A.stats || {};
  return `<div class="h1" style="margin:6px 0 14px">Sistem</div>
  <div class="stats" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))"><div class="card pad"><div class="mut xs">Uporabniki</div><div class="h1">${s.users ?? '–'}</div></div><div class="card pad"><div class="mut xs">Fotografije</div><div class="h1">${s.photos ?? '–'}</div><div class="mut xs">${mb(s.bytes || 0)}</div></div><div class="card pad"><div class="mut xs">Naprave (push)</div><div class="h1">${s.devices ?? '–'}</div></div><div class="card pad"><div class="mut xs">Push v čakanju</div><div class="h1">${s.queue ?? '–'}</div></div></div>
  <h2 class="h2">Prostor za fotografije</h2><div class="card pad">${(s.shards || []).map(x => `<div class="row" style="margin-bottom:8px"><b style="width:40px">${esc(x.shard)}</b><div class="bar"><i style="width:${Math.min(100, x.b / 4.8e8 * 100)}%;${x.b > 4e8 ? 'background:#f97316' : ''}"></i></div><span class="sm" style="width:120px;text-align:right">${mb(x.b)} / 480 MB</span></div>`).join('') || '<span class="mut sm">Ni fotografij.</span>'}
  <p class="hint">Aktivna baza: <b>${esc(s.active || '')}</b>. Ko se približa 480 MB, ustvari novo bazo D1 (P1, P2 …) in jo nastavi kot PHOTO_ACTIVE – navodila v NAVODILA.md.</p></div>
  <h2 class="h2">E-pošta</h2><div class="card pad"><p class="sm">Pošlji testno sporočilo in preveri, ali pošiljanje deluje.</p>
    <div class="row" style="margin-top:10px"><input id="mt_to" class="inp grow" type="email" placeholder="${esc(U.email)}"><button class="btn btn-p btn-sm" data-a="mailTest">Pošlji test</button></div><div id="mt_out" class="sm" style="margin-top:10px"></div></div>
  <h2 class="h2">Uvoz iz DigitNotes 1</h2><div class="card pad"><p class="sm">Prenese uporabnike, zvezke, urnike, ure in fotografije iz stare baze Firebase. Gesla ostanejo enaka. Po uvozu <b>izbriši podatke v Firebase</b> (navodila v NAVODILA.md).</p>
    <div class="field" style="margin-top:10px"><label class="lbl" for="imp_u">Naslov stare baze</label><input id="imp_u" class="inp" value="https://digitnotes-bdeb7-default-rtdb.europe-west1.firebasedatabase.app"></div>
    <button class="btn btn-p btn-sm" data-a="importOld">Začni uvoz</button><div id="imp_s" class="sm" style="margin-top:10px"></div></div>
  <p class="mut xs" style="margin-top:14px">Različica pogojev: ${esc(s.terms || '')} · aplikacija ${VER}</p>`;
}
async function importOld() {
  const base = $('imp_u').value.trim().replace(/\/$/, ''), out = $('imp_s'), log = m => out.innerHTML += esc(m) + '<br>';
  out.innerHTML = '';
  try {
    log('Berem uporabnike …'); const all = await (await fetch(base + '/u.json')).json() || {};
    const ids = Object.keys(all).filter(k => all[k]?.profile); log(`Najdenih ${ids.length} uporabnikov.`);
    for (const id of ids) {
      const x = all[id];
      try { await api('/admin/import/user', { user: { id, ...x } }); } catch (e) { log('⚠ ' + x.profile.name + ': ' + e.message); continue; }
      log(`✓ ${x.profile.name}`);
      const pm = x.pm || {}; let n = 0, tot = Object.values(pm).reduce((a, o) => a + Object.keys(o || {}).length, 0);
      for (const [nid, o] of Object.entries(pm)) for (const [pid, meta] of Object.entries(o || {})) {
        const data = await (await fetch(`${base}/pd/${id}/${pid}.json`)).json();
        if (typeof data === 'string' && data.startsWith('data:image/jpeg')) { await api('/admin/import/photo', { id: pid, uid: id, nid, lk: meta.l || null, date: meta.dt || null, t: meta.t, data }); n++; }
        out.lastChild && (out.innerHTML = out.innerHTML.replace(/ fotografije \d+\/\d+<br>$/, '') + ` fotografije ${n}/${tot}<br>`);
      }
    }
    log('Uvoz je končan. Zdaj izbriši podatke v Firebase in zakleni pravila (NAVODILA.md, korak 9).'); await loadAdmin();
  } catch (e) { log('Napaka: ' + e.message); }
}

// ============================================================ DOGODKI (delegirano – brez inline JavaScripta, združljivo s CSP)
const ACT = {
  theme: d => { setTheme(d.t); render(); },
  openFound: d => { S.nb = d.nid; const list = sortedPhotos(d.nid); VP = { list, share: null, name: nbOf(d.nid)?.name }; VI = Math.max(0, list.findIndex(p => p.id === d.id)); drawViewer(); },
  fStart: focusStart, fPause: focusPause, fReset: () => confirmBox('Ustavim časovnik? Nedokončan krog se ne shrani.', focusReset, 'Ustavi'),
  fLen: d => { FT.work = +d.w; FT.brk = +d.b; fSave(); render(); },
  focusDel: () => confirmBox('Izbrišem vso statistiko fokusa?', async () => { try { await api('/focus/delete', {}); D.focus = []; toast('Statistika izbrisana.'); render(); } catch (e) { toast(e.message, true); } }, 'Izbriši'),
  webToggle() {
    if (!S.ai.web && !localStorage.getItem('dn2_webok')) {
      _cf = () => { try { localStorage.setItem('dn2_webok', '1'); } catch { } S.ai.web = true; render(); };
      return modal(`${sheetHead('Iskanje na spletu', '', `<span class="ailogo">${ic('globe')}</span>`)}<p class="sm">Ko je vklopljeno, AI poišče dodatne podatke na <b>Wikipediji</b> in jih navede kot vire.</p>
      <div class="notice b sm" style="margin:12px 0">${ic('shield')}<div>• Strežnik DigitNotes iz tvojega vprašanja naredi kratko iskalno poizvedbo in jo pošlje Wikipediji (Wikimedia Foundation, ZDA).<br>• Wikipedija ne dobi tvojega imena, e-pošte ali IP-naslova.<br>• V vprašanja ne piši osebnih podatkov.<br>• Spletne vire vedno preveri.</div></div>
      <div class="row" style="justify-content:flex-end"><button class="btn btn-s" data-a="closeModal">Prekliči</button><button class="btn btn-p" data-a="cfOk">Vklopi</button></div>`);
    }
    S.ai.web = !S.ai.web; render();
  },
  pickGt: (d, el) => { LM.gtype = d.v; $('lm_gt').value = d.v; el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); },
  openGrades: d => { S.gnid = d.id; go('grade'); },
  copyMsg: d => { let o; try { o = JSON.parse(S.ai.msgs[+d.i].content); } catch { return; } navigator.clipboard?.writeText(o.text).then(() => toast('Kopirano.')); },
  async editExisting(d) { try { const u = await photoUrl(d.id), b = await (await fetch(u)).blob(), data = await editPhoto(b); if (!data) return; await api('/photo/replace', { id: d.id, data }); URL.revokeObjectURL(PHC.get(d.id)); PHC.delete(d.id); const p = D.ph.find(x => x.id === d.id); if (p) p.hasOcr = 0; render(); toast('Fotografija posodobljena.'); } catch (e) { toast(e.message, true); } },
  closeModal, cfOk: () => { const f = _cf; closeModal(); f && f(); }, logout,
  authMode: d => { AUTH.mode = d.m; renderLogin(); },
  async parentCheck() { await refreshMe(); if (U.status === 'active') afterLogin(); else toast('Privolitev še ni potrjena.'); },
  async parentResend() { try { await fetch(API + '/me/parent/resend', { method: 'POST', headers: { Authorization: 'Bearer ' + TOK, 'Content-Type': 'application/json' }, body: '{}' }).then(async r => { if (!r.ok) throw new Error((await r.json()).error); }); toast('Prošnja je ponovno poslana.'); } catch (e) { toast(e.message, true); } },
  go: d => { if (d.v === 'set' && S.view === 'set') return; go(d.v); },
  setTab: d => { S.tab = d.t; S.view = 'set'; render(); },
  openLesson: d => openLesson(d.d, +d.h), lmKind: d => lmKind(d.k), lmSave, lmBack: () => lmChoose(), lmEdit: () => lmChoose(),
  lmDelete: () => confirmBox('Izbrišem vnos te ure? Fotografije ostanejo v zvezku.', async () => { try { await api('/lesson/delete', { k: LM.k }); delete D.lsMap[LM.k]; D.ls = D.ls.filter(x => x.k !== LM.k); render(); toast('Vnos izbrisan.'); } catch (e) { toast(e.message, true); } }, 'Izbriši'),
  lmDelPhoto: d => delPhotoReq(d.id, () => lmNotesForm()),
  pickGrade: (d, el) => { LM.grade = d.g; $('lm_g').value = d.g; el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); },
  shiftDate: d => { S.date = addD(S.date, +d.n * (S.week ? 7 : 1)); render(); }, goToday: () => { S.date = today(); render(); }, setWeek: d => { S.week = d.w === '1'; render(); },
  openNb: d => { S.nb = d.id; go('nb'); }, nbForm: d => nbForm(d.id),
  nfIc: d => { NF.i = d.i; if (!NF.cm) NF.c = SUBJ_C[d.i]; $('nfp').outerHTML = nfPicker(); },
  nfC: d => { NF.c = +d.c; NF.cm = true; $('nfp').outerHTML = nfPicker(); },
  async nbSave(d) { try { await api('/nb/save', { id: d.id || undefined, name: $('nf_n').value, emoji: `i:${NF.i}:${NF.c}`, teachers: $('nf_t').value.split(',').map(s => s.trim()).filter(Boolean) }); closeModal(); await loadData(); render(); toast('Zvezek shranjen.'); } catch (e) { toast(e.message, true); } },
  delNb: d => confirmBox('Izbrisal se bo zvezek z <b>vsemi fotografijami, vnosi ur, roki in AI pogovori</b>. Tega ni mogoče razveljaviti.', async () => { try { await api('/nb/delete', { id: d.id }); await loadData(); if (S.nb === d.id) S.view = 'nbs'; render(); toast('Zvezek izbrisan.'); } catch (e) { toast(e.message, true); } }, 'Izbriši'),
  shareNb() {
    const n = nbOf(S.nb), link = n.shareToken ? location.origin + location.pathname + '?share=' + n.shareToken : '';
    modal(`${sheetHead('Deli zvezek', 'Deljeni zvezek lahko vidijo samo prijavljeni uporabniki DigitNotes, ki dobijo povezavo.')}
    <label class="row" style="justify-content:space-between;padding:8px 0 14px"><b>Deljenje vklopljeno</b><span class="sw"><input type="checkbox" data-c="shareToggle" ${n.share ? 'checked' : ''}><span></span></span></label>
    ${n.share ? `<input class="inp" readonly value="${esc(link)}" id="shl"><div class="row" style="margin-top:10px;justify-content:flex-end"><button class="btn btn-p" data-a="copyShare">Kopiraj povezavo</button></div>` : '<p class="mut sm">Ko deljenje izklopiš, stara povezava preneha delovati.</p>'}
    <div class="notice o sm" style="margin-top:14px">${ic('info')}<div>Deli samo svoje zapiske. Na fotografijah naj ne bo osebnih podatkov drugih (npr. imen ali obrazov sošolcev).</div></div>`);
  },
  copyShare: () => navigator.clipboard.writeText($('shl').value).then(() => toast('Povezava kopirana.')),
  closeShared: () => { SH = null; history.replaceState(null, '', location.pathname); go('home'); },
  viewer: (d, el, e) => { if (lpT === 'fired') return; openViewer(+d.i); }, closeViewer, vStep: d => { VI = (VI + +d.n + VP.list.length) % VP.list.length; drawViewer(); },
  dlPhoto: d => dlPhoto(d.id), dlPhotoCtx: d => { VP = curPhotos(); dlPhoto(d.id); },
  viewPhoto: d => { VP = { list: (D.ph || []).filter(p => p.lk === LM.k), share: null, name: LM.n.name }; VI = VP.list.findIndex(p => p.id === d.id); drawViewer(); },
  replacePhoto(d) { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.onchange = async () => { if (!i.files[0]) return; try { const data = await resize(i.files[0]); await api('/photo/replace', { id: d.id, data }); PHC.delete(d.id); const p = D.ph.find(x => x.id === d.id); if (p) p.hasOcr = 0; render(); toast('Fotografija zamenjana.'); } catch (e) { toast(e.message, true); } }; i.click(); },
  delPhoto: d => delPhotoReq(d.id, () => render()),
  makePdf,
  aiFor: d => { S.ai = { nid: d.id, mode: 'chat', chat: null, msgs: [], busy: false, web: S.ai.web }; go('ai'); },
  async aiConsent() { if (!$('ai_ok').checked) return toast('Za vklop potrdi, da razumeš pogoje.', true); try { U = (await api('/me/settings', { aiConsent: true })).user; render(); } catch (e) { toast(e.message, true); } },
  aiMode: d => { S.ai.mode = d.m; S.ai.chat = null; S.ai.msgs = []; render(); }, aiNew: () => { S.ai.chat = null; S.ai.msgs = []; render(); },
  aiRun: () => aiAsk(S.ai.mode), aiOcr,
  async aiOpen(d) { try { const r = await api('/ai/chat?id=' + d.id); S.ai = { nid: r.chat.nid || 'general', mode: r.chat.mode, chat: r.chat.id, msgs: r.msgs, busy: false, web: S.ai.web }; render(); } catch (e) { toast(e.message, true); } },
  aiDel: d => confirmBox('Izbrišem ta pogovor?', async () => { await api('/ai/chat/delete', { id: d.id }); D.chats = D.chats.filter(c => c.id !== d.id); if (S.ai.chat === d.id) { S.ai.chat = null; S.ai.msgs = []; } render(); }, 'Izbriši'),
  flip: (d, el) => el.classList.toggle('flip'),
  fcNext: d => { const st = FCS[d.i]; st.i++; if (d.k === '1') st.ok++; render(); },
  qzPick: d => { (QZ[d.i] = QZ[d.i] || {})[d.q] = +d.o; render(); },
  openInbox, ibBack: () => { IBSEL = null; renderInbox(); },
  async ibRead(d) { IBSEL = d.id; const m = D.inbox.find(x => x.id === d.id); if (m && !m.read) { m.read = 1; api('/inbox/read', { id: d.id }).catch(() => { }); setBadge(D.inbox.filter(x => !x.read).length); } renderInbox(); },
  async ibAll() { D.inbox.forEach(m => m.read = 1); await api('/inbox/read', { all: true }).catch(() => { }); setBadge(0); renderInbox(); },
  async ibDel(d) { await api('/inbox/delete', { id: d.id }).catch(() => { }); D.inbox = D.inbox.filter(m => m.id !== d.id); IBSEL = null; renderInbox(); },
  pushOn: () => pushSync(true), noNotif: () => { localStorage.setItem('dn2_nonotif', '1'); render(); }, noInst: () => { localStorage.setItem('dn2_noinst', '1'); render(); },
  install: async () => { if (DEFERRED) { DEFERRED.prompt(); await DEFERRED.userChoice; DEFERRED = null; render(); } },
  async pushTest() { try { if (!localStorage.getItem('dn2_push')) await pushSync(true); const r = await api('/push/test', {}); toast(`Testno obvestilo poslano (${r.n} ${r.n === 1 ? 'naprava' : 'naprave'}).`); } catch (e) { toast(e.message, true); } },
  async saveProfile() { try { U = (await api('/me/settings', { name: $('ac_n').value, username: $('ac_u').value.trim() })).user; toast('Shranjeno.'); render(); } catch (e) { toast(e.message, true); } },
  async saveEmail() { try { U = (await api('/me/settings', { email: $('ac_e').value.trim(), password: $('ac_ep').value })).user; toast('E-pošta spremenjena.'); render(); } catch (e) { toast(e.message, true); } },
  async savePw() { try { await api('/me/password', { old: $('ac_o').value, password: $('ac_p').value }); toast('Geslo spremenjeno.'); render(); } catch (e) { toast(e.message, true); } },
  timesReset: () => confirmBox('Povrnem privzete čase ur?', async () => { await api('/times/reset', {}); D.times = []; render(); }, 'Povrni', false),
  async offAdd() { try { await api('/off/add', { from: $('of1').value, to: $('of2').value || $('of1').value }); await loadData(); render(); toast('Prosti dnevi dodani.'); } catch (e) { toast(e.message, true); } },
  async offDel(d) { await api('/off/del', { date: d.d }); D.off = D.off.filter(x => x !== d.d); render(); },
  exportData,
  deleteMe: () => confirmBox('Res želiš <b>trajno izbrisati</b> račun in vse podatke?', async () => { try { await api('/me/delete', { password: $('del_p')?.value || '' }); hardLogout(); toast('Račun je izbrisan.'); } catch (e) { toast(e.message, true); } }, 'Trajno izbriši'),
  itemForm: d => itemForm(d.id), itKind: (d, el) => { $('it_k').value = d.k; el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); },
  async itSave(d) { try { const ex = d.id ? D.items.find(x => x.id === d.id) : null; await api('/item/save', { id: d.id || undefined, kind: $('it_k').value, title: $('it_t').value, nid: $('it_n').value || null, due: $('it_d').value, done: ex?.done }); closeModal(); await loadData(); render(); toast('Shranjeno.'); } catch (e) { toast(e.message, true); } },
  async itDel(d) { await api('/item/delete', { id: d.id }); closeModal(); D.items = D.items.filter(x => x.id !== d.id); render(); },
  // admin
  userForm: d => userForm(d.id), msgForm: d => msgForm(d.id),
  async userSave(d) { try { await api('/admin/user/save', { id: d.id || undefined, name: $('uf_n').value, email: $('uf_e').value.trim(), username: $('uf_u').value.trim(), password: $('uf_p').value || undefined, invite: $('uf_inv')?.checked, maxNb: $('uf_m').value, aiOn: $('uf_ai').checked, aiLimit: $('uf_al').value }); closeModal(); await loadAdmin(); render(); toast('Uporabnik shranjen.'); } catch (e) { toast(e.message, true); } },
  async userLogout(d) { await api('/admin/user/logout', { id: d.id }); toast('Uporabnik je odjavljen z vseh naprav.'); },
  delUser: d => { const u = A.users.find(x => x.id === d.id); confirmBox(`Trajno izbrišem uporabnika <b>${esc(u.name)}</b> z vsemi podatki?`, async () => { try { await api('/admin/user/delete', { id: d.id }); await loadAdmin(); render(); toast('Uporabnik izbrisan.'); } catch (e) { toast(e.message, true); } }, 'Izbriši'); },
  mfMode: (d, el) => { $('mf_m').value = d.m; $('mf_l').classList.toggle('hide', d.m !== 'sel'); el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); },
  async sendMsg() { const all = $('mf_m').value === 'all', to = [...document.querySelectorAll('.mf_c:checked')].map(c => c.value); try { const r = await api('/admin/message', { title: $('mf_t').value, text: $('mf_x').value, all, to, email: $('mf_e').checked }); closeModal(); await loadAdmin(); S.view = 'amsg'; render(); toast(`Poslano ${r.n} uporabnikom${r.mailed ? `, ${r.mailed} po e-pošti` : ''}.`); } catch (e) { toast(e.message, true); } },
  delSent: d => confirmBox('Sporočilo se umakne tudi iz nabiralnikov prejemnikov. (Že poslanih e-poštnih sporočil ni mogoče umakniti.)', async () => { await api('/admin/sent/delete', { id: d.id }); await loadAdmin(); render(); }, 'Umakni'),
  async mailTest() { const o = $('mt_out'); o.innerHTML = 'Pošiljam …'; try { const r = await api('/admin/mailtest', { to: $('mt_to').value.trim() }); o.innerHTML = r.ok ? `<span style="color:var(--g700)">✅ Poslano prek ${esc(r.provider)} (pošiljatelj ${esc(r.sender)}). Preveri nabiralnik in mapo z neželeno pošto.</span>` : `<div class="err">❌ ${esc(r.error || 'Neznana napaka')}</div>`; } catch (e) { o.innerHTML = `<div class="err">${esc(e.message)}</div>`; } },
  importOld: () => confirmBox('Uvozim podatke iz DigitNotes 1? Obstoječi uvoženi podatki se prepišejo.', importOld, 'Uvozi', false)
};
const CHANGE = {
  obAge() { const y = +$('ob_y')?.value, m = +$('ob_m')?.value, box = $('ob_parent'); if (!box) return; box.classList.toggle('hide', !(y && m && ageFrom(y, m) < 15)); },
  setDate: (d, el) => { if (el.value) { S.date = el.value; render(); } },
  lmFiles: async (d, el) => { const f = [...el.files]; el.value = ''; if (!f.length) return; LM.textDraft = $('lm_text')?.value; const box = $('lm_ph'); if (box) box.insertAdjacentHTML('beforeend', f.map(() => '<div class="ph up skel">nalagam…</div>').join('')); await uploadFiles(f, LM.nid, LM.k, LM.date); const t = LM.textDraft; LM.addGrade = $('lm_ag')?.checked; LM.grade = $('lm_g')?.value || LM.grade; lmNotesForm(); if (t != null) $('lm_text').value = t; },
  lmAddGrade: (d, el) => { LM.addGrade = el.checked; $('lm_gbox').classList.toggle('hide', !el.checked); },
  gradeTyped: (d, el) => { LM.grade = el.value; document.querySelectorAll('.gradepick button').forEach(b => b.classList.toggle('on', b.dataset.g === el.value.trim())); },
  nbFiles: async (d, el) => { const f = [...el.files]; el.value = ''; if (!f.length) return; toast(`Nalagam ${f.length} …`); await uploadFiles(f, S.nb, null, today()); render(); },
  shareToggle: async (d, el) => { try { const r = await api('/nb/share', { id: S.nb, on: el.checked }); const n = nbOf(S.nb); n.share = !!r.token; n.shareToken = r.token; render(); ACT.shareNb(); } catch (e) { toast(e.message, true); } },
  aiNb: (d, el) => { S.ai = { nid: el.value, mode: S.ai.mode, chat: null, msgs: [], busy: false, web: S.ai.web }; render(); },
  sq: () => {},
  fNb: (d, el) => { FT.nid = el.value || null; fSave(); },
  ttSet: async (d, el) => { const v = el.value, body = { d: +d.d, h: +d.h }; if (v === 'M') body.malica = true; else if (v) { const i = v.indexOf('|'); body.nid = v.slice(0, i); body.teacher = v.slice(i + 1); } try { await api('/tt/set', body); D.tt = D.tt.filter(x => !(x.d === body.d && x.h === body.h)); if (v) D.tt.push({ d: body.d, h: body.h, nid: body.nid || null, teacher: body.teacher || null, malica: body.malica ? 1 : 0 }); } catch (e) { toast(e.message, true); } },
  timeSet: async (d, el) => { const c = tm(+d.h), n = { h: +d.h, s: c[0], e: c[1] }; n[d.k] = el.value; try { await api('/times/set', n); D.times = D.times.filter(x => x.h !== n.h).concat(n); } catch (e) { toast(e.message, true); render(); } },
  setOpt: async (d, el) => { try { U = (await api('/me/settings', { [d.k]: el.checked })).user; if (d.k === 'remind' && el.checked) pushSync(true); toast('Shranjeno.'); render(); } catch (e) { toast(e.message, true); el.checked = !el.checked; } },
  itemDone: async (d, el) => { const it = D.items.find(x => x.id === d.id); try { await api('/item/save', { ...it, done: el.checked }); it.done = el.checked ? 1 : 0; render(); } catch (e) { toast(e.message, true); } }
};
function delPhotoReq(id, after) {
  const p = (D.ph || []).find(x => x.id === id);
  confirmBox(`Izbrišem fotografijo?${p?.lk ? ' Odstranila se bo tudi iz ure v urniku.' : ''}`, async () => { try { await api('/photo/delete', { id }); D.ph = D.ph.filter(x => x.id !== id); PHC.delete(id); after && after(); toast('Fotografija izbrisana.'); } catch (e) { toast(e.message, true); } }, 'Izbriši');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#ctx')) $('ctx').classList.add('hide');
  if (e.target.id === 'modal') { if (!$('modal').querySelector('[data-f=pwforce]')) closeModal(); return; }
  const el = e.target.closest('[data-a]'); if (!el) return;
  const f = ACT[el.dataset.a]; if (!f) return;
  if (el.tagName === 'A' || el.tagName === 'BUTTON') e.preventDefault();
  if (el.dataset.a === 'closeModal' && el.closest('[data-f=pwforce]')) return;
  if (el.closest('#ctx')) $('ctx').classList.add('hide');
  f(el.dataset, el, e);
});
document.addEventListener('change', e => { const el = e.target.closest('[data-c]'); if (el && CHANGE[el.dataset.c]) CHANGE[el.dataset.c](el.dataset, el, e); });
document.addEventListener('input', e => { const el = e.target.closest('[data-c=gradeTyped]'); if (el) CHANGE.gradeTyped(el.dataset, el); if (e.target.id === 'sq') { SQ.q = e.target.value; searchRun(); } });
document.addEventListener('submit', e => { const f = e.target.closest('[data-f]'); if (!f) return; e.preventDefault(); if (f.dataset.f === 'aiAsk') { const q = $('ai_q').value.trim(); if (q) aiAsk(S.ai.mode, q); return; } FORMS[f.dataset.f]?.(); });
document.addEventListener('scroll', () => $('ctx').classList.add('hide'), true);

// ============================================================ zagon
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => { });
setInterval(() => { if (U && U.role !== 'admin' && (S.view === 'home' || S.view === 'sched') && $('modal').classList.contains('hide') && !document.hidden) render(); }, 60000);
boot();
