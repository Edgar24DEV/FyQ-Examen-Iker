/* =========================================================
   MISIÓN MÚSICA · 2º ESO · Examen teórico (2 de diciembre)
   Los 7 contenidos del comunicado de la profe:
   1 cualidades del sonido · 2 conceptos · 3 notas en clave de sol
   4 líneas divisorias y compases incompletos · 5 figuras y equivalencias
   6 articulación, tempo y dinámica · 7 escala mayor y menor.
   Necesita pentagrama.js cargado antes (dibuja las partituras).
   ========================================================= */
if (typeof partitura === 'undefined' && typeof require !== 'undefined') {
  // eslint-disable-next-line no-global-assign
  var { partitura, signo, idx, nombreNota } = require('./pentagrama.js');
}

const PLANETAS = [
  { id: 'son',   emoji: '🔊', nombre: 'Planeta Sonido',      desc: 'Las 4 cualidades del sonido',           grupo: 'Teoría' },
  { id: 'conc',  emoji: '📖', nombre: 'Planeta Conceptos',   desc: 'Pentagrama, compás, pulso, ritmo…',     grupo: 'Teoría' },
  { id: 'notas', emoji: '🎼', nombre: 'Planeta Notas',       desc: 'Leer notas en clave de sol',            grupo: 'Lenguaje musical' },
  { id: 'fig',   emoji: '🎵', nombre: 'Planeta Figuras',     desc: 'Figuras, silencios y equivalencias',    grupo: 'Lenguaje musical' },
  { id: 'comp',  emoji: '📏', nombre: 'Planeta Compases',    desc: 'Líneas divisorias y compases incompletos', grupo: 'Lenguaje musical' },
  { id: 'part',  emoji: '🎚️', nombre: 'Planeta Partitura',   desc: 'Articulación, tempo y dinámica',        grupo: 'Lenguaje musical' },
  { id: 'esc',   emoji: '🪜', nombre: 'Planeta Escalas',     desc: 'Escala mayor y escala menor',           grupo: 'Lenguaje musical' },
];

/* ---------- utilidades ---------- */
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const mezclar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sacar = (arr, n, excepto = []) => mezclar(arr.filter((x) => !excepto.includes(x))).slice(0, n);
const S = (id, p, t, ok, no, ex, tr, pil) => ({ id, p, t, ok, no, ex, tr, pil });
const G = (id, fn) => (nivel = 1) => {
  for (let t = 0; t < 60; t++) { const q = fn(nivel); if (new Set([q.ok, ...q.no]).size === 3) return { ...q, id }; }
  return { ...fn(nivel), id };
};
const fmt = (x) => { const e = Math.floor(x + 1e-9), f = Math.round((x - e) * 4); const fr = ['', '¼', '½', '¾'][f]; return e && fr ? `${e} ${fr}` : fr || String(e); };

/* ---------- PÍLDORAS ---------- */
const PIL = {
  son: '🔊 <b>Cualidades del sonido</b>: <b>altura</b> (agudo/grave) · <b>duración</b> (largo/corto) · <b>intensidad</b> (fuerte/suave) · <b>timbre</b> (de quién o de qué instrumento es). Truco: <b>A-D-I-T</b>.',
  conc: '📖 <b>Pentagrama</b>: 5 líneas y 4 espacios · <b>clave</b>: da nombre a las notas · <b>compás</b>: grupos de pulsos separados por líneas divisorias · <b>pulso</b>: latido regular · <b>puntillo</b>: suma la mitad.',
  notas: '🎼 En clave de sol: <b>líneas</b> (de abajo arriba) <b>Mi-Sol-Si-Re-Fa</b> · <b>espacios</b> <b>Fa-La-Do-Mi</b>. Debajo de la 1.ª línea va el Re, y con una línea adicional, el Do.',
  fig: '🎵 <b>Redonda 4</b> · <b>blanca 2</b> · <b>negra 1</b> · <b>corchea ½</b> · <b>semicorchea ¼</b> (en tiempos de negra). Cada figura vale el <b>doble</b> que la siguiente. El <b>puntillo</b> suma la mitad.',
  comp: '📏 El número de <b>arriba</b> dice cuántos tiempos tiene cada compás (2/4 → 2, 3/4 → 3, 4/4 → 4). Suma las figuras y, cuando llegues, pon la <b>línea divisoria</b>.',
  part: '🎚️ <b>Dinámica</b> = fuerte o suave (pp, p, mp, mf, f, ff, reguladores) · <b>tempo</b> = rápido o lento (Largo, Adagio, Andante, Allegro, Presto, rit., accel.) · <b>articulación</b> = cómo se ataca la nota (picado, ligado, acento).',
  esc: '🪜 <b>Escala mayor</b>: T T S T T T S · <b>escala menor natural</b>: T S T T S T T. Entre <b>Mi-Fa</b> y <b>Si-Do</b> solo hay un <b>semitono</b>; entre las demás notas, un tono.',
};

/* ---------- PREGUNTAS FIJAS ---------- */
const FIJAS = [
  // ===== CUALIDADES DEL SONIDO =====
  S('s1', 'son', '¿Cuáles son las <b>cuatro cualidades</b> del sonido?', '🔊 Altura, duración, intensidad y timbre', ['🔊 Ritmo, melodía, armonía y timbre', '🔊 Altura, pulso, compás y volumen'],
    'Truco: <b>A-D-I-T</b> → Altura, Duración, Intensidad, Timbre.', ['🔤 Piensa en «A-D-I-T».'], 'son'),
  S('s2', 'son', 'La <b>altura</b> nos dice si un sonido es…', '⬆️ Agudo o grave', ['💪 Fuerte o suave', '⏱️ Largo o corto'], 'La altura depende de la <b>frecuencia</b> (vibraciones por segundo, Hz).', ['🐦 Un pájaro es agudo, un tambor grande es grave.'], 'son'),
  S('s3', 'son', 'La <b>intensidad</b> nos dice si un sonido es…', '💪 Fuerte o suave', ['⬆️ Agudo o grave', '⏱️ Largo o corto'], 'La intensidad depende de la <b>amplitud</b> de la vibración y se mide en decibelios (dB).', ['🔈 Es lo que cambias con el volumen.'], 'son'),
  S('s4', 'son', 'La <b>duración</b> nos dice si un sonido es…', '⏱️ Largo o corto', ['💪 Fuerte o suave', '🎻 De un violín o de una flauta'], 'En la partitura la duración se escribe con las <b>figuras</b>.', ['⏱️ ¿Cuánto tiempo dura?'], 'son'),
  S('s5', 'son', 'El <b>timbre</b> es la cualidad que…', '🎻 Nos permite distinguir quién o qué instrumento suena', ['⬆️ Nos dice si es agudo o grave', '💪 Nos dice si es fuerte o suave'],
    'Es el «color» del sonido: por eso distinguimos un piano de una guitarra tocando la misma nota.', ['📞 Reconoces la voz de tu madre por teléfono gracias a…'], 'son'),
  S('s6', 'son', 'Un violín y una flauta tocan la misma nota, igual de fuerte y el mismo tiempo. Los distinguimos por su…', '🎻 Timbre', ['⬆️ Altura', '💪 Intensidad'], 'Si todo lo demás es igual, lo que cambia es el <b>timbre</b>.', ['🎨 Cada instrumento tiene su «color».'], 'son'),
  S('s7', 'son', 'La sirena de una ambulancia pasa de grave a agudo. ¿Qué cualidad cambia?', '⬆️ La altura', ['⏱️ La duración', '🎻 El timbre'], 'Grave ↔ agudo = <b>altura</b>.', ['⬆️ ¿Sube o baja el sonido?'], 'son'),
  S('s8', 'son', 'Bajas el volumen de los cascos. ¿Qué cualidad cambia?', '💪 La intensidad', ['⬆️ La altura', '🎻 El timbre'], 'Más o menos volumen = <b>intensidad</b>.', ['🔈 Fuerte o suave…'], 'son'),
  S('s9', 'son', 'En una partitura, la <b>altura</b> se indica con…', '🎼 La posición de la nota en el pentagrama', ['🎵 El tipo de figura', '🎚️ Los matices p, f…'], 'Cuanto más arriba en el pentagrama, más aguda es la nota.', ['🎼 ¿Arriba o abajo en las líneas?'], 'son'),
  S('s10', 'son', 'En una partitura, la <b>intensidad</b> se indica con…', '🎚️ Los matices (p, mf, f…)', ['🎵 Las figuras', '🎼 La clave'], 'Los matices dinámicos dicen lo fuerte o suave que se toca.', ['🎚️ p = piano, f = forte…'], 'son'),
  S('s11', 'son', 'En una partitura, la <b>duración</b> se indica con…', '🎵 Las figuras (redonda, blanca, negra…)', ['🎼 La posición en el pentagrama', '🎚️ Los matices'], 'Cada figura dura un tiempo distinto.', ['🎵 Redonda = 4 tiempos…'], 'son'),
  S('s12', 'son', 'La <b>altura</b> de un sonido depende de…', '〰️ La frecuencia de la vibración', ['📏 La amplitud de la vibración', '🎻 El material del instrumento'], 'Más vibraciones por segundo → sonido más <b>agudo</b>. La amplitud tiene que ver con la intensidad.', ['〰️ Frecuencia: se mide en hercios (Hz).'], 'son'),

  // ===== CONCEPTOS =====
  S('c1', 'conc', '¿Qué es el <b>pentagrama</b>?', '📏 5 líneas y 4 espacios donde se escriben las notas', ['📏 4 líneas y 5 espacios', '📏 El signo que da nombre a las notas'], 'Penta = cinco. Las líneas y espacios se cuentan de <b>abajo arriba</b>.', ['🖐️ «Penta» = cinco.'], 'conc'),
  S('c2', 'conc', '¿Para qué sirve la <b>clave</b>?', '🔑 Para dar nombre a las notas', ['🔑 Para indicar la velocidad', '🔑 Para indicar lo fuerte que se toca'], 'La clave de sol en 2.ª línea dice que la nota de la 2.ª línea es <b>Sol</b>.', ['🔑 Sin clave, no sabríamos cómo se llama cada nota.'], 'conc'),
  S('c3', 'conc', '¿Qué es el <b>pulso</b>?', '💓 El latido regular y constante de la música', ['💓 La nota más aguda de una obra', '💓 Un signo que alarga una nota'], 'Es como el tic-tac de un reloj: lo que sigues con el pie.', ['🦶 Lo que marcas con el pie al escuchar una canción.'], 'conc'),
  S('c4', 'conc', '¿Qué es el <b>compás</b>?', '📏 Grupos iguales de pulsos, separados por líneas divisorias', ['📏 La velocidad de una obra', '📏 Una nota muy larga'], 'Se indica al principio con dos números: arriba, cuántos tiempos; abajo, qué figura vale un tiempo (4 = negra).', ['📏 Las líneas verticales lo separan.'], 'conc'),
  S('c5', 'conc', '¿Qué hace el <b>puntillo</b>?', '•  Añade a la figura la mitad de su valor', ['•  Duplica el valor de la figura', '•  Hace la nota más corta y separada'], 'Blanca con puntillo = 2 + 1 = <b>3 tiempos</b>.', ['➗ La mitad de una blanca es 1.'], 'conc'),
  S('c6', 'conc', '¿Qué es el <b>ritmo</b>?', '🥁 La combinación de sonidos y silencios de distinta duración', ['🥁 Sonidos de distinta altura uno tras otro', '🥁 Varios sonidos a la vez'], 'Ritmo = duraciones organizadas a partir del pulso.', ['🥁 Puedes hacerlo con palmas, sin notas.'], 'conc'),
  S('c7', 'conc', '¿Qué es la <b>melodía</b>?', '🎶 Una sucesión de sonidos de distinta altura con sentido musical', ['🎶 Varios sonidos sonando a la vez', '🎶 El latido regular de la música'], 'Es lo que cantas o silbas de una canción.', ['🎤 Lo que tarareas.'], 'conc'),
  S('c8', 'conc', 'Varios sonidos distintos sonando <b>a la vez</b> forman…', '🎹 Armonía (acordes)', ['🎶 Melodía', '🥁 Pulso'], 'Melodía = uno detrás de otro · armonía = a la vez.', ['🎹 Al tocar varias teclas juntas…'], 'conc'),
  S('c9', 'conc', '¿Qué es un <b>silencio</b> en música?', '🤫 Un signo que indica ausencia de sonido durante un tiempo', ['🤫 Una nota muy suave', '🤫 El final de la obra'], 'Cada figura tiene su silencio y dura lo mismo.', ['🤫 Se cuenta, pero no suena.'], 'conc'),
  S('c10', 'conc', 'La <b>ligadura de prolongación</b> une…', '🔗 Dos notas de la misma altura: se suman sus duraciones', ['🔗 Notas de distinta altura para tocarlas unidas', '🔗 Dos compases distintos'], 'Se toca solo la primera nota y se mantiene lo que duran las dos.', ['🔗 Misma nota, dos figuras.'], 'conc'),
  S('c11', 'conc', 'Las <b>alteraciones</b> sirven para…', '♯ Cambiar la altura de una nota (subir o bajar un semitono)', ['♯ Cambiar la duración', '♯ Cambiar la intensidad'], 'Sostenido ♯ sube un semitono · bemol ♭ baja un semitono · becuadro ♮ anula.', ['♯ Sostenido sube, bemol baja.'], 'conc'),
  S('c12', 'conc', 'Las <b>líneas divisorias</b> sirven para…', '📏 Separar los compases', ['📏 Indicar el final de la obra', '📏 Unir dos notas'], 'La doble barra final indica que la obra termina.', ['📏 Líneas verticales en el pentagrama.'], 'comp'),
  S('c13', 'conc', 'Las líneas del pentagrama se cuentan…', '⬆️ De abajo arriba', ['⬇️ De arriba abajo', '↔️ De izquierda a derecha'], 'La 1.ª línea es la de <b>abajo</b>.', ['⬆️ Como los pisos de un edificio.'], 'conc'),
  S('c14', 'conc', 'El <b>calderón</b> (𝄐) sobre una nota indica que…', '⏸️ Se alarga a gusto del intérprete', ['⏸️ Se toca muy fuerte', '⏸️ Se toca muy corta'], 'Se detiene el pulso y la nota se mantiene más tiempo.', ['⏸️ Parece un ojo que mira la nota.'], 'part'),

  // ===== NOTAS =====
  S('n1', 'notas', '¿Cuáles son las notas de las <b>líneas</b> en clave de sol (de abajo arriba)?', '🎼 Mi, Sol, Si, Re, Fa', ['🎼 Fa, La, Do, Mi', '🎼 Do, Re, Mi, Fa, Sol'], 'Líneas: <b>Mi-Sol-Si-Re-Fa</b>.', ['🔤 Van saltando de una en una: Mi (Fa) Sol (La) Si…'], 'notas'),
  S('n2', 'notas', '¿Cuáles son las notas de los <b>espacios</b> en clave de sol (de abajo arriba)?', '🎼 Fa, La, Do, Mi', ['🎼 Mi, Sol, Si, Re', '🎼 Re, Fa, La, Do'], 'Espacios: <b>Fa-La-Do-Mi</b>.', ['🔤 Son las notas que faltan entre las líneas.'], 'notas'),
  S('n3', 'notas', 'La clave de sol se coloca en la…', '2️⃣ 2.ª línea', ['1️⃣ 1.ª línea', '3️⃣ 3.ª línea'], 'Su caracol empieza en la 2.ª línea: allí está el Sol.', ['🌀 Mira dónde se enrosca.'], 'notas'),
  S('n4', 'notas', 'El <b>Do grave</b> en clave de sol se escribe…', '➖ En una línea adicional debajo del pentagrama', ['➖ En el primer espacio', '➖ En la 1.ª línea'], 'Es el «Do central» del piano.', ['➖ Por debajo del Re, que cuelga de la 1.ª línea.'], 'notas'),
  S('n5', 'notas', '¿Qué nota va justo <b>debajo de la 1.ª línea</b> (colgando)?', '🎼 Re', ['🎼 Do', '🎼 Fa'], 'Por debajo del Mi (1.ª línea) va el Re, y luego el Do con línea adicional.', ['🔢 Cuenta hacia abajo desde Mi.'], 'notas'),

  // ===== FIGURAS =====
  S('f1', 'fig', '¿Cuántas <b>negras</b> vale una redonda?', '🎵 4', ['🎵 2', '🎵 8'], 'Redonda = 2 blancas = <b>4 negras</b>.', ['🎵 Redonda → blanca → negra: cada una vale la mitad.'], 'fig'),
  S('f2', 'fig', '¿Cuántas <b>corcheas</b> vale una negra?', '🎵 2', ['🎵 4', '🎵 ½'], 'Negra = <b>2 corcheas</b> = 4 semicorcheas.', ['🎵 La corchea es la mitad de la negra.'], 'fig'),
  S('f3', 'fig', 'Cada figura vale <b>___</b> que la siguiente más pequeña.', '✖️ El doble', ['✖️ El triple', '✖️ Lo mismo'], 'Redonda 4 → blanca 2 → negra 1 → corchea ½ → semicorchea ¼.', ['✖️ 4 → 2 → 1…'], 'fig'),
  S('f4', 'fig', '¿Qué figura tiene <b>dos corchetes</b> (banderitas)?', '🎵 Semicorchea', ['🎵 Corchea', '🎵 Negra'], 'Corchea: 1 corchete · semicorchea: <b>2 corchetes</b>.', ['🎵 «Semi» = más pequeña: más corchetes.'], 'fig'),
  S('f5', 'fig', 'El silencio de <b>redonda</b> y el de blanca se diferencian en que…', '🪝 El de redonda cuelga de la 4.ª línea y el de blanca se apoya en la 3.ª', ['🪝 Son iguales', '🪝 El de redonda es más pequeño'], 'Redonda (más larga, más «pesada») → <b>cuelga</b>. Blanca → <b>apoyado</b> como un sombrero.', ['🎩 El de blanca parece un sombrero puesto.'], 'fig'),
  S('f6', 'fig', '¿Cuánto vale una <b>negra con puntillo</b>?', '🎵 1 ½ tiempos (3 corcheas)', ['🎵 2 tiempos', '🎵 1 tiempo'], 'Negra 1 + mitad ½ = <b>1 ½</b>.', ['• El puntillo suma la mitad.'], 'fig'),

  // ===== COMPASES =====
  S('m1', 'comp', 'En un compás de <b>3/4</b>, el 3 indica…', '3️⃣ Que hay 3 tiempos en cada compás', ['3️⃣ Que la figura que vale un tiempo es la blanca', '3️⃣ Que la obra tiene 3 compases'], 'Arriba: número de tiempos · abajo (4): la <b>negra</b> vale un tiempo.', ['🔢 El número de arriba cuenta.'], 'comp'),
  S('m2', 'comp', 'En los compases <b>2/4, 3/4 y 4/4</b>, el 4 de abajo indica que…', '4️⃣ La negra vale un tiempo', ['4️⃣ Hay 4 tiempos', '4️⃣ La redonda vale un tiempo'], 'El número de abajo dice qué figura es la unidad: 4 = negra.', ['4️⃣ La negra es la «cuarta parte» de la redonda.'], 'comp'),
  S('m3', 'comp', 'Un compás de 4/4 lleno con <b>una sola figura</b>. ¿Cuál es?', '🎵 Una redonda', ['🎵 Una blanca', '🎵 Una blanca con puntillo'], '4 tiempos = <b>redonda</b>.', ['🔢 ¿Qué figura vale 4?'], 'comp'),
  S('m4', 'comp', 'Un compás de 3/4 lleno con <b>una sola figura</b>. ¿Cuál es?', '🎵 Una blanca con puntillo', ['🎵 Una redonda', '🎵 Una blanca'], 'Blanca con puntillo = 2 + 1 = <b>3 tiempos</b>.', ['• Una blanca y su mitad…'], 'comp'),
  S('m5', 'comp', 'La <b>doble barra</b> al final del pentagrama indica…', '🏁 El final de la obra', ['🏁 Que hay que repetir', '🏁 Un cambio de clave'], 'Doble barra final (una fina y una gruesa) = <b>fin</b>.', ['🏁 Es la meta.'], 'comp'),

  // ===== PARTITURA =====
  S('a1', 'part', 'Los matices <b>p, mf, f</b> son de…', '🎚️ Dinámica', ['⏱️ Tempo', '🎯 Articulación'], 'Indican lo <b>fuerte o suave</b> que se toca.', ['🔈 Tienen que ver con el volumen.'], 'part'),
  S('a2', 'part', '<b>Allegro, Andante, Adagio</b> son indicaciones de…', '⏱️ Tempo', ['🎚️ Dinámica', '🎯 Articulación'], 'Dicen la <b>velocidad</b> de la obra.', ['⏱️ ¿Rápido o lento?'], 'part'),
  S('a3', 'part', 'El <b>staccato (picado)</b> y el <b>acento</b> son de…', '🎯 Articulación', ['🎚️ Dinámica', '⏱️ Tempo'], 'La articulación dice <b>cómo se ataca</b> cada nota (separada, ligada, marcada).', ['🎯 ¿Cómo se toca cada nota?'], 'part'),
  S('a4', 'part', 'Ordena de <b>más suave a más fuerte</b>:', '🎚️ pp – p – mp – mf – f – ff', ['🎚️ p – pp – mf – mp – f – ff', '🎚️ ff – f – mf – mp – p – pp'], 'pianissimo, piano, mezzopiano, mezzoforte, forte, fortissimo.', ['🎚️ «m» (mezzo) = medio.'], 'part'),
  S('a5', 'part', 'Ordena de <b>más lento a más rápido</b>:', '⏱️ Largo – Adagio – Andante – Allegro – Presto', ['⏱️ Presto – Allegro – Andante – Adagio – Largo', '⏱️ Andante – Largo – Presto – Adagio – Allegro'], 'Largo y Adagio son lentos; Andante, tranquilo (al paso); Allegro, rápido; Presto, muy rápido.', ['🚶 Andante = andando.'], 'part'),
  S('a6', 'part', '¿Qué significa <i>ritardando</i> (rit.)?', '🐢 Ir frenando poco a poco', ['🐇 Ir acelerando poco a poco', '🔈 Ir bajando el volumen'], 'Es una indicación de <b>tempo</b>. Lo contrario: <i>accelerando</i>.', ['🐢 «Retardar» = retrasar.'], 'part'),
  S('a7', 'part', 'Una <b>ligadura de expresión</b> (línea curva sobre notas de distinta altura) indica…', '〰️ Tocar las notas unidas (legato)', ['〰️ Sumar las duraciones', '〰️ Tocarlas muy fuertes'], 'Es de <b>articulación</b>. Si une notas iguales, es de prolongación.', ['〰️ ¿Notas distintas o iguales?'], 'part'),

  // ===== ESCALAS =====
  S('e1', 'esc', 'El esquema de la <b>escala mayor</b> es…', '🪜 T T S T T T S', ['🪜 T S T T S T T', '🪜 T T T S T T S'], 'Escala mayor: <b>tono, tono, semitono, tono, tono, tono, semitono</b>.', ['🪜 Do mayor no lleva alteraciones: Do-Re (T), Re-Mi (T), Mi-Fa (S)…'], 'esc'),
  S('e2', 'esc', 'El esquema de la <b>escala menor natural</b> es…', '🪜 T S T T S T T', ['🪜 T T S T T T S', '🪜 S T T S T T T'], 'Escala menor: <b>T S T T S T T</b> (como La menor, sin alteraciones).', ['🪜 La-Si (T), Si-Do (S)…'], 'esc'),
  S('e3', 'esc', 'Entre qué notas naturales hay solo un <b>semitono</b>?', '🎹 Mi-Fa y Si-Do', ['🎹 Do-Re y Fa-Sol', '🎹 La-Si y Re-Mi'], 'En el piano, entre Mi-Fa y Si-Do no hay tecla negra.', ['🎹 ¿Dónde no hay tecla negra en el piano?'], 'esc'),
  S('e4', 'esc', 'Una escala tiene…', '8️⃣ 8 notas: la última repite la primera más aguda', ['8️⃣ 5 notas', '8️⃣ 12 notas'], 'Do-Re-Mi-Fa-Sol-La-Si-<b>Do</b>: 7 notas distintas y la 8.ª es la primera repetida.', ['🔢 Empieza y acaba en la misma nota.'], 'esc'),
  S('e5', 'esc', 'La escala de <b>Do mayor</b> lleva…', '✅ Ninguna alteración', ['♯ Fa sostenido', '♭ Si bemol'], 'Do mayor encaja perfecto en T T S T T T S con las teclas blancas.', ['🎹 Solo teclas blancas.'], 'esc'),
  S('e6', 'esc', 'La escala de <b>La menor</b> lleva…', '✅ Ninguna alteración', ['♯ Fa sostenido', '♯ Sol sostenido'], 'La menor natural: La-Si-Do-Re-Mi-Fa-Sol-La, todas blancas (T S T T S T T).', ['🎹 Empieza en La y solo teclas blancas.'], 'esc'),
  S('e7', 'esc', 'Un <b>sostenido</b> (♯) delante de una nota…', '⬆️ La sube un semitono', ['⬇️ La baja un semitono', '⬆️ La sube un tono'], 'Sostenido sube · bemol baja · becuadro anula.', ['♯ Sostenido «sostiene» hacia arriba.'], 'esc'),
];

/* ---------- GENERADORES ---------- */
const NOTAS_ESC = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5', 'g5', 'a5'];
const NIV_NOTAS = { 1: ['e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5'], 2: ['d4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5', 'g5'], 3: NOTAS_ESC };
const lugar = (n) => {
  const i = idx(n) - 30;   // 0 = 1.ª línea
  if (i < -1) return 'con una línea adicional debajo';
  if (i === -1) return 'colgando debajo de la 1.ª línea';
  if (i > 9) return 'con una línea adicional encima';
  if (i === 9) return 'encima de la 5.ª línea';
  return i % 2 === 0 ? `en la ${i / 2 + 1}.ª línea` : `en el ${(i + 1) / 2}.º espacio`;
};
const NOMBRES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

function genNota(nivel) {
  const n = pick(NIV_NOTAS[nivel]); const ok = nombreNota(n);
  const vecinos = NOMBRES.filter((x) => x !== ok);
  const i = NOMBRES.indexOf(ok);
  const no = [NOMBRES[(i + 1) % 7], NOMBRES[(i + 6) % 7], NOMBRES[(i + 2) % 7]].filter((x) => x !== ok);  // errores típicos: nota vecina
  const reves = Math.random() < (nivel === 3 ? 0.4 : 0.2);
  if (reves) {   // ¿dónde está la nota X? → opciones con pentagramas
    const otros = sacar(NIV_NOTAS[nivel].filter((m) => nombreNota(m) !== ok), 2);
    const dib = (m) => partitura([{ n: m, d: 1 }], { mini: true, aria: 'nota' });
    return { p: 'notas', pil: 'notas', t: `¿En qué pentagrama está la nota <b>${ok}</b>?`, ok: dib(n), no: otros.map(dib),
      ex: `${ok} se escribe ${lugar(n)}.`, tr: ['🎼 Líneas: Mi-Sol-Si-Re-Fa.', '🎼 Espacios: Fa-La-Do-Mi.'] };
  }
  return { p: 'notas', pil: 'notas', t: `¿Qué nota es?${partitura([{ n, d: 1 }], { aria: 'nota en clave de sol' })}`,
    ok, no: sacar(no.length >= 2 ? no : vecinos, 2), ex: `Es <b>${ok}</b>: está ${lugar(n)}.`,
    tr: [`📍 Está ${lugar(n)}.`, '🎼 Líneas de abajo arriba: Mi-Sol-Si-Re-Fa · espacios: Fa-La-Do-Mi.'] };
}

/* Figuras */
const FIGS = [
  { d: 1, nombre: 'Redonda', v: 4 }, { d: 2, nombre: 'Blanca', v: 2 }, { d: 4, nombre: 'Negra', v: 1 },
  { d: 8, nombre: 'Corchea', v: 0.5 }, { d: 16, nombre: 'Semicorchea', v: 0.25 },
];
function genFigura(nivel) {
  const f = pick(FIGS), nota = pick(['g4', 'a4', 'f4', 'e4']);
  const otros = sacar(FIGS.filter((x) => x !== f).map((x) => x.nombre), 2);
  const tipo = nivel === 1 ? pick(['fig', 'fig', 'val']) : nivel === 2 ? pick(['sil', 'val', 'fig']) : pick(['sil', 'eq', 'pun']);
  if (tipo === 'fig') return { p: 'fig', pil: 'fig', t: `¿Cómo se llama esta figura?${partitura([{ n: nota, d: f.d }], { aria: 'figura' })}`, ok: f.nombre, no: otros,
    ex: `Es una <b>${f.nombre.toLowerCase()}</b> y vale ${fmt(f.v)} ${f.v === 1 ? 'tiempo' : 'tiempos'} de negra.`, tr: ['⚪ ¿La cabeza es blanca o negra?', '📍 ¿Tiene plica? ¿Cuántos corchetes?'] };
  if (tipo === 'sil') return { p: 'fig', pil: 'fig', t: `¿De qué figura es este <b>silencio</b>?${partitura([{ r: true, d: f.d }], { aria: 'silencio' })}`, ok: f.nombre, no: otros,
    ex: `Es el silencio de <b>${f.nombre.toLowerCase()}</b>.` + (f.d <= 2 ? ' Recuerda: el de redonda <b>cuelga</b> de la 4.ª línea, el de blanca se <b>apoya</b> en la 3.ª.' : ''),
    tr: ['🎩 El de redonda cuelga; el de blanca se apoya.', '🎵 Corchea: 1 «gancho» · semicorchea: 2.'] };
  if (tipo === 'val') return { p: 'fig', pil: 'fig', t: `¿Cuántos tiempos de negra vale una <b>${f.nombre.toLowerCase()}</b>?`, ok: fmt(f.v), no: sacar(['4', '2', '1', '½', '¼', '8'].filter((x) => x !== fmt(f.v)), 2),
    ex: `Redonda 4 · blanca 2 · negra 1 · corchea ½ · semicorchea ¼. La ${f.nombre.toLowerCase()} vale <b>${fmt(f.v)}</b>.`, tr: ['🎵 Cada figura vale el doble que la siguiente.'] };
  if (tipo === 'pun') {
    const g = pick(FIGS.slice(1, 4)); const v = g.v * 1.5;
    return { p: 'fig', pil: 'fig', t: `¿Cuánto vale una <b>${g.nombre.toLowerCase()} con puntillo</b>?${partitura([{ n: nota, d: g.d, dot: true }], { aria: 'figura con puntillo' })}`,
      ok: `${fmt(v)} tiempos`, no: [`${fmt(g.v * 2)} tiempos`, `${fmt(g.v + 1)} tiempos`].map((x, k) => (x === `${fmt(v)} tiempos` ? `${fmt(g.v)} tiempos` : x)),
      ex: `${g.nombre} ${fmt(g.v)} + la mitad (${fmt(g.v / 2)}) = <b>${fmt(v)}</b>.`, tr: ['• El puntillo suma <b>la mitad</b> del valor de la figura.'] };
  }
  // equivalencias
  let a, b; do { a = pick(FIGS.slice(0, 4)); b = pick(FIGS.slice(1)); } while (b.v >= a.v);
  const n = a.v / b.v;
  return { p: 'fig', pil: 'fig', t: `¿Cuántas <b>${b.nombre.toLowerCase()}s</b> caben en una <b>${a.nombre.toLowerCase()}</b>?`, ok: String(n), no: sacar(['2', '4', '8', '16', '3', '6'].filter((x) => x !== String(n)), 2),
    ex: `${a.nombre} = ${fmt(a.v)} · ${b.nombre} = ${fmt(b.v)} → ${fmt(a.v)} : ${fmt(b.v)} = <b>${n}</b>.`, tr: ['🎵 Redonda 4 · blanca 2 · negra 1 · corchea ½ · semicorchea ¼.', '➗ Divide los valores.'] };
}

/* Compases */
const VALOR = (e) => (FIGS.find((f) => f.d === e.d).v) * (e.dot ? 1.5 : 1);
const NOMBRE_HUECO = { 4: 'Redonda', 3: 'Blanca con puntillo', 2: 'Blanca', 1.5: 'Negra con puntillo', 1: 'Negra', 0.5: 'Corchea', 0.25: 'Semicorchea' };
const POOL = [{ d: 2 }, { d: 4 }, { d: 4 }, { d: 8 }, { d: 4, dot: true }, { d: 2, dot: true }];
function rellenar(tiempos) {
  const out = []; let resto = tiempos;
  while (resto > 0) {
    const ops = POOL.filter((e) => VALOR(e) <= resto);
    let e = pick(ops);
    if (e.d === 8) { if (resto >= 1) { out.push({ d: 8 }, { d: 8 }); resto -= 1; } else { out.push({ d: 8 }); resto -= 0.5; } continue; }   // corcheas por parejas
    if (e.dot && e.d === 4) { if (resto - 1.5 < 0.5) e = { d: 4 }; else { out.push({ d: 4, dot: true }, { d: 8 }); resto -= 2; continue; } }
    out.push(e); resto -= VALOR(e);
  }
  return out;
}
const melodia = (figs) => figs.map((e) => ({ ...e, n: pick(['e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5']) }));
function genCompas(nivel) {
  const metro = pick(nivel === 1 ? ['4/4', '2/4'] : ['2/4', '3/4', '4/4']); const T = +metro[0];
  const tipo = nivel === 1 ? 'hueco' : nivel === 2 ? pick(['hueco', 'contar']) : pick(['hueco', 'contar', 'mal']);
  if (tipo === 'hueco') {
    const huecos = [4, 3, 2, 1.5, 1, 0.5].filter((h) => h <= T && (h !== 4 || T === 4) && (nivel > 1 || [2, 1, 4].includes(h)) && (h < T || nivel > 1));
    const h = pick(huecos);
    const resto = rellenar(T - h);
    const pos = R(0, resto.length);
    const els = melodia(resto);
    els.splice(pos, 0, { hueco: true, d: 4 });
    const ok = NOMBRE_HUECO[h];
    const no = sacar(Object.values(NOMBRE_HUECO).filter((x) => x !== ok && x !== 'Semicorchea'), 2);
    const suma = resto.map((e) => fmt(VALOR(e))).join(' + ') || '0';
    return { p: 'comp', pil: 'comp', t: `Compás de <b>${metro}</b>. ¿Qué <b>figura</b> falta en el hueco?${partitura([...els, { fin: true }], { metro, aria: 'compás incompleto' })}`, ok, no,
      ex: `El compás de ${metro} tiene ${T} tiempos. ${resto.length ? `Hay ${suma} = ${fmt(T - h)}` : 'Está vacío'}, así que falta${h === 1 ? '' : 'n'} ${fmt(h)} → <b>${ok.toLowerCase()}</b>.`,
      tr: [`🔢 Un compás de ${metro} tiene ${T} tiempos.`, '➕ Suma las figuras que ya hay.', '➖ Lo que falta es la figura del hueco.'] };
  }
  if (tipo === 'contar') {
    const nc = R(2, 4); let figs = []; for (let i = 0; i < nc; i++) figs = figs.concat(rellenar(T));
    const ok = String(nc);
    return { p: 'comp', pil: 'comp', t: `Si colocas las líneas divisorias en compás de <b>${metro}</b>, ¿cuántos compases salen?${partitura([...melodia(figs), { fin: true }], { metro, aria: 'notas sin líneas divisorias' })}`,
      ok, no: sacar(['1', '2', '3', '4', '5', '6'].filter((x) => x !== ok), 2),
      ex: `En total suman ${fmt(nc * T)} tiempos; ${fmt(nc * T)} : ${T} = <b>${nc} compases</b>.`, tr: ['➕ Suma los tiempos de todas las figuras.', `➗ Divide entre ${T}.`] };
  }
  // ¿qué compás está mal?
  const buenos = [rellenar(T), rellenar(T)]; const malo = rellenar(T); const quitar = malo.findIndex((e) => VALOR(e) === 1 || VALOR(e) === 2);
  if (quitar < 0) return genCompas(2);
  const sobra = pick([true, false]);
  if (sobra) malo.push({ d: 4 }); else malo.splice(quitar, 1);
  const orden = mezclar([0, 1, 2]); const bloques = [buenos[0], buenos[1], malo];
  let els = []; orden.forEach((k, i) => { els = els.concat(melodia(bloques[k])); els.push(i < 2 ? { bar: true } : { fin: true }); });
  const pos = orden.indexOf(2) + 1;
  const suma = malo.reduce((a, e) => a + VALOR(e), 0);
  return { p: 'comp', pil: 'comp', t: `Compás de <b>${metro}</b>. ¿Qué compás está <b>mal</b>?${partitura(els, { metro, aria: 'tres compases' })}`,
    ok: `El ${pos}.º`, no: [1, 2, 3].filter((x) => x !== pos).map((x) => `El ${x}.º`),
    ex: `El ${pos}.º suma ${fmt(suma)} tiempos y debería sumar ${T}: le ${sobra ? 'sobra' : 'falta'} ${fmt(Math.abs(suma - T))}.`, tr: [`🔢 Cada compás debe sumar ${T} tiempos.`, '➕ Suma compás por compás.'] };
}

/* Partitura: signos */
const ELEM = [
  { k: 'p', ver: () => signo('E520', 'p'), nombre: 'Piano', sig: 'Tocar suave', tipo: 'Dinámica' },
  { k: 'f', ver: () => signo('E522', 'f'), nombre: 'Forte', sig: 'Tocar fuerte', tipo: 'Dinámica' },
  { k: 'mf', ver: () => signo('E52D', 'mf'), nombre: 'Mezzoforte', sig: 'Tocar medio fuerte', tipo: 'Dinámica' },
  { k: 'ff', ver: () => signo('E52F', 'ff'), nombre: 'Fortissimo', sig: 'Tocar muy fuerte', tipo: 'Dinámica' },
  { k: 'cresc', ver: () => '<svg class="signo" viewBox="0 0 80 30" width="80" role="img" aria-label="regulador de crescendo"><path d="M76 4 L4 15 L76 26" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>', nombre: 'Crescendo (regulador)', sig: 'Ir subiendo la intensidad poco a poco', tipo: 'Dinámica' },
  { k: 'dim', ver: () => '<svg class="signo" viewBox="0 0 80 30" width="80" role="img" aria-label="regulador de diminuendo"><path d="M4 4 L76 15 L4 26" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>', nombre: 'Diminuendo (regulador)', sig: 'Ir bajando la intensidad poco a poco', tipo: 'Dinámica' },
  { k: 'stacc', ver: () => partitura([{ n: 'g4', d: 4, art: 'stacc' }, { n: 'a4', d: 4, art: 'stacc' }, { n: 'b4', d: 4, art: 'stacc' }], { aria: 'notas con punto' }), nombre: 'Staccato (picado)', sig: 'Notas cortas y separadas', tipo: 'Articulación' },
  { k: 'acento', ver: () => partitura([{ n: 'g4', d: 4, art: 'acento' }, { n: 'g4', d: 4 }, { n: 'g4', d: 4 }], { aria: 'nota con acento' }), nombre: 'Acento', sig: 'Tocar esa nota más marcada', tipo: 'Articulación' },
  { k: 'ferm', ver: () => partitura([{ n: 'g4', d: 2, ferm: true }], { aria: 'nota con calderón' }), nombre: 'Calderón', sig: 'Alargar la nota a gusto del intérprete', tipo: 'Tempo' },
  { k: 'allegro', ver: () => '<b class="tempo">Allegro</b>', nombre: 'Allegro', sig: 'Rápido', tipo: 'Tempo' },
  { k: 'andante', ver: () => '<b class="tempo">Andante</b>', nombre: 'Andante', sig: 'Tranquilo, al paso', tipo: 'Tempo' },
  { k: 'adagio', ver: () => '<b class="tempo">Adagio</b>', nombre: 'Adagio', sig: 'Lento', tipo: 'Tempo' },
  { k: 'presto', ver: () => '<b class="tempo">Presto</b>', nombre: 'Presto', sig: 'Muy rápido', tipo: 'Tempo' },
  { k: 'rit', ver: () => '<b class="tempo"><i>rit.</i></b>', nombre: 'Ritardando', sig: 'Ir frenando poco a poco', tipo: 'Tempo' },
  { k: 'accel', ver: () => '<b class="tempo"><i>accel.</i></b>', nombre: 'Accelerando', sig: 'Ir acelerando poco a poco', tipo: 'Tempo' },
];
function genSigno(nivel) {
  const e = pick(ELEM.filter((x) => x.k !== 'ferm' || nivel > 1));
  const modo = nivel === 1 ? 'sig' : nivel === 2 ? pick(['sig', 'tipo']) : pick(['tipo', 'sig', 'inv']);
  if (modo === 'tipo') {
    const ok = e.tipo; const no = ['Dinámica', 'Tempo', 'Articulación'].filter((x) => x !== ok);
    return { p: 'part', pil: 'part', t: `¿Este signo es de dinámica, tempo o articulación?<div class="signo-caja">${e.ver()}</div>`, ok, no,
      ex: `Es <b>${e.nombre}</b> (${e.sig.toLowerCase()}): es de <b>${ok.toLowerCase()}</b>.`, tr: ['🎚️ Dinámica: fuerte o suave.', '⏱️ Tempo: rápido o lento.', '🎯 Articulación: cómo se ataca cada nota.'] };
  }
  if (modo === 'inv') {
    const otros = sacar(ELEM.filter((x) => x !== e && x.tipo === e.tipo), 2);
    const otros2 = otros.length === 2 ? otros : sacar(ELEM.filter((x) => x !== e), 2);
    return { p: 'part', pil: 'part', t: `¿Qué signo significa «<b>${e.sig.toLowerCase()}</b>»?`, ok: `<span class="signo-op">${e.ver()}</span>`, no: otros2.map((x) => `<span class="signo-op">${x.ver()}</span>`),
      ex: `Es <b>${e.nombre}</b> (${e.tipo.toLowerCase()}).`, tr: ['🔎 Piensa si es de volumen, de velocidad o de cómo se toca la nota.'] };
  }
  const otros = sacar(ELEM.filter((x) => x !== e && x.sig !== e.sig).map((x) => x.sig), 2);
  return { p: 'part', pil: 'part', t: `¿Qué significa este signo?<div class="signo-caja">${e.ver()}</div>`, ok: e.sig, no: otros,
    ex: `Es <b>${e.nombre}</b>: ${e.sig.toLowerCase()} (${e.tipo.toLowerCase()}).`, tr: ['🔎 ¿Es una letra (matiz), una palabra italiana (tempo) o un signo pegado a la nota (articulación)?'] };
}

/* Escalas */
const PATRON = { mayor: ['T', 'T', 'S', 'T', 'T', 'T', 'S'], menor: ['T', 'S', 'T', 'T', 'S', 'T', 'T'] };
const SEMI = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
function escala(ton, tipo) {   // ton: 'g4' → ['g4','a4','b4','c5','d5','e5','f#5','g5']
  const L = 'cdefgab'; let l = ton[0], o = +ton.slice(-1), a = 0; const out = [ton];
  const abs = (l, o, a) => o * 12 + SEMI[l] + a;
  for (const p of PATRON[tipo]) {
    const nl = L[(L.indexOf(l) + 1) % 7], no = o + (nl === 'c' ? 1 : 0);
    const na = abs(l, o, a) + (p === 'T' ? 2 : 1) - abs(nl, no, 0);
    out.push(nl + (na === 1 ? '#' : na === -1 ? 'b' : '') + no); l = nl; o = no; a = na;
  }
  return out;
}
const ESCALAS = [['c4', 'mayor', 'Do mayor'], ['g4', 'mayor', 'Sol mayor'], ['f4', 'mayor', 'Fa mayor'], ['d4', 'mayor', 'Re mayor'],
  ['a4', 'menor', 'La menor'], ['e4', 'menor', 'Mi menor'], ['d4', 'menor', 'Re menor']];
const altera = (es) => es.filter((n) => n.length === 3).map(nombreNota);
const dibEsc = (es, marcar = -1) => partitura(es.map((n, i) => ({ n: n.slice(0, 1) + n.slice(-1), d: 1, acc: n.length === 3 ? (n[1] === '#' ? '#' : 'b') : undefined, marca: i === marcar || i === marcar + 1 })), { aria: 'escala' });
function genEscala(nivel) {
  const pool = nivel === 1 ? ESCALAS.slice(0, 1).concat([ESCALAS[4]]) : nivel === 2 ? ESCALAS.slice(0, 3).concat(ESCALAS.slice(4, 6)) : ESCALAS;
  const [ton, tipo, nom] = pick(pool); const es = escala(ton, tipo);
  const modo = nivel === 1 ? 'paso' : pick(['paso', 'alt', 'patron']);
  if (modo === 'alt') {
    const al = altera(es); const ok = al.length ? al.join(' y ') : 'Ninguna';
    const cand = ['Ninguna', 'Fa♯', 'Si♭', 'Fa♯ y Do♯', 'Mi♭', 'Do♯', 'Sol♯'].filter((x) => x !== ok);
    return { p: 'esc', pil: 'esc', t: `¿Qué <b>alteración</b> necesita la escala de <b>${nom}</b>?`, ok, no: sacar(cand, 2),
      ex: `${nom} (${PATRON[tipo].join(' ')}): ${es.map(nombreNota).join(' – ')}.${dibEsc(es)}`, tr: [`🪜 Escribe las 8 notas desde ${nombreNota(ton)}.`, `📏 Aplica ${PATRON[tipo].join(' ')}.`, '🎹 Recuerda: Mi-Fa y Si-Do son semitonos.'] };
  }
  if (modo === 'patron') {
    return { p: 'esc', pil: 'esc', t: `Mira estos tonos y semitonos: <b>${PATRON[tipo].join(' – ')}</b>. ¿Qué tipo de escala es?`, ok: tipo === 'mayor' ? 'Mayor' : 'Menor natural', no: [tipo === 'mayor' ? 'Menor natural' : 'Mayor', 'Cromática'],
      ex: `Mayor: T T S T T T S · menor natural: T S T T S T T. Por ejemplo, <b>${nom}</b>.`, tr: ['🪜 ¿Dónde está el primer semitono? En la mayor, entre la 3.ª y la 4.ª nota.'] };
  }
  const i = R(0, 6); const p = PATRON[tipo][i];
  return { p: 'esc', pil: 'esc', t: `Escala de <b>${nom}</b>. Entre las notas <b>${nombreNota(es[i])}</b> y <b>${nombreNota(es[i + 1])}</b> (las marcadas), ¿hay un tono o un semitono?${dibEsc(es, i)}`,
    ok: p === 'T' ? 'Un tono (T)' : 'Un semitono (S)', no: [p === 'T' ? 'Un semitono (S)' : 'Un tono (T)', 'Dos tonos'],
    ex: `En la escala ${tipo} el esquema es ${PATRON[tipo].join(' ')}: el paso ${i + 1}.º es <b>${p === 'T' ? 'un tono' : 'un semitono'}</b>.`, tr: [`🪜 Escala ${tipo}: ${PATRON[tipo].join(' ')}.`, '🎹 Mi-Fa y Si-Do son semitonos.'] };
}

/* Cualidades: situaciones */
const SITUACIONES = [
  ['Reconoces la voz de un amigo antes de verlo.', 'Timbre'], ['Distingues una guitarra de un piano tocando la misma nota.', 'Timbre'],
  ['Un pájaro canta muy agudo y un león ruge grave.', 'Altura'], ['Subes de una nota a otra más aguda en la flauta.', 'Altura'],
  ['Susurras un secreto y luego gritas «¡gol!».', 'Intensidad'], ['El profe pide tocar esa parte <i>piano</i>.', 'Intensidad'],
  ['Una redonda dura más que una corchea.', 'Duración'], ['El timbre del recreo suena un segundo; la alarma, un minuto.', 'Duración'],
];
function genCualidad() {
  const [t, ok] = pick(SITUACIONES);
  return { p: 'son', pil: 'son', t: `¿Qué cualidad del sonido aparece aquí? <i>${t}</i>`, ok, no: sacar(['Altura', 'Duración', 'Intensidad', 'Timbre'].filter((x) => x !== ok), 2),
    ex: `<b>${ok}</b>. Altura = agudo/grave · duración = largo/corto · intensidad = fuerte/suave · timbre = quién suena.`, tr: ['🔊 ¿Cambia lo agudo, lo largo, lo fuerte o quién suena?'] };
}

const GENERADORES = {
  son: [G('gen:son', genCualidad)], conc: [],
  notas: [G('gen:notas', genNota)], fig: [G('gen:fig', genFigura)], comp: [G('gen:comp', genCompas)],
  part: [G('gen:part', genSigno)], esc: [G('gen:esc', genEscala)],
};

if (typeof module !== 'undefined') module.exports = { PLANETAS, FIJAS, GENERADORES, PIL, escala };
