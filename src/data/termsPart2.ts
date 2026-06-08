import { StudyTerm } from '../types';

export const TERMS_PART2: StudyTerm[] = [
  {
    id: 'middleware',
    name: 'middleware',
    level: 'intermediário',
    category: 'ASP.NET Core / Web API',
    simpleExplanation: 'Middlewares são como uma "esteira de produção". Toda vez que uma requisição chega na sua API, ela passa por cada uma dessas caixas de código (para verificar login, tratar erros, traduzir dados) antes de chegar no seu controller, e passa de volta por eles na saída.',
    interviewExplanation: 'Middlewares são componentes de software encadeados em um Pipeline que manipulam requisições HTTP e as correspondentes respostas de saída. Cada componente decide se passa a requisição para o próximo componente da fila ou se interrompe (short-circuit) o fluxo.',
    practicalExample: 'app.Use(async (context, next) => {\n  // Antes: logs do request\n  await next();\n  // Depois: logs de saída\n});',
    whenToUse: 'Para tratar problemas transversais aplicados a todas as rotas: tratamento global de exceções, autenticação, logs, rate limiting ou compressão de arquivos.',
    commonErrors: ['Esquecer de chamar o "await next()" no corpo, quebrando todo o sistema, impedindo a requisição de prosseguir para o controller.'],
    interviewQuestion: 'O que acontece quando dizemos que um Middleware fez um "short-circuit"?',
    shortInterviewAnswer: 'Significa que o middleware interceptou o request e retornou uma resposta imediatamente (ex: sem autorização), sem deixar que a requisição siga para o resto do pipeline ou controller.',
    betterInterviewAnswer: 'Short-circuit ocorre quando um middleware decide não chamar a função delegate "next()". Ele preenche o response (ex: status 401 Unauthorized ou 400 Bad Request) e encerra o pipeline prematuramente. É amplamente usado para filtragem preventiva de segurança e mecanismos locais de cache.',
    tags: ['ASP.NET Core', 'Pipeline', 'HTTP'],
    quiz: {
      question: 'Como middlewares são configurados na inicialização do ASP.NET Core?',
      options: ['Nas configurações do banco Sql', 'Pelo Program.cs usando métodos "app.Use..." em ordem sequencial', 'Por meio de atributos [Authorize] no controller', 'São ativados automaticamente por IA'],
      answerIndex: 1,
      explanation: 'A configuração ocorre sequencialmente no arquivo Program.cs; a ordem de declaração define a ordem de execução.'
    }
  },
  {
    id: 'controller',
    name: 'controller',
    level: 'básico',
    category: 'ASP.NET Core / Web API',
    simpleExplanation: 'O Controller é o gerente de tráfego do seu backend. É uma classe específica que escuta os pedidos da internet, decide o que deve ser feito (chamando serviços de regras de negócio) e devolve a resposta final.',
    interviewExplanation: 'Controllers são classes derivadas de "ControllerBase" no ASP.NET Core Web API. Elas agrupam endpoints HTTP associados e são responsáveis pela validação inicial dos dados da requisição, roteamento e devolução de ActionResults apropriados.',
    practicalExample: '[ApiController]\n[Route("api/[controller]")]\npublic class ClientesController : ControllerBase {\n  // endpoints\n}',
    whenToUse: 'Para agrupar endpoints que administram um mesmo grupo lógico de recursos de dados (ex: rotas de Clientes, Vendas ou Produtos).',
    commonErrors: ['Escrever lógica de negócio pesada, queries de banco de dados ou loops dentro de controllers. Deixe-os magros e delegue o trabalho real para Services ou Casos de Uso.'],
    interviewQuestion: 'Qual a diferença conceitual entre classificar um controller com ControllerBase ou Controller?',
    shortInterviewAnswer: 'ControllerBase é ideal para Web APIs limpas. Controller estende ControllerBase e traz suporte a renderizações de páginas HTML visíveis (Views, MVC).',
    betterInterviewAnswer: 'Ao construir Web APIs pragmáticas, herdamos de ControllerBase, que fornece suporte fundamental a roteamento e métodos utilitários de retorno HTTP (como Ok(), BadRequest()). A classe base Controller adiciona suporte extra para renderização do padrão MVC clássico com as famosas páginas Razor (.cshtml), que não são necessárias em APIs puramente REST.',
    tags: ['ASP.NET Core', 'API', 'REST'],
    quiz: {
      question: 'Qual o atributo recomendado em C# para sinalizar que uma classe é uma Web API eficiente suportando respostas HTTP dedicadas?',
      options: ['[ApiController]', '[Authorize]', '[HttpGet]', '[Route]'],
      answerIndex: 0,
      explanation: 'O atributo [ApiController] ativa validações automáticas de model state e convenções inteligentes de endpoints.'
    }
  },
  {
    id: 'endpoint',
    name: 'endpoint',
    level: 'básico',
    category: 'ASP.NET Core / Web API',
    simpleExplanation: 'O endpoint é uma porta lógica específica exposta na Web API (um endereço acessível, ex: GET na URL /api/usuarios). É a função exata no C# que roda quando um request cai ali.',
    interviewExplanation: 'Um endpoint representa o destino final da rota mapeada no pipeline do ASP.NET Core. Ele é composto por um URI de recurso combinador e uma operação de método HTTP configurada.',
    practicalExample: '[HttpGet("{id}")]\npublic IActionResult ObterPorId(int id) => Ok(new { Id = id });',
    whenToUse: 'Sempre que precisar expor um recurso do seu sistema para consumo de sites, apps mobile ou parceiros de API.',
    commonErrors: ['Expor endpoints com nomes complexos usando verbos nas URLs (ex: /api/salvarUsuario) violando princípios básicos do padrão REST.'],
    interviewQuestion: 'O que compõe uma boa estrutura de endpoint baseada em REST?',
    shortInterviewAnswer: 'A combinação equilibrada de recursos substantivos nas URLs com verbos de ação HTTP corretos (ex: GET /usuarios, POST /usuarios).',
    betterInterviewAnswer: 'Bons endpoints focam em substantivos representativos de coleções e recursos na URI (ex: /clientes), enquanto a operação pretendida é inferida diretamente pelo verbo do protocolo HTTP (GET para buscar, POST para registrar, PUT para subsituir e DELETE para excluir).',
    tags: ['API', 'HTTP', 'REST'],
    quiz: {
      question: 'Como são mapeados substantivos nos endpoints seguindo o bom estilo REST?',
      options: ['Sempre no singular com verbos inseridos (ex: /getUsuario)', 'Substantivos no plural mapeando coleções (ex: /usuarios)', 'IDs vêm na frente do recurso', 'Endpoints não aceitam letras'],
      answerIndex: 1,
      explanation: 'No REST, coleções de dados são expressas em formato plural (como /usuarios ou /produtos).'
    }
  },
  {
    id: 'rota',
    name: 'rota',
    level: 'básico',
    category: 'ASP.NET Core / Web API',
    simpleExplanation: 'Rota é o endereço virtual ou o link correspondente que você digita para chegar até um endpoint. Exemplo: no endereço de site "https://minhaapi.com/v1/usuarios", a rota é "/v1/usuarios".',
    interviewExplanation: 'O Roteamento é o mecanismo do ASP.NET Core que inspeciona o caminho relativo (Path) do request de entrada, cruza-o com a tabela de rotas registradas via "Attribute Routing" ou rotas convencionais, e delega para o endpoint correto.',
    practicalExample: '[Route("api/v1/produtos")]',
    whenToUse: 'Sempre para instruir o framework sobre quais caminhos textuais levam a quais controllers e ações.',
    commonErrors: ['Escrever conflitos de rotas onde mais de uma função escuta o mesmíssimo link e verbo HTTP, fazendo com que o ASP.NET estoure um erro crônico no startup.'],
    interviewQuestion: 'Como funciona o Attribute Routing no ASP.NET?',
    shortInterviewAnswer: 'É o mapeamento de rotas diretamente em cima do controller e das actions usando atributos como [Route("api/produtos")] no próprio código C#.',
    betterInterviewAnswer: 'Attribute Routing associa URLs a endpoints utilizando metadados diretamente no código-fonte. Decoramos controllers e actions com tags como [Route] facilitando a leitura de novos caminhos sem a necessidade de manter tabelas de mapeamento centralizadas que causam confusões em equipes grandes.',
    tags: ['Routing', 'Web API', 'C#'],
    quiz: {
      question: 'O que o atributo [Route("api/[controller]")] faz?',
      options: ['Salva a rota no banco de dados', 'Usa o nome da classe do Controller (removendo a palavra Controller) como nome da rota automaticamente', 'Desativa o roteamento', 'Cria um arquivo de backup'],
      answerIndex: 1,
      explanation: 'O token [controller] substitui o segmento pelo nome do controller dinamicamente (ex: ClientesController vira /api/clientes).'
    }
  },
  {
    id: 'request',
    name: 'request',
    level: 'básico',
    category: 'HTTP e REST',
    simpleExplanation: 'Request é a requisição, ou seja, a carta de pedido que o seu cliente (celular, site, app) envia pela internet para as APIs do C#. Ela contém a URL, o cabeçalho (headers) e o corpo de envio (body).',
    interviewExplanation: 'Um request HTTP é a mensagem emitida pelo cliente em direção ao servidor. Contém linha de solicitação contendo Método HTTP, URI, Versão, além de Headers utilitários de transmissão e o opcional Body serializado.',
    practicalExample: 'POST /v1/produtos HTTP/1.1\nHost: api.com\nContent-Type: application/json\n\n{ "nome": "Caneta" }',
    whenToUse: 'Sempre que houver interação do cliente com o seu backend de rede.',
    commonErrors: ['Expor senhas ou chaves sensíveis de criptografia em requisições GET visíveis (URLs) de modo indiscreto.'],
    interviewQuestion: 'Do que é composto o payload de um Request HTTP?',
    shortInterviewAnswer: 'Por uma URL com parâmetros opcionais (Query), cabeçalhos de contexto (Headers) e corpo opcional em formato texto (JSON/XML).',
    betterInterviewAnswer: 'Uma mensagem de requisição HTTP consiste em: 1) Método HTTP (verbo como GET/POST), 2) O endereço do recurso (URI/URL), 3) Cabeçalhos que determinam controle de cache, tipo de dados aceitos (Accept) e Tokens de segurança, e 4) O corpo de dados que carrega os modelos serializados para serem tratados no backend.',
    tags: ['HTTP', 'Request', 'REST'],
    quiz: {
      question: 'Qual cabeçalho de Request indica o formato de dados enviado no corpo?',
      options: ['Accept-Encoding', 'Content-Type', 'User-Agent', 'Authorization'],
      answerIndex: 1,
      explanation: 'Content-Type indica ao backend se o conteúdo no payload é JSON (application/json), XML, HTML ou outro.'
    }
  },
  {
    id: 'response',
    name: 'response',
    level: 'básico',
    category: 'HTTP e REST',
    simpleExplanation: 'O Response é a resposta que o servidor C# envia de volta para as telas do cliente. Ela diz se o processo deu certo ou errado usando "Status Codes" numéricos (como 200 para Ok ou 404 para não achado).',
    interviewExplanation: 'O response HTTP é o pacote de dados emitido pelo servidor contendo um status numérico classificatório explicativo, cabeçalhos de resposta e corpo descritivo estruturado (JSON, strings, etc.).',
    practicalExample: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "success": true }',
    whenToUse: 'Como resposta e resultado a qualquer request processado pela API backend.',
    commonErrors: ['Retornar status de erro 500 Interno genérico com a mensagem de stacktrace crua vazando dados sensíveis de segurança do seu banco no corpo do response.'],
    interviewQuestion: 'O que determina a semântica de uma resposta HTTP para o cliente?',
    shortInterviewAnswer: 'O código de Status HTTP fornecido pelo servidor (ex: as famílias de dezenas 2xx de sucesso, 4xx de erros do cliente e 5xx de falhas do servidor).',
    betterInterviewAnswer: 'A semântica de uma resposta baseia-se na entrega dos Status Codes de forma correta e higienizada. Códigos 200/201 traduzem resoluções positivas, 400 Bad Request indica payloads malformados pelo usuário, 401/403 problemas de permissões legais, e 500 falhas no motor interno da aplicação.',
    tags: ['HTTP', 'Response', 'REST'],
    quiz: {
      question: 'Qual o código correto de Status de resposta para um recurso recém-criado na Web API?',
      options: ['200 Ok', '201 Created', '400 Bad Request', '500 Server Error'],
      answerIndex: 1,
      explanation: '201 Created é a especificação perfeita para registrar criação bem sucedida no protocolo HTTP/REST.'
    }
  },
  {
    id: 'get',
    name: 'GET',
    level: 'básico',
    category: 'HTTP e REST',
    simpleExplanation: 'O método GET serve única e exclusivamente para buscar e ler informações das APIs do seu aplicativo. Ele não deve alterar dados do banco, apenas servir como consulta rápida.',
    interviewExplanation: 'GET é um método HTTP seguro e idempotente. Ele deve ser utilizado unicamente para recuperar recursos do servidor sem produzir efeitos colaterais de alteração de dados no servidor.',
    practicalExample: 'GET /api/produtos?categoria=livros',
    whenToUse: 'Consultas, buscas, paginações, seleções de detalhes por ID e filtragem em coleções do backend.',
    commonErrors: ['Usar GET para fazer lógicas que deletam arquivos ou alteram estado de tabelas de banco de dados (quebra a segurança e convenção do protocolo).'],
    interviewQuestion: 'O que significa dizer que o verbo GET é seguro e idempotente?',
    shortInterviewAnswer: 'Seguro porque não altera dados. Idempotente porque se você chamar o mesmo GET 100 vezes de forma idêntica, o servidor te devolverá exatamente o mesmo resultado lógico livre de efeitos colaterais.',
    betterInterviewAnswer: 'Na especificação HTTP, métodos seguros são aqueles que não causam mutações de estado no servidor. Idempotência garante que requisições repetidas idênticas retornem o mesmo resultado sem novos efeitos paralelos no ecossistema de dados. O GET obedece a ambas as regras por convenção de padrão REST.',
    tags: ['HTTP', 'REST', 'GET'],
    quiz: {
      question: 'O método GET suporta envio de payloads pesados em formato de corpo JSON por padrão de internet?',
      options: ['Sim, é o ideal', 'Não, pois por especificação o GET não deve conter corpos de requisições, passando parâmetros apenas via URL/Query', 'Apenas no C# 12', 'Apenas em conexões via rede 5G'],
      answerIndex: 1,
      explanation: 'O GET tradicional passa lógicas de filtros na Query String ou na URL; corpos complexo (bodies) são recusados pelas infraestruturas para GET.'
    }
  },
  {
    id: 'post',
    name: 'POST',
    level: 'básico',
    category: 'HTTP e REST',
    simpleExplanation: 'O POST serve para enviar novas informações para o seu aplicativo. Pense nele como o botão "Salvar": ele pega o objeto enviado no corpo da requisição e insere um registro novo no seu banco de dados.',
    interviewExplanation: 'O verbo POST é usado para submeter dados para processamento que resultará na criação de um recurso subordinado ao identificador especificado. Ele não é seguro e nem idempotente.',
    practicalExample: 'POST /api/clientes\nBody: { "nome": "José" }',
    whenToUse: 'Criação de novos registros em tabelas, disparo de e-mails, processos complexos que iniciam fluxos de transação financeira.',
    commonErrors: ['Escrever endpoints repetidos de POST sem validação de dados duplicados, inserindo dados repetitivos eternamente.'],
    interviewQuestion: 'Por que o POST não é considerado idempotente?',
    shortInterviewAnswer: 'Porque se você emitir o mesmo POST 5 vezes seguidas, ele criará 5 registros idênticos repetidos no seu banco se você não tratar manualmente.',
    betterInterviewAnswer: 'POST não é idempotente pois cada requisição é única e gera novos efeitos de negócio colaterais cumulativos no servidor (ex: repetidas idas clonando inserções). Isso difere dos métodos PUT e DELETE que apenas buscam garantir um estado final esperado indiferente do número de chamadas repetidas.',
    tags: ['HTTP', 'POST', 'REST'],
    quiz: {
      question: 'Qual status code HTTP é comumente retornado em um endpoint POST bem-sucedido que cria um recurso?',
      options: ['200 Ok ou 201 Created', '404 Not Found', '204 No Content', '302 Redirect'],
      answerIndex: 0,
      explanation: 'Podemos retornar o clássico 200 Ok com o ID gerado ou respeitar o REST perfeito devolvendo o status 201 Created.'
    }
  },
  {
    id: 'put',
    name: 'PUT',
    level: 'básico',
    category: 'HTTP e REST',
    simpleExplanation: 'O PUT serve para atualizar um registro inteiro no seu backend. Se você precisa mudar o cadastro de um produto e envia os novos dados por ele, ele espera que você forneça TODAS as propriedades do produto para fazer a substituição total do item no banco.',
    interviewExplanation: 'PUT é um método HTTP idempotente que atualiza de forma integral um recurso no servidor sob a ID especificada. Caso o registro não exista, ele pode realizar a criação inicial se a regra do negócio permitir.',
    practicalExample: 'PUT /api/produtos/12\nBody: { "nome": "Monitor", "preco": 850.00 }',
    whenToUse: 'Atualizações completas de cadastros de forma idempotente.',
    commonErrors: ['Passar dados fracionados (apenas o preço, por exemplo) para um endpoint PUT, fazendo com que as outras propriedades da entidade sejam zeradas por falta de envio.'],
    interviewQuestion: 'Qual a diferença crucial entre a atualização realizada por PUT e pelo verbo PATCH?',
    shortInterviewAnswer: 'PUT atualiza o objeto inteiro de uma só vez (substituição total). PATCH realiza uma atualização cirúrgica, alterando apenas os campos específicos enviados.',
    betterInterviewAnswer: 'PUT realiza a alteração de estado sobre o recurso com semântica de substituição total. Exige o envio de todo o payload do objeto. PATCH realiza atualizações parciais, aplicando apenas deltas ou correções cirúrgicas de campos selecionados, o que economiza banda de rede no transporte.',
    tags: ['HTTP', 'PUT', 'REST'],
    quiz: {
      question: 'Se chamarmos repetidamente o mesmo PUT idêntico contra um servidor, o registro no banco sofrerá alterações cumulativas?',
      options: ['Sim, duplicará toda vez', 'Não, pois PUT é idempotente e o estado final do registro permanecerá o mesmos das chamadas anteriores', 'O servidor cai imediatamente', 'Lança um erro de null reference'],
      answerIndex: 1,
      explanation: 'Sendo idempotente por contrato, chamar o PUT múltiplas vezes idênticas assegura que o estado final desejado será sempre o mesmo criado.'
    }
  },
  {
    id: 'patch',
    name: 'PATCH',
    level: 'intermediário',
    category: 'HTTP e REST',
    simpleExplanation: 'O PATCH faz uma alteração cirúrgica de um registro. Se você só quer alterar o campo "Preco" de um "Produto" de 10 páginas de propriedades, você manda uma requisição PATCH passando apenas esse campo, poupando dados enviados na rede.',
    interviewExplanation: 'O método HTTP PATCH realiza modificações parciais em um recurso. Pode ser implementado de forma direta recebendo um DTO com campos nulos opcionais, ou seguindo o padrão oficial conhecido como JSON Patch (RFC 6902).',
    practicalExample: 'PATCH /api/produtos/12\nBody: { "preco": 920.00 }',
    whenToUse: 'Atualização rápida e cirúrgica de dados de tamanho considerável na rede física.',
    commonErrors: ['Girar lógicas de PATCH complexas sem proteger o banco de validações incompletas na entidade de domínio.'],
    interviewQuestion: 'O que é a especificação JSON Patch que C# suporta?',
    shortInterviewAnswer: 'É uma estrutura padronizada para descrever modificações usando operações como "replace", "add" ou "remove" em formato estruturado.',
    betterInterviewAnswer: 'Para PATCH ideal em conformidade de padrões, usamos JSON Patch (RFC 6902) implementado no .NET. Ele trabalha recebendo uma sequência de objetos de instruções declarando operações. Exemplo: [{"op": "replace", "path": "/preco", "value": 90}]. Isso reduz de forma fantástica conflitos concorrentes de dados.',
    tags: ['HTTP', 'PATCH', 'REST'],
    quiz: {
      question: 'Assinale o caso de uso perfeito do verbo HTTP PATCH:',
      options: ['Consultar fotos pesadas de produtos', 'Deletar uma conta de usuário do servidor', 'Ativar ou inativar uma flag de boolean (ex: IsAtivo = false)', 'Instalar pacotes NuGet de desenvolvimento'],
      answerIndex: 2,
      explanation: 'Ativar flags é o exemplo perfeito do PATCH, pois de forma barata e minimalista alteramos apenas um pequeno campo no banco de dados.'
    }
  },
  {
    id: 'delete',
    name: 'DELETE',
    level: 'básico',
    category: 'HTTP e REST',
    simpleExplanation: 'O DELETE serve para apagar um registro específico do seu aplicativo ou banco de dados através da ID dele na URL.',
    interviewExplanation: 'Método HTTP utilizado para remover a representação de um recurso no servidor de forma idempotente.',
    practicalExample: 'DELETE /api/produtos/14',
    whenToUse: 'Deselecionar ou expurgar termos e elementos críticos do banco de dados.',
    commonErrors: ['Esquecer que no mundo real raramente fazemos exclusões físicas (hard delete). Na maioria das vezes, fazemos exclusões lógicas (soft delete), apenas alterando colunas IsAtivo para inativo.'],
    interviewQuestion: 'O método DELETE deve retornar corpo na resposta?',
    shortInterviewAnswer: 'Não obrigatoriamente. Usualmente retorna-se o status 204 No Content se bem sucedido, sem conteúdo no corpo.',
    betterInterviewAnswer: 'O DELETE é convencionado a retornar Http Status 204 No Content se a remoção obteve sucesso imediato sem novos dados de retorno opcionais, ou Status 200 Ok se você quiser expor metadados ou o objeto apagado como recibo da transação executada.',
    tags: ['HTTP', 'DELETE', 'REST'],
    quiz: {
      question: 'Qual o comportamento esperado de um DELETE se você tentar deletar um ID que acabou de ser removido anteriormente?',
      options: ['Lança um erro 500 fatal e derruba o aplicativo', 'Retorna 404 de não encontrado ou 204 No Content de forma silenciosa e idempotente', 'O banco de dados trava a tabela inteira por precaução', 'Dispara um e-mail para o administrador do sistema'],
      answerIndex: 1,
      explanation: 'Sendo idempotente, deletar algo que já não está lá pode responder com 204 ou 404, sem gerar novas quebras ou quebras sistêmicas no backend.'
    }
  },
  {
    id: 'dto',
    name: 'DTO',
    level: 'básico',
    category: 'DTO, Models e validação',
    simpleExplanation: 'DTO (Data Transfer Object) é um pacote leve de propriedades feito para trafegar dados entre o frontend e a sua API. Ele apenas carrega dados primitivos, sem regras de negócio ou lógicas complexas de herança, limpo de dependências.',
    interviewExplanation: 'DTO é um padrão de projeto clássico que encapsula dados brutos em uma estrutura pura (sem lógica comportamental). Serve para isolar o contrato público da API da representação física das tabelas do banco de dados (entidades).',
    practicalExample: 'public record CriarUsuarioDTO(string Email, string Nome);',
    whenToUse: 'Na entrada e saída de dados de qualquer endpoint, para enviar e expor apenas aquilo que é de fato essencial do contrato.',
    commonErrors: ['Usar entidades diretas de banco de dados (como as do EF Core) como corpo de request/response da API, o que expõe dados internos e acopla o contrato ao esquema do banco.'],
    interviewQuestion: 'Por que não devemos expor nossas entidades reais do banco de dados na API (no lugar do DTO)?',
    shortInterviewAnswer: 'Para segurança de dados (prevenir Overposting) e desacoplar o esquema físico do banco de dados do contrato exibido no frontend ou integrações de rede.',
    betterInterviewAnswer: 'Não expor entidades no controller evita vulnerabilidades de Overposting, onde um usuário mal-intencionado envia propriedades extras no JSON (ex: IsAdmin) que podem ser salvas automaticamente. Além disso, DTOs blindam o contrato da Web API se precisarmos refatorar uma coluna ou mapear relacionamentos no EF Core.',
    tags: ['Mapeamento', 'DTO', 'Clean Architecture'],
    quiz: {
      question: 'Qual a principal vantagem de isolar os controllers com DTOs dedicados?',
      options: ['O código executa em JavaScript nativo no servidor', 'Protege contra inserções indesejadas (Overposting), oculta propriedades confidenciais e previne quebras se o banco mudar', 'Aumenta as chances de ganhar um aumento salarial', 'Permite rodar o software sem compilador'],
      answerIndex: 1,
      explanation: 'Os DTOs são o escudo protetor sanitizador de contratos entre a inteligência externa do mundo conectado e suas tabelas internas de domínio.'
    }
  },
  {
    id: 'entidade',
    name: 'entidade',
    level: 'básico',
    category: 'DTO, Models e validação',
    simpleExplanation: 'A entidade é um objeto inteligente que representa uma tabela concreta no seu banco de dados e possui as lógicas e regras essenciais de validação e consistência daquele domínio.',
    interviewExplanation: 'Em arquiteturas de software (DDD), a Entidade é um objeto que possui identidade em sua linha do tempo (ID contínuo), contendo regras de mutação e mapeamentos diretamente ligados com o armazenamento físico do banco de dados.',
    practicalExample: 'public class Usuario {\n  public int Id { get; private set; }\n  public string Email { get; private set; }\n  // regras internas e comportamentos\n}',
    whenToUse: 'Dedicado ao escopo de persistência e repositórios que gravam ou leem no banco.',
    commonErrors: ['Esquecer regras básicas de consistência e criar classes cheias de propriedades públicas burras sem validação (anemia de domínio).'],
    interviewQuestion: 'O que qualifica uma Entidade em relação a um DTO ou Value Object?',
    shortInterviewAnswer: 'Possuir um Identificador único contínuo independente de suas outras propriedades (ex: ID numérico persistente ou Guid).',
    betterInterviewAnswer: 'Value Objects são definidos puramente por seus valores mutáveis coletivos. Entidades são definidas por sua identidade própria através de uma chave primária (ID/Guid) que resiste a alterações de outras propriedades ao longo de todo o ciclo de persistência e ciclo de vida da aplicação.',
    tags: ['DDD', 'Dados', 'Acesso - Banco'],
    quiz: {
      question: 'Onde residem conceitualmente as entidades do nosso domínio?',
      options: ['No navegador do cliente do app', 'No núcleo (Core) da aplicação ou camada Domain', 'Na biblioteca de arquivos CSS', 'Na memória síncrona do servidor Redis'],
      answerIndex: 1,
      explanation: 'As entidades são o coração das regras organizacionais de negócio em arquitetura limpa.'
    }
  },
  {
    id: 'validacao',
    name: 'validação',
    level: 'básico',
    category: 'DTO, Models e validação',
    simpleExplanation: 'Validação serve para analisar se os dados digitados pelo usuário estão corretos (ex: e-mail válido, CPF com número certo de dígitos, preço maior que zero) antes de processar no aplicativo.',
    interviewExplanation: 'Consiste na checagem sistemática de regras do contrato e domínio nos payloads de entrada do sistema. No .NET Core, é implementado via Data Annotations ou com o pacote FluentValidation.',
    practicalExample: '[Required(ErrorMessage = "O Email é obrigatório!")]\npublic string Email { get; set; }',
    whenToUse: 'Em todos os canais de recepção de dados externos nas bordas da aplicação C# para filtrar requisições ruins com status 400 Bad Request precoce.',
    commonErrors: ['Rodar validações pesadas somente lá no final do processo no banco de dados, desperdiçando tempo de máquina e gerando lógicas fracas no controle da Web API.'],
    interviewQuestion: 'O que o FluentValidation traz de vantagem em relação ao Data Annotations comum em C#?',
    shortInterviewAnswer: 'Melhora o desacoplamento isolando as regras de validação das classes DTO e possibilita testes unitários exclusivos para regras complexas.',
    betterInterviewAnswer: 'FluentValidation é uma biblioteca que remove o acoplamento das anotações nas propriedades e permite criar classes validadoras isoladas usando uma Fluent API. Isso facilita regras complexas, mensagens customizadas e testes unitários dedicados.',
    tags: ['Segurança', 'Validação', 'FluentValidation'],
    quiz: {
      question: 'Qual o HTTP Status code de resposta padrão retornado automaticamente quando as validações de modelo (Model State) falham no C#?',
      options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '500 Server Error'],
      answerIndex: 0,
      explanation: 'A Web API com [ApiController] responde automaticamente com 400 Bad Request se os modelos vierem inconsistentes.'
    }
  },
  {
    id: 'injecao-dependencia',
    name: 'injeção de dependência',
    level: 'básico',
    category: 'Injeção de dependência',
    simpleExplanation: 'Injeção de dependência é como "fornecer as ferramentas que seu código precisa para trabalhar". Em vez de criar um serviço internamente com o comando "new", você pede essa ferramenta através do construtor da sua classe facilitando trocar de ferramenta depois.',
    interviewExplanation: 'Injeção de Dependências (DI) é uma técnica que implementa o padrão Inversão de Controle (IoC). O runtime do .NET resolve a criação correta de objetos no momento que são expostos em construtores de classes dependentes.',
    practicalExample: 'public class PedidoController {\n  private readonly IPayService _payService;\n  public PedidoController(IPayService payService) {\n    _payService = payService;\n  }\n}',
    whenToUse: 'Dedicado a desacoplar controllers de serviços de negócios e serviços de infraestrutura para facilitar o design e a manutenção estruturada.',
    commonErrors: ['Acoplar instâncias manuais com "new" em serviços que precisam ler bancos, o que impede a criação de testes automáticos e acopla as instâncias físicas do software.'],
    interviewQuestion: 'Quais os grandes benefícios de se usar Injeção de Dependências em larga escala?',
    shortInterviewAnswer: 'Facilidade de manutenção, código desacoplado (testável) e gerenciamento centralizado do ciclo de vida dos objetos (memória RAM) do servidor .NET.',
    betterInterviewAnswer: 'Injeção de dependência aumenta radicalmente a manutenibilidade do sistema. Ela permite testes unitários fáceis via mocks, remove o acoplamento estrutural rígido que o "new" gera, e permite que o .NET determine quando criar e quando reaver objetos da memória, reduzindo vazamentos de rede ou banco.',
    tags: ['IOC', 'Desacoplamento', 'SOLID', 'Design-Patterns'],
    quiz: {
      question: 'Onde são configuradas e registradas as injeções de dependências oficiais do C# moderno?',
      options: ['Nas tabelas do Postgres sql', 'No Program.cs usando o container nativo Builder.Services', 'Dentro do arquivo de texto Readme do projeto', 'Na pasta bin/Debug da máquina'],
      answerIndex: 1,
      explanation: 'O Program.cs disponibiliza um IServiceCollection (Builder.Services) nativo feito para mapear todos os contratos e implementações do sistema.'
    }
  },
  {
    id: 'transient',
    name: 'Transient',
    level: 'intermediário',
    category: 'Injeção de dependência',
    simpleExplanation: 'Transient é uma ferramenta descartável: Toda vez que o C# encontrar o contrato e precisar usá-la, ele cria uma classe novinha em folha. Se no mesmo pedido ela for chamada 10 vezes, o C# vai criar 10 instâncias diferentes na memória.',
    interviewExplanation: 'Transient cria instâncias efêmeras. O container de injeção de dependência do .NET resolve uma nova instância do serviço registrado para cada componente ou local em que for requerido.',
    practicalExample: 'builder.Services.AddTransient<IGeradorUuid, GeradorUuid>();',
    whenToUse: 'Para serviços leves que não guardam estado interno de dados na memória.',
    commonErrors: ['Injetar um Transient que carrega buffers gigantescos de cache interno nas propriedades, gastando ciclos e memória RAM à toa.'],
    interviewQuestion: 'O que o tempo de vida Transient faz no .NET?',
    shortInterviewAnswer: 'Toda vez que uma classe pede esse serviço, o container de DI cria uma nova instância de forma isolada.',
    betterInterviewAnswer: 'Transient é o escopo com menor longevidade. Cada solicitação de resolução do tipo injetado pelo container de DI do .NET do Program.cs, seja dentro da mesma requisição HTTP ou em locais variados, gera a alocação de uma nova instância na memória Heap.',
    tags: ['Injeção - DI', 'Ciclo de vida'],
    quiz: {
      question: 'Se resolvermos um serviço Transient 3 vezes no mesmo pedido HTTP, quantas instâncias teremos?',
      options: ['1 instância repetida', '3 instâncias exclusivas criadas', 'Nenhuma, dá erro de compilação', 'Depende do navegador do cliente'],
      answerIndex: 1,
      explanation: 'Sendo Transient, ele criará e alocará exatamente 3 instâncias autônomas de classe.'
    }
  },
  {
    id: 'scoped',
    name: 'Scoped',
    level: 'intermediário',
    category: 'Injeção de dependência',
    simpleExplanation: 'O Scoped é uma ferramenta compartilhada por pedido: O C# cria uma única instância que será aproveitada por todas as classes envolvidas naquela mesma requisição de internet. Quando o pedido do cliente termina, aquela instância é destruída.',
    interviewExplanation: 'O ciclo Scoped garante que uma única instância do serviço seja criada por escopo lógico de transação (geralmente equivalente ao ciclo de uma requisição HTTP individual em Web APIs).',
    practicalExample: 'builder.Services.AddScoped<IPedidoRepository, PedidoRepository>();',
    whenToUse: 'Para recursos que mantém dados temporários durante uma requisição de ponta a ponta ou que gerenciam conexões com bancos do tipo DbContext.',
    commonErrors: ['Injetar uma classe Scoped (como DbContext do EF Core) dentro de um serviço Singleton. Isso é um erro gravíssimo de aprisionamento de escopo (Captive Dependency), pois o Singleton vai prender a instância do banco para sempre de forma inativa nas threads!'],
    interviewQuestion: 'Por que o DbContext do Entity Framework Core é registrado como Scoped por padrão no .NET?',
    shortInterviewAnswer: 'Para compartilhar a mesma transação de banco por requisição de forma saudável e garantir a liberação segura da conexão ativa no fim do request.',
    betterInterviewAnswer: 'DbContext é Scoped para garantir que todas as classes injetadas na mesma requisição HTTP compartilhem a mesma transação e cache de rastreamento de entidades (Unit of Work). Se fosse Transient, salvaríamos dados parciais em conexões desconectadas. Ao fim do escopo do request HTTP, o .NET encerra e devolve a conexão de forma limpa para o pool.',
    tags: ['Injeção - DI', 'Ciclo de vida', 'EF Core'],
    quiz: {
      question: 'O que acontece com um serviço Scoped após o término do request HTTP no servidor?',
      options: ['Ele se altera para static de forma definitiva', 'Ele é liberado e coletado pelo Garbage Collector para liberar a memória RAM do app', 'Ele nunca é apagado', 'Fica guardado no disco rígido do dispositivo'],
      answerIndex: 1,
      explanation: 'O fim da requisição elimina o escopo correspondente, iniciando os processos de descarte automático dos serviços.'
    }
  },
  {
    id: 'singleton',
    name: 'Singleton',
    level: 'intermediário',
    category: 'Injeção de dependência',
    simpleExplanation: 'O Singleton é uma ferramenta eterna por aplicativo: O C# cria apenas uma única instância quando o aplicativo liga. Mais inteligente ainda, essa mesma instância fica viva na memória alimentando todos os usuários e acessos até o servidor ser desligado.',
    interviewExplanation: 'O ciclo de vida Singleton garante a existência de uma única instância global ativa para toda a vida operacional de execução do processo web (Process Scope).',
    practicalExample: 'builder.Services.AddSingleton<IMemoryCache, MemoryCache>();',
    whenToUse: 'Para proxies de rede pesados, pools de configurações estáticas do app ou caches compartilhativos que devem persistir ativos para todos os clientes.',
    commonErrors: ['Manter variáveis de estado mutáveis (vulneráveis a concorrência) sem proteção contra race conditions (threads paralelas alterando o mesmo contador simultaneamente podem quebrar e travar a API).'],
    interviewQuestion: 'Quais os perigos do Singleton em termos de concorrência de recursos (Thread Safety)?',
    shortInterviewAnswer: 'Como todos os acessos paralelos usam a mesma instância, se você alterar estado de variáveis corporativas internas sem travas concorrentes simultâneas (locks), os dados do seu sistema podem se corromper totalmente.',
    betterInterviewAnswer: 'Singletons precisam ser estritamente seguros para concorrência multilinha (Thread-Safe). Várias threads acessando em paralelo modificáveis comuns podem resultar em Race Conditions graves. Devemos blindar esses códigos usando travas ativas (locks), SemaphoreSlim ou tipos concorrentes integrados do .NET como ConcurrentDictionary.',
    tags: ['Injeção - DI', 'ThreadPool', 'Thread Safety'],
    quiz: {
      question: 'Qual o tempo de vida teórico de uma instância registrada com o método "AddSingleton"?',
      options: ['3 minutos exatos', 'Do início do processo (boot da API) até a completa paralisação ou desligamento do servidor Web', 'Apenas até o primeiro visitante acessar a página', 'Varia a cada segundo consultado'],
      answerIndex: 1,
      explanation: 'O Singleton dura toda a vida operacional da API desde o seu boot até o teardown.'
    }
  },
  {
    id: 'dbcontext',
    name: 'DbContext',
    level: 'básico',
    category: 'Entity Framework Core',
    simpleExplanation: 'O DbContext é o grande "porteiro" e portal do seu banco de dados no .NET. É a classe onde você configura quais tabelas se ligam ao C#, permitindo ler ou salvar qualquer registro usando código C# limpo e traduzido.',
    interviewExplanation: 'A classe DbContext é o ponto de contato principal do Entity Framework Core. Ela rastreia entidades e é projetada para representar uma unidade de trabalho de curta duração.',
    practicalExample: 'public class AppDbContext : DbContext {\n  public DbSet<Cliente> Clientes { get; set; }\n}',
    whenToUse: 'Sempre para intermediar conexões, realizar mapeamentos fluent e declarar interações físicas de tabelas com APIs .NET.',
    commonErrors: ['Esquecer de instanciar ou configurar as strings de conexão adequadas no appsettings.json, impedindo o DbContext de subir no boot.'],
    interviewQuestion: 'O que o padrão Unit of Work representado pelo DbContext faz?',
    shortInterviewAnswer: 'Ele acompanha as alterações feitas nas entidades no mesmo request e só as grava no banco quando você chama SaveChangesAsync().',
    betterInterviewAnswer: 'O DbContext funciona como uma unidade de trabalho curta: ele rastreia entidades consultadas ou anexadas, detecta mudanças e as persiste quando SaveChangesAsync() é chamado. Depois do uso, o contexto deve ser descartado.',
    tags: ['EF Core', 'Unit of Work', 'ORM'],
    quiz: {
      question: 'Qual método realizador do DbContext grava fisicamente as transações acumuladoras de memória no banco de dados relational terminal?',
      options: ['app.UseDb()', 'dbContext.SaveChangesAsync()', 'dbContext.LoadAll()', 'System.Save()'],
      answerIndex: 1,
      explanation: 'SaveChanges() ou SaveChangesAsync() materializa as alterações pendentes gerando instruções SQL de INSERT/UPDATE/DELETE combinadas.'
    }
  },
  {
    id: 'dbset',
    name: 'DbSet',
    level: 'básico',
    category: 'Entity Framework Core',
    simpleExplanation: 'O DbSet é a sua tabela do banco representada dentro do C#. Se você tem um "DbSet<Usuario>" no seu código C#, você pode usá-lo como se fosse uma lista de usuários para filtrar, buscar ou adicionar novas pessoas.',
    interviewExplanation: 'DbSet<TEntity> é uma classe genérica utilitária que mapeia coleções persistidas de banco sobre tipos no .NET Core. Ele disponibiliza métodos comuns de CRUD para consultar agregados.',
    practicalExample: 'var ativos = await db.Clientes.Where(c => c.Ativo).ToListAsync();',
    whenToUse: 'Para mapear e expor coleções físicas estruturadas do banco de dados em seu DbContext corporativo.',
    commonErrors: ['Utilizar loops em DbSet sem paginar antes, obrigando o banco a coletar todo o conteúdo (milhões de registros) enviando e gerando lentidão extrema no hardware.'],
    interviewQuestion: 'O que é o DbSet em termos funcionais para o EF Core?',
    shortInterviewAnswer: 'É a representação abstrata de acesso a uma tabela do banco de dados relacional que se comporta de maneira similar a uma coleção em memória.',
    betterInterviewAnswer: 'O DbSet funciona como ponto de partida para qualquer interação de query sobre tabelas. Ele expõe uma fachada que aceita e consolida comandos LINQ de forma que, sob os panos, os comandos do C# configurem Expression Trees enviadas para o motor SQL mapeado de infraestrutura.',
    tags: ['EF Core', 'Tabelas', 'ORM'],
    quiz: {
      question: 'Qual método do DbSet é usado para marcar um registro para inserção posterior no banco de dados?',
      options: ['Add / AddAsync', 'DbInsert', 'CommitLine', 'PushItem'],
      answerIndex: 0,
      explanation: 'Add() ou AddAsync() coloca o elemento em estado "Added" no rastreador do DbContext para que a gravação ocorra após chamar o save.'
    }
  },
  {
    id: 'migration',
    name: 'migration',
    level: 'básico',
    category: 'Entity Framework Core',
    simpleExplanation: 'As migrations funcionam como um "sistema de Git para o banco de dados". Toda vez que você cria ou altera uma classe de tabela no C#, a Migration gera um roteiro automático de SQL para atualizar as tabelas reais do seu banco sem perder os dados que já estão lá.',
    interviewExplanation: 'Migrations traduzem diferenças históricas de código C# (entidades) em código DDL automatizado que reflete seguras modificações no layout físico das tabelas de banco de dados, rastreando versões por data e ordem.',
    practicalExample: 'dotnet ef migrations add AdicionarTelefoneCliente\ndotnet ef database update',
    whenToUse: 'Para evoluir de forma profissional a modelagem estrutural do banco relacional de forma automatizada por versionamento.',
    commonErrors: ['Aplicar alterações diretas na mão no banco relacional de desenvolvimento sem gerar as Migrations. Isso quebra a consistência do versionamento e faz o deploy em produção crashar por tabelas divergentes.'],
    interviewQuestion: 'Como funcionam os mecanismos UP e DOWN de uma Migration?',
    shortInterviewAnswer: 'UP define as alterações para subir de versão (ex: criar coluna), enquanto DOWN codifica como desfazer essas mesmas atualizações caso seja necessário reaver o estado de volta.',
    betterInterviewAnswer: 'Cada Migration gerada carrega dois caminhos explícitos no C# compilado: O método Up(), contendo comandos efetuados para aplicar a nova versão (ex: CreateTable), e o método Down(), contendo instruções exatas de reversão caso os scripts precisem ser revertidos com comando rollback imediato.',
    tags: ['Database', 'EF Core', 'Migrations'],
    quiz: {
      question: 'Como geramos novas lógicas de migrações nos terminais e paineis de desenvolvedor .NET?',
      options: ['Por meio do IIS manager', 'Através do CLI .NET executando comandos "dotnet ef migrations add [Nome]"', 'Mudando o formato do arquivo csproj', 'Eles se autogeram sem comandos'],
      answerIndex: 1,
      explanation: 'O CLI do Entity Framework Core disponibiliza comandos dedicados para avaliar o código e gerar os scripts Up/Down baseados em diferenças.'
    }
  },
  {
    id: 'include',
    name: 'Include',
    level: 'intermediário',
    category: 'Entity Framework Core',
    simpleExplanation: 'O Include serve para carregar relacionamentos. Se o "Cliente" se liga a uma lista de "Pedidos", o EF Core traz esses dados junto da consulta principal quando você pede isso explicitamente.',
    interviewExplanation: 'Consiste no padrão de carregamento ansioso (Eager Loading) nativo do EF Core. Ele busca os relacionamentos junto da entidade principal, normalmente por JOINs ou por split queries dependendo da configuração.',
    practicalExample: 'var clienteWithPedidos = await db.Clientes.Include(c => c.Pedidos).ToListAsync();',
    whenToUse: 'Sempre que você for ler uma tabela e precisar ler dados de outras tabelas diretamente ligadas no mesmo fluxo.',
    commonErrors: ['Abusar do Include aninhando muitas tabelas pesadas (Include seguido de vários ThenInclude). Isso pode gerar explosão cartesiana e piorar a performance.'],
    interviewQuestion: 'O que o método Include faz de forma prática no EF Core?',
    shortInterviewAnswer: 'Ele pede que relacionamentos sejam carregados junto com a consulta principal.',
    betterInterviewAnswer: 'O Include ativa eager loading. O EF Core traz a entidade principal e suas navegações relacionadas na mesma operação lógica de consulta, usando JOINs ou split queries conforme a estratégia configurada.',
    tags: ['EF Core', 'JOINS', 'Performance'],
    quiz: {
      question: 'Para que o Include é usado no EF Core?',
      options: ['Para carregar dados relacionados junto da consulta', 'Para criar migrations', 'Para desligar o change tracker', 'Para transformar SQL em JSON'],
      answerIndex: 0,
      explanation: 'Include faz eager loading, trazendo relacionamentos junto da consulta principal.'
    }
  },
  {
    id: 'asnotracking',
    name: 'AsNoTracking',
    level: 'avançado',
    category: 'Entity Framework Core',
    simpleExplanation: 'O AsNoTracking diz ao EF Core para não rastrear as alterações das entidades retornadas. Isso é útil em consultas de leitura que não vão ser editadas depois.',
    interviewExplanation: 'AsNoTracking instrui o EF Core a ignorar o mecanismo de rastreamento de alterações (Change Tracker) para os registros retornados. É ideal para rotas focadas em leitura.',
    practicalExample: 'var clientesLeitura = await db.Clientes.AsNoTracking().ToListAsync();',
    whenToUse: 'Em quase 100% dos relatórios ou visualizações de API que apenas exibem dados (GET) e não realizam atualizações e gravações posteriores.',
    commonErrors: ['Chamar AsNoTracking(), tentar alterar uma propriedade sobre uma entidade recuperada e depois rodar o SaveChangesAsync(), esperando que salve as mudanças (o EF ignora a alteração pois não a vigiou).'],
    interviewQuestion: 'Por que o método AsNoTracking() aumenta radicalmente a performance da aplicação .NET?',
    shortInterviewAnswer: 'Porque evita o custo do Change Tracker em consultas de leitura, reduzindo memória e trabalho desnecessário.',
    betterInterviewAnswer: 'Em consultas de leitura, o rastreamento de entidades adiciona custo de memória e processamento. O AsNoTracking() diz ao EF Core para não adicionar essas entidades ao Change Tracker, o que costuma ser uma boa troca quando você não vai atualizar os dados depois.',
    tags: ['EF Core', 'Performance', 'RAM'],
    quiz: {
      question: 'Temos um processo de alteração em banco e aplicamos .AsNoTracking() na leitura da entidade. Se alterarmos seu nome e rodarmos dbContext.SaveChanges(), o que acontecerá?',
      options: ['A alteração altera o arquivo JSON local', 'Nada será atualizado no banco, pois o EF Core não rastreou nem ouviu a entidade modificada', 'O computador entra em hibernação', 'É exibida uma mensagem de alerta na tela do usuário'],
      answerIndex: 1,
      explanation: 'Como o rastreador Change Tracker ignora elementos sem Tracking, o EF não sabe o que mudou e o SaveChanges não emite nenhum SQL correspondente de atualização.'
    }
  },
  {
    id: 'n-plus-1',
    name: 'N+1',
    level: 'avançado',
    category: 'Entity Framework Core',
    simpleExplanation: 'O problema de N+1 é um fantasma de lentidão: ocorre quando você busca 100 Registros no banco (ex: Clientes) e, ao iterar sobre cada um deles em um loop de repetição no código, você dispara uma nova query individual de consulta ao banco de dados para carregar dados do relacionamento (ex: Pedidos de cada cliente), totalizando 101 idas ao banco de dados.',
    interviewExplanation: 'O problema N+1 clássico no ecossistema .NET decorre do uso de Lazy Loading ou de queries dentro de loops, onde o EF Core faz 1 consulta inicial para a lista principal e depois dispara sub-queries individuais, degradando severamente a performance.',
    practicalExample: 'var clientes = await db.Clientes.ToListAsync(); // 1 query\nforeach (var c in clientes) {\n  var pedidos = await db.Pedidos.Where(p => p.ClienteId == c.Id).ToListAsync(); // N queries!\n}',
    whenToUse: 'Para diagnosticar e curar gargalos graves de latência física e estresse extremo nas rotas de Web API.',
    commonErrors: ['Deixar o Lazy Loading habilitado de forma cega ou aninhar requisições assíncronas assimetricamente dentro de loops baseados em coleções de memória.'],
    interviewQuestion: 'Como solucionamos o terrível problema de performance N+1 com EF Core?',
    shortInterviewAnswer: 'Utilizando Eager Loading (.Include()) para resolver as tabelas de forma estrutural síncrona em uma única consulta SQL no banco, ou projetando com o Select.',
    betterInterviewAnswer: 'A melhor defesa contra o problema de N+1 consiste em usar Eager Loading com .Include() para buscar os relacionamentos em um único roundtrip com JOINS otimizados, ou usar projeções explícitas com .Select() do LINQ. O Select traz exatamente apenas os dados compilados no formato desejado com consultas limpas estruturadas em apenas 1 viagem de rede ao banco.',
    tags: ['EF Core', 'Performance', 'SQL'],
    quiz: {
      question: 'Se carregarmos uma lista com 1.000 clientes e aplicarmos loops que consultam informações acessórias de cada pessoa no banco sem joins, quantas consultas reais o banco executará sob efeito N+1?',
      options: ['Apenas 1 única consulta otimizada', 'Exatamente 1.001 consultas de rede disparadas avulsas', 'Nenhuma consulta roda', 'Dá limite de compilador'],
      answerIndex: 1,
      explanation: 'Roda 1 consulta para reunir os clientes principais, e em seguida dispara 1.000 chamadas avulsas subsequentes no loop.'
    }
  }
];
