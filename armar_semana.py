# Arma las colas de la semana 4–10/11/2026 (agresiva: 3 al feed por día + stories).
# Solo agrega ítems cuyo archivo existe en cola/. Mantiene los ítems ya cargados (5/11 y reels de prueba).
import json, os
B = 'https://cdn.jsdelivr.net/gh/santiagopereyra-code/elgranviajecito-web@publicador/'
PV = 'Preventa hasta el 30/11'
HT = '#viajesengrupo #viajarsola #viajarsolo #elgranviajecito'

def car(id, carpeta, texto, ext='mp4'):
    d = f'cola/c/{carpeta}'; n = len([f for f in os.listdir(d) if f.endswith('.' + ext)]) if os.path.isdir(d) else 0
    items = [({'video': B + f'cola/c/{carpeta}/slide{i}.mp4'} if ext == 'mp4' else {'imagen': B + f'cola/c/{carpeta}/slide{i}.jpg'}) for i in range(1, n + 1)]
    return {'id': id, 'tipo': 'carrusel', 'items': items, 'texto': texto, '_f': [f'cola/c/{carpeta}/slide1.{ext}']}

def reel(id, archivo, texto, portada=1500):
    return {'id': id, 'tipo': 'reel', 'video': B + f'cola/v/{archivo}', 'portada_ms': portada, 'texto': texto, '_f': [f'cola/v/{archivo}']}

def hist(id, archivo):
    return {'id': id, 'tipo': 'historia', 'imagen': B + f'cola/s/{archivo}', '_f': [f'cola/s/{archivo}']}

T = {}
T['tailandia'] = f"""Bangkok, Angkor Wat, Chiang Mai, Chiang Rai, Phuket y Phi Phi en un solo viaje 🛶

1️⃣ Wat Arun al atardecer en Bangkok
2️⃣ Amanecer en Angkor Wat
3️⃣ Templos de Chiang Mai
4️⃣ Templo Blanco en Chiang Rai
5️⃣ Una noche en Phuket
6️⃣ Cinco noches en Phi Phi, con lancha a Maya Bay

Tailandia y Camboya · 16 días · salida 17 oct 2027 · grupos de 8 a 15.
{PV}: USD 2.790 + aéreo (después USD 2.890).
Comentá TAILANDIA y te mando el itinerario completo.

#tailandia #camboya #angkorwat #phiphi #chiangmai {HT}"""
T['india'] = f"""De Delhi a Katmandú, por tierra y en plena fiesta de Tihar 🛺

Jama Masjid en Delhi, Hawa Mahal en Jaipur, el Taj Mahal al amanecer, el Ganges en Varanasi, Pokhara y la estupa de Boudhanath.

India y Nepal · 15 días · salida 17 oct 2027 · grupos de 8 a 15.
{PV}: USD 2.390 + aéreo (después USD 2.490).
Comentá INDIA y te paso el itinerario.

#india #nepal #tajmahal #varanasi #katmandu {HT}"""
T['filipinas'] = f"""Bahías y lagunas: Vietnam y Palawan de punta a punta 🚤

Hanói, Ha Long en crucero con kayak, Ninh Binh, el río subterráneo de Puerto Princesa, tres noches en Port Barton y los tours de lagunas de El Nido.

Filipinas y Vietnam · 16 días · salida 5 feb 2028 · grupos de 8 a 15.
{PV}: USD 2.890 + aéreo (después USD 2.990).
Comentá FILIPINAS y te mando el itinerario.

#filipinas #vietnam #elnido #palawan #halongbay {HT}"""
T['caminando'] = f"""Tres países en 18 días, caminando de Singapur a Bali 🎒

Supertrees y el Diente de Buda en Singapur, Petronas y Batu Caves en Kuala Lumpur, dragones de Komodo, tres noches en barco, Gili Trawangan y Ubud.

Indonesia, Malasia y Singapur · salida 3 jun 2027 · grupos de 8 a 15.
{PV}: USD 2.890 + aéreo (después USD 2.990).
Comentá INDONESIA y te paso el itinerario.

#indonesia #bali #komodo #singapur #malasia {HT}"""
T['balirelax'] = f"""Bali sin apuro: Ubud, Gili Trawangan, Canggu y Uluwatu 🛵 Y mucha playa.

Cuatro bases, mañanas sin despertador y el grupo para compartirlo.

Bali Relax · 15 días · salida 10 jul 2027 · grupos de 8 a 15.
{PV}: USD 2.190 + aéreo (después USD 2.290).
Comentá BALI y te mando el itinerario.

#bali #ubud #gilitrawangan #uluwatu #canggu {HT}"""
T['egipto'] = f"""Todo Egipto en 13 días 🐫 Arrancamos en El Cairo, navegamos el Nilo de Luxor a Asuán y terminamos en el Mar Rojo.

Pirámides y Esfinge, Karnak, faluca al atardecer y snorkel en Hurghada.

Egipto Total · salida 18 abr 2027 · grupos de 8 a 15.
{PV}: USD 2.590 + aéreo (después USD 2.690).
Comentá EGIPTO y te paso el itinerario.

#egipto #nilo #piramides #luxor #marrojo {HT}"""
T['sobre'] = f"""¿Te animás a abrir el sobre? ✉️ 5 pistas, un destino.

Deslizá y comentá tu respuesta ANTES de llegar al final. Los que aciertan, ¿se suben? 👀

{PV}: USD 100 menos en todos los viajes 2027 (+ aéreo). Link en la bio.

#adivinaeldestino #quizviajero {HT}"""
T['borroso'] = f"""De borroso a claro: ¿adivinás dónde estamos? 🔍

Cada foto se ve un poco más. Comentá tu respuesta en la primera pista que te dé la certeza 👇

{PV}: USD 100 menos en todos los viajes 2027 (+ aéreo). Link en la bio.

#adivinaeldestino #quizviajero {HT}"""
T['zoom'] = f"""Empezamos a 29.000 km de altura… ¿en qué foto adivinás adónde vamos? 🌍➡️🦒

Comentá el número de slide en el que lo sacaste.

Tanzania y Zanzíbar · 13 días · salida 25 sep 2027.
{PV}: USD 3.490 + aéreo (después USD 3.590). Link en la bio.

#tanzania #safari #zanzibar #adivinaeldestino {HT}"""
W = {
 'mama': ('Indonesia, Malasia y Singapur', 'Toda madre tiene este chat 😅 "Hija, ¿dónde estás?" Avisale a tu mamá: nos vamos.'),
 'carrasco': ('Egipto Total', 'Día de salida en la puerta 7 ✈️ Vos traé el mate, nosotros el resto. Etiquetá a quien trae 3 valijas.'),
 'cuota': ('Tailandia y Camboya', 'La única cuota que da felicidad 💸 Se reserva con una seña y el resto se paga de a poco.'),
 'amiga_tailandia': ('Tailandia y Camboya', '"Amiga, ¿y si nos vamos a Tailandia y Camboya?" Así empieza todo 🇹🇭 Etiquetá a tu amiga.'),
 'grupo_bali': ('Bali Relax', 'Lo mejor del viaje empieza acá: el grupo de WhatsApp 🫶 Gente de Montevideo, Buenos Aires, Medellín, Santiago y Madrid.'),
 'vas_sola': ('Tailandia y Camboya', '"¿Y con quién vas?" Con 14 personas que no conocía. Volví con 14 amigos 💬'),
 'grupo_2019': ('Japón Total', 'El viaje que planean desde 2019 🙃 Dejá de planear. Reservá. Etiquetá a tu grupo.'),
}
PR = {'Indonesia, Malasia y Singapur': ('2.890', '2.990'), 'Egipto Total': ('2.590', '2.690'), 'Tanzania y Zanzíbar': ('3.490', '3.590'),
      'Tailandia y Camboya': ('2.790', '2.890'), 'Bali Relax': ('2.190', '2.290'), 'Filipinas y Vietnam': ('2.890', '2.990'), 'Japón Total': ('3.190', '3.290')}
def wa(k):
    v, g = W[k]; p, l = PR[v]
    return reel(f'feed_wa_{k}', f'wa_{k}.mp4', f"{g}\n\n{v}: reservá antes del 30/11 y pagás USD {p} + aéreo (después USD {l}).\nLink en la bio.\n\n#humorviajero {HT}")

TESTI = "Lo cuentan ellos 💬 Llegaron sin conocerse y volvieron con amigos.\n\nPreventa hasta el 30/11: USD 100 menos en todos los viajes 2027 (+ aéreo).\nLink en la bio o escribinos por WhatsApp.\n\n#viajesengrupo #viajarsolo #viajarsola #elgranviajecito #testimonios"
# Feed: de a 3 por día solo 5, 6 y 7/11 (pedido de Santiago 04/11 05:12). Stories: 2 por día (13:00 y 21:00).
# Las stories con link a artículos van a mano (la API de Instagram no permite el sticker de link): ver CALENDARIO.
DIAS = {
 '2026-11-04': [('13:00', hist('h4_1', 'story_01_pasaje_vacaciones.jpg')), ('21:00', hist('h4_2', 'cta_tailandia_camboya.jpg'))],
 '2026-11-05': [('13:00', hist('h5_1', 'story_04_fotografo.jpg'))],
 '2026-11-06': [('19:00', car('car_tailandia', 'tailandia', T['tailandia'])), ('19:00', reel('feed_testi3b', 'feed_testi3b.mp4', TESTI)), ('19:00', wa('mama')),
                ('13:00', hist('h6_1', 'story_02_ahorrar.jpg')), ('21:00', hist('h6_2', 'cta_indonesia.jpg'))],
 '2026-11-07': [('19:00', car('car_filipinas', 'filipinas', T['filipinas'])), ('19:00', reel('feed_testi3c', 'feed_testi3c.mp4', TESTI)), ('19:00', car('car_sobre', 'sobre', T['sobre'], 'jpg')),
                ('13:00', hist('h7_1', 'story_09_valijas.jpg'))],
 '2026-11-08': [('13:00', hist('h8_1', 'story_13_depre.jpg')), ('21:00', hist('h8_2', 'cta_bali_relax.jpg'))],
 '2026-11-09': [('13:00', hist('h9_1', 'story_14_amigo_vamos.jpg'))],
 '2026-11-10': [('13:00', hist('h10_1', 'story_08_mas_feliz.jpg')), ('21:00', hist('h10_2', 'cta_egipto.jpg'))],
}
faltan = []
for dia, its in DIAS.items():
    f = f'cola/{dia}.json'
    cola = json.load(open(f)) if os.path.exists(f) else []
    ids = {x['id'] for x in cola}
    feed = [x for x in cola if x['tipo'] != 'reel_prueba' and x['tipo'] != 'historia']
    resto = [x for x in cola if x not in feed]
    nuevos_feed, nuevas_h = [], []
    for hora, it in its:
        req = it.pop('_f')
        if not all(os.path.exists(r) for r in req): faltan.append((dia, it['id'])); continue
        it['hora'] = hora
        it = {'id': it['id'], 'hora': hora, **{k: v for k, v in it.items() if k not in ('id', 'hora')}}
        if it['id'] in ids:
            cola = [it if x['id'] == it['id'] else x for x in cola]; continue
        (nuevas_h if it['tipo'] == 'historia' else nuevos_feed).append(it)
    if any(it['id'] in ids for _, it in its):
        feed = [x for x in cola if x['tipo'] not in ('reel_prueba', 'historia')]
        resto = [x for x in cola if x['tipo'] in ('reel_prueba', 'historia')]
    # feed primero (prioridad a las 19:00, en orden), después historias y reels de prueba por hora
    out = feed + nuevos_feed + sorted(resto + nuevas_h, key=lambda x: x['hora'])
    json.dump(out, open(f, 'w'), ensure_ascii=False, indent=1)
    print(dia, len(out), [x['id'] for x in out if x['tipo'] != 'reel_prueba'])
print('FALTAN (se agregan cuando estén):', faltan)
