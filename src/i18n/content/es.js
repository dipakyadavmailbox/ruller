// ES — Spanish content for the core translated pages. Mirrors the key shape
// of ./en.js exactly; validate.js fails the build on any drift.

export default {
  home: {
    title: 'Herramientas online gratuitas — reglas, conversores y calculadoras',
    description: 'Colección de herramientas gratuitas que funcionan en el navegador: regla de pantalla calibrada, conversores de unidades y formatos, utilidades PDF y calculadoras de salud. Sin subir archivos.',
    keywords: 'herramientas online gratis, conversor de unidades, regla de pantalla, herramientas pdf, generador qr, calculadora de calorías',
    h1: 'Herramientas gratuitas que funcionan solo en tu navegador',
    intro: 'Quince utilidades de precisión para diseñadores, desarrolladores y problemas cotidianos. Todos los cálculos ocurren en tu propio dispositivo: sin cuentas, sin subidas y sin esperar a un servidor.',
    bullets: [
      'Nada de lo que escribes o arrastras sale de tu equipo',
      'Funciona sin conexión una vez cargada la página',
      'Sin registro, sin marcas de agua y sin límites por archivo',
    ],
    bodyHeading: 'Un solo conjunto de herramientas en lugar de quince pestañas',
    body: 'La mayoría de las herramientas web gratuitas suben tu archivo a un servidor, añaden una marca de agua al resultado y limitan cuántas veces puedes usarlas. Estas no. Cada herramienta es un pequeño programa del lado del cliente: el navegador hace el trabajo, el archivo se queda donde está y el resultado aparece al instante.',
    faq: [
      { q: '¿Estas herramientas son realmente gratuitas?', a: 'Sí. Todas son gratuitas, sin cuenta, sin prueba limitada y sin restricciones de archivos. El sitio se financia con publicidad, por eso verás bloques de anuncios claramente identificados entre las secciones.' },
      { q: '¿Se suben mis archivos a algún sitio?', a: 'No. Redimensionar imágenes, unir PDF, convertir datos y todas las calculadoras se ejecutan dentro de la pestaña del navegador. El archivo nunca forma parte de una petición de red.' },
      { q: '¿Funcionan en el móvil?', a: 'Sí. Todas las herramientas son adaptables y funcionan con pantalla táctil, incluida la regla de pantalla, que se puede calibrar en el móvil con una tarjeta bancaria.' },
    ],
  },

  ruler: {
    title: 'Regla online en pantalla — tamaño real calibrado 1:1',
    description: 'Regla en pantalla a tamaño real calibrada con una tarjeta de crédito. Mide en milímetros, centímetros y pulgadas a escala 1:1 en cualquier pantalla.',
    keywords: 'regla online, regla tamaño real, regla en pantalla, regla mm, regla cm online, regla pulgadas, regla calibrada',
    h1: 'Mide cualquier cosa en tu pantalla',
    intro: 'Reglas fijadas al borde de la ventana a escala real en milímetros y pulgadas. Calibra una vez con cualquier tarjeta bancaria y la escala seguirá siendo físicamente exacta, incluso al hacer zoom.',
    bullets: [
      'Calibrada con una tarjeta estándar ISO 7810 de 85,60 mm de ancho',
      'Mantiene la exactitud al hacer zoom o cambiar de pantalla',
      'Sin acceso a la cámara, sin grabación de pantalla y sin subidas',
    ],
    bodyHeading: 'Por qué casi todas las reglas en pantalla se equivocan',
    body: 'Una regla web típica supone que toda pantalla tiene 96 DPI. Las pantallas reales van de 96 a más de 300 DPI, así que una regla sin calibrar puede equivocarse por un factor de tres. Apoyar una tarjeta contra la pantalla y ajustar el contorno le indica a la herramienta tu densidad de píxeles exacta.',
    faq: [
      { q: '¿Cómo calibro la regla a tamaño real?', a: 'Abre el panel de calibración y apoya cualquier tarjeta de crédito, débito o documento de identidad sobre la pantalla. Mueve el control deslizante hasta que el contorno coincida exactamente con tu tarjeta física.' },
      { q: '¿Sigue siendo exacta al hacer zoom?', a: 'Sí. La regla detecta los cambios de escala de la ventana y de densidad de píxeles y recalcula la separación de las marcas, de modo que un centímetro sigue midiendo un centímetro.' },
      { q: '¿Puedo usarla en el móvil o la tablet?', a: 'Sí. La calibración funciona igual en iPhone, iPad y Android. Calibra una vez por dispositivo y el ajuste se guarda localmente.' },
    ],
  },

  aspectRatio: {
    title: 'Calculadora de relación de aspecto y recorte',
    description: 'Calcula el ancho y el alto correspondientes a cualquier relación de aspecto — 16:9, 9:16, 4:5, 1:1, 21:9 — o encuentra el recorte centrado más grande que cabe en tu imagen.',
    keywords: 'calculadora relación de aspecto, calculadora 16:9, calculadora de recorte, proporción de imagen, resolución de vídeo',
    h1: 'Calculadora de relación de aspecto y recorte',
    intro: 'Introduce una dimensión y obtén la otra para cualquier proporción, o pega el tamaño de tu imagen y obtén el recuadro de recorte centrado exacto que necesitas.',
    bullets: [
      'Todas las proporciones habituales de redes sociales, vídeo e impresión',
      'El modo recorte devuelve también el desplazamiento, no solo el tamaño',
      'Los resultados se actualizan mientras escribes, sin redondeos inesperados',
    ],
    bodyHeading: 'Las proporciones que usan realmente las plataformas',
    body: 'El vídeo vertical de TikTok, Reels y Shorts es 9:16 a 1080×1920. Las publicaciones del feed de Instagram son 1:1 o 4:5. YouTube usa 16:9, el cine 21:9 y la mayoría de las cámaras dispara en 3:2. Elegir la proporción correcta antes de exportar evita el recorte automático que aplican las plataformas.',
    faq: [
      { q: '¿Qué es una relación de aspecto?', a: 'Es la proporción entre ancho y alto, escrita ancho:alto. Una imagen 16:9 mide 16 unidades de ancho por cada 9 de alto, sea cual sea el número de píxeles.' },
      { q: '¿Cómo calculo la dimensión que falta?', a: 'Multiplica el lado conocido por la fracción de la proporción. Para 16:9, el alto es el ancho por 9 dividido entre 16.' },
      { q: '¿Qué diferencia hay entre ajustar y recortar?', a: 'Ajustar escala la imagen completa y puede añadir bandas negras. Recortar elimina píxeles para alcanzar la proporción sin deformar nada.' },
    ],
  },

  dpi: {
    title: 'Calculadora de DPI / PPP y tamaño de impresión',
    description: 'Convierte píxeles a tamaño de impresión y al revés. Descubre el mayor tamaño nítido que admite tu imagen o los píxeles necesarios para un tamaño a 300 DPI.',
    keywords: 'calculadora dpi, calculadora ppp, tamaño de impresión, píxeles a centímetros, 300 dpi, resolución de imagen',
    h1: 'Calculadora de DPI / PPP y tamaño de impresión',
    intro: 'Pasa en ambos sentidos entre píxeles y tamaño físico de impresión a cualquier resolución, y comprueba al instante si una imagen es lo bastante nítida para el tamaño que quieres.',
    bullets: [
      'De píxeles a tamaño de impresión y de tamaño a píxeles necesarios',
      'Orientación de calidad a 72, 150, 300 y 600 DPI',
      'Funciona en pulgadas, centímetros y milímetros',
    ],
    bodyHeading: 'Cuánta resolución necesita realmente una impresión',
    body: '300 DPI es el estándar para todo lo que se sostiene en la mano: fotografías, revistas y tarjetas de visita. Un póster visto a un metro se ve bien a 150 DPI y una valla publicitaria funciona a 30. Dividir el ancho en píxeles entre los DPI objetivo da el ancho impreso en pulgadas.',
    faq: [
      { q: '¿Qué diferencia hay entre DPI y PPP?', a: 'PPI cuenta los píxeles por pulgada de una imagen digital; DPI cuenta los puntos de tinta por pulgada que deposita la impresora. En el uso cotidiano para dimensionar imágenes se emplean como sinónimos.' },
      { q: '¿Siempre hacen falta 300 DPI?', a: 'No. Es el estándar para visión cercana. Los trabajos de gran formato vistos a distancia se ven nítidos con resoluciones mucho menores.' },
      { q: '¿Puedo subir los DPI para mejorar la calidad?', a: 'Cambiar solo el número de DPI únicamente cambia el tamaño de impresión. Añadir detalle real exige más píxeles, algo que el escalado solo puede aproximar.' },
    ],
  },

  imageResizer: {
    title: 'Compresor y redimensionador de imágenes',
    description: 'Redimensiona y comprime imágenes JPG, PNG y WebP en tu navegador. Previsualiza el resultado, compara tamaños y descarga: nada se sube a ningún servidor.',
    keywords: 'redimensionar imagen, comprimir imagen, reducir tamaño de foto, compresor jpg, convertir a webp',
    h1: 'Compresor y redimensionador de imágenes',
    intro: 'Arrastra una imagen, fija un tamaño o una calidad objetivo y descarga el resultado. Tu propio navegador decodifica y vuelve a codificar el archivo, así que nunca sale del dispositivo.',
    bullets: [
      'JPG, PNG y WebP de entrada y salida, con comparación de tamaño en vivo',
      'Redimensiona por píxeles o por porcentaje, con la proporción bloqueada',
      'Apto para lotes, sin límites por archivo ni por día',
    ],
    bodyHeading: 'Archivos más pequeños sin pérdida visible',
    body: 'La mayoría de las fotos contienen muchos más datos de los que necesita la página que las muestra. Reducir una foto de 4000 píxeles de ancho a los 1600 que realmente usa el diseño y recodificarla al 80% de calidad suele eliminar el 90% del peso sin que el ojo note la diferencia.',
    faq: [
      { q: '¿Se sube mi foto a un servidor?', a: 'No. La imagen se lee con la API de archivos del navegador y se procesa en un canvas dentro de la página. Ninguna petición de red transporta tu imagen.' },
      { q: '¿Qué formato debo elegir?', a: 'WebP es el más ligero para la misma calidad y ya se admite en todas partes. Usa JPG para máxima compatibilidad y PNG cuando necesites transparencia o gráficos planos nítidos.' },
      { q: '¿Redimensionar elimina los datos EXIF?', a: 'Sí. La recodificación descarta los metadatos originales, incluidas las coordenadas GPS y los datos de la cámara, que suele ser lo deseable antes de publicar.' },
    ],
  },

  colorTools: {
    title: 'Selector de color y generador de paletas',
    description: 'Elige un color y léelo en HEX, RGB, HSL o HSV. Genera paletas complementarias, análogas y triádicas y expórtalas como CSS, Tailwind o JSON.',
    keywords: 'selector de color, hex a rgb, generador de paletas, conversor hsl, esquema de color, colores tailwind',
    h1: 'Selector de color y generador de paletas',
    intro: 'Lee cualquier color en todas las notaciones a la vez, construye una paleta armónica a su alrededor y cópiala entera en el formato que use tu proyecto.',
    bullets: [
      'HEX, RGB, HSL y HSV sincronizados mientras arrastras',
      'Esquemas complementarios, análogos, triádicos y tetrádicos',
      'Exportación con un clic a variables CSS, configuración de Tailwind o JSON',
    ],
    bodyHeading: 'Paletas basadas en teoría del color',
    body: 'Los esquemas armónicos nacen de relaciones fijas en el círculo cromático. Los pares complementarios se sitúan enfrentados para lograr el máximo contraste; los conjuntos análogos son contiguos y resultan serenos; los triádicos están repartidos por igual y mantienen viveza sin perder equilibrio.',
    faq: [
      { q: '¿Qué significa el código HEX?', a: 'Son tres pares de dígitos hexadecimales para rojo, verde y azul, cada uno de 00 a FF. #FF0000 es rojo pleno sin nada de verde ni azul.' },
      { q: '¿Cuándo conviene usar HSL en lugar de HEX?', a: 'HSL separa tono, saturación y luminosidad, así que crear una escala de tintes o sombras consiste en cambiar un número en vez de adivinar nuevos valores hexadecimales.' },
      { q: '¿Las paletas exportadas son accesibles?', a: 'El generador muestra las relaciones de contraste para que compruebes cualquier pareja frente al umbral WCAG AA de 4,5:1 para texto corrido antes de publicarla.' },
    ],
  },

  password: {
    title: 'Verificador y generador de seguridad de contraseñas',
    description: 'Comprueba lo fuerte que es realmente una contraseña y cuánto tardaría en romperla un equipo moderno. Todo se analiza en tu navegador, sin transmitir nada.',
    keywords: 'seguridad de contraseñas, generador de contraseñas, contraseña segura, tiempo de descifrado, entropía',
    h1: 'Verificador de seguridad de contraseñas',
    intro: 'Escribe una contraseña y obtén una estimación honesta de su entropía, un tiempo de descifrado realista y las debilidades concretas que la hacen adivinable.',
    bullets: [
      'Estimaciones de entropía y de tiempo de descifrado frente a GPU actuales',
      'Detecta palabras de diccionario, secuencias de teclado y sustituciones comunes',
      'No se envía nada: el análisis ocurre dentro de la página',
    ],
    bodyHeading: 'La longitud gana a la complejidad',
    body: 'Sustituir una «a» por «@» apenas aporta nada, porque las herramientas de descifrado prueban esas sustituciones primero. Añadir caracteres, en cambio, multiplica el espacio de búsqueda. Cuatro palabras sin relación son más fáciles de recordar y mucho más difíciles de romper que una cadena corta de símbolos.',
    faq: [
      { q: '¿Es seguro escribir aquí mi contraseña real?', a: 'El análisis se ejecuta por completo en tu navegador y ninguna pulsación se envía por la red. Aun así, lo más prudente es probar una contraseña con la misma longitud y estructura en lugar de la que usas de verdad.' },
      { q: '¿Qué hace fuerte a una contraseña?', a: 'Ante todo la longitud: apunta a 16 caracteres como mínimo. Una frase de cuatro o cinco palabras sin relación supera a una cadena corta y compleja tanto en memorabilidad como en fortaleza.' },
      { q: '¿Cómo se calcula el tiempo de descifrado?', a: 'A partir de la entropía estimada en bits frente a la velocidad de las GPU de consumo actuales, suponiendo un ataque sin conexión sobre una base de datos filtrada.' },
    ],
  },

  calorie: {
    title: 'Calculadora de calorías — TMB, GET y macros',
    description: 'Calcula tu TMB y tu gasto energético total con la ecuación de Mifflin-St Jeor, obtén un reparto de macros para tu objetivo y registra comidas frente a tu meta diaria.',
    keywords: 'calculadora de calorías, calculadora tmb, gasto energético total, calculadora de macros, calorías diarias',
    h1: 'Calculadora de calorías y registro de comidas',
    intro: 'Descubre lo que tu cuerpo quema en reposo y en un día normal, fija un objetivo para perder, mantener o ganar peso y registra tus comidas frente a él.',
    bullets: [
      'TMB con Mifflin-St Jeor, la ecuación que usan los profesionales sanitarios',
      'Multiplicadores de actividad desde sedentario hasta deportista',
      'Reparto de proteínas, hidratos y grasas ajustado a tu objetivo',
    ],
    bodyHeading: 'TMB, gasto total y la diferencia entre ambos',
    body: 'La TMB es lo que quemarías tumbado todo el día. El gasto energético total la multiplica por un factor de actividad que cubre movimiento, ejercicio y digestión. Comer de forma constante por debajo del gasto total adelgaza; un déficit de unas 500 kcal diarias equivale aproximadamente a medio kilo por semana.',
    faq: [
      { q: '¿Qué precisión tiene la estimación?', a: 'Mifflin-St Jeor acierta dentro de un margen del 10% para la mayoría de las personas. El metabolismo varía, así que toma la cifra como punto de partida y ajústala tras dos semanas de resultados reales.' },
      { q: '¿Qué déficit es seguro?', a: 'Lo habitual es un déficit del 15 al 25% por debajo del gasto total. Los déficits muy agresivos cuestan masa muscular y son difíciles de sostener. Consulta con un médico antes de cualquier cambio drástico.' },
      { q: '¿Mi registro de comidas se guarda en un servidor?', a: 'No. Las entradas se guardan en el almacenamiento local de tu navegador y nunca salen del dispositivo. Si borras los datos del sitio, se borra el registro.' },
    ],
  },

  pregnancy: {
    title: 'Calculadora de embarazo, fecha de parto y ovulación',
    description: 'Estima tu fecha probable de parto a partir de la última regla, la fecha de concepción o una transferencia de FIV, y consulta tu semana, trimestre y ventana fértil.',
    keywords: 'calculadora fecha de parto, calculadora de embarazo, calculadora de ovulación, ventana fértil, edad gestacional',
    h1: 'Calculadora de embarazo, fecha de parto y ovulación',
    intro: 'Introduce tu última menstruación, una fecha de concepción conocida o la fecha de una transferencia de FIV para obtener tu fecha probable de parto, la edad gestacional actual y el trimestre.',
    bullets: [
      'Datación por la regla de Naegele desde la última regla, la concepción o la FIV',
      'Se adapta a ciclos distintos de 28 días',
      'Estimación de la ovulación y la ventana fértil para planificar',
    ],
    bodyHeading: 'Cómo se calcula la fecha probable de parto',
    body: 'La estimación estándar suma 280 días al primer día de la última regla, lo que presupone un ciclo de 28 días con ovulación el día 14. Los ciclos más largos o más cortos desplazan la fecha, y por eso la calculadora pregunta la duración de tu ciclo en lugar de darla por supuesta.',
    faq: [
      { q: '¿Qué fiabilidad tiene la fecha estimada?', a: 'Solo alrededor del 4% de los bebés nace en la fecha estimada. Cerca del 80% llega en las dos semanas anteriores o posteriores, y por eso se llama estimación.' },
      { q: '¿Y si mi ciclo no dura 28 días?', a: 'Introduce la duración media real de tu ciclo. La calculadora desplaza la suposición sobre la ovulación en consecuencia en lugar de imponer el modelo estándar de 14 días.' },
      { q: '¿Esto sustituye a una ecografía?', a: 'No. La ecografía del primer trimestre es el método de datación más preciso. Esta herramienta sirve para planificar e informarse, no como consejo médico.' },
    ],
  },

  regex: {
    title: 'Probador de expresiones regulares con resaltado en vivo',
    description: 'Prueba expresiones regulares sobre tu propio texto con resaltado de coincidencias en vivo, grupos de captura, vista previa de reemplazo y chuleta de sintaxis.',
    keywords: 'probador regex, tester de expresiones regulares, regex online, chuleta regex, regex javascript',
    h1: 'Probador de regex y chuleta',
    intro: 'Escribe un patrón y ve cada coincidencia resaltada mientras tecleas, con los grupos de captura desglosados y una vista previa del reemplazo al lado.',
    bullets: [
      'Resaltado en vivo con grupos de captura numerados y con nombre',
      'Todas las banderas de JavaScript, incluidas sticky y unicode',
      'Panel de chuleta para la sintaxis que nunca se recuerda',
    ],
    bodyHeading: 'Construir un patrón que aguante',
    body: 'Parte de una muestra real del texto que necesitas capturar, no de una versión idealizada. Añade una restricción cada vez y observa cómo se estrecha el resaltado. Los anclajes y las clases de caracteres explícitas casi siempre superan a un punto-asterisco codicioso que funciona por casualidad con el primer ejemplo.',
    faq: [
      { q: '¿Qué dialecto de regex es este?', a: 'JavaScript (ECMAScript), el motor incorporado en tu navegador. Casi toda la sintaxis vale también para PCRE, pero el lookbehind y algunos escapes de propiedades Unicode difieren.' },
      { q: '¿Qué cambia la bandera g?', a: 'Sin ella el motor se detiene en la primera coincidencia. Con ella se encuentran todas las del texto, que es lo que muestra el resaltado.' },
      { q: '¿Se envía mi texto de prueba a algún sitio?', a: 'No. Tu propio navegador compila y ejecuta el patrón. No se registra ni se transmite nada.' },
    ],
  },

  cron: {
    title: 'Generador y validador de expresiones cron',
    description: 'Crea y valida expresiones cron con una explicación en lenguaje claro y una vista previa de las próximas ejecuciones. Admite sintaxis de 5 y 6 campos.',
    keywords: 'generador cron, crontab online, validador cron, programación cron, próximas ejecuciones',
    h1: 'Generador y validador de expresiones cron',
    intro: 'Monta una programación campo a campo o pega una expresión existente, y obtén una descripción legible junto con las próximas ejecuciones.',
    bullets: [
      'Descripción en lenguaje claro de cualquier expresión',
      'Vista previa de las próximas ejecuciones en tu zona horaria',
      'Admite rangos, pasos, listas y la variante de 6 campos con segundos',
    ],
    bodyHeading: 'Cómo leer los cinco campos',
    body: 'Una línea de cron es minuto, hora, día del mes, mes y día de la semana, en ese orden. El asterisco significa cada valor, */5 significa cada quinto y 1-5 es un rango. La trampa clásica es que el día del mes y el día de la semana se combinan con O, no con Y.',
    faq: [
      { q: '¿Qué significa */5 * * * *?', a: 'Cada cinco minutos, de cada hora, todos los días. El operador de paso se aplica al campo en el que aparece.' },
      { q: '¿Qué zona horaria usa cron?', a: 'El cron del sistema usa la zona horaria del servidor. Esta vista previa usa la de tu navegador, así que comprueba la configuración del servidor antes de fiarte de las horas.' },
      { q: '¿Por qué mi programación por día de la semana se ejecutó el día equivocado?', a: 'Cuando se restringen a la vez el día del mes y el día de la semana, cron se ejecuta si coincide cualquiera de los dos, no ambos. Deja uno como asterisco para obtener el comportamiento que casi todo el mundo espera.' },
    ],
  },

  dataConverter: {
    title: 'Conversor JSON, CSV y YAML',
    description: 'Convierte entre JSON, CSV y YAML al instante en tu navegador, con validación, formateo y descodificación de Base64 y JWT incluidas.',
    keywords: 'json a csv, csv a json, conversor yaml, formateador json, descodificador base64, descodificador jwt',
    h1: 'Conversor JSON ⇄ CSV ⇄ YAML',
    intro: 'Pega datos en cualquiera de los tres formatos y recíbelos en cualquiera de los otros, validados y formateados, sin que un solo byte salga de tu navegador.',
    bullets: [
      'Conversión de ida y vuelta entre JSON, CSV y YAML con detección de tipos',
      'Los errores señalan la línea y la columna exactas',
      'Descodificación de Base64, URL y JWT integrada',
    ],
    bodyHeading: 'En qué se diferencian los tres formatos',
    body: 'JSON es estricto y se analiza en todas partes. YAML usa el mismo modelo de datos con indentación en lugar de llaves, lo que resulta agradable de escribir y fácil de romper. CSV es plano, así que los objetos anidados deben aplanarse en nombres de columna con puntos al exportar.',
    faq: [
      { q: '¿Se suben mis datos?', a: 'No. El análisis y la conversión se ejecutan en tu navegador. No se registra, almacena ni transmite nada, lo que hace seguro usarlo con archivos de configuración que contengan secretos.' },
      { q: '¿Cómo se trata el JSON anidado en CSV?', a: 'Las claves anidadas se aplanan en cabeceras de columna con puntos, como usuario.direccion.ciudad, de modo que no se pierde información.' },
      { q: '¿El descodificador de JWT verifica la firma?', a: 'No. Descodifica la cabecera y la carga útil para inspeccionarlas. La verificación necesita la clave de firma y corresponde a tu servidor.' },
    ],
  },

  qr: {
    title: 'Generador de códigos QR — Wi-Fi, vCard y URL',
    description: 'Crea códigos QR para enlaces, redes Wi-Fi, contactos vCard, correo y texto. Personaliza colores y corrección de errores y descarga en PNG o SVG.',
    keywords: 'generador de códigos qr, qr wifi, qr vcard, código qr gratis, qr png svg',
    h1: 'Generador de códigos QR',
    intro: 'Genera un código QR para un enlace, una red Wi-Fi, una tarjeta de contacto, un correo o texto simple, y descárgalo como PNG de alta resolución o SVG escalable.',
    bullets: [
      'Contenidos de Wi-Fi, vCard, correo, SMS y URL',
      'Colores personalizados y cuatro niveles de corrección de errores',
      'PNG para imprimir y SVG para escalar sin límite',
    ],
    bodyHeading: 'Códigos que siguen leyéndose en papel',
    body: 'Mantén un contraste fuerte entre el patrón y el fondo, deja libre la zona de silencio y elige el nivel de corrección H si el código va a llevar un logotipo o puede rozarse. Los contenidos más cortos generan patrones menos densos, que se leen con fiabilidad en tamaños pequeños.',
    faq: [
      { q: '¿Estos códigos QR caducan?', a: 'No. El código se genera en tu navegador y codifica tus datos directamente. No hay ningún servicio de redirección intermedio que pueda dejar de funcionar.' },
      { q: '¿Qué es la corrección de errores?', a: 'Datos redundantes que permiten leer un código dañado. El nivel L tolera cerca del 7% de daño y el nivel H alrededor del 30%, a costa de un patrón más denso.' },
      { q: '¿Es seguro imprimir un código QR de Wi-Fi?', a: 'Contiene la contraseña de la red en texto plano, así que quien lo fotografíe entra en tu Wi-Fi. Úsalo para una red de invitados y no para la principal.' },
    ],
  },

  pdf: {
    title: 'Herramientas PDF — unir, dividir y convertir',
    description: 'Une varios PDF en uno, divide un PDF en páginas sueltas o convierte imágenes en PDF. Todo funciona en tu navegador, sin subidas y sin marca de agua.',
    keywords: 'unir pdf, dividir pdf, imagen a pdf, herramientas pdf online, combinar pdf gratis',
    h1: 'Conversor, unificador y divisor de PDF',
    intro: 'Combina documentos, extrae páginas o crea un PDF a partir de imágenes. El archivo se analiza y se reescribe dentro de tu navegador, así que no se sube nada ni se marca nada.',
    bullets: [
      'Unir con reordenación por arrastre y dividir por página o rango',
      'Imágenes a PDF con control de tamaño y orientación de página',
      'Sin marcas de agua, sin límite de tamaño y sin cupo diario',
    ],
    bodyHeading: 'Por qué importa tratar los PDF en local',
    body: 'Contratos, informes médicos y extractos bancarios son justo los documentos que la gente pega en conversores online gratuitos. Hacer el trabajo en local significa que el documento nunca se guarda en el servidor de otra persona, nunca entra en una cola de procesamiento y nunca queda sujeto a una política de retención que no has leído.',
    faq: [
      { q: '¿Hay límite de tamaño de archivo?', a: 'Solo la memoria de tu dispositivo. Como no hay subida, el techo práctico es mucho más alto que los 10-20 MB que permiten la mayoría de los conversores online.' },
      { q: '¿El resultado llevará marca de agua?', a: 'No. La herramienta escribe un PDF limpio, sin ninguna marca de ningún tipo.' },
      { q: '¿Puede abrir un PDF protegido con contraseña?', a: 'Los PDF cifrados deben desbloquearse primero. Quita la contraseña en tu lector de PDF y luego pasa el archivo por aquí.' },
    ],
  },

  unitConverter: {
    title: 'Conversor de unidades — longitud, peso y temperatura',
    description: 'Convierte entre más de 80 unidades de longitud, peso, temperatura, área, volumen, velocidad, datos, energía y presión, con resultados formateados según tu idioma.',
    keywords: 'conversor de unidades, conversor métrico, kg a libras, cm a pulgadas, celsius a fahrenheit, conversor de medidas',
    h1: 'Conversor de unidades',
    intro: 'Diez categorías y más de ochenta unidades, convertidas mientras escribes, con las cifras agrupadas y puntuadas tal como las escribe tu idioma.',
    bullets: [
      'Longitud, peso, temperatura, área, volumen, velocidad, tiempo, datos, energía y presión',
      'Sistema métrico e imperial en paralelo, conservando toda la precisión',
      'Resultados con el formato de tu idioma: 1.234,5 o 1,234.5 según corresponda',
    ],
    bodyHeading: 'Precisión que sobrevive a la ida y vuelta',
    body: 'Las conversiones usan factores exactos en lugar de redondeados, así que convertir a otra unidad y volver devuelve el número original. La temperatura se trata como una conversión afín y no como una simple multiplicación, que es donde fallan casi todos los conversores rápidos.',
    faq: [
      { q: '¿Cuántos decimales se conservan?', a: 'Toda la precisión de doble coma flotante internamente, con un redondeo razonable en pantalla. El valor exacto está disponible si necesitas copiarlo.' },
      { q: '¿Por qué mi idioma muestra la coma como separador decimal?', a: 'Porque así se escriben los números en tu idioma. El alemán escribe 1.234,5 donde el inglés escribe 1,234.5. La herramienta sigue el idioma de la página.' },
      { q: '¿El galón estadounidense y el imperial son iguales?', a: 'No, y la diferencia es grande. El galón estadounidense son 3,785 litros y el imperial 4,546. Ambos aparecen por separado.' },
    ],
  },

  about: {
    title: 'Acerca de Rocking Tools',
    description: 'Quién está detrás de Rocking Tools, por qué todas las utilidades funcionan en el cliente y cómo un sitio gratuito con publicidad puede ser privado por diseño.',
    keywords: 'acerca de rocking tools, herramientas privadas, herramientas web del lado del cliente',
    h1: 'Acerca de Rocking Tools',
    intro: 'Una pequeña colección de utilidades de navegador construida sobre una única regla: el trabajo ocurre en tu dispositivo, no en el nuestro.',
    bullets: [
      'Todas las herramientas funcionan en el cliente: no hay servidor de subida que pueda filtrar nada',
      'De uso gratuito, financiadas con publicidad claramente identificada',
      'Transparencia sobre lo que recopilamos, que es muy poco',
    ],
    bodyHeading: 'Por qué del lado del cliente',
    body: 'El modelo de negocio habitual de las herramientas gratuitas consiste en quedarse tu archivo, procesarlo en un servidor y conservarlo el tiempo suficiente para que le resulte útil a alguien. Ejecutar ese mismo trabajo en el navegador elimina ese trato por completo. La página se carga, el código se ejecuta en local y tus datos no tienen adónde ir.',
    faq: [
      { q: '¿Cómo se financia el sitio?', a: 'Con publicidad de Google AdSense, mostrada en bloques identificados entre el contenido. Ese es todo el modelo de negocio: no hay versión de pago ni se revende nada.' },
      { q: '¿Qué datos recopiláis?', a: 'Analítica agregada sobre visitas a páginas y lo que recopile el proveedor de publicidad con el consentimiento que otorgues. Tus archivos y tus datos introducidos nunca forman parte de eso.' },
      { q: '¿Puedo pedir una herramienta nueva?', a: 'Sí. La página de contacto llega directamente a nosotros y las peticiones influyen de verdad en lo que se construye después.' },
    ],
  },

  faq: {
    title: 'Preguntas frecuentes',
    description: 'Respuestas sobre privacidad, tratamiento de archivos, precisión, uso sin conexión, publicidad e idiomas disponibles en todas las herramientas de Rocking Tools.',
    keywords: 'preguntas frecuentes rocking tools, privacidad herramientas online, son seguras las herramientas online',
    h1: 'Preguntas frecuentes',
    intro: 'Las dudas que surgen con más frecuencia sobre cómo funcionan estas herramientas, qué ocurre con tus datos y qué hace y qué no hace el sitio.',
    bullets: [
      'Privacidad y tratamiento de archivos explicados con claridad',
      'Cómo se logra la precisión sin servidor',
      'Qué hacen los anuncios y cómo funciona el consentimiento',
    ],
    bodyHeading: '¿Sigues con dudas?',
    body: 'Si tu pregunta no aparece abajo, la página de contacto llega directamente a una persona. Los informes de error que indican el navegador y el sistema operativo usados son especialmente bienvenidos, porque casi todos los problemas de visualización son propios de una combinación concreta.',
    faq: [
      { q: '¿Necesito una cuenta?', a: 'No. No hay registro en ninguna parte del sitio y ninguna herramienta está limitada por él.' },
      { q: '¿Funcionan sin conexión?', a: 'En buena medida sí. Una vez cargada la página, la herramienta se ejecuta con el código que ya está en el navegador. Al recargar volverá a hacer falta la red.' },
      { q: '¿Por qué veo anuncios?', a: 'Pagan el alojamiento y el desarrollo para que las herramientas sigan siendo gratuitas y sin límites. Los bloques de anuncios están identificados y se mantienen fuera del área de trabajo de cada herramienta.' },
      { q: '¿En qué idiomas está disponible el sitio?', a: 'La página de inicio y todas las páginas de herramientas se publican en inglés, español, francés, alemán, portugués de Brasil, hindi, indonesio y japonés. Las cifras, la moneda y las fechas siguen el idioma elegido.' },
    ],
  },
}
