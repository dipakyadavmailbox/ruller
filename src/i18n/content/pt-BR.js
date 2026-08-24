// PT-BR — Brazilian Portuguese content for the core translated pages.
// Mirrors the key shape of ./en.js exactly; validate.js fails on drift.

export default {
  home: {
    title: 'Ferramentas online gratuitas — réguas, conversores e calculadoras',
    description: 'Uma coleção de ferramentas gratuitas que rodam no navegador: régua de tela calibrada, conversores de unidades e formatos, utilitários de PDF e calculadoras de saúde. Nada é enviado.',
    keywords: 'ferramentas online grátis, conversor de unidades, régua de tela, ferramentas pdf, gerador de qr code, calculadora de calorias',
    h1: 'Ferramentas gratuitas que rodam inteiramente no seu navegador',
    intro: 'Quinze utilitários de precisão para design, desenvolvimento e problemas do dia a dia. Todo cálculo acontece no seu próprio aparelho: sem conta, sem upload e sem esperar servidor.',
    bullets: [
      'Nada do que você digita ou arrasta sai do seu computador',
      'Funciona offline depois que a página carrega',
      'Sem cadastro, sem marca d’água e sem limite por arquivo',
    ],
    bodyHeading: 'Um kit de ferramentas no lugar de quinze abas',
    body: 'A maioria das ferramentas gratuitas da web envia seu arquivo para um servidor, coloca marca d’água no resultado e limita quantas vezes você pode usar. Estas não. Cada ferramenta é um pequeno programa do lado do cliente: o navegador faz o trabalho, o arquivo fica onde está e o resultado aparece na hora.',
    faq: [
      { q: 'Estas ferramentas são realmente gratuitas?', a: 'Sim. Todas são gratuitas, sem conta, sem período de teste e sem limite de arquivos. O site é sustentado por publicidade, por isso você verá espaços de anúncio claramente identificados entre as seções.' },
      { q: 'Meus arquivos são enviados para algum lugar?', a: 'Não. Redimensionar imagens, juntar PDFs, converter dados e todas as calculadoras rodam dentro da aba do navegador. O arquivo nunca faz parte de uma requisição de rede.' },
      { q: 'As ferramentas funcionam no celular?', a: 'Sim. Todas são responsivas e funcionam por toque, inclusive a régua de tela, que pode ser calibrada no celular com um cartão bancário.' },
    ],
  },

  ruler: {
    title: 'Régua online na tela — tamanho real, calibrada 1:1',
    description: 'Régua em tamanho real na tela, calibrada no seu monitor com um cartão de crédito. Meça em milímetros, centímetros e polegadas em escala 1:1 em qualquer display.',
    keywords: 'régua online, régua tamanho real, régua de tela, régua mm, régua cm online, régua polegadas, régua calibrada',
    h1: 'Meça qualquer coisa na sua tela',
    intro: 'Réguas fixadas na borda da janela em escala real de milímetros e polegadas. Calibre uma vez com qualquer cartão bancário e a escala continua fisicamente correta, mesmo com zoom.',
    bullets: [
      'Calibrada com um cartão padrão ISO 7810 de 85,60 mm de largura',
      'Continua correta ao aplicar zoom ou mudar de monitor',
      'Sem acesso à câmera, sem gravação de tela e sem upload',
    ],
    bodyHeading: 'Por que a maioria das réguas de tela erra',
    body: 'Uma régua web comum presume que toda tela tem 96 DPI. Telas reais variam de 96 a mais de 300 DPI, então uma régua sem calibração pode errar por um fator de três. Encostar um cartão na tela e ajustar o contorno informa à ferramenta a sua densidade exata de pixels.',
    faq: [
      { q: 'Como calibro a régua para o tamanho real?', a: 'Abra o painel de calibração e encoste qualquer cartão de crédito, débito ou documento de identidade na tela. Arraste o controle até o contorno na tela coincidir exatamente com o cartão físico.' },
      { q: 'Continua precisa quando eu aplico zoom?', a: 'Sim. A régua acompanha mudanças de escala da janela e de densidade de pixels e recalcula o espaçamento das marcações, de modo que um centímetro continua um centímetro.' },
      { q: 'Posso usar no celular ou tablet?', a: 'Sim. A calibração funciona igual em iPhone, iPad e Android. Calibre uma vez por aparelho e o ajuste fica guardado localmente.' },
    ],
  },

  aspectRatio: {
    title: 'Calculadora de proporção de tela e corte',
    description: 'Descubra largura e altura correspondentes a qualquer proporção — 16:9, 9:16, 4:5, 1:1, 21:9 — ou o maior corte central que cabe na sua imagem.',
    keywords: 'calculadora de proporção, calculadora 16:9, calculadora de corte, proporção de imagem, resolução de vídeo',
    h1: 'Calculadora de proporção de tela e corte',
    intro: 'Informe uma dimensão e receba a outra para qualquer proporção, ou cole o tamanho da sua imagem e obtenha a caixa de corte central exata de que precisa.',
    bullets: [
      'Todas as proporções comuns de redes sociais, vídeo e impressão já incluídas',
      'O modo de corte devolve também o deslocamento, não apenas o tamanho',
      'Os resultados se atualizam enquanto você digita, sem surpresas de arredondamento',
    ],
    bodyHeading: 'As proporções que as plataformas realmente usam',
    body: 'Vídeo vertical no TikTok, Reels e Shorts é 9:16 em 1080×1920. Publicações no feed do Instagram são 1:1 ou 4:5. O YouTube usa 16:9, o cinema 21:9 e a maioria das câmeras fotografa em 3:2. Escolher a proporção certa antes de exportar evita o corte automático das plataformas.',
    faq: [
      { q: 'O que é proporção de tela?', a: 'É a relação entre largura e altura, escrita largura:altura. Uma imagem 16:9 tem 16 unidades de largura para cada 9 de altura, qualquer que seja o número de pixels.' },
      { q: 'Como encontro a dimensão que falta?', a: 'Multiplique o lado conhecido pela fração da proporção. Em 16:9, a altura é a largura vezes 9 dividido por 16.' },
      { q: 'Qual a diferença entre ajustar e cortar?', a: 'Ajustar redimensiona a imagem inteira e pode acrescentar barras. Cortar remove pixels para atingir a proporção sem distorcer nada.' },
    ],
  },

  dpi: {
    title: 'Calculadora de DPI / PPI e tamanho de impressão',
    description: 'Converta pixels em tamanho de impressão e vice-versa. Descubra a maior impressão nítida possível ou os pixels necessários para um tamanho a 300 DPI.',
    keywords: 'calculadora dpi, calculadora ppi, tamanho de impressão, pixels para centímetros, 300 dpi, resolução de imagem',
    h1: 'Calculadora de DPI / PPI e tamanho de impressão',
    intro: 'Vá nos dois sentidos entre pixels e tamanho físico de impressão em qualquer resolução e veja na hora se uma imagem está nítida o bastante para o tamanho desejado.',
    bullets: [
      'De pixels para tamanho de impressão e do tamanho para os pixels necessários',
      'Referências de qualidade em 72, 150, 300 e 600 DPI',
      'Funciona em polegadas, centímetros e milímetros',
    ],
    bodyHeading: 'Quanta resolução uma impressão realmente exige',
    body: '300 DPI é o padrão para tudo que se segura na mão: fotos, revistas, cartões de visita. Um pôster visto a um metro fica bom com 150 DPI e um outdoor funciona com 30. Dividir a largura em pixels pelo DPI desejado dá a largura impressa em polegadas.',
    faq: [
      { q: 'Qual a diferença entre DPI e PPI?', a: 'PPI conta pixels por polegada numa imagem digital; DPI conta pontos de tinta por polegada que a impressora deposita. No uso cotidiano, para dimensionar imagens, os dois são tratados como sinônimos.' },
      { q: '300 DPI é sempre necessário?', a: 'Não. É o padrão para visualização de perto. Trabalhos de grande formato vistos à distância continuam nítidos com resoluções bem menores.' },
      { q: 'Posso aumentar o DPI para melhorar a qualidade?', a: 'Mudar apenas o número de DPI só muda o tamanho de impressão. Acrescentar detalhe real exige mais pixels, algo que o redimensionamento só consegue aproximar.' },
    ],
  },

  imageResizer: {
    title: 'Compressor e redimensionador de imagens',
    description: 'Redimensione e comprima imagens JPG, PNG e WebP no navegador. Visualize o resultado, compare tamanhos e baixe — nada é enviado a servidor algum.',
    keywords: 'redimensionar imagem, comprimir imagem, reduzir tamanho de foto, compressor jpg, converter para webp',
    h1: 'Compressor e redimensionador de imagens',
    intro: 'Solte uma imagem, defina um tamanho ou uma qualidade alvo e baixe o resultado. O próprio navegador decodifica e recodifica o arquivo, que nunca sai do aparelho.',
    bullets: [
      'JPG, PNG e WebP na entrada e na saída, com comparação de tamanho ao vivo',
      'Redimensione por pixels ou por porcentagem, com a proporção travada',
      'Bom para lotes, sem limite por arquivo ou por dia',
    ],
    bodyHeading: 'Arquivos menores sem perda visível',
    body: 'A maioria das fotos carrega muito mais dados do que a página que as exibe precisa. Reduzir uma foto de 4000 pixels de largura para os 1600 que o layout realmente usa e recodificar com 80% de qualidade costuma remover 90% do peso sem diferença perceptível a olho nu.',
    faq: [
      { q: 'Minha foto é enviada para um servidor?', a: 'Não. A imagem é lida pela API de arquivos do navegador e processada num canvas dentro da página. Nenhuma requisição de rede transporta sua imagem.' },
      { q: 'Qual formato devo escolher?', a: 'WebP é o menor para a mesma qualidade e já tem suporte em toda parte. Use JPG para compatibilidade máxima e PNG quando precisar de transparência ou gráficos chapados e nítidos.' },
      { q: 'Redimensionar remove os dados EXIF?', a: 'Sim. A recodificação descarta os metadados originais, inclusive coordenadas de GPS e dados da câmera, o que normalmente é o desejado antes de publicar.' },
    ],
  },

  colorTools: {
    title: 'Seletor de cores e gerador de paletas',
    description: 'Escolha uma cor e leia em HEX, RGB, HSL ou HSV. Gere paletas complementares, análogas e triádicas e exporte como CSS, Tailwind ou JSON.',
    keywords: 'seletor de cores, hex para rgb, gerador de paleta, conversor hsl, esquema de cores, cores tailwind',
    h1: 'Seletor de cores e gerador de paletas',
    intro: 'Leia qualquer cor em todas as notações ao mesmo tempo, monte uma paleta harmônica em torno dela e copie tudo no formato que seu projeto usa.',
    bullets: [
      'HEX, RGB, HSL e HSV sincronizados enquanto você arrasta',
      'Esquemas complementares, análogos, triádicos e tetrádicos',
      'Exportação em um clique para variáveis CSS, configuração Tailwind ou JSON',
    ],
    bodyHeading: 'Paletas construídas com teoria das cores',
    body: 'Esquemas harmônicos nascem de relações fixas no círculo cromático. Pares complementares ficam opostos e geram contraste máximo; conjuntos análogos ficam lado a lado e transmitem calma; conjuntos triádicos são igualmente espaçados e mantêm vivacidade sem perder equilíbrio.',
    faq: [
      { q: 'O que significa o código HEX?', a: 'São três pares de dígitos hexadecimais para vermelho, verde e azul, cada um de 00 a FF. #FF0000 é vermelho pleno, sem verde nem azul.' },
      { q: 'Quando usar HSL em vez de HEX?', a: 'HSL separa matiz, saturação e luminosidade, então criar uma escala de tons vira uma questão de mudar um número em vez de adivinhar novos valores hexadecimais.' },
      { q: 'As paletas exportadas são acessíveis?', a: 'O gerador mostra as razões de contraste para você conferir qualquer par contra o limite WCAG AA de 4,5:1 para texto corrido antes de publicar.' },
    ],
  },

  password: {
    title: 'Verificador de força e gerador de senhas',
    description: 'Veja o quanto uma senha é forte de verdade e quanto tempo um equipamento moderno levaria para quebrá-la. A checagem roda inteira no seu navegador.',
    keywords: 'força de senha, gerador de senha, senha segura, tempo para quebrar, entropia de senha',
    h1: 'Verificador de força de senhas',
    intro: 'Digite uma senha e receba uma estimativa honesta de entropia, um tempo de quebra realista e as fraquezas específicas que a tornam adivinhável.',
    bullets: [
      'Estimativas de entropia e tempo de quebra frente a GPUs atuais',
      'Sinaliza palavras de dicionário, sequências de teclado e substituições comuns',
      'Nada é enviado: a checagem acontece dentro da página',
    ],
    bodyHeading: 'Comprimento vence complexidade',
    body: 'Trocar um "a" por "@" quase não acrescenta nada, porque as ferramentas de quebra testam essas substituições primeiro. Já acrescentar caracteres multiplica o espaço de busca. Quatro palavras sem relação entre si são mais fáceis de lembrar e muito mais difíceis de quebrar do que uma sequência curta de símbolos.',
    faq: [
      { q: 'É seguro digitar minha senha real aqui?', a: 'A checagem roda inteiramente no seu navegador e nenhuma tecla é enviada pela rede. Ainda assim, o hábito mais seguro é testar uma senha com o mesmo comprimento e padrão em vez da que você usa de fato.' },
      { q: 'O que torna uma senha forte?', a: 'Comprimento antes de tudo: mire em pelo menos 16 caracteres. Uma frase-senha de quatro ou cinco palavras sem relação supera uma sequência curta e complexa tanto em memorização quanto em força.' },
      { q: 'Como o tempo de quebra é calculado?', a: 'A partir da entropia estimada em bits frente à taxa de hash das GPUs de consumo atuais, presumindo um ataque offline sobre um banco de dados vazado.' },
    ],
  },

  calorie: {
    title: 'Calculadora de calorias — TMB, GET e macros',
    description: 'Calcule sua taxa metabólica basal e seu gasto energético total com a equação de Mifflin-St Jeor, receba a divisão de macros para sua meta e registre refeições.',
    keywords: 'calculadora de calorias, calculadora tmb, gasto energético total, calculadora de macros, necessidade calórica diária',
    h1: 'Calculadora de calorias e diário alimentar',
    intro: 'Descubra quanto seu corpo queima em repouso e num dia normal, defina uma meta para perder, manter ou ganhar peso e registre as refeições em relação a ela.',
    bullets: [
      'TMB por Mifflin-St Jeor, a equação usada na prática clínica',
      'Multiplicadores de atividade do sedentário ao atleta',
      'Divisão de proteína, carboidrato e gordura ajustada à sua meta',
    ],
    bodyHeading: 'TMB, gasto total e a diferença entre eles',
    body: 'A TMB é o que você queimaria deitado o dia inteiro. O gasto energético total multiplica esse valor por um fator de atividade que cobre movimento, exercício e digestão. Comer de forma consistente abaixo do gasto total reduz o peso; um déficit de cerca de 500 kcal por dia equivale a mais ou menos meio quilo por semana.',
    faq: [
      { q: 'Qual é a precisão da estimativa?', a: 'Mifflin-St Jeor acerta dentro de cerca de 10% para a maioria das pessoas. O metabolismo varia, então use o número como ponto de partida e ajuste após duas semanas de resultados reais.' },
      { q: 'Que tamanho de déficit é seguro?', a: 'A orientação usual é um déficit de 15% a 25% abaixo do gasto total. Déficits muito agressivos custam massa muscular e são difíceis de sustentar. Converse com um médico antes de mudanças drásticas.' },
      { q: 'Meu diário alimentar fica guardado num servidor?', a: 'Não. Os registros ficam no armazenamento local do navegador e nunca saem do aparelho. Limpar os dados do site apaga o diário.' },
    ],
  },

  pregnancy: {
    title: 'Calculadora de gravidez — data do parto e ovulação',
    description: 'Estime a data provável do parto pela última menstruação, pela concepção ou por uma transferência de FIV e veja sua semana, trimestre e período fértil.',
    keywords: 'calculadora data do parto, calculadora de gravidez, calculadora de ovulação, período fértil, idade gestacional',
    h1: 'Calculadora de gravidez — data do parto e ovulação',
    intro: 'Informe a última menstruação, uma data de concepção conhecida ou a data de uma transferência de FIV para obter a data provável do parto, a idade gestacional atual e o trimestre.',
    bullets: [
      'Datação pela regra de Naegele a partir da última menstruação, da concepção ou da FIV',
      'Ajusta-se a ciclos diferentes de 28 dias',
      'Estimativa de ovulação e período fértil para planejamento',
    ],
    bodyHeading: 'Como a data do parto é calculada',
    body: 'A estimativa padrão soma 280 dias ao primeiro dia da última menstruação, o que pressupõe ciclo de 28 dias com ovulação no dia 14. Ciclos mais longos ou mais curtos deslocam a data, e por isso a calculadora pergunta a duração do seu ciclo em vez de presumi-la.',
    faq: [
      { q: 'Qual a confiabilidade da data prevista?', a: 'Apenas cerca de 4% dos bebês nascem na data estimada. Aproximadamente 80% chegam nas duas semanas antes ou depois dela — daí o nome estimativa.' },
      { q: 'E se meu ciclo não tiver 28 dias?', a: 'Informe a duração média real do seu ciclo. A calculadora desloca a suposição de ovulação de acordo, em vez de impor o modelo padrão de 14 dias.' },
      { q: 'Isso substitui um ultrassom?', a: 'Não. O ultrassom do primeiro trimestre é o método de datação mais preciso. Esta ferramenta serve para informação e planejamento, não como orientação médica.' },
    ],
  },

  regex: {
    title: 'Testador de regex com destaque ao vivo',
    description: 'Teste expressões regulares no seu próprio texto com destaque ao vivo, grupos de captura, prévia de substituição e um resumo de sintaxe embutido.',
    keywords: 'testador de regex, testar expressão regular, regex online, resumo de regex, regex javascript',
    h1: 'Testador de regex e resumo de sintaxe',
    intro: 'Escreva um padrão e veja cada correspondência destacada enquanto digita, com os grupos de captura detalhados e uma prévia da substituição ao lado.',
    bullets: [
      'Destaque ao vivo com grupos de captura nomeados e numerados',
      'Todas as flags do JavaScript, inclusive sticky e unicode',
      'Painel de consulta rápida para a sintaxe que ninguém decora',
    ],
    bodyHeading: 'Construir um padrão que se sustenta',
    body: 'Comece por uma amostra real do texto que precisa capturar, não por uma versão idealizada. Acrescente uma restrição de cada vez e observe o destaque se estreitar. Âncoras e classes de caracteres explícitas quase sempre superam um ponto-asterisco ganancioso que funciona por acaso no primeiro exemplo.',
    faq: [
      { q: 'Qual variante de regex é esta?', a: 'JavaScript (ECMAScript), o motor embutido no seu navegador. Quase toda a sintaxe vale também para PCRE, mas o lookbehind e alguns escapes de propriedades Unicode diferem.' },
      { q: 'O que a flag g muda?', a: 'Sem ela o motor para na primeira correspondência. Com ela, todas as correspondências do texto são encontradas, que é o que o destaque mostra.' },
      { q: 'Meu texto de teste é enviado para algum lugar?', a: 'Não. O próprio navegador compila e executa o padrão. Nada é registrado nem transmitido.' },
    ],
  },

  cron: {
    title: 'Gerador e validador de expressões cron',
    description: 'Monte e valide expressões cron com explicação em linguagem simples e prévia dos próximos horários de execução. Suporta sintaxe de 5 e 6 campos.',
    keywords: 'gerador de cron, crontab online, validador de cron, agendamento cron, próximas execuções',
    h1: 'Gerador e validador de expressões cron',
    intro: 'Monte um agendamento campo a campo ou cole uma expressão existente e receba uma descrição legível junto com as próximas execuções.',
    bullets: [
      'Descrição em linguagem simples de qualquer expressão',
      'Prévia das próximas execuções no seu fuso horário',
      'Lida com intervalos, passos, listas e a variante de 6 campos com segundos',
    ],
    bodyHeading: 'Como ler os cinco campos',
    body: 'Uma linha de cron é minuto, hora, dia do mês, mês e dia da semana, nessa ordem. O asterisco significa todo valor, */5 significa a cada cinco e 1-5 é um intervalo. A armadilha clássica é que dia do mês e dia da semana se combinam com OU, não com E.',
    faq: [
      { q: 'O que significa */5 * * * *?', a: 'A cada cinco minutos, de toda hora, todos os dias. O operador de passo se aplica ao campo em que aparece.' },
      { q: 'Que fuso horário o cron usa?', a: 'O cron do sistema usa o fuso do servidor. Esta prévia usa o do seu navegador, então confira a configuração do servidor antes de confiar nos horários.' },
      { q: 'Por que meu agendamento por dia da semana disparou no dia errado?', a: 'Quando dia do mês e dia da semana estão ambos restritos, o cron executa se qualquer um coincidir, não os dois. Deixe um deles como asterisco para obter o comportamento esperado.' },
    ],
  },

  dataConverter: {
    title: 'Conversor de JSON, CSV e YAML',
    description: 'Converta entre JSON, CSV e YAML na hora, dentro do navegador, com validação, formatação e decodificação de Base64 e JWT incluídas.',
    keywords: 'json para csv, csv para json, conversor yaml, formatador json, decodificador base64, decodificador jwt',
    h1: 'Conversor JSON ⇄ CSV ⇄ YAML',
    intro: 'Cole dados em qualquer um dos três formatos e receba de volta em outro, validados e formatados, sem que um único byte saia do seu navegador.',
    bullets: [
      'Ida e volta entre JSON, CSV e YAML com detecção de tipos',
      'Os erros apontam a linha e a coluna exatas',
      'Decodificação de Base64, URL e JWT embutida',
    ],
    bodyHeading: 'Onde os três formatos se diferenciam',
    body: 'JSON é rígido e legível em qualquer lugar. YAML usa o mesmo modelo de dados com indentação no lugar de chaves, o que é agradável de escrever e fácil de quebrar. CSV é plano, então objetos aninhados precisam ser achatados em nomes de coluna com pontos na saída.',
    faq: [
      { q: 'Meus dados são enviados?', a: 'Não. A leitura e a conversão rodam no seu navegador. Nada é registrado, armazenado ou transmitido, o que torna seguro usar com arquivos de configuração que contenham segredos.' },
      { q: 'Como o JSON aninhado é tratado em CSV?', a: 'Chaves aninhadas viram cabeçalhos de coluna com pontos, como usuario.endereco.cidade, de modo que nenhuma informação se perde.' },
      { q: 'O decodificador de JWT verifica a assinatura?', a: 'Não. Ele decodifica o cabeçalho e o payload para inspeção. A verificação exige a chave de assinatura e pertence ao seu servidor.' },
    ],
  },

  qr: {
    title: 'Gerador de QR code — Wi-Fi, vCard e URL',
    description: 'Crie QR codes para links, redes Wi-Fi, contatos vCard, e-mail e texto. Personalize cores e correção de erros e baixe em PNG ou SVG.',
    keywords: 'gerador de qr code, qr code wifi, qr code vcard, qr code grátis, qr png svg',
    h1: 'Gerador de QR code',
    intro: 'Gere um QR code para um link, uma rede Wi-Fi, um cartão de contato, um e-mail ou texto simples e baixe em PNG de alta resolução ou SVG escalável.',
    bullets: [
      'Conteúdos de Wi-Fi, vCard, e-mail, SMS e URL',
      'Cores personalizadas e quatro níveis de correção de erros',
      'PNG para impressão e SVG para ampliar sem limite',
    ],
    bodyHeading: 'Códigos que continuam legíveis no papel',
    body: 'Mantenha contraste forte entre o padrão e o fundo, deixe a zona de silêncio livre e escolha o nível de correção H se o código levar um logotipo ou puder se desgastar. Conteúdos mais curtos geram padrões menos densos, que são lidos com segurança em tamanhos menores.',
    faq: [
      { q: 'Estes QR codes expiram?', a: 'Não. O código é gerado no seu navegador e codifica seus dados diretamente. Não há serviço de redirecionamento no meio que possa ser desligado.' },
      { q: 'O que é correção de erros?', a: 'Dados redundantes que permitem ler um código danificado. O nível L tolera cerca de 7% de dano e o nível H cerca de 30%, ao custo de um padrão mais denso.' },
      { q: 'É seguro imprimir um QR code de Wi-Fi?', a: 'Ele contém a senha da rede em texto puro, então quem fotografar entra no seu Wi-Fi. Use para uma rede de visitantes, não para a principal.' },
    ],
  },

  pdf: {
    title: 'Ferramentas de PDF — juntar, dividir e converter',
    description: 'Junte vários PDFs num só, divida um PDF em páginas ou transforme imagens em PDF. Tudo roda no navegador, sem upload e sem marca d’água.',
    keywords: 'juntar pdf, dividir pdf, imagem para pdf, ferramentas pdf online, combinar pdf grátis',
    h1: 'Conversor, unificador e divisor de PDF',
    intro: 'Combine documentos, extraia páginas ou monte um PDF a partir de imagens. O arquivo é lido e reescrito dentro do navegador, então nada é enviado e nada é carimbado.',
    bullets: [
      'Juntar com reordenação por arraste e dividir por página ou intervalo',
      'Imagens para PDF com controle de tamanho e orientação de página',
      'Sem marca d’água, sem limite de tamanho e sem cota diária',
    ],
    bodyHeading: 'Por que tratar PDF localmente importa',
    body: 'Contratos, laudos médicos e extratos bancários são justamente os documentos que as pessoas colam em conversores online gratuitos. Fazer o trabalho localmente significa que o documento nunca fica no servidor de outra pessoa, nunca entra numa fila de processamento e nunca fica sujeito a uma política de retenção que você não leu.',
    faq: [
      { q: 'Existe limite de tamanho de arquivo?', a: 'Só a memória do seu aparelho. Como não há upload, o teto prático é muito maior que os 10 a 20 MB permitidos pela maioria dos conversores online.' },
      { q: 'O resultado terá marca d’água?', a: 'Não. A ferramenta grava um PDF limpo, sem marca de nenhum tipo.' },
      { q: 'Consegue abrir um PDF protegido por senha?', a: 'PDFs criptografados precisam ser desbloqueados antes. Remova a senha no seu leitor de PDF e depois passe o arquivo por aqui.' },
    ],
  },

  unitConverter: {
    title: 'Conversor de unidades — comprimento, peso e temperatura',
    description: 'Converta entre mais de 80 unidades de comprimento, peso, temperatura, área, volume, velocidade, dados, energia e pressão, com resultados formatados no seu idioma.',
    keywords: 'conversor de unidades, conversor métrico, kg para libras, cm para polegadas, celsius para fahrenheit, conversor de medidas',
    h1: 'Conversor de unidades',
    intro: 'Dez categorias e mais de oitenta unidades, convertidas enquanto você digita, com números agrupados e pontuados do jeito que o seu idioma escreve.',
    bullets: [
      'Comprimento, peso, temperatura, área, volume, velocidade, tempo, dados, energia e pressão',
      'Sistema métrico e imperial lado a lado, com toda a precisão preservada',
      'Resultados no formato do seu idioma: 1.234,5 ou 1,234.5 conforme o caso',
    ],
    bodyHeading: 'Precisão que sobrevive à ida e volta',
    body: 'As conversões usam fatores exatos em vez de arredondados, então converter para outra unidade e voltar devolve o número original. A temperatura é tratada como conversão afim e não como simples multiplicação, que é onde a maioria dos conversores rápidos erra.',
    faq: [
      { q: 'Quantas casas decimais são preservadas?', a: 'Toda a precisão de ponto flutuante duplo internamente, com arredondamento sensato na exibição. O valor exato fica disponível se você precisar copiar.' },
      { q: 'Por que meu idioma mostra vírgula como separador decimal?', a: 'Porque é assim que o seu idioma escreve números. O alemão escreve 1.234,5 onde o inglês escreve 1,234.5. A ferramenta segue o idioma da página.' },
      { q: 'O galão americano e o imperial são iguais?', a: 'Não, e a diferença é grande. O galão americano tem 3,785 litros e o imperial, 4,546. Os dois aparecem separadamente.' },
    ],
  },

  about: {
    title: 'Sobre o Rocking Tools',
    description: 'Quem constrói o Rocking Tools, por que cada utilitário roda no lado do cliente e como um site de ferramentas gratuito com publicidade permanece privado por design.',
    keywords: 'sobre rocking tools, ferramentas com privacidade, ferramentas web do lado do cliente',
    h1: 'Sobre o Rocking Tools',
    intro: 'Uma pequena coleção de utilitários de navegador construída sobre uma única regra: o trabalho acontece no seu aparelho, não no nosso.',
    bullets: [
      'Toda ferramenta roda no cliente — não existe endpoint de upload que possa vazar',
      'De uso gratuito, sustentadas por publicidade claramente identificada',
      'Transparência sobre o que coletamos, que é muito pouco',
    ],
    bodyHeading: 'Por que do lado do cliente',
    body: 'O modelo de negócio comum das ferramentas gratuitas é pegar seu arquivo, processá-lo num servidor e guardá-lo tempo suficiente para ser útil a alguém. Executar o mesmo trabalho no navegador elimina essa troca por completo. A página carrega, o código roda localmente e seus dados não têm para onde ir.',
    faq: [
      { q: 'Como o site se sustenta?', a: 'Com publicidade pelo Google AdSense, exibida em espaços identificados entre os conteúdos. É todo o modelo de negócio: não há versão paga e nada é revendido.' },
      { q: 'Que dados vocês coletam?', a: 'Estatísticas agregadas de visitas às páginas e o que o provedor de publicidade coletar conforme o consentimento que você der. Seus arquivos e o que você digita nunca fazem parte disso.' },
      { q: 'Posso pedir uma ferramenta nova?', a: 'Sim. A página de contato chega direto a nós, e os pedidos realmente influenciam o que é construído em seguida.' },
    ],
  },

  faq: {
    title: 'Perguntas frequentes',
    description: 'Respostas sobre privacidade, tratamento de arquivos, precisão, uso offline, publicidade e idiomas disponíveis em todas as ferramentas do Rocking Tools.',
    keywords: 'perguntas frequentes rocking tools, privacidade ferramentas online, ferramentas online são seguras',
    h1: 'Perguntas frequentes',
    intro: 'As dúvidas que mais aparecem sobre como estas ferramentas funcionam, o que acontece com seus dados e o que o site faz e não faz.',
    bullets: [
      'Privacidade e tratamento de arquivos explicados de forma direta',
      'Como a precisão é alcançada sem servidor',
      'O que os anúncios fazem e como funciona o consentimento',
    ],
    bodyHeading: 'Ainda com dúvida?',
    body: 'Se a sua pergunta não estiver respondida abaixo, a página de contato chega direto a uma pessoa. Relatos de erro informando o navegador e o sistema operacional usados são especialmente bem-vindos, porque a maioria dos problemas de exibição é específica de uma combinação.',
    faq: [
      { q: 'Preciso de uma conta?', a: 'Não. Não há cadastro em nenhuma parte do site e nenhuma ferramenta depende disso.' },
      { q: 'As ferramentas funcionam offline?', a: 'Em boa parte, sim. Depois que a página carrega, a ferramenta roda com código que já está no navegador. Recarregar exigirá a rede de novo.' },
      { q: 'Por que vejo anúncios?', a: 'Eles pagam a hospedagem e o desenvolvimento para que as ferramentas continuem gratuitas e sem limites. Os espaços são identificados e ficam fora da área de trabalho de cada ferramenta.' },
      { q: 'Em quais idiomas o site está disponível?', a: 'A página inicial e todas as páginas de ferramentas são publicadas em inglês, espanhol, francês, alemão, português do Brasil, híndi, indonésio e japonês. Números, moeda e datas seguem o idioma escolhido.' },
    ],
  },
}
