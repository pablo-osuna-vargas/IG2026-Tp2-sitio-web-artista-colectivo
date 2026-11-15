INFORMATICA GENERAL
CAT.: DRELICHMAN
2026

"TITULO"

Integrantes:
Pablo Osuna Vargas
Joel Ledezma
Ángel León Cabral





=============================

PANAJEDREZ \[v1.0] 1ra parte

=============================



\## CONCEPTO



Panajedrez es una obra generativa interactiva inspirada en los sistemas simbólicos de Xul Solar. La obra propone un espacio de composición donde lenguaje, sonido, imagen y poesía emergen de la interacción del usuario. La estructura conceptual se organiza alrededor del número 12, presente en múltiples sistemas de correspondencias: signos, sonidos, colores, tiempos y relaciones simbólicas. El número 13 representa la síntesis: el silencio, el blanco y el momento de revelación de la obra.



\## PROPUESTA



El usuario construye una composición mediante la combinación de consonantes y grupos vocálicos. Cada combinación genera unidades lingüísticas que participan simultáneamente en la construcción de:

una estructura verbal

una melodía

una constelación visual

un poema

La obra no busca producir un resultado correcto o incorrecto, sino habilitar un proceso de exploración y composición.



\## PRINCIPIO



Componer antes que competir

Panajedrez no se concibe como un juego de victoria o derrota. La interacción está orientada a la creación.

El usuario es autor

La obra surge de las decisiones del usuario. No existe una solución predefinida.



\## PAUSA



Las respiraciones y divisiones entre signos forman parte de la estructura de la obra.

El no 13 no se juega

El 13 no es una jugada ni una combinación más. Representa el acto de detener la composición y revelar la obra completa.



\## INTERACTIVIDAD



La experiencia se organiza en tres acciones fundamentales:

Componer

Crear nuevas unidades mediante la combinación de consonantes y grupos vocálicos.

Respirar

Cerrar un signo y establecer una pausa dentro de la composición.

Exponer

Acceder al estado 13 para revelar el resultado final de la obra.



\## SECUENCIA



Componer → Respirar → Componer → Respirar → no 13 → Exponer → Contemplar



\## MEJORAS

Implementación de visores para monitoreo y cambios de estado



\---------------------------------------------------------------------------



========================

PANAJEDREZ \[v1.3]

========================

\## ESTADO CONCEPTUAL



Aunque el proyecto surge como una aproximación lúdica a la Panlengua de Xul Solar trabajando en una simplificación de su juego, actualmente evoluciona hacia una interfaz de composición estética donde signos, espacio, sonido y color forman parte de una misma experiencia de creación asistida por software.



\## PROTO-TABLERO



La obra adquiere una dimensión espacial. Las emisiones dejan de existir únicamente como lenguaje y comienzan a ocupar lugares dentro de un territorio compositivo. Las vocales dejan de funcionar como datos seleccionables y se transforman en espacios habitables dentro del tablero.

La v1.3 representa el tablero mediante un array. El tablero visual y el tablero lógico son estructuras distintas. El tablero lógico almacena el estado de ocupación de cada posición. Cada elemento del array representa una casilla.



Ejemplo:

tablero\[3] = {

&#x09;silaba: "MAA",

&#x09;sonido: null,

&#x09;color: null,

&#x09;posicion: 3

};

La posición 3 del tablero contiene la emisión MAA en casilla 3



\## PROPUESTA



Las consonantes serían fichas. Las vocales casillas. Cada emisión surge cuando el usuario selecciona una consonante y luego ocupa una casilla del proto-tablero. Ejemplo: M + AA → MAA



\## VOCALES



Las vocales ya no están en un formulario, forman parte del espacio compositivo.



\## CONSONANTES



Elemento móvil -ficha (en proceso)- que ocupa una casilla del tablero.



\## EMISIÓN

Cada emisión es una posición del tablero donde fue creada. Forma parte de la identidad de la emisión.



\## INTERACTIVIDAD



Seleccionar consonante → Ocupar casilla vocal → Generar emisión → Agregar emisión al signo actual → Respirar (Cerrar signo) → Continuar componiendo → 13 · Exponer obra → Contemplar



\## REPASO TÉCNICO



Objetos con propiedades, relación datos- tablero visual



\## RESULTADO

Ahora cada emisión posee: identidad lingüística (sílaba), identidad espacial (posición), quedando preparada para futuras propiedades: sonido, color, constelación, poema. Sin modificar la arquitectura del juego



\-------------------------------------------------------------------------------









