// Publicador de Instagram de @elgranviajecito. Corre en GitHub Actions cada 15 minutos.
// Lee cola/AAAA-MM-DD.json (hora de Uruguay), publica el próximo ítem cuya hora ya pasó
// y anota el resultado en estado/AAAA-MM-DD.json. Uno por corrida, así quedan espaciados.
// Tipos: reel_prueba (solo no seguidores), reel, foto, carrusel, historia.
// Secretos del repo: IG_TOKEN (obligatorio) e IG_USER_ID (opcional; si falta, se busca solo).
import fs from 'node:fs';

const V = 'v21.0';
const TOKEN = process.env.IG_TOKEN;
const TOPE_PRUEBA = Number(process.env.TOPE_PRUEBA_DIA || 18);
if (!TOKEN) { console.log('Falta el secreto IG_TOKEN: no se publica nada.'); process.exit(0); }

function ahoraUY() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Montevideo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const g = (t) => p.find((x) => x.type === t).value;
  return { fecha: `${g('year')}-${g('month')}-${g('day')}`, hora: `${g('hour') === '24' ? '00' : g('hour')}:${g('minute')}` };
}
async function graph(path, params = {}, method = 'POST') {
  const u = `https://graph.facebook.com/${V}/${path}`;
  const body = new URLSearchParams({ ...params, access_token: TOKEN });
  const r = method === 'GET' ? await fetch(`${u}?${body}`) : await fetch(u, { method, body });
  const j = await r.json();
  if (j.error) throw new Error(`${j.error.code}/${j.error.error_subcode || ''} ${j.error.message}`);
  return j;
}
async function igUserId() {
  if (process.env.IG_USER_ID) return process.env.IG_USER_ID;
  const r = await graph('me/accounts', { fields: 'name,instagram_business_account{id,username}', limit: '50' }, 'GET');
  const pags = (r.data || []).filter((p) => p.instagram_business_account);
  const p = pags.find((x) => x.instagram_business_account.username === 'elgranviajecito') || pags[0];
  if (!p) throw new Error('El token no ve ninguna cuenta de Instagram conectada a una página');
  return p.instagram_business_account.id;
}
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
async function contenedor(IG, params, esVideo) {
  const { id } = await graph(`${IG}/media`, params);
  if (!esVideo) return id;
  for (let i = 0; i < 36; i++) { // hasta 6 minutos
    await espera(10000);
    const s = await graph(id, { fields: 'status_code,status' }, 'GET');
    if (s.status_code === 'FINISHED') return id;
    if (s.status_code === 'ERROR' || s.status_code === 'EXPIRED') throw new Error(`video: ${s.status || s.status_code}`);
  }
  throw new Error('Instagram tardó demasiado en procesar el video');
}
async function publicar(IG, item) {
  let c;
  switch (item.tipo) {
    case 'reel':
    case 'reel_prueba': {
      const p = { media_type: 'REELS', video_url: item.video, caption: item.texto || '' };
      if (item.portada_ms) p.thumb_offset = String(item.portada_ms);
      if (item.tipo === 'reel_prueba') p.trial_params = JSON.stringify({ graduation_strategy: item.graduacion || 'SS_PERFORMANCE' });
      else p.share_to_feed = String(item.en_feed !== false);
      c = await contenedor(IG, p, true); break;
    }
    case 'foto': c = await contenedor(IG, { image_url: item.imagen, caption: item.texto || '' }, false); break;
    case 'carrusel': {
      const hijos = [];
      for (const it of item.items || []) hijos.push(it.video
        ? await contenedor(IG, { media_type: 'VIDEO', video_url: it.video, is_carousel_item: 'true' }, true)
        : await contenedor(IG, { image_url: it.imagen, is_carousel_item: 'true' }, false));
      if (hijos.length < 2 || hijos.length > 10) throw new Error('carrusel: entre 2 y 10 piezas');
      c = await contenedor(IG, { media_type: 'CAROUSEL', children: hijos.join(','), caption: item.texto || '' }, false); break;
    }
    case 'historia':
      c = item.video ? await contenedor(IG, { media_type: 'STORIES', video_url: item.video }, true)
        : await contenedor(IG, { media_type: 'STORIES', image_url: item.imagen }, false); break;
    default: throw new Error(`tipo desconocido: ${item.tipo}`);
  }
  const { id } = await graph(`${IG}/media_publish`, { creation_id: c });
  let permalink = '';
  try { permalink = (await graph(id, { fields: 'permalink' }, 'GET')).permalink || ''; } catch (_) {}
  return { ok: true, media_id: id, permalink };
}

const { fecha, hora } = ahoraUY();
const fCola = `cola/${fecha}.json`, fEst = `estado/${fecha}.json`;
if (!fs.existsSync(fCola)) { console.log(`Sin cola para ${fecha}`); process.exit(0); }
const cola = JSON.parse(fs.readFileSync(fCola, 'utf8'));
const est = fs.existsSync(fEst) ? JSON.parse(fs.readFileSync(fEst, 'utf8')) : {};
const pruebasHoy = Object.entries(est).filter(([id, e]) => e.ok && cola.find((c) => c.id === id)?.tipo === 'reel_prueba').length;
const item = cola.find((it) => it.hora <= hora && !(est[it.id]?.ok) && (est[it.id]?.intentos || 0) < 3
  && !(it.tipo === 'reel_prueba' && pruebasHoy >= TOPE_PRUEBA));
if (!item) { console.log(`${fecha} ${hora}: nada para publicar ahora (${pruebasHoy} reels de prueba hoy).`); process.exit(0); }

let r;
try {
  const IG = await igUserId();
  r = await publicar(IG, item);
} catch (e) { r = { ok: false, error: String(e.message || e) }; }
r.intentos = (est[item.id]?.intentos || 0) + (r.ok ? 0 : 1);
r.hora_real = ahoraUY().hora;
est[item.id] = r;
fs.mkdirSync('estado', { recursive: true });
fs.writeFileSync(fEst, JSON.stringify(est, null, 1));
console.log(`${item.id} (${item.hora}):`, JSON.stringify(r));
