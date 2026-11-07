/* =========================================================
   MISIÓN FÍSICA Y QUÍMICA · Banco de preguntas
   - Preguntas fijas (con id) para teoría.
   - Generadores (gen) que inventan ejercicios nuevos cada vez.
   Para añadir preguntas: copia una línea S(...) y cambia el texto.
   ========================================================= */

const PLANETAS = [
  { id: 'lab',      emoji: '🔬', nombre: 'Planeta Laboratorio', desc: 'Instrumentos, normas y pictogramas' },
  { id: 'metodo',   emoji: '🕵️', nombre: 'Planeta Detective',   desc: 'Método científico y ramas de la ciencia' },
  { id: 'si',       emoji: '📏', nombre: 'Planeta Unidades',    desc: 'Magnitudes, Sistema Internacional y kelvin' },
  { id: 'escalera', emoji: '🪜', nombre: 'Planeta Escalera',    desc: 'Cambios de unidades y factores de conversión' },
  { id: 'notacion', emoji: '🔢', nombre: 'Planeta Gigante',     desc: 'Notación científica y redondeo' },
  { id: 'errores',  emoji: '📈', nombre: 'Planeta Medidas',     desc: 'Errores al medir y gráficas' },
];

/* ---------- utilidades ---------- */
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const coma = (x) => Number(Number(x).toPrecision(12)).toString().replace('.', ',').replace('-', '−');
const signo = (x) => String(x).replace('-', '−');
const pot = (a, n) => `${a}·10<sup>${n}</sup>`;
const frac = (arriba, abajo) => `<span class="frac"><span>${arriba}</span><span>${abajo}</span></span>`;

/* Pregunta fija:
   S(id, planeta, texto, correcta, [incorrecta1, incorrecta2], explicación, [pasos del truco], píldora opcional) */
const S = (id, p, t, ok, no, ex, tr, pil) => ({ id, p, t, ok, no, ex, tr, pil });

/* ---------- PÍLDORAS (mini-teoría de 3-4 frases) ---------- */
const PIL = {
  instrumentos: '🧪 En el laboratorio cada instrumento tiene <b>un trabajo</b>: unos <b>miden</b> (probeta, pipeta, bureta, balanza), otros <b>calientan</b> (mechero) y otros <b>sujetan o guardan</b> (gradilla, pinzas, vaso de precipitados).',
  seguridad: '🦺 Truco de las <b>3 G</b>: <b>G</b>afas puestas, <b>G</b>uantes si hay peligro y <b>G</b>anas de comer… ¡fuera! Y si pasa algo, <b>se avisa al profe</b> enseguida.',
  pictos: '⚠️ Los <b>pictogramas</b> son rombos con borde rojo que avisan del peligro de un producto. Cada dibujo es un peligro distinto: 🔥 inflamable, ☠️ tóxico, 💥 explosivo…',
  pasos: '🕵️ Pasos del detective: <b>1</b> Observación 👀 → <b>2</b> Pregunta ❓ → <b>3</b> Hipótesis 💡 → <b>4</b> Experimentación 🧪 → <b>5</b> Análisis de datos 📊 → <b>6</b> Conclusión 🏆 → <b>7</b> Comunicar 📢',
  ramas: '🌳 La ciencia es un árbol: ⚡ <b>Física</b> (movimiento, fuerzas, energía), 🧪 <b>Química</b> (de qué están hechas las cosas y cómo cambian), 🐸 <b>Biología</b> (seres vivos), 🪨 <b>Geología</b> (la Tierra), 🔭 <b>Astronomía</b> (el espacio).',
  variables: '🎛️ En un experimento: la variable <b>independiente</b> es la que <b>yo cambio</b>, la <b>dependiente</b> es la que <b>mido</b> y las <b>controladas</b> son las que dejo igual.',
  magnitud: '📏 Una <b>magnitud</b> es algo que se puede <b>medir con un número y una unidad</b> (masa, longitud, tiempo). La belleza o la simpatía NO son magnitudes.',
  si: '🌍 El <b>SI</b> es el idioma común para medir en todo el mundo. Las básicas: longitud → <b>m</b>, masa → <b>kg</b>, tiempo → <b>s</b>, temperatura → <b>K</b>.',
  kelvin: '🌡️ En el SI la temperatura se mide en <b>kelvin (K)</b>. Truco: de °C a K <b>sumas 273</b>; de K a °C <b>restas 273</b>.',
  escalera: '🪜 La <b>escalera</b>: km · hm · dam · <b>m</b> · dm · cm · mm. <b>Bajar</b> un escalón = ×10 (la coma salta a la derecha ➡️). <b>Subir</b> = ÷10 (la coma salta a la izquierda ⬅️). Truco: <i>"Kiko Hace Dam Mucho Daño Con Martillos"</i> 🔨',
  factor: '✂️ Un <b>factor de conversión</b> es una fracción que vale 1, como ' + frac('1000 m', '1 km') + '. La unidad que quieres <b>quitar</b> va <b>abajo</b> para tacharla.',
  tiempo: '⏰ ¡Ojo! El tiempo <b>NO</b> va de 10 en 10. <b>1 h = 60 min</b> y <b>1 min = 60 s</b>. Por eso 1 h = 3600 s.',
  notacion: '🔢 <b>Notación científica</b> = número entre 1 y 9,99 × una potencia de 10. Truco: <b>cuenta los saltos</b> que da la coma. Número grande → exponente <b>positivo</b>. Número pequeñito (0,00…) → exponente <b>negativo</b>.',
  redondeo: '✂️ <b>Redondear</b>: cortas el número donde te dicen y miras la cifra de la derecha del corte. Si es <b>5 o más</b> ⬆️ la última cifra sube 1. Si es <b>menos de 5</b> ⬇️ se queda igual.',
  errores: '🎯 Ninguna medida es perfecta. <b>Error absoluto</b> = diferencia entre lo que mido y el valor real (siempre positivo y <b>con unidades</b>). <b>Error relativo</b> = error absoluto ÷ valor real (sin unidades, a veces en %).',
  graficas: '📈 En una gráfica, la variable que <b>yo cambio</b> (independiente) va en el eje <b>X</b> ➡️ (horizontal) y la que <b>mido</b> (dependiente) en el eje <b>Y</b> ⬆️ (vertical). ¡Y siempre con unidades!',
};

/* ---------- PREGUNTAS FIJAS ---------- */
const FIJAS = [
  // ===== LABORATORIO: instrumentos =====
  S('lab1', 'lab', '¿Qué usarías para medir <b>50 mL de agua</b> con bastante precisión?', '🧪 Probeta', ['🥄 Cuchara', '⚖️ Balanza'],
    'La <b>probeta</b> es el tubo alto con rayitas para medir volúmenes de líquidos.', ['📏 Pregúntate: ¿qué quiero medir? Un <b>volumen</b> de líquido.', '⚖️ La balanza mide <b>masa</b>, no volumen. ¿Cuál tiene rayitas para líquidos?'], 'instrumentos'),
  S('lab2', 'lab', '¿Para qué sirve la <b>balanza</b>?', '⚖️ Para medir la masa', ['🌡️ Para medir la temperatura', '🧪 Para medir el volumen'],
    'La balanza mide la <b>masa</b> (en gramos o kilos).', ['🛒 Piensa en la balanza de la fruta del súper. ¿Qué te dice? ¿Cuánto <b>pesa</b>, o sea, la masa.']),
  S('lab3', 'lab', 'Quieres <b>calentar</b> una sustancia. ¿Qué instrumento usas?', '🔥 Mechero Bunsen', ['🧫 Vidrio de reloj', '🧪 Bureta'],
    'El <b>mechero Bunsen</b> da la llama para calentar.', ['🔥 ¿Cuál de los tres hace fuego? Ese es el que calienta.'], 'instrumentos'),
  S('lab4', 'lab', '¿Dónde se colocan los <b>tubos de ensayo</b> para que no se caigan?', '🗄️ En la gradilla', ['🥣 En el mortero', '🔻 En el embudo'],
    'La <b>gradilla</b> es como un "parking" para tubos de ensayo.', ['🅿️ Imagina un parking con agujeros donde cada tubo se queda de pie.']),
  S('lab5', 'lab', '¿Con qué <b>sujetas un tubo de ensayo</b> mientras lo calientas?', '🗜️ Con pinzas de madera', ['✋ Con la mano', '🥄 Con una espátula'],
    'Las <b>pinzas de madera</b> evitan quemarte. ¡Nunca con la mano!', ['🔥 El tubo se pone muy caliente. ¿Qué lo sujeta sin quemarte?']),
  S('lab6', 'lab', 'Necesitas <b>triturar</b> (machacar) un sólido hasta hacerlo polvo. ¿Qué usas?', '🥣 Mortero', ['🧪 Probeta', '🔥 Mechero'],
    'El <b>mortero</b> con su mano sirve para machacar sólidos, como el de la cocina para el ajo.', ['🧄 Piensa en la cocina: ¿con qué se machaca el ajo?']),
  S('lab7', 'lab', 'Quieres <b>separar la arena del agua</b> filtrando. ¿Qué usas?', '🔻 Embudo con papel de filtro', ['🗄️ Gradilla', '⚖️ Balanza'],
    'El <b>embudo</b> con <b>papel de filtro</b> deja pasar el agua y atrapa la arena.', ['☕ Es como el filtro de una cafetera: el líquido pasa y lo sólido se queda.']),
  S('lab8', 'lab', '¿Qué instrumento tiene una <b>llave abajo</b> y sirve para añadir líquido <b>gota a gota</b>?', '🧪 Bureta', ['🥛 Vaso de precipitados', '🗄️ Gradilla'],
    'La <b>bureta</b> es un tubo largo con llave para soltar líquido gota a gota con mucha precisión.', ['🚰 Piensa en un grifo: ¿cuál tiene "llave" para abrir y cerrar?'], 'instrumentos'),
  S('lab9', 'lab', 'El recipiente con forma de <b>cono</b> que sirve para mezclar agitando sin salpicar es el…', '⏳ Matraz Erlenmeyer', ['🥛 Vaso de precipitados', '🔻 Embudo'],
    'El <b>matraz Erlenmeyer</b> es ancho abajo y estrecho arriba: puedes agitar sin que salpique.', ['🔺 Busca el que tiene forma de cono (de triángulo), pero que no es el embudo porque está cerrado abajo.']),
  S('lab10', 'lab', 'Para medir la <b>temperatura</b> de un líquido usas un…', '🌡️ Termómetro', ['⏱️ Cronómetro', '⚖️ Dinamómetro'],
    'El <b>termómetro</b> mide la temperatura.', ['🤒 ¿Qué te ponen cuando tienes fiebre?']),
  S('lab11', 'lab', '¿Qué instrumento mide volúmenes <b>pequeños</b> con mucha precisión, absorbiendo con una pera?', '💉 Pipeta', ['🥣 Mortero', '🔥 Mechero'],
    'La <b>pipeta</b> mide volúmenes pequeños muy exactos. Se llena con una <b>pera</b>, ¡nunca con la boca!', ['🥤 Es como una pajita de cristal con rayitas.']),
  S('lab12', 'lab', 'El <b>vaso de precipitados</b> sirve sobre todo para…', '🥛 Contener y calentar líquidos', ['📏 Medir volúmenes exactísimos', '🥣 Machacar sólidos'],
    'El vaso de precipitados <b>contiene y calienta</b> líquidos. Sus rayas son solo <b>aproximadas</b>.', ['🥛 Es como un vaso de cocina: guarda líquido, pero no mide muy exacto.']),
  // ===== LABORATORIO: seguridad =====
  S('seg1', 'lab', 'Al calentar un tubo de ensayo, ¿hacia dónde apuntas la boca del tubo?', '🚫 Hacia donde no haya nadie', ['😮 Hacia mi cara', '👨‍🔬 Hacia mi compañero'],
    'El líquido puede saltar de golpe 💥, así que siempre lejos de las personas.', ['💥 Imagina que el líquido salta como una palomita. ¿A quién quieres que le dé? A nadie.'], 'seguridad'),
  S('seg2', 'lab', 'Si se te rompe un tubo o te haces un corte en el laboratorio, ¿qué haces primero?', '🙋 Avisar al profesor', ['🤫 Esconderlo', '🧹 Recogerlo con la mano'],
    'Siempre se <b>avisa al profesor</b>. Él sabe qué hacer y cómo recoger el cristal.', ['👨‍🏫 En el laboratorio hay un "jefe de misión". ¿Quién es?'], 'seguridad'),
  S('seg3', 'lab', '¿Se puede comer un bocadillo en el laboratorio?', '🚫 No, nunca', ['✅ Sí, si tienes hambre', '🤏 Solo si es pequeño'],
    'Nunca se come ni se bebe en el laboratorio: podría haber restos de productos químicos.', ['🍔 Recuerda las 3 G: la tercera era "Ganas de comer… ¡fuera!"']),
  S('seg4', 'lab', 'Para saber a qué <b>huele</b> un producto, ¿cómo lo haces?', '👋 Abanicando el olor con la mano', ['👃 Metiendo la nariz en el bote', '👅 Probándolo'],
    'Se abanica con la mano hacia la nariz, desde lejos. Nunca se huele directamente ni se prueba.', ['👋 Imagina que acercas el olor como si saludaras.']),
  S('seg5', 'lab', 'Si tienes el <b>pelo largo</b>, en el laboratorio debes…', '💇 Llevarlo recogido', ['💨 Llevarlo suelto', '🧢 Da igual'],
    'Pelo recogido para que no toque las llamas ni los productos.', ['🔥 ¿Qué pasaría si el pelo se acerca al mechero?'], 'seguridad'),
  S('seg6', 'lab', 'Para mezclar un ácido con agua, la regla es…', '💧 Echar el ácido sobre el agua, poco a poco', ['🌊 Echar el agua sobre el ácido', '🌀 Da igual el orden'],
    'Truco: <b>"Nunca des de beber al ácido"</b>. Se echa el ácido sobre el agua, poco a poco.', ['🧃 Frase mágica: "Nunca des de beber al ácido". ¿Quién se echa encima de quién?']),
  S('seg7', 'lab', 'Te sobra un poco de producto. ¿Lo devuelves al bote original?', '🚫 No, se avisa al profe para tirarlo bien', ['✅ Sí, para no gastar', '🚽 Lo tiro por el fregadero'],
    'Nunca se devuelve al bote (se podría contaminar) ni se tira al fregadero sin permiso.', ['🦠 Si lo devuelves, ¿y si se ha ensuciado? Estropearías todo el bote.']),
  S('seg8', 'lab', 'Te salpica un producto en la piel. ¿Qué haces?', '🚿 Lavar con mucha agua y avisar al profe', ['🧻 Secarlo y seguir', '🤷 No hacer nada'],
    'Mucha agua abundante y avisar al profesor enseguida.', ['💧 Lo primero es quitar el producto de la piel. ¿Con qué?']),
  // ===== LABORATORIO: pictogramas =====
  S('pic1', 'lab', 'Un pictograma con una <b>🔥 llama</b> significa…', '🔥 Inflamable', ['❄️ Hay que congelarlo', '🍲 Hay que calentarlo'],
    'La llama = <b>inflamable</b>: arde fácilmente. ¡Lejos del mechero!', ['🔥 Si el dibujo es fuego, el peligro es que… ¡se puede quemar!'], 'pictos'),
  S('pic2', 'lab', 'Un pictograma con una <b>☠️ calavera</b> significa…', '☠️ Tóxico', ['🏴‍☠️ Es de piratas', '💧 Es agua'],
    'La calavera = <b>tóxico</b>: puede ser mortal si se traga, se respira o toca la piel.', ['☠️ La calavera significa peligro de muerte. ¿Cuál encaja?'], 'pictos'),
  S('pic3', 'lab', 'Un pictograma con una <b>💥 bomba explotando</b> significa…', '💥 Explosivo', ['🎆 Es para fiestas', '🧊 Se guarda en frío'],
    'La bomba = <b>explosivo</b>. Puede explotar con golpes, calor o chispas.', ['💥 El dibujo lo dice todo: ¡BUM!'], 'pictos'),
  S('pic4', 'lab', 'Un pictograma donde un líquido <b>daña una mano y un metal</b> significa…', '🧪 Corrosivo', ['🔥 Inflamable', '🌳 Ecológico'],
    'Es <b>corrosivo</b>: destruye la piel y los metales, como los ácidos fuertes.', ['🖐️ Si "se come" la mano y el metal, ¿qué palabra suena a "comer materiales"? Corrosivo.'], 'pictos'),
  S('pic5', 'lab', 'Un pictograma con un <b>🐟 pez muerto y un 🌳 árbol seco</b> significa…', '🌍 Peligroso para el medio ambiente', ['🎣 Producto de pesca', '🌱 Abono para plantas'],
    'Significa <b>peligro para el medio ambiente</b>: contamina ríos, animales y plantas.', ['🐟 Si el pez y el árbol están mal, ¿a quién daña? A la naturaleza.'], 'pictos'),
  S('pic6', 'lab', 'Un pictograma con un <b>❗ signo de exclamación</b> significa…', '❗ Nocivo o irritante', ['✅ Producto seguro', '🔥 Inflamable'],
    'La exclamación avisa de que es <b>nocivo o irritante</b>: puede irritar piel, ojos o garganta.', ['❗ Una exclamación es un "¡cuidado!" de nivel medio.'], 'pictos'),

  // ===== MÉTODO CIENTÍFICO =====
  S('met1', 'metodo', '¿Cuál es el <b>primer paso</b> del método científico?', '👀 Observación', ['🧪 Experimentación', '🏆 Conclusión'],
    'Todo empieza por <b>observar</b>: fijarse en algo que pasa.', ['🕵️ Un detective, antes de nada, ¿qué hace? Mirar con atención.'], 'pasos'),
  S('met2', 'metodo', 'Una <b>posible explicación</b> que todavía hay que comprobar se llama…', '💡 Hipótesis', ['🏛️ Ley', '📏 Medida'],
    'La <b>hipótesis</b> es una idea que hay que comprobar con experimentos.', ['💡 Es como decir "creo que es por…". Aún no está comprobado.'], 'pasos'),
  S('met3', 'metodo', 'Pones una planta al sol ☀️ y otra a la sombra 🌑 para ver cuál crece más. ¿En qué paso estás?', '🧪 Experimentación', ['👀 Observación', '📢 Comunicación'],
    'Estás <b>probando</b> tu idea: eso es experimentar.', ['🧪 ¿Estás mirando, probando o contándolo? Estás haciendo una prueba.'], 'pasos'),
  S('met4', 'metodo', '¿Qué paso va <b>justo después</b> de la hipótesis?', '🧪 Experimentación', ['👀 Observación', '❓ Pregunta'],
    'Después de tener una idea, ¡hay que <b>probarla</b>!', ['🕵️ Repite la frase: Observo → Pregunto → Hipótesis → ¿…?'], 'pasos'),
  S('met5', 'metodo', 'Haces una <b>tabla y una gráfica</b> con los resultados. ¿Qué paso es?', '📊 Análisis de datos', ['💡 Hipótesis', '👀 Observación'],
    'Ordenar los resultados en tablas y gráficas es el <b>análisis de datos</b>.', ['📊 Tablas y gráficas sirven para estudiar los <b>datos</b>.'], 'pasos'),
  S('met6', 'metodo', 'Al final decides si tu hipótesis era verdad o no. Ese paso es la…', '🏆 Conclusión', ['❓ Pregunta', '🧪 Experimentación'],
    'En la <b>conclusión</b> dices si tenías razón.', ['🏁 Es el final de la investigación: ¿cómo se llama "el final" de algo que has pensado?']),
  S('met7', 'metodo', '¿Para qué sirve el último paso, <b>comunicar los resultados</b>?', '📢 Para que otros científicos lo conozcan y lo comprueben', ['🙈 Para guardarlo en secreto', '🏆 Para ganar un premio'],
    'Se comunica (en revistas, congresos…) para que otros lo <b>comprueben</b> y lo usen.', ['🤝 La ciencia es trabajo en equipo. ¿Sirve de algo si nadie lo sabe?']),
  S('met8', 'metodo', 'Si una hipótesis se comprueba <b>muchísimas veces</b> y siempre se cumple, se convierte en…', '🏛️ Una ley', ['💭 Un sueño', '❓ Una pregunta'],
    'Una hipótesis comprobada muchas veces se convierte en <b>ley</b>.', ['🏛️ Si siempre se cumple, es como una "norma" de la naturaleza.']),
  S('met9', 'metodo', '¿Qué estudia la <b>Física</b>?', '⚡ Movimiento, fuerzas, energía, luz…', ['🐸 Los seres vivos', '🪨 Las rocas'],
    'La Física estudia el movimiento, las fuerzas, la energía, la luz y el sonido.', ['⚽ Una pelota que cae, una bombilla que se enciende… eso es Física.'], 'ramas'),
  S('met10', 'metodo', '¿Qué rama estudia <b>de qué están hechas las sustancias y cómo cambian</b> (por ejemplo, el hierro oxidándose)?', '🧪 Química', ['⚡ Física', '🔭 Astronomía'],
    'La <b>Química</b> estudia la materia y sus cambios (reacciones).', ['🧪 Cuando una sustancia se convierte en otra diferente… ¡reacción química!'], 'ramas'),
  S('met11', 'metodo', '¿Qué rama estudiaría por qué <b>un volcán entra en erupción</b>?', '🪨 Geología', ['🐸 Biología', '🧪 Química'],
    'La <b>Geología</b> estudia la Tierra: rocas, volcanes, terremotos.', ['🌋 "Geo" significa Tierra. ¿Cuál empieza por Geo?'], 'ramas'),
  S('met12', 'metodo', '¿Qué rama estudia <b>cómo respira una rana</b>?', '🐸 Biología', ['⚡ Física', '🪨 Geología'],
    'La <b>Biología</b> estudia los seres vivos. "Bio" = vida.', ['🐸 "Bio" significa vida. ¿La rana está viva?'], 'ramas'),
  S('met13', 'metodo', 'Estudias cómo afecta la <b>cantidad de agua</b> al crecimiento de una planta. La cantidad de agua (lo que TÚ cambias) es la variable…', '🎛️ Independiente', ['📏 Dependiente', '🔒 Controlada'],
    'La que tú cambias es la <b>independiente</b>. El crecimiento (lo que mides) es la <b>dependiente</b>.', ['🎛️ Truco: la independiente es la que yo "manejo" con el mando.'], 'variables'),
  S('met14', 'metodo', 'En ese experimento, la <b>altura de la planta</b> (lo que mides) es la variable…', '📏 Dependiente', ['🎛️ Independiente', '🔒 Controlada'],
    'La altura <b>depende</b> del agua que le das: es la <b>dependiente</b>.', ['📏 La altura "depende" del agua. ¿Qué palabra se parece a "depende"?'], 'variables'),
  S('met15', 'metodo', '¿Qué es la <b>ciencia</b>?', '🔍 Conocimiento sobre la naturaleza obtenido con el método científico', ['🔮 Adivinar el futuro', '📚 Opinar sin comprobar'],
    'La ciencia es conocimiento <b>comprobado</b> sobre el mundo, conseguido con el método científico.', ['🕵️ La ciencia no adivina ni opina: ¡comprueba!']),

  // ===== UNIDADES / SI =====
  S('si1', 'si', '¿Cuál de estas cosas <b>SÍ es una magnitud</b> (se puede medir)?', '📏 La longitud de tu mesa', ['😍 Lo guapo que eres', '😂 Lo gracioso de un chiste'],
    'La longitud se mide con un número y una unidad. La belleza o la gracia no.', ['📏 ¿Con cuál podrías usar una regla o un aparato y dar un número exacto?'], 'magnitud'),
  S('si2', 'si', '¿Cuál es la unidad de <b>longitud</b> en el SI?', '📏 Metro (m)', ['📐 Centímetro (cm)', '🚗 Kilómetro (km)'],
    'La unidad de longitud del SI es el <b>metro</b>. cm y km son múltiplos o submúltiplos.', ['🎯 Es la del centro de la escalera, la "jefa".'], 'si'),
  S('si3', 'si', '¿Cuál es la unidad de <b>masa</b> en el SI?', '⚖️ Kilogramo (kg)', ['🍬 Gramo (g)', '🚛 Tonelada (t)'],
    '¡Trampa clásica! La unidad de masa del SI es el <b>kilogramo</b>, no el gramo.', ['🪤 Esta es la trampa del examen: la unidad del SI de masa ya lleva "kilo" en el nombre.'], 'si'),
  S('si4', 'si', '¿Cuál es la unidad de <b>tiempo</b> en el SI?', '⏱️ Segundo (s)', ['⏰ Hora (h)', '⌚ Minuto (min)'],
    'La unidad de tiempo del SI es el <b>segundo</b>.', ['⏱️ Es la más pequeñita de las tres.'], 'si'),
  S('si5', 'si', '¿Cuál es la unidad de <b>temperatura</b> en el SI?', '🌡️ Kelvin (K)', ['☀️ Grado Celsius (°C)', '🇺🇸 Grado Fahrenheit (°F)'],
    'Aunque usamos °C, la unidad del SI es el <b>kelvin</b>.', ['🪤 Otra trampa: la que usamos en casa NO es la del SI.'], 'kelvin'),
  S('si6', 'si', 'La <b>superficie</b> de tu habitación se mide en el SI en…', '⬛ Metros cuadrados (m²)', ['🧊 Metros cúbicos (m³)', '📏 Metros (m)'],
    'Superficie = largo × ancho → m × m = <b>m²</b>.', ['⬛ Superficie es "lo que ocupa el suelo": largo por ancho, metro por metro.']),
  S('si7', 'si', 'El <b>volumen</b> de una caja se mide en el SI en…', '🧊 Metros cúbicos (m³)', ['⬛ Metros cuadrados (m²)', '⚖️ Kilogramos (kg)'],
    'Volumen = largo × ancho × alto → <b>m³</b>.', ['🧊 Volumen tiene 3 medidas (largo, ancho, alto): metro × metro × metro.']),
  S('si8', 'si', 'La <b>velocidad</b> en el SI se mide en…', '🏃 Metros por segundo (m/s)', ['🚗 Kilómetros por hora (km/h)', '⏱️ Segundos (s)'],
    'Velocidad = distancia ÷ tiempo → <b>m/s</b> en el SI.', ['🏃 Distancia en el SI → m. Tiempo en el SI → s. Junta las dos.']),
  S('si9', 'si', '¿Cuántas magnitudes <b>fundamentales</b> tiene el SI?', '7️⃣ Siete', ['3️⃣ Tres', '🔟 Diez'],
    'Son 7: longitud, masa, tiempo, temperatura, intensidad de corriente, cantidad de sustancia e intensidad luminosa.', ['🌈 Son tantas como colores del arcoíris.']),
  S('si10', 'si', 'El prefijo <b>kilo (k)</b> significa…', '✖️ 1000 veces', ['✖️ 100 veces', '➗ La milésima parte'],
    'kilo = 1000. Por eso 1 km = 1000 m y 1 kg = 1000 g.', ['🚗 ¿Cuántos metros tiene un kilómetro?']),
  S('si11', 'si', 'El prefijo <b>mili (m)</b> significa…', '➗ La milésima parte (÷1000)', ['✖️ 1000 veces', '➗ La centésima parte'],
    'mili = una milésima. 1 m = 1000 mm, o sea, 1 mm es la milésima parte del metro.', ['📏 En 1 metro caben 1000 milímetros. Entonces 1 mm es un trocito de…'] ),
  S('si12', 'si', 'El prefijo <b>centi (c)</b> significa…', '➗ La centésima parte (÷100)', ['✖️ 100 veces', '➗ La décima parte'],
    'centi = una centésima. En 1 m caben 100 cm.', ['💯 "Centi" suena a "cien". En 1 m caben 100 cm.']),

  // ===== ERRORES Y GRÁFICAS =====
  S('err1', 'errores', 'La <b>sensibilidad</b> de un instrumento es…', '🔬 La cantidad más pequeña que puede medir', ['💪 Lo fuerte que es', '💲 Lo que cuesta'],
    'Una regla con milímetros tiene sensibilidad de <b>1 mm</b>: es lo más pequeño que distingue.', ['📏 Mira tu regla: ¿cuál es la rayita más pequeña?'], 'errores'),
  S('err2', 'errores', 'Una regla tiene rayitas de <b>1 mm</b>. ¿Cuál es su sensibilidad?', '📏 1 mm', ['📏 1 cm', '📏 30 cm'],
    'La sensibilidad es la división más pequeña: <b>1 mm</b>.', ['🔍 Busca la rayita más pequeña: esa es la sensibilidad.']),
  S('err3', 'errores', 'El <b>error absoluto</b>…', '📏 Tiene las mismas unidades que la medida', ['🚫 Nunca tiene unidades', '➖ Siempre es negativo'],
    'El error absoluto lleva unidades (cm, g, s…) y es siempre positivo.', ['📏 Si mides en cm y te equivocas en 2… ¿2 qué? 2 cm.'], 'errores'),
  S('err4', 'errores', 'Para saber qué medida es <b>más precisa</b> comparando cosas distintas, uso el…', '📊 Error relativo', ['📏 Error absoluto', '⚖️ Peso del objeto'],
    'El <b>error relativo</b> compara el error con el tamaño de lo medido. El menor = la medida mejor.', ['🐜 Equivocarse 1 cm midiendo una hormiga es mucho; midiendo un campo de fútbol, nada. ¿Qué error tiene en cuenta el tamaño?'], 'errores'),
  S('err5', 'errores', 'Para reducir los errores al medir, lo mejor es…', '🔁 Medir varias veces y hacer la media', ['1️⃣ Medir solo una vez', '🎲 Inventarse el número'],
    'Se mide varias veces y se calcula la <b>media</b>: así los errores se compensan.', ['🎯 Si tiras a canasta 1 vez puede ser suerte. ¿Y si tiras 10?']),
  S('err6', 'errores', 'Un cronómetro que <b>siempre</b> empieza 1 segundo tarde provoca un error…', '🔁 Sistemático', ['🎲 Accidental (aleatorio)', '✅ Ninguno'],
    'Si se repite siempre igual, es <b>sistemático</b>. Si es al azar, es <b>accidental</b>.', ['🔁 "Siempre igual" = como un sistema que se repite.']),
  S('graf1', 'errores', 'En una gráfica, la variable <b>independiente</b> (la que yo cambio) va en el eje…', '➡️ X (horizontal)', ['⬆️ Y (vertical)', '🔄 Da igual'],
    'Independiente → eje <b>X</b> (horizontal). Dependiente → eje <b>Y</b> (vertical).', ['🛌 Truco: la X está "tumbada" ➡️ como la independiente que yo pongo tranquilamente.'], 'graficas'),
  S('graf2', 'errores', 'Si en una gráfica sale una <b>recta que pasa por el (0,0)</b>, las magnitudes son…', '📈 Directamente proporcionales', ['📉 Inversamente proporcionales', '🎲 No tienen relación'],
    'Recta por el origen = <b>directamente proporcionales</b>: si una se duplica, la otra también.', ['🍬 Si 1 chuche cuesta 10 cént. y 2 cuestan 20… ¿crecen a la vez o al revés?'], 'graficas'),
  S('graf3', 'errores', 'Antes de dibujar una gráfica, normalmente organizas los datos en una…', '📋 Tabla', ['📝 Redacción', '🎨 Dibujo libre'],
    'Primero la <b>tabla</b> de datos, después la gráfica.', ['📋 Para dibujar puntos necesitas los números ordenados. ¿Dónde?']),
  S('graf4', 'errores', 'En los ejes de una gráfica <b>siempre</b> hay que poner…', '🏷️ El nombre de la magnitud y su unidad', ['🎨 Colores bonitos', '😀 Un emoji'],
    'Cada eje lleva la magnitud y la unidad, por ejemplo "tiempo (s)".', ['❓ Si ves solo números, ¿sabrías si son segundos o metros?'], 'graficas'),
];

/* ---------- ESCALERA visual ---------- */
const ESCALERAS = {
  longitud:  ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'],
  masa:      ['kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg'],
  capacidad: ['kL', 'hL', 'daL', 'L', 'dL', 'cL', 'mL'],
};

function escaleraHTML(lista, i, j) {
  return '<div class="ladder" aria-hidden="true">' + lista.map((u, k) => {
    let cls = '', tag = '';
    if (k === i) { cls = 'from'; tag = 'empiezas'; }
    else if (k === j) { cls = 'to'; tag = 'llegas'; }
    else if ((k > Math.min(i, j)) && (k < Math.max(i, j))) cls = 'path';
    return `<div class="step ${cls}" style="--k:${k}"><span>${u}</span>${tag ? `<em>${tag}</em>` : ''}</div>`;
  }).join('') + '</div>';
}

/* ---------- GENERADORES (preguntas nuevas cada vez) ----------
   Cada uno recibe nivel 1 (fácil), 2 o 3 (más difícil) y devuelve una pregunta. */

function genConversion(nivel) {
  const tipo = pick(Object.keys(ESCALERAS));
  const lista = ESCALERAS[tipo];
  const dif = nivel === 1 ? R(1, 2) : nivel === 2 ? R(1, 3) : R(2, 3);
  const baja = nivel === 1 ? true : Math.random() < 0.55;
  let i = baja ? R(0, 6 - dif) : R(dif, 6);
  const j = baja ? i + dif : i - dif;
  let valor;
  if (nivel === 1) valor = R(1, 9);
  else if (nivel === 2) valor = baja ? R(2, 60) : pick([R(2, 9) * 10, R(2, 9) * 100, R(11, 99) * 10]);
  else valor = baja ? pick([R(11, 99) / 10, R(2, 9) + 0.5, R(101, 999) / 100]) : R(15, 950);
  const factor = Math.pow(10, j - i);
  const res = valor * factor;
  const malas = [res * 10, res / 10, res * 100, res / 100].map(coma).filter((x) => x !== coma(res));
  const uA = lista[i], uB = lista[j];
  return {
    id: 'gen:conv', p: 'escalera', pil: 'escalera',
    t: `¿Cuántos <b>${uB}</b> son <b>${coma(valor)} ${uA}</b>?`,
    visual: nivel === 1 ? escaleraHTML(lista, i, j) : '',
    ok: `${coma(res)} ${uB}`, no: [malas[0] + ' ' + uB, malas[1] + ' ' + uB],
    ex: `De ${uA} a ${uB} ${baja ? 'bajas' : 'subes'} <b>${dif}</b> ${dif > 1 ? 'escalones' : 'escalón'}: la coma salta ${dif} ${baja ? 'a la derecha ➡️' : 'a la izquierda ⬅️'}.`,
    tr: [
      `🔍 Busca <b>${uA}</b> y <b>${uB}</b> en la escalera:` + escaleraHTML(lista, i, j),
      `${baja ? '⬇️' : '⬆️'} De ${uA} a ${uB} <b>${baja ? 'bajas' : 'subes'} ${dif} ${dif > 1 ? 'escalones' : 'escalón'}</b>.`,
      baja ? `➕ Bajar = ×10 en cada escalón → la coma salta <b>${dif} ${dif > 1 ? 'veces' : 'vez'} a la derecha</b> ➡️ (si no hay coma, añades ${dif} cero${dif > 1 ? 's' : ''}).`
           : `➖ Subir = ÷10 en cada escalón → la coma salta <b>${dif} ${dif > 1 ? 'veces' : 'vez'} a la izquierda</b> ⬅️ (si hace falta, rellena con ceros).`,
      `✍️ Ahora hazlo tú con <b>${coma(valor)}</b> y elige. ¡Tú puedes! 💪`,
    ],
  };
}

function genFactor(nivel) {
  const pares = [
    { a: 'km', b: 'm', f: 1000, mal: 100 }, { a: 'm', b: 'cm', f: 100, mal: 1000 },
    { a: 'kg', b: 'g', f: 1000, mal: 100 }, { a: 'L', b: 'mL', f: 1000, mal: 100 },
    { a: 'h', b: 'min', f: 60, mal: 100 }, { a: 'min', b: 's', f: 60, mal: 100 },
    { a: 'h', b: 's', f: 3600, mal: 1000 },
  ];
  const par = pick(nivel === 1 ? pares.slice(0, 4) : pares);
  const grandeAPeque = Math.random() < 0.6;
  const v = R(2, 9);
  const [desde, hasta] = grandeAPeque ? [par.a, par.b] : [par.b, par.a];
  const bueno = grandeAPeque ? frac(`${par.f} ${par.b}`, `1 ${par.a}`) : frac(`1 ${par.a}`, `${par.f} ${par.b}`);
  const alReves = grandeAPeque ? frac(`1 ${par.a}`, `${par.f} ${par.b}`) : frac(`${par.f} ${par.b}`, `1 ${par.a}`);
  const numMal = grandeAPeque ? frac(`${par.mal} ${par.b}`, `1 ${par.a}`) : frac(`1 ${par.a}`, `${par.mal} ${par.b}`);
  return {
    id: 'gen:factor', p: 'escalera', pil: 'factor',
    t: `Quieres pasar <b>${v} ${desde}</b> a <b>${hasta}</b>. ¿Por qué factor de conversión multiplicas?`,
    ok: bueno, no: [alReves, numMal],
    ex: `La unidad que quieres quitar (<b>${desde}</b>) va <b>abajo</b> para tacharla ✂️, y <b>1 ${par.a} = ${par.f} ${par.b}</b>.`,
    tr: [
      `✂️ Quieres <b>quitar ${desde}</b>. Para tacharla, tiene que estar <b>abajo</b> en la fracción.`,
      `🔑 Recuerda la equivalencia: <b>1 ${par.a} = ? ${par.b}</b>.${par.f === 60 || par.f === 3600 ? ' ⏰ ¡Ojo, el tiempo va de 60 en 60!' : ''}`,
      '👀 Mira las opciones: ¿cuál tiene ' + desde + ' abajo y el número correcto?',
    ],
  };
}

function genTiempo(nivel) {
  const opciones = nivel === 1
    ? [['h', 'min', 60], ['min', 's', 60]]
    : nivel === 2 ? [['h', 'min', 60], ['min', 's', 60], ['min', 'h', 1 / 60]]
    : [['h', 's', 3600], ['min', 'h', 1 / 60], ['s', 'min', 1 / 60]];
  const [a, b, f] = pick(opciones);
  let v = f < 1 ? R(2, 6) * 60 : R(2, 5);
  if (f < 1 && nivel === 3 && Math.random() < 0.5) v = 90; // 90 min = 1,5 h
  const res = v * f;
  const mal1 = f < 1 ? v / 100 : v * (f === 3600 ? 1000 : 100);
  const mal2 = f < 1 ? v * 60 : v * 10;
  return {
    id: 'gen:tiempo', p: 'escalera', pil: 'tiempo',
    t: `⏰ ¿Cuántos <b>${b}</b> son <b>${coma(v)} ${a}</b>?`,
    ok: `${coma(res)} ${b}`, no: [`${coma(mal1)} ${b}`, `${coma(mal2)} ${b}`],
    ex: f > 1 ? `De ${a} a ${b} multiplicas por ${f}: ${coma(v)} × ${f} = <b>${coma(res)} ${b}</b>.`
              : `De ${a} a ${b} divides entre 60: ${coma(v)} ÷ 60 = <b>${coma(res)} ${b}</b>.`,
    tr: [
      '⏰ El tiempo es especial: <b>1 h = 60 min</b> y <b>1 min = 60 s</b> (¡no 100!).',
      f > 1 ? `⬇️ Vas de una unidad <b>grande</b> (${a}) a una <b>pequeña</b> (${b}) → saldrá un número <b>más grande</b>: multiplica.`
            : `⬆️ Vas de una unidad <b>pequeña</b> (${a}) a una <b>grande</b> (${b}) → saldrá un número <b>más pequeño</b>: divide entre 60.`,
      f === 3600 ? '🔑 1 h = 60 × 60 = <b>3600 s</b>.' : '✍️ Calcula y elige. 💪',
    ],
  };
}

function genNotacionGrande(nivel) {
  const conDecimal = nivel >= 2 && Math.random() < 0.6;
  const cifras = conDecimal ? `${R(1, 9)}${R(1, 9)}` : `${R(1, 9)}`;
  const n = nivel === 1 ? R(2, 4) : R(3, 8);
  const numero = cifras + '0'.repeat(n - (cifras.length - 1));
  const a = conDecimal ? `${cifras[0]},${cifras[1]}` : cifras;
  const trampa = conDecimal ? pot(cifras, n - 1) : pot(a, n + 1);
  return {
    id: 'gen:notg', p: 'notacion', pil: 'notacion',
    t: `Escribe <b class="num">${numero}</b> en notación científica.`,
    ok: pot(a, n), no: [pot(a, n - 1), trampa],
    ex: `La coma salta <b>${n}</b> veces a la izquierda ⬅️ hasta quedar ${a}. Número grande → exponente positivo.`,
    tr: [
      `📍 La coma está escondida al final: <b>${numero},</b>`,
      `⬅️ Muévela hacia la izquierda hasta que delante quede <b>una sola cifra</b> (de 1 a 9). ${conDecimal ? '¡Ojo! 45·10³ no vale: delante debe haber una sola cifra.' : ''}`,
      `🔢 Cuenta los saltos que das: ese es el exponente. Número grande → exponente <b>positivo</b>.`,
    ],
  };
}

function genNotacionPeque(nivel) {
  const conDecimal = nivel >= 2 && Math.random() < 0.6;
  const cifras = conDecimal ? `${R(1, 9)}${R(1, 9)}` : `${R(1, 9)}`;
  const n = nivel <= 2 ? R(2, 4) : R(3, 6);
  const numero = '0,' + '0'.repeat(n - 1) + cifras;
  const a = conDecimal ? `${cifras[0]},${cifras[1]}` : cifras;
  return {
    id: 'gen:notp', p: 'notacion', pil: 'notacion',
    t: `Escribe <b class="num">${numero}</b> en notación científica.`,
    ok: pot(a, -n), no: [pot(a, n), pot(a, -(n + 1))],
    ex: `La coma salta <b>${n}</b> veces a la derecha ➡️ hasta quedar ${a}. Número pequeñito → exponente <b>negativo</b>.`,
    tr: [
      `🐜 Es un número pequeñito (empieza por 0,…) → el exponente será <b>negativo</b>.`,
      `➡️ Mueve la coma a la derecha hasta justo después de la primera cifra que no es cero.`,
      `🔢 Cuenta los saltos: ese número, con signo menos, es el exponente.`,
    ],
  };
}

function genNotacionInversa(nivel) {
  const d = R(1, 9);
  const negativo = nivel === 3 && Math.random() < 0.5;
  const n = R(2, 5);
  const bien = negativo ? '0,' + '0'.repeat(n - 1) + d : d + '0'.repeat(n);
  const mal1 = negativo ? '0,' + '0'.repeat(n) + d : d + '0'.repeat(n - 1);
  const mal2 = negativo ? '0,' + '0'.repeat(Math.max(0, n - 2)) + d : d + '0'.repeat(n + 1);
  return {
    id: 'gen:noti', p: 'notacion', pil: 'notacion',
    t: `¿Qué número es <b>${pot(d, negativo ? -n : n)}</b>?`,
    ok: bien, no: [mal1, mal2],
    ex: negativo ? `Exponente −${n}: la coma salta ${n} veces a la izquierda ⬅️.` : `Exponente ${n}: el ${d} va seguido de <b>${n} ceros</b>.`,
    tr: negativo
      ? ['➖ Exponente negativo → número pequeñito (0,…).', `⬅️ La coma salta <b>${n}</b> veces a la izquierda desde el ${d}.`]
      : [`➕ Exponente positivo → número grande.`, `0️⃣ El exponente te dice cuántos <b>ceros</b> pones detrás del ${d}: ${n}.`],
  };
}

function genRedondeo(nivel) {
  const k = nivel === 1 ? 0 : nivel === 2 ? 1 : 2; // decimales a dejar
  const N = R(1, 30) * 1000 + R(0, 9) * 100 + R(0, 9) * 10 + R(1, 9); // número ×1000
  const f = Math.pow(10, 3 - k);
  const bien = Math.round(N / f);
  const corte = Math.floor(N / f);
  const otro = bien === corte ? corte + 1 : corte;
  const fx = (r, dec) => (r / Math.pow(10, dec)).toFixed(dec).replace('.', ',');
  const numero = fx(N, 3);
  const cifraDerecha = Math.floor(N / Math.pow(10, 2 - k)) % 10;
  const extra = fx(Math.round(N / Math.pow(10, 2 - k)), k + 1);
  const donde = k === 0 ? 'a las <b>unidades</b> (sin decimales)' : k === 1 ? 'a las <b>décimas</b> (1 decimal)' : 'a las <b>centésimas</b> (2 decimales)';
  return {
    id: 'gen:red', p: 'notacion', pil: 'redondeo',
    t: `Redondea <b class="num">${numero}</b> ${donde}.`,
    ok: fx(bien, k),
    no: [...new Set([fx(otro, k), extra, fx(bien + (otro > bien ? -1 : 2), k)])].filter((x) => x !== fx(bien, k)).slice(0, 2),
    ex: `La cifra de la derecha del corte es <b>${cifraDerecha}</b>: ${cifraDerecha >= 5 ? '5 o más → sube ⬆️' : 'menos de 5 → se queda igual ⬇️'}.`,
    tr: [
      `✂️ Corta el número ${donde}.`,
      `👀 Mira la cifra que queda <b>justo a la derecha</b> del corte en <b>${numero}</b>.`,
      '⬆️ Si es 5, 6, 7, 8 o 9 → la última cifra que te quedas sube 1. ⬇️ Si es 0, 1, 2, 3 o 4 → se queda igual.',
    ],
  };
}

function genKelvin(nivel) {
  const aK = Math.random() < (nivel === 1 ? 0.85 : 0.55);
  const c = nivel === 1 ? pick([0, 10, 20, 25, 30, 100]) : R(-30, 120);
  const k = c + 273;
  if (aK) {
    return {
      id: 'gen:kelvin', p: 'si', pil: 'kelvin',
      t: `🌡️ ¿Cuántos kelvin son <b>${signo(c)} °C</b>?`,
      ok: `${k} K`, no: [`${signo(c - 273)} K`, `${signo(c)} K`],
      ex: `De °C a K se suma 273: ${signo(c)} + 273 = <b>${k} K</b>.`,
      tr: ['🔑 De °C a K → <b>sumas 273</b>.', `🧮 Calcula ${signo(c)} + 273${c < 0 ? ' (es como restar ' + (-c) + ' a 273)' : ''}.`],
    };
  }
  return {
    id: 'gen:kelvin', p: 'si', pil: 'kelvin',
    t: `🌡️ ¿Cuántos °C son <b>${k} K</b>?`,
    ok: `${signo(c)} °C`, no: [`${k + 273} °C`, `${k} °C`],
    ex: `De K a °C se resta 273: ${k} − 273 = <b>${signo(c)} °C</b>.`,
    tr: ['🔑 De K a °C → <b>restas 273</b>.', `🧮 Calcula ${k} − 273.`],
  };
}

function genError(nivel) {
  const u = pick(['cm', 'g', 's', 'mL']);
  if (nivel < 3) {
    const real = nivel === 1 ? pick([10, 20, 50, 100]) : R(20, 200);
    const d = R(1, nivel === 1 ? 3 : 6);
    const medida = Math.random() < 0.5 ? real - d : real + d;
    return {
      id: 'gen:err', p: 'errores', pil: 'errores',
      t: `🎯 El valor real es <b>${real} ${u}</b> y tú mides <b>${medida} ${u}</b>. ¿Cuál es el error absoluto?`,
      ok: `${d} ${u}`, no: [`−${d} ${u}`, `${real + medida} ${u}`],
      ex: `Error absoluto = diferencia entre medida y valor real = <b>${d} ${u}</b>. Siempre positivo y con unidades.`,
      tr: ['➖ Resta el número grande menos el pequeño.', `🧮 ¿Cuánto hay de ${Math.min(real, medida)} a ${Math.max(real, medida)}?`, '✅ Recuerda: el error absoluto es siempre <b>positivo</b>.'],
    };
  }
  let real, d;
  do { real = pick([20, 25, 50, 100, 200]); d = R(1, 5); } while (!Number.isInteger((d * 100) / real));
  const pct = (d * 100) / real;
  return {
    id: 'gen:err', p: 'errores', pil: 'errores',
    t: `🎯 Valor real <b>${real} ${u}</b>, error absoluto <b>${d} ${u}</b>. ¿Cuál es el error relativo en %?`,
    ok: `${coma(pct)} %`, no: [`${coma(pct * 10)} %`, `${coma(pct / 10)} %`],
    ex: `Error relativo = ${d} ÷ ${real} = ${coma(d / real)} → ×100 = <b>${coma(pct)} %</b>.`,
    tr: ['➗ Error relativo = error absoluto ÷ valor real.', `🧮 Calcula ${d} ÷ ${real}.`, '💯 Para pasarlo a %, multiplica por 100.'],
  };
}

const GENERADORES = {
  escalera: [genConversion, genConversion, genFactor, genTiempo],
  notacion: [genNotacionGrande, genNotacionPeque, genNotacionInversa, genRedondeo],
  si: [genKelvin],
  errores: [genError],
  lab: [],
  metodo: [],
};

if (typeof module !== 'undefined') module.exports = { PLANETAS, FIJAS, GENERADORES, PIL };
