/* =========================================================
   MISIÓN FÍSICA Y QUÍMICA · Lógica del juego
   ========================================================= */
(() => {
  const app = document.getElementById('app');
  const LETRAS = ['A', 'B', 'C', 'D'];
  const CFG = window.MATERIA || {};              // cada asignatura define su configuración en su index.html
  const PREFIJO = CFG.prefijo || 'mfyq_';        // separa el progreso de cada asignatura
  const LARGO_MISION = CFG.largo || 8;
  const NOMBRE_COMUN = 'mision_nombre';          // el nombre se pregunta una sola vez

  /* ---------- guardado (si el navegador lo permite) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(PREFIJO + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(PREFIJO + k, JSON.stringify(v)); } catch (e) { /* sin guardado */ } },
  };
  let perfil = store.get('perfil', { nombre: '', estrellas: 0, misiones: 0, fallos: {}, vistas: {}, record: 0 });
  try { if (!perfil.nombre) perfil.nombre = localStorage.getItem(NOMBRE_COMUN) || ''; } catch (e) { /* sin guardado */ }
  const guardar = () => store.set('perfil', perfil);

  /* ---------- utilidades ---------- */
  const barajar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const azar = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const nombre = () => perfil.nombre || 'crack';
  const txt = (s) => s.replace(/<sup>(.*?)<\/sup>/g, ' elevado a $1').replace(/<\/span><span>/g, ' entre ').replace(/<[^>]+>/g, ' ').replace(/·/g, ' por ').replace(/\s+/g, ' ');

  /* ---------- frases de ánimo ---------- */
  const BIEN = ['¡BOOOM! ¡Correcto!', '¡Pleno, {n}!', '¡Eres una máquina!', '¡Clavado!', '¡Así se hace, {n}!', '¡Respuesta de científico!', '¡Directo a la diana!', '¡Imparable!', '¡Genial, {n}!', '¡Nivel PRO!'];
  const RACHA = { 3: '🔥 ¡Racha de 3!', 5: '🔥🔥 ¡Racha de 5! Estás on fire', 8: '🚀 ¡8 seguidas! ¡Misión perfecta!' };
  const CON_TRUCO = ['¡Eso es! El truco funciona 💡', '¡Lo has sacado tú solo con el truco!', '¡Bien hecho! Así se aprende 💪', '¡Ya está! Y ahora no se te olvida'];
  const CASI = ['¡Casi! Vamos a verlo con este truco…', '¡Uy, casi! Te doy una pista…', '¡Muy cerca! Mira este truco…'];

  /* ---------- elegir preguntas ---------- */
  const GEN_POR_ID = {};
  Object.values(GENERADORES).flat().forEach((g) => { GEN_POR_ID[g(1).id] = g; });

  function elegirFija(lista, usadas) {
    const libres = lista.filter((q) => !usadas.has(q.id));
    if (!libres.length) return null;
    const pesos = libres.map((q) => (1 + 3 * (perfil.fallos[q.id] || 0)) / (1 + (perfil.vistas[q.id] || 0)));
    let r = Math.random() * pesos.reduce((a, b) => a + b, 0);
    for (let i = 0; i < libres.length; i++) { r -= pesos[i]; if (r <= 0) return libres[i]; }
    return libres[libres.length - 1];
  }

  function generar(fn, nivel, textos) {
    for (let t = 0; t < 12; t++) { const q = fn(nivel); if (!textos.has(q.t)) return q; }
    return fn(nivel);
  }

  function construirMision(modo) {
    const qs = [], usadas = new Set(), textos = new Set();
    const add = (q) => { if (q) { usadas.add(q.id); textos.add(q.t); qs.push(q); } };

    if (modo === 'repaso') {
      const fallos = Object.entries(perfil.fallos).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
      fallos.forEach(([id], i) => {
        if (qs.length >= LARGO_MISION) return;
        if (GEN_POR_ID[id]) add(generar(GEN_POR_ID[id], Math.min(3, 1 + Math.floor(i / 3)), textos));
        else add(FIJAS.find((q) => q.id === id));
      });
      return qs;
    }

    const n = modo === 'mezcla' ? 10 : LARGO_MISION;
    const planetas = modo === 'mezcla' ? barajar(PLANETAS.filter((p) => p.enMezcla !== false).map((p) => p.id)) : [modo];
    for (let i = 0; i < n; i++) {
      const p = planetas[i % planetas.length];
      const nivel = 1 + Math.floor((i * 3) / n);
      const fijas = FIJAS.filter((q) => q.p === p);
      const gens = GENERADORES[p] || [];
      const usarGen = gens.length && (!fijas.length || (modo === 'mezcla' ? Math.random() < 0.5 : i % 2 === 1));
      let q = usarGen ? null : elegirFija(fijas, usadas);
      if (!q && gens.length) q = generar(azar(gens), nivel, textos);
      add(q);
    }
    return qs;
  }

  /* ---------- estado de la misión ---------- */
  let M = null;

  function empezar(modo) {
    const preguntas = construirMision(modo);
    if (!preguntas.length) return inicio();
    M = { modo, preguntas, i: 0, aLaPrimera: 0, conTruco: 0, racha: 0, mejorRacha: 0, repaso: [], pildoras: new Set() };
    pregunta();
  }

  /* ---------- pantallas ---------- */
  function inicio() {
    hablarParar();
    if (!perfil.nombre) return pedirNombre();
    const hayFallos = Object.values(perfil.fallos).some((n) => n > 0);
    app.innerHTML = `
      <header class="hud">
        <span class="brand">${CFG.marca || 'Misión FyQ'}</span>
        <span class="pill-star" aria-label="${perfil.estrellas} estrellas"><span aria-hidden="true">⭐</span> <b class="num">${perfil.estrellas}</b></span>
      </header>
      <section class="hello">
        <p class="kicker">Hola, ${esc(nombre())} 👋</p>
        <h1>¿A qué planeta viajamos hoy?</h1>
        <p class="sub">Misiones cortas de ${LARGO_MISION} preguntas. Cada acierto a la primera = una estrella.</p>
      </section>
      <nav class="planets">
        ${PLANETAS.map((p, i) => `
          ${p.grupo && p.grupo !== (PLANETAS[i - 1] || {}).grupo ? `<p class="grupo">${p.grupo}</p>` : ''}
          <button class="planet" data-modo="${p.id}">
            <span class="p-emoji" aria-hidden="true">${p.emoji}</span>
            <span class="p-txt"><b>${p.nombre}</b><small>${p.desc}</small></span>
            <span class="go" aria-hidden="true">›</span>
          </button>`).join('')}
        <button class="planet special" data-modo="mezcla">
          <span class="p-emoji" aria-hidden="true">🌌</span>
          <span class="p-txt"><b>Misión galáctica</b><small>10 preguntas de distintos planetas. Como el examen.</small></span>
          <span class="go" aria-hidden="true">›</span>
        </button>
        ${hayFallos ? `
        <button class="planet repaso" data-modo="repaso">
          <span class="p-emoji" aria-hidden="true">🎯</span>
          <span class="p-txt"><b>Misión repaso</b><small>Las que más te han costado. ¡A por ellas!</small></span>
          <span class="go" aria-hidden="true">›</span>
        </button>` : ''}
      </nav>
      <footer class="foot">
        <span>Misiones completadas: <b class="num">${perfil.misiones}</b> · Mejor racha: <b class="num">${perfil.record}</b></span>
        <span class="links">
          ${CFG.resumen ? `<a class="link" href="${CFG.resumen}">📋 Chuleta</a>` : ''}
          <a class="link" href="../">🏠 Otra asignatura</a>
          <button class="link" id="cambiar">Cambiar nombre</button>
        </span>
      </footer>`;
    app.querySelectorAll('.planet').forEach((b) => b.addEventListener('click', () => empezar(b.dataset.modo)));
    document.getElementById('cambiar').addEventListener('click', pedirNombre);
    enfocar();
  }

  function pedirNombre() {
    app.innerHTML = `
      <section class="hello center">
        <div class="big-emoji" aria-hidden="true">👩‍🚀</div>
        <p class="kicker">Soy Nova, tu compañera de entrenamiento</p>
        <h1>¿Cómo te llamas, astronauta?</h1>
        <form id="f" class="name-form">
          <input id="n" maxlength="20" autocomplete="off" placeholder="Tu nombre" value="${esc(perfil.nombre)}" aria-label="Tu nombre">
          <button class="btn primary" type="submit">¡Despegamos!</button>
        </form>
      </section>`;
    const inp = document.getElementById('n');
    inp.focus();
    document.getElementById('f').addEventListener('submit', (e) => {
      e.preventDefault();
      perfil.nombre = inp.value.trim().slice(0, 20) || 'crack';
      try { localStorage.setItem(NOMBRE_COMUN, perfil.nombre); } catch (err) { /* sin guardado */ }
      guardar();
      inicio();
    });
  }

  function pregunta() {
    hablarParar();
    const q = M.preguntas[M.i];
    const opciones = barajar([{ h: q.ok, ok: true }, ...q.no.map((h) => ({ h, ok: false }))]);
    M.actual = { q, opciones, fallos: 0, paso: 0 };
    const mostrarPildora = q.pil && !M.pildoras.has(q.pil);
    if (mostrarPildora) M.pildoras.add(q.pil);
    const planeta = PLANETAS.find((p) => p.id === q.p);
    const progreso = (M.i / M.preguntas.length) * 100;

    app.innerHTML = `
      <header class="hud">
        <button class="icon-btn" id="salir" aria-label="Volver a los planetas">←</button>
        <div class="bar" role="progressbar" aria-valuenow="${M.i}" aria-valuemax="${M.preguntas.length}"><i style="width:${progreso}%"></i></div>
        <span class="pill-star"><span aria-hidden="true">⭐</span> <b class="num">${M.aLaPrimera}</b></span>
      </header>
      <p class="kicker">${planeta ? planeta.emoji + ' ' + planeta.nombre : ''} · Pregunta <span class="num">${M.i + 1}</span> de <span class="num">${M.preguntas.length}</span>${M.racha >= 2 ? ` · <span class="streak">🔥 ${M.racha}</span>` : ''}</p>
      ${mostrarPildora ? `<aside class="pildora"><span class="tag">Mini-píldora</span><p>${PIL[q.pil]}</p></aside>` : ''}
      <section class="question">
        <h2 id="qt">${q.t}</h2>
        <button class="icon-btn speak" id="leer" aria-label="Leer en voz alta" title="Leer en voz alta">🔊</button>
      </section>
      ${q.visual || ''}
      <div class="options" role="group" aria-labelledby="qt">
        ${opciones.map((o, k) => `<button class="opt" data-k="${k}"><span class="letter">${LETRAS[k]}</span><span class="o-txt">${o.h}</span></button>`).join('')}
      </div>
      <div id="fb" aria-live="polite"></div>`;

    app.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => responder(+b.dataset.k)));
    document.getElementById('salir').addEventListener('click', () => { if (confirm('¿Salir de la misión? Perderás el progreso de esta misión.')) inicio(); });
    document.getElementById('leer').addEventListener('click', () => hablar((mostrarPildora ? PIL[q.pil] + '. ' : '') + q.t + '. ' + opciones.map((o, k) => LETRAS[k] + ': ' + o.h).join('. ')));
    enfocar();
  }

  function responder(k) {
    const A = M.actual, o = A.opciones[k], btn = app.querySelector(`.opt[data-k="${k}"]`);
    if (!btn || btn.disabled) return;
    const fb = document.getElementById('fb');
    if (A.fallos === 0) perfil.vistas[A.q.id] = (perfil.vistas[A.q.id] || 0) + 1;

    if (o.ok) {
      app.querySelectorAll('.opt').forEach((b) => (b.disabled = true));
      btn.classList.add('ok');
      const primera = A.fallos === 0;
      if (primera) {
        M.aLaPrimera++; M.racha++; perfil.estrellas++;
        M.mejorRacha = Math.max(M.mejorRacha, M.racha);
        if (perfil.fallos[A.q.id]) perfil.fallos[A.q.id]--;
        confeti();
      } else { M.conTruco++; }
      guardar();
      const titulo = primera ? azar(BIEN).replace('{n}', esc(nombre())) : azar(CON_TRUCO);
      const extraRacha = primera && RACHA[M.racha] ? `<p class="racha">${RACHA[M.racha]}</p>` : '';
      fb.innerHTML = `
        <div class="feedback good">
          <p class="fb-title">${primera ? '⭐ ' : '💡 '}${titulo}</p>
          ${extraRacha}
          <p>${A.q.ex}</p>
          <button class="btn primary" id="sig">${M.i + 1 < M.preguntas.length ? 'Siguiente →' : 'Ver resultado 🏁'}</button>
        </div>`;
      document.getElementById('sig').addEventListener('click', siguiente);
      document.getElementById('sig').focus();
      return;
    }

    // ¡Casi!
    A.fallos++; M.racha = 0;
    btn.disabled = true; btn.classList.add('casi');
    if (A.fallos === 1) {
      perfil.fallos[A.q.id] = (perfil.fallos[A.q.id] || 0) + 1;
      M.repaso.push(A.q);
      guardar();
      fb.innerHTML = `
        <div class="feedback hint">
          <p class="fb-title">🤏 ${azar(CASI)}</p>
          <ol class="steps" id="steps"></ol>
          <button class="btn ghost" id="paso">Siguiente pista 👣</button>
        </div>`;
      document.getElementById('paso').addEventListener('click', mostrarPaso);
      mostrarPaso();
    } else {
      // segundo fallo: se enseña la buena con cariño
      app.querySelectorAll('.opt').forEach((b) => { b.disabled = true; if (A.opciones[+b.dataset.k].ok) b.classList.add('ok'); });
      fb.innerHTML = `
        <div class="feedback hint">
          <p class="fb-title">💛 ¡No pasa nada, ${esc(nombre())}! Esta era difícil.</p>
          <p>La buena es la que brilla en verde. ${A.q.ex}</p>
          <p class="small">La guardo en tu <b>Misión repaso</b> para que la machaques luego. 😉</p>
          <button class="btn primary" id="sig">${M.i + 1 < M.preguntas.length ? 'Siguiente →' : 'Ver resultado 🏁'}</button>
        </div>`;
      document.getElementById('sig').addEventListener('click', siguiente);
      document.getElementById('sig').focus();
    }
  }

  function mostrarPaso() {
    const A = M.actual, lista = document.getElementById('steps'), btn = document.getElementById('paso');
    if (!lista) return;
    if (A.paso < A.q.tr.length) {
      const li = document.createElement('li');
      li.innerHTML = A.q.tr[A.paso++];
      lista.appendChild(li);
    }
    if (A.paso >= A.q.tr.length && btn) {
      btn.outerHTML = '<p class="small try">👆 ¡Ahora vuelve a intentarlo arriba! Tú puedes 💪</p>';
    }
  }

  function siguiente() {
    M.i++;
    if (M.i < M.preguntas.length) pregunta(); else final();
  }

  function final() {
    hablarParar();
    perfil.misiones++;
    perfil.record = Math.max(perfil.record, M.mejorRacha);
    guardar();
    const total = M.preguntas.length, n = M.aLaPrimera, pct = n / total;
    const msg = pct === 1 ? ['🏆', '¡MISIÓN PERFECTA!', 'Todas a la primera. Eres un auténtico científico.']
      : pct >= 0.75 ? ['🚀', '¡Misión cumplida!', 'Vas como un cohete. Un par de repasos y lo bordas.']
      : pct >= 0.5 ? ['🌟', '¡Buen trabajo!', 'Ya dominas más de la mitad. Cada misión te hace más fuerte.']
      : ['💪', '¡Misión completada!', 'Lo importante es entrenar. Repite este planeta y verás cómo subes.'];
    app.innerHTML = `
      <section class="hello center">
        <div class="big-emoji" aria-hidden="true">${msg[0]}</div>
        <p class="kicker">${esc(nombre())}, resultado de la misión</p>
        <h1>${msg[1]}</h1>
        <p class="sub">${msg[2]}</p>
        <div class="score">
          <div><b class="num">${n}</b><span>⭐ a la primera</span></div>
          <div><b class="num">${M.conTruco}</b><span>💡 con truco</span></div>
          <div><b class="num">${M.mejorRacha}</b><span>🔥 mejor racha</span></div>
        </div>
      </section>
      ${M.repaso.length ? `
      <section class="review">
        <h3>Para repasar</h3>
        <ul>${M.repaso.map((q) => `<li><p>${q.t}</p><p class="ans">✅ ${q.ok}</p></li>`).join('')}</ul>
      </section>` : ''}
      <div class="actions">
        <button class="btn primary" id="otra">Otra misión aquí 🔁</button>
        <button class="btn ghost" id="volver">Elegir planeta 🪐</button>
      </div>`;
    if (pct >= 0.75) confeti(40);
    const modo = M.modo;
    document.getElementById('otra').addEventListener('click', () => empezar(modo === 'repaso' && !Object.values(perfil.fallos).some((x) => x > 0) ? 'mezcla' : modo));
    document.getElementById('volver').addEventListener('click', inicio);
    enfocar();
  }

  /* ---------- extras ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function enfocar() { window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }); }

  function confeti(n = 18) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const piezas = ['⭐', '✨', '🌟', '🎉', '🚀'];
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'confetti';
      s.textContent = azar(piezas);
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDelay = Math.random() * 0.3 + 's';
      s.style.fontSize = 16 + Math.random() * 18 + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1800);
    }
  }

  function hablar(texto) {
    if (!('speechSynthesis' in window)) return;
    hablarParar();
    const u = new SpeechSynthesisUtterance(txt(texto));
    u.lang = 'es-ES'; u.rate = 0.95;
    speechSynthesis.speak(u);
  }
  function hablarParar() { try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* nada */ } }

  // Atajos de teclado: 1/2/3 o A/B/C para responder, Enter para seguir
  document.addEventListener('keydown', (e) => {
    if (!M || e.target.tagName === 'INPUT') return;
    const k = { '1': 0, '2': 1, '3': 2, a: 0, b: 1, c: 2 }[e.key.toLowerCase()];
    if (k !== undefined && app.querySelector('.opt')) responder(k);
  });

  inicio();
})();
