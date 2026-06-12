import { STUDY_TERMS } from './index';

export interface TechnicalGlossaryEntry {
  term: string;
  definition: string;
  aliases?: string[];
}

const TERM_ALIASES: Record<string, string[]> = {
  class: ['classes'],
  struct: ['structs'],
  record: ['records'],
  interface: ['interfaces'],
  'classe-abstrata': ['classes abstratas', 'abstract class', 'abstract classes'],
  list: ['lists'],
  task: ['tasks'],
  exception: ['exceptions', 'exceção', 'exceções'],
  'try-catch': ['try/catch', 'try-catch', 'try catch', 'try/catch/finally'],
  middleware: ['middlewares'],
  controller: ['controllers'],
  endpoint: ['endpoints'],
  rota: ['rotas'],
  request: ['requests', 'requisição', 'requisições'],
  response: ['responses', 'resposta', 'respostas'],
  dto: ['DTOs'],
  'injecao-dependencia': ['dependency injection'],
  'arquitetura-camadas': ['layered architecture'],
  'teste-unitario': ['testes unitários', 'unit test', 'unit tests'],
  'inner-join': ['inner join'],
  'left-join': ['left join'],
  'n-plus-1': ['n+1', 'problema n+1'],
  autenticacao: ['authentication'],
  autorizacao: ['authorization'],
  entidade: ['entity', 'entities'],
  fila: ['filas', 'queue', 'queues', 'message queue', 'message queues'],
  heranca: ['inheritance'],
  indice: ['index', 'indexes', 'índices'],
  normalizacao: ['normalization'],
  polimorfismo: ['polymorphism'],
  repository: ['repositories'],
  service: ['services'],
  seguranca: ['security'],
  transacao: ['transações', 'transaction', 'transactions'],
  validacao: ['validações', 'validation', 'validations'],
  log: ['logs'],
};

const SUPPLEMENTAL_GLOSSARY: TechnicalGlossaryEntry[] = [
  {
    term: '.NET',
    definition: 'Plataforma da Microsoft para criar e executar aplicações, com runtime, bibliotecas e ferramentas.',
    aliases: ['dotnet'],
  },
  {
    term: 'C#',
    definition: 'Linguagem de programação tipada da plataforma .NET.',
    aliases: ['C Sharp'],
  },
  {
    term: 'backend',
    definition: 'Parte da aplicação que executa regras, acessa dados e fornece serviços para clientes ou interfaces.',
  },
  {
    term: 'frontend',
    definition: 'Parte da aplicação com a qual o usuário interage diretamente, normalmente no navegador ou aplicativo.',
  },
  {
    term: 'runtime',
    definition: 'Ambiente responsável por executar o programa e oferecer serviços como memória, tipos e exceções.',
  },
  {
    term: 'framework',
    definition: 'Conjunto de bibliotecas e convenções que fornece uma estrutura para desenvolver aplicações.',
    aliases: ['frameworks'],
  },
  {
    term: 'roadmap',
    definition: 'Mapa organizado de assuntos e etapas que orienta uma sequência de aprendizado ou entrega.',
  },
  {
    term: 'dashboard',
    definition: 'Painel que reúne indicadores, atalhos e informações resumidas em uma única visão.',
  },
  {
    term: 'card',
    definition: 'Bloco visual que agrupa informações e ações relacionadas a um item.',
    aliases: ['cards'],
  },
  {
    term: 'quiz',
    definition: 'Questionário curto usado para testar e reforçar o entendimento de um assunto.',
  },
  {
    term: 'strongly typed',
    definition: 'Fortemente tipado: os tipos são conhecidos e verificados, reduzindo combinações inválidas de dados.',
  },
  {
    term: 'serialização',
    definition: 'Conversão de um objeto para um formato transportável ou armazenável, como JSON.',
    aliases: ['serialization', 'serializador', 'serializadores', 'serialize'],
  },
  {
    term: 'SDK',
    definition: 'Software Development Kit: ferramentas e bibliotecas para desenvolver para uma plataforma.',
  },
  {
    term: 'ASP.NET Core',
    definition: 'Framework web multiplataforma do .NET para criar APIs, páginas e serviços.',
  },
  {
    term: 'EF Core',
    definition: 'Entity Framework Core: ORM do .NET que mapeia classes para bancos de dados relacionais.',
    aliases: ['Entity Framework Core', 'EF-Core'],
  },
  {
    term: 'OOP',
    definition: 'Object-Oriented Programming: programação que organiza comportamento e estado em objetos.',
    aliases: ['POO', 'orientação a objetos'],
  },
  {
    term: 'abstração',
    definition: 'Princípio de expor apenas o que importa e esconder detalhes internos de implementação.',
    aliases: ['abstraction'],
  },
  {
    term: 'imutabilidade',
    definition: 'Característica de um valor ou objeto que não pode ser alterado depois de criado.',
    aliases: ['immutability'],
  },
  {
    term: 'nulabilidade',
    definition: 'Regras que indicam se uma referência ou valor pode representar ausência por meio de null.',
    aliases: ['nullability'],
  },
  {
    term: 'memória',
    definition: 'Espaço usado pelo processo para armazenar código, objetos e dados enquanto a aplicação executa.',
    aliases: ['memory'],
  },
  {
    term: 'RAM',
    definition: 'Memória rápida e temporária usada pelos programas em execução.',
  },
  {
    term: 'assincronismo',
    definition: 'Modelo em que uma operação pode aguardar sem bloquear o fluxo que iniciou o trabalho.',
    aliases: ['asynchrony'],
  },
  {
    term: 'resiliência',
    definition: 'Capacidade de continuar operando ou se recuperar de falhas temporárias.',
    aliases: ['resilience'],
  },
  {
    term: 'container',
    definition: 'Ambiente ou componente que encapsula recursos; pode ser de execução ou de injeção de dependências.',
    aliases: ['containers'],
  },
  {
    term: 'database',
    definition: 'Banco de dados: sistema organizado para armazenar, consultar e alterar informações.',
  },
  {
    term: 'JOIN',
    definition: 'Operação SQL que combina linhas de tabelas relacionadas por uma condição.',
    aliases: ['JOINs', 'join'],
  },
  {
    term: 'routing',
    definition: 'Processo de associar uma URL e um método HTTP ao endpoint que atenderá a requisição.',
    aliases: ['roteamento'],
  },
  {
    term: 'Thread Safety',
    definition: 'Propriedade de um código que funciona corretamente mesmo quando acessado por múltiplas threads.',
  },
  {
    term: 'Unit of Work',
    definition: 'Padrão que coordena várias alterações de dados como uma única unidade transacional.',
  },
  {
    term: 'Clean Architecture',
    definition: 'Arquitetura que mantém regras de negócio independentes de frameworks e detalhes externos.',
  },
  {
    term: 'DDD',
    definition: 'Domain-Driven Design: abordagem que modela o software a partir do domínio e da linguagem do negócio.',
  },
  {
    term: 'N-Tier',
    definition: 'Arquitetura que separa uma aplicação em camadas físicas ou lógicas com responsabilidades distintas.',
  },
  {
    term: 'Business Logic',
    definition: 'Regras de negócio que definem decisões, cálculos e restrições próprias do domínio.',
    aliases: ['regra de negócio', 'regras de negócio'],
  },
  {
    term: 'persistência',
    definition: 'Armazenamento durável de dados para que continuem disponíveis após o fim do processo.',
    aliases: ['persistence'],
  },
  {
    term: 'projeção',
    definition: 'Transformação de cada item de uma consulta para selecionar campos ou criar outro formato.',
    aliases: ['projection', 'projeções'],
  },
  {
    term: 'Fluent API',
    definition: 'Estilo de API que encadeia chamadas para formar configurações ou operações legíveis.',
    aliases: ['Fluent'],
  },
  {
    term: 'RBAC',
    definition: 'Role-Based Access Control: autorização baseada nos papéis atribuídos ao usuário.',
  },
  {
    term: 'xUnit',
    definition: 'Framework de testes automatizados para .NET.',
  },
  {
    term: 'profiling',
    definition: 'Medição detalhada do uso de CPU, memória e tempo para localizar gargalos.',
  },
  {
    term: 'branch',
    definition: 'Linha isolada de desenvolvimento no Git que permite trabalhar sem alterar imediatamente a versão principal.',
  },
  {
    term: 'Pull Request',
    definition: 'Solicitação para revisar e integrar alterações de uma branch em outra.',
  },
  {
    term: 'DevOps',
    definition: 'Práticas que aproximam desenvolvimento e operação por colaboração e automação.',
  },
  {
    term: 'RabbitMQ',
    definition: 'Broker de mensagens usado para publicar, enfileirar e entregar mensagens entre sistemas.',
  },
  {
    term: 'BackgroundService',
    definition: 'Classe base do .NET para executar trabalho contínuo em segundo plano dentro de uma aplicação.',
    aliases: ['BackgroundServices', 'background service', 'background services'],
  },
  {
    term: 'IHttpClientFactory',
    definition: 'Fábrica do .NET para configurar e reutilizar HttpClient com gerenciamento adequado de conexões.',
  },
  {
    term: 'socket',
    definition: 'Ponto de comunicação de rede usado para enviar e receber dados entre processos.',
    aliases: ['sockets'],
  },
  {
    term: 'managed heap',
    definition: 'Área de memória gerenciada pelo runtime onde normalmente vivem objetos de tipos de referência.',
  },
  {
    term: 'heap',
    definition: 'Região de memória usada para alocações cuja duração não fica limitada à chamada atual de um método.',
  },
  {
    term: 'stack',
    definition: 'Estrutura de memória por thread que guarda frames de chamadas, variáveis locais e dados temporários.',
    aliases: ['call stack'],
  },
  {
    term: 'StackTrace',
    definition: 'Sequência de chamadas de métodos registrada até o ponto em que ocorreu uma exceção.',
    aliases: ['stack trace', 'stacktraces'],
  },
  {
    term: 'Garbage Collector',
    definition: 'Componente do runtime que identifica objetos sem uso e recupera automaticamente sua memória.',
    aliases: ['GC', 'coletor de lixo'],
  },
  {
    term: 'CLR',
    definition: 'Common Language Runtime: ambiente que executa código .NET e gerencia memória, tipos e exceções.',
  },
  {
    term: 'JIT',
    definition: 'Just-In-Time compiler: converte o código intermediário .NET em código de máquina durante a execução.',
  },
  {
    term: 'Reference Type',
    definition: 'Tipo cuja variável guarda uma referência para um objeto, em vez de conter diretamente todos os dados.',
    aliases: ['Reference Types', 'tipo de referência', 'tipos de referência'],
  },
  {
    term: 'Value Type',
    definition: 'Tipo cuja variável contém o próprio valor; atribuições normalmente copiam seus dados.',
    aliases: ['Value Types', 'tipo de valor', 'tipos de valor'],
  },
  {
    term: 'boxing',
    definition: 'Conversão de um tipo de valor para object ou para uma interface, criando uma representação no heap.',
  },
  {
    term: 'unboxing',
    definition: 'Extração explícita do tipo de valor que havia sido armazenado como object ou interface.',
  },
  {
    term: 'reflection',
    definition: 'API que permite inspecionar tipos, membros e metadados de um programa durante a execução.',
  },
  {
    term: 'delegate',
    definition: 'Tipo que representa uma referência segura para um ou mais métodos com assinatura compatível.',
    aliases: ['delegates'],
  },
  {
    term: 'lambda',
    definition: 'Função anônima curta, frequentemente usada para passar comportamento a LINQ e outras APIs.',
    aliases: ['lambda expression', 'lambda expressions', 'expressão lambda', 'expressões lambda'],
  },
  {
    term: 'Iterator',
    definition: 'Objeto ou padrão que percorre uma sequência um item por vez sem expor sua estrutura interna.',
    aliases: ['iterador', 'iteradores'],
  },
  {
    term: 'enumeração',
    definition: 'Ato de percorrer uma sequência para obter seus itens, normalmente por um enumerador.',
    aliases: ['enumeration'],
  },
  {
    term: 'materialização',
    definition: 'Execução de uma consulta adiada para criar um resultado concreto, como uma List.',
    aliases: ['materialization'],
  },
  {
    term: 'Deferred Execution',
    definition: 'Execução adiada: a consulta só é processada quando seus resultados são enumerados ou materializados.',
    aliases: ['execução adiada'],
  },
  {
    term: 'Expression Tree',
    definition: 'Estrutura de dados que representa código como uma árvore, permitindo que provedores traduzam expressões.',
    aliases: ['Expression Trees', 'árvore de expressão', 'árvores de expressão'],
  },
  {
    term: 'State Machine',
    definition: 'Estrutura que guarda o estado de uma operação e permite que ela continue de um ponto posterior.',
    aliases: ['Máquina de Estados', 'máquina de estado'],
  },
  {
    term: 'ThreadPool',
    definition: 'Conjunto reutilizável de threads mantido pelo runtime para executar trabalhos sem criar uma thread a cada tarefa.',
    aliases: ['thread pool'],
  },
  {
    term: 'thread',
    definition: 'Fluxo de execução que o sistema operacional pode agendar para processar instruções.',
    aliases: ['threads'],
  },
  {
    term: 'throughput',
    definition: 'Vazão: quantidade de trabalho ou requisições concluídas em determinado período.',
    aliases: ['vazão'],
  },
  {
    term: 'I/O',
    definition: 'Entrada e saída, como acesso a rede, arquivos ou banco de dados.',
  },
  {
    term: 'Race Condition',
    definition: 'Falha em que o resultado depende da ordem imprevisível de operações concorrentes.',
    aliases: ['condição de corrida'],
  },
  {
    term: 'Deadlock',
    definition: 'Bloqueio permanente causado por operações que esperam recursos umas das outras.',
  },
  {
    term: 'lock',
    definition: 'Mecanismo de exclusão mútua que permite apenas um fluxo por vez em uma seção crítica.',
  },
  {
    term: 'Semaphore',
    definition: 'Primitiva de sincronização que limita quantas operações podem acessar um recurso simultaneamente.',
    aliases: ['semáforo'],
  },
  {
    term: 'pipeline',
    definition: 'Sequência ordenada de componentes pelos quais uma requisição ou dado é processado.',
  },
  {
    term: 'short-circuit',
    definition: 'Encerramento antecipado do pipeline sem chamar os componentes seguintes.',
    aliases: ['short-circuiting'],
  },
  {
    term: 'callback',
    definition: 'Função fornecida para ser executada posteriormente quando um evento ou operação ocorrer.',
  },
  {
    term: 'boilerplate',
    definition: 'Código repetitivo necessário para estruturar uma solução, mas que contém pouca regra específica.',
  },
  {
    term: 'ControllerBase',
    definition: 'Classe base do ASP.NET Core para controllers de API sem os recursos de views do MVC.',
  },
  {
    term: 'IActionResult',
    definition: 'Contrato que representa diferentes tipos de resposta produzidos por uma action de controller.',
  },
  {
    term: 'ActionResult',
    definition: 'Resultado de uma action HTTP, como sucesso, erro de validação ou recurso não encontrado.',
    aliases: ['ActionResults'],
  },
  {
    term: 'action',
    definition: 'Método público de um controller que atende uma rota e produz uma resposta HTTP.',
    aliases: ['actions'],
  },
  {
    term: 'Razor View',
    definition: 'Template do ASP.NET Core que combina HTML e C# para renderizar páginas no servidor.',
    aliases: ['Razor Views'],
  },
  {
    term: 'MVC',
    definition: 'Model-View-Controller: padrão que separa dados, interface e controle de requisições.',
  },
  {
    term: 'HTTP',
    definition: 'Protocolo usado para troca de requisições e respostas entre clientes e servidores web.',
  },
  {
    term: 'REST',
    definition: 'Estilo arquitetural para APIs orientadas a recursos e aos métodos padronizados do HTTP.',
  },
  {
    term: 'API',
    definition: 'Interface que define como sistemas ou componentes podem solicitar dados e operações.',
    aliases: ['APIs'],
  },
  {
    term: 'Web API',
    definition: 'API acessada por protocolos da web, normalmente HTTP, para integrar aplicações.',
    aliases: ['Web APIs'],
  },
  {
    term: 'JSON',
    definition: 'Formato textual leve usado para representar objetos e trocar dados entre sistemas.',
  },
  {
    term: 'payload',
    definition: 'Conteúdo útil transportado por uma mensagem, requisição, resposta ou token.',
  },
  {
    term: 'status code',
    definition: 'Código numérico da resposta HTTP que informa o resultado da requisição.',
    aliases: ['status HTTP', 'status codes'],
  },
  {
    term: 'header',
    definition: 'Metadado enviado junto de uma requisição ou resposta HTTP.',
    aliases: ['headers', 'cabeçalho', 'cabeçalhos'],
  },
  {
    term: 'Bearer Token',
    definition: 'Credencial enviada no cabeçalho Authorization; quem a possui pode usá-la conforme suas permissões.',
  },
  {
    term: 'Stateless',
    definition: 'Sem estado de sessão armazenado no servidor entre requisições independentes.',
  },
  {
    term: 'Base64Url',
    definition: 'Codificação Base64 adaptada para ser segura em URLs; codifica dados, mas não os criptografa.',
  },
  {
    term: 'OAuth 2.0',
    definition: 'Framework de autorização que permite acesso delegado a recursos por meio de tokens e escopos.',
    aliases: ['OAuth2'],
  },
  {
    term: 'API Key',
    definition: 'Chave usada para identificar ou autenticar uma aplicação consumidora de uma API.',
    aliases: ['API Keys'],
  },
  {
    term: 'Identity Provider',
    definition: 'Serviço responsável por autenticar identidades e emitir informações ou tokens de acesso.',
    aliases: ['Identity Providers', 'provedor de identidade', 'provedores de identidade'],
  },
  {
    term: 'overposting',
    definition: 'Vulnerabilidade em que o cliente consegue preencher propriedades que não deveriam ser alteradas.',
  },
  {
    term: 'Lazy Loading',
    definition: 'Carregamento de dados relacionados somente quando a propriedade é acessada.',
  },
  {
    term: 'Eager Loading',
    definition: 'Carregamento antecipado de dados relacionados na consulta principal, geralmente com Include.',
  },
  {
    term: 'Change Tracker',
    definition: 'Componente do EF Core que acompanha alterações nas entidades para gerar comandos de persistência.',
  },
  {
    term: 'tracking',
    definition: 'Rastreamento de entidades pelo DbContext para detectar e persistir mudanças.',
    aliases: ['tracker', 'trackers', 'rastreamento'],
  },
  {
    term: 'SaveChanges',
    definition: 'Operação do EF Core que persiste no banco as mudanças rastreadas pelo DbContext.',
    aliases: ['SaveChangesAsync'],
  },
  {
    term: 'ORM',
    definition: 'Object-Relational Mapper: ferramenta que mapeia objetos da aplicação para tabelas relacionais.',
  },
  {
    term: 'SQL',
    definition: 'Linguagem usada para consultar e modificar dados em bancos relacionais.',
  },
  {
    term: 'query',
    definition: 'Consulta ou comando usado para buscar e transformar dados.',
    aliases: ['queries'],
  },
  {
    term: 'B-Tree',
    definition: 'Estrutura de árvore balanceada muito usada por índices de banco para localizar dados com eficiência.',
  },
  {
    term: 'Table Scan',
    definition: 'Leitura de muitas ou todas as linhas de uma tabela para encontrar os registros desejados.',
    aliases: ['Table Scans'],
  },
  {
    term: 'Clustered Index',
    definition: 'Índice que determina a organização principal das linhas de uma tabela, conforme o banco de dados.',
    aliases: ['Clustered'],
  },
  {
    term: 'Non-Clustered Index',
    definition: 'Índice separado dos dados da tabela que mantém chaves e referências para localizar as linhas.',
    aliases: ['Non-Clustered'],
  },
  {
    term: 'ACID',
    definition: 'Propriedades de transações: Atomicidade, Consistência, Isolamento e Durabilidade.',
  },
  {
    term: 'Commit',
    definition: 'Confirma definitivamente as alterações realizadas dentro de uma transação.',
  },
  {
    term: 'Rollback',
    definition: 'Desfaz as alterações de uma transação que ainda não foi confirmada.',
  },
  {
    term: 'OLTP',
    definition: 'Processamento de transações online, voltado a muitas operações curtas de leitura e escrita.',
  },
  {
    term: 'DDL',
    definition: 'Data Definition Language: comandos SQL que criam ou alteram estruturas como tabelas e índices.',
  },
  {
    term: 'mock',
    definition: 'Objeto de teste controlado que simula uma dependência e permite verificar interações.',
    aliases: ['mocks'],
  },
  {
    term: 'Clean Code',
    definition: 'Práticas para manter o código legível, simples de alterar e explícito em suas intenções.',
  },
  {
    term: 'Inversão de Controle',
    definition: 'Princípio em que um framework ou container controla a criação e ligação entre componentes.',
    aliases: ['Inversion of Control', 'IoC'],
  },
  {
    term: 'microsserviço',
    definition: 'Serviço pequeno e implantável de forma independente, responsável por uma capacidade específica.',
    aliases: ['microsserviços', 'microservice', 'microservices'],
  },
  {
    term: 'Redis',
    definition: 'Banco de dados em memória frequentemente usado para cache, filas e dados de acesso rápido.',
  },
  {
    term: 'CI/CD',
    definition: 'Automação de integração, testes e entrega ou implantação contínua de software.',
    aliases: ['CI-CD', 'Integração Contínua'],
  },
  {
    term: 'deploy',
    definition: 'Processo de disponibilizar uma versão da aplicação em um ambiente de execução.',
  },
  {
    term: 'observabilidade',
    definition: 'Capacidade de entender o estado interno de um sistema por logs, métricas e traces.',
    aliases: ['observability'],
  },
  {
    term: 'criptografia',
    definition: 'Técnicas que protegem dados transformando-os com algoritmos e chaves.',
    aliases: ['encryption'],
  },
];

const STUDY_TERM_GLOSSARY: TechnicalGlossaryEntry[] = STUDY_TERMS.map((studyTerm) => ({
  term: studyTerm.name,
  definition: studyTerm.simpleExplanation,
  aliases: TERM_ALIASES[studyTerm.id],
}));

const normalized = (value: string) => value.trim().toLocaleLowerCase('pt-BR');
const supplementalNames = new Set(
  SUPPLEMENTAL_GLOSSARY.flatMap((entry) => [entry.term, ...(entry.aliases ?? [])]).map(normalized),
);

export const TECHNICAL_GLOSSARY: TechnicalGlossaryEntry[] = [
  ...STUDY_TERM_GLOSSARY.filter(
    (entry) => ![entry.term, ...(entry.aliases ?? [])].some((name) => supplementalNames.has(normalized(name))),
  ),
  ...SUPPLEMENTAL_GLOSSARY,
];
