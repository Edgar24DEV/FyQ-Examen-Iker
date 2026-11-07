/* =========================================================
   MISIÓN HISTORIA · 2º ESO · Tema 3
   Los inicios de la civilización islámica y al-Ándalus
   - Preguntas fijas (S) sacadas del libro.
   - Generadores que inventan preguntas nuevas cada vez
     (fechas, siglos, personajes, vocabulario, ciudades).
   Para añadir una pregunta, copia una línea S(...) y cambia el texto.
   ========================================================= */

const PLANETAS = [
  { id: 'doc',   emoji: '🕌', nombre: 'Planeta Doctrina',    desc: 'Corán, sunna y los 5 pilares', grupo: 'El islam' },
  { id: 'exp',   emoji: '🗺️', nombre: 'Planeta Expansión',   desc: 'Califato ortodoxo, fitna, suníes y chiitas', grupo: 'El islam' },
  { id: 'omeya', emoji: '🌴', nombre: 'Planeta Omeyas',      desc: 'Califato omeya: Damasco, 661-750', grupo: 'El islam' },
  { id: 'abasi', emoji: '📚', nombre: 'Planeta Abasíes',     desc: 'Califato abasí: Bagdad, desde 750', grupo: 'El islam' },
  { id: 'soc',   emoji: '👥', nombre: 'Planeta Sociedad',    desc: 'Jassa, mawali, dimmi y esclavos', grupo: 'La sociedad islámica' },
  { id: 'con',   emoji: '⚔️', nombre: 'Planeta Conquista',   desc: 'Tariq, el año 711 y los pactos', grupo: 'Al-Ándalus' },
  { id: 'and',   emoji: '🏰', nombre: 'Planeta Al-Ándalus',  desc: 'Emirato, califato de Córdoba y taifas', grupo: 'Al-Ándalus' },
  { id: 'conv',  emoji: '🤝', nombre: 'Planeta Convivencia', desc: 'Muladíes, mozárabes, bereberes…', grupo: 'Al-Ándalus' },
  { id: 'eco',   emoji: '💰', nombre: 'Planeta Economía',    desc: 'Ciudades, comercio y Medina Azahara', grupo: 'Al-Ándalus' },
  { id: 'crono', emoji: '⏳', nombre: 'Planeta Fechas',      desc: 'Años, orden de los hechos y siglos', grupo: 'Para repasar' },
  { id: 'gente', emoji: '🧑‍✈️', nombre: 'Planeta Personajes',  desc: '¿Quién hizo qué?', grupo: 'Para repasar' },
  { id: 'pal',   emoji: '📖', nombre: 'Planeta Palabras',    desc: 'Vocabulario clave del tema', grupo: 'Para repasar' },
];

/* ---------- utilidades ---------- */
const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const mezclar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sacar = (arr, n, excepto = []) => mezclar(arr.filter((x) => !excepto.includes(x))).slice(0, n);
const mayus = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/* Pregunta fija: S(id, planeta, texto, correcta, [mala1, mala2], explicación, [pistas], píldora opcional) */
const S = (id, p, t, ok, no, ex, tr, pil) => ({ id, p, t, ok, no, ex, tr, pil });

/* ---------- DATOS COMPARTIDOS (los usan los generadores y la chuleta) ---------- */
// c = nombre corto del hecho · q = lo que va detrás de "¿En qué año…?"
const EVENTOS = [
  { y: 632,  c: 'Muere Mahoma y Abu-Bakr es el primer califa', q: 'murió Mahoma' },
  { y: 661,  c: 'Moawiya funda la dinastía omeya',             q: 'Moawiya fundó la dinastía omeya' },
  { y: 711,  c: 'Tariq desembarca en Gibraltar',               q: 'desembarcó Tariq en Gibraltar' },
  { y: 713,  c: 'Acuerdo de Teodomiro',                        q: 'se firmó el acuerdo de Teodomiro' },
  { y: 732,  c: 'Batalla de Poitiers',                         q: 'fue la batalla de Poitiers' },
  { y: 750,  c: 'Los abasíes sustituyen a los omeyas',         q: 'terminó el califato omeya' },
  { y: 756,  c: 'Abderramán I funda el emirato de Córdoba',    q: 'Abderramán I fundó el emirato independiente de Córdoba' },
  { y: 762,  c: 'Se funda Bagdad, capital de los abasíes',     q: 'se fundó Bagdad' },
  { y: 912,  c: 'Abderramán III se proclama califa',           q: 'Abderramán III se proclamó califa' },
  { y: 1002, c: 'Muere Almanzor',                              q: 'murió Almanzor' },
  { y: 1031, c: 'Desaparece el califato de Córdoba',           q: 'desapareció el califato de Córdoba' },
  { y: 1258, c: 'Los mongoles toman Bagdad: fin del califato abasí', q: 'los mongoles tomaron Bagdad y acabó el califato abasí' },
];

// d = qué fue/hizo · h = pista
const PERSONAS = [
  { n: 'Abu-Bakr',       d: 'fue el primer califa',                                       h: 'Sucedió a Mahoma cuando murió, en el año 632.' },
  { n: 'Abu-l-Abbás al-Saffah', d: 'derrocó a los omeyas y fundó el califato abasí en 750', h: 'Su dinastía llevó la capital de Damasco a Bagdad.' },
  { n: 'Harún al-Raschid', d: 'fue el califa abasí de Bagdad en la época de mayor esplendor', h: 'Gobernó de 786 a 809 desde Bagdad, no desde Damasco.' },
  { n: 'Moawiya',        d: 'fundó la dinastía omeya',                                    h: 'Era el gobernador de Siria y llegó a califa en el año 661.' },
  { n: 'Alí',            d: 'fue califa, primo de Mahoma, y murió asesinado',             h: 'Los chiitas dicen que el califa debe ser descendiente suyo.' },
  { n: 'Otmán',          d: 'fue el califa cuyo asesinato desencadenó la fitna',          h: 'Gobernó de 644 a 656. Su muerte provocó la «gran discordia».' },
  { n: 'Tariq',          d: 'desembarcó en Gibraltar en el año 711',                      h: 'Era gobernador musulmán de Tánger y sus soldados eran bereberes.' },
  { n: 'Musa ibn Nusayr', d: 'reforzó a Tariq con nuevas tropas',                         h: 'Era el valí del norte de África.' },
  { n: 'Rodrigo',        d: 'fue el rey visigodo derrotado por Tariq',                    h: 'Se disputaba el trono con Agila II.' },
  { n: 'Teodomiro',      d: 'fue el gobernador visigodo que pactó con Musa en 713',       h: 'Gobernaba la zona de Murcia y Alicante.' },
  { n: 'Carlos Martel',  d: 'derrotó a los musulmanes en Poitiers (732)',                 h: 'Dirigía las tropas del reino franco.' },
  { n: 'Abderramán I',   d: 'fundó el emirato independiente de Córdoba en 756',           h: 'Llegó a al-Ándalus tras el asesinato de los omeyas.' },
  { n: 'Abderramán III', d: 'se proclamó califa de Córdoba en 912',                       h: 'Sofocó la rebelión de Ibn Jafsún y mandó construir Medina Azahara.' },
  { n: 'Ibn Jafsún',     d: 'fue el muladí que se rebeló desde Bobastro',                 h: 'Su rebelión (880-912) puso en jaque al emirato.' },
  { n: 'Almanzor',       d: 'fue el caudillo militar que gobernó en tiempos de Hisham II', h: 'Murió en el año 1002 y después llegaron las disputas.' },
];

// t = término · d = definición · q = frase tras "¿Cómo se llama…?" · g = grupo (para que los fallos sean parecidos)
const TERMINOS = [
  { t: 'Umma',       d: 'La comunidad de creyentes del islam',                          q: 'la comunidad de creyentes del islam', g: 'islam' },
  { t: 'Califa',     d: 'El líder político y religioso de los creyentes',               q: 'el líder político y religioso de los creyentes', g: 'islam' },
  { t: 'Califato',   d: 'El gobierno de un califa, que une poder político y religioso', q: 'el gobierno que une el poder político y el religioso en una figura', g: 'islam' },
  { t: 'Sunna',      d: '«Estilo de vida»: enseñanzas y dichos de Mahoma',              q: 'la fuente que recoge las enseñanzas y dichos de Mahoma', g: 'islam' },
  { t: 'Corán',      d: 'El libro sagrado: la palabra de Alá revelada a Mahoma',        q: 'el libro sagrado del islam', g: 'islam' },
  { t: 'Azaque',     d: 'La limosna: impuesto anual para los más necesitados',          q: 'el pilar de la limosna', g: 'islam' },
  { t: 'Ulemas',     d: 'Los encargados de explicar e interpretar la doctrina',         q: 'los encargados de explicar e interpretar la doctrina', g: 'islam' },
  { t: 'Imames',     d: 'Los guías de la oración',                                      q: 'los guías de la oración', g: 'islam' },
  { t: 'Fitna',      d: 'La «gran discordia»: guerra civil entre musulmanes',           q: 'la «gran discordia», la guerra civil entre musulmanes', g: 'islam' },
  { t: 'Suníes',     d: 'Seguidores de la sunna (la tradición)',                        q: 'a quienes siguen la sunna', g: 'islam' },
  { t: 'Chiitas',    d: 'Los que creen que el califa debe descender de Alí',            q: 'a quienes creen que el califa debe ser descendiente de Alí', g: 'islam' },
  { t: 'Jassa',      d: 'Pequeña aristocracia latifundista de origen árabe y sirio',    q: 'la aristocracia árabe y siria dueña de grandes tierras', g: 'gente' },
  { t: 'Mawali',     d: 'Musulmanes no árabes, de «segunda categoría»',                 q: 'a los musulmanes que no eran árabes', g: 'gente' },
  { t: 'Dimmi',      d: 'Cristianos y judíos («gentes del libro»)',                     q: 'a los cristianos y judíos que vivían bajo gobierno musulmán', g: 'gente' },
  { t: 'Bereberes',  d: 'Población del norte de África; eran los soldados de Tariq',    q: 'a la población del norte de África que formaba el ejército de Tariq', g: 'gente' },
  { t: 'Muladíes',   d: 'Hispanovisigodos convertidos al islam',                        q: 'a los hispanovisigodos que se convirtieron al islam', g: 'gente' },
  { t: 'Mozárabes',  d: 'Cristianos que asimilaron la cultura árabe',                   q: 'a los cristianos que adoptaron la cultura árabe', g: 'gente' },
  { t: 'Visir',      d: 'Ministro principal y mano derecha del califa',                 q: 'al ministro principal y mano derecha del califa', g: 'califatos' },
  { t: 'Casa de la Sabiduría', d: 'Centro de estudio y traducción de obras de Bagdad',  q: 'al centro de estudio y traducción de obras de Bagdad', g: 'califatos' },
  { t: 'Dinastía',   d: 'Serie de gobernantes de una misma familia',                    q: 'a la serie de gobernantes de una misma familia', g: 'califatos' },
  { t: 'Valí',       d: 'Gobernador de una provincia del califato',                     q: 'al gobernador de una provincia del califato', g: 'gobierno' },
  { t: 'Valiato',    d: 'Provincia gobernada por un valí',                              q: 'a una provincia gobernada por un valí', g: 'gobierno' },
  { t: 'Emir',       d: 'Gobernante que tiene el poder político, como un rey',          q: 'al gobernante con poder político, como un rey', g: 'gobierno' },
  { t: 'Emirato',    d: 'Territorio gobernado por un emir',                             q: 'al territorio gobernado por un emir', g: 'gobierno' },
  { t: 'Cora',       d: 'Provincia de al-Ándalus',                                      q: 'a cada provincia de al-Ándalus', g: 'gobierno' },
  { t: 'Marca',      d: 'Cora fronteriza, con grandes fortalezas',                      q: 'a las coras fronterizas con grandes fortalezas', g: 'gobierno' },
  { t: 'Taifas',     d: 'Reinos musulmanes que surgieron al caer el califato',          q: 'a los reinos musulmanes que sustituyeron al califato de Córdoba', g: 'gobierno' },
  { t: 'Zoco',       d: 'Mercado de las ciudades, lugar de intercambios',               q: 'al mercado de las ciudades andalusíes', g: 'economia' },
  { t: 'Medina',     d: 'Núcleo urbano con talleres artesanales',                       q: 'al núcleo urbano donde había talleres artesanales', g: 'economia' },
  { t: 'Alquería',   d: 'Pequeña aldea de zonas rurales o de montaña',                  q: 'a las pequeñas aldeas rurales', g: 'economia' },
  { t: 'Aparcería',  d: 'Trabajar la parcela de otra persona y repartir la cosecha',    q: 'a trabajar la parcela de otra persona repartiendo la cosecha', g: 'economia' },
  { t: 'Dinar',      d: 'Moneda de oro del sistema monetario andalusí (con el dirham)', q: 'a una de las dos monedas del sistema andalusí, junto al dirham', g: 'economia' },
  { t: 'Yizya',      d: 'Impuesto que pagaban los dimmi (junto al jarach)',             q: 'a uno de los impuestos de los dimmi, junto al jarach', g: 'economia' },
];

const CIUDADES = [
  { a: 'Kurduba',   m: 'Córdoba',   nota: 'la capital, con más de 200 000 habitantes' },
  { a: 'Ishbilia',  m: 'Sevilla',   nota: 'ciudad de origen romano que recuperó su esplendor' },
  { a: 'Saraqusta', m: 'Zaragoza',  nota: 'ciudad de origen romano que recuperó su esplendor' },
  { a: 'Balansiya', m: 'Valencia',  nota: 'ciudad de origen romano que recuperó su esplendor' },
  { a: 'Mayrida',   m: 'Mérida',    nota: 'ciudad de origen romano que recuperó su esplendor' },
  { a: 'Tulaitula', m: 'Toledo',    nota: 'ciudad de origen romano que recuperó su esplendor' },
  { a: 'Mursiya',   m: 'Murcia',    nota: 'ciudad nueva, fundada por los musulmanes' },
];

/* ---------- PÍLDORAS (mini-teoría de 2-3 frases) ---------- */
const PIL = {
  fuentes: '📖 La doctrina del islam está en dos fuentes escritas: el <b>Corán</b> (libro sagrado, la palabra de Alá revelada a Mahoma) y la <b>sunna</b> («estilo de vida»: enseñanzas y dichos de Mahoma y de algunos discípulos).',
  pilares: '✋ Los <b>5 pilares</b>, uno por dedo: 🗣️ <b>Profesión de fe</b> · 🙏 <b>Oración</b> (5 veces al día, hacia La Meca) · 💰 <b>Azaque</b> (limosna) · 🌙 <b>Ayuno</b> (Ramadán) · 🕋 <b>Peregrinación</b> a La Meca. Truco: <b>P-O-A-A-P</b>.',
  clero: '🧑‍🏫 El islam <b>no tiene sacerdotes</b>. Pero hay <b>ulemas</b> (explican e interpretan la doctrina) e <b>imames</b> (guían la oración). Truco: Ulemas = «Utilizan libros para explicar»; Imames = «Inician la oración».',
  expansion: '🗺️ Cuando murió Mahoma (<b>632</b>) empezó el <b>califato ortodoxo</b> (632-661). Los califas eran jefes <b>políticos y religiosos</b>. Conquistaron Mesopotamia, Siria, Persia y Egipto.',
  fitna: '⚡ El califa Otmán fue asesinado y empezó la <b>fitna</b> («gran discordia»), una guerra civil. Ganó Moawiya, que fundó la <b>dinastía omeya</b> (661) y el islam quedó dividido en <b>suníes</b> y <b>chiitas</b>.',
  corrientes: '🌗 <b>Suníes</b>: siguen la <b>sunna</b> (la tradición). <b>Chiitas</b>: el califa debe ser <b>descendiente de Alí</b>. Truco: Suníes ↔ Sunna (suenan igual).',
  omeya: '👑 Con los <b>omeyas</b> (661-750) el califato pasó a ser <b>hereditario</b> y se gobernaba desde <b>Damasco</b>. El imperio llegó del norte de África y Hispania hasta el valle del Indo, el <b>árabe</b> fue lengua oficial y los territorios eran <b>valiatos</b> con un <b>valí</b>. En 750 los abasíes los derrocaron.',
  abasi: '📚 Los <b>abasíes</b> (750-1258) derrocaron a los omeyas y llevaron la capital a <b>Bagdad</b> (fundada en 762). Los <b>mawali</b>, sobre todo persas, ganaron peso, y el <b>visir</b> fue la mano derecha del califa. Bagdad brilló en ciencia y cultura (<b>Casa de la Sabiduría</b>), pero el imperio se fue fragmentando.',
  sociedad: '👥 La <b>umma</b> es la comunidad de creyentes. Arriba, la <b>jassa</b> (aristocracia árabe y siria). Luego los <b>mawali</b> (musulmanes no árabes) y, al margen, los <b>dimmi</b> (cristianos y judíos). En la base, las personas <b>esclavizadas</b>.',
  tributos: '💸 Los <b>dimmi</b> podían practicar su religión y conservar su forma de vida, pero tenían que pagar el <b>jarach</b> y la <b>yizya</b>. Eran «ciudadanos de segunda».',
  esclavos: '⛓️ Se llegaba a ser esclavizado por <b>deudas</b>, por ser <b>prisionero de guerra</b> o por ser <b>descendiente de esclavos</b>. La esclavitud era importante para la economía.',
  conquista: '⚔️ En <b>711</b> Tariq (gobernador de Tánger) desembarcó en Gibraltar mientras los visigodos se peleaban por el trono (Rodrigo contra Agila II). Derrotó a Rodrigo y recibió refuerzos de Musa.',
  pactos: '🤝 Los musulmanes eran pocos, así que prefirieron <b>pactar</b>: <b>pactos de rendición</b> (respetaban bienes y creencias si la ciudad se rendía) y <b>acuerdos de sumisión</b> (gobernadores visigodos se sometían). Ejemplo: Teodomiro (713).',
  emirato: '🏰 En <b>756</b> Abderramán I creó el <b>emirato independiente de Córdoba</b>: mandaba como un rey, pero reconocía la autoridad religiosa del califa abasí de Bagdad. Dividió el territorio en <b>coras</b>.',
  califato: '👑 En <b>912</b> Abderramán III se proclamó <b>califa</b>: poder totalmente independiente. Fue el <b>esplendor</b> de al-Ándalus. Con Almanzor llegó el ocaso y en <b>1031</b> el califato se rompió en <b>taifas</b>.',
  convivencia: '🌍 En al-Ándalus convivían <b>bereberes</b> (la mayoría de los conquistadores), <b>árabes y sirios</b> (minoría), <b>hispanovisigodos</b> (la mayoría de la población), <b>muladíes</b> (convertidos), <b>mozárabes</b> (cristianos arabizados) y <b>judíos</b>.',
  muladies: '🎯 Truco: <b>MU</b>ladí = se <b>MU</b>dó de religión (se convirtió al islam). <b>MO</b>zárabe = se quedó <b>MO</b>ntado en el cristianismo, pero adoptó la cultura árabe.',
  economia: '💰 La riqueza se basó en el <b>comercio a larga distancia</b>, el <b>dinar y el dirham</b> (monedas), los <b>impuestos</b>, la <b>artesanía</b> y el <b>regadío</b>. Los <b>zocos</b> eran los mercados y las <b>medinas</b>, los barrios con talleres.',
  ciudades: '🏙️ Las ciudades de origen romano recuperaron su esplendor y los musulmanes fundaron <b>Mursiya</b> (Murcia). <b>Kurduba</b> (Córdoba), la capital, tuvo <b>más de 200 000 habitantes</b>: la mayor ciudad de Europa occidental.',
  campo: '🌾 Lo más dinámico fueron las <b>llanuras y vegas</b> con <b>regadío</b> (huertas de Murcia, Valencia y valle del Ebro). En las montañas había <b>alquerías</b> (aldeas) y <b>pastos</b> para ovejas y cabras.',
  medina: '🏛️ <b>Medina Azahara</b>: ciudad palaciega que mandó construir <b>Abderramán III</b> a las afueras de Córdoba. Fue su residencia, su corte y la sede del Gobierno. El <b>Salón Rico</b> es lo más famoso que se conserva.',
  siglos: '🔢 <b>Truco de los siglos</b>: quita las dos últimas cifras y <b>suma 1</b>. 711 → 7 + 1 = <b>siglo VIII</b>. Romanos: V=5, VI=6, VII=7, VIII=8, IX=9, X=10, XI=11.',
  fechas: '⏳ Línea del tiempo: <b>632</b> muere Mahoma · <b>661</b> omeyas · <b>711</b> Tariq · <b>756</b> emirato · <b>912</b> califato · <b>1002</b> muere Almanzor · <b>1031</b> taifas. Y en Oriente: <b>750</b> abasíes · <b>762</b> Bagdad · <b>1258</b> fin de los abasíes.',
  palabras: '📖 Pregunta de vocabulario: fíjate en la palabra y piensa en el apartado del libro donde salía (islam, sociedad, gobierno o economía).',
  personas: '🧑‍✈️ Pregunta de personajes: relaciona cada nombre con lo que hizo y con su año. Las pistas te ayudan si te atascas.',
};

/* ---------- PREGUNTAS FIJAS ---------- */
const FIJAS = [
  // ===== DOCTRINA (apartado 1.2) =====
  S('d1', 'doc', 'Las dos <b>fuentes escritas</b> de la doctrina del islam son…', '📖 El Corán y la sunna', ['📜 El Corán y la Biblia', '💰 La sunna y el azaque'],
    'El <b>Corán</b> es el libro sagrado y la <b>sunna</b> recoge enseñanzas y dichos de Mahoma.', ['📖 Una es el libro sagrado del islam. ¿Cómo se llama?', '🛣️ La otra significa «estilo de vida».'], 'fuentes'),
  S('d2', 'doc', '¿Qué es el <b>Corán</b>?', '📖 El libro sagrado, con la palabra de Alá revelada a Mahoma', ['📜 Una colección de dichos de los discípulos', '🕌 El nombre de la mezquita de La Meca'],
    'El Corán es el <b>libro sagrado</b> del islam.', ['🧩 Libro sagrado = el Corán. Los dichos de Mahoma son la sunna.'], 'fuentes'),
  S('d3', 'doc', 'La <b>sunna</b>, que significa «estilo de vida», recoge…', '🛣️ Enseñanzas y dichos de Mahoma y de algunos discípulos', ['⚖️ Las leyes del califa de Córdoba', '⚔️ Las órdenes del ejército'],
    'La sunna reúne lo que <b>enseñó y dijo Mahoma</b> y algunos de sus discípulos.', ['🛣️ «Estilo de vida»: cómo vivía y qué decía Mahoma.'], 'fuentes'),
  S('d4', 'doc', '¿Cuántos <b>pilares fundamentales</b> tiene la religión islámica?', '✋ Cinco', ['🤟 Tres', '🖐️ Siete'],
    'Son <b>cinco</b>: profesión de fe, oración, azaque, ayuno y peregrinación.', ['✋ Piensa en los dedos de una mano.'], 'pilares'),
  S('d5', 'doc', 'El pilar que dice que hay <b>un único Dios, Alá</b>, y que Mahoma es su profeta es…', '🗣️ La profesión de fe', ['💰 El azaque', '🕋 La peregrinación'],
    'La <b>profesión de fe</b> es declarar que hay un solo Dios y que Mahoma es su profeta.', ['🗣️ Es «declarar» lo que uno cree. ¿Cuál pilar es hablar de la fe?'], 'pilares'),
  S('d6', 'doc', '¿Cuántas veces al día rezan los creyentes y hacia dónde?', '🙏 Cinco veces, hacia La Meca', ['🙏 Tres veces, hacia Medina', '🙏 Una vez, hacia Damasco'],
    'Rezan <b>cinco veces al día</b>, recitando el Corán, en dirección a <b>La Meca</b>.', ['✋ Otra vez el cinco… ¡y siempre mirando a La Meca!'], 'pilares'),
  S('d7', 'doc', 'El <b>azaque</b> o limosna consiste en…', '💰 Pagar cada año un impuesto para ayudar a los más necesitados', ['🙏 Rezar cinco veces al día', '🕋 Viajar a La Meca una vez en la vida'],
    'Cada año se paga un <b>impuesto</b> destinado sobre todo a quien más lo necesita.', ['💰 Limosna = dinero para ayudar. ¿A quién? A los más necesitados.'], 'pilares'),
  S('d8', 'doc', 'El <b>ayuno</b> del islam consiste en…', '🌙 No comer durante las horas de sol en el mes de Ramadán', ['🍽️ No comer nada durante todo el año', '🍽️ Comer solo una vez al día en la peregrinación'],
    'Se ayuna <b>durante las horas de sol</b>, durante el mes de <b>Ramadán</b>.', ['🌙 El mes del ayuno tiene nombre propio: Ramadán.'], 'pilares'),
  S('d9', 'doc', 'Viajar a <b>La Meca al menos una vez en la vida</b> es el pilar de…', '🕋 La peregrinación', ['🙏 La oración', '🌙 El ayuno'],
    'Peregrinar a La Meca (si se puede) es el quinto pilar: la <b>peregrinación</b>.', ['🚶 Quien viaja a un lugar sagrado es un peregrino.'], 'pilares'),
  S('d10', 'doc', '¿Tiene sacerdotes la religión islámica?', '🧑‍🏫 No, pero hay ulemas e imames', ['⛪ Sí, los califas', '⛪ Sí, los ulemas son sus sacerdotes'],
    'No hay sacerdotes, pero sí <b>ulemas</b> (explican la doctrina) e <b>imames</b> (guían la oración).', ['🧑‍🏫 En el islam hay «guías», no sacerdotes.'], 'clero'),
  S('d11', 'doc', 'Los <b>ulemas</b> son…', '📚 Los encargados de explicar e interpretar la doctrina', ['🙏 Los que guían la oración', '🏛️ Los gobernadores de provincia'],
    'Los ulemas <b>explican e interpretan</b> la doctrina.', ['📚 Ulemas = sabios que explican.'], 'clero'),
  S('d12', 'doc', 'Los <b>imames</b> son…', '🙏 Las personas que guían la oración', ['📚 Los que interpretan la doctrina', '⚔️ Los soldados del califa'],
    'Los imames <b>guían la oración</b>.', ['🙏 Imam = el que se pone delante para dirigir el rezo.'], 'clero'),
  S('d13', 'doc', '¿Cuál de estas cosas <b>NO</b> es uno de los cinco pilares?', '🏗️ Construir una mezquita en cada ciudad', ['🌙 El ayuno en Ramadán', '💰 La limosna (azaque)'],
    'Los pilares son: profesión de fe, oración, azaque, ayuno y peregrinación.', ['✋ Repasa los 5: P-O-A-A-P.'], 'pilares'),

  // ===== EXPANSIÓN (apartado 2.1) =====
  S('e1', 'exp', '¿En qué año murió <b>Mahoma</b>?', '632', ['661', '711'],
    'Mahoma murió en <b>632</b> y le sucedió Abu-Bakr, el primer califa.', ['⏳ La línea: 632 (Mahoma) → 661 (omeyas) → 711 (Tariq).'], 'expansion'),
  S('e2', 'exp', '¿Quién fue el <b>primer califa</b>?', '👤 Abu-Bakr', ['👤 Alí', '👤 Otmán'],
    'Abu-Bakr, uno de los discípulos de Mahoma, fue el primer califa (632-634).', ['🔑 Fue discípulo de Mahoma y lo sucedió al morir.'], 'expansion'),
  S('e3', 'exp', 'Un <b>califa</b> era…', '👑 El líder de los creyentes, con poder político y religioso', ['🧑‍🏫 Un sacerdote que dirigía la oración', '🛡️ Un soldado mercenario'],
    'El califa reunía <b>poder político y religioso</b> en una sola figura.', ['👑 Califa = sucesor de Mahoma al frente de la comunidad.'], 'expansion'),
  S('e4', 'exp', 'El periodo de 632 a 661 se llama…', '📅 Califato ortodoxo', ['📅 Califato omeya', '📅 Califato abasí'],
    'El <b>califato ortodoxo</b> (632-661) fue el primero.', ['🔢 632 es el primero. Ortodoxo = el primero.'], 'expansion'),
  S('e5', 'exp', '¿Qué territorios conquistaron los <b>primeros califas</b>?', '🗺️ Mesopotamia, Siria, Persia y Egipto', ['🗺️ Hispania, la Galia e Italia', '🗺️ India, China y Japón'],
    'Una expansión fulgurante por <b>Mesopotamia, Siria, Persia y Egipto</b>.', ['🗺️ Mira el mapa verde: Oriente Próximo y Egipto.'], 'expansion'),
  S('e6', 'exp', 'Los primeros califas fueron elegidos entre…', '🤝 Los familiares y seguidores más cercanos al Profeta', ['👨‍👦 Los hijos del califa anterior', '⚔️ Los generales bizantinos'],
    'Se elegían entre los <b>familiares y seguidores cercanos</b> de Mahoma.', ['🤝 Gente de confianza del Profeta.']),
  S('e7', 'exp', 'La <b>fitna</b> o «gran discordia» fue…', '⚡ Una guerra civil dentro del islam', ['⚔️ Una batalla contra los francos', '🌍 Un viaje de peregrinación'],
    'Tras el asesinato de Otmán, la fitna degeneró en <b>guerra civil</b>.', ['⚡ Discordia = pelea entre los propios musulmanes.'], 'fitna'),
  S('e8', 'exp', '¿Quién <b>fundó la dinastía omeya</b> en el año 661?', '👤 Moawiya', ['👤 Alí', '👤 Abderramán III'],
    'Moawiya, gobernador de Siria, se proclamó califa en 661 y fundó la <b>dinastía omeya</b>.', ['🏛️ Era gobernador de Siria y acusó a Alí de la muerte de Otmán.'], 'fitna'),
  S('e9', 'exp', '¿Qué <b>dos corrientes</b> surgieron en el islam?', '🌗 Suníes y chiitas', ['🌗 Mawali y dimmi', '🌗 Omeyas y abasíes'],
    'El islam quedó dividido en <b>suníes y chiitas</b>, y sigue así hoy.', ['🌗 Una sigue la sunna y otra a Alí.'], 'corrientes'),
  S('e10', 'exp', 'Los <b>chiitas</b> creen que el califa debe ser…', '👪 Descendiente de Alí', ['🏛️ Elegido por los gobernadores', '🏰 Un emir de Córdoba'],
    'Para los chiitas el califa debe <b>descender de Alí</b>.', ['👪 Alí era primo de Mahoma.'], 'corrientes'),
  S('e11', 'exp', 'Los <b>suníes</b> son los seguidores de…', '🛣️ La sunna, la tradición', ['👪 Alí y sus descendientes', '💰 Los mercenarios del califa'],
    'Suníes viene de <b>sunna</b>: la tradición.', ['🛣️ Suníes ↔ sunna: ¡suenan igual!'], 'corrientes'),
  S('e12', 'omeya', '¿Desde qué ciudad gobernaban los <b>omeyas</b>?', '🏙️ Damasco', ['🏙️ Bagdad', '🏙️ Córdoba'],
    'Los omeyas gobernaron desde <b>Damasco</b>; los abasíes, desde Bagdad.', ['🔁 Omeyas = Damasco. Abasíes = Bagdad.'], 'omeya'),
  S('e13', 'abasi', '¿Qué dinastía <b>sustituyó a los omeyas</b> y llevó la capital a Bagdad?', '👑 Los abasíes', ['👑 Los califas ortodoxos', '👑 Los visigodos'],
    'Los <b>abasíes</b> sustituyeron a los omeyas (hacia el 750).', ['🔁 Omeyas → abasíes.'], 'abasi'),
  S('e14', 'omeya', 'Con los omeyas, ¿qué lengua pasó a ser <b>oficial</b>?', '🔤 El árabe', ['🔤 El latín', '🔤 El persa'],
    'El <b>árabe</b> se convirtió en la lengua oficial del imperio.', ['🔤 La lengua del Corán.'], 'omeya'),

  // ===== CALIFATO OMEYA (apartado 2.2) =====
  S('o1', 'omeya', '¿Cuándo duró el <b>califato omeya</b>?', '📅 De 661 a 750', ['📅 De 632 a 661', '📅 De 750 a 1258'],
    'El califato omeya fue de <b>661 a 750</b>: empieza con Moawiya y acaba cuando lo sustituyen los abasíes.', ['⏳ Empieza donde acaba el ortodoxo (661).', '🔚 Termina cuando llegan los abasíes: 750.'], 'omeya'),
  S('o2', 'omeya', 'Antes de ser califa, <b>Moawiya</b> era gobernador de…', '📍 Siria', ['📍 Egipto', '📍 Persia'],
    'Era <b>gobernador de Siria</b>; desde allí se proclamó califa en 661.', ['📍 Su capital, Damasco, está en Siria.'], 'omeya'),
  S('o3', 'omeya', 'Con los omeyas, el cargo de califa pasó a ser…', '👨‍👦 Hereditario: pasaba de padres a hijos', ['🗳️ Elegido entre los discípulos del Profeta', '🧑‍🏫 Elegido por los ulemas'],
    'Los omeyas hicieron el califato <b>hereditario</b> (dentro de su familia). Los primeros califas, en cambio, se elegían entre los cercanos a Mahoma.', ['🔁 Con los ortodoxos se elegía. ¿Qué cambió con una dinastía?', '👨‍👦 Dinastía = una misma familia.'], 'omeya'),
  S('o4', 'omeya', '¿Hasta dónde llegó el <b>imperio omeya</b>?', '🗺️ Del norte de África y la península ibérica hasta el valle del Indo', ['🗺️ Solo la península arábiga', '🗺️ Toda Europa, hasta Escandinavia'],
    'Se extendió desde <b>Hispania y el norte de África</b> (oeste) hasta el <b>valle del Indo</b> (este).', ['🗺️ La conquista de Tariq, en 711, fue parte de esta expansión.'], 'omeya'),
  S('o5', 'omeya', 'Cada <b>provincia</b> (valiato) del imperio omeya la gobernaba…', '🏛️ Un valí', ['👑 Un emir independiente', '🙏 Un imam'],
    'Un <b>valí</b> gobernaba cada <b>valiato</b>; al-Ándalus fue uno de ellos.', ['🏛️ Valiato = provincia. El que la gobierna es el…'], 'omeya'),
  S('o6', 'omeya', 'Los omeyas empezaron a acuñar una moneda propia de oro, el…', '🪙 Dinar', ['🪙 Denario', '🪙 Sestercio'],
    'El <b>dinar</b> era la moneda de oro (el dirham, de plata, iba junto a él).', ['🪙 Es una de las dos monedas que ya conoces: dinar y dirham.'], 'omeya'),
  S('o7', 'omeya', '¿Qué dinastía levantó la <b>Cúpula de la Roca</b> (Jerusalén) y la <b>Gran Mezquita de Damasco</b>?', '👑 Los omeyas', ['👑 Los abasíes', '👑 Los visigodos'],
    'Son obras de los <b>omeyas</b>, que gobernaban desde Damasco.', ['🏙️ Una de ellas está en Damasco, su capital.'], 'omeya'),
  S('o8', 'omeya', '¿Por qué cayeron los omeyas?', '😠 Muchos musulmanes, como los mawali, apoyaron a los abasíes', ['⚔️ Los derrotó Carlos Martel en Poitiers', '🏰 Los conquistaron los visigodos'],
    'Muchos grupos, sobre todo los <b>mawali</b>, estaban descontentos y respaldaron a los <b>abasíes</b>, que los derrocaron en 750.', ['😠 Los mawali eran musulmanes «de segunda categoría».'], 'omeya'),
  S('o9', 'omeya', '¿Qué hicieron los abasíes con la familia omeya en 750?', '⚔️ Acabaron con casi toda ella; solo escaparon unos pocos', ['🤝 Compartieron el poder con ella', '🏝️ La desterraron a La Meca'],
    'Casi toda la familia omeya fue asesinada. Uno de los que escaparon fue <b>Abderramán I</b>, que llegó a al-Ándalus.', ['⚰️ ¿Quién llegó a al-Ándalus en 756 tras el asesinato de los omeyas?'], 'omeya'),
  S('o10', 'omeya', '¿Cuál es el <b>orden correcto</b> de los califatos?', '📅 Ortodoxo → omeya → abasí', ['📅 Omeya → ortodoxo → abasí', '📅 Abasí → ortodoxo → omeya'],
    'Ortodoxo (632-661) → omeya (661-750) → abasí (desde 750).', ['🔢 632 → 661 → 750: del más antiguo al más reciente.'], 'omeya'),

  // ===== CALIFATO ABASÍ (apartado 2.3) =====
  S('b1', 'abasi', '¿Quién derrocó a los omeyas en 750 y fundó el <b>califato abasí</b>?', '👤 Abu-l-Abbás al-Saffah', ['👤 Moawiya', '👤 Abderramán I'],
    '<b>Abu-l-Abbás al-Saffah</b> fundó la dinastía abasí.', ['🔁 Moawiya era omeya, no abasí. Abderramán I huyó de los abasíes.'], 'abasi'),
  S('b2', 'abasi', 'Bagdad, la capital abasí, está situada junto al río…', '🌊 Tigris', ['🌊 Nilo', '🌊 Guadalquivir'],
    'Bagdad está junto al <b>Tigris</b>, en Mesopotamia (hoy Irak).', ['🗺️ Mesopotamia significa «entre ríos»: Tigris y Éufrates.'], 'abasi'),
  S('b3', 'abasi', 'Con los abasíes, ¿qué pueblo ganó mucha influencia en la corte y la administración?', '🌍 Los persas', ['🌍 Los visigodos', '🌍 Los francos'],
    'Los <b>persas</b> (musulmanes no árabes) tuvieron gran peso en la administración abasí.', ['🕌 Eran mawali: musulmanes que no eran árabes.'], 'abasi'),
  S('b4', 'abasi', 'El <b>visir</b> era…', '🧑‍💼 El ministro principal, mano derecha del califa', ['🙏 El que guiaba la oración', '🏛️ El gobernador de una provincia'],
    'El <b>visir</b> era el ministro principal: el califa delegaba en él buena parte del gobierno.', ['🧑‍💼 Piensa en un «primer ministro» del califa.'], 'abasi'),
  S('b5', 'abasi', 'La <b>Casa de la Sabiduría</b> de Bagdad fue…', '📚 Un centro de estudio y traducción de obras científicas y filosóficas', ['🏯 Una fortaleza del ejército', '🛍️ El mercado principal'],
    'Allí se estudiaba y se <b>traducían al árabe</b> obras de otras culturas, como la griega.', ['📚 Sabiduría = conocimiento, libros.'], 'abasi'),
  S('b6', 'abasi', 'Bajo los abasíes, Bagdad se convirtió en…', '🌟 Una de las ciudades más ricas y cultas del mundo', ['🏚️ Una aldea de pastores', '⚔️ Una simple fortaleza militar'],
    'Bagdad fue un gran centro de <b>comercio, ciencia y cultura</b>.', ['🌟 Fue la época dorada del califato de Oriente.'], 'abasi'),
  S('b7', 'abasi', '¿Quién fue <b>Harún al-Raschid</b>?', '👑 Un califa abasí de Bagdad, de la época de mayor esplendor', ['👑 El último califa omeya', '👑 El primer emir de Córdoba'],
    'Gobernó de <b>786 a 809</b> desde Bagdad.', ['🏙️ Gobernó desde Bagdad, no desde Damasco.'], 'abasi'),
  S('b8', 'abasi', 'Con el paso del tiempo, el imperio abasí…', '🧩 Se fue fragmentando en territorios independientes', ['🌍 Conquistó toda Europa', '🤝 Se unió al reino visigodo'],
    'Al-Ándalus fue de los primeros en separarse (756): el <b>emirato independiente de Córdoba</b>.', ['🏰 ¿Qué creó Abderramán I en 756?'], 'abasi'),
  S('b9', 'abasi', '¿Cómo acabó el califato abasí de Bagdad?', '⚔️ Los mongoles tomaron Bagdad en 1258', ['⚔️ Lo derrotó Carlos Martel en Poitiers (732)', '⚔️ Lo sustituyeron las taifas en 1031'],
    'En <b>1258</b> los mongoles tomaron Bagdad. Poitiers (732) y las taifas (1031) son otros hechos.', ['⏳ Ocurrió mucho después de la caída del califato de Córdoba.'], 'abasi'),
  S('b10', 'abasi', '¿Qué pareja es correcta?', '🏙️ Omeyas → Damasco · abasíes → Bagdad', ['🏙️ Omeyas → Bagdad · abasíes → Damasco', '🏙️ Omeyas → Córdoba · abasíes → Damasco'],
    'Omeyas: <b>Damasco</b>. Abasíes: <b>Bagdad</b>.', ['🔁 Primero van los omeyas, luego los abasíes (750).'], 'abasi'),

  // ===== SOCIEDAD (apartado 3.2) =====
  S('s1', 'soc', 'La <b>comunidad de creyentes</b> del islam se llama…', '🌍 Umma', ['🌍 Jassa', '🌍 Mawali'],
    'La <b>umma</b> agrupa a todos los creyentes.', ['🌍 Es una palabra corta que empieza por U.'], 'sociedad'),
  S('s2', 'soc', 'La <b>jassa</b> era…', '👑 La pequeña aristocracia árabe y siria, dueña de grandes tierras', ['🕌 Los musulmanes no árabes', '✝️ Los cristianos y judíos'],
    'La <b>jassa</b> era la clase más alta: árabe y siria, latifundista.', ['⬆️ Es la parte de arriba de la sociedad.'], 'sociedad'),
  S('s3', 'soc', 'Los <b>mawali</b> eran…', '🕌 Musulmanes no árabes, de segunda categoría', ['✝️ Cristianos y judíos', '⛓️ Esclavos de guerra'],
    'Eran <b>musulmanes que no eran árabes</b>.', ['🔗 Mawali = musulmanes no árabes.'], 'sociedad'),
  S('s4', 'soc', '¿Qué cambió con los <b>abasíes</b> respecto a los mawali?', '⚖️ Desapareció la diferencia entre árabes y no árabes', ['⛓️ Los mawali se convirtieron en esclavos', '🚪 Los mawali fueron expulsados'],
    'Con los abasíes <b>esa diferencia desapareció</b>.', ['👑 Abasíes = más igualdad entre musulmanes.'], 'sociedad'),
  S('s5', 'soc', 'Los <b>dimmi</b> o «gentes del libro» eran…', '✝️ Cristianos y judíos', ['👑 Árabes ricos', '🛡️ Los mercenarios del califa'],
    'Los <b>dimmi</b> eran cristianos y judíos.', ['📖 «Gentes del libro»: tienen libros sagrados (Biblia, Torá).'], 'tributos'),
  S('s6', 'soc', '¿Qué podían hacer los dimmi <b>a cambio de pagar</b> el jarach y la yizya?', '✝️ Practicar su religión y conservar su forma de vida', ['👑 Ser califas', '🏛️ Ocupar los cargos de gobernador'],
    'Podían <b>practicar su religión</b>, pero con menos derechos.', ['💸 Pagaban impuestos para poder seguir con su religión.'], 'tributos'),
  S('s7', 'soc', 'La <b>mayoría de la población</b> (mawali y dimmi) se dedicaba a…', '🌾 La agricultura, la ganadería, el comercio y la artesanía', ['⚔️ Solo a la guerra', '🏛️ A gobernar provincias'],
    'Eran la masa social que <b>trabajaba</b>: campo, ganado, comercio y artesanía.', ['🌾 Eran la gente trabajadora.']),
  S('s8', 'soc', 'La <b>aparcería</b> consistía en…', '🌾 Trabajar la parcela de otro y repartir la cosecha', ['💸 Pagar un impuesto a La Meca', '⛓️ Alquilar esclavos al califa'],
    'El aparcero trabajaba una <b>parcela ajena</b> y se repartía la cosecha.', ['🌾 Aparcero = trabaja la tierra de otro y se reparte el fruto.']),
  S('s9', 'soc', '¿Cómo se podía llegar a ser <b>persona esclavizada</b>?', '⛓️ Por deudas, por ser prisionero de guerra o por descender de esclavos', ['🌙 Por no hacer el ayuno de Ramadán', '🏙️ Por nacer fuera de La Meca'],
    'Por <b>deudas impagadas</b>, <b>prisionero de guerra</b> o <b>descendiente de esclavos</b>.', ['⛓️ Eran tres causas: deudas, guerra y herencia.'], 'esclavos'),
  S('s10', 'soc', '¿Quién estaba en la <b>base</b> de la sociedad?', '⛓️ Las personas esclavizadas', ['👑 La jassa', '🕌 Los mawali'],
    'En la base estaban las personas <b>esclavizadas</b>.', ['⬇️ La base es lo de más abajo.'], 'esclavos'),
  S('s11', 'soc', 'Los dimmi pagaban…', '💸 El jarach y la yizya', ['💸 El azaque y el diezmo', '💸 El dinar y el dirham'],
    'Pagaban el <b>jarach</b> y la <b>yizya</b>. Dinar y dirham son monedas, no impuestos.', ['💸 Dos impuestos con nombres raros: jarach y yizya.'], 'tributos'),

  // ===== CONQUISTA (apartado 4.1) =====
  S('c1', 'con', '¿En qué año <b>desembarcó Tariq</b> en Gibraltar?', '711', ['732', '756'],
    'Tariq desembarcó en <b>711</b>.', ['⏳ Tariq 711 → Poitiers 732 → emirato 756.'], 'conquista'),
  S('c2', 'con', 'Tariq era gobernador musulmán de…', '🏙️ Tánger', ['🏙️ Damasco', '🏙️ Toledo'],
    'Era gobernador de <b>Tánger</b>, en el actual Marruecos.', ['🌍 Salió del norte de África.'], 'conquista'),
  S('c3', 'con', 'Mientras llegaban los musulmanes, en el reino visigodo había…', '⚔️ Una guerra civil por el trono (Rodrigo contra Agila II)', ['⚔️ Una guerra contra los francos', '⚔️ Una revuelta de los mozárabes'],
    'Los visigodos estaban <b>divididos</b>: Rodrigo y Agila II se disputaban el trono.', ['😵 Estaban peleados entre ellos.'], 'conquista'),
  S('c4', 'con', '¿A quién <b>derrotó</b> Tariq?', '👑 Al rey visigodo Rodrigo', ['🛡️ A Carlos Martel', '🏙️ A Teodomiro'],
    'Derrotó al <b>rey Rodrigo</b>.', ['👑 El rey de los visigodos.'], 'conquista'),
  S('c5', 'con', '¿Quién <b>reforzó a Tariq</b> con nuevas tropas?', '👤 Musa ibn Nusayr, valí del norte de África', ['👤 Abderramán I', '👤 Almanzor'],
    'Musa ibn Nusayr, <b>valí del norte de África</b>.', ['🌍 También venía de África.'], 'conquista'),
  S('c6', 'con', '¿De dónde procedían los soldados de Tariq?', '🌍 Del norte de África (el Magreb)', ['🌍 De Damasco', '🌍 De Francia'],
    'Eran <b>bereberes</b> del norte de África.', ['🌍 Desembarcaron en Gibraltar viniendo del sur.'], 'convivencia'),
  S('c7', 'con', '¿Cuánto duró la <b>conquista sistemática</b> del reino de Toledo?', '⏱️ Más de una década', ['⏱️ Una semana', '⏱️ Más de un siglo'],
    'Se prolongó <b>más de una década</b>.', ['⏱️ Ni muy rápido ni eterno: unos diez años.']),
  S('c8', 'con', 'Los <b>pactos de rendición</b> eran…', '🤝 Acuerdos: respetaban bienes y creencias si la población se rendía', ['⚔️ Batallas en campo abierto', '💸 Impuestos para el ejército'],
    'Respetaban <b>bienes y creencias</b> si la población <b>se rendía</b>.', ['🤝 Te rindes y no te hago daño.'], 'pactos'),
  S('c9', 'con', '¿Por qué interesaban más los <b>acuerdos</b> que el enfrentamiento?', '👥 Porque tenían pocos soldados frente a una población mucho más numerosa', ['🤷 Porque no sabían luchar', '📜 Porque el califa lo prohibía'],
    'Su ejército era <b>reducido</b> frente a la población local.', ['👥 Eran pocos; era más fácil pactar.'], 'pactos'),
  S('c10', 'con', '¿Por qué mucha gente veía con <b>indiferencia</b> el fin del dominio visigodo?', '😞 Por las desigualdades que sufrían', ['🕌 Porque ya eran musulmanes', '🛡️ Porque no había ejército'],
    'Muchas capas sociales sufrían <b>desigualdades</b>; algunos (esclavos y judíos) incluso salieron ganando.', ['😞 Si te trataban mal, no te importaba que cayera el rey.'], 'pactos'),
  S('c11', 'con', 'En el <b>acuerdo de Teodomiro</b> (713), el gobernador visigodo…', '🤝 Se sometió, pagó la yizya y el jarach y conservó creencias y posesiones', ['⚔️ Derrotó a Musa en Murcia', '👑 Se convirtió en califa'],
    'Teodomiro se <b>sometió</b> y a cambio <b>conservó</b> sus creencias, autoridad y posesiones.', ['🤝 Es un ejemplo de acuerdo de sumisión.'], 'pactos'),
  S('c12', 'con', 'Teodomiro gobernaba la zona de…', '📍 Murcia y Alicante', ['📍 Toledo y Mérida', '📍 Sevilla y Granada'],
    'Gobernaba entre <b>Murcia y Alicante</b>.', ['📍 Es el sureste de la península.']),

  // ===== AL-ÁNDALUS (apartado 4.2) =====
  S('a1', 'and', '<b>Al-Ándalus</b> fue el nombre con el que los musulmanes llamaron…', '🗺️ A la península ibérica', ['🗺️ Al norte de África', '🏙️ A la ciudad de Córdoba'],
    'Era el nombre de la <b>península ibérica</b> musulmana.', ['🗺️ Lo que hoy es España y Portugal.'], 'emirato'),
  S('a2', 'and', 'Tras la conquista, al-Ándalus pasó a ser…', '🏛️ Un valiato o provincia del califato omeya', ['👑 Un reino independiente', '🏰 Un califato abasí'],
    'Al principio fue un <b>valiato</b> del califato omeya.', ['🏛️ Primero dependía de Damasco.'], 'emirato'),
  S('a3', 'and', 'En 732 los musulmanes fueron derrotados en la batalla de…', '⚔️ Poitiers, por Carlos Martel', ['⚔️ Toledo, por Rodrigo', '⚔️ Córdoba, por Almanzor'],
    'En <b>Poitiers</b> (732), el franco Carlos Martel derrotó al gobernador Al-Gafiqi.', ['⚔️ Está en Francia: el reino franco.'], 'conquista'),
  S('a4', 'and', '¿Quién llegó a al-Ándalus en <b>756</b> tras el asesinato de los omeyas?', '👤 Abderramán I', ['👤 Abderramán III', '👤 Almanzor'],
    '<b>Abderramán I</b> escapó de los abasíes y se hizo con el poder.', ['1️⃣ El uno es el primero: 756.'], 'emirato'),
  S('a5', 'and', 'Abderramán I proclamó el emirato…', '🏰 Independiente de Córdoba', ['🏰 Dependiente de Bagdad', '🏰 De Toledo'],
    'El <b>emirato independiente de Córdoba</b>, aunque reconocía la autoridad religiosa del califa abasí.', ['🏰 Mandaba él, pero rezaba mirando a Bagdad.'], 'emirato'),
  S('a6', 'and', 'Un <b>emir</b> es…', '👑 Un gobernante con el poder político, como un rey', ['🙏 El líder religioso', '🛡️ El jefe de los mercenarios'],
    'El emir tiene el <b>poder político</b>.', ['👑 Emir ≈ rey (pero reconocía al califa en lo religioso).'], 'emirato'),
  S('a7', 'and', '¿Cómo se llamaban las <b>provincias</b> de al-Ándalus?', '🗺️ Coras', ['🗺️ Taifas', '🗺️ Alquerías'],
    'Las provincias eran las <b>coras</b>.', ['🗺️ Cora = provincia.'], 'emirato'),
  S('a8', 'and', 'La <b>islamización</b> fue…', '🕌 Que la población adoptó la religión islámica', ['🔤 Que la población aprendió la lengua árabe', '🌍 Que se marchó al norte de África'],
    'Islamización = <b>religión</b>. Arabización = <b>cultura y lengua</b>.', ['🕌 «Islam»-ización: se hace musulmana.'], 'emirato'),
  S('a9', 'and', 'En <b>912</b> Abderramán III…', '👑 Se proclamó califa tras sofocar la rebelión de Ibn Jafsún', ['⚔️ Fue derrotado en Poitiers', '🏰 Conquistó Toledo'],
    'Se proclamó <b>califa</b>: poder totalmente independiente.', ['👑 Pasó de emir a califa.'], 'califato'),
  S('a10', 'and', 'Con el califato de Córdoba, al-Ándalus alcanzó…', '🌟 Su mayor esplendor político y cultural', ['📉 Su desaparición', '🏛️ Su dependencia de Bagdad'],
    'Fue el <b>mayor esplendor</b>: sistema fiscal eficaz y fortalezas en las marcas.', ['🌟 Es la época dorada.'], 'califato'),
  S('a11', 'and', 'El ejército califal estaba formado sobre todo por…', '🛡️ Mercenarios, entre ellos bereberes y esclavos', ['🛡️ Voluntarios mozárabes', '🛡️ Solo cristianos del norte'],
    'Un poderoso <b>ejército de mercenarios</b> (bereberes y esclavos).', ['💰 Soldados a sueldo.'], 'califato'),
  S('a12', 'and', '¿Quién fue <b>Almanzor</b>?', '⚔️ Un caudillo militar que asumió el gobierno con Hisham II', ['👑 El primer emir independiente', '👑 El último rey visigodo'],
    'Almanzor fue el <b>caudillo militar</b> que gobernó de hecho con el califa Hisham II.', ['⚔️ Era un militar con mucho poder.'], 'califato'),
  S('a13', 'and', '¿Qué ocurrió en <b>1031</b>?', '💥 Desapareció el califato de Córdoba', ['⛵ Tariq desembarcó en Gibraltar', '⚰️ Murió Almanzor'],
    'En 1031 el califato desapareció y lo sustituyeron las <b>taifas</b>.', ['💥 Es el año del final.'], 'califato'),
  S('a14', 'and', 'Las <b>taifas</b> fueron…', '🏰 Reinos musulmanes que sustituyeron al califato', ['🗺️ Provincias del emirato', '⛪ Reinos cristianos del norte'],
    'Eran <b>reinos musulmanes</b> independientes.', ['🏰 Un califato roto en trocitos.'], 'califato'),
  S('a15', 'and', 'Las <b>marcas</b> eran…', '🏯 Coras de la frontera con grandes fortalezas', ['🛍️ Mercados de Córdoba', '🏛️ Barrios de Medina Azahara'],
    'Eran <b>coras fronterizas</b> protegidas con fortalezas.', ['🏯 Marca = frontera.'], 'califato'),

  // ===== CONVIVENCIA (apartado 4.3) =====
  S('v1', 'conv', 'Tariq y su ejército eran principalmente…', '🌍 Bereberes, población del norte de África', ['🕌 Árabes de Damasco', '👑 Visigodos'],
    'La mayoría eran <b>bereberes</b>; los árabes y sirios eran minoría.', ['🌍 Venían del norte de África.'], 'convivencia'),
  S('v2', 'conv', '¿Por qué hubo enfrentamientos entre <b>árabes y bereberes</b>?', '🌾 Por el reparto de tierras y del botín', ['🕌 Por la religión', '🔤 Por el idioma'],
    'Por el <b>reparto de tierras y botín</b>, que fue desigual.', ['💰 Cuando se reparte algo, siempre hay peleas.'], 'convivencia'),
  S('v3', 'conv', 'Los <b>hispanovisigodos</b> eran…', '👥 El grueso (la mayoría) de la población de al-Ándalus', ['🛡️ Los soldados bereberes', '🕌 Una minoría árabe'],
    'Eran la <b>mayoría</b> de la población.', ['👥 Ya vivían allí antes de la conquista.'], 'convivencia'),
  S('v4', 'conv', 'Los <b>muladíes</b> eran…', '🕌 Hispanovisigodos convertidos al islam', ['✝️ Cristianos arabizados', '✡️ Judíos'],
    'Los <b>muladíes</b> se habían <b>convertido al islam</b>.', ['🔁 Mu-ladí = se «mudó» de religión.'], 'muladies'),
  S('v5', 'conv', 'Los <b>mozárabes</b> eran…', '✝️ Cristianos que asimilaron la cultura árabe', ['🕌 Visigodos convertidos al islam', '🌍 Bereberes del Magreb'],
    'Los <b>mozárabes</b> seguían siendo cristianos pero adoptaron la cultura árabe.', ['⛪ Mo-zárabe = Montado en el cristianismo.'], 'muladies'),
  S('v6', 'conv', '¿Dónde estaban las comunidades <b>mozárabes</b> más importantes?', '📍 Sevilla, Toledo y Mérida', ['📍 Zaragoza, León y Burgos', '📍 Granada, Almería y Málaga'],
    'Sevilla, Toledo y Mérida.', ['📍 Tres ciudades con pasado visigodo.']),
  S('v7', 'conv', 'Los <b>Banú Qasi</b> eran…', '🏰 Una familia noble visigoda convertida al islam, del valle del Ebro', ['👑 Califas abasíes de Bagdad', '⚔️ Un ejército franco'],
    'Nobleza visigoda conversa que dominó el <b>valle del Ebro</b>.', ['🌊 Dominaron la zona del río Ebro.'], 'muladies'),
  S('v8', 'conv', '<b>Ibn Jafsún</b> fue…', '🏰 Un muladí que encabezó una rebelión desde Bobastro', ['👑 Un califa cordobés', '⛪ Un mozárabe de Toledo'],
    'Rebelde <b>muladí</b> de finales del siglo IX (880-912). Puso en jaque al emirato.', ['🔥 Fue el rebelde al que venció Abderramán III.'], 'muladies'),
  S('v9', 'conv', 'Los muladíes humildes protestaban porque…', '💸 A pesar de convertirse, seguían pagando impuestos', ['🚫 No les dejaban rezar', '👑 Querían un califa'],
    'Pese a su conversión, <b>seguían pagando impuestos</b>.', ['💸 Se convirtieron pensando que pagarían menos.'], 'muladies'),
  S('v10', 'conv', 'Los judíos y cristianos de al-Ándalus asimilaron la cultura…', '🔤 Árabe', ['🔤 Franca', '🔤 Bizantina'],
    'Asimilaron la <b>cultura árabe</b>.', ['🔤 Hablaban árabe.'], 'convivencia'),

  // ===== ECONOMÍA (apartado 4.4) =====
  S('f1', 'eco', '¿Qué <b>monedas</b> usaba el sistema monetario andalusí?', '🪙 El dinar y el dirham', ['🪙 El denario y el sestercio', '🪙 El real y el maravedí'],
    'El <b>dinar y el dirham</b>.', ['🪙 Dos nombres árabes que empiezan por D.'], 'economia'),
  S('f2', 'eco', 'El esplendor del califato se basó en…', '💰 Comercio a larga distancia, impuestos, artesanía y regadío', ['⛏️ Solo en la ganadería', '⚔️ Solo en el botín de guerra'],
    '<b>Comercio, sistema tributario, artesanía y agricultura de regadío</b>.', ['💰 Era una economía variada.'], 'economia'),
  S('f3', 'eco', 'En época andalusí, <b>Córdoba</b> se llamaba…', '🏙️ Kurduba', ['🏙️ Ishbilia', '🏙️ Tulaitula'],
    'Kurduba. Fue la capital.', ['🏙️ Kurduba ≈ Córdoba: suenan parecido.'], 'ciudades'),
  S('f4', 'eco', '¿Cuántos habitantes llegó a tener <b>Córdoba</b>?', '👥 Más de 200 000', ['👥 Unos 20 000', '👥 Más de 2 millones'],
    'Más de <b>200 000</b>: la mayor ciudad de Europa occidental.', ['👥 Muchos para la época, pero no millones.'], 'ciudades'),
  S('f5', 'eco', '¿Qué ciudad fue <b>fundada</b> por los musulmanes (no existía antes)?', '🏙️ Mursiya (Murcia)', ['🏙️ Ishbilia (Sevilla)', '🏙️ Tulaitula (Toledo)'],
    'Murcia era <b>nueva</b>. Las demás eran de origen romano.', ['🏙️ Las otras ya existían en época romana.'], 'ciudades'),
  S('f6', 'eco', 'Los <b>zocos</b> eran…', '🛍️ Los mercados, ámbito de intercambios comerciales', ['🏯 Fortalezas de la frontera', '🌾 Aldeas del campo'],
    'Los <b>mercados</b> de las ciudades.', ['🛍️ Zoco = mercado.'], 'economia'),
  S('f7', 'eco', 'Las <b>medinas</b> albergaban…', '🔨 Talleres artesanales', ['🐑 Ganado', '🏯 Fortalezas'],
    'Las medinas tenían <b>talleres artesanales</b>.', ['🔨 Artesanos trabajando.'], 'economia'),
  S('f8', 'eco', 'Las artesanías andalusíes más famosas fueron…', '🧵 La seda, el cuero (marroquinería) y la cerámica', ['🪵 La madera, el hierro y el papel', '🧶 La lana, el oro y el vidrio'],
    'Seda, cuero y cerámica, de ciudades como Valencia, Toledo y Córdoba.', ['🧵 Seda, cuero y cerámica.'], 'economia'),
  S('f9', 'eco', 'Las zonas más dinámicas del campo fueron…', '🌾 Las llanuras y vegas fluviales, con regadío', ['⛰️ Las montañas', '🏜️ El desierto'],
    'Las <b>llanuras y vegas</b>, por el regadío.', ['💧 Donde había agua cerca.'], 'campo'),
  S('f10', 'eco', 'Las huertas famosas por el regadío eran la murciana, la valenciana y la del valle del…', '🌊 Ebro', ['🌊 Duero', '🌊 Tajo'],
    'La del valle del <b>Ebro</b>.', ['🌊 Es el río de Zaragoza.'], 'campo'),
  S('f11', 'eco', '¿Qué eran las <b>alquerías</b>?', '🏡 Pequeñas aldeas de zonas montañosas', ['🏛️ Grandes palacios', '🛍️ Mercados urbanos'],
    'Eran <b>pequeñas aldeas</b>.', ['🏡 Aldeas pequeñas del campo.'], 'campo'),
  S('f12', 'eco', 'En los territorios de montaña, el resto de la tierra se dedicaba a…', '🐑 Pastos para ganado ovino y caprino', ['🌾 Huertas de regadío', '🛍️ Zocos'],
    'A <b>pastos</b> para ovejas y cabras.', ['🐑 Ovino = ovejas; caprino = cabras.'], 'campo'),
  S('f13', 'eco', '<b>Medina Azahara</b> fue…', '🏛️ Una ciudad palaciega mandada construir por Abderramán III', ['🏯 Una fortaleza de Almanzor en Toledo', '⛪ Una iglesia mozárabe'],
    'Ciudad palaciega a las afueras de Córdoba.', ['🏛️ Ciudad-palacio de un califa.'], 'medina'),
  S('f14', 'eco', '¿Para qué sirvió <b>Medina Azahara</b>?', '👑 Residencia, corte y sede del Gobierno del califa', ['🛡️ Cuartel del ejército', '🛍️ Mercado central'],
    'Residencia, corte y sede de las dependencias administrativas.', ['👑 Allí vivía y gobernaba el califa.'], 'medina'),
];

/* ---------- GENERADORES (preguntas nuevas cada vez) ---------- */
const ROM = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];
const siglo = (y) => Math.floor((y - 1) / 100) + 1;
const lineaTiempo = () => '<div class="ladder" aria-hidden="true">' + EVENTOS.map((e) => `<div class="step path"><span>${e.y}</span><em>${e.c}</em></div>`).join('') + '</div>';

function genAnio(nivel) {
  const e = pick(EVENTOS);
  const otros = EVENTOS.filter((x) => x !== e);
  let malos;
  if (nivel === 1) malos = sacar(otros, 2).map((x) => x.y);
  else {
    const cerca = otros.sort((a, b) => Math.abs(a.y - e.y) - Math.abs(b.y - e.y)).slice(0, 4);
    malos = sacar(cerca, 2).map((x) => x.y);
  }
  return {
    id: 'gen:anio', p: 'crono', pil: 'fechas',
    t: `¿En qué año ${e.q}?`,
    ok: String(e.y), no: malos.map(String),
    ex: `${e.c} → <b>${e.y}</b>.`,
    tr: ['🧠 Recuerda la línea del tiempo:' + lineaTiempo(), `🔎 Busca «${e.c}» y fíjate en su año.`],
  };
}

function genOrden(nivel) {
  const sep = nivel === 1 ? 40 : nivel === 2 ? 15 : 1;
  let tres, intentos = 0;
  do { tres = sacar(EVENTOS, 3); intentos++; }
  while (intentos < 40 && tres.some((a, i) => tres.some((b, j) => i < j && Math.abs(a.y - b.y) < sep)));
  const primero = nivel < 3 ? Math.random() < 0.6 : Math.random() < 0.5;
  const ord = tres.slice().sort((a, b) => a.y - b.y);
  const bien = primero ? ord[0] : ord[2];
  const malos = tres.filter((x) => x !== bien);
  return {
    id: 'gen:orden', p: 'crono', pil: 'fechas',
    t: `¿Cuál de estos hechos ocurrió <b>${primero ? 'PRIMERO' : 'el ÚLTIMO'}</b>?`,
    ok: bien.c, no: malos.map((x) => x.c),
    ex: 'Orden: ' + ord.map((x) => `${x.c} (<b>${x.y}</b>)`).join(' → ') + '.',
    tr: ['🧠 Recuerda la línea del tiempo:' + lineaTiempo(), `📏 ${primero ? 'El año más pequeño' : 'El año más grande'} es el ${primero ? 'primero' : 'último'}.`],
  };
}

function genSiglo(nivel) {
  const pool = nivel === 1 ? EVENTOS.filter((e) => [632, 711, 912, 1031].includes(e.y)) : EVENTOS;
  const e = pick(pool);
  const s = siglo(e.y);
  const malos = sacar([s - 2, s - 1, s + 1, s + 2].filter((x) => x >= 5 && x <= 12), 2);
  return {
    id: 'gen:siglo', p: 'crono', pil: 'siglos',
    t: `¿En qué <b>siglo</b> ${e.q}? <span class="small">(año ${e.y})</span>`,
    ok: 'Siglo ' + ROM[s], no: malos.map((x) => 'Siglo ' + ROM[x]),
    ex: `${e.y}: quitas las dos últimas cifras (${Math.floor(e.y / 100)}) y sumas 1 → <b>${s}</b> → siglo <b>${ROM[s]}</b>.`,
    tr: [`✂️ Mira el año ${e.y} y quita las dos últimas cifras: te quedas con <b>${Math.floor(e.y / 100)}</b>.`, '➕ Súmale 1.', `🔤 Pásalo a romanos: V=5, VI=6, VII=7, VIII=8, IX=9, X=10, XI=11.`],
  };
}

function genQuien(nivel) {
  const p = pick(PERSONAS);
  const otras = PERSONAS.filter((x) => x !== p);
  const alReves = Math.random() < 0.5;
  if (!alReves) {
    return {
      id: 'gen:quien', p: 'gente', pil: 'personas',
      t: `¿Quién ${p.d}?`,
      ok: p.n, no: sacar(otras, 2).map((x) => x.n),
      ex: `<b>${p.n}</b> ${p.d}.`,
      tr: [`💡 Pista: ${p.h}`],
    };
  }
  return {
    id: 'gen:quien', p: 'gente', pil: 'personas',
    t: `¿Qué hizo (o qué fue) <b>${p.n}</b>?`,
    ok: mayus(p.d), no: sacar(otras.filter((x) => !x.d.includes(p.n)), 2).map((x) => mayus(x.d)),
    ex: `<b>${p.n}</b> ${p.d}.`,
    tr: [`💡 Pista: ${p.h}`],
  };
}

function distractoresTermino(t, n = 2) {
  const mismos = TERMINOS.filter((x) => x.g === t.g && x !== t);
  const resto = TERMINOS.filter((x) => x.g !== t.g);
  return [...sacar(mismos, n), ...sacar(resto, n)].slice(0, n);
}

function genDefinicion() {
  const t = pick(TERMINOS);
  const malos = distractoresTermino(t);
  return {
    id: 'gen:def', p: 'pal', pil: 'palabras',
    t: `¿Qué significa <b>«${t.t}»</b>?`,
    ok: t.d, no: malos.map((x) => x.d),
    ex: `<b>${t.t}</b>: ${t.d.charAt(0).toLowerCase() + t.d.slice(1)}.`,
    tr: [`📚 Piensa en dónde salía «${t.t}» en el libro (${{ islam: 'el islam y su expansión', gente: 'la sociedad', gobierno: 'el gobierno de al-Ándalus', economia: 'la economía', califatos: 'los califatos omeya y abasí' }[t.g]}).`],
  };
}

function genTermino() {
  const t = pick(TERMINOS);
  const malos = distractoresTermino(t);
  return {
    id: 'gen:term', p: 'pal', pil: 'palabras',
    t: `¿Qué palabra designa ${t.q}?`,
    ok: t.t, no: malos.map((x) => x.t),
    ex: `<b>${t.t}</b>: ${t.d.charAt(0).toLowerCase() + t.d.slice(1)}.`,
    tr: [`📚 Está en el apartado de ${{ islam: 'el islam y su expansión', gente: 'la sociedad', gobierno: 'el gobierno de al-Ándalus', economia: 'la economía', califatos: 'los califatos omeya y abasí' }[t.g]}.`],
  };
}

function genCiudad() {
  const c = pick(CIUDADES);
  const otras = CIUDADES.filter((x) => x !== c);
  const alReves = Math.random() < 0.5;
  return alReves ? {
    id: 'gen:ciudad', p: 'eco', pil: 'ciudades',
    t: `¿Cómo se llamaba <b>${c.m}</b> en época andalusí?`,
    ok: c.a, no: sacar(otras, 2).map((x) => x.a),
    ex: `${c.m} era <b>${c.a}</b> (${c.nota}).`,
    tr: ['🔤 Fíjate en cómo suena: casi siempre se parece al nombre actual.', `💡 Pista: ${c.nota}.`],
  } : {
    id: 'gen:ciudad', p: 'eco', pil: 'ciudades',
    t: `¿Qué ciudad actual era <b>${c.a}</b>?`,
    ok: c.m, no: sacar(otras, 2).map((x) => x.m),
    ex: `${c.a} es hoy <b>${c.m}</b> (${c.nota}).`,
    tr: ['🔤 Lee el nombre en voz alta: suena parecido al actual.', `💡 Pista: ${c.nota}.`],
  };
}

const GENERADORES = {
  doc: [], exp: [], omeya: [], abasi: [], soc: [], con: [], and: [], conv: [],
  eco: [genCiudad],
  crono: [genAnio, genOrden, genSiglo],
  gente: [genQuien],
  pal: [genDefinicion, genTermino],
};

if (typeof module !== 'undefined') module.exports = { PLANETAS, FIJAS, GENERADORES, PIL, EVENTOS, PERSONAS, TERMINOS, CIUDADES };
