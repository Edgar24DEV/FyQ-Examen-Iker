/* =========================================================
   MISIÓN MATES · 2º ESO · Fracciones y decimales
   Preparado a partir del comunicado del profe:
   - Examen 1: corrección de problemas (errores, inventar, vida real).
   - Examen 2: fracciones y decimales (tipo de decimal, generatriz,
     operaciones combinadas, problemas con dibujo, comparar,
     estimaciones y errores, notación científica).
   Preguntas fijas (S) + generadores que inventan ejercicios nuevos.
   ========================================================= */

const PLANETAS = [
  { id: 'err',   emoji: '🔍', nombre: 'Planeta Detective',   desc: 'Encuentra el error en un problema resuelto', grupo: 'Examen 1 · Corrección de problemas' },
  { id: 'prob',  emoji: '🧮', nombre: 'Planeta Problemas',   desc: 'Fracciones de una cantidad, con dibujo',     grupo: 'Examen 1 · Corrección de problemas' },
  { id: 'vida',  emoji: '🍕', nombre: 'Planeta Vida real',   desc: 'Fracciones en la vida cotidiana',            grupo: 'Examen 1 · Corrección de problemas' },
  { id: 'tipo',  emoji: '🔢', nombre: 'Planeta Decimales',   desc: 'Exacto, periódico puro o mixto',             grupo: 'Examen 2 · Fracciones y decimales' },
  { id: 'gen',   emoji: '🔄', nombre: 'Planeta Generatriz',  desc: 'De decimal a fracción',                      grupo: 'Examen 2 · Fracciones y decimales' },
  { id: 'oper',  emoji: '➗', nombre: 'Planeta Operaciones', desc: 'Potencias, raíces y decimales con periodo',  grupo: 'Examen 2 · Fracciones y decimales' },
  { id: 'comp',  emoji: '⚖️', nombre: 'Planeta Comparar',    desc: 'Ordenar fracciones',                         grupo: 'Examen 2 · Fracciones y decimales' },
  { id: 'est',   emoji: '🎯', nombre: 'Planeta Errores',     desc: 'Estimar y calcular el error',                grupo: 'Examen 2 · Fracciones y decimales' },
  { id: 'cien',  emoji: '🔭', nombre: 'Planeta Científica',  desc: 'Notación científica',                        grupo: 'Examen 2 · Fracciones y decimales' },
];

/* ---------- utilidades ---------- */
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const mezclar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sacar = (arr, n, excepto = []) => mezclar(arr.filter((x) => !excepto.includes(x))).slice(0, n);
/* Pregunta fija: S(id, planeta, texto, correcta, [mala1, mala2], explicación, [pistas], píldora opcional) */
const S = (id, p, t, ok, no, ex, tr, pil) => ({ id, p, t, ok, no, ex, tr, pil });

/* ---------- fracciones como pares [numerador, denominador] ---------- */
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const fred = ([n, d]) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
const add = (a, b) => fred([a[0] * b[1] + b[0] * a[1], a[1] * b[1]]);
const sub = (a, b) => fred([a[0] * b[1] - b[0] * a[1], a[1] * b[1]]);
const mul = (a, b) => fred([a[0] * b[0], a[1] * b[1]]);
const div = (a, b) => fred([a[0] * b[1], a[1] * b[0]]);
const pot = (a, e) => fred([Math.pow(a[0], e), Math.pow(a[1], e)]);
const val = (f) => f[0] / f[1];
/* Dibujo de una fracción en HTML (numerador sobre denominador) */
const F = (n, d) => { if (Array.isArray(n)) [n, d] = n; return d === 1 ? String(n).replace('-', '−') : `<span class="frac"><span>${String(n).replace('-', '−')}</span><span>${d}</span></span>`; };
const per = (s) => `<span class="per">${s}</span>`;
const coma = (x) => String(x).replace('.', ',').replace('-', '−');
const miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const fmt = (x, dec = 2) => coma(String(+Number(x).toFixed(dec)));
const potDiez = (e) => `10<sup>${String(e).replace('-', '−')}</sup>`;

function expansion(n, d) {            // división larga: parte entera, anteperiodo, periodo
  const ent = Math.floor(n / d); let r = n % d; const cif = [], vistos = {};
  while (r && vistos[r] === undefined) { vistos[r] = cif.length; r *= 10; cif.push(Math.floor(r / d)); r %= d; }
  if (!r) return { ent: String(ent), ante: cif.join(''), per: '' };
  const i = vistos[r]; return { ent: String(ent), ante: cif.slice(0, i).join(''), per: cif.slice(i).join('') };
}
const decHTML = (e) => e.ent + (e.ante || e.per ? ',' + e.ante + (e.per ? per(e.per) : '') : '');
function factores(n) { const f = {}; for (let p = 2; n > 1; p++) while (n % p === 0) { f[p] = (f[p] || 0) + 1; n /= p; } return f; }
const factTxt = (n) => Object.entries(factores(n)).map(([p, e]) => (e > 1 ? `${p}<sup>${e}</sup>` : p)).join(' · ');
/* Barra para dibujar la fracción: partes iguales, las 'on' pintadas */
const barra = (total, on) => `<div class="barra" aria-hidden="true">${Array.from({ length: total }, (_, i) => `<i class="${i < on ? 'on' : ''}"></i>`).join('')}</div>`;
const barra3 = (a, b, c) => `<div class="barra" aria-hidden="true">${'<i class="c1"></i>'.repeat(a)}${'<i class="c2"></i>'.repeat(b)}${'<i class="c3"></i>'.repeat(c)}</div>`;

/* Envoltorio: comprueba que las 3 opciones son distintas y fija el id */
const G = (id, fn) => (nivel = 1) => {
  for (let t = 0; t < 60; t++) {
    const q = fn(nivel); const todo = [q.ok, ...q.no];
    if (new Set(todo).size === 3 && !todo.some((x) => /NaN|undefined|Infinity|null/.test(x))) return { ...q, id };
  }
  return { ...fn(nivel), id };
};

/* ---------- PÍLDORAS (mini-teoría) ---------- */
const PIL = {
  err: '🔍 <b>Detective de errores</b>: antes de calcular, mira si el resultado <b>tiene sentido</b> (¿más alumnos que los de la clase? ¡imposible!). Los fallos típicos: sumar numeradores y denominadores, hacer la fracción de una cantidad <b>al revés</b> o dividir sin invertir.',
  prob: '🧮 <b>Fracción de una cantidad</b>: se <b>divide</b> entre el denominador y se <b>multiplica</b> por el numerador. Truco: dibuja una barra, pártela en tantas partes como diga el denominador y pinta las del numerador.',
  vida: '🍕 Las fracciones están en todas partes: <b>recetas</b> (½ taza), <b>reloj</b> (media hora, cuarto de hora), <b>dinero</b>, <b>descuentos</b>, <b>repartos</b>…',
  tipo: `🔢 Se <b>simplifica</b> la fracción y se mira el denominador: solo factores <b>2 y/o 5</b> → decimal <b>exacto</b>; <b>ni 2 ni 5</b> → periódico <b>puro</b>; <b>2 o 5 y otro factor</b> → periódico <b>mixto</b>. Denominador 1 → número entero.`,
  gen: `🔄 <b>Generatriz</b>: exacto → cifras entre 10, 100… · puro: <b>x</b>, multiplica por 10, 100… y <b>resta x</b> · mixto: igual, pero restando dos multiplicaciones. Siempre <b>simplifica</b>.`,
  oper: '➗ <b>Orden</b>: 1.º paréntesis · 2.º <b>potencias y raíces</b> · 3.º multiplicar y dividir · 4.º sumar y restar. Dividir es multiplicar por la <b>inversa</b>. Para sumar: <b>común denominador</b>.',
  decper: '🔁 Con decimales periódicos, <b>pásalos antes a fracción</b> (generatriz), opera con fracciones y simplifica al final.',
  comp: '⚖️ Para comparar fracciones con distinto denominador: <b>mcm</b> de los denominadores → fracciones equivalentes con el mismo denominador → gana el <b>numerador mayor</b>.',
  est: '🎯 <b>Estimar</b> = redondear antes de calcular. <b>Error absoluto</b> = |valor exacto − aproximado|. <b>Error relativo</b> = error absoluto : valor exacto (× 100 si lo piden en %).',
  cien: '🔭 <b>Notación científica</b>: a · 10<sup>n</sup> con a entre 1 y 9,99… Número grande → n positivo; número pequeño (0,000…) → n negativo. Al multiplicar: se multiplican los números y se <b>suman</b> los exponentes.',
};

/* ---------- PREGUNTAS FIJAS ---------- */
const FIJAS = [
  // ===== DETECTIVE DE ERRORES =====
  S('e1', 'err', 'Pablo dice: «3/5 de 30 alumnos son 50 alumnos». ¿Qué te avisa de que está mal <b>sin hacer cuentas</b>?', '🚨 Sale más que el total: 50 alumnos en una clase de 30',
    ['🚨 Que no ha usado la calculadora', '🚨 Que el resultado es par'],
    'Una parte <b>nunca</b> puede ser mayor que el total. Siempre comprueba que el resultado tiene sentido.', ['🧠 3/5 es menos que 1 entero: ¿puede salir más que los 30?'], 'err'),
  S('e2', 'err', '¿Cómo se <b>suman</b> fracciones con distinto denominador?', '➕ Se pasan a común denominador y se suman solo los numeradores',
    ['➕ Se suman numeradores y se suman denominadores', '➕ Se suman los denominadores y se deja el numerador'],
    'Primero <b>común denominador</b>, después se suman los numeradores y el denominador se queda igual.', ['🍕 ¿1/2 + 1/2 puede dar 2/4? ¡Eso es una mitad, no un entero!'], 'err'),
  S('e3', 'err', 'Un alumno resuelve «1/4 + 1/3 = 2/7». ¿Qué error ha cometido?', '❌ Ha sumado numeradores con numeradores y denominadores con denominadores',
    ['❌ Ha olvidado simplificar', '❌ Ha restado en vez de sumar'],
    'Lo correcto: 1/4 + 1/3 = 3/12 + 4/12 = <b>7/12</b>.', ['🔎 Fíjate en cómo ha obtenido el 7 de abajo: 4 + 3.'], 'err'),
  S('e4', 'err', 'En un problema nos piden «lo que <b>queda</b>». ¿Qué hay que hacer al final?', '➖ Restar a 1 (o al total) lo que se ha gastado',
    ['➕ Sumar lo que se ha gastado', '✖️ Multiplicar lo gastado por el total'],
    'Queda = <b>total − gastado</b> (con fracciones: 1 − lo gastado).', ['🍕 Si te comes 1/4 de pizza, te queda 1 − 1/4 = 3/4.'], 'err'),
  S('e5', 'err', '¿Cuál es un <b>buen problema inventado</b>?', '✅ Datos que encajan, pregunta clara y un resultado posible',
    ['❌ Uno con números muy raros para que parezca difícil', '❌ Uno sin pregunta, solo con datos'],
    'Un buen problema tiene datos que encajan, una pregunta clara y un resultado que <b>tiene sentido</b>.', ['✏️ Piensa: ¿se entiende qué hay que calcular? ¿puede salir ese resultado?']),
  S('e6', 'err', 'Para <b>corregir</b> un problema con un error, lo primero es…', '🔍 Localizar en qué paso se equivoca y explicar por qué',
    ['🔁 Borrarlo todo y empezar de cero sin mirar', '🙈 Fijarse solo en la respuesta final'],
    'Hay que decir <b>dónde</b> está el error, <b>por qué</b> es un error y luego resolverlo bien.', ['👓 Lee paso a paso, como un detective.']),

  // ===== PROBLEMAS DE FRACCIONES DE CANTIDADES =====
  S('p1', 'prob', 'Para calcular <b>a/b de una cantidad</b> se…', '➗ Divide entre el denominador y se multiplica por el numerador',
    ['✖️ Multiplica por el denominador y se divide entre el numerador', '➕ Suma numerador y denominador'],
    'Ejemplo: 3/5 de 30 → 30 : 5 = 6 → 6 · 3 = <b>18</b>.', ['🎨 Divide la barra en tantas partes como el denominador y coge las del numerador.'], 'prob'),
  S('p2', 'prob', 'Si gastas 1/3 y luego 1/4 de tu paga, ¿qué fracción has gastado <b>en total</b>?', '🧮 7/12',
    ['🧮 2/7', '🧮 1/7'], 'Común denominador 12: 4/12 + 3/12 = <b>7/12</b>.', ['🔎 mcm(3, 4) = 12.', '➕ Suma solo los numeradores.'], 'prob'),
  S('p3', 'prob', '2/5 de una cinta miden 30 cm. ¿Cuánto mide <b>1/5</b>?', '📏 15 cm', ['📏 60 cm', '📏 12 cm'],
    '30 : 2 = 15 cm cada quinto. Entera: 15 · 5 = <b>75 cm</b>.', ['🎨 Dos partes valen 30 cm: ¿cuánto vale una?'], 'prob'),
  S('p4', 'prob', '¿Para qué sirve hacer un <b>dibujo</b> en un problema de fracciones?', '🎨 Para ver las partes y comprobar que el resultado tiene sentido',
    ['🎨 Para que la hoja quede bonita', '🎨 Para no tener que calcular'], 'El dibujo muestra las partes iguales y te ayuda a <b>controlar</b> el resultado.', ['🧩 Una barra partida en trozos iguales lo explica todo.'], 'prob'),

  // ===== VIDA REAL =====
  S('v1', 'vida', '¿En cuál de estas situaciones usamos una <b>fracción</b>?', '🍕 Comerse tres cuartos de una pizza', ['🔢 Contar los 25 alumnos de la clase', '📏 Medir una mesa de 2 metros'],
    'Tres cuartos de pizza = <b>3/4</b>: una parte de un todo.', ['🍕 Una fracción es «una parte de un todo».'], 'vida'),
  S('v2', 'vida', 'Media hora son…', '⏱️ 30 minutos', ['⏱️ 15 minutos', '⏱️ 45 minutos'], 'Media hora = 1/2 de 60 min = <b>30 minutos</b>.', ['🕐 Una hora tiene 60 minutos: haz la mitad.'], 'vida'),
  S('v3', 'vida', 'Tres cuartos de hora son…', '⏱️ 45 minutos', ['⏱️ 75 minutos', '⏱️ 30 minutos'], '1/4 de hora = 15 min → 3 cuartos = 3 · 15 = <b>45 minutos</b>.', ['🕐 60 : 4 = 15 min cada cuarto.'], 'vida'),
  S('v4', 'vida', 'Una receta pide 1/2 taza de harina. Si haces el <b>doble</b>, ¿cuánta harina necesitas?', '🥣 1 taza', ['🥣 1/4 de taza', '🥣 2 tazas'], 'El doble de 1/2 = 2 · 1/2 = 2/2 = <b>1 taza</b>.', ['✖️ Dos mitades hacen un entero.'], 'vida'),
  S('v5', 'vida', '¿Qué fracción de euro es una moneda de <b>25 céntimos</b>?', '🪙 1/4', ['🪙 1/25', '🪙 1/2'], '100 céntimos : 25 = 4 → <b>1/4</b> de euro.', ['🪙 ¿Cuántas monedas de 25 cts hacen 1 €?'], 'vida'),
  S('v6', 'vida', 'Una camiseta de 80 € tiene un descuento de 1/4. ¿Cuánto te <b>ahorras</b>?', '💶 20 €', ['💶 60 €', '💶 25 €'], '80 : 4 = <b>20 €</b>. (Pagarías 60 €.)', ['➗ Divide 80 entre el denominador.'], 'vida'),
  S('v7', 'vida', 'Una tableta de chocolate tiene 12 onzas y te comes 1/3. ¿Cuántas onzas son?', '🍫 4 onzas', ['🍫 9 onzas', '🍫 3 onzas'], '12 : 3 = <b>4 onzas</b>.', ['🎨 Reparte las 12 onzas en 3 grupos iguales.'], 'vida'),
  S('v8', 'vida', 'Un depósito de gasolina está lleno hasta 3/4. ¿Qué fracción le <b>falta</b> para llenarse?', '⛽ 1/4', ['⛽ 3/4', '⛽ 4/3'], 'Falta 1 − 3/4 = <b>1/4</b>.', ['➖ Todo el depósito es 4/4.'], 'vida'),

  // ===== TIPO DE DECIMAL =====
  S('t1', 'tipo', 'Una fracción simplificada da un decimal <b>exacto</b> cuando su denominador solo tiene los factores…', '🔑 2 y/o 5', ['🔑 3 y/o 7', '🔑 Solo el 3'],
    'Denominador con solo 2 y/o 5 → decimal exacto (porque 10 = 2 · 5).', ['🔟 10 se descompone en 2 · 5.'], 'tipo'),
  S('t2', 'tipo', '¿Cuál es el <b>periodo</b> del decimal 0,3333…?', '🔁 3', ['🔁 0,3', '🔁 33'], 'El periodo es la cifra (o cifras) que se repite: <b>3</b>.', ['🔁 ¿Qué cifra se repite?'], 'tipo'),
  S('t3', 'tipo', 'La fracción <b>6/15</b> da…', '✂️ Un decimal exacto (6/15 = 2/5 = 0,4)', ['✂️ Un periódico mixto (porque 15 = 3 · 5)', '✂️ Un periódico puro'],
    '¡Primero hay que <b>simplificar</b>! 6/15 = 2/5 y el 5 solo tiene factor 5 → exacto.', ['✂️ Simplifica antes de mirar el denominador.', '🔎 6/15 = 2/5.'], 'tipo'),
  S('t4', 'tipo', 'El decimal 0,5833… (el 3 se repite) es…', '🔁 Periódico mixto', ['🔁 Periódico puro', '🔁 Exacto'], 'Tiene cifras <b>antes</b> del periodo (58) y un periodo (3): <b>mixto</b>.', ['🔍 ¿Hay cifras entre la coma y el periodo?'], 'tipo'),
  S('t5', 'tipo', '¿Cuándo una fracción es un <b>número entero</b>?', '🔢 Cuando al simplificar el denominador es 1 (ejemplo: 15/5 = 3)', ['🔢 Cuando el numerador es par', '🔢 Cuando el denominador es mayor'], 'Si el numerador es múltiplo del denominador, sale un número entero.', ['➗ ¿15 se puede dividir exactamente entre 5?'], 'tipo'),

  // ===== GENERATRIZ =====
  S('g1', 'gen', 'La fracción generatriz de un decimal exacto como <b>0,45</b> es…', '🔄 45/100 = 9/20', ['🔄 45/10 = 9/2', '🔄 45/99 = 5/11'], 'Dos decimales → denominador 100, y se simplifica: <b>9/20</b>.', ['🔟 Dos cifras decimales → 100.'], 'gen'),
  S('g2', 'gen', 'En un periódico puro, ¿cómo hacemos <b>desaparecer el periodo</b>?', '➖ Multiplicando por 10, 100… y restando x', ['➕ Sumando las cifras del periodo', '✂️ Redondeando el decimal'],
    'Se multiplica para que el periodo quede igual y se <b>resta x</b>: así el periodo se cancela.', ['10x − x = 9x. ¡El periodo desaparece!'], 'gen'),
  S('g3', 'gen', 'La fracción generatriz de <b>0,3̅</b> (0,333…) es…', '🔄 1/3', ['🔄 3/10', '🔄 3/100'], '10x = 3,33… ; x = 0,33… ; restando: 9x = 3 → x = 3/9 = <b>1/3</b>.', ['➖ 10x − x = 3.'], 'gen'),
  S('g4', 'gen', 'En un <b>periódico puro</b>, el denominador de la generatriz lleva…', '9️⃣ Tantos 9 como cifras tenga el periodo', ['0️⃣ Tantos 0 como cifras tenga el periodo', '🔟 Siempre 10'],
    'Periodo de 1 cifra → 9; de 2 cifras → 99… (Ejemplo: 0,45̅ = 45/99).', ['9️⃣ 10x − x = 9x.'], 'gen'),

  // ===== OPERACIONES =====
  S('o1', 'oper', 'En <b>2 + 3 · 4</b>, ¿qué se calcula primero?', '✖️ La multiplicación 3 · 4', ['➕ La suma 2 + 3', '🔀 Da igual'], 'Primero × y ÷, luego + y −: 2 + 12 = <b>14</b>.', ['📏 Multiplicar y dividir mandan sobre sumar y restar.'], 'oper'),
  S('o2', 'oper', 'Cuál es el <b>orden</b> de las operaciones?', '📋 Paréntesis → potencias y raíces → × y ÷ → + y −', ['📋 + y − → × y ÷ → potencias', '📋 De izquierda a derecha siempre'], 'Primero lo de dentro del paréntesis, después potencias y raíces, luego × y ÷, y al final + y −.', ['📋 Paréntesis siempre primero.'], 'oper'),
  S('o3', 'oper', `¿Cuánto es (2/3)<sup>2</sup>?`, `⬆️ 4/9`, ['⬆️ 4/3', '⬆️ 2/9'], 'La potencia afecta al numerador <b>y</b> al denominador: 2²/3² = <b>4/9</b>.', ['✖️ (2/3)² = 2/3 · 2/3.'], 'oper'),
  S('o4', 'oper', `¿Cuánto es √(9/16)?`, '√ 3/4', ['√ 9/4', '√ 3/8'], 'La raíz se hace al numerador y al denominador: √9 = 3 y √16 = 4 → <b>3/4</b>.', ['🔎 ¿Qué número multiplicado por sí mismo da 9? ¿Y 16?'], 'oper'),
  S('o5', 'oper', 'Dividir entre una fracción es lo mismo que…', '🔁 Multiplicar por su inversa', ['🔁 Multiplicar por la misma fracción', '🔁 Restar las fracciones'], 'a/b : c/d = a/b · d/c.', ['🔁 Dale la vuelta a la segunda fracción.'], 'oper'),
  S('o6', 'oper', 'Sin calcular mucho: <b>0,3̅ + 0,6̅</b> es…', '🔁 1 (porque 1/3 + 2/3 = 1)', ['🔁 0,9', '🔁 0,99'], 'Pasando a fracción: 1/3 + 2/3 = 3/3 = <b>1</b>.', ['🔁 Pásalos a fracción: 1/3 y 2/3.'], 'decper'),

  // ===== COMPARAR =====
  S('c1', 'comp', '¿Cuál es mayor, <b>3/4</b> o <b>2/3</b>?', '⚖️ 3/4', ['⚖️ 2/3', '⚖️ Son iguales'], '9/12 frente a 8/12: gana <b>3/4</b>.', ['🔎 Pásalas a denominador 12.'], 'comp'),
  S('c2', 'comp', 'Para comparar fracciones con <b>distinto denominador</b>…', '🔎 Se reducen a común denominador', ['🔎 Se comparan solo los numeradores', '🔎 Se comparan solo los denominadores'], 'Con el mismo denominador, la fracción mayor es la de numerador mayor.', ['📏 Usa el mcm de los denominadores.'], 'comp'),
  S('c3', 'comp', 'Si dos fracciones tienen el <b>mismo numerador</b>, es mayor la de…', '⬇️ Menor denominador', ['⬆️ Mayor denominador', '↔️ Da igual'], '1/3 > 1/5: cuantas más partes se hacen, más pequeñas son.', ['🍕 Una pizza en 3 trozos o en 5: ¿qué trozo es mayor?'], 'comp'),
  S('c4', 'comp', 'El <b>mcm</b> (mínimo común múltiplo) de 4 y 6 es…', '🔢 12', ['🔢 24', '🔢 2'], 'Múltiplos de 4: 4, 8, <b>12</b>… de 6: 6, <b>12</b>… El menor común es 12.', ['🔢 Escribe los múltiplos de cada uno.'], 'comp'),

  // ===== ESTIMACIONES Y ERRORES =====
  S('s1', 'est', 'El <b>error absoluto</b> es…', '📏 |valor exacto − valor aproximado|', ['📏 Valor exacto : valor aproximado', '📏 Valor exacto + valor aproximado'], 'Es la diferencia entre el valor exacto y el aproximado, siempre en positivo.', ['📏 Una resta con valor absoluto.'], 'est'),
  S('s2', 'est', 'El <b>error relativo</b> se calcula…', '➗ Error absoluto : valor exacto (× 100 si es en %)', ['➗ Valor exacto : error absoluto', '➗ Error absoluto − valor exacto'], 'Error relativo = error absoluto / valor exacto.', ['➗ Compara el error con el tamaño de la cosa medida.'], 'est'),
  S('s3', 'est', '<b>Estimar</b> un cálculo es…', '🎯 Redondear los números antes para obtener un resultado aproximado', ['🎯 Calcularlo con la calculadora', '🎯 Adivinarlo sin pensar'], 'Estimar es calcular con números redondeados para saber más o menos cuánto saldrá.', ['🎯 19,8 · 4,1 ≈ 20 · 4.'], 'est'),
  S('s4', 'est', 'Redondea <b>4,56</b> a las décimas.', '🔟 4,6', ['🔟 4,5', '🔟 4,56'], 'La cifra de las centésimas es 6 (≥ 5), así que la de las décimas sube: <b>4,6</b>.', ['🔎 ¿Qué cifra hay a la derecha del corte?'], 'est'),
  S('s5', 'est', 'Un error relativo del 1 % y otro del 10 %. ¿Cuál es la medida más <b>precisa</b>?', '🏆 La del 1 %', ['🏆 La del 10 %', '🏆 Las dos igual'], 'Cuanto <b>menor</b> es el error relativo, más precisa es la medida.', ['🏆 Menos error = mejor.'], 'est'),

  // ===== NOTACIÓN CIENTÍFICA =====
  S('n1', 'cien', 'En la notación científica a · 10<sup>n</sup>, el número <b>a</b> debe estar…', '📏 Entre 1 y 9,99… (una cifra entera distinta de 0)', ['📏 Entre 0 y 1', '📏 Entre 10 y 99'], 'Por eso 12 · 10<sup>8</sup> no es notación científica: se escribe 1,2 · 10<sup>9</sup>.', ['📏 Delante de la coma, una sola cifra del 1 al 9.'], 'cien'),
  S('n2', 'cien', 'El exponente de 10 es <b>positivo</b> cuando el número es…', '🐘 Muy grande', ['🐜 Muy pequeño (0,000…)', '⚖️ Igual a 1'], 'Grande → exponente positivo. Pequeño (0,00…) → exponente negativo.', ['🔭 La distancia a una estrella es enorme.'], 'cien'),
  S('n3', 'cien', `¿Cuánto vale 10<sup>−3</sup>?`, '🔢 0,001', ['🔢 −1000', '🔢 0,03'], '10<sup>−3</sup> = 1/1000 = <b>0,001</b> (la coma se mueve 3 lugares).', ['🔢 Exponente negativo = número pequeño.'], 'cien'),
  S('n4', 'cien', 'Al multiplicar potencias de 10, los exponentes se…', '➕ Suman', ['✖️ Multiplican', '➖ Restan'], '10<sup>5</sup> · 10<sup>3</sup> = 10<sup>5+3</sup> = <b>10<sup>8</sup></b>.', ['➕ Misma base: se suman los exponentes.'], 'cien'),
  S('n5', 'cien', `4,5 · 10<sup>3</sup> escrito con todas sus cifras es…`, '🔢 4 500', ['🔢 450', '🔢 45 000'], 'Mueves la coma 3 lugares a la derecha: <b>4 500</b>.', ['🔢 Exponente 3 → coma 3 lugares a la derecha.'], 'cien'),
];

/* ---------- GENERADORES (preguntas nuevas cada vez) ---------- */

/* Tipo de decimal que da una fracción */
const NOMBRE_TIPO = { en: 'Número entero', ex: 'Decimal exacto', pu: 'Periódico puro', mi: 'Periódico mixto' };
function tipoDe(n, d) { const [rn, rd] = fred([n, d]); if (rd === 1) return 'en'; const k = Object.keys(factores(rd)).map(Number); if (k.every((p) => p === 2 || p === 5)) return 'ex'; if (!k.some((p) => p === 2 || p === 5)) return 'pu'; return 'mi'; }
const DEN = { ex: [2, 4, 5, 8, 10, 16, 20, 25, 40], pu: [3, 7, 9, 11, 13, 27, 33], mi: [6, 12, 15, 18, 24, 30, 35, 45, 55] };
function genTipo(nivel) {
  const g = nivel === 1 ? pick(['ex', 'pu', 'mi']) : pick(['ex', 'pu', 'mi', 'ex', 'pu']);
  const d = pick(DEN[g]); let n; do { n = R(1, d * 2 - 1); } while (gcd(n, d) !== 1 || n % d === 0);
  let crudo = [n, d], entero = false;
  if (nivel === 3 && Math.random() < 0.25) { const dd = R(2, 9); crudo = [dd * R(2, 6), dd]; entero = true; }
  else if (nivel >= 2 && Math.random() < 0.5) { const k = pick([2, 3, 5]); crudo = [n * k, d * k]; }
  const t = tipoDe(crudo[0], crudo[1]); const [rn, rd] = fred(crudo);
  const opciones = t === 'en' ? ['en', 'ex', 'pu'] : ['ex', 'pu', 'mi'];
  const reducible = crudo[0] !== rn;
  const e = expansion(rn, rd);
  const razon = { en: 'el denominador es 1: es un número entero', ex: 'el denominador solo tiene factores 2 y/o 5', pu: 'el denominador no tiene ni 2 ni 5', mi: 'el denominador tiene 2 o 5 <b>y además</b> otro factor' }[t];
  const ex = (reducible ? `Simplificando: ${F(crudo)} = ${F(rn, rd)}. ` : '') + (rd === 1 ? '' : `Denominador ${rd} = ${factTxt(rd)}: `) + `${razon} → <b>${NOMBRE_TIPO[t].toLowerCase()}</b>` + (rd === 1 ? '' : ` (${F(rn, rd)} = ${decHTML(e)}).`);
  return {
    p: 'tipo', pil: 'tipo', t: `¿Qué tipo de decimal da la fracción ${F(crudo)}?`,
    ok: NOMBRE_TIPO[t], no: opciones.filter((x) => x !== t).map((x) => NOMBRE_TIPO[x]), ex,
    tr: ['✂️ Simplifica la fracción si se puede.', '🔎 Descompón el denominador en factores primos.', '📏 Solo 2 y/o 5 → exacto · ni 2 ni 5 → periódico puro · 2 o 5 y otro factor → periódico mixto.'],
  };
}

/* Fracción generatriz */
function genGeneratriz(nivel) {
  const tipo = nivel === 1 ? 'ex' : nivel === 2 ? 'pu' : pick(['mi', 'mi', 'pu']);
  const ent = R(0, 3);
  const dig = (k) => Array.from({ length: k }, () => R(0, 9)).join('');
  let ante = '', pe = '';
  if (tipo === 'ex') { do { ante = dig(R(2, 3)); } while (ante.endsWith('0')); }
  if (tipo === 'pu') { do { pe = dig(R(1, 2)); } while (/^(\d)\1*$/.test(pe) && pe.length > 1 || pe === '0' || pe === '9'); }
  if (tipo === 'mi') { do { ante = dig(R(1, 2)); pe = dig(R(1, 2)); } while (pe === '0' || pe === '9' || /^0+$/.test(ante + pe)); }
  const a = ante.length, p = pe.length, E = String(ent);
  let ok, w1, w2, pasos;
  if (tipo === 'ex') {
    const N = +(E + ante); ok = fred([N, 10 ** a]); w1 = fred([N, 10 ** (a + 1)]); w2 = fred([N, 10 ** (a - 1)]);
    pasos = `${decHTML({ ent: E, ante, per: '' })} = ${F(N, 10 ** a)}` + (N / 10 ** a === ok[0] / ok[1] && ok[1] === 10 ** a ? '' : ` = ${F(ok)}`);
  } else if (tipo === 'pu') {
    const num = +(E + pe) - ent; ok = fred([num, 10 ** p - 1]); w1 = fred([+(E + pe), 10 ** p]); w2 = fred([+(E + pe), 10 ** p - 1]);
    pasos = `x = ${decHTML({ ent: E, ante, per: pe })} · ${10 ** p}x = ${E === '0' ? '' : ''}${+(E + pe)},${per(pe)} · restando: ${10 ** p - 1}x = ${num} → x = ${F(num, 10 ** p - 1)}` + (ok[1] === 10 ** p - 1 ? '' : ` = ${F(ok)}`);
  } else {
    const num = +(E + ante + pe) - +(E + ante), den = 10 ** (a + p) - 10 ** a; ok = fred([num, den]);
    w1 = fred([+(E + ante + pe), 10 ** (a + p)]); w2 = fred([num, 10 ** p - 1]);
    pasos = `x = ${decHTML({ ent: E, ante, per: pe })} · ${10 ** (a + p)}x = ${+(E + ante + pe)},${per(pe)} · ${10 ** a}x = ${+(E + ante)},${per(pe)} · restando: ${den}x = ${num} → x = ${F(num, den)}` + (ok[1] === den ? '' : ` = ${F(ok)}`);
  }
  const d = decHTML({ ent: E, ante, per: pe });
  const trs = { ex: ['🔟 Cuenta las cifras decimales: 2 cifras → 100, 3 cifras → 1000…', '✂️ Simplifica la fracción.'],
    pu: ['✖️ Multiplica x por 10 (o 100) para que el periodo quede igual.', '➖ Resta x: el periodo desaparece.', '➗ Despeja x y simplifica.'],
    mi: ['✖️ Multiplica x dos veces: una para pasar las cifras sin periodo y otra para llegar al final del primer periodo.', '➖ Resta las dos igualdades.', '➗ Despeja x y simplifica.'] }[tipo];
  return {
    p: 'gen', pil: 'gen', t: `¿Cuál es la fracción generatriz de <b>${d}</b>?` + (pe ? ' <span class="small">(la raya marca el periodo)</span>' : ''),
    ok: F(ok), no: [F(w1), F(w2)], ex: `${pasos}.`, tr: trs, _v: ok[0] / ok[1],
  };
}

/* Operaciones combinadas con fracciones, potencias y raíces */
function genOperacion(nivel) {
  const plantillas = nivel === 1 ? ['P', 'O'] : nivel === 2 ? ['R', 'P', 'O'] : ['Q', 'Q', 'R', 'O'];
  const tp = pick(plantillas);
  const fr0 = () => { let a, b; do { a = R(1, 3); b = R(2, 6); } while (gcd(a, b) !== 1 || a >= b); return [a, b]; };
  let expr, ok, w1, w2, pasos, tr, v;
  if (tp === 'P') {
    const a = fr0(), c = fr0();
    expr = `(${F(a)})<sup>2</sup> · ${F(c)}`;
    ok = mul(pot(a, 2), c); w1 = mul(mul(a, [2, 1]), c); w2 = mul([a[0] * a[0], a[1]], c);
    pasos = `Potencia: (${F(a)})² = ${F(pot(a, 2))}. Producto: ${F(pot(a, 2))} · ${F(c)} = <b>${F(ok)}</b>.`;
    tr = ['⚡ La potencia afecta al numerador <b>y</b> al denominador.', '✖️ Después multiplica numeradores y denominadores y simplifica.'];
    v = Math.pow(a[0] / a[1], 2) * (c[0] / c[1]);
  } else if (tp === 'R') {
    const m = R(1, 5), n = R(m + 1, 6), f = fr0(); const raiz = fred([m, n]);
    expr = `√(${F(m * m, n * n)}) + ${F(f)}`;
    ok = add(raiz, f); w1 = add([m, n * n], f); w2 = fred([m + f[0], n + f[1]]);
    pasos = `Raíz: √(${F(m * m, n * n)}) = ${F(raiz)}. Suma con común denominador: ${F(raiz)} + ${F(f)} = <b>${F(ok)}</b>.`;
    tr = ['√ Haz la raíz del numerador <b>y</b> del denominador.', '➕ Suma con común denominador.'];
    v = Math.sqrt((m * m) / (n * n)) + f[0] / f[1];
  } else if (tp === 'O') {
    const a = fr0(), b = fr0(), c = fr0();
    expr = `${F(a)} + ${F(b)} : ${F(c)}`;
    ok = add(a, div(b, c)); w1 = div(add(a, b), c); w2 = add(a, mul(b, c));
    pasos = `Primero la división: ${F(b)} : ${F(c)} = ${F(div(b, c))}. Después la suma: ${F(a)} + ${F(div(b, c))} = <b>${F(ok)}</b>.`;
    tr = ['📋 La división se hace <b>antes</b> que la suma.', '🔁 Dividir = multiplicar por la inversa.'];
    v = a[0] / a[1] + (b[0] / b[1]) / (c[0] / c[1]);
  } else {
    const a = fr0(), c = fr0(); const m = R(1, 4), n = R(m + 1, 5); const raiz = fred([m, n]);
    expr = `(${F(a)})<sup>2</sup> + √(${F(m * m, n * n)}) : ${F(c)} − 1`;
    const p2 = pot(a, 2), dv = div(raiz, c);
    ok = sub(add(p2, dv), [1, 1]); w1 = sub(add(p2, mul(raiz, c)), [1, 1]); w2 = sub(add(p2, raiz), [1, 1]);
    pasos = `Potencia y raíz: ${F(p2)} y ${F(raiz)}. División: ${F(raiz)} : ${F(c)} = ${F(dv)}. Suma y resta: ${F(p2)} + ${F(dv)} − 1 = <b>${F(ok)}</b>.`;
    tr = ['⚡ Primero potencia y raíz.', '➗ Luego la división (con la inversa).', '➕ Al final, sumas y restas con común denominador.'];
    v = Math.pow(a[0] / a[1], 2) + Math.sqrt(m * m / (n * n)) / (c[0] / c[1]) - 1;
  }
  return { p: 'oper', pil: 'oper', t: `Calcula y simplifica: <span class="expr">${expr}</span>`, ok: F(ok), no: [F(w1), F(w2)], ex: pasos, tr, _v: v, _ok: val(ok) };
}

/* Operaciones con decimales periódicos */
const DECS = [
  { h: '0,' + per('3'), f: [1, 3], conv: '3/9 = 1/3', x: [3, 10] }, { h: '0,' + per('6'), f: [2, 3], conv: '6/9 = 2/3', x: [6, 10] },
  { h: '0,' + per('5'), f: [5, 9], conv: '5/9', x: [5, 10] }, { h: '0,' + per('2'), f: [2, 9], conv: '2/9', x: [2, 10] },
  { h: '1,' + per('3'), f: [4, 3], conv: '(13 − 1)/9 = 12/9 = 4/3', x: [13, 10] }, { h: '0,1' + per('6'), f: [1, 6], conv: '(16 − 1)/90 = 15/90 = 1/6', x: [16, 100] },
  { h: '0,8' + per('3'), f: [5, 6], conv: '(83 − 8)/90 = 75/90 = 5/6', x: [83, 100] }, { h: '2,' + per('3'), f: [7, 3], conv: '(23 − 2)/9 = 21/9 = 7/3', x: [23, 10] },
];
const EXACTOS = [{ h: '1,25', f: [5, 4] }, { h: '0,75', f: [3, 4] }, { h: '1,5', f: [3, 2] }, { h: '0,25', f: [1, 4] }, { h: '2,5', f: [5, 2] }, { h: '0,5', f: [1, 2] }];
function genDecPer(nivel) {
  const a = pick(DECS); const b = nivel === 1 ? pick(EXACTOS) : pick([...EXACTOS, ...DECS.filter((x) => x !== a)]);
  const op = nivel === 3 ? pick(['+', '−', '·']) : pick(['+', '−']);
  const fn = (x, y) => (op === '+' ? add(x, y) : op === '−' ? sub(x, y) : mul(x, y));
  const ok = fn(a.f, b.f);
  const aprox = (f) => [Math.round((f[0] / f[1]) * 100), 100];
  const w1 = fn(a.x, b.x || b.f), w2 = fn(aprox(a.f), b.f && b.f);
  const conv = (d) => (d.conv ? `${d.h} = ${d.conv.includes('=') ? '' : ''}${d.conv.split('=').map((s) => (/\//.test(s) ? F(...s.replace(/[()]/g, '').trim().split('/').map((z) => (z.includes('−') ? eval(z.replace('−', '-')) : +z))) : s)).join(' = ')}` : `${d.h} = ${F(d.f)}`);
  const v = (op === '+' ? 1 : op === '−' ? 2 : 3);
  const num = (f) => f[0] / f[1];
  const dbl = (d) => parseFloat(d.h.replace(/<[^>]+>/g, '').replace(',', '.')) ;
  return {
    p: 'oper', pil: 'decper', t: `Calcula pasando antes los decimales a fracción: <span class="expr">${a.h} ${op} ${b.h}</span>`,
    ok: F(ok), no: [F(w1), F(w2)],
    ex: `${a.h} = ${F(a.f)} · ${b.h} = ${F(b.f)}. Operas: ${F(a.f)} ${op} ${F(b.f)} = <b>${F(ok)}</b>.`,
    tr: ['🔁 Pasa cada decimal a fracción (generatriz).', '➗ Opera con fracciones (común denominador si sumas o restas).', '✂️ Simplifica el resultado.'],
    _a: num(a.f), _b: num(b.f), _op: op, _ok: num(ok),
  };
}

/* Comparar fracciones */
function genComparar(nivel) {
  const DEN3 = [2, 3, 4, 5, 6, 8, 10, 12];
  let fs;
  do { fs = [0, 1, 2].map(() => { const d = pick(DEN3); return fred([R(1, d - 1), d]); }); } while (new Set(fs.map((f) => f[0] / f[1])).size < 3 || new Set(fs.map((f) => f[1])).size < 2 || fs.some((f) => f[1] === 1));
  const M = fs.map((f) => f[1]).reduce(lcm);
  const eq = fs.map((f) => (f[0] * M) / f[1]);
  const ord = fs.map((f, i) => i).sort((i, j) => eq[i] - eq[j]);
  const pasos = `mcm = ${M}: ` + fs.map((f, i) => `${F(f)} = ${F(eq[i], M)}`).join(' ; ') + '.';
  const trs = ['🔎 Calcula el mcm de los denominadores.', '✖️ Pasa cada fracción a ese denominador.', '📏 Con el mismo denominador, gana el numerador mayor.'];
  const lista = (idx, sep) => idx.map((i) => F(fs[i])).join(sep);
  if (nivel === 1 || nivel === 2) {
    const mayor = nivel === 1;
    const bien = mayor ? ord[2] : ord[0];
    return { p: 'comp', pil: 'comp', t: `¿Cuál de estas fracciones es la <b>${mayor ? 'mayor' : 'menor'}</b>? ${fs.map((f) => F(f)).join(' · ')}`,
      ok: F(fs[bien]), no: [0, 1, 2].filter((i) => i !== bien).map((i) => F(fs[i])), ex: pasos + ` La ${mayor ? 'mayor' : 'menor'} es <b>${F(fs[bien])}</b>.`, tr: trs };
  }
  const bien = ord; const todas = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].filter((p) => p.join() !== bien.join());
  const porNum = [0, 1, 2].sort((i, j) => fs[i][0] - fs[j][0]);          // error típico: mirar solo el numerador
  const mal1 = porNum.join() !== bien.join() ? porNum : pick(todas);
  const mal2 = bien.slice().reverse();
  const sep = ' &lt; ';
  return { p: 'comp', pil: 'comp', t: `Ordena de <b>menor a mayor</b>: ${fs.map((f) => F(f)).join(' · ')}`,
    ok: lista(bien, sep), no: [lista(mal1, sep), lista(mal2.join() !== mal1.join() ? mal2 : pick(todas), sep)], ex: pasos + ` Orden: <b>${lista(bien, sep)}</b>.`, tr: trs };
}

/* Problemas de fracciones de cantidades (con barra) */
function genProblema(nivel) {
  const fam = nivel === 1 ? 'F1' : nivel === 2 ? pick(['F1', 'F2', 'F3']) : pick(['F2', 'F3', 'F4']);
  if (fam === 'F1') {
    const pares = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5]]; const [a, b] = pick(pares);
    const N = lcm(a, b) * pick([2, 3, 4, 5, 6]); const u = N / b;
    const ctx = pick([['Una clase tiene', 'alumnos', 'practican deporte'], ['En un autobús viajan', 'personas', 'son niños'], ['Una bolsa tiene', 'caramelos', 'son de fresa'], ['Un equipo juega', 'minutos y', 'se han jugado']]);
    const txt = ctx[1].endsWith('y') ? `Un partido dura ${N} minutos. Ya se han jugado ${F(a, b)} del partido. ¿Cuántos minutos se han jugado?` : `${ctx[0]} ${N} ${ctx[1]} y ${F(a, b)} ${ctx[2]}. ¿Cuántos son?`;
    const ok = u * a;
    return { p: 'prob', pil: 'prob', t: txt, ok: String(ok), no: [String((N / a) * b), String(N - ok)].map((x) => x), ex: `${N} : ${b} = ${u}; ${u} · ${a} = <b>${ok}</b>.`, tr: [`🎨 Divide la barra en ${b} partes iguales y pinta ${a}:${barra(b, a)}`, `➗ ${N} : ${b} = ${u} cada parte.`, `✖️ ${u} · ${a} = ${ok}.`] };
  }
  if (fam === 'F2') {
    const [[a1, b1], [a2, b2]] = pick([[[1, 4], [1, 3]], [[1, 3], [1, 4]], [[1, 2], [1, 5]], [[2, 5], [1, 3]], [[1, 3], [1, 5]], [[1, 6], [1, 3]]]);
    const L = lcm(b1, b2); const N = L * pick([10, 12, 15, 20]);
    const g1 = (N / b1) * a1, g2 = (N / b2) * a2, queda = N - g1 - g2;
    const ctx = pick([['Un depósito de', 'litros', 'Lunes se gasta', 'martes se gasta'], ['Una ruta de', 'km', 'El primer día se recorre', 'el segundo se recorre']]);
    const parts = [(L / b1) * a1, (L / b2) * a2]; const resto = L - parts[0] - parts[1];
    const pasoQ = ctx[1] === 'km' ? 'faltan' : 'quedan';
    return { p: 'prob', pil: 'prob', t: `${ctx[0]} ${N} ${ctx[1]}. ${ctx[2]} ${F(a1, b1)} del total y ${ctx[3]} ${F(a2, b2)} del total. ¿Cuántos ${ctx[1]} ${pasoQ}?`,
      ok: String(queda), no: [String(g1 + g2), String(N - g1)], ex: `Común denominador ${L}: ${F(parts[0], L)} + ${F(parts[1], L)} = ${F(parts[0] + parts[1], L)}. Cada parte vale ${N} : ${L} = ${N / L}. Gastado: ${(parts[0] + parts[1]) * (N / L)}. ${pasoQ[0].toUpperCase() + pasoQ.slice(1)}: ${N} − ${(parts[0] + parts[1]) * (N / L)} = <b>${queda}</b>.`,
      tr: [`🎨 Dibuja una barra de ${L} partes: ${parts[0]} para la primera, ${parts[1]} para la segunda y el resto es lo que queda:${barra3(parts[0], parts[1], resto)}`, `🔎 Cada parte vale ${N} : ${L} = ${N / L}.`, `➖ ${N} − lo gastado.`] };
  }
  if (fam === 'F3') {
    const [f1, f2] = pick([[[1, 4], [1, 3]], [[1, 2], [1, 5]], [[2, 5], [1, 3]], [[1, 3], [1, 6]], [[3, 8], [1, 4]], [[1, 4], [2, 5]]]);
    const gastado = add(f1, f2), queda = sub([1, 1], gastado);
    return { p: 'prob', pil: 'prob', t: `Ana gasta ${F(f1)} de su paga en el cine y ${F(f2)} en comida. ¿Qué <b>fracción</b> de la paga le queda?`,
      ok: F(queda), no: [F(gastado), F(sub([1, 1], fred([f1[0] + f2[0], f1[1] + f2[1]])))],
      ex: `Gastado: ${F(f1)} + ${F(f2)} = ${F(gastado)}. Queda: 1 − ${F(gastado)} = <b>${F(queda)}</b>.`, tr: ['🔎 Primero suma lo gastado (común denominador).', '➖ A 1 (la paga entera) réstale lo gastado.'] };
  }
  const [a, b] = pick([[2, 5], [3, 4], [2, 3], [3, 5], [3, 8]]); const k = pick([4, 5, 6, 7, 8, 10]); const parte = a * k, total = b * k;
  const esCinta = Math.random() < 0.5; const obj = esCinta ? 'una cinta' : 'un camino'; const u = esCinta ? 'cm' : 'm';
  return { p: 'prob', pil: 'prob', t: `${F(a, b)} de ${obj} miden ${parte} ${u}. ¿Cuánto mide ${esCinta ? 'la cinta <b>entera</b>' : 'el camino <b>entero</b>'}?`,
    ok: String(total), no: [String(parte * b), String(total - parte)], ex: `${a} partes miden ${parte}: cada parte = ${parte} : ${a} = ${k}. Total: ${k} · ${b} = <b>${total}</b> ${u}.`,
    tr: [`🎨 ${a} partes de ${b} valen ${parte}:${barra(b, a)}`, `➗ ${parte} : ${a} = ${k} cada parte.`, `✖️ ${k} · ${b} = ${total}.`] };
}

/* Detective de errores */
const DESC_ERR = {
  suma: 'Ha sumado numeradores con numeradores y denominadores con denominadores: hay que usar común denominador',
  reves: 'Ha hecho la fracción al revés: ha multiplicado por el denominador y dividido entre el numerador',
  mult: 'Ha sumado los denominadores: en un producto se multiplican numeradores entre sí y denominadores entre sí',
  div: 'No ha invertido la segunda fracción: dividir es multiplicar por la inversa',
  resto: 'Ha dado la fracción que se gasta, no la que queda: falta restar a 1',
};
const GENERICOS_ERR = ['Se ha equivocado al simplificar', 'Ha restado en vez de sumar', 'Ha olvidado poner las unidades', 'Ha redondeado demasiado pronto'];
function genError(nivel) {
  const k = pick(nivel === 1 ? ['suma', 'reves'] : nivel === 2 ? ['suma', 'reves', 'mult', 'div'] : ['suma', 'reves', 'mult', 'div', 'resto']);
  const nom = pick(['Pablo', 'Lucía', 'Diego', 'Irene', 'Marta', 'Hugo']);
  const dist = (r) => ({ F: pick(1), x: r });
  const fr = () => { let a, b; do { a = R(1, 4); b = R(2, 7); } while (gcd(a, b) !== 1 || a >= b); return [a, b]; };
  let texto, correcto, tr;
  if (k === 'suma') {
    let x, y; do { x = fr(); y = fr(); } while (x[1] === y[1]);
    texto = `${F(x)} + ${F(y)} = ${F(x[0] + y[0], x[1] + y[1])}`; correcto = `${F(x)} + ${F(y)} = ${F(add(x, y))}`;
    tr = ['🔎 Mira cómo ha obtenido el denominador del resultado.'];
  } else if (k === 'reves') {
    const [a, b] = pick([[2, 5], [3, 5], [3, 4], [2, 3]]); const N = a * b * R(1, 4) * 2 || 30; const mal = (N * b) / a;
    texto = `${F(a, b)} de ${N} = ${N} · ${b} : ${a} = ${mal}`; correcto = `${F(a, b)} de ${N} = ${N} : ${b} · ${a} = ${(N / b) * a}`;
    tr = [`🧠 ¿Puede una parte (${F(a, b)} de ${N}) ser <b>mayor</b> que el total?`];
  } else if (k === 'mult') {
    let x, y; do { x = fr(); y = fr(); } while (x[1] === y[1]);
    texto = `${F(x)} · ${F(y)} = ${F(x[0] * y[0], x[1] + y[1])}`; correcto = `${F(x)} · ${F(y)} = ${F(mul(x, y))}`;
    tr = ['🔎 ¿Qué ha hecho con los dos denominadores?'];
  } else if (k === 'div') {
    let x, y; do { x = fr(); y = fr(); } while (x[1] === y[1]);
    texto = `${F(x)} : ${F(y)} = ${F(x[0] * y[0], x[1] * y[1])}`; correcto = `${F(x)} : ${F(y)} = ${F(div(x, y))}`;
    tr = ['🔁 ¿Qué se hace con la segunda fracción al dividir?'];
  } else {
    let x, y; do { x = fr(); y = fr(); } while (x[1] === y[1] || val(add(x, y)) >= 1);
    texto = `Ana gasta ${F(x)} y ${F(y)} de su paga. «Le queda ${F(add(x, y))}.»`; correcto = `Le queda 1 − ${F(add(x, y))} = ${F(sub([1, 1], add(x, y)))}`;
    tr = ['🔎 ¿Lo que ha dado es lo que queda o lo que se ha gastado?'];
  }
  const ok = DESC_ERR[k];
  const otros = Object.keys(DESC_ERR).filter((x) => x !== k).map((x) => DESC_ERR[x]);
  const no = sacar([...otros, ...GENERICOS_ERR], 2);
  return { p: 'err', pil: 'err', t: `${nom} resuelve: <span class="expr">${texto}</span> ¿Qué <b>error</b> ha cometido?`, ok, no, ex: `${ok}. Bien hecho: ${correcto}.`, tr };
}

/* Estimaciones y errores */
function genEstimacion(nivel) {
  const A = R(21, 299), B = R(21, 99);               // décimas: 2,1 … 29,9 y 2,1 … 9,9
  const a = A / 10, b = B / 10;
  const ra = Math.round(a), rb = Math.round(b), E = ra * rb;
  const V100 = A * B, ea100 = Math.abs(V100 - E * 100);
  if (ea100 === 0) return genEstimacion(nivel);
  const V = V100 / 100, ea = ea100 / 100;
  const ctx = `Lucía compra ${coma(a)} m de cinta que cuesta ${coma(b)} € el metro`;
  const txt = (s) => `${ctx}. ${s}`;
  if (nivel === 1) {
    return { p: 'est', pil: 'est', t: txt(`Redondeando cada número a las unidades, ¿cuánto pagará <b>más o menos</b>?`), ok: `${E} €`, no: [`${Math.trunc(a) * Math.trunc(b)} €`, `${fmt(V)} €`],
      ex: `Redondeando: ${coma(a)} ≈ ${ra} y ${coma(b)} ≈ ${rb} → ${ra} · ${rb} = <b>${E} €</b>. (El valor exacto es ${fmt(V)} €.)`, tr: ['🎯 Redondea cada número al entero más cercano.', `✖️ ${ra} · ${rb}.`] };
  }
  if (nivel === 2) {
    return { p: 'est', pil: 'est', t: txt(`Estima el precio: ${ra} · ${rb} = ${E} €. El precio exacto es ${fmt(V)} €. ¿Cuál es el <b>error absoluto</b>?`), ok: `${fmt(ea)} €`, no: [`${fmt(ea * 10)} €`, `${fmt(V + E)} €`],
      ex: `Error absoluto = |${fmt(V)} − ${E}| = <b>${fmt(ea)} €</b>.`, tr: ['➖ Resta el valor exacto y el estimado.', '📏 Si da negativo, quítale el signo (valor absoluto).'] };
  }
  const er = (ea100 * 100) / V100;
  return { p: 'est', pil: 'est', t: txt(`Estima: ${ra} · ${rb} = ${E} €. El precio exacto es ${fmt(V)} €. ¿Cuál es el <b>error relativo</b> (en %)?`), ok: `${fmt(er)} %`, no: [`${fmt((ea100 * 100) / (E * 100))} %`, `${fmt(ea)} %`],
    ex: `Error absoluto = |${fmt(V)} − ${E}| = ${fmt(ea)}. Error relativo = ${fmt(ea)} : ${fmt(V)} = ${fmt(ea / V, 4)} → <b>${fmt(er)} %</b>.`, tr: ['➖ Primero el error absoluto.', '➗ Divídelo entre el valor <b>exacto</b> (no entre el estimado).', '✖️ Multiplica por 100 para pasarlo a %.'] };
}

/* Notación científica */
const mantStr = (digs) => (digs.length === 1 ? digs : digs[0] + ',' + digs.slice(1));
const sci = (digs, e) => `${mantStr(digs)} · ${potDiez(e)}`;
function genCientifica(nivel) {
  const digs = pick(['2', '4', '6', '7', '85', '62', '35', '15', '385', '602', '125']);
  if (nivel === 1) {
    const e = R(4, 11); const num = miles(digs + '0'.repeat(e - (digs.length - 1)));
    return { p: 'cien', pil: 'cien', t: `Escribe en notación científica: <b>${num}</b>`, ok: sci(digs, e), no: [sci(digs, e + 1), `${mantStr(digs + '0')} · ${potDiez(e - 1)}`],
      ex: `Colocas la coma tras la primera cifra y cuentas cuántos lugares has movido: <b>${e}</b>. → ${sci(digs, e)}.`, tr: ['📏 Deja una sola cifra delante de la coma.', '🔢 Cuenta cuántos lugares has movido la coma: ese es el exponente (positivo si es grande).'] };
  }
  if (nivel === 2) {
    if (Math.random() < 0.5) {
      const e = R(4, 9); const num = '0,' + '0'.repeat(e - 1) + digs;
      return { p: 'cien', pil: 'cien', t: `Escribe en notación científica: <b>${num}</b>`, ok: sci(digs, -e), no: [sci(digs, e), sci(digs, -e + 1)],
        ex: `Para llevar la coma detrás de la primera cifra distinta de 0 la mueves ${e} lugares a la derecha → exponente <b>−${e}</b>.`, tr: ['🐜 Número pequeño → exponente negativo.', '🔢 Cuenta los lugares hasta la primera cifra distinta de 0.'] };
    }
    const e = R(3, 8); const entero = miles(digs + '0'.repeat(e - (digs.length - 1)));
    return { p: 'cien', pil: 'cien', t: `Escribe con todas sus cifras: <b>${sci(digs, e)}</b>`, ok: entero, no: [miles(digs + '0'.repeat(e - (digs.length - 1) + 1)), miles(digs + '0'.repeat(Math.max(0, e - (digs.length - 1) - 1)) || digs)],
      ex: `Mueves la coma ${e} lugares a la derecha y rellenas con ceros: <b>${entero}</b>.`, tr: ['➡️ Exponente positivo → coma a la derecha.', '0️⃣ Rellena con ceros los huecos.'] };
  }
  let c1, c2; do { c1 = R(2, 9); c2 = R(2, 9); } while (c1 * c2 < 10);
  const e1 = R(-6, 7), e2 = R(-4, 6); const prod = c1 * c2; const dg = String(prod); const mant = dg.replace(/0+$/, '') || dg; const e = e1 + e2 + 1;
  return { p: 'cien', pil: 'cien', t: `Calcula en notación científica: <span class="expr">(${c1} · ${potDiez(e1)}) · (${c2} · ${potDiez(e2)})</span>`, ok: sci(mant, e), no: [`${prod} · ${potDiez(e - 1)}`, sci(mant, e1 * e2)],
    ex: `Números: ${c1} · ${c2} = ${prod}. Exponentes: ${String(e1).replace('-', '−')} + (${String(e2).replace('-', '−')}) = ${String(e1 + e2).replace('-', '−')}. Queda ${prod} · ${potDiez(e1 + e2)} y, para que sea notación científica, ${prod} = ${mantStr(mant)} · 10 → <b>${sci(mant, e)}</b>.`,
    tr: ['✖️ Multiplica los números entre sí.', '➕ Suma los exponentes de 10.', '📏 Si el número sale ≥ 10, pasa un factor 10 al exponente.'] };
}

const GENERADORES = {
  err: [G('gen:err', genError)], prob: [G('gen:prob', genProblema)], vida: [],
  tipo: [G('gen:tipo', genTipo)], gen: [G('gen:gen', genGeneratriz)],
  oper: [G('gen:oper', genOperacion), G('gen:decper', genDecPer)],
  comp: [G('gen:comp', genComparar)], est: [G('gen:est', genEstimacion)], cien: [G('gen:cien', genCientifica)],
};

if (typeof module !== 'undefined') module.exports = { PLANETAS, FIJAS, GENERADORES, PIL, expansion, tipoDe, fred };
