# 🚀 Misión 2º ESO

Entrenador interactivo para preparar exámenes, pensado para chavales con TDA: preguntas cortas de una en una, mini-píldoras de teoría, estrellas, rachas y un **«¡Casi!»** con pista paso a paso cuando se falla.

Es una web estática (sin servidor, sin cuentas). El progreso se guarda en el propio navegador de cada dispositivo.

## Asignaturas

| Carpeta | Contenido |
|---|---|
| `fyq/` | **Física y Química**: laboratorio, método científico, unidades, escalera y factores de conversión, notación científica, errores y gráficas. |
| `historia/` | **Historia, tema 3**: el islam, los califatos (ortodoxo, omeya y abasí), la sociedad islámica y al-Ándalus (con chuleta en `historia/resumen.html`). |
| `shared/` | El motor del juego (`app.js`) y los estilos (`styles.css`), comunes a las dos. |
| `index.html` | Portada para elegir asignatura. |

Cada asignatura guarda su propio progreso (`mfyq_…` y `mhist_…`). El nombre se pregunta una sola vez.

## Cómo funciona cada misión

- Misiones de 8 preguntas. Dentro de cada una la dificultad sube poco a poco.
- Cada vez que se estrena un tema sale antes una mini-píldora de teoría.
- Preguntas **fijas** (se eligen al azar; las que se fallan salen más) y **generadores** que inventan ejercicios nuevos cada vez (conversiones, fechas, siglos, vocabulario…).
- **Misión galáctica**: 10 preguntas mezcladas, como un examen. **Misión repaso**: aparece sola cuando hay fallos.
- Botón 🔊 para que lea la pregunta en voz alta.

## Probarlo en local

Abre `index.html` con doble clic. (O `python -m http.server` en esta carpeta y entra en `http://localhost:8000`.)

## Publicarlo gratis

**GitHub Pages**: en el repositorio → *Settings → Pages* → *Deploy from a branch* → rama `main`, carpeta `/(root)` → *Save*. En un minuto estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

**Vercel**: *Add New → Project* → importa el repositorio → *Framework Preset: Other* → *Deploy*.

> Ojo: ahora la portada está en la raíz. Física y Química está en `…/fyq/` e Historia en `…/historia/`.

## Añadir o cambiar preguntas

Todo está en el `preguntas.js` de cada asignatura. Para añadir una pregunta fija, copia una línea `S(...)`:

```js
S('id-unico', 'planeta', 'Pregunta', 'Respuesta buena', ['Mala 1', 'Mala 2'],
  'Explicación cuando acierta', ['Pista 1', 'Pista 2'], 'clave-de-píldora (opcional)'),
```

Los planetas están al principio del archivo. Un planeta con `enMezcla: false` no entra en la misión galáctica (pero sigue disponible como planeta). El apartado 3.3 (Mujeres) se quitó de Historia porque no entra en el examen; está en el historial de git por si hiciera falta.

## Añadir otra asignatura

1. Copia `historia/` con otro nombre y cambia `preguntas.js`.
2. En su `index.html` cambia `window.MATERIA` (`prefijo` único, `marca`).
3. Añade una tarjeta en el `index.html` de la raíz.
