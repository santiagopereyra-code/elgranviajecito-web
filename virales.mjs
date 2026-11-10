// Buscador propio de reels virales (reemplazo de vidIQ) para @elgranviajecito.
// Usa la API oficial de Instagram con el mismo IG_TOKEN del publicador:
//  1) business_discovery: últimos posts públicos de cada cuenta de virales/cuentas.json
//     → puntaje "outlier" = (likes + comentarios) / mediana de esa cuenta.
//  2) hashtags: top posts de cada hashtag de virales/cuentas.json (máx. 30 hashtags distintos por semana).
// Resultado: virales/AAAA-MM-DD.json y virales/AAAA-MM-DD.md (ranking).
import fs from 'node:fs';

const V = 'v21.0';
const TOKEN = process.env.IG_TOKEN;
if (!TOKEN) { console.log('Falta IG_TOKEN.'); process.exit(0); }
const cfg = JSON.parse(fs.readFileSync('virales/cuentas.json', 'utf8'));
const DIAS = cfg.dias || 120;          // ventana de posts a mirar
const MIN_EDAD_H = 48;                // un post de menos de 48 h todavía no juntó interacciones
const MIN_X = cfg.min_outlier || 3;   // desde cuántas veces la mediana cuenta como viral

async function graph(path, params = {}) {
  const q = new URLSearchParams({ ...params, access_token: TOKEN });
  const r = await fetch(`https://graph.facebook.com/${V}/${path}?${q}`);
  const j = await r.json();
  if (j.error) throw new Error(`${j.error.code}/${j.error.error_subcode || ''} ${j.error.message}`);
  return j;
}
async function igUserId() {
  if (process.env.IG_USER_ID) return process.env.IG_USER_ID;
  const r = await graph('me/accounts', { fields: 'instagram_business_account{id,username}', limit: '50' });
  const p = (r.data || []).map((x) => x.instagram_business_account).filter(Boolean);
  return (p.find((x) => x.username === 'elgranviajecito') || p[0]).id;
}
const mediana = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length ? (s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2) : 0; };
const primeraLinea = (c) => (c || '').split('\n').find((l) => l.trim())?.slice(0, 140) || '';
const CAMPOS = 'id,caption,media_type,media_product_type,like_count,comments_count,permalink,timestamp';

async function cuenta(IG, usuario) {
  let campos = CAMPOS + ',view_count';
  for (let intento = 0; intento < 2; intento++) {
    try {
      const f = `business_discovery.username(${usuario}){username,followers_count,media.limit(60){${campos}}}`;
      const r = await graph(IG, { fields: f });
      return r.business_discovery;
    } catch (e) {
      if (intento === 0 && /view_count/i.test(e.message)) { campos = CAMPOS; continue; }
      throw e;
    }
  }
}

const IG = await igUserId();
const hoy = new Date().toISOString().slice(0, 10);
const desde = Date.now() - DIAS * 864e5, hasta = Date.now() - MIN_EDAD_H * 36e5;
const posts = [], errores = [], resumenCuentas = [];

for (const u of cfg.cuentas) {
  try {
    const bd = await cuenta(IG, u);
    const media = (bd.media?.data || []).filter((m) => { const t = Date.parse(m.timestamp); return t >= desde && t <= hasta; });
    const inter = media.map((m) => (m.like_count || 0) + (m.comments_count || 0));
    const vistas = media.map((m) => m.view_count).filter((v) => typeof v === 'number');
    const med = mediana(inter), medV = mediana(vistas);
    resumenCuentas.push({ cuenta: u, seguidores: bd.followers_count, posts: media.length, mediana_interacciones: med, mediana_vistas: vistas.length ? medV : null });
    for (const m of media) {
      const i = (m.like_count || 0) + (m.comments_count || 0);
      const x = med ? i / med : 0;
      const xv = vistas.length && typeof m.view_count === 'number' && medV ? m.view_count / medV : null;
      posts.push({ fuente: 'cuenta', cuenta: u, seguidores: bd.followers_count, formato: m.media_product_type === 'REELS' ? 'reel' : m.media_type === 'CAROUSEL_ALBUM' ? 'carrusel' : 'foto',
        link: m.permalink, fecha: m.timestamp.slice(0, 10), likes: m.like_count ?? null, comentarios: m.comments_count ?? null, vistas: m.view_count ?? null,
        veces_mediana: Math.round(Math.max(x, xv || 0) * 10) / 10, texto: primeraLinea(m.caption) });
    }
    console.log(`ok ${u}: ${media.length} posts, mediana ${med}`);
  } catch (e) { errores.push(`${u}: ${e.message}`); console.log(`error ${u}: ${e.message}`); }
}

for (const tag of cfg.hashtags || []) {
  try {
    const s = await graph('ig_hashtag_search', { user_id: IG, q: tag });
    const id = s.data?.[0]?.id; if (!id) continue;
    const r = await graph(`${id}/top_media`, { user_id: IG, fields: 'id,caption,media_type,like_count,comments_count,permalink,timestamp', limit: '50' });
    for (const m of r.data || []) posts.push({ fuente: `#${tag}`, cuenta: null, formato: m.media_type === 'VIDEO' ? 'reel' : m.media_type === 'CAROUSEL_ALBUM' ? 'carrusel' : 'foto',
      link: m.permalink, fecha: (m.timestamp || '').slice(0, 10), likes: m.like_count ?? null, comentarios: m.comments_count ?? null, vistas: null, veces_mediana: null, texto: primeraLinea(m.caption) });
    console.log(`ok #${tag}: ${(r.data || []).length}`);
  } catch (e) { errores.push(`#${tag}: ${e.message}`); console.log(`error #${tag}: ${e.message}`); }
}

const virales = posts.filter((p) => p.fuente === 'cuenta' && p.veces_mediana >= MIN_X).sort((a, b) => b.veces_mediana - a.veces_mediana);
const deHashtag = posts.filter((p) => p.fuente !== 'cuenta').sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 30);
fs.writeFileSync(`virales/${hoy}.json`, JSON.stringify({ fecha: hoy, cuentas: resumenCuentas, virales, hashtags: deHashtag, errores }, null, 1));

const fila = (p) => `| ${p.veces_mediana ?? '-'}x | ${p.formato} | @${p.cuenta ?? p.fuente} | ${p.likes ?? '-'} / ${p.comentarios ?? '-'}${p.vistas ? ` / ${p.vistas} vistas` : ''} | ${p.fecha} | ${p.texto.replace(/\|/g, '/')} | ${p.link} |`;
const md = [`# Virales del nicho viajes — ${hoy}`, '',
  `Posts de los últimos ${DIAS} días que rindieron ${MIN_X} veces o más que la mediana de su cuenta (likes + comentarios${resumenCuentas.some((c) => c.mediana_vistas) ? ', o vistas' : ''}).`, '',
  '| Veces | Formato | Cuenta | Likes / coment. | Fecha | Texto | Link |', '|---|---|---|---|---|---|---|', ...virales.slice(0, 40).map(fila), '',
  '## Top de hashtags', '', '| - | Formato | Hashtag | Likes / coment. | Fecha | Texto | Link |', '|---|---|---|---|---|---|---|', ...deHashtag.map(fila), '',
  errores.length ? '## Errores\n\n' + errores.map((e) => `- ${e}`).join('\n') : ''].join('\n');
fs.writeFileSync(`virales/${hoy}.md`, md);
console.log(`listo: ${virales.length} virales, ${deHashtag.length} de hashtags, ${errores.length} errores`);
