# PROMPT MAESTRO — PUBLISH OR PERISH: THE PEER REVIEW NIGHTMARE

## 0. TU ROL Y MISIÓN

Actúa como un equipo multidisciplinar de desarrollo independiente de videojuegos formado por:

- Un **Game Designer** especializado en aventuras narrativas, mecánicas RPG y juegos de decisiones.
- Un **Narrative Designer** especializado en comedia, sátira académica, construcción de personajes y diálogos memorables.
- Un **Creative Director** especializado en pixel art, interfaces retro y videojuegos indie visualmente atractivos.
- Un **Senior Frontend Developer** experto en HTML5, CSS3 y JavaScript Vanilla.
- Un **UX/UI Designer** especializado en interfaces interactivas, transiciones, microanimaciones y diseño responsive.

Tu misión es diseñar e implementar un videojuego web llamado:

# PUBLISH OR PERISH
### The Peer Review Nightmare

**Tagline oficial:**

*One paper. Three reviewers. Zero mercy.*

Debe ser un videojuego narrativo de comedia y estrategia ligera ambientado en el mundo de la publicación científica, donde el jugador interpreta a un investigador que intenta publicar su primer artículo mientras se enfrenta a editores, revisores, rondas interminables de modificaciones, correos devastadores y decisiones absurdas.

El resultado debe parecer un **auténtico videojuego indie**, no una aplicación empresarial, un cuestionario interactivo ni una presentación de diapositivas.

Busco una experiencia memorable, divertida, visualmente cuidada y con una identidad muy marcada.

---

# 1. RESTRICCIONES TECNOLÓGICAS OBLIGATORIAS

## Tecnologías permitidas

Utiliza EXCLUSIVAMENTE:

- HTML5
- CSS3
- JavaScript Vanilla (ES6+)
- SVG inline generado mediante HTML/JavaScript
- Canvas API, únicamente cuando realmente aporte valor
- Web Audio API para efectos sonoros
- localStorage para guardar partidas

## Tecnologías prohibidas

NO utilizar:

- React, Vue, Angular, Svelte ni frameworks similares.
- TypeScript.
- Node.js como requisito de ejecución.
- Librerías externas de UI.
- Motores como Phaser, PixiJS, Three.js o similares.
- Bases de datos.
- Backend.
- APIs externas.
- Servicios que requieran claves.
- Dependencias de CDNs.
- Recursos remotos indispensables para que funcione el juego.

El proyecto debe poder desplegarse directamente en **GitHub Pages**, utilizando únicamente archivos estáticos.

La aplicación debe funcionar al servir el directorio mediante un servidor HTTP estático y no depender de herramientas de compilación.

No debe existir ningún paso obligatorio de `npm install`, `npm run build` ni configuración de servidores.

## Arquitectura propuesta

Organiza el proyecto de forma modular y mantenible:

```text
publish-or-perish/
│
├── index.html
├── README.md
│
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── gameState.js
│   ├── gameEngine.js
│   ├── story.js
│   ├── characters.js
│   ├── events.js
│   ├── battles.js
│   ├── endings.js
│   ├── audio.js
│   └── storage.js
│
└── assets/
    ├── icons/
    └── sounds/
```

Puedes mejorar la estructura si existe una razón técnica clara, siempre que respetes las restricciones.

Prioriza la separación entre:

1. Estado del juego.
2. Contenido narrativo.
3. Lógica de decisiones.
4. Mecánicas de combate.
5. Interfaz y renderizado.
6. Persistencia.
7. Audio y efectos visuales.

Evita construir toda la lógica dentro de `index.html`.

No introduzcas archivos vacíos ni modularización artificial.

---

# 2. CONCEPTO GENERAL

## Género

Aventura narrativa + RPG ligero + comedia satírica + decisiones estratégicas.

## Duración

- Primera versión: aproximadamente 10–15 minutos por partida.
- Versión ampliada: 15–20 minutos.
- Debe incentivar la rejugabilidad para descubrir otros finales y situaciones.

## Público objetivo

- Investigadores.
- Doctorandos.
- Profesores universitarios.
- Estudiantes.
- Personas familiarizadas con artículos científicos.
- Público general que disfrute juegos de humor absurdo.

No es necesario conocer el mundo académico para comprender la historia.

## Tono narrativo

Humor inteligente, absurdo y ligeramente oscuro.

La sátira debe centrarse en:

- La lentitud del proceso editorial.
- El miedo al rechazo.
- Los revisores contradictorios.
- Los comentarios imposibles de satisfacer.
- La burocracia académica.
- Las revisiones interminables.
- Las tasas de publicación.
- El comportamiento obsesivo de revisar el estado de un artículo.
- La relación amor-odio con la investigación científica.

El humor debe surgir de situaciones reconocibles, exageradas y bien escritas.

Evita convertir el juego en una colección de memes desconectados.

La historia debe tener continuidad, evolución del protagonista y consecuencias de las decisiones.

---

# 3. IDENTIDAD VISUAL

## Dirección artística

Quiero una estética de **pixel art moderno combinada con una interfaz RPG retro y un sistema editorial ficticio**.

Referencias de sensaciones visuales:

- Videojuegos indie narrativos.
- Aventuras pixel art.
- Interfaces RPG.
- Pantallas de diálogo de videojuegos clásicos.
- Simuladores narrativos con personalidad.
- Ambientación dark academia.
- Interfaces de ordenadores antiguos fusionadas con videojuegos modernos.

NO se debe copiar directamente la identidad visual ni los recursos de ninguna obra existente.

## Paleta principal

Utiliza una paleta oscura y elegante:

| Elemento | Color sugerido |
|---|---|
| Fondo principal | `#0B1020` |
| Superficies | `#151D32` |
| Paneles secundarios | `#1F2942` |
| Morado principal | `#8B5CF6` |
| Azul neón | `#38BDF8` |
| Verde aceptación | `#22C55E` |
| Rojo rechazo | `#EF4444` |
| Dorado/logros | `#FBBF24` |
| Texto principal | `#F8FAFC` |
| Texto secundario | `#94A3B8` |

Puedes ajustar la paleta para mejorar la estética y el contraste.

## Requisitos visuales

- Fondo oscuro con atmósfera.
- Paneles con bordes pixelados o de videojuego.
- Sombras y brillos suaves.
- Botones con efectos hover y press.
- Indicadores de recursos estilizados.
- Animaciones de aparición de personajes.
- Transiciones entre escenas.
- Pequeños efectos de partículas.
- Efecto de texto escribiéndose progresivamente (typewriter).
- Temblor de pantalla ante eventos importantes.
- Pantallas de victoria y derrota impactantes.
- Iluminación verde para ACCEPTED.
- Iluminación roja para REJECTED.
- Iluminación violeta o roja para la aparición de Reviewer #2.

## Recursos gráficos

Es importante que el juego sea realmente vistoso.

Como no quiero depender de servicios externos, utiliza:

- Ilustraciones originales mediante SVG inline.
- Pixel art simplificado dibujado con SVG.
- Elementos gráficos generados con CSS.
- Fondos compuestos con gradientes, patrones y formas.
- Animaciones CSS para dar vida a los personajes.

Diseña personajes con siluetas reconocibles, expresiones y paletas diferenciadas. No aceptes como resultado final simples emojis o rectángulos con nombres.

No hace falta que el pixel art sea complejo, pero sí coherente y atractivo.

La interfaz debe estar optimizada para escritorio y adaptarse correctamente a dispositivos móviles.

---

# 4. HISTORIA Y UNIVERSO

## Premisa

El protagonista es un joven investigador que acaba de terminar su primer artículo científico.

Ha trabajado tres años y está convencido de haber realizado un descubrimiento extraordinario.

Su investigación se titula:

**"The Mystery of the Missing Sock: A Longitudinal Study of Domestic Washing Machines"**

Su trabajo pretende demostrar por qué los calcetines desaparecen misteriosamente dentro de las lavadoras.

La temática es deliberadamente absurda, pero todos los personajes deben tratarla con la seriedad de una investigación científica trascendental.

Este contraste es una de las fuentes principales de humor.

El protagonista tiene un objetivo:

**Conseguir que su artículo sea aceptado por una revista científica.**

Lo que comienza como una simple entrega de manuscrito se convierte en una aventura de supervivencia editorial.

---

# 5. PERSONAJES

## 5.1. Dr. Hope — El protagonista

Características:

- Joven investigador.
- Inteligente.
- Optimista.
- Ingenuo.
- Adicto al café.
- Convencido de que su trabajo revolucionará la ciencia.

Frase característica:

> "This time they'll definitely accept it without changes."

Evolución narrativa:

Al principio está lleno de entusiasmo.

A medida que avanza el juego, comienza a perder la paciencia, cuestiona el sistema editorial y aprende a responder profesionalmente incluso a las críticas más absurdas.

En determinados finales puede convertirse en aquello que más teme.

### Aspecto

Investigador cansado, despeinado, con bata de laboratorio, gafas opcionales y taza de café.

Debe tener varias expresiones:

- Feliz.
- Confundido.
- Preocupado.
- Furioso.
- Exhausto.
- Victorioso.

## 5.2. The Editor — El guardián

Personaje elegante, frío y extremadamente formal.

Controla el destino del manuscrito.

Sus mensajes son breves y educados, pero pueden ser devastadores.

Frase característica:

> "We regret to inform you..."

Debe aparecer durante el envío, las decisiones editoriales y los finales.

## 5.3. Reviewer #1 — El razonable

Revisor experimentado y amable.

Sus comentarios son constructivos y generalmente útiles.

Frase característica:

> "Interesting work. I have only two minor concerns."

Puede convertirse en aliado narrativo cuando el jugador responde adecuadamente.

Aspecto: profesor de edad avanzada, gafas, barba, ropa académica tradicional.

## 5.4. Reviewer #2 — El jefe final

El principal antagonista.

Su identidad es desconocida.

Es implacable, contradictorio y prácticamente imposible de satisfacer.

Frase característica:

> "The entire manuscript must be reconsidered."

Debe tener la presentación visual más espectacular del juego.

- Aparición dramática.
- Pantalla roja.
- Música amenazante.
- Animación de entrada.
- Indicador de dificultad.
- Efectos de glitch o temblor.
- Comentarios destructivos.

Su presencia debe generar humor y tensión.

## 5.5. Reviewer #3 — El fantasma

Misterioso revisor que desaparece durante largos periodos.

Puede tardar 127 días en responder.

Cuando finalmente aparece, suele recomendar que cites sus propias publicaciones.

Frase característica:

> "Please cite my relevant publication from 1987."

Debe tener elementos visuales fantasmales, translúcidos o etéreos.

---

# 6. ESTRUCTURA NARRATIVA

La historia completa consta de cinco capítulos.

Implementa una primera versión jugable que recorra el arco narrativo completo. Los capítulos pueden ser relativamente breves, pero deben existir y conducir a una decisión final coherente.

La estructura debe permitir ampliarlos posteriormente sin reescribir el motor del juego.

## CAPÍTULO I — THE SUBMISSION

### Escena inicial

Hora: 02:47 AM.

Exterior: tormenta nocturna.

Interior: despacho desordenado.

El protagonista está frente a su ordenador, rodeado de papeles, tazas de café y experimentos sobre calcetines.

Diálogo:

**Dr. Hope:**

> "Three years of research. Forty-two experiments. Seventeen coffees today. It's finally ready."

El jugador recibe una breve introducción al sistema de recursos.

### Primera decisión

Elegir una revista científica entre tres alternativas ficticias:

**A. International Journal of Absolutely Everything**

Revista extremadamente prestigiosa.

- Revisión exigente.
- Mayor prestigio.
- Mayor riesgo de rechazo.

**B. Journal of Applied Sock Sciences**

Revista especializada y razonable.

- Dificultad equilibrada.
- Revisiones moderadas.
- Menor prestigio.

**C. Universal Scientific Discoveries & More**

Revista sospechosamente receptiva.

- Revisión aparentemente fácil.
- Menor prestigio.
- Posibles riesgos editoriales.
- Posibilidad de un giro cómico relacionado con costes o prácticas cuestionables.

La elección debe tener consecuencias reales sobre la partida.

No debe garantizar automáticamente un final.

### Envío

Tras seleccionar la revista:

Aparece una animación de subida del manuscrito.

Mensaje:

**SUBMISSION SUCCESSFUL**

Después, un correo:

> "Your manuscript has been successfully received."

Música triunfal.

Silencio repentino.

Nuevo estado:

**WITH EDITOR**

Termina el capítulo.

## CAPÍTULO II — THE WAITING GAME

### Objetivo

Simular la espera desesperante del proceso editorial.

Mostrar una interfaz ficticia de seguimiento del manuscrito.

Estados posibles:

- Submitted.
- With Editor.
- Reviewer Invited.
- Under Review.
- Required Reviews Completed.
- Decision in Process.

### Secuencia cómica

Día 4: With Editor.

Día 19: With Editor.

Día 36: Under Review.

Día 91: Under Review.

Día 132: Reviewer Invited.

Diálogo:

**Dr. Hope:**

> "REVIEWER INVITED?! WHO WAS REVIEWING IT BEFORE?!"

### Minijuego: Refresh Addiction

El jugador debe resistir la tentación de actualizar compulsivamente el estado del artículo.

Incorpora un minijuego breve y visualmente divertido.

Posibles acciones:

- Actualizar el sistema editorial.
- Tomar café.
- Trabajar en otro proyecto.
- Descansar.
- Escribir al editor.

Las acciones deben afectar paciencia, tiempo u otros recursos.

La actualización constante no debe acelerar mágicamente la revisión.

Puedes introducir pequeñas animaciones o mensajes cómicos.

### Final del capítulo

Llega un correo.

Asunto:

**Decision on Manuscript #SOCK-0042**

La interfaz oscurece el fondo.

Suena una alerta.

El jugador debe abrir el correo.

Resultado:

**MAJOR REVISION**

Comienza el siguiente capítulo.

## CAPÍTULO III — ENTER THE REVIEWERS

Este capítulo debe ser uno de los momentos más memorables.

Presenta a los tres revisores progresivamente.

### Reviewer #1

Comentario:

> "The manuscript is well written. Please clarify the sample size."

Debe representar una revisión razonable.

### Reviewer #2

Antes de aparecer, detener momentáneamente la escena.

Oscurecer la pantalla.

Mostrar:

**WARNING**

**REVIEWER #2 HAS SUBMITTED A 37-PAGE REPORT**

Efectos visuales y sonoros.

Comentario:

> "The authors completely fail to account for the psychological perspective of the missing socks."

### Reviewer #3

Comentario:

> "I recommend adding 14 citations, preferably from my research group."

Su aparición puede incluir un efecto fantasmal.

### Mecánica

Cada revisor presenta comentarios en un sistema de combate RPG narrativo.

Los comentarios funcionan como ataques editoriales.

El jugador debe escoger respuestas.

Cada respuesta afecta recursos y relaciones con los revisores.

Las elecciones no deben ser meramente cosméticas.

## CAPÍTULO IV — THE REBUTTAL WARS

El protagonista debe responder formalmente a las críticas.

El jugador administra sus recursos para preparar la carta de respuesta.

Situación:

Reviewer #1 afirma que la estructura del manuscrito es excelente.

Reviewer #2 exige reorganizarlo completamente.

Diálogo:

**Dr. Hope:**

> "But Reviewer #1 said the structure was excellent..."

Introducir comentarios contradictorios.

### Posibles acciones

- Redactar una justificación metodológica.
- Repetir un experimento.
- Añadir una discusión.
- Reorganizar una sección.
- Solicitar una aclaración al editor.
- Responder de manera sarcástica.
- Ignorar una objeción.
- Elegir estratégicamente qué comentarios atender.

Cada acción debe tener costes y consecuencias.

Debe existir un límite de tiempo para enviar la revisión.

No debe ser posible seleccionar infinitamente acciones sin consumir recursos.

El jugador debe comprender que es necesario equilibrar calidad, tiempo y paciencia.

La resolución del capítulo determina la calidad del rebuttal.

## CAPÍTULO V — THE FINAL DECISION

El artículo regresa al editor.

Tras una breve espera, llega una segunda ronda de revisión.

Reviewer #2 escribe:

> "The revised manuscript is significantly improved. However, I now have several additional fundamental concerns."

### Batalla final

Reviewer #2 regresa con una presentación de jefe final.

El jugador debe utilizar los recursos acumulados para responder a sus últimas críticas.

El desenlace dependerá de las decisiones previas, el rigor científico, los comentarios atendidos, el tiempo disponible y la credibilidad acumulada.

Evita resultados completamente aleatorios.

Las decisiones inteligentes deben tener mejores probabilidades de éxito, sin eliminar la posibilidad de resultados cómicos.

La decisión editorial final debe ser comprensible y coherente con el recorrido del jugador.

---

# 7. SISTEMA DE RECURSOS

Implementa un sistema de estadísticas visible durante la partida.

## Recursos principales

### Scientific Rigor

Representa la calidad metodológica y argumentativa del manuscrito.

Escala: 0 a 10.

Aumenta cuando el jugador:

- Responde con argumentos sólidos.
- Realiza experimentos relevantes.
- Corrige problemas legítimos.
- Justifica adecuadamente sus decisiones científicas.

Disminuye cuando:

- Ignora críticas importantes.
- Introduce cambios inconsistentes.
- Toma atajos metodológicos.

### Patience

Representa la resistencia emocional del protagonista.

Escala: 0 a 10.

Aumenta mediante:

- Descansar.
- Tomar café en determinadas circunstancias.
- Recibir comentarios favorables.
- Conseguir avances editoriales.

Disminuye por:

- Revisiones interminables.
- Comentarios absurdos.
- Conflictos entre revisores.
- Respuestas impulsivas.
- Eventos negativos.

### Time

Representa el tiempo disponible para preparar revisiones y cumplir los plazos.

Se mide en días o puntos de tiempo.

Las acciones tienen costes específicos.

Los deadlines deben importar.

### Variables secundarias

También puedes incorporar internamente:

- Credibility.
- Reviewer #1 relationship.
- Reviewer #2 satisfaction.
- Reviewer #3 satisfaction.
- Journal prestige.
- Rebuttal quality.
- Number of revisions.
- Number of rejections.
- Coffee consumed.

No es necesario mostrar todas las variables en pantalla.

## Reglas importantes

- Las estadísticas deben mantenerse dentro de límites válidos.
- El jugador debe recibir feedback visual tras cada cambio.
- Los recursos deben tener efectos reales.
- Las elecciones deben ofrecer ventajas, costes o riesgos distintos.
- No debe ser posible entrar en un estado donde la partida quede bloqueada sin solución.
- Debe existir un sistema sencillo de balance.

Los recursos deben poder guardarse y restaurarse correctamente.

---

# 8. MECÁNICA DE COMBATE CONTRA REVISORES

Diseña un sistema de combate narrativo por turnos.

NO es un combate físico.

Los ataques son comentarios editoriales.

Las defensas son respuestas científicas o decisiones estratégicas.

## Estructura visual

La pantalla debe mostrar:

- Retrato del revisor.
- Nombre del revisor.
- Nivel de dificultad o "Destruction Level".
- Comentario recibido.
- Opciones de respuesta.
- Indicadores de recursos.
- Resultado de la elección.
- Progreso de la revisión.

## Ejemplo obligatorio

**ROUND 03 — MAJOR REVISION**

**BOSS: REVIEWER #2**

**DESTRUCTION LEVEL: 9/10**

Comentario:

> "The sample size is insufficient. I strongly recommend repeating the entire study using at least 10,000 socks."

Opciones:

**A. Diseñar un experimento complementario.**

Consecuencias:

- Rigor +2.
- Tiempo -2.
- Aumenta la satisfacción del revisor.

**B. Justificar científicamente el tamaño muestral actual.**

Consecuencias:

- Rigor +1.
- Tiempo -1.
- Mejora moderadamente la evaluación.

**C. Responder: "Did you even read the paper?"**

Consecuencias:

- Recuperación cómica de paciencia.
- Credibilidad -3.
- Reviewer #2 añade nuevos comentarios.

Las consecuencias deben mostrarse mediante pequeñas animaciones.

Después de seleccionar una acción, debe mostrarse una reacción contextual del revisor antes de pasar al siguiente turno.

## Diseño del sistema

Los encuentros deben admitir:

- Diferentes comentarios.
- Diferentes opciones.
- Modificadores de estadísticas.
- Condiciones para habilitar respuestas.
- Consecuencias diferidas.
- Eventos especiales.
- Resultados alternativos.

Organiza esta información mediante objetos de JavaScript, evitando lógica narrativa rígida repetida.

---

# 9. EVENTOS ALEATORIOS

Implementa un sistema sencillo de eventos que aporte variedad.

Los eventos deben ser razonablemente impredecibles, pero nunca destruir injustamente una partida.

Ejemplos:

### Coffee Overdose

El protagonista consume demasiado café.

Efectos posibles:

- Paciencia +1.
- Concentración temporal reducida.

### Reviewer #2 Has Entered the Chat

Aparece una objeción inesperada.

- Nuevo comentario.
- Pérdida de paciencia.

### Conference Deadline

Surge una conferencia importante.

El jugador debe decidir entre atenderla o continuar la revisión.

### Just One Small Change

El supervisor propone un cambio aparentemente pequeño.

Desbloquea cinco tareas nuevas.

### LaTeX Compilation Failed

Error de compilación.

Consume tiempo.

### Citation Needed

Minijuego breve para seleccionar la referencia más adecuada a una crítica.

### Reviewer #1 Defends You

Evento favorable poco frecuente.

- Mejora la credibilidad.
- Recupera paciencia.
- Puede modificar el enfrentamiento final.

### Editor Sends an Email

Se genera tensión.

El mensaje resulta ser una notificación administrativa irrelevante.

## Requisitos

- Implementar inicialmente al menos seis eventos.
- Proporcionar condiciones para activarlos.
- No repetir excesivamente el mismo evento.
- Ajustar la frecuencia para no interrumpir continuamente el flujo.
- Permitir ampliar fácilmente el catálogo.

---

# 10. FINALES

El juego debe tener cuatro finales principales.

Las condiciones deben depender del estado de la partida.

## FINAL A — ACCEPTED!

Final victorioso.

La pantalla cambia a tonos verdes y dorados.

Aparece confeti.

Suena música triunfal.

Mensaje central:

**CONGRATULATIONS!**

**YOUR MANUSCRIPT HAS BEEN ACCEPTED!**

El protagonista celebra.

Entonces recibe un nuevo correo:

> "To proceed with publication, please complete the Article Processing Charge of €2,500."

Pausa dramática.

**Dr. Hope:**

> "...WHAT?"

Este remate debe ser memorable.

## FINAL B — REJECTED

Final de derrota editorial.

Pantalla roja.

Mensaje:

**WE REGRET TO INFORM YOU...**

El editor indica que el manuscrito no es adecuado para la revista.

Después aparece:

**SUBMIT TO ANOTHER JOURNAL?**

Permite comenzar una nueva partida.

## FINAL C — ETERNAL MAJOR REVISION

Final absurdo.

El jugador consigue responder a prácticamente todas las críticas, excepto las interminables objeciones de Reviewer #2.

Pantalla:

**YEAR 2047**

Mensaje:

> "Reviewer #2 has requested one additional experiment."

El protagonista aparece envejecido frente al ordenador.

**THE REVISION NEVER ENDS.**

## FINAL D — YOU BECOME REVIEWER #2

Final secreto.

El jugador acumula demasiadas respuestas hostiles, frustración o decisiones relacionadas con Reviewer #2.

Después de años de rechazos, el protagonista se convierte en revisor.

Recibe su primer manuscrito para evaluar.

Lo lee lentamente.

Escribe:

> "Interesting work. However, I have several fundamental concerns."

La pantalla se oscurece.

Mensaje:

**THE CYCLE CONTINUES...**

Debe sentirse como un giro final inesperado y divertido.

## Requisitos de finales

- Cada final debe tener una presentación visual diferenciada.
- Debe existir lógica explícita para determinar el desenlace.
- El resultado no debe depender solamente de la última respuesta.
- Debe existir un sistema de prioridad para resolver condiciones de finales que coincidan.
- Debe ser posible desbloquear todos los finales mediante partidas diferentes.
- El final secreto debe requerir condiciones específicas.
- El jugador debe poder reiniciar fácilmente.

---

# 11. LOGROS Y REJUGABILIDAD

Implementa un sistema ligero de logros persistentes.

Logros sugeridos:

- **First Rejection** — Recibir el primer rechazo.
- **Reviewer #2 Survivor** — Superar una revisión particularmente difícil.
- **The 100th Revision** — Logro cómico relacionado con revisiones.
- **Coffee Is My Coauthor** — Consumir una cantidad determinada de cafés.
- **Professional Response** — Resolver conflictos sin respuestas hostiles.
- **Publish or Perish** — Conseguir el primer ACCEPTED.
- **The Cycle Continues** — Descubrir el final secreto.
- **Peer Review Veteran** — Descubrir todos los finales.

Los requisitos deben ser alcanzables y medibles.

Evita logros que exijan acciones inexistentes.

Los logros deben persistir aunque el jugador comience una partida nueva.

Muestra pequeñas notificaciones animadas cuando se desbloqueen.

---

# 12. PANTALLAS PRINCIPALES

## Pantalla de inicio

Título enorme:

**PUBLISH OR PERISH**

Subtítulo:

**THE PEER REVIEW NIGHTMARE**

Tagline:

*One paper. Three reviewers. Zero mercy.*

Botones:

**NEW SUBMISSION**

**CONTINUE SUFFERING**

**HALL OF REJECTIONS**

**SETTINGS**

El botón de continuar solo debe estar disponible cuando exista una partida guardada válida.

La pantalla debe incluir un fondo animado y algún elemento temático, como documentos flotantes, una bandeja de entrada o un escritorio nocturno.

## Pantalla de historia

Debe incluir:

- Escenario visual.
- Personajes y retratos.
- Caja de diálogo.
- Nombre del personaje.
- Texto progresivo.
- Botón para continuar.
- Indicador de capítulo.
- Recursos del jugador.

## Pantalla editorial

Representa un sistema ficticio de gestión de manuscritos.

Debe incluir:

- ID del manuscrito.
- Título del artículo.
- Revista seleccionada.
- Estado actual.
- Historial de estados.
- Correo editorial.
- Botones de interacción.

Debe tener humor, pero ser visualmente creíble.

## Pantalla de combate

Inspiración RPG.

Elementos:

- Revisor.
- Comentario.
- Opciones.
- Recursos.
- Animaciones.
- Feedback.
- Progreso del enfrentamiento.

## Pantalla de resultados

Presenta el final obtenido con una escena visual especial.

Debe incluir también un pequeño resumen de la partida:

- Revista seleccionada.
- Días transcurridos.
- Revisiones completadas.
- Cafés consumidos.
- Resultado editorial.
- Logros desbloqueados.

## Hall of Rejections

Pantalla persistente con estadísticas históricas.

Muestra:

- Número de partidas.
- Número de aceptaciones.
- Número de rechazos.
- Finales descubiertos.
- Logros desbloqueados.

Puede adoptar el estilo de un archivo académico o museo de decisiones editoriales desastrosas.

---

# 13. EXPERIENCIA DE USUARIO

## Principios UX

1. El jugador debe comprender intuitivamente qué hacer.
2. Cada interacción importante debe recibir feedback.
3. Los botones deben ser claros y visualmente atractivos.
4. Los textos deben tener un ritmo adecuado.
5. La información no debe saturar la pantalla.
6. Las transiciones deben aportar personalidad.
7. La interfaz debe parecer un videojuego, no un formulario.
8. La progresión debe sentirse continua.
9. La experiencia debe funcionar con ratón y teclado.
10. Debe adaptarse a pantallas pequeñas.

## Animaciones

Implementar, como mínimo:

- Aparición de personajes.
- Texto progresivo.
- Feedback de recursos.
- Cambio de capítulo.
- Notificaciones.
- Hover de botones.
- Temblor de pantalla.
- Transiciones de escena.
- Entrada espectacular de Reviewer #2.
- Efecto visual para ACCEPTED y REJECTED.

Utiliza principalmente CSS.

JavaScript debe coordinar los estados de animación.

Permite desactivar o reducir animaciones.

Respeta `prefers-reduced-motion`.

## Sonido

Utiliza Web Audio API para generar efectos sencillos:

- Clic de botones.
- Notificación de correo.
- Aparición de comentario.
- Error.
- Victoria.
- Rechazo.
- Evento especial.

No dependas de archivos de audio externos.

Incluye un control para activar o silenciar el sonido.

No reproduzcas audio automáticamente antes de que exista una interacción del usuario.

---

# 14. SISTEMA DE ESTADO Y PERSISTENCIA

Define un objeto central del estado del juego.

Ejemplo conceptual:

```javascript
const gameState = {
  chapter: 1,
  sceneId: "intro",
  selectedJournal: null,

  stats: {
    rigor: 5,
    patience: 7,
    time: 10,
    credibility: 5
  },

  relationships: {
    reviewer1: 0,
    reviewer2: 0,
    reviewer3: 0
  },

  manuscript: {
    status: "draft",
    revisionRound: 0,
    rebuttalQuality: 0
  },

  flags: {},
  visitedScenes: [],
  triggeredEvents: [],
  decisions: [],

  totalDays: 0,
  coffeeConsumed: 0,

  currentEnding: null
};
```

Puedes modificar la estructura si mejora la implementación.

Requisitos:

- Estado centralizado.
- Validación de valores.
- Guardado automático.
- Recuperación de partidas.
- Reinicio seguro.
- Persistencia de logros y estadísticas globales.
- Separación entre datos de partida y progreso histórico.
- Versionado del almacenamiento para facilitar actualizaciones.
- Tratamiento seguro de datos corruptos en localStorage.

Evita modificar el DOM directamente desde todas las funciones.

Centraliza las responsabilidades de renderizado.

---

# 15. MOTOR NARRATIVO

La historia debe implementarse mediante una estructura declarativa de escenas.

Ejemplo orientativo:

```javascript
const scenes = {
  intro: {
    chapter: 1,
    type: "dialogue",
    character: "hope",
    text: "Three years of research...",
    next: "journal_selection"
  },

  journal_selection: {
    chapter: 1,
    type: "choice",
    prompt: "Choose your journal",
    choices: [
      {
        text: "International Journal of Absolutely Everything",
        effects: {
          credibility: 1
        },
        next: "submission"
      }
    ]
  }
};
```

Amplía este diseño para contemplar:

- Condiciones.
- Efectos.
- Eventos.
- Comentarios editoriales.
- Combates.
- Cambios de personajes.
- Transiciones.
- Finales.
- Escenas especiales.

El sistema debe impedir referencias a escenas inexistentes.

La narrativa debe poder ampliarse editando archivos de datos, sin reprogramar el motor.

No introduzcas textos genéricos como "Scene coming soon".

Todas las escenas de la primera versión deben tener diálogos completos y funcionales.

---

# 16. ESTILO DE ESCRITURA

La historia debe ser ágil y divertida.

Evita párrafos excesivamente largos.

Prioriza:

- Diálogos cortos.
- Remates cómicos.
- Pausas dramáticas.
- Cambios de expresión.
- Contradicciones absurdas.
- Mensajes editoriales con lenguaje institucional.
- Comentarios de revisores ridículamente específicos.
- Reacciones del protagonista.

Los estados editoriales, nombres de capítulos, correos y frases icónicas pueden conservarse en inglés.

Para la primera implementación, utiliza una interfaz principalmente en inglés, con humor académico comprensible internacionalmente. Deja los textos organizados para facilitar una futura traducción al español.

La narración debe mantener consistencia tonal.

Los revisores tienen personalidades distintas y sus respuestas deben reflejarlas.

Evita repetir exactamente la misma broma en exceso.

---

# 17. CONTENIDO MÍNIMO DE LA PRIMERA VERSIÓN

La primera versión debe ofrecer un recorrido completo de principio a fin.

Debe incluir:

- Pantalla inicial.
- Introducción narrativa.
- Selección de revista.
- Envío del manuscrito.
- Seguimiento editorial.
- Minijuego de espera.
- Major Revision.
- Tres revisores diferenciados.
- Combate editorial.
- Preparación del rebuttal.
- Batalla final.
- Decisión editorial.
- Cuatro finales.
- Guardado automático.
- Reinicio.
- Estadísticas básicas.
- Al menos seis eventos.
- Al menos cinco logros.
- Efectos visuales.
- Efectos sonoros básicos.
- Diseño responsive.

Diseña al menos **15–20 decisiones narrativas significativas**, distribuidas entre los cinco capítulos.

La primera versión debe ser relativamente corta pero estar terminada.

Es preferible una aventura breve y pulida que una muy extensa con contenido de relleno.

Si es necesario dividir el desarrollo en entregas, la primera debe ser una versión vertical completamente jugable, y las siguientes deben ampliar el contenido sin romper la arquitectura.

---

# 18. CRITERIOS DE CALIDAD

## Calidad visual

El resultado debe verse como un videojuego independiente.

No considero suficiente:

- Un fondo plano.
- Texto centrado.
- Botones HTML sin personalidad.
- Emojis como sustitutos de todos los personajes.
- Una interfaz genérica de chatbot.
- Una simple lista de preguntas y respuestas.

El diseño debe integrar arte original, composiciones visuales, interfaces temáticas y animaciones.

## Calidad narrativa

No considero suficiente:

- Diálogos genéricos.
- Opciones sin consecuencias.
- Finales seleccionados aleatoriamente.
- Personajes sin personalidad.
- Escenas desconectadas.
- Revisiones repetitivas sin progresión.

## Calidad del código

- JavaScript limpio.
- Funciones con responsabilidades claras.
- Separación de módulos.
- Comentarios útiles.
- Sin duplicaciones innecesarias.
- Sin dependencias externas.
- Sin errores en consola.
- Sin referencias faltantes.
- Sin enlaces o recursos rotos.
- Sin vulnerabilidades evitables por insertar texto dinámico como HTML inseguro.

## Accesibilidad

- Navegación por teclado.
- Estados de foco visibles.
- Contraste suficiente.
- Etiquetas para controles.
- Tamaños táctiles razonables.
- Opción de reducir animaciones.
- Alternativas visuales para los efectos sonoros.

---

# 19. DESPLIEGUE EN GITHUB PAGES

La implementación debe funcionar en:

```text
https://<username>.github.io/publish-or-perish/
```

Utiliza rutas relativas.

No presupongas que el proyecto se ejecuta desde `/`.

No dependas del enrutamiento de un servidor.

No utilices rutas absolutas que fallen al desplegarse dentro de un repositorio.

Incluye un README con:

1. Descripción del proyecto.
2. Captura o descripción visual.
3. Mecánicas.
4. Estructura de archivos.
5. Instrucciones para ejecutar localmente.
6. Instrucciones de despliegue en GitHub Pages.
7. Controles.
8. Sistema de guardado.
9. Posibles ampliaciones.

---

# 20. PRUEBAS OBLIGATORIAS

Antes de considerar terminada la implementación, verifica estos escenarios:

### Escenario 1 — Nueva partida

El jugador abre la página y puede empezar desde cero.

### Escenario 2 — Progresión completa

Es posible recorrer todos los capítulos y llegar a una decisión editorial.

### Escenario 3 — Persistencia

El jugador puede cerrar la página, volver a abrirla y continuar.

### Escenario 4 — Recursos

Las estadísticas cambian correctamente, respetan sus límites y afectan las decisiones.

### Escenario 5 — Final ACCEPTED

Existe una secuencia de decisiones legítima que permite alcanzar el final victorioso.

### Escenario 6 — Final REJECTED

Existe una secuencia de decisiones legítima que produce el rechazo.

### Escenario 7 — Final ETERNAL MAJOR REVISION

Existe una secuencia de decisiones legítima que conduce al ciclo infinito.

### Escenario 8 — Final secreto

Existe una secuencia de decisiones legítima que permite convertirse en Reviewer #2.

### Escenario 9 — Dispositivos móviles

La interfaz funciona correctamente en resoluciones pequeñas.

### Escenario 10 — GitHub Pages

El proyecto funciona servido desde una subruta, sin backend, compilación ni servicios externos.

### Escenario 11 — Regresión

Reiniciar, cargar y repetir partidas no duplica eventos ni corrompe el estado.

Si no dispones de un navegador o entorno para ejecutar pruebas, no afirmes haberlas realizado. Indica cuáles quedan pendientes y proporciona pasos concretos para verificarlas.

---

# 21. ORDEN DE IMPLEMENTACIÓN

Quiero una implementación profesional y organizada.

Trabaja en este orden:

## Fase 1 — Arquitectura y diseño

Define:

- Arquitectura.
- Modelo de estados.
- Sistema de escenas.
- Diseño visual.
- Mecánicas.
- Sistema de finales.
- Estrategia de persistencia.

Explica brevemente las decisiones relevantes.

No conviertas esta fase en una discusión teórica interminable.

## Fase 2 — Interfaz base

Implementa:

- Pantalla de inicio.
- Layout principal.
- Sistema de componentes visuales.
- Sistema de diálogo.
- Panel de recursos.
- Transiciones.
- Base de ilustraciones y retratos.

## Fase 3 — Motor jugable

Implementa:

- Navegación entre escenas.
- Elecciones.
- Consecuencias.
- Estado de la partida.
- Sistema de combate.
- Guardado.
- Restauración.

## Fase 4 — Historia

Incorpora el contenido de los cinco capítulos.

Presta especial atención al ritmo narrativo y las reacciones de los personajes.

## Fase 5 — Eventos, finales y logros

Implementa las condiciones, los eventos aleatorios y los desenlaces.

## Fase 6 — Pulido

Añade:

- Animaciones.
- Efectos especiales.
- Sonidos.
- Responsive.
- Accesibilidad.
- Corrección de errores.
- Ajustes de balance.

## Fase 7 — Entrega

Entrega todos los archivos necesarios y el README.

Si estás trabajando en un entorno con acceso al sistema de archivos, crea y modifica directamente los archivos del proyecto.

Si solo puedes responder mediante texto, proporciona el contenido completo de cada archivo, organizado con su ruta correspondiente, de manera que pueda copiarse sin reconstruir partes omitidas.

No sustituyas código ejecutable por pseudocódigo.

No dejes funciones esenciales vacías.

Si existen límites de longitud, organiza la entrega en incrementos funcionales; cada incremento debe dejar una versión ejecutable.

---

# 22. LIBERTAD CREATIVA

Tienes libertad para añadir:

- Diálogos adicionales.
- Bromas editoriales.
- Animaciones.
- Eventos especiales.
- Pequeños detalles visuales.
- Transiciones originales.
- Easter eggs.
- Interacciones inesperadas.

Siempre que respetes:

1. La temática principal.
2. Los personajes definidos.
3. Los cinco capítulos.
4. Los cuatro finales.
5. La arquitectura estática.
6. Las restricciones tecnológicas.
7. La identidad visual RPG/pixel art.
8. El objetivo de crear un juego divertido, accesible y visualmente atractivo.

No introduzcas mecánicas que compliquen artificialmente el proyecto.

La simplicidad técnica debe combinarse con creatividad visual y narrativa.

---

# 23. OBJETIVO EMOCIONAL DE LA EXPERIENCIA

Quiero que el jugador pase por esta secuencia:

**Optimismo → Ilusión → Espera → Ansiedad → Indignación → Estrategia → Desesperación → Resolución.**

Debe reírse al reconocer situaciones absurdas.

Debe experimentar satisfacción cuando responde adecuadamente a una crítica.

Debe temer la aparición de Reviewer #2.

Debe sorprenderse ante los giros editoriales.

Debe sentir una victoria auténtica al conseguir ACCEPTED.

Y, sobre todo, debe querer volver a jugar para descubrir qué sucede cuando toma decisiones diferentes.

El objetivo es crear una pequeña experiencia con personalidad, no simplemente demostrar que HTML, CSS y JavaScript pueden mostrar diálogos.

---

# 24. INSTRUCCIÓN FINAL

Empieza proponiendo brevemente la arquitectura técnica y el diseño de la interfaz, y a continuación **comienza directamente la implementación funcional**.

No te limites a explicar cómo se podría construir.

Quiero el videojuego.

Prioriza siempre:

**Jugabilidad > Coherencia narrativa > Presentación visual > Complejidad innecesaria.**

No sacrifiques la calidad visual por utilizar tecnologías sencillas.

No sacrifiques la calidad narrativa por añadir mecánicas genéricas.

No sacrifiques la jugabilidad por incorporar animaciones.

Si una funcionalidad es complicada, busca una solución creativa utilizando JavaScript Vanilla, CSS y SVG.

No necesites confirmación para tomar pequeñas decisiones de diseño razonables.

Mantén el proyecto preparado para ampliaciones posteriores.

Y recuerda que el momento más importante del juego debe ser este:

La pantalla se oscurece.

El sonido desaparece.

Una notificación comienza a parpadear.

**WARNING: REVIEWER #2 HAS SUBMITTED A 37-PAGE REPORT.**

Aparece el enemigo.

El protagonista susurra:

*"I should have become a plumber."*

**LET THE PEER REVIEW BEGIN.**