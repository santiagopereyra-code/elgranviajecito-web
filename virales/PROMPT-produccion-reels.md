# PROMPT — Producción de reels virales de El Gran Viajecito (material propio + stock)

> Decí "ejecutá el prompt de producción de reels" o usá la skill virales-viajecito. Sirve para los reels de prueba diarios y para los reels del feed.

## 1. Objetivo

Cada reel existe para **vender viajes**. Antes de elegir una toma, preguntate: **"¿alguien que ve esto 1 segundo quiere estar ahí?"**. Si la respuesta no es un sí claro, la toma no va.

Cada reel tiene **un solo objetivo** (viralizar, comunidad, educar o vender) y **una fórmula probada** sacada del buscador de virales (`virales/AAAA-MM-DD.md` en la rama publicador). Nada inventado.

## 2. De dónde sale el material (en este orden)

1. **Photocircle** (9 álbumes, ~2.500 videos; catálogo en `claude/PHOTOCIRCLE-tomas-2026-11-01.md`). Es lo más valioso: gente real nuestra pasándola bien.
2. **Google Fotos**: álbumes "WEB <destino> 2019+" y búsquedas por lugar.
3. **Descargas de la Mac** y `video/` del repo (reels ya armados, solo como fuente de tomas).
4. **Stock gratis con licencia comercial**: Pexels, Pixabay, Mixkit, Coverr. Nunca material con marca de agua, de bancos pagos sin licencia ni de cuentas de Instagram o TikTok de otros.
5. **Nunca** imágenes, videos, caras ni voces generadas con IA.

Mezcla ideal: tomas propias para todo lo que tenga gente, y stock solo para lo que falte, como drones, paisajes icónicos o animales.

## 3. Criterio para elegir cada toma (filtro obligatorio)

Puntuá cada toma de 1 a 5 en estos cinco puntos. **Entra solo con promedio 4 o más, y ningún punto en 1.** La toma de gancho (0 a 1 s) tiene que sacar **5 en interés y en luz**.

| Punto | 5 = sí | 1 = descartar |
|---|---|---|
| **Luz y cielo** | sol, cielo azul, golden hour, luces de ciudad de noche bien expuestas | nublado, gris, lluvia, neblina, sobreexpuesto, oscuro sin luces |
| **Interés** | pasa algo en el cuadro: acción, emoción, un lugar icónico, un animal, agua turquesa | paneo vacío, pared, piso, cámara buscando, gente caminando de espaldas sin nada alrededor |
| **Gente** | grupo riéndose, saltando, brindando, abrazado, tirándose al agua; caras visibles; adultos de 21 a 60 | una persona sola con cara de nada, gente aburrida, caras tapadas, chicos sin contexto |
| **Lugar reconocible** | se entiende dónde es en el primer segundo (Phi Phi, Angkor Wat, pirámides, Serengeti, Ha Long, El Nido, Tanah Lot) | podría ser cualquier lado |
| **Técnica** | nítido, estable o con movimiento a propósito, 1080p o más, entra en 9:16 sin cortar lo importante | movido, fuera de foco, pixelado, con marca de agua, con textos o logos ajenos |

**Descarte automático, sin importar el puntaje:**
- Playa o mar con cielo nublado o agua turbia o marrón. En Maldivas, solo agua turquesa o animales marinos.
- Gente arriba de elefantes, o andando en camello.
- Tomas de Santiago con su ex pareja (Santiago solo o con el grupo sí puede aparecer, desde el 11/11).
- Nusa Penida.
- La bandera vieja de la marca. Solo va la nueva, lima y magenta.
- Tomas bloqueadas en `claude/REELS-destinos.md` (indonesia_27, singapur_01, komodo/IMG_8523, etc.).
- La misma toma o una casi igual dos veces en el mismo reel.
- Lugares que no están en el itinerario del viaje del reel.

## 4. Qué tramo usar de cada video

- Usar solo el **pico**: el tramo de 1 a 3 segundos donde pasa lo mejor (el salto, la risa, la ola, el drone revelando la bahía).
- Cortar siempre los arranques muertos, el final donde se baja la cámara y los paneos lentos sin sujeto.
- Si en un video de 40 s no hay 1,5 s que saquen 4 o más, se descarta entero.
- Revisar con hoja de cuadros (1 cuadro cada 0,5 s) antes de cortar. No elegir a ciegas por la miniatura.

## 5. Criterio para bajar stock

- **Buscar por lugar concreto + calidad visual**, en inglés: "Phi Phi island aerial sunny", "Angkor Wat sunrise", "Serengeti lion", "Halong bay drone", "El Nido kayak turquoise", "Giza pyramids drone", "Tanah Lot sunset".
- **Preferir** clips verticales o 4K horizontales que se puedan recortar a 9:16, de 5 a 20 s, con el sujeto centrado.
- **Antes de bajar**, mirar la vista previa entera y pasarla por el filtro del punto 3. No bajar "por si acaso".
- **Máximo 30 % de stock por reel** cuando el reel es del grupo. Los reels de lugar o dato curioso pueden ser 100 % stock.
- Anotar cada archivo bajado en `virales/stock.json` en la rama publicador: archivo, fuente, autor, link y licencia.

## 6. Edición

- **Formato**: 9:16, 1080×1920, H.264 + AAC, menos de 20 MB.
- **Duración**: la mayoría de 7 a 15 s. Algunos de 15 a 25 s si la fórmula lo pide, como un "¿cuánto cuesta?" con lista.
- **Gancho**: la mejor toma del reel va primero, y el texto del gancho aparece a los 0,3 s, centrado, en Barlow Condensed 800 itálica, dentro de la zona segura (ni arriba de todo ni sobre los botones).
- **Ritmo**: cortes de 0,6 a 1,5 s. Nada de tomas de más de 2,5 s salvo el plano final.
- **Texto**: corto, rioplatense, sin emojis en pantalla, pasado por /humanizar. Nunca tapar caras.
- **Placa final aprobada** (`claude/BUILD-placa-final-reels.html`), 3,5 s, con el nombre del viaje, el ticket con precio "+ aéreo" y "Seguinos en @elgranviajecito".
- **Música**: no va en el archivo. Se elige en la app de la lista de tendencias (Santiago + tendencias latinas) y se anota en la cola.
- **Fechas y precios**: siempre verificados contra el Centro antes de exportar.

## 7. Fórmulas que ya probaron funcionar (buscador de virales, 10/11/2026)

1. **"Comentá PALABRA"** sobre clips del viaje en grupo (Dubái 1,9M; Escocia 814k).
2. **Nombre del viaje grupal gigante + año** ("Verano en Tailandia 2027": 2,2M).
3. **"Buscamos X personas para…"** (Kirguistán: 926k).
4. **Humor del grupo de desconocidos** ("Día 1: nadie se habla").
5. **"¿Cuánto cuesta 16 días por…?"** con el precio al final.
6. **Testimonios "Lo cuentan ellos"**: nuestro mejor reel (1.562 cuentas, 48 % de salteo).
7. **Carrusel de adivinar el destino**: nuestro mejor carrusel (2.835 vistas).

8. **"Esto no es el Caribe. Es Zanzíbar."** (Intrepid, 17x).
9. **"No es IA. Es real."** + "Mandáselo a con quién irías" (La mochila de Sara, 12x).
10. **"5 lugares. 13 días. Una sola decisión."** (ST Travel Shop, 23x).
11. **"Imaginate en … en 2027"** (ST Travel Shop, 15x).
12. **"Se llama X y es justo lo que parece"** + dato (WeRoad).
13. **"Salimos el … No digas más: me voy."** (versión de "Say less, I'm gone", 16x).
14. **"¿Es esto un adiós…?"** con el grupo el último día (Contiki, 29x).
15. **Top 5 lugares que tenés que ver en …** y reels de un solo lugar con el chip **"Parte de nuestro viajecito …"**.
16. **Testimonio con voz real** ("Lo cuentan ellos") sobre tomas del mismo viaje que cuenta la persona. Nunca voz de IA.

**Zona segura del texto:** gancho arriba (a unos 300 px del borde superior), textos secundarios a mitad de pantalla y chips por encima de los 1.400 px: lo de más abajo lo tapa la interfaz de Instagram.

**Mezcla diaria:** de los 18, al menos 5 mezclan viajes (placa "Viajecitos 2027").

**No repetir lo que no funcionó**: reels cortos de solo texto sobre una toma ("Recarga completa", "Activada hasta el 30/11"), que no pasaron de 50 cuentas.

## 8. Control de calidad antes de mostrar

1. Sacar una hoja de cuadros de cada reel terminado y mirar cuadro por cuadro.
2. Chequear: luz, gancho al segundo 0, texto legible y centrado, sin caras tapadas, sin repetidos, fechas y precios iguales al Centro, placa final correcta.
3. Preguntarse: "¿alguien que lo ve en el celular pensaría que lo hizo una máquina?". Si sí, rehacerlo.
4. Mostrarle todo a Santiago en una página con los videos. **Nada se carga a la cola sin su OK.**

## 9. Publicación

- Con el OK, cargar en la cola del publicador (`cola/AAAA-MM-DD.json` de la rama publicador) con tipo `reel_prueba`, el **objetivo**, la **fórmula** y la canción sugerida, desde las 17:00.
- Por día van 18: 6 para viralizar, 5 para comunidad, 4 para educar y 3 para vender.
- Cada 3 días, medir con los datos de Instagram (alcance, salteo en los primeros 3 s, tiempo de visualización, compartidos, guardados) por fórmula y por objetivo. Lo que no pasa de 100 cuentas no se repite; lo que supera 1.000 se hace en versiones para los otros viajes.
