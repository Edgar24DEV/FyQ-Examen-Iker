# 🚀 Misión Física y Química (2º ESO)

Entrenador interactivo para el examen de Física y Química, pensado para chavales con TDA: preguntas cortas de una en una, mini-píldoras de teoría, estrellas, rachas y un **"¡Casi!"** con truco paso a paso cuando se falla.

## Qué incluye

- **6 planetas**: Laboratorio · Detective (método científico) · Unidades (SI y kelvin) · Escalera (cambios de unidades y factores) · Gigante (notación científica y redondeo) · Medidas (errores y gráficas).
- **Misión galáctica**: 10 preguntas mezcladas de todo el temario, como un examen.
- **Misión repaso**: aparece sola cuando hay fallos y prioriza lo que más cuesta.
- **Nunca salen iguales**: 63 preguntas de teoría que se eligen al azar (las falladas salen más) y 9 generadores que inventan ejercicios nuevos de conversiones, factores, tiempo, notación científica, redondeo, kelvin y errores, de fácil a difícil dentro de cada misión.
- **Botón 🔊** para que lea la pregunta en voz alta.
- Guarda nombre, estrellas y fallos en el propio navegador. No necesita cuentas ni servidor.

## Probarlo en tu ordenador

Haz doble clic en `index.html`. Ya está.

## Publicarlo gratis

### Opción A · GitHub Pages
1. Crea una cuenta en [github.com](https://github.com) si no la tienes.
2. Botón **New repository** → nombre, por ejemplo, `mision-fyq` → **Public** → **Create repository**.
3. En la página del repositorio: **uploading an existing file** → arrastra los 5 archivos (`index.html`, `styles.css`, `app.js`, `preguntas.js`, `README.md`) → **Commit changes**.
4. Ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama **main**, carpeta **/(root)** → **Save**.
5. En un minuto tendrás la web en `https://TU-USUARIO.github.io/mision-fyq/`.

### Opción B · Vercel
1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. **Add New → Project** → importa el repositorio `mision-fyq` (el del paso A) → *Framework Preset*: **Other** → **Deploy**.
3. Te da una URL tipo `https://mision-fyq.vercel.app`.

> Truco: en el móvil o la tablet, abre la web y usa **"Añadir a pantalla de inicio"** para que parezca una app.

## Añadir o cambiar preguntas

Todo está en `preguntas.js`. Para añadir una pregunta de teoría copia una línea `S(...)` y cambia el texto:

```js
S('lab13', 'lab', '¿Para qué sirve el cristalizador?', '💎 Para obtener cristales', ['🔥 Para calentar', '⚖️ Para pesar'],
  'En el cristalizador se evapora el agua y quedan los cristales.', ['💧 Piensa en la sal que queda cuando se seca el agua del mar.'], 'instrumentos'),
```

Orden: `id único`, `planeta` (`lab`, `metodo`, `si`, `escalera`, `notacion`, `errores`), `pregunta`, `respuesta buena`, `[dos respuestas malas]`, `explicación`, `[pasos del truco]`, `píldora opcional`.

Si el profesor ha dado algo de forma distinta (por ejemplo, otro truco o una regla), cámbialo ahí y vuelve a subir el archivo.
