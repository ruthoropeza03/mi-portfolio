---
name: audiovisual-prompting
description: Diseñar, desarrollar, optimizar, revisar y depurar prompts profesionales en inglés para GPT Image 2, MiniMax H3 MAX y Dreamina Seedance 2.5. Usar para generación o edición de imagen fija y para vídeo T2V, I2V, multimodal, edición, continuidad, extensión, audio o referencias; enruta cada encargo a la sección completa del modelo correcto sin mezclar sintaxis, límites ni flujos.
---

# Activación y enrutamiento unificado

Esta es una única skill monolítica con tres funciones completas dentro del mismo archivo:

- imagen fija con GPT Image 2;
- vídeo con MiniMax H3 MAX;
- vídeo con Dreamina Seedance 2.5.

Primero clasifica el encargo y selecciona el módulo pertinente de este mismo documento. Después aplica íntegramente ese módulo: su alcance, entradas, contratos, plantillas, pasos, entregables, controles y consideraciones. No mezcles instrucciones de módulos inactivos.

## Reglas de selección

1. **El modelo o destino explícito manda.** Si el usuario nombra GPT Image 2, MiniMax H3 MAX o Seedance 2.5/Dreamina, usa su módulo. No cambies silenciosamente de modelo.
2. **Distingue el entregable.** Una imagen fija, su edición o composición corresponde a GPT Image 2. Un plano o archivo con movimiento corresponde a uno de los módulos de vídeo. Image-to-video es vídeo: la imagen es una entrada, no el entregable.
3. **Usa funciones diferenciadoras cuando el modelo no esté nombrado.**
   - GPT Image 2: generación o edición de imagen fija, máscara, inpainting, compositing, try-on estático, producto, retrato, packaging, cartel, UI, infografía o tipografía en imagen.
   - MiniMax H3 MAX: cualquier mención abreviada al motor de MiniMax se interpreta exclusivamente como MiniMax H3 MAX; incluye t2va, r2va, Ref2VA, Context-IR compatible y workflows de ComfyUI destinados expresamente a MAX.
   - Seedance 2.5: Seedance, Dreamina, Long Video de 30–180 s, Smart Edit, Edit with Marks, extensión hacia delante o atrás, transición entre clips, varios keyframes, storyboard grid, blockout, One-Click Video o audio multimodal sin imagen/vídeo.
4. **No adivines entre motores de vídeo equivalentes.** T2V, I2V, first/last frame, referencias, diálogo, audio y edición existen en ambos. Si el encargo encaja materialmente en MiniMax H3 MAX y Seedance y la elección afecta la sintaxis, los límites o el resultado, pregunta qué modelo o interfaz usará. Si el usuario pide que elijas, recomienda uno según duración, materiales y modo, explica brevemente la razón y aplica solo ese módulo.
5. **Separa encargos mixtos.** Si el usuario pide una imagen y un vídeo, o una imagen inicial que después deba animarse, aplica primero GPT Image 2 y luego el módulo de vídeo elegido. Entrega prompts, ajustes y mapas de referencias separados. No afirmes que una salida intermedia existe si no se ha generado.
6. **Para una comparación explícita**, aplica los dos módulos de vídeo y produce salidas independientes. No construyas un híbrido supuestamente compatible con ambos.

## Contrato de estructura y longitud por modelo

| Modelo | Arquitectura obligatoria | Límite del prompt final |
|---|---|---|
| MiniMax H3 MAX | Estructura causal compacta: objetivo del plano → 2–4 beats de acción → entorno/física → una trayectoria de cámara → look → audio → continuidad/restricciones → estado final. Incluir solo los bloques activos. | **2.999 caracteres máximo** |
| Dreamina Seedance 2.5 | Arquitectura de producción escalable de hasta 17 bloques: contexto, referencias, espacio, primer frame, formato, óptica, cámara, actuación, timeline, física, luz, audio, estilo y locks. La densidad depende del riesgo del plano. | **10.000 caracteres máximo** |

Los límites cuentan todo lo escrito dentro del bloque del prompt: espacios, saltos de línea, títulos de sección, etiquetas de referencias, diálogo y texto literal. No cuentan la explicación, el mapa de referencias ni los ajustes que se entreguen fuera del bloque. Antes de entregar, calcular el recuento exacto y mostrarlo como `X/2.999 caracteres` o `X/10.000 caracteres`. Un prompt que exceda su límite es inválido y debe reescribirse antes de mostrarse.

No uses la plantilla extensa de Seedance para MiniMax H3 MAX ni comprimas automáticamente Seedance a la plantilla de ocho bloques de H3 MAX. La elección del modelo determina tanto la estructura como el presupuesto de caracteres. El máximo es un techo, no un objetivo de longitud.

## Precedencia y aislamiento

- Las instrucciones del módulo seleccionado prevalecen sobre este bloque compartido para los detalles de producción y ejecución.
- No transfieras límites, campos, notación de referencias, resoluciones, duraciones, roles de assets, capacidades o sintaxis de un modelo a otro.
- No confundas una referencia de identidad con un primer o último fotograma.
- El esquema o la documentación oficial vigentes prevalecen para capacidades variables.
- No presentes heurísticas como límites técnicos ni sustituyas modelos, interfaces, proveedores o tipos de referencia sin permiso.
- Los prompts finales se redactan en inglés; conserva verbatim marcas, copy, diálogo o texto exigido en otro idioma cuando lo indique el módulo activo.
- Redactar o aprobar un prompt no autoriza a generar, consumir créditos, subir archivos, instalar ni conectar servicios. La ejecución externa requiere una confirmación afirmativa e inequívoca posterior a la entrega. Una confirmación autoriza una sola generación del entregable claramente identificado.
- **Seguimiento obligatorio de Magnific:** en cuanto una generación autorizada devuelva un identificador, invocar `creations_show`. Mientras su estado sea activo —por ejemplo `queued`, `pending`, `processing`, `running` o el equivalente declarado por el esquema vivo—, volver a invocar `creations_show` hasta alcanzar un estado terminal. Si existe `creations_wait`, usarlo entre refrescos, pero consultar `creations_show` de nuevo después de cada espera y una vez más al llegar al estado terminal para obtener los metadatos y assets más recientes. Respetar `retry_after`, el intervalo o el timeout indicados por el conector; si no los proporciona, usar intervalos prudentes de 15–30 segundos, sin sondeo agresivo, y comunicar un breve progreso al menos una vez por minuto cuando la espera se prolongue. El timeout de una llamada de consulta no equivale a un estado terminal. Detener el seguimiento únicamente ante éxito, fallo, cancelación terminal o cancelación solicitada por el usuario. Estas consultas no autorizan otra llamada a `generate`, variaciones ni reintentos que puedan consumir créditos.
- **Salida visible obligatoria:** `creations_show` sirve únicamente para consultar estado o metadatos y nunca cuenta por sí solo como presentación. Tras confirmar un estado terminal satisfactorio con el refresco más reciente, recuperar el asset final y renderizarlo dentro del chat. Usar primero cualquier recurso o herramienta de previsualización nativa; si no renderiza, obtener la URL directa del asset desde `generate`, `wait`, `show` o la capacidad de descarga disponible, guardar el archivo generado en una ruta local accesible y adjuntarlo inline con Markdown multimedia y ruta absoluta. Un ID, estado, URL de texto o enlace descargable no sustituyen la previsualización. No dar la ejecución por completada hasta comprobar que la imagen o el vídeo aparece visible en la respuesta. Si el estado terminal es de fallo o cancelación, informar del resultado exacto sin lanzar automáticamente otra generación. Si ninguna herramienta expone el asset final, informar de un fallo de entrega y no afirmar que el resultado se ha mostrado.

## Orden de trabajo

1. Identifica entregable, modelo o interfaz, madurez del brief, materiales reales y si se pide ideación, prompt final, revisión, diagnóstico o generación.
2. Selecciona el módulo.
3. Aplica el módulo completo, no solo su plantilla o sección de entregables.
4. Si hay varios entregables, procesa cada uno con su módulo y etiqueta modelo, modo, referencias, ajustes y prompt.
5. Ejecuta el control de calidad del módulo. En una cadena imagen→vídeo, comprueba además que encuadre, identidad, aspecto y estado final de la imagen sean compatibles con su rol de entrada.
6. Presenta todos los entregables antes de formular una única pregunta final de ejecución que enumere con precisión qué imagen o vídeo puede lanzarse.

# Módulo completo 1 — GPT Image 2

**Nombre original:** `gpt-image-2-prompting`

**Descripción original:** Diseñar, desarrollar, optimizar, revisar y depurar prompts finales en inglés para GPT Image 2 en generación, edición, compositing, máscaras, referencias, fotorealismo, producto, retrato, publicidad, UI, infografías, tipografía y series consistentes. Tras entregar el prompt, ofrecer su ejecución opcional mediante Magnific MCP y usarla solo con confirmación explícita del usuario.


# Activación y alcance

Usar esta skill cuando el usuario quiera convertir una idea o un brief en un prompt profesional para GPT Image 2, mejorar un prompt existente, diagnosticar un resultado visual o preparar una de estas tareas:

- generación desde texto;
- edición total o quirúrgica de una imagen;
- composición de varias imágenes, transferencia de producto o *try-on*;
- edición guiada por máscara;
- fotografía editorial, conceptual o fotorrealista;
- producto, *beauty*, retrato, moda, publicidad, packaging o portada;
- UI, dashboard, infografía, cartel o pieza con texto dentro de la imagen;
- series que deban conservar identidad o lenguaje visual.

Actuar como director de arte y editor de prompts. Convertir el brief en decisiones visibles, jerarquizadas y comprobables; no producir una lista de adjetivos ni confundir el prompt creativo con los parámetros técnicos.

Todos los prompts finales, variantes y prompts de iteración se entregan en **inglés** y dentro de un bloque de código. La explicación, las preguntas y el diagnóstico pueden escribirse en el idioma del usuario.

Preparar el prompt no autoriza a generar la imagen. Después de entregar el prompt, ofrecer lanzarlo mediante Magnific MCP. Solo hacerlo tras una confirmación explícita posterior del usuario. No instalar, conectar, reconfigurar ni sustituir plugins, MCP o servicios por iniciativa propia.

# Qué usar

Usar como entradas, cuando sean relevantes: objetivo y uso final, sujeto y acción, formato, composición, relación de aspecto, texto literal, referencias adjuntas, identidad o geometría que preservar, elementos prohibidos y nivel de acabado. Si falta una decisión secundaria, adoptar un valor razonable y declararlo; preguntar solo cuando la ausencia cambie materialmente el resultado, por ejemplo el texto exacto, el rol de una referencia o qué debe permanecer intacto.

Elegir un dialecto de prompt según el trabajo:

| Trabajo | Orden recomendado |
|---|---|
| Editorial o conceptual | Scene → Subject → Important details → Use case → Constraints |
| Producto, retrato o beauty | Subject → Surface/environment → Light → Composition → Material/style → Text/constraints |
| Edición quirúrgica | Change only → Preserve exactly → Integrate physically → Constraints |
| Compositing o try-on | Image roles → Transfer instruction → Destination → Perspective/scale/occlusion → Preserve |
| UI, infografía, anuncio o packaging | Artifact/canvas → Information hierarchy → Exact copy → Typography/layout → Visual language → Constraints |

Mantener disponibles estos contratos de redacción, eliminando los campos que no representen una decisión real:

```text
Scene:
[real place, time of day, background, weather, and atmosphere]

Subject:
[main subject and visible action]

Important details:
[materials, clothing, props, texture, light, framing, scale, and perceptual camera feel]

Use case:
[editorial photograph, cover, report, or concept frame]

Constraints:
[what must not be invented or added, plus concrete exclusions and invariants]
```

```text
Create [deliverable] of [subject, product, or person].
Surface and environment: [base, backdrop, context, foreground, midground, and background].
Light: [source, direction, softness, contrast, and color temperature].
Composition: [framing, viewpoint, subject position, and negative space].
Material and finish: [surface behavior, texture, wear, reflections, and contact shadow].
Style anchor: [one coherent visual language expressed through visible traits].
Text: EXACT TEXT "[COPY]" with [type character, scale, color, alignment, and placement].
Constraints: [geometry, identity, label, no extra logos, no duplicate text, and no watermark].
```

```text
Change only:
[the exact object, color, clothing, weather, light, or background to change]

Preserve exactly:
[identity, face, body, object geometry, label, pose, hands, camera angle, framing, layout, background objects, lighting direction, and existing text]

Integrate the change:
[match scale, perspective, occlusion, contact shadows, reflections, texture, grain, and color temperature]

Constraints:
No redesign. No new objects. No extra text, logos, or watermark.
```

```text
Image 1: [base scene or person]; preserve [identity, camera, background, and light].
Image 2: [product, garment, or object]; take [shape, construction, color, proportions, and label].
Image 3: [style or palette reference]; take only [palette, edge treatment, texture, or another named trait].

Instruction:
[Place, dress, or insert the element from Image 2 into Image 1 at an exact position].
Match perspective, scale, occlusion, contact shadows, reflections, texture, grain, and color temperature.
Keep the base scene otherwise unchanged. Do not add accessories, logos, text, or unrelated objects.
```

```text
Create a [poster, package, magazine cover, or social ad] for [use and audience].
Canvas: [aspect ratio, background, grid, margins, and negative space].
Hero: [subject or product, position, scale, and visual priority].
Hierarchy: [headline first, subhead second, small metadata third].
Exact text, verbatim, no extra words:
Headline: "[COPY]"
Subhead: "[COPY]"
Typography: [type character, size hierarchy, alignment, contrast, and placement].
Visual language: [palette, materials, light, texture, and one style anchor].
Constraints: no duplicate text, invented claims, extra logos, or watermark.
```

```text
Create a [mobile screen, dashboard, or infographic] for [audience and purpose].
Canvas and grid: [ratio, margins, columns, card geometry, and alignment].
Hierarchy: [title, navigation, cards, chart or diagram, CTA, and footer].
Exact labels only: "[LABEL 1]", "[LABEL 2]", "[LABEL 3]".
State: [loading, empty, active, or error; specify what is selected or checked].
Typography: [type character, relative sizes, contrast, and spacing].
Visual language: [palette, icon language, borders, shadows, and density].
Constraints: readable copy, believable spacing, no extra labels, and no real branding unless supplied.
```

Para una serie, crear y reutilizar literalmente este bloque, modificando únicamente sujeto, acción o entorno cuando corresponda:

```text
Style block — reuse verbatim across the series:
[medium or photographic language], [palette], [light direction and softness], [contrast], [material behavior], [edge, brush, or film treatment], [background density], [negative-space rule], [retouching level].
```

Mantener los ajustes técnicos fuera del prompt creativo:

- **Image API:** usar `gpt-image-2`; `images.generate` para texto a imagen y `images.edit` para editar, combinar referencias o trabajar con máscara.
- **Responses API:** usar la herramienta `image_generation` para conversación y refinamientos; `action: "auto"` permite decidir entre crear y editar, `"generate"` fuerza generación y `"edit"` requiere una imagen en contexto. No confundir la selección directa de `gpt-image-2` en Image API con la selección gestionada por la herramienta de Responses.
- **Calidad:** `low` para exploración, `medium` para producción general, `high` cuando texto, identidad, integración o composición sean críticos, y `auto` si no hay una preferencia fundada.
- **Tamaño:** `auto` o `WIDTHxHEIGHT`; ambos lados divisibles por 16, relación máxima 3:1, lado máximo 3840 px y entre 655.360 y 8.294.400 píxeles totales. Más de `2560x1440` es experimental. Tamaños útiles incluyen `1024x1024`, `1536x1024`, `1024x1536`, `2048x2048`, `2048x1152`, `3840x2160` y `2160x3840`.
- **Salida:** `png`, `jpeg` o `webp`; PNG es el formato predeterminado, JPEG suele ser más rápido y `output_compression` solo corresponde a JPEG/WebP. Definir `n` según necesidad y presupuesto.
- **Fondo:** solo `opaque` o `auto`. GPT Image 2 no admite `background: "transparent"`; si se necesita transparencia, pedir un fondo opaco limpio y planificar el recorte posterior.
- **Fidelidad de entrada:** es automática en GPT Image 2; no enviar `input_fidelity`.
- **Máscara:** debe compartir formato y dimensiones con la primera imagen, pesar menos de 50 MB y tener canal alfa. Orienta la edición, pero no garantiza precisión píxel a píxel; con varias entradas se aplica a la primera imagen.

Cuando el usuario autorice la generación, usar exclusivamente herramientas disponibles y verificables de **Magnific MCP**. Resolver sus nombres completos en el registro vivo —el namespace o prefijo puede variar— y localizar las operaciones cuyo nombre o descripción corresponda a `magnific_account_balance`, `magnific_creations_upload_file`, `magnific_images_models_list`, `magnific_images_generate` y `magnific_creations_show`. Inspeccionar el esquema real antes de cada llamada; no inventar nombres de herramientas, modelos, campos ni valores.

El flujo Magnific concreto es:

1. Consultar `account_balance` antes de cualquier generación de pago. Si no hay saldo o el servicio impide generar, informar y detenerse.
2. Si existen referencias locales o adjuntas, importarlas una a una con `creations_upload_file` y conservar los identificadores devueltos. No subir archivos antes de la confirmación.
3. Consultar `images_models_list` buscando `GPT Image 2`. Copiar literalmente el `slug` o modo y los valores de calidad/resolución que devuelva el catálogo. Si el modelo exacto no aparece, detenerse y pedir permiso antes de sustituirlo por otro; no usar selección automática como sustitución silenciosa.
4. Llamar una sola vez a `images_generate` con el prompt inglés sin alterarlo, el modo exacto, las referencias en el orden del mapa y únicamente la relación de aspecto, resolución, calidad y cantidad que admita ese esquema. Una confirmación autoriza **una sola llamada de generación**; usar una imagen por defecto salvo que el usuario haya pedido explícitamente otra cantidad.
5. Invocar `creations_show` para consultar el estado y los metadatos de todos los identificadores devueltos; su respuesta no se considera una previsualización. Mientras el estado sea activo, volver a invocarlo hasta alcanzar un estado terminal, respetando el intervalo del conector o, si no existe, usando 15–30 segundos.
6. Si existe `creations_wait`, usarlo entre consultas, pero volver a invocar `creations_show` después de cada espera y una última vez al terminar. Un timeout de consulta no es un estado terminal ni autoriza otra generación. Solo tras un estado terminal satisfactorio, extraer el asset final desde `images_generate`, `creations_wait`, el último `creations_show` o la capacidad de recuperación/descarga que exponga el conector. Ante fallo o cancelación terminal, informar sin reintentar automáticamente.
7. Mostrar cada imagen dentro del chat. Usar una vista multimedia nativa si existe; si no renderiza, descargar el asset a una ruta local accesible y adjuntarlo inline mediante `![Imagen generada](<ruta-local-absoluta>)`. Verificar visualmente que la respuesta contiene la imagen, no solo un identificador, URL o enlace. Si no se puede recuperar el asset, informar de un fallo de entrega y no declarar completada la generación.

El esquema activo de Magnific prevalece para la ejecución. Los tamaños de la Image API pueden necesitar traducirse a `aspectRatio` y a una resolución admitida por el modelo de Magnific; no enviar campos de la API de OpenAI si Magnific no los expone. Si el esquema activo fija un máximo de referencias o de resultados, obedecerlo y explicarlo cuando afecte al brief.

# Pasos a seguir

1. **Leer y clasificar el encargo.** Determinar si es `generate`, `edit`, `composite`, `mask`, producto, retrato, publicidad, UI/infografía o serie consistente. Identificar el entregable y su uso real.
2. **Construir el contrato visual.** Fijar una tesis dominante —qué debe leer primero el espectador—, sujeto y verbo visual, composición y jerarquía espacial, detalles obligatorios, invariantes, prohibiciones y función exacta de cada referencia.
3. **Mapear las referencias.** Usar `Image 1`, `Image 2`, etc., en el mismo orden que los archivos. Para cada una, indicar qué se toma, dónde se transfiere y qué no se copia. No adoptar como universal ningún límite de referencias anunciado por interfaces de terceros; obedecer el límite real de la herramienta activa.
4. **Elegir el dialecto.** Usar el contrato adecuado de la sección anterior. Para una escena simple, redactar un párrafo natural de 2–5 frases. Para jerarquía, texto, varias referencias o invariantes, usar secciones breves con saltos de línea. Reservar una estructura tipo JSON para varias entidades y posiciones que realmente necesiten revisión estructural.
5. **Redactar por prioridad visual.** Colocar primero escena, sujeto, acción y composición; después materiales, luz, textura, escala, texto y restricciones. Sustituir adjetivos genéricos por hechos observables y resolver cualquier mezcla de estilos indicando cuál domina y cómo se ve.
6. **Aplicar las reglas específicas.**
   - En texto dentro de la imagen, escribir `EXACT TEXT` o `verbatim`, poner el copy entre comillas o en mayúsculas, asignarle una sola ubicación y definir jerarquía, carácter tipográfico, contraste, alineación y escala relativa. Añadir `no extra words` y `no duplicate text` cuando la exactitud sea crítica.
   - En edición, separar siempre qué cambia, qué se conserva exactamente y cómo se integra físicamente. Repetir las invariantes en cada iteración.
   - En compositing, fijar destino, perspectiva, escala, oclusión, sombra de contacto, reflejos, textura, grano y temperatura de color para evitar el efecto de elemento pegado.
   - En máscaras, describir el reemplazo como si se diseñara desde cero y declarar también la intención del área enmascarada.
7. **Separar prompt y configuración.** No contaminar la instrucción creativa con parámetros de API. Recomendar operación, modelo, calidad, tamaño, fondo, formato, compresión, cantidad, referencias y máscara en un bloque aparte.
8. **Ejecutar el control interno incorporado.**
   - Tratar como error un prompt de menos de 20 caracteres, un tamaño inválido o una petición de transparencia.
   - Si supera 5000 caracteres, advertir y podar variables o dividir la revisión.
   - Confirmar que nombra escena/fondo/superficie, sujeto y composición/encuadre/jerarquía.
   - Detectar y reemplazar expresiones vagas como `beautiful`, `stunning`, `gorgeous`, `epic`, `masterpiece`, `high quality`, `ultra detailed`, `more premium` o `make it pop`.
   - Detectar conflictos como `photoreal + watercolor`, `photoreal + flat vector`, `documentary + glossy beauty ad` o `minimalist + maximalist`; elegir un dominante o explicar de forma visible la mezcla.
   - Si aparece `same style as before`, sustituirlo por un Style block explícito.
   - Si se usan cifras de lente o apertura, añadir el resultado perceptual: encuadre, distancia aparente, profundidad de campo y luz; no prometer simulación óptica exacta.
   - Para edición, composición o máscara, comprobar tanto preservación como integración física.
   - Si hay texto, comprobar copy literal, posición, jerarquía y no duplicación; comparar `medium`/`high` si es pequeño o denso.
   - Si una referencia no aparece como `Image N` con rol definido, corregir el mapa.
   - Convertir cualquier `negative prompt` genérico en restricciones concretas dentro del prompt.
   - Rechazar `input_fidelity`; para una edición crítica, advertir si se propone `low`.
9. **Entregar una recomendación principal.** Ofrecer alternativas solo si cambian materialmente la operación, el uso o la composición. Añadir una única siguiente iteración si existe un riesgo claro.
10. **Ofrecer Magnific.** Preguntar si el usuario quiere lanzar el prompt con Magnific MCP. No ejecutar mientras la respuesta no sea afirmativa e inequívoca.
11. **Generar solo tras la confirmación.** Resolver el namespace Magnific disponible y seguir, en orden, `account_balance` → carga de referencias locales con `creations_upload_file` → `images_models_list` buscando GPT Image 2 → una llamada a `images_generate` → espera del estado terminal → recuperación del asset → previsualización inline en el chat. `creations_show` puede ayudar a consultar estado o metadatos, pero nunca sustituye la previsualización. Si Magnific no está disponible, no está conectado, requiere autenticación, no expone GPT Image 2 o no permite recuperar el asset final, explicarlo con precisión y detenerse; no instalar nada, no activar modo automático y no cambiar de proveedor o modelo sin permiso.
12. **Iterar de forma diagnóstica.** Clasificar el fallo como contenido, layout, identidad, texto, materialidad, luz o integración. Cambiar una sola variable principal por turno, mantener referencias, tamaño y calidad durante la comparación y modificar calidad, tamaño o composición solo cuando el contenido esté estable.

# Entregables

Entregar siempre, en este orden y con el nivel de detalle proporcional al encargo:

1. **Lectura del brief:** una síntesis breve de la tesis visual y el dialecto elegido.
2. **Operación y ajustes:** operación/API prevista, `gpt-image-2` cuando corresponda, calidad, tamaño, formato, fondo, compresión, cantidad, referencias y máscara. Omitir campos irrelevantes.
3. **Mapa de referencias:** solo si hay imágenes; enumerarlas en el orden real e indicar `usar`, `preservar` y `no copiar`.
4. **Prompt final:** una recomendación principal, íntegramente en inglés y dentro de un bloque de código listo para copiar. No mezclar comentarios en español dentro del bloque.

```text
[FINAL ENGLISH PROMPT]
```

5. **Control de calidad:** entre 3 y 6 comprobaciones relevantes y concretas.
6. **Siguiente iteración:** solo si hay un riesgo claro; formularla como una única instrucción en inglés dentro de su propio bloque de código.
7. **Oferta de ejecución:** cerrar con una pregunta equivalente, en el idioma del usuario, a: «¿Quieres que lo lance ahora mediante Magnific MCP y generemos la imagen?»

Si el usuario confirma, ejecutar el flujo Magnific descrito y devolver cada resultado como imagen visible dentro del chat, junto con los parámetros que realmente se usaron. `creations_show`, un ID o un enlace no bastan. Si la herramienta no renderiza, recuperar o descargar el asset y adjuntarlo desde una ruta local absoluta. Si devuelve varias imágenes, previsualizarlas todas e identificarlas con claridad sin afirmar que una es mejor antes de revisarlas.

# Consideraciones

- Mantener una única tesis visual. No mezclar fotografía documental, acuarela, render 3D, lujo *glossy* y collage editorial salvo que el usuario pida la mezcla y se establezca un lenguaje dominante.
- Traducir cada estilo a rasgos observables: paleta, bordes, textura, contraste, luz, tratamiento de materiales, densidad y espacio negativo. Un nombre de estilo por sí solo no dirige la imagen.
- Nombrar objetos reales y estados concretos —por ejemplo, un monitor CRT de 1992 o aluminio cepillado—; el ambiente emocional no sustituye al sujeto.
- Describir la cámara como resultado perceptual —sensación documental de 35 mm, plano medio, fondo suavemente desenfocado— y no como una promesa matemática basada en lente, apertura u “8K”.
- Como heurística de estabilidad, si el brief contiene más de 4–6 sujetos o acciones independientes, simplificarlo o dividirlo en referencias/composiciones. No presentarlo como límite técnico.
- Como heurística tipográfica, mantener cada bloque de texto idealmente por debajo de 20 palabras y separar titulares, subtítulos y metadatos. Para body copy, tablas o muchas etiquetas, advertir que la imagen será aproximada y proponer generar el layout primero y añadir el texto exacto en composición posterior.
- Una máscara guía la zona de trabajo, no garantiza obediencia píxel a píxel. En cada edición, repetir la lista de preservación para limitar deriva de identidad, geometría, pose, cámara, fondo, luz y texto.
- Para una serie, conservar literalmente el Style block y reanclar la identidad cuando sea relevante; no confiar solo en “same style”.
- Diagnosticar antes de reescribir: un resultado genérico necesita objetos, materiales, luz, escala y uso final; un estilo incoherente necesita un dominante; una edición excesiva necesita una sola operación y preservaciones; un composite pegado necesita perspectiva, escala, oclusión, sombras y grano; un texto erróneo necesita copy breve y literal; una UI caótica necesita canvas, grid, estado, jerarquía y labels exactos.
- No pedir a la vez “más premium, más realista, cambia la ropa, arregla el texto y mejora el fondo”. Una revisión debe medir un cambio principal.
- Las reglas de redacción son heurísticas. Para límites, modelos y campos de ejecución, el esquema actual de la API o de Magnific MCP tiene prioridad. Si contradice una configuración aquí descrita, informar de la diferencia y usar solo valores realmente admitidos.
- La pregunta sobre Magnific es una solicitud de autorización, no una formalidad. Una respuesta ambigua no basta; no generar, no consumir créditos y no enviar imágenes a un servicio externo hasta recibir un sí explícito. Una confirmación permite una sola llamada de generación; cualquier nueva variante o reintento requiere otra confirmación.

# Módulo completo 2 — MiniMax H3 MAX

> **Condición obligatoria:** este módulo usa exclusivamente **MiniMax H3 MAX**. No seleccionar, generar ni sustituir por el modelo estándar anterior. Si MAX no está disponible en la interfaz o en Magnific, detenerse e informarlo.

**Nombre del módulo:** `minimax-h3-max-prompting`

**Descripción del módulo:** Diseñar, optimizar, revisar y depurar prompts profesionales en inglés para MiniMax H3 MAX, incluidos T2V, primer o último fotograma, first/last frame, imagen de referencia, referencias multimodales, edición y MiniMax H3 MAX Context-IR; usar cuando haya que controlar acción, física, cámara, continuidad, identidad, ritmo, audio o texto, y ofrecer después una generación opcional mediante Magnific MCP.


## Activación y alcance

Usar esta skill cuando el usuario quiera convertir una idea, guion, storyboard, imagen, vídeo, audio, prompt previo o combinación de referencias en un prompt listo para MiniMax H3 MAX. También aplica al análisis de resultados fallidos y a la revisión, traducción funcional u optimización de prompts existentes.

Cubre estos modos, que deben distinguirse antes de redactar:

- **Text-to-video (T2V, habitualmente `t2va`):** el vídeo parte únicamente de texto.
- **Image-to-video con primer fotograma (I2V):** una imagen fija el estado, la composición y la pose iniciales; el prompt describe cómo evoluciona desde ella.
- **Último fotograma:** una imagen fija el estado de llegada; el prompt construye una transición físicamente plausible hasta él.
- **First/last frame:** dos imágenes actúan como anclas inicial y final de una única transición continua.
- **Imagen de referencia / Ref2VA:** una o varias imágenes aportan identidad, apariencia, producto, personaje, objeto, localización, estilo u otro atributo, pero no tienen por qué ser el primer ni el último fotograma. Este modo actual, expuesto habitualmente como `r2va`, es independiente de first/last frame y no debe confundirse con él.
- **Reference-to-video multimodal (R2V/Ref2VA):** imágenes, vídeos y/o audios aportan funciones concretas como identidad, movimiento, coreografía, cámara, ritmo, voz o estilo.
- **Edición o regeneración:** se describe el material base, el cambio y todo lo que debe conservarse.
- **MiniMax H3 MAX — Context-IR:** se usa contexto multimodal para producir un prompt enriquecido; no genera el vídeo por sí solo.

MiniMax H3 MAX es un sistema de vídeo. No afirmar que el modo de imagen de referencia genera una imagen fija: usa una imagen como referencia para generar vídeo.

La tarea de prompting termina al entregar el prompt. La generación en Magnific es un segundo paso externo, potencialmente sujeto a créditos: no ejecutarlo hasta que el usuario lo confirme expresamente después de ver el prompt.

## Qué usar

### Información mínima del brief

Extraer o inferir de forma prudente:

- objetivo del plano y plataforma de destino;
- modo MiniMax H3 MAX e interfaz concreta: MiniMax web/API, ComfyUI, Magnific u otra;
- duración, relación de aspecto y resolución deseadas;
- sujeto dominante, acción principal y estado final visible;
- referencias disponibles, en orden de carga, y una función inequívoca para cada una;
- elementos que deben conservarse y elementos que deben ignorarse;
- encuadre, trayectoria de cámara, iluminación, paleta y textura;
- voz, diálogo literal, música, efectos, ritmo y texto en pantalla, si aplican.

Si faltan detalles menores que no cambian el concepto, inferirlos y declararlos brevemente. Preguntar solo por decisiones que alteren de forma material el modo, la acción, las referencias o el resultado.

### Mapa de referencias

Asignar nombres consistentes y roles individuales. En interfaces que admitan notación textual genérica, usar `@Image 1`, `@Video 1` y `@Audio 1`, con espacio entre tipo y número. No exigir que todas las referencias aparezcan simultáneamente.

- **Primer fotograma:** autoridad sobre composición, identidad, vestuario, diseño, pose y estado inicial. Describir movimiento desde ese estado sin reimaginar el fondo.
- **Último fotograma:** autoridad sobre el estado de llegada. Diseñar una causa y una trayectoria que permitan alcanzarlo.
- **First/last frame:** asignar cada ancla por separado y conservar eje, identidad y continuidad. Si son incompatibles, proponer una transición intermedia visible.
- **Imagen de referencia:** declarar qué aporta —por ejemplo, solo identidad, apariencia de producto, vestuario o estilo— y qué no debe copiarse —por ejemplo, fondo, pose, encuadre o luz—. No tratarla como fotograma inicial salvo que el usuario lo pida y la interfaz la cargue con ese rol.
- **Vídeo de referencia:** especificar si aporta movimiento, coreografía, física, cámara o ritmo.
- **Audio de referencia:** especificar si aporta voz, diálogo, música, efectos o sincronía. No usarlo como única referencia cuando la interfaz exija acompañamiento visual.

En una API, usar únicamente los roles que su esquema vigente declare —por ejemplo, primer fotograma, último fotograma o imagen de referencia—. No inventar nombres de campos.

En el workflow nativo de ComfyUI para R2V, conectar `Load Image -> IMAGE` a `ref_image_0` y nombrarla `<Picture 1>` dentro del prompt. Las siguientes entradas se asignan como `ref_image_1 -> <Picture 2>` y `ref_image_2 -> <Picture 3>`. No escribir `@Image1` para ese nodo. Si la imagen sirve solo para identidad, indicarlo literalmente y excluir fondo, pose, ropa, encuadre y luz si no deben heredarse. La opción `ref_image_size=max` prioriza fidelidad; `match` puede reducir coste y tiempo. Verificar siempre que estos nombres sigan vigentes en el workflow instalado.

### Arquitectura del prompt

**Contrato exclusivo de MiniMax H3 MAX:** usar una estructura compacta y causal. El prompt final no puede superar **2.999 caracteres**, contando espacios, saltos de línea, encabezados internos, referencias, diálogo y texto en pantalla. Medir el bloque final exacto antes de entregarlo y mostrar `X/2.999 caracteres` en los ajustes. Si excede el límite, eliminar repetición, estilo ornamental y beats secundarios, conservando sujeto, acción, física, cámara, continuidad y estado final. No usar la arquitectura maestra de 17 bloques de Seedance.

Redactar en orden causal y con acciones observables:

```text
[SHOT OBJECTIVE] Define one subject and one principal action.
[ACTION] Describe 2–4 chronological beats: initial state, visible change, physical consequence, final state.
[ENVIRONMENT AND PHYSICS] State how materials, clothing, liquid, smoke, dust, light, or nearby objects react.
[CAMERA] Specify shot size, one dominant trajectory, speed, height, distance, and relationship to the subject; add one compatible adjustment only if needed.
[LOOK] Define lighting, palette, texture, and visual treatment.
[AUDIO] Define speaker, language, exact dialogue, voice intent, effects, music, rhythm, or silence when supported.
[CONTINUITY AND CONSTRAINTS] State what remains fixed, what must be ignored, quantities, orientation, label legibility, and spatial continuity.
[FINAL STATE] End on a concrete, visible composition.
```

Convertir etiquetas vagas en mecánica visible. En lugar de limitarse a “a man runs”, describir que acelera, inclina el torso, impulsa cada zancada y frena junto a un punto concreto. Expresar causa y efecto: un pie desplaza agua, la tela sigue el giro, el polvo se levanta tras el impacto o un objeto rueda después del golpe.

Para personas, fijar postura, dirección, manos, mirada, equilibrio y contacto con objetos. Para producto, fijar orientación, legibilidad de etiqueta, posición y estado final. No sobrecargar pocos segundos con demasiadas expresiones o eventos.

Usar un plano continuo por defecto. Elegir una trayectoria de cámara dominante; no combinar órbita, whip-pan, zoom, descenso de dron, rack focus y handheld en el mismo clip. Los comandos `[pan]`, `[zoom]` y `[static]` son opcionales: colocarlos inmediatamente después de la descripción a la que afectan y solo si la interfaz/modelo vigente los admite.

### Verificación de capacidades

Antes de prometer modos, límites o parámetros, comprobar el esquema actual de la interfaz. El límite de **2.999 caracteres** es un contrato obligatorio de esta skill para MiniMax H3 MAX. Los demás valores siguientes proceden de documentación de la familia y deben confirmarse en el esquema vigente:

- modelo objetivo obligatorio: **MiniMax H3 MAX**. Resolver el identificador o `slug` exacto en la API o catálogo vigente; no enviar el identificador del modelo estándar anterior ni inventar un slug para MAX;
- duración documentada: enteros de 4 a 15 segundos;
- resolución documentada: 768P;
- prompt final: máximo absoluto de **2.999 caracteres**, incluyendo espacios, saltos de línea, etiquetas de referencias, diálogo y texto en pantalla;
- hasta 9 imágenes;
- hasta 3 vídeos, con un total máximo de 15 segundos;
- hasta 3 audios, con un total máximo de 15 segundos;
- máximo combinado documentado: 12 archivos;
- el audio de referencia debe acompañar a una imagen o vídeo;
- imágenes de 256 a 5760 px por lado y relación entre 2:5 y 5:2;
- tamaño máximo documentado: 30 MB por imagen, 50 MB por vídeo, 15 MB por audio y 64 MB para el cuerpo de la API;
- en T2V directo, la relación de aspecto es obligatoria y no puede ser `adaptive`; con imagen suele derivarse de ella.

Estos son límites de la documentación directa y no una garantía para adaptadores de terceros. Magnific puede exponer variantes de MiniMax H3 MAX con duraciones, resoluciones, longitudes de prompt, cantidades de referencias o incompatibilidades diferentes. En Magnific, el catálogo y el esquema disponibles en el momento de ejecutar son la autoridad.

### Magnific MCP

Localizar siempre las herramientas en el registro vivo y leer su esquema antes de llamarlas. En el registro comprobado al crear esta skill, el namespace y las capacidades habituales son:

- `mcp__codex_apps__magnific_account_balance`: comprobar plan y créditos antes de una generación de pago;
- `mcp__codex_apps__magnific_creations_upload_file`: importar una referencia local o adjunta y obtener un identificador de creación utilizable;
- `mcp__codex_apps__magnific_video_plan`: planificar la petición de vídeo a partir del brief original del usuario;
- `mcp__codex_apps__magnific_video_models_list`: buscar `MiniMax H3 MAX`, leer límites y copiar literalmente el `slug` de la variante elegida;
- `mcp__codex_apps__magnific_video_generate`: ejecutar una generación con el prompt final y únicamente los campos admitidos;
- `mcp__codex_apps__magnific_creations_wait`: esperar una creación en curso cuando esté disponible;
- `mcp__codex_apps__magnific_creations_show`: consultar estado y metadatos de la creación; no asumir que muestra el vídeo dentro del chat.

Estos nombres reflejan el registro vivo comprobado, no una autorización para invocarlos ni una garantía de que permanezcan idénticos en otra instalación. Si no aparecen, buscar la capacidad Magnific equivalente en el inventario disponible; no inventar un nombre, no instalar nada y no sustituir otro servicio.

Para comprobar cambios, usar documentación oficial vigente de MiniMax y el workflow oficial de ComfyUI; las URLs conocidas son:

- `https://platform.minimax.io/docs/guides/video-generation`
- Para documentación y workflows, localizar la variante oficial vigente de **MiniMax H3 MAX** en MiniMax y ComfyUI. No reutilizar automáticamente repositorios, nodos o workflows del modelo estándar anterior.

## Pasos a seguir

1. **Clasificar la petición.** Determinar si el usuario quiere desarrollar una idea, obtener un prompt final, revisar uno existente o diagnosticar un resultado.
2. **Resolver un brief insuficiente.** Si el brief es pobre y no se pide expresamente un prompt final, ofrecer 2–3 direcciones creativas, recomendar una y formular como máximo tres preguntas decisivas. No redactar todavía el prompt completo. Si el usuario sí pide el prompt final, avanzar con supuestos menores explícitos.
3. **Identificar la interfaz y el modo.** Elegir entre T2V, I2V de primer fotograma, último fotograma, first/last frame, imagen de referencia, R2V multimodal, edición/regeneración o Context-IR. Si la interfaz no está indicada, redactar un prompt de contenido portable y marcar los ajustes técnicos pendientes de verificación.
4. **Inventariar las entradas.** Ordenarlas, asignar una sola función principal a cada una y declarar qué se conserva y qué se ignora. Si una referencia tiene dos funciones, decirlo explícitamente.
5. **Separar anclas de referencias.** Un fotograma inicial o final fija un punto temporal; una imagen de referencia aporta atributos sin fijar necesariamente ese punto. No mezclar `keyframes` y referencias si el esquema actual los declara incompatibles.
6. **Diseñar la acción.** Reducir el clip a una acción principal que quepa en la duración y dividirla en 2–4 beats: estado inicial, transformación, reacción física y final visible.
7. **Diseñar cámara y continuidad.** Elegir un encuadre y una trayectoria dominante compatibles con la acción. Mantener eje, escala, dirección, identidad, cantidad de sujetos, posición de objetos y contacto físico.
8. **Redactar en inglés y dentro del límite.** Seguir la jerarquía objetivo -> sujeto y acción -> entorno y física -> cámara -> luz/estilo -> audio/texto -> continuidad/restricciones -> estado final. Mantenerlo compacto y por debajo de 2.999 caracteres. No incorporar la estructura extensa de Seedance.
9. **Aplicar la sintaxis del destino.** Usar los nombres de referencias y campos confirmados por la interfaz. En ComfyUI R2V usar `<Picture N>`; en API o Magnific seguir el esquema real, no una notación memorizada.
10. **Controlar calidad.** Verificar que:
    - el modo coincide con los inputs y sus roles;
    - hay un sujeto y una acción principal realizable en la duración;
    - cada beat importante produce una consecuencia o estado visible;
    - la cámara mantiene una trayectoria legible;
    - las restricciones son positivas, concretas y no contradictorias;
    - no se inventaron capacidades, parámetros, referencias, diálogos ni sujetos;
    - en I2V se describe movimiento, en first/last frame se describe el puente y en imagen de referencia se define la función sin convertirla accidentalmente en ancla;
    - diálogo, cantidades, comandos de cámara, texto, continuidad y estado final coinciden con el brief;
    - el bloque final se ha contado exactamente y no supera 2.999 caracteres.
11. **Entregar el prompt.** Presentar una sola versión final en inglés dentro de un bloque de código, salvo que el usuario pida variantes.
12. **Ofrecer Magnific.** Después de la entrega, preguntar: **“¿Quieres que lo lance en Magnific con MiniMax H3 MAX y genere el vídeo?”** No llamar a herramientas de generación antes de recibir un sí inequívoco.
13. **Ejecutar mediante Magnific solo tras confirmación.** Localizar en el inventario real las herramientas Magnific MCP disponibles y leer sus esquemas. Usar `mcp__codex_apps__magnific_account_balance` si sigue disponible para comprobar saldo/créditos. Llamar primero a `mcp__codex_apps__magnific_video_plan` con el brief original del usuario, conservado literalmente, salvo que el usuario haya pedido explícitamente “one-shot” o “generar sin plan”. Después consultar `mcp__codex_apps__magnific_video_models_list` buscando `MiniMax H3 MAX` y copiar literalmente el `slug` de la variante elegida. Si MiniMax H3 MAX no está disponible, informarlo y no sustituirlo silenciosamente.
14. **Preparar referencias en Magnific.** Resolver cada archivo o creación con las herramientas reales de carga o selección; para un archivo local o adjunto, usar `mcp__codex_apps__magnific_creations_upload_file` si su esquema vigente corresponde. Mapear primer/último fotograma a `keyframes.start`/`keyframes.end` y las imágenes de identidad/apariencia a `references[]` con tipo `image` solo cuando así lo declare el catálogo. Respetar cualquier incompatibilidad entre keyframes y referencias. No enviar un enlace de página cuando el esquema exija un identificador de creación o URL de activo.
15. **Generar, refrescar y mostrar.** Llamar a `mcp__codex_apps__magnific_video_generate` si está disponible, enviando el prompt final y únicamente parámetros admitidos y validados —modelo, duración, ratio, resolución, referencias y demás opciones compatibles—. Una autorización equivale a una sola generación: no lanzar variantes, segundos intentos ni reintentos que consuman créditos sin una nueva confirmación. En cuanto exista un identificador, invocar `mcp__codex_apps__magnific_creations_show`. Mientras indique un estado activo, usar `mcp__codex_apps__magnific_creations_wait` si está disponible y volver a invocar `mcp__codex_apps__magnific_creations_show` después de cada espera; si no hay espera dedicada, repetir `creations_show` con el intervalo indicado por el conector o, en su ausencia, cada 15–30 segundos. Hacer una consulta final al llegar a un estado terminal; un timeout aislado no es terminal. Solo si termina satisfactoriamente, recuperar el asset desde la respuesta de generación, espera, último show o descarga. Mostrar el vídeo dentro del chat mediante una vista multimedia nativa o, si no renderiza, descargarlo a una ruta local accesible y adjuntarlo inline como `![Vídeo generado](<ruta-local-absoluta>)`. Verificar que el reproductor o la previsualización sean visibles. No terminar con solo un ID, estado, URL o enlace; ante fallo, cancelación o imposibilidad de recuperar el asset, informar del fallo exacto sin iniciar otra generación. No instalar ni configurar Magnific si faltan herramientas.

## Entregables

### Desarrollo creativo

Entregar:

- lectura breve del objetivo y las restricciones;
- 2–3 direcciones diferenciadas;
- una recomendación razonada;
- la siguiente decisión o hasta tres preguntas decisivas.

No incluir un prompt final hasta que exista una dirección suficiente, salvo que el usuario lo haya solicitado expresamente.

### Prompt final

Entregar en este orden:

1. **Modo y ajustes:** modo MiniMax H3 MAX, duración, ratio, resolución, interfaz y recuento exacto `X/2.999 caracteres`; marcar como “por verificar” cualquier parámetro no confirmado.
2. **Mapa de referencias:** solo si aplica, con la función y exclusiones de cada input.
3. **Final prompt — English:** una única versión dentro de un bloque de código `text`.
4. **Comprobaciones:** 3–6 puntos breves sobre acción, física, cámara, continuidad, referencias y estado final.
5. **Pregunta de ejecución:** “¿Quieres que lo lance en Magnific con MiniMax H3 MAX y genere el vídeo?”

Formato obligatorio del prompt:

```text
[Write the complete production-ready MiniMax H3 MAX prompt in English here.]
```

Todo el lenguaje descriptivo del prompt final debe estar en inglés. Conservar literalmente nombres de marca, etiquetas, diálogo y texto en pantalla cuando el usuario exija una redacción exacta en otro idioma; contextualizarlos en inglés, por ejemplo indicando el idioma y el hablante. No entregar además una traducción española del prompt salvo petición expresa.

### Revisión o diagnóstico

Entregar:

- diagnóstico concreto del fallo;
- cambios aplicados y lo que se mantiene;
- prompt final corregido en inglés dentro de un bloque de código;
- comprobaciones de calidad;
- oferta de lanzamiento en Magnific.

Usar estas correcciones típicas:

- si cambia el sujeto, reducir personajes, fijar la referencia y repetir solo la identidad crítica;
- si la acción se corta o mezcla, eliminar beats secundarios y reforzar causa -> reacción -> final;
- si la cámara es inestable, conservar un solo movimiento y retirar comandos incompatibles;
- si la física falla, nombrar iniciador, dirección, material y consecuencia visible;
- si se reinterpreta una referencia, acotar su rol y separar lo que se conserva de lo que se ignora;
- si el texto sale ilegible, reducirlo, fijar contenido exacto y recomendar postproducción si es esencial;
- si el audio falla, separar voz, efectos y música, fijar prioridades y comprobar que existe una referencia visual compatible.

### MiniMax H3 MAX — Context-IR

Entregar el prompt enriquecido final en inglés dentro de un bloque de código y señalar cualquier supuesto añadido. Auditar que Context-IR no haya introducido identidad, acción, estilo, audio o restricciones no autorizadas. Recordar que su salida es un prompt, no un vídeo.

## Consideraciones

- Escribir acciones, no una acumulación de adjetivos. MiniMax H3 MAX necesita saber qué ocurre, en qué orden, qué reacción física produce y dónde termina el plano.
- Mantener una acción principal en clips cortos. Los tiempos pueden ordenar beats, pero no deben fingir precisión fotograma a fotograma.
- **Longitud MiniMax H3 MAX:** máximo absoluto de 2.999 caracteres en el bloque final. Contarlo después de la última edición; si se excede, podar redundancia y variables secundarias sin eliminar los locks críticos.
- Preferir restricciones positivas: “the bottle remains upright with the logo facing the camera” frente a largas listas de fallos.
- No repetir toda la apariencia ya fijada por una referencia; describir cómo se anima. Sí repetir identidad, continuidad u objetos críticos que podrían perderse.
- En una imagen de referencia, separar identidad, apariencia, producto, movimiento, cámara, estilo y audio. Una referencia de identidad no autoriza a copiar fondo, pose, ropa, encuadre o iluminación.
- En first/last frame, pedir una transición física continua; no pedir que MiniMax H3 MAX salte entre dos imágenes incompatibles.
- En edición, describir el vídeo base, el cambio solicitado y los invariantes. Para una regeneración o mejora 2K, verificar las exigencias vigentes del vídeo fuente y del campo de contenido antes de prometerla.
- Para diálogo, indicar idioma, hablante, intención y línea exacta entre comillas. Para texto en pantalla, fijar contenido, posición, duración y legibilidad; si es crítico, recomendar postproducción.
- Separar voz, efectos y música. No asumir que una opción de efectos generados está disponible porque MiniMax H3 MAX admita audio de referencia.
- No mezclar límites de MiniMax directo con límites de Magnific. Volver a leer el catálogo en cada ejecución y usar exclusivamente MiniMax H3 MAX; el modelo estándar anterior no es un sustituto permitido.
- La disponibilidad de referencias de imagen no implica que puedan combinarse con keyframes. Si el esquema actual las declara mutuamente excluyentes, pedir al usuario que elija entre anclas temporales y referencias de identidad/apariencia.
- No prometer una función ni enviar un campo hasta verlo en la documentación o esquema vigente. Si una capacidad es incierta, indicarlo y ofrecer una versión portable del prompt.
- La confirmación para generar autoriza una ejecución con los ajustes acordados, no reintentos ilimitados ni sustituciones de modelo. Ante fallo, cambio de precio, falta de créditos o necesidad de otro modelo, detenerse y pedir dirección.
- Si Magnific MCP no está disponible, está desconectado o no ofrece MiniMax H3 MAX, mantener la entrega del prompt y explicar que queda listo para copiar; no instalar nada ni crear una integración alternativa.

# Módulo completo 3 — Dreamina Seedance 2.5

**Nombre original:** `seedance-2-5-pro-prompting`

**Descripción original:** Diseñar, desarrollar, optimizar, revisar y depurar prompts de producción para Dreamina Seedance 2.5 en sus flujos de texto, imagen, vídeo, audio, edición, extensión y continuidad. Usar cuando el usuario necesite explorar una idea o recibir prompts finales en inglés listos para Seedance; ofrecer su ejecución mediante Magnific MCP únicamente después de entregar el prompt y obtener confirmación explícita.


## Activación y alcance

Activa esta skill cuando el usuario quiera convertir una idea, guion, storyboard, shot list o materiales de referencia en instrucciones profesionales para Dreamina Seedance 2.5, o cuando quiera revisar, optimizar o diagnosticar un prompt o una generación fallida de ese modelo.

El alcance incluye:

- desarrollo creativo previo para ideas todavía vagas;
- text-to-video;
- image-to-video y Omni/Multi-Reference;
- vídeo de referencia para movimiento, cámara, ritmo, interpretación, transición o sonido;
- audio-driven y uso multimodal de audio sin imagen o vídeo;
- first frame, first/last frame y secuencias con varios keyframes;
- vídeo ordinario, vídeo de 30 segundos y Long Video;
- Smart Edit, Edit with Marks y edición generativa de vídeo;
- extensión hacia delante o hacia atrás;
- transición entre dos clips;
- storyboard grid, blockout grueso o fino y One-Click Video;
- planos continuos, multishot, diálogo, actuación, física, continuidad, cámara, iluminación y sonido;
- auditoría de referencias, parámetros, factibilidad y fallos de una salida.

No actives esta skill para redactar prompts destinados principalmente a otro modelo. Si el usuario no ha identificado el modelo y la elección cambia la solución, pregunta cuál usará. Si Seedance 2.5 ya está implícito por el contexto, continúa sin fricción.

Esta skill redacta y revisa prompts. No autoriza por sí sola una generación externa. La petición de redactar un prompt tampoco autoriza a enviarlo a Magnific. Después de entregar el prompt final, ofrece el lanzamiento y espera una confirmación explícita antes de usar Magnific MCP.

## Qué usar

### Jerarquía de evidencia y capacidades

Trata como requisitos duros los datos oficiales y como recomendaciones las pautas de estabilidad o los patrones empíricos. La interfaz, los planes y los límites pueden cambiar; si el encargo depende de valores actuales, comprueba primero la documentación oficial de Dreamina:

- Dreamina Seedance 2.5 User Guide: https://bytedance.larkoffice.com/wiki/NjnWwvf4BiFYFLk2RzrcEgaunGf
- Dreamina Seedance 2.5 Prompt Guide: https://bytedance.larkoffice.com/docx/A88jd0B47oAd8zxWp5ycZFMfnxh

Capacidades documentadas en la especificación de partida:

| Elemento | Capacidad o límite |
|---|---|
| Entradas | Texto, imágenes, vídeo y audio; el flujo multimodal admite audio sin imagen o vídeo. |
| Prompt final | Hasta **10.000 caracteres**, contando espacios, saltos de línea, encabezados internos, referencias, diálogo y texto en pantalla. |
| Materiales totales | Hasta 50, sin superar el máximo de cada tipo. |
| Imágenes | Hasta 30; cada una no mayor de 4K; JPEG, PNG, WebP, BMP, TIFF, GIF, HEIC o HEIF. |
| Vídeos | Hasta 10; duración combinada máxima de 30 s; MP4 o MOV; 480p–4K; 24–60 fps; hasta 200 MB por vídeo. |
| Audios | Hasta 10; duración combinada máxima de 30 s; WAV o MP3; hasta 15 MB por audio. |
| Edición | Un único vídeo maestro más imágenes de referencia. |
| Geometría de entrada | Relación ancho/alto aproximada de 0,4 a 2,5; lados entre 300 y 6000 px. No usar Base64 para archivos grandes. |
| Vídeo ordinario | 4–30 s; la documentación de producto lo expresa como 97–721 frames. |
| Long Video | Generación directa de 30–180 s. |
| Extensión | Adiciones encadenadas para vídeos elegibles; resultado total documentado de hasta 60 s. |
| Salida | 480p o 720p. Aceptar una imagen 4K no implica salida 4K. |
| Idiomas priorizados | Chino, inglés, español, indonesio y malayo; también se documentan tailandés, árabe, portugués, vietnamita, japonés y coreano. |

Parámetros ligados a la tarea:

| Tarea | Relación de aspecto | Duración |
|---|---|---|
| Text/Omni Reference | Se elige en la interfaz o API. | Se elige dentro de lo disponible. |
| Edición de vídeo | Bloqueada al vídeo fuente. | Aproximadamente bloqueada al vídeo fuente; puede variar alrededor de 0,3 s. |
| First frame / first-last frame | Bloqueada a la primera imagen. | Configurable. |
| Extensión | Bloqueada al vídeo fuente. | Duración añadida configurable. |

Recomendaciones de estabilidad, no límites oficiales:

- Preferir 1–8 sujetos distintos en imágenes; 9–12 pueden funcionar con menor estabilidad.
- Para sujeto o movimiento en vídeo, preferir referencias de 5–10 s y 1–5 sujetos.
- Para edición, preferir un vídeo fuente menor de 20 s y 1–5 imágenes; 6–8 pueden ser menos estables.
- Con más de cinco sujetos y varias vistas, preferir imágenes separadas por vista. Varias imágenes monovista suelen ser más estables que un collage multivista.
- Recortar vídeos y audios a los segmentos realmente útiles.
- Usar el mínimo de materiales que controle identidad, estructura, movimiento, escena y sonido; no perseguir el máximo admitido.

### Inventario y sintaxis de referencias

Numera los materiales en el orden real de carga como `@Image N`, `@Video N` y `@Audio N`. Da a cada referencia un solo cometido claro y declara también qué debe ignorarse. Usa correspondencias individuales; no agrupes identidades distintas con “respectivamente”.

Para cada asset recurrente, prepara mentalmente un descriptor canónico y repítelo literalmente cada vez que esté activo:

- personaje: edad aparente, silueta, rostro/cabello, vestuario exacto y rasgo interpretativo estable;
- localización: arquitectura, materiales, puntos de anclaje, accesos, orientación y fuentes de luz motivadas;
- prop o producto: forma, material, escala, piezas, estado y propietario inicial;
- voz: idioma, acento o variedad, registro, textura, tempo y energía.

Separa el descriptor estable de la pose, emoción o acción variable del plano. Cuando varias imágenes representen al mismo sujeto u objeto, dilo y exige una sola instancia. Activa únicamente las referencias necesarias para el plano; no obligues a que toda la biblioteca aparezca simultáneamente.

### Arquitectura del prompt

Usa solo los bloques que reduzcan ambigüedad y ordénalos, en general, de contexto a referencias, espacio, tiempo, física, sonido y locks:

1. `SCENE CONTEXT`: evento, intención dramática y resultado visible en una a tres frases.
2. `PRIORITY LOCKS`, opcional: uno a tres requisitos críticos o previamente fallidos.
3. `ACTIVE REFERENCES`: descriptor, función y exclusiones de cada material activo.
4. `LOCATION MAP`: geografía, posiciones, distancias, orientación, propiedad de objetos y eje de acción.
5. `EYELINES AND SCREEN DIRECTION`, cuando afecte a diálogo, poder o continuidad.
6. `FIRST FRAME AND SPATIAL BLOCKING`: sujetos ya visibles, pose, orientación, profundidad, ocupación de cuadro y estado inicial de cámara.
7. `FORMAT MODE`: toma continua o multishot, duración, velocidad temporal y cortes permitidos.
8. `OPTICS`: escala, lente o FOV, altura, perspectiva y profundidad de campo.
9. `CAMERA`: posición inicial, trayectoria, dirección, velocidad, foco, parallax y estado final.
10. `ACTING`: motivo, objetivo, obstáculo, táctica y señales observables.
11. `TIMELINE / BEATS`: etapas consecutivas con un cambio principal y un estado de salida cada una.
12. `PHYSICS AND MOTION CADENCE`: masa, impulso, contacto, inercia, transferencia de peso, reacción, persistencia, shutter y motion blur.
13. `LIGHTING`: fuentes motivadas, dirección, contraste, exposición, temperatura y continuidad.
14. `DIALOGUE AND AUDIO`: hablante, idioma, voz, texto verbatim, sincronía, oyente, ambiente, SFX, música y silencios.
15. `STYLE AND QUALITY`: tratamiento visual, materiales, textura, paleta, época y formato útil.
16. `POSITIVE LOCKS`: identidades, cantidades, posiciones, estados, lente, cámara y resultado obligatorio.
17. `NEGATIVE CONSTRAINTS`, opcional: solo fallos concretos y probables.

Elige densidad por riesgo:

- **Compacta:** un sujeto, una acción, una cámara y poca continuidad.
- **Producción:** referencias activas, espacio, primer frame, óptica, timeline, física, luz, audio y locks.
- **Densa:** múltiples sujetos o cortes, diálogo, transferencia de props, eyelines, efectos o física compleja. Usa la arquitectura completa sin convertir la longitud en objetivo.

**Contrato exclusivo de Seedance 2.5:** el prompt puede desarrollar esta arquitectura hasta un máximo absoluto de **10.000 caracteres**. Contar espacios, saltos de línea, títulos de bloque, referencias, diálogo y texto en pantalla; mostrar `X/10.000 caracteres` antes del prompt final. No reutilizar como límite ni como plantilla la estructura compacta de MiniMax H3 MAX. Si supera 10.000, eliminar primero bloques inactivos, repeticiones y estilo ornamental; después simplificar beats secundarios. Si contiene planos independientes que no caben y el flujo admite varios prompts, dividirlos en prompts-isla separados, cada uno por debajo de 10.000 caracteres.

## Pasos a seguir

1. **Clasificar la petición y la madurez del brief.** Determina si el usuario quiere desarrollar una idea o recibir ya el prompt final. El brief es suficiente cuando permite fijar sujeto u objetivo, evento principal, escena o tono, escala temporal y función de las referencias. Es pobre si solo aporta un tema, una estética o una frase genérica y obliga a inventar acción, arco, cámara y producción.

   - Si es pobre y no se ha pedido expresamente el prompt final, no redactes un prompt listo para pegar. Propón dos o tres direcciones creativas realmente distintas, recomienda una y formula como máximo tres preguntas decisivas o pide elegir una dirección.
   - Si el usuario exige el prompt final pese a un brief pobre, avanza con supuestos razonables, decláralos y no bloquees el trabajo por detalles secundarios.
   - Pregunta solo cuando la respuesta cambie el modo, la duración, la relación de aspecto, la identidad de una referencia o el resultado creativo central.

2. **Fijar el contrato de producción.** Identifica modo, duración, aspecto, orientación, una toma o multishot, tiempo real o slow motion, resolución disponible y parámetros bloqueados. No presentes un parámetro bloqueado como algo que el texto pueda anular.

3. **Inventariar materiales reales.** Enumera los archivos en orden de carga, nombra sujetos, productos, localizaciones y props, y asigna a cada material `use only...` e `ignore...`. No inventes materiales no adjuntos ni atribuyas identidades por inferencia. Si el usuario describe una referencia que aún no está disponible, redacta el plan de referencias, pero indica que debe adjuntarla antes de una generación que dependa de ella.

4. **Diseñar espacio antes que tiempo.** Fija la geografía, posiciones, distancias, eyelines, eje de acción, dirección de pantalla, propietario y posición de objetos. Contrata el primer fotograma: quién está ya visible, pose, orientación, profundidad, ocupación del encuadre y estado de cámara. Si la acción debe empezar de inmediato, declara que ya está en curso; evita gastar duración en un establishing vacío.

5. **Diseñar la progresión.** Usa etapas consecutivas por defecto. Cada etapa hereda un estado inicial, contiene un solo evento principal y termina en un estado visible que pueda alimentar la etapa siguiente. Usa timestamps solo para handoffs, entradas o salidas, transiciones y beats críticos; deben ser consecutivos, sin huecos ni solapamientos y con una carga de acción realista.

6. **Aplicar el contrato del modo elegido.**

   - **Text-to-video:** sujeto + acción o evento + escena + tratamiento visual observable + cámara o corte + audio. Omite bloques irrelevantes.
   - **Image-to-video / Omni / Multi-Reference:** declara qué controla cada imagen —identidad, estructura, material, vestuario, escena, luz o composición— y qué ignora. Una imagen de referencia no es automáticamente un keyframe.
   - **Vídeo de referencia:** especifica si se heredan movimiento, trayectoria, blocking, cámara, ritmo, cortes, emoción, transición o audio, y rechaza identidad, ropa, fondo, texto o sonido no deseados. Si ya define bien la secuencia, no dupliques todos sus beats en texto.
   - **Audio-driven:** asigna `@Audio N` a voz, diálogo, música, ambiente o SFX y al sujeto o escena correspondiente. Define qué categorías se conservan, reemplazan o eliminan.
   - **First frame:** la imagen fija composición inicial, posición, pose, objetos, escena y dirección de cámara. Describe qué empieza a moverse y qué permanece estable.
   - **First/last frame:** asigna cada ancla por separado, confirma la misma relación de aspecto y describe una acción continua que llegue de forma natural al último estado. Mantén identidad, estructura, cantidad y propiedad de objetos, layout, luz, cámara y eje. Las referencias adicionales solo complementan atributos.
   - **Varios keyframes:** usa las imágenes como anclas en orden, describe el estado visible de cada una y las transiciones continuas. No pretendas que controlen cada frame intermedio.
   - **30 s o Long Video:** declara duración y formato como ajustes de producción. Estructura 30–180 s en secuencias mayores y cada secuencia en etapas; conserva un arco claro sin microdirigir cada segundo.
   - **Edición:** declara `@Video 1` como único vídeo maestro; después objetivo, referencia objetivo, alcance exacto, cantidad, herencia temporal y contenido a conservar. El reemplazo hereda apariciones, movimiento, oclusiones, salidas, timing, trayectoria y velocidad del original. Para fondo, limita el cambio a la región exterior a la silueta y permite respuesta de luz natural cuando proceda.
   - **Extensión hacia delante:** alinea el primer frame añadido con el último frame fuente en pose, orientación, props, fondo, composición, luz y vector de movimiento; describe después el evento nuevo y conserva identidad, ropa, layout, eje y número de instancias.
   - **Extensión hacia atrás:** describe primero el contenido previo y convierte el primer frame fuente en el estado final explícito del segmento añadido. Impide la aparición prematura de personajes, props o efectos posteriores.
   - **Transición entre vídeos:** define clip anterior, clip posterior, disparador, dirección y aceleración de cámara, transformación de forma/material/luz/espacio, estado de llegada y paso gradual del audio A al B. Puede usar inmersión/reversa, giro, oclusión de primer plano, morph de objeto, push/pull o cambio de foco cuando encaje.
   - **Storyboard grid:** preferir hasta 15 viñetas, dibujo limpio, poco texto y orden de lectura explícito. Hereda orden y composición aproximada, no el estilo de línea ni personajes placeholder. Para cada plano fija escala, acción, cámara o transición, estado final, look y audio.
   - **Blockout grueso:** hereda trayectorias, blocking, cámara, cortes, luz y ritmo; mapea cada geometría a un sujeto final y rechaza materiales o escena provisionales.
   - **Blockout fino:** conserva estructura, acción, layout, cámara y cortes; vuelve a renderizar personajes, materiales, color, escena y estilo. Exige un blockout limpio sin ejes, trayectorias, controladores ni frustums.
   - **One-Click Video:** fija función de cada imagen y vídeo de estilo, orden exacto o permiso de ordenación, continuidad de identidad, movimiento por imagen, ritmo, transiciones, grafismo, color y audio. Mantén estable cualquier texto o geometría de producto que no deba animarse.

7. **Dirigir el plano con señales observables.** Sustituye “épico”, “tenso” o “cinematográfico” por conducta, luz, cámara y sonido visibles. Para actuación, define motivo, objetivo, obstáculo y táctica, y tradúcelos a ojos, cabeza, boca, manos, respiración, postura, voz y tempo. Para física, escribe la cadena `impulse → contact → weight transfer → reaction → persistent end state`, incluyendo masa, apoyo, inercia, sombra de contacto y la persistencia de partículas, tela, cabello, líquidos o daño cuando proceda.

8. **Controlar cámara y montaje.** En una toma continua, declara duración y `ONE CONTINUOUS TAKE`, fija espacio, primer frame y eje antes del timeline, usa una trayectoria con inicio, vector, velocidad y parada, y termina con un hold cuando importe el frame final. En multishot, fija número de planos, duración total, tipo de corte y función de cada beat. Usa una lente por plano; cualquier cambio de lente o eje debe coincidir con un corte explícito. Conserva estados y propiedad de props entre cortes y muestra toda transferencia mediante entrega, contacto y recepción.

9. **Redactar en inglés con la arquitectura de Seedance.** Crea un prompt-isla autosuficiente y de hasta 10.000 caracteres: vuelve a declarar todos los descriptores, referencias, espacio, óptica, luz y estado de entrada necesarios. No uses “same as before” ni memoria implícita, y no lo fuerces a seguir la plantilla compacta de MiniMax H3 MAX. Esta plantilla maestra es opcional; elimina cualquier bloque que no reduzca riesgo:

```text
[SCENE CONTEXT]
<INT/EXT, time, duration, one continuous take or controlled multishot>. <Observable dramatic event>. <Required final visible state>.

[PRIORITY LOCKS — OPTIONAL]
1. <Critical or previously failed requirement>.
2. <Second critical requirement>.

[ACTIVE REFERENCES]
@Image 1 — <ASSET NAME>: <canonical descriptor>. Use only <identity/clothing/object/geography/lighting>. Ignore <pose/background/camera/etc.>.
@Video 1 — Use only <movement/camera/rhythm/performance>. Ignore <identity/scene/audio>.
@Audio 1 — Use for <voice/dialogue/ambience/music/SFX>.

[LOCATION MAP]
<Geography and anchors>. <Subject A> is <position/orientation/distance>; <Subject B> is <position/orientation/distance>. <Prop> belongs to <subject> and starts <position>. Axis of action and screen direction: <rule>.

[EYELINES AND SCREEN DIRECTION — IF NEEDED]
<Who looks at whom or at which mark, exact direction, when the gaze changes, and what must never reverse>.

[FIRST FRAME AND SPATIAL BLOCKING]
The first frame already shows <subjects/action/props>. <Frame occupancy, pose, orientation and depth>. Camera starts <exact state>. <Immediate action/no empty establishing if required>.

[FORMAT MODE]
<One continuous take / N shots with declared cuts>, <duration>, <real time / slow motion>, <cadence only if relevant>.

[OPTICS]
<Lens or FOV per shot>, <height>, <perspective>, <depth of field>.

[CAMERA]
Start <position/angle>. Move <trajectory, direction, speed, focus subject and parallax>. End <visible camera state>. <Allowed cuts>.

[ACTING]
<Subject>: motive <...>; objective <...>; obstacle <...>; tactic <...>. Observable signals: <eyes, head, hands, breathing, posture, voice, tempo>.

[TIMELINE / BEATS]
0.0–<x>s: <inherited start state>; <one main event>; <visible exit state>.
<x>–<y>s: Continue from <inherited state>; <one main change>; <visible exit state>.
<y>–<end>s: <closure>; hold <persistent final state>.

[PHYSICS AND MOTION CADENCE]
<Impulse → contact → weight transfer → reaction → rest>. <Mass, inertia, occlusion, particles, cloth/hair/liquid, shutter and motion blur>.

[LIGHTING]
<Motivated sources, direction, contrast, exposure, temperature, shadows and continuity>.

[DIALOGUE AND AUDIO]
Exact dialogue: <speaker, language/accent, delivery, verbatim line and beat>.
Listener: <eyeline, micro-reaction and mouth closed while not speaking>.
Ambience: <...>. Synchronized SFX: <...>. Music: <.../none>. Silence: <where and why>.

[STYLE AND QUALITY]
<Visual treatment, texture, palette, period and useful output treatment>.

[POSITIVE LOCKS]
<Subject count and identity>. <Clothing and props>. <Positions and axis>. <Camera and lens>. <Mandatory final state and persistence>.

[NEGATIVE CONSTRAINTS — ONLY LIKELY FAILURES]
No <left/right reversal, duplication, morphing, unauthorized camera move, premature content, or other specific failure>.
```

10. **Revisar antes de entregar.** Comprueba:

   - sujeto, evento principal y resultado final inequívocos;
   - todas las referencias activas tienen función y exclusiones, sin rangos ambiguos;
   - una sola instancia cuando varias vistas muestran el mismo asset;
   - mapa espacial, primer frame, timeline, cantidades, props, eyelines y eje coherentes;
   - rangos temporales ascendentes, consecutivos y no solapados;
   - una lógica de cámara y una lente por plano;
   - abstracciones convertidas en señales visibles o audibles;
   - física causal y estado final persistente cuando haya acción;
   - hablante, idioma, voz, línea, reacción del oyente, SFX y silencios asignados al beat correcto;
   - como máximo tres priority locks y negativos limitados a fallos probables;
   - llaves de diálogo y corchetes de subtítulos equilibrados si se usan;
   - contrato específico del modo completo: vídeo maestro en edición; anclas y aspecto en first/last; frontera en extensión; fuentes, disparador, llegada y audio en transición; tipo de blockout; o roles, orden, movimiento, edición y audio en One-Click;
   - recuento exacto del bloque final no superior a 10.000 caracteres.

11. **Entregar y abrir la puerta de Magnific.** Presenta primero el prompt final y el control de calidad. Después pregunta si el usuario quiere lanzarlo mediante Magnific MCP. No busques ni invoques Magnific hasta recibir una respuesta afirmativa inequívoca.

12. **Ejecutar solo tras confirmación.** Con autorización explícita, resuelve primero el namespace, los nombres y los esquemas exactos de Magnific en el registro vivo. Los identificadores siguientes describen las capacidades habituales; pueden aparecer con otro prefijo o nombre completo y nunca deben invocarse por suposición. Ejecuta esta secuencia:

   1. Usa la capacidad equivalente a `account_balance` para comprobar el saldo antes de cualquier operación con coste. Si no hay saldo suficiente o la respuesta es incierta, detente y comunícalo.
   2. Para cada referencia local necesaria, usa la capacidad equivalente a `creations_upload_file` y conserva los identificadores o URL que devuelva. No subas archivos no activos en el prompt.
   3. Salvo que el usuario haya pedido explícitamente un flujo one-shot sin planificación, usa la capacidad equivalente a `video_plan` con el brief original del usuario y las referencias relevantes. El plan puede informar parámetros y detectar incompatibilidades, pero no debe reemplazar silenciosamente el prompt inglés ya aprobado. Si propone un cambio material, pide permiso.
   4. Usa la capacidad equivalente a `video_models_list`, busca Seedance 2.5 y copia literalmente el slug devuelto por Magnific. Si Seedance 2.5 no figura, detente: no selecciones otro modelo sin autorización explícita.
   5. Usa la capacidad equivalente a `video_generate` una sola vez con el slug literal, el prompt final en inglés, los ajustes aceptados y las referencias subidas. Una confirmación autoriza exactamente una llamada de generación, no variaciones ni reintentos de pago.
   6. Cuando la generación devuelva un identificador, invoca la capacidad equivalente a `creations_show` únicamente para consultar su estado y metadatos; no des por hecho que esa operación muestra el vídeo. Mientras el estado sea activo, vuelve a invocarla hasta alcanzar un estado terminal, respetando el intervalo del conector o, si no existe, usando 15–30 segundos.
   7. Si existe una capacidad de espera, úsala entre consultas, pero vuelve a invocar `creations_show` después de cada espera y una última vez al terminar. Un timeout de consulta no es un estado terminal ni autoriza una segunda generación. Solo tras éxito terminal, recupera el asset final desde `video_generate`, la espera, el último `creations_show` o la capacidad de descarga disponible; ante fallo o cancelación terminal, informa sin reintentar automáticamente.
   8. Muestra el vídeo dentro del chat mediante la previsualización multimedia nativa. Si no renderiza, descarga el asset a una ruta local accesible y adjúntalo inline como `![Vídeo generado](<ruta-local-absoluta>)`. Comprueba que el reproductor o preview sean visibles; un ID, estado, URL o enlace no bastan. Si no puede recuperarse el asset, informa de un fallo de entrega y no declares completada la generación.

   Lee y respeta el esquema real de cada herramienta. No inventes nombres, argumentos, capacidades, presets, identificadores ni respuestas. Si falta una capacidad o el esquema no permite completar el flujo, detente e informa de la limitación.

## Entregables

### Si el brief necesita desarrollo creativo

Entrega únicamente:

1. **Lectura del punto de partida:** qué está claro y qué falta decidir.
2. **Direcciones posibles:** dos o tres rutas concretas con concepto, progresión visual, cámara o ritmo y referencias útiles.
3. **Recomendación:** la opción más sólida y una razón breve.
4. **Siguiente decisión:** elección entre rutas o hasta tres preguntas de alto impacto.

No incluyas todavía ningún prompt listo para pegar.

### Si corresponde un prompt final

Entrega, en este orden:

1. **Modo y ajustes:** modo recomendado, duración, relación de aspecto, una toma o multishot, parámetros elegibles o bloqueados y recuento exacto `X/10.000 caracteres`.
2. **Mapa de referencias:** tabla breve con material, función y exclusiones; omítela si no hay materiales.
3. **Supuestos:** solo los que hayan sido necesarios para completar un brief incompleto.
4. **Final prompt — English:** el prompt completo, listo para copiar, en inglés y dentro de un bloque de código `text`. No entregues una versión española del prompt. Si hay varios planos o entregables independientes, coloca cada prompt inglés en su propio bloque de código claramente rotulado.
5. **Control de calidad:** de tres a seis comprobaciones específicas del caso.
6. **Puerta de generación:** termina con esta pregunta o una formulación natural equivalente: **“¿Quieres que lo lance ahora mediante Magnific MCP y generemos el resultado?”**

Si el vídeo debe contener diálogo, texto en pantalla o subtítulos en un idioma distinto del inglés, conserva ese contenido verbatim dentro del prompt inglés y declara explícitamente el idioma. Las instrucciones del prompt siguen redactadas en inglés.

No entregues varias versiones completas salvo que el usuario pida alternativas. Cuando revise un prompt existente, entrega una única versión corregida, un resumen conciso de los cambios y el control de calidad.

Tras una generación autorizada mediante Magnific, entrega el vídeo como previsualización visible dentro del chat y añade los ajustes efectivamente utilizados y cualquier limitación o error real. `creations_show`, el identificador y el enlace del asset son información auxiliar, no el entregable. Si no hay renderizado nativo, recupera o descarga el archivo y adjúntalo inline desde una ruta local absoluta. No afirmes que se generó ni mostró nada si la herramienta no confirma el resultado o el chat no presenta el asset.

## Consideraciones

- **Prompt-isla:** cada plano debe poder regenerarse por sí solo. Repite literalmente los descriptores activos, vestuario, props, geografía, blocking, óptica, luz y estado de entrada; no dependas del plano anterior.
- **Relaciones antes que estilo:** escribe primero identidades, posiciones, estados, acciones y causalidad; añade después tratamiento visual. La precisión operativa importa más que acumular adjetivos.
- **Locks positivos primero:** resume de tres a ocho hechos que deben sobrevivir a la generación. Usa negativos solo para mirroring, duplicación, morphing, cámara no autorizada, contenido prematuro u otro fallo concreto. No sustituyas dirección positiva por una lista de prohibiciones.
- **Acción física:** especifica apoyo, centro de masa, impulso, contacto, transferencia, reacción, rebote o reposo y sombra de contacto. Define fuente, dirección, retardo y persistencia para partículas, líquidos, tela y cabello. Si aparece daño o un cambio de estado, declara cuándo nace y que permanece.
- **Diálogo:** escribe la línea verbatim una sola vez, con hablante, idioma, acento o variedad, edad vocal, textura, volumen, tempo e intención. Separa hablante y oyente; el oyente mantiene microreacciones y la boca cerrada mientras no habla.
- **Audio:** puede expresarse en lenguaje natural. Si conviene separar categorías, usa música, ambiente, SFX, diálogo y subtítulos. Si no se quieren música o subtítulos, indícalo de forma directa y global.
- **Texto exacto:** la generación no garantiza tipografía, fórmulas, señalética, especificaciones de producto o timing perfectamente exactos. Para requisitos críticos, usa una referencia preparada y planifica verificación o posproducción.
- **Tiempo:** los timestamps asignan presupuesto a eventos; no son cortes exactos al frame.
- **Edición y transición:** la edición generativa puede variar respecto al vídeo original y no garantiza solapamiento píxel a píxel. Una transición busca continuidad visual y sonora, no preservación idéntica de los píxeles.
- **First/last:** las dos anclas deben compartir relación de aspecto; si no, el último frame puede deformarse.
- **Resolución:** no prometas 4K de salida. Una entrada 4K sigue estando sujeta a las resoluciones de salida disponibles.
- **Iteración:** cambia una sola familia por intento —referencias/identidad, acción/continuidad, cámara, estilo/luz o audio— y conserva los bloques ya válidos. Tras un fallo aislado, no reescribas todo.
- **Diagnóstico rápido:** personajes intercambiados suelen requerir mapeo individual; duplicación, declarar una sola instancia; acción errónea, reducir estilo y fijar estados; exceso de cortes, reducir eventos o ampliar duración; cámara incoherente, fijar inicio, vector, velocidad y fin; apariciones espontáneas, declarar propiedad y entradas; plano vacío, contratar el primer frame; miradas cruzadas, fijar eyelines y eje; acción flotante, añadir causalidad y masa; contaminación desde vídeo, estrechar herencia y exclusiones; edición expansiva, reducir alcance y reforzar conservación; salto de extensión, alinear el frame frontera; emoción débil, añadir dos a cuatro señales observables; voz incorrecta, fijar idioma, hablante y entrega.
- **Patrones empíricos:** los prompts de producción observados en flujos profesionales suelen usar referencias activas, mapa espacial, primer frame, beats, cámara, física, audio y locks. Esa evidencia orienta la estructura, pero no impone una longitud. No copies nombres de cineastas, cámaras ni looks por defecto y nunca superes el máximo de 10.000 caracteres.
- **Longitud Seedance 2.5:** máximo absoluto de 10.000 caracteres en cada bloque final. Es un techo, no un objetivo; usa solo la densidad necesaria para controlar el plano.
- **Magnific MCP:** la pregunta final es una oferta, no autorización. Solo tras un “sí” explícito resuelve en el registro vivo las capacidades equivalentes a `account_balance`, `creations_upload_file`, `video_plan`, `video_models_list`, `video_generate` y `creations_show`; el namespace y los nombres completos pueden variar. Si Magnific no existe, no es accesible o no ofrece Seedance 2.5, indícalo con precisión y pide al usuario que habilite o conecte el servicio; no instales, reconfigures ni sustituyas el modelo o el proveedor sin permiso. Si faltan assets o un ajuste que cambia materialmente el resultado, solicítalos antes de generar. Una autorización permite una sola llamada a generación. No hagas reintentos, variaciones o segundas generaciones con coste potencial sin una nueva confirmación. `creations_show` nunca satisface por sí solo la entrega: invócalo repetidamente mientras el estado esté activo, usa la espera disponible entre refrescos, consúltalo otra vez después de cada espera y al alcanzar el estado terminal, recupera el asset tras un éxito y muestra el vídeo inline en el chat; usa descarga y adjunto local como alternativa cuando la vista del conector no renderice. Un timeout de consulta no autoriza otra generación.
- **Honestidad de capacidad:** no inventes límites, materiales, modelos, presets, resultados ni capacidades de la interfaz. Distingue requisitos duros de preferencias creativas y comunica cualquier incertidumbre que afecte al resultado.
