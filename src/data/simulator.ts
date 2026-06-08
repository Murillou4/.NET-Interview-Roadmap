import { SimulatorQuestion } from '../types';

export const SIMULATOR_QUESTIONS: SimulatorQuestion[] = [
  {
    id: 'class-vs-struct',
    question: 'Qual a diferença crucial entre class e struct no .NET?',
    idealShortAnswer: 'Class é um tipo de referência (Reference Type) guardado na Heap e gerenciado pelo GC. Struct é um tipo de valor (Value Type) guardado geralmente na Stack, copiado por valor absoluto nas atribuições.',
    idealCompleteAnswer: 'Classes são Reference Types alocados na memória Heap, suportam herança e admitem referências nulas. Structs são Value Types alocados de forma compacta (usualmente na Stack), copiados por valor inteiro em cada atribuição ou passagem de parâmetros, e não suportam herança direta, sendo excelentes para pequenos blocos de dados imutáveis.',
    expectedPoints: [
      'Reference Type vs Value Type',
      'Memória Heap (Classes) vs Stack (Structs)',
      'Suporte a herança (apenas classes)',
      'Comportamento de cópia de valores nas atribuições'
    ],
    category: 'C# básico/intermediário'
  },
  {
    id: 'what-is-interface',
    question: 'O que é uma interface em C#?',
    idealShortAnswer: 'Interface é um contrato comportamental puro que define assinaturas de métodos e propriedades sem armazenar variáveis de estado, permitindo herança de contrato múltiplo e injeção de dependência.',
    idealCompleteAnswer: 'Uma interface é uma estrutura que declara um conjunto síncrono de operações sem implementar estado de instância. Ela habilita polimorfismo limpo e inversão de dependência (D do SOLID), onde o app conversa via contratos comuns. No C# 8+, interfaces admitem também "Default Implementations" facilitando a evolução de APIs complexas.',
    expectedPoints: [
      'Contrato de comportamento',
      'Desacoplamento e testabilidade (Mocks)',
      'Suporte a múltipla implementação de contratos',
      'Inversão de Dependências (D do SOLID)'
    ],
    category: 'Orientação a objetos'
  },
  {
    id: 'async-await',
    question: 'O que é async/await no .NET?',
    idealShortAnswer: 'É uma sintaxe especial que converte inteligências sequenciais assíncronas em uma Máquina de Estados não-bloqueante de threads por meio do reaproveitamento sustentável do ThreadPool.',
    idealCompleteAnswer: 'O async/await converte lógicas assíncronas em trechos fáceis de ler de forma puramente não-bloqueante no .NET. Quando um método bate no await, o ASP.NET suspende o método temporariamente liberando a thread chamadora ao pool de rede. Ao terminar o I/O, recursos tomam a continuação do código de forma totalmente transparente à aplicação.',
    expectedPoints: [
      'Máquina de Estados (State Machine) compilada',
      'Liberação não-bloqueante de threads de processamento',
      'Diferença para concorrência pura baseado em novas threads físicas',
      'Melhoria de vazão (throughput) de requisições de servidores'
    ],
    category: 'Async, Task e concorrência'
  },
  {
    id: 'what-is-linq',
    question: 'O que é LINQ e para que serve?',
    idealShortAnswer: 'LINQ é uma engine de buscas no C# que traz sintaxe tipada de banco de dados diretamente sobre coleções de memória ou remotas de forma integrada e expressiva.',
    idealCompleteAnswer: 'Language Integrated Query (LINQ) padroniza pesquisas do C# sobre diferentes fontes de dados. Utiliza sintaxe de métodos de extensão com expressões Lambda ou sintaxe imperativa declarativa. Ele adota Deferred Execution (execução adiada) onde as checagens e buscas só operam hardware quando iniciamos a enumeração dos registros de fato.',
    expectedPoints: [
      'Language Integrated Query',
      'Filtros, projeções e ordenações tipadas',
      'Métodos com Lambda expressions vs Query syntax',
      'Deferred Execution de queries (execução adiada)'
    ],
    category: 'Coleções e LINQ'
  },
  {
    id: 'ienumerable-iqueryable-list',
    question: 'Qual a diferença entre IEnumerable, IQueryable e List?',
    idealShortAnswer: 'IEnumerable é para leitura síncrona em memória usando iteradores. IQueryable aceita Expression Trees convertidas em consultas SQL remotas. List é uma coleção física indexada carregada em memória RAM.',
    idealCompleteAnswer: 'List é uma coleção concreta e volumosa mutável na RAM. IEnumerable é o leitor básico baseado no padrão Iterator, ideal para filtros leves locais através de Deferred Execution. IQueryable carrega um interpretador matemático de "Expressões" traduzindo chamadas LINQ para scripts SQL Postgres ou SQL Server eficientes resolvidos na fonte.',
    expectedPoints: [
      'IEnumerable: Iteração local em memória RAM',
      'IQueryable: Tradução remota de parâmetros para dialeto de banco de dados (SQL)',
      'List: Coleção concreta indexável que duplica carregamento de tamanho em memória Heap',
      'Quando o processamento ocorre no hardware de banco de dados'
    ],
    category: 'Coleções e LINQ'
  },
  {
    id: 'exception-handling',
    question: 'O que é uma exceção e como tratamos erros de forma adequada no .NET?',
    idealShortAnswer: 'Exceção é um desvio quebra-fluxo que herda de System.Exception. Tratamos usando try-catch-finally e capturadores de erros globais (Middlewares de exceção).',
    idealCompleteAnswer: 'Exceções capturam erros estruturados em tempo de execução via classe System.Exception. São capturados com try/catch. Lançamos de forma relançada usando "throw;" simples nos blocos catch para não corromper o StackTrace original. Em Web APIs, deve-se adotar tratamento global de exceção centralizado em Middlewares do pipeline.',
    expectedPoints: [
      'Pilha estruturada Base Exception',
      'Uso correto de "throw;" (preserva StackTrace) em detrimento de "throw ex;"',
      'Custo em processamento para capturar stacktraces',
      'Centralização em Middlewares Globais de Exceção'
    ],
    category: 'Exceptions e tratamento de erro'
  },
  {
    id: 'dependency-injection',
    question: 'O que é injeção de dependência e quais os tempos de vida nativos do .NET?',
    idealShortAnswer: 'É uma técnica para resolver baixo acoplamento injetando dependências corporativas por construtores, amparado por tempos de vida: Transient, Scoped e Singleton.',
    idealCompleteAnswer: 'Injeção de dependência implementa a inversão de dependências em C#. Registramos contratos no container Builder.Services do Program.cs especificando três ciclos de vida na memória: Transient (uma nova a cada solicitação), Scoped (única por requisição HTTP) e Singleton (única para toda a vida e execução operacional da API).',
    expectedPoints: [
      'Inversão de Controle e Desacoplamento de código',
      'Transient: Nova instância a cada resolução',
      'Scoped: Instância unificada por request HTTP',
      'Singleton: Uma única instância viva perpetuamente'
    ],
    category: 'Injeção de dependência'
  },
  {
    id: 'what-is-controller',
    question: 'O que é um Controller no ASP.NET Core?',
    idealShortAnswer: 'É o controlador ou gerente principal das Web APIs C#. Classe que herda de ControllerBase que recebe o pacote HTTP de rede nas rotas e repassa retornos como IActionResult.',
    idealCompleteAnswer: 'O controller organiza e direciona pontos de requisições. Classe que herda de ControllerBase (ideal em Web APIs sem Razor Views) que aciona as camadas de serviço da aplicação de forma isolada, gerando retornos de status como BadRequest() ou Ok().',
    expectedPoints: [
      'Herança de ControllerBase vs Controller clássico MVC',
      'Diferença entre as responsabilidades de Controller e regras de negócio de Services',
      'Atributo principal [ApiController]',
      'Mecanismos de retorno síncronos de ActionResults'
    ],
    category: 'ASP.NET Core / Web API'
  },
  {
    id: 'what-is-endpoint',
    question: 'O que é um Endpoint?',
    idealShortAnswer: 'É o ponto isolado acessível de terminação de rota da Web API, casando um recurso específico com um Verbo HTTP específico.',
    idealCompleteAnswer: 'Endpoint é a exposição eletrônica de uma tarefa na internet. Ele mapeia URLs relativas de domínios substantivos (ex: /clientes) agregadas com verbos do protocolo síncrono (ex: GET /clientes/1), que aciona uma Action concreta no Controller C#.',
    expectedPoints: [
      'Mapeamento físico de recursos em endpoints',
      'Associação obrigatória com Verbo HTTP síncrono',
      'Roteamento no pipeline local',
      'Princípios de restrições REST'
    ],
    category: 'ASP.NET Core / Web API'
  },
  {
    id: 'what-is-middleware',
    question: 'Como funciona o Middleware no ASP.NET Core?',
    idealShortAnswer: 'Middlewares são componentes encadeados em um Pipeline que manipulam solicitações HTTP sequencialmente, processando lógicas transversais antes dos controllers.',
    idealCompleteAnswer: 'Middlewares formam uma esteira sequencial de interceptação HTTP (pipeline). Declaradas com instruções no Program.cs, cada uma decide se processa, bloqueia (short-circuit) ou encaminha ao vizinho subsequente invocando a função de callback assíncrona "await next()".',
    expectedPoints: [
      'Pipeline de requisições e respostas HTTP',
      'Método crucial "next()" para encadeamento',
      'Short-circuiting de requisições (ex: segurança, cache)',
      'Aplicações transversais (ex: JWT validation, tratamento de exceções)'
    ],
    category: 'ASP.NET Core / Web API'
  },
  {
    id: 'http-status-codes',
    question: 'O que significam os status HTTP 200, 201, 400, 401, 403, 404 e 500?',
    idealShortAnswer: 'São retornos de rede padronizados. 2xx são sussessos, 4xx são erros do cliente/consumidor da API, e 5xx são quedas e quebras de servidores.',
    idealCompleteAnswer: '200 OK (sucesso comum), 201 Created (sucesso de gravação), 400 Bad Request (payload ou validação incorreta do cliente), 401 Unauthorized (falta fazer login), 403 Forbidden (identificado, mas sem cargos e permissões suficientes), 404 Not Found (recurso inexistente), 500 Internal Server Error (o backend quebrou e deu crash inesperado).',
    expectedPoints: [
      '200 e 201 representam sucesso de busca e criação',
      '400 denota erros de negócio ou validações incorretas feitas pelo cliente',
      'Diferença entre 401 (não autenticado) e 403 (autenticado, porém proibido)',
      '500 representa crashes gerais no motor interno da aplicação'
    ],
    category: 'HTTP e REST'
  },
  {
    id: 'api-authentication',
    question: 'De que formas comuns podemos autenticar uma Web API?',
    idealShortAnswer: 'Comumente autenticamos usando Tokens JWT, Chaves de API secretas (API Keys) ou fluxos centralizados baseados em OAuth2.',
    idealCompleteAnswer: 'Autenticar é comprovar identidade. Em APIs Web, as opções de mercado são: autenticações baseadas em Token JWT (Bearer Token Stateless), chave criptográfica secreta inserido no cabeçalho (API Key para comunicação Server-to-Server), ou fluxos baseados em OAuth 2.0 delegando escopos confidenciais a provedores dedicados de identidade.',
    expectedPoints: [
      'Mecanismos de Cabeçalhos (Authorization Header)',
      'Fluxo JWT Bearer Token (Stateless)',
      'Uso de chaves de serviço API Keys em integrações',
      'Integrações federadas OAuth2 / Identity Providers'
    ],
    category: 'Autenticação e autorização'
  },
  {
    id: 'what-is-jwt',
    question: 'O que é JWT e como ele se estrutura?',
    idealShortAnswer: 'Um padrão de transmissão assinado e autocontido composto por Header (algoritmo), Payload (dados de claims) e Signature (criptografia anti-fraudes), separados por pontos.',
    idealCompleteAnswer: 'JSON Web Token é um crachá legível por qualquer navegador, codificado em Base64, e assinado digitalmente. É dividido em: Header (tipo e algoritmo), Payload (dados compartilhados do usuário chamados Claims) e Signature (assinatura simétrica ou assimétrica calculada pelo servidor .NET com chave secreta que veta qualquer adulteração externa).',
    expectedPoints: [
      'Autocontido e compacto de segurança',
      'Header, Payload e Signature',
      'Separação por caracteres ponto (.)',
      'Segurança e cálculo de assinatura por chaves secretas contra fraudes'
    ],
    category: 'Autenticação e autorização'
  },
  {
    id: 'what-is-dto',
    question: 'O que é um DTO e para que serve?',
    idealShortAnswer: 'É um objeto puro de transporte (Data Transfer Object) usado para filtrar, modelar síncronos os limites de dados na entrada e saída de requisições de controllers.',
    idealCompleteAnswer: 'DTO remove acoplamentos estruturais perigosos de dados. Ele isola as tabelas fundamentais de bancos contra acessos da internet. Transporta variáveis sem estado ou regras complexas de banco, mitigando ataques de Overposting e simplificando contratos nas bordas de endpoints do C#.',
    expectedPoints: [
      'Data Transfer Object',
      'Propriedades puras desprovidas de behaviors',
      'Isolamento de tabelas físicas contra as bordas expostas de endpoints',
      'Prevenção de ataques de injeção externa de propriedades (Overposting)'
    ],
    category: 'DTO, Models e validação'
  },
  {
    id: 'why-not-return-entity',
    question: 'Por que não devemos retornar nossas entidades de banco de dados diretamente nos endpoints?',
    idealShortAnswer: 'Para segurança contratual de dados, prevenção de vazamentos e para evitar erros fatais de referências cíclicas ou Lazy Loading no serialize JSON.',
    idealCompleteAnswer: 'Retornar entidades gera sérios erros sistêmicos. Primeiro, o serializador JSON tenta ler relacionamentos recursivos estourando Loops Infinitos. Segundo, expõe dados sensíveis (ex: senhas salvas, colunas internas). Terceiro, acopla fisicamente o banco com o layout da Web API de forma descontrolada.',
    expectedPoints: [
      'Risco de segurança expositora de colunas de tabelas confidenciais',
      'Erros de Loop de referências cíclicas com serializadores de arquivos',
      'Falhas silenciosas com Lazy Loading e sessões fechadas de conexões',
      'Dificuldades para evoluir o esquema físico sem quebrar os sites assinantes'
    ],
    category: 'DTO, Models e validação'
  },
  {
    id: 'inner-vs-left-join',
    question: 'Qual a diferença conceitual entre INNER JOIN e LEFT JOIN?',
    idealShortAnswer: 'INNER JOIN exige correspondência matemática perfeita nas chaves de ambos os lados. LEFT JOIN traz todos itens do cadastro controlador inicial independente da direita estar presente.',
    idealCompleteAnswer: 'INNER JOIN é restritivo e retorna dados se as conexões de chaves primárias e estrangeiras existirem de forma síncrona de ambos os lados no Postgres ou SQL Server. LEFT JOIN dita que a tabela primária esquerda é soberana; ela aparecerá integralmente na busca de dados mesmo que os campos correspondentes da direita venham nulos.',
    expectedPoints: [
      'Restrições exclusivas do INNER JOIN',
      'Obrigatoriedade de paridade de chaves correlacionadas',
      'LEFT JOIN preservando elementos nulos de doadores secundários',
      'Impacto funcional em queries e relatórios complexos'
    ],
    category: 'Banco de dados e SQL'
  },
  {
    id: 'what-is-index',
    question: 'O que é um índice no banco de dados?',
    idealShortAnswer: 'É uma estrutura física paralela de busca (árvore B-Tree) que otimiza e agiliza leituras do SQL em troca de pequeno tempo extra na gravação de dados.',
    idealCompleteAnswer: 'Índices resolvem gargalos de leituras lentas de dados (Table Scans). Bancos de dados criam mapas de consulta rápida em estruturas B-Tree de colunas específicas indexadas. Melhoram a busca, mas exigem processos extras caros que demandam cautela de inserções por reindexações sequenciais.',
    expectedPoints: [
      'Busca otimizada versus Table Scans exaustivos',
      'Estruturas físicas auxiliares (B-Tree)',
      'Índices agrupadores Clustered (id) e Non-Clustered',
      'Custo em disco e penalidade nas escritas simultâneas (Insert/Update)'
    ],
    category: 'Banco de dados e SQL'
  },
  {
    id: 'what-is-transaction',
    question: 'O que é uma transação de banco de dados?',
    idealShortAnswer: 'Uma transação é uma fronteira síncrona garantidora de consistência ACID: ou todos os passos de gravações funcionam, ou nenhum de fato persiste (Rollback).',
    idealCompleteAnswer: 'Transações protegem a estabilidade física de dados em processos múltiplos correlacionados usando as propriedades ACID. Elas abrem canais exclusivos que aplicam as inclusões juntas sob o comando Commit, ou abortam todas juntas desfazendo as etapas anteriores sob o comando de Rollback preventivo.',
    expectedPoints: [
      'Integridade funcional ACID de dados',
      'Funcionamento sinérgico de Commit e Rollback',
      'Prevenção de salvamento parcial que corrompe negócios',
      'Conexões exclusivas e isoladas de concorrência'
    ],
    category: 'Banco de dados e SQL'
  },
  {
    id: 'normalization-db',
    question: 'O que é normalização de banco de dados?',
    idealShortAnswer: 'Normalizar é organizar o banco aplicando as Formas Normais matemáticas para expurgar duplicações e assegurar flexibilidade em atualizações.',
    idealCompleteAnswer: 'Consiste em padronizar o esquema do banco de dados relacional. Aplicamos regras lógicas de Formas Normais (como de 1FN a 3FN), desmembrando dados aninhados em tabelas exclusivas lógicas conectadas por chaves. Isso assegura consistência nas operações transacionais OLTP.',
    expectedPoints: [
      'Formas Normais (1FN, 2FN, 3FN)',
      'Eliminação precoce de anomalias de escrita de dados',
      'Minimização de redundâncias e duplicações',
      'Otimização transacional em sistemas OLTP'
    ],
    category: 'Banco de dados e SQL'
  },
  {
    id: 'what-is-migration',
    question: 'O que é uma Migration no ciclo de evolução do software?',
    idealShortAnswer: 'É o versionamento de alterações estruturais do banco escrito em C# e convertido de forma autônoma para DDL SQL.',
    idealCompleteAnswer: 'As Migrations eliminam manipulações diretas manuais inconsistentes em bancos de desenvolvimento e produção. Mapeiam alterações de modelos em classes C#, registrando o histórico de scripts Up() (para subir dados estruturados) e Down() (para desfazer se der falhas de deploy).',
    expectedPoints: [
      'Versionamento histórico de banco de dados',
      'Eliminação de manipulações físicas diretas invasivas manuais',
      'Lógicas Up() e Down() de reversão estruturada',
      'Comando CLI .NET ("dotnet ef database update")'
    ],
    category: 'Entity Framework Core'
  },
  {
    id: 'what-is-entity-framework',
    question: 'O que é o Entity Framework Core?',
    idealShortAnswer: 'O principal ORM do .NET, que mapeia classes C# para tabelas, traduzindo LINQ amigável para comandos remotos SQL.',
    idealCompleteAnswer: 'Entity Framework (EF) Core é o ORM oficial open-source da Microsoft. Ele abstrai acessos de conexões físicas de ADO.NET gerando scripts SQL de inserções ou leituras complexas. Opera centralizado no DbContext agindo nos padrões Repository e de Unit of Work.',
    expectedPoints: [
      'Mapeamento Objeto-Relacional (ORM) oficial da Microsoft',
      'Abstração de comandos SQL por meio de lógicas C# strongly-typed',
      'DbContext acionando os padrões Repository e de Unit of Work',
      'Tradução do compilador LINQ para dialetos específicos de bancos'
    ],
    category: 'Entity Framework Core'
  },
  {
    id: 'query-performance-issues',
    question: 'O que comumente causa sérios gargalos de performance em consultas com EF Core?',
    idealShortAnswer: 'Gargalos clássicos ocorrem por consultas sem índices, efeitos colaterais de N+1 por Lazy Loading descontrolado, ou falta de .AsNoTracking() nas pesquisas de leitura.',
    idealCompleteAnswer: 'Lentidões crônicas rastreiam: 1) Ocorrência do problema N+1 ao rodar queries remanescentes dentro de loops de repetição, 2) Falta de uso de .AsNoTracking() em endpoints GET leitores, gerando trackers pesados, 3) Select ignorado que resulta em "SELECT *" coletando colunas gigantescas nulas, e 4) Ausência física de índices corretos no servidor SQL.',
    expectedPoints: [
      'Ocorrência catastrófica do problema N+1 por Lazy Loading',
      'Rastreamentos lentos por falta de filtros .AsNoTracking() em leituras puras',
      'Explosões cartesianas por cascata excessiva de includes aninhados',
      'Ineficiência em banco por falta de índices nas chaves de buscas'
    ],
    category: 'Performance'
  }
];
