import { StudyTerm } from '../types';

export const TERMS_PART3: StudyTerm[] = [
  {
    id: 'inner-join',
    name: 'INNER JOIN',
    level: 'básico',
    category: 'Banco de dados e SQL',
    simpleExplanation: 'INNER JOIN é como achar a "interseção da amizade". Ele junta duas tabelas no banco de dados e só te devolve as linhas que têm correspondência exata dos dois lados da conexão. Exexmplo: Clientes que possuem Pedidos cadastrados.',
    interviewExplanation: 'INNER JOIN combina registros de múltiplas tabelas desde que haja igualdade condicional explícita na chave estrangeira correspondente. Registros órfãos de ambos os lados são excluídos do retorno.',
    practicalExample: 'SELECT c.Nome, p.Valor FROM Clientes c INNER JOIN Pedidos p ON c.Id = p.ClienteId',
    whenToUse: 'Sempre que você precisar de dados consolidados onde a correlação estrutural mútua é obrigatória de existir.',
    commonErrors: ['Esquecer índices em chaves estrangeiras que sofrem INNER JOIN constante, deteriorando o tempo de processamento de buscas em bancos de dados reais.'],
    interviewQuestion: 'O que acontece com um registro pai sem nenhum registro filho atrelado na query INNER JOIN?',
    shortInterviewAnswer: 'Não é retornado na listagem final de resultados, pois ele exige paridade correspondente explícita nas duas tabelas.',
    betterInterviewAnswer: 'Sob escopo INNER JOIN, registros que não possuem correspondências legítimas de chaves estrangeiras entre as tabelas são descartados na projeção. Para manter o registro pai aparecendo mesmo sem dados correspondentes na tabela filha, deve-se usar um LEFT JOIN alternativo.',
    tags: ['SQL', 'Database', 'Performance'],
    quiz: {
      question: 'Qual a principal característica de um INNER JOIN?',
      options: ['Retorna todos os itens do lado esquerdo sem as chaves', 'Retorna apenas registros que possuem paridade perfeita e correlação mútua nas tabelas unidas', 'Limpa as tabelas do banco', 'Deixa o banco temporariamente indisponível'],
      answerIndex: 1,
      explanation: 'O INNER JOIN foca apenas na interseção matemática onde ambas as tabelas contêm dados válidos e correlacionados.'
    }
  },
  {
    id: 'left-join',
    name: 'LEFT JOIN',
    level: 'básico',
    category: 'Banco de dados e SQL',
    simpleExplanation: 'LEFT JOIN serve para trazer "todos mundo da esquerda e quem ele tiver na direita". Se você fizer LEFT JOIN de Clientes com Pedidos, ele traz TODOS os clientes da lista. Se o cliente não tiver pedidos, os campos de pedidos vêm nulos na tela.',
    interviewExplanation: 'LEFT OUTER JOIN retorna todos os registros da tabela à esquerda (chamador inicial), junto com registros mapeados compatíveis da direita. Se não houver correspondência, colunas do lado direito retornam "NULL".',
    practicalExample: 'SELECT c.Nome, p.Valor FROM Clientes c LEFT JOIN Pedidos p ON c.Id = p.ClienteId',
    whenToUse: 'Para listagem onde dados e relacionamentos são opcionais (ex: listar todos os usuários exibindo suas fotos de perfil opcionais).',
    commonErrors: ['Inverter a ordem das tabelas no SQL querendo todos do grupo esquerdo e pondo-os acidentalmente do lado oposto.'],
    interviewQuestion: 'Como as colunas do lado direito se comportam no LEFT JOIN quando não há relação real?',
    shortInterviewAnswer: 'Retornam todas preenchidas com valor NULL de banco, indicando ausência de dados adicionais.',
    betterInterviewAnswer: 'No LEFT JOIN, se a tabela da esquerda contiver um registro que não aponta para nenhum registro filho correspondente na tabela da direita, a linha é projetada com sucesso, porém cada uma das colunas correspondentes à tabela direita assumirá o valor de tipo nulo na tabela de projeção SQL.',
    tags: ['SQL', 'Database', 'Prospecção'],
    quiz: {
      question: 'Qual instrução preserva todos os registros da tabela posicionada primeiramente à esquerda na query SQL?',
      options: ['INNER JOIN', 'LEFT JOIN (ou LEFT OUTER JOIN)', 'C# select', 'RIGHT ONLY'],
      answerIndex: 1,
      explanation: 'O LEFT JOIN garante que todos os dados do conjunto esquerdo serão retornados independentemente de relacionamentos.'
    }
  },
  {
    id: 'indice',
    name: 'índice',
    level: 'intermediário',
    category: 'Banco de dados e SQL',
    simpleExplanation: 'O índice funciona como o "índice remissivo das páginas finais de um livro grosso de receitas". Em vez de o aplicativo ler o banco de dados inteiro folha por folha (Table Scan) para achar um usuário, o índice o direciona direto na página exata.',
    interviewExplanation: 'Um índice de banco de dados é uma estrutura física de dados auxiliar de pesquisa (comumente construídos com árvores do tipo B-Tree) que acelera radicalmente a recuperação de linhas de dados em troca de um pequeno custo extra no salvamento físico por reindexação.',
    practicalExample: 'CREATE INDEX IX_Clientes_Email ON Clientes (Email);',
    whenToUse: 'Em colunas que são repetidamente utilizadas dentro de blocos de filtros (Where) ou ordenações em APIs .NET.',
    commonErrors: ['Colocar índices em absolutamente todas as colunas de uma única tabela (isso prejudica bruscamente operações de escrita como INSERT, UPDATE, DELETE).'],
    interviewQuestion: 'Qual a diferença crucial entre Índice Clustered e Non-Clustered no banco de dados?',
    shortInterviewAnswer: 'Índice Clustered define a ordenação física dos dados no próprio disco rígido (normalmente no ID chave primária). Non-Clustered cria registros e ponteiros lógicos em separado.',
    betterInterviewAnswer: 'O índice Clustered (ou agrupado) dita a ordem física exata em que as linhas de tabelas residem fisicamente no storage. Por isso, só é permitido termos um único índice clustered por tabela (usualmente associado à Chave Primária). Índices Non-Clustered (não agrupados) residem em um espaço paralelo de memória contendo cópia ordenada de buscas indexadas com ponteiros para o registro clustered correspondente.',
    tags: ['SQL', 'Database', 'Index', 'Performance'],
    quiz: {
      question: 'Por que o excesso de índices prejudica o salvamento de dados?',
      options: ['Os computadores esquentam mais rápidos', 'Porque cada INSERT exige que o banco atualize e recalcule todas as árvores B-Tree físicas de índices em separado', 'Os índices são apagados automaticamente', 'Desconfigura conexões síncronas'],
      answerIndex: 1,
      explanation: 'Modificações de escrita impõem sincronização física forçada e reordenação sobre todas as árvores das chaves indexadas.'
    }
  },
  {
    id: 'transacao',
    name: 'transação',
    level: 'intermediário',
    category: 'Banco de dados e SQL',
    simpleExplanation: 'Transação é uma barreira de segurança onde "ou tudo dá certo, ou nada de fato entra no banco". Se você faz um Pix, o software debita da sua conta e credita no destinatário. Se o depósito falhar, a transação cancela o débito (Rollback), evitando que o seu dinheiro suma.',
    interviewExplanation: 'Uma transação gerencia operações sob garantia do padrão ACID. Ela agrupa lógicas de gravações sequenciais onde a falha isolada de qualquer instrução força uma reversão integral (Rollback), enquanto o sucesso unificado de todas aplica a escrita permanente (Commit).',
    practicalExample: 'using var transaction = await _dbContext.Database.BeginTransactionAsync();\ntry {\n  // salva banco...\n  await transaction.CommitAsync();\n} catch {\n  await transaction.RollbackAsync();\n}',
    whenToUse: 'Em processos transacionais imperativos que realizam operações críticas consecutivas dependentes entre si.',
    commonErrors: ['Reter locks de transações muito extensas abertas voluntariamente nas APIs C#, travando o banco e causando lentidões nas sessões concorrentes de outros usuários.'],
    interviewQuestion: 'O que representam as propriedades ACID de uma transação SQL?',
    shortInterviewAnswer: 'Atomicidade (tudo ou nada), Consistência (regras se mantêm), Isolamento (uma não afeta a outra) e Durabilidade (dados persistem no disco).',
    betterInterviewAnswer: 'ACID define garantias de transações confiáveis de banco: 1) Atomicidade: O bloco de escrita executa de forma indissociável de sucesso unificado ou falha unificada total, 2) Consistência: Preserva restrições de integridade, 3) Isolamento: Garante que transações concorrentes simultâneas não vazem dados parciais entre si, e 4) Durabilidade: Uma vez que o Commit ocorre, os dados são permanentemente gravados em mídias físicas de storage sem riscos de perdas.',
    tags: ['ACID', 'Transações', 'Database'],
    quiz: {
      question: 'O que o comando de "Rollback" realiza em uma transação ativa no banco de dados?',
      options: ['Grava metade dos arquivos', 'Desfaz e limpa toda alteração parcial efetuada desde a abertura da transação de volta ao estado inicial saudável', 'Gera um log opcional de auditoria', 'Reinicia as senhas das máquinas'],
      answerIndex: 1,
      explanation: 'O Rollback anula qualquer alteração inconsistente executada de volta à estaca anterior e segura do banco de dados.'
    }
  },
  {
    id: 'normalizacao',
    name: 'normalização',
    level: 'básico',
    category: 'Banco de dados e SQL',
    simpleExplanation: 'Normalizar é organizar as informações do banco em várias tabelas com chaves especificas para evitar guardar o mesmo dado em 10 lugares diferentes (Redundância). Isso deixa o banco mais leve e diminui radicalmente erros de dados desatualizados.',
    interviewExplanation: 'A normalização de banco de dados aplica regras lógicas conhecidas como Formas Normais (1FN, 2FN, 3FN) para eliminar anomalias de escrita e mitigar redundâncias estruturais de armazenamento físico.',
    practicalExample: 'Tabela Clientes e Tabela Enderecos conectadas por IDs, em vez de salvar 10 vezes o Endereço na mesma tabela duplicando itens.',
    whenToUse: 'Durante as etapas iniciais de criação de banco de dados e arquitetura relacional.',
    commonErrors: ['Deixar dados aninhados repetitivos soltos ou desrespeitar relacionamentos de modo que o banco sofra com lentidão ou relatórios quebrados.'],
    interviewQuestion: 'Por que o uso equilibrado de Normalizações é recomendado em sistemas com altos fluxos de escritas (OLTP)?',
    shortInterviewAnswer: 'Porque impede dados duplicados em tabelas de dados de modo a tornar atualizações de cadastros baratas e seguras com consistência garantida.',
    betterInterviewAnswer: 'Normalizações minimizam o armazenamento redundante de dados no servidor físico. Com tabelas bem normalizadas seguindo até a Terceira Forma Normal (3FN), operações transacionais OLTP rodam em altíssima performance, já que modificações necessitam alterar poucas células específicas ligadas de chaves, evitando erros ou lacunas históricas de dados.',
    tags: ['SQL', 'Normalization', 'Data Design'],
    quiz: {
      question: 'O que se pretende mitigar através da normalização de estruturas em bancos SQL?',
      options: ['Redundâncias e anomalias de dados consistentes', 'O número de usuários ativos', 'A segurança criptográfica', 'A velocidade das conexões síncronas de rede'],
      answerIndex: 0,
      explanation: 'Normalizar visa garantir consistência de dados atacando anomalias e redundâncias nocivas.'
    }
  },
  {
    id: 'jwt',
    name: 'JWT',
    level: 'intermediário',
    category: 'Autenticação e autorização',
    simpleExplanation: 'O JWT (JSON Web Token) é um "crachá eletrônico assinado e criptografado". Quando seu usuário faz login com sucesso na API C#, você gera esse crachá com o nome dele e envia. Nas próximas requisições, ele apenas exibe esse crachá para provar quem ele é.',
    interviewExplanation: 'JWT é um padrão compacto e autocontido de segurança (RFC 7519) formatado por três blocos separados por pontos: Header, Payload (contendo claims salvos) e o bloco Signature de validação com criptografia de chave secreta baseada em hash.',
    practicalExample: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiY...',
    whenToUse: 'Mecanismo padrão de autenticação em APIs modernas com arquiteturas sem estado (Stateless).',
    commonErrors: ['Guardar dados sigilosos (como senhas brutas do usuário) nas propriedades internas do token JWT, já que os claims são codificados em Base64 comum fácil de decodificar de fora.'],
    interviewQuestion: 'Como funciona a segurança do bloco Signature de um token JWT?',
    shortInterviewAnswer: 'Utiliza uma chave secreta no servidor C# para calcular um hash encriptado. Se alguém falsificar os dados do token por fora, a assinatura não bate e o C# recusa a conexão imediatamente.',
    betterInterviewAnswer: 'O token JWT é totalmente aberto para leitura até a parte de Payload. A real segurança reside no bloco "Signature". O servidor C# usa algoritmos como HMAC-SHA256 alimentados por uma chave secreta exclusiva interna para assinar os bytes anteriores do Token. Se um atacante externo modificar um único caractere do seu nome no payload do token, ao chegar no backend a assinatura falhará no cálculo preventivo de hash e a conexão será sumariamente abortada.',
    tags: ['Security', 'JWT', 'Autenticação'],
    quiz: {
      question: 'O JWT possui três partes de dados separadas por quais caracteres?',
      options: ['Espaços brancos', 'Caracteres ponto ( . )', 'Traços curingas ( - )', 'Sinais de igualdade ( = )'],
      answerIndex: 1,
      explanation: "As três seções do JWT (Header, Payload e Signature) são segregadas estritamente por pontos '.' decimais de texto."
    }
  },
  {
    id: 'autenticacao',
    name: 'autenticação',
    level: 'básico',
    category: 'Autenticação e autorização',
    simpleExplanation: 'Autenticação é o processo de responder à pergunta: "Quem é você?". É a validação que o sistema faz quando o usuário tenta entrar usando autenticadores válidos (usuário, senha, código do celular) para provar a sua identidade física real.',
    interviewExplanation: 'Processo que verifica a identidade declarada por um agente do sistema baseando-se em credenciais verificadas ativamente e autenticáveis.',
    practicalExample: 'app.UseAuthentication(); // middleware',
    whenToUse: 'Em rotas da API que exijam validação oficial e identificação prévia de usuários e agentes acessadores.',
    commonErrors: ['Esquecer-se de injetar os middlewares de injeção corretos ou confundi-la conceitualmente de forma primária com os processos paralelos de Autorização.'],
    interviewQuestion: 'Qual a diferença crucial entre os conceitos de Autenticação e Autorização?',
    shortInterviewAnswer: 'Autenticação descobre quem o usuário de fato é. Autorização dita aquilo que esse usuário tem direito de executar dentro do seu software.',
    betterInterviewAnswer: 'Autenticação (Authentication) responde "Quem é o usuário?". É o processo inicial de validação de login e credencial. Autorização (Authorization) responde "O que ele pode realizar?". Ela avalia as permissões do usuário já identificado antes de validar ou recusar a execução de endpoints.',
    tags: ['Security', 'Auth', 'Conceito'],
    quiz: {
      question: 'Qual middleware deve rodar anteriormente em conformidade de injeção de pipeline no ASP.NET?',
      options: ['UseAuthorization deve rodar antes', 'UseAuthentication deve obrigatoriamente rodar antes do UseAuthorization', 'Ambos rodam sob concorrência paralela', 'Nenhum, o C# não utiliza ordem'],
      answerIndex: 1,
      explanation: 'Primeiro devemos autenticar (descobrir o agente) para que possamos, logo em seguida, autorizar ou recusar seus comandos.'
    }
  },
  {
    id: 'autorizacao',
    name: 'autorização',
    level: 'básico',
    category: 'Autenticação e autorização',
    simpleExplanation: 'Autorização serve para avaliar direitos de tarefas: responde se a pessoa "pode ou não clicar naquele botão ou chamar aquela rota de API" (ex: somente usuários com cargo de "Administrador" podem deletar produtos).',
    interviewExplanation: 'Mechanismo que valida a autoridade legal de execução sobre endpoints vigiados por meio de diretivas de segurança, políticas globais ou papéis atribuídos (Claims/Roles).',
    practicalExample: '[Authorize(Roles = "Admin")]\npublic IActionResult Excluir() => Ok();',
    whenToUse: 'Proteção de endpoints em controllers do C# usando roles e permissões granulares.',
    commonErrors: ['Deixar controllers administrativos sensíveis livres de tags [Authorize] facilitando ciberataques ou vazamento massivo de arquivos.'],
    interviewQuestion: 'Como implementamos de forma simplificada restrições de rotas para Administradores?',
    shortInterviewAnswer: 'Decoramos o controller ou endpoint com o atributo [Authorize(Roles = "Admin")] nativo do .NET Core.',
    betterInterviewAnswer: 'Utilizamos o atributo [Authorize] fornecido nativamente pelo ASP.NET Core. Podemos configurá-lo para restrições baseadas em papéis gerais (Role-Based Authorization), Claims específicos ou políticas granulares estendidas baseadas em escopos de fluxos complexos (Policy-Based Authorization).',
    tags: ['Security', 'Identity', 'Authorize'],
    quiz: {
      question: 'Cuál atributo do .NET é colocado acima de controllers para limitar o acesso apenas a sessões seguras?',
      options: ['[HttpGet]', '[Authorize]', '[Route]', '[Inject]'],
      answerIndex: 1,
      explanation: 'O atributo [Authorize] intercepta acessos desconectados, blindando com retornos adequados.'
    }
  },
  {
    id: 'claims',
    name: 'claims',
    level: 'intermediário',
    category: 'Autenticação e autorização',
    simpleExplanation: 'Claims são pequenos pedacinhos de metadados gravados de forma nominal dentro da credencial do seu usuário. São como as informações da carteira de motorista: Nome, Data de Nascimento e Tipo de Habilitação.',
    interviewExplanation: 'Claims são pares chave-valor emitidos por um provedor confiável de segurança que descrevem propriedades específicas do usuário (ex: Email, Idade, DataCriacao), sem se limitarem puramente às predefinições comuns de Roles.',
    practicalExample: 'new Claim(ClaimTypes.Email, "teste@email.com");',
    whenToUse: 'Sempre para carregar dados de identificação comuns para consultas rápidas na memória das requisições C#.',
    commonErrors: ['Salvar centenas de Claims em formato pesado dentro do seu JWT, inflando brutalmente o tamanho do token gerado a cada request de rede.'],
    interviewQuestion: 'O que o conceito de Claim Based Authorization faz?',
    shortInterviewAnswer: 'Permite projetar políticas de acesso em controllers examinando propriedades pontuais declaradas no perfil do usuário conectado no momento.',
    betterInterviewAnswer: 'Permite autenticar de forma granular examinando os claims contidos na identidade criptográfica do usuário. Exemplo: podemos criar uma política em Program.cs que concede acesso para um endpoint apenas para usurários cujo claim "Idade" seja superior a 18 anos, fornecendo flexibilidade total.',
    tags: ['Security', 'Claims', 'JWT'],
    quiz: {
      question: 'Qual termo descreve uma propriedade pontual declarada na credencial segura do usuário no C#?',
      options: ['Claim', 'Session key', 'DbContext pointer', 'Vite asset'],
      answerIndex: 0,
      explanation: 'Claims são as afirmações ou metadados de domínio que definem detalhes da identidade ativa.'
    }
  },
  {
    id: 'roles',
    name: 'roles',
    level: 'básico',
    category: 'Autenticação e autorização',
    simpleExplanation: 'Roles funcionam como os "cargos de hierarquia clássicos" da firma (ex: Administrador, Financeiro, Vendedor). Elas ajudam o C# a decidir de modo binário se um usuário pode acessar ou não certa rota administrativa.',
    interviewExplanation: 'Representam o modelo clássico de controle de acesso baseado em papéis (RBAC - Role-Based Access Control). Atribuímos agrupamentos funcionais de permissionamento aos perfis do sistema.',
    practicalExample: 'if (User.IsInRole("Gerente")) { /* lógica */ }',
    whenToUse: 'Dedicado a sistemas com agrupamentos hierárquicos triviais e de fácil manutenção estrutônica.',
    commonErrors: ['Engessar regras aninhadas complexas unicamente amarradas a Roles no código C#, gerando refatorações constantes de controllers se novos perfis surgirem.'],
    interviewQuestion: 'Qual a principal desvantagem do uso engessado das antigas Roles em relação a Políticas (Policies)?',
    shortInterviewAnswer: 'As Roles são síncronas e rígidas, gerando refatorações constantes se novas hierarquias surgirem. Políticas aceitam análises mais flexíveis no Program.cs.',
    betterInterviewAnswer: 'Roles podem engessar o código ao induzir tags de escopos rígidos espalhados nos controllers (ex: [Authorize(Roles = "Admin, Gerente")]). Qualquer alteração de perfil exige nova compilação de código. Policies (políticas) de autorização do .NET Core centralizam essas chaves no Program.cs, resolvendo a liberação de forma mais modular e sustentável.',
    tags: ['Security', 'RBAC', 'Roles'],
    quiz: {
      question: 'O que o método "IsInRole" realiza no C#?',
      options: ['Salva as senhas', 'Avalia se o usuário atual conectado possui e atua sob o cargo ou papel específico informado nas strings de consulta', 'Dispara exclusão do banco', 'Verifica o status da CPU'],
      answerIndex: 1,
      explanation: 'IsInRole checa na lista de claims de identidade ativa do usuário se há correspondência na chave correspondente de papel.'
    }
  },
  {
    id: 'arquitetura-camadas',
    name: 'arquitetura em camadas',
    level: 'básico',
    category: 'Arquitetura backend',
    simpleExplanation: 'Arquitetura em camadas consiste em organizar os arquivos do seu aplicativo como "um bolo com fatias distintas": a Camada de Controllers só fala com as páginas do cliente; a de Serviços só lida com lógicas de negócio; e a de Repositórios foca apenas em gravar dados no banco.',
    interviewExplanation: 'A arquitetura em camadas tradicional (N-Tier) isola responsabilidades funcionais nos sistemas do C#. Elas minimizam dependências diretas e garantem um fluxo unidirecional estruturado de chamadas locais.',
    practicalExample: 'Projeto.API -> Projeto.Domain -> Projeto.Infrastructure',
    whenToUse: 'Na partida de qualquer API estruturada para que o código permaneça testável e bem organizado à medida que novas features forem chegando.',
    commonErrors: ['Cruzar dependências circulares (camada de banco falando de forma direta com o escopo de visualização da API e vice-versa), estourando falhas de acoplamento.'],
    interviewQuestion: 'Como o acoplamento de classes é mitigado pela arquitetura de camadas?',
    shortInterviewAnswer: 'Por meio do fluxo síncrono descendente de injeções de interfaces de modo que camadas superiores não toquem detalhes físicos diretamente de infraestruturas.',
    betterInterviewAnswer: 'As camadas canalizam responsabilidades funcionais. A camada de API (Apresentação) repassa requisições limpas para as classes de negócio (Services/Casos de Uso) usando interfaces puras. A infraestrutura atua como provedor, gerando divisões limpas onde trocar de Postgres para Oracle não quebra os controladores de endpoints.',
    tags: ['Arquitetura', 'N-Tier', 'Clean Code'],
    quiz: {
      question: 'Qual camada é o cérebro das regras lógicas do sistema em Clean Architecture?',
      options: ['A camada física do banco', 'A camada de Domínio (Domain) contendo Regras de Negócio', 'A pasta dos ativos CSS', 'O navegador web do cliente'],
      answerIndex: 1,
      explanation: 'A camada de Domínio/Core centraliza as inteligências organizacionais blindada de dependências de infraestrutura fisicamente.'
    }
  },
  {
    id: 'service',
    name: 'service',
    level: 'básico',
    category: 'Arquitetura backend',
    simpleExplanation: 'As classes de Service são as "mães dos miolos de regras". Tudo o que o seu aplicativo calcula, valida ou decide de verdade (ex: "Calcular bônus do vendedor", "Validar limite de crédito da compra") deve morar dentro de um Service e não exposto no Controller ou Banco.',
    interviewExplanation: 'Classes de Serviço (Domain Services ou Application Services) orquestram a lógica corporativa de negócio da Web API. Elas concentram algoritmos impessoais, acionando repositórios e barramentos de infraestrutura.',
    practicalExample: 'public class PedidoService : IPedidoService {\n  public async Task CriarOrder(PedidoDTO dto) { /* regras de negócio */ }\n}',
    whenToUse: 'Dedicado ao encadeamento de fluxos lógicos e processamento de regras operacionais do Domínio.',
    commonErrors: ['Ignorar o isolamento dos Services e colocar regras complexas de dados de forma misturada no código de controllers (anulando reuso de lógica).'],
    interviewQuestion: 'Por que isolar suas regras corporativas dentro de contratos e Services?',
    shortInterviewAnswer: 'Para mantê-los reutilizáveis por qualquer interface do .NET, simplificar testes unitários isolados e deixar os controllers magros e focados e fáceis de ler.',
    betterInterviewAnswer: 'Service centraliza o domínio da aplicação. Isolando estas lógica em classes assíncronas dedicadas amparadas por interfaces injetáveis, blindamos as decisões estruturais de negócio contra detalhes de rede, permitindo rodar a mesma inteligência tanto em chamadas REST quanto em filas de mensageria avulsas do background.',
    tags: ['Arquitetura', 'Services', 'Business Logic'],
    quiz: {
      question: 'O que deve residir idealmente como responsabilidade principal nas classes de Service?',
      options: ['Design CSS de páginas de exibição', 'As regras organizacionais e de negócios do domínio', 'Conexões puras com os drivers TCP do banco', 'Versionamento Git de código'],
      answerIndex: 1,
      explanation: 'O Service concentra o cérebro procedimental das aplicações preservando isolamento funcional de rede.'
    }
  },
  {
    id: 'repository',
    name: 'repository',
    level: 'intermediário',
    category: 'Arquitetura backend',
    simpleExplanation: 'O Repositório (Repository) é a classe intermediadora focada em banco. Ele encapsula o seu ORM (ex: Entity Framework) e oferece métodos simples ao seu Service (como "ObterPorId", "Adicionar") sem deixar que o seu Service conheça detalhes complexos de SQL.',
    interviewExplanation: 'O padrão Repository encapsula a lógica necessária para reter dados de coleções persistentes de fontes físicas diversos, provendo uma amigável fachada em memória aos consumidores do domínio.',
    practicalExample: 'public class ClienteRepository : IClienteRepository {\n  private readonly AppDbContext _db;\n  public async Task<Cliente> GetById(int id) => await _db.Clientes.FindAsync(id);\n}',
    whenToUse: 'Em arquiteturas de grande porte e com testes intensivos onde isolar de fato o acesso ao EF Core em classes apartadas simplifique a manutenção coletiva.',
    commonErrors: ['Criar métodos de repositórios desnecessariamente para absolutamente todas as ações simples onde o DbContext nativo injetado daria conta do recado com facilidade (padrão de abstrações redundantes nocivos).'],
    interviewQuestion: 'Quais as desvantagens de se abusar do padrão Repository sobre o Entity Framework Core?',
    shortInterviewAnswer: 'O EF Core com DbSet já implementa nativamente o padrão Repository e Unit of Work. Adicionar mais um repositório por cima pode gerar uma casca extra de código repetitivo de baixa utilidade.',
    betterInterviewAnswer: 'O padrão Repository fornece grande valor para isolar o acesso físico em projetos complexos. Porém, o DbContext nativo já atua como Unit of Work e o DbSet como repositório. Criar repositórios genéricos que apenas encapsulam chamadas simples do LINQ gera um boilerplate pesado e retira do construtor inicial o poder de projeções cirúrgicas e otimizações nativas de queries de alto desempenho.',
    tags: ['Design-Patterns', 'Data', 'Persistence', 'EF-Core'],
    quiz: {
      question: 'A principal atuação de uma classe de Repository consiste em qual das opções?',
      options: ['Configurar rotas de APIs', 'Disparar e-mails para os clientes', 'Encapsular e gerenciar a leitura e gravação de dados vindos de bases físicas de persistência (como SQL)', 'Compilar arquivos Javascript externos'],
      answerIndex: 2,
      explanation: 'O Repository foca no encapsulamento de acessos de dados em bases permanentes do aplicativo.'
    }
  },
  {
    id: 'solid',
    name: 'SOLID',
    level: 'intermediário',
    category: 'SOLID e clean code',
    simpleExplanation: 'SOLID são 5 mandamentos clássicos pensados por mestres de software para tornar qualquer código legível, testável e fácil de expandir com novas funcionalidades sem precisar quebrar ou reescrever as partes antigas já prontas.',
    interviewExplanation: 'SOLID é um acrônimo mnemônico descrevendo 5 princípios reguladores de desenvolvimento orientado a objetos robusto: SRP, OCP, LSP, ISP e DIP.',
    practicalExample: 'Dividir classes grandes de vendas em: VendaCalculador, VendaRepository e VendaNotificador (SRP - Responsabilidade Única).',
    whenToUse: 'Sempre como guia conceitual ao estruturar quaisquer pacotes e classes de softwares .NET de relevância profissional.',
    commonErrors: ['Ignorar o bom senso e levar as definições matemáticas e abstracionais de cada sigla ao extremo de preciosismo, criando microsserviços vazios de utilidade e que geram grande latência e complexidades de leitura na equipe.'],
    interviewQuestion: 'O que define o princípio de Inversão de Dependências (D) do SOLID?',
    shortInterviewAnswer: 'Módulos de alto nível não devem ter dependência física direta de módulos de baixo nível de infraestrutura. Ambos devem interagir baseados em contratos (Abstrações/Interfaces).',
    betterInterviewAnswer: 'A Inversão de Dependência (DIP) garante flexibilidade e substituição limpa ao longo de todo o sistema C#. Lógicas cerebrais não devem acoplar instâncias com classes externas físicas como drivers de banco direto. No lugar, declaramos e injetamos Interfaces agênticas que definem os contratos das operações. Isso torna tudo de fato testável com dublês e imune a dependências brutas de vendor lock-in.',
    tags: ['SOLID', 'OOP', 'Arquitetura', 'Clean Code'],
    quiz: {
      question: 'O SRP (Single Responsibility Principle) diz que uma classe deve ter idealmente:',
      options: ['Várias conexões de rede simultâneas', 'Apenas um único motivo ou responsabilidade funcional central de existir e de sofrer alterações pontuais', 'No mínimo 2.000 linhas de código', 'Interfaces mutáveis para cada cliente'],
      answerIndex: 1,
      explanation: 'O SRP preconiza que uma classe concentre alta coesão em torno de apenas um domínio de atuação.'
    }
  },
  {
    id: 'teste-unitario',
    name: 'teste unitário',
    level: 'básico',
    category: 'Testes',
    simpleExplanation: 'Teste unitários são códigos pequenos de testes de laboratório que avaliam funções isoladas do seu sistema de forma independente. Eles injetam dados de exemplo no seu Service e testam se o cálculo retorna o valor correto em milissegundos.',
    interviewExplanation: 'Consiste no teste programático isolado da menor menor parte testável de uma aplicação (comumente métodos ou classes) de forma hermética usando frameworks como xUnit, NUnit, e bibliotecas de mocks como Moq ou NSubstitute.',
    practicalExample: '[Fact]\npublic void DeveSomarComSucesso() {\n  var result = Calculadora.Somar(2, 2);\n  Assert.Equal(4, result);\n}',
    whenToUse: 'Sempre que houver regras matemáticas complexas ou rotas críticas que dão sustentação ao core de vendas e faturamento da empresa.',
    commonErrors: ['Escrever testes que tocam em conexões reais de bancos ou APIs externas de verdade pendentes na internet (isso não é teste unitário, é teste de integração).'],
    interviewQuestion: 'O que o padrão Arrange, Act, e Assert (AAA) define para testes?',
    shortInterviewAnswer: 'Arrange: Organiza variáveis e prepara o cenário. Act: Roda a função principal investigada. Assert: Compara se o resultado condiz com o esperado.',
    betterInterviewAnswer: 'AAA é a estrutura padrão de escrita de testes legíveis: 1) Arrange: inicializa objetos, injeta mocks e estuda os inputs. 2) Act: executa a chamada ao método de teste sob testes. 3) Assert: verifica as premissas, conferindo se os retornos de fato batem com os limites exigidos, garantindo a solidez dos fluxos contra regressões de códigos posteriores.',
    tags: ['Testes', 'xUnit', 'Mocks'],
    quiz: {
      question: 'Qual o papel principal de bibliotecas de simulação (como Moq ou NSubstitute) em testes estruturados unitários?',
      options: ['Subir o banco Postgres físico local', 'Simular e mocar contratos de interfaces de dependências de infraestrutura complexas (como IEmailService) sem executá-los de verdade', 'Criptografar arquivos de credenciais', 'Gerar páginas Web HTML de debug'],
      answerIndex: 1,
      explanation: 'O papel dos mocks é fingir e isolar conexões problemáticas em testes unitários puros por velocidade e foco.'
    }
  },
  {
    id: 'log',
    name: 'log',
    level: 'básico',
    category: 'Logs e produção',
    simpleExplanation: 'O log funciona como a "caixa-preta de registros de bordo do seu foguete backend". Ele anota erros, cadastros terminados ou buscas lentas em tempo real para que você descubra exatamente o que aconteceu de instável no ambiente de produção.',
    interviewExplanation: 'Mecanismo de monitoramento composto de logs estruturados utilizando bibliotecas dedicadas conhecidas como Serilog ou NLog, que persistem dados em formatos de busca como JSON diretamente para canais coletores (ex: ElasticSearch, Splunk, Azure Application Insights).',
    practicalExample: '_logger.LogInformation("Enviando SMS correspondente para cliente {Id}", clienteId);',
    whenToUse: 'Em toda a extensão do software, blindando fluxos críticos de erros com capturas de rastreamento corretas para auditoria segura pós-crash.',
    commonErrors: ['Colocar senhas brutas dos clientes em formatados brutos nos logs ou utilizar strings normais unidas por "+" no log, quebrando a capacidade de indexação de logs estruturados (Serilog).'],
    interviewQuestion: 'Qual o benefício de fazermos uso do conceito conhecido como Logs Estruturados no C#?',
    shortInterviewAnswer: 'Ele salva as propriedades nos logs em formato chave-valor estruturado (ex: JSON), o que permite fazer pesquisas e consultas rápidas por campos específicos nos coletores do servidor em produção.',
    betterInterviewAnswer: 'Log estruturado armazena a mensagem junto de suas variáveis identificadas de forma parametrizável em coletores. Em vez de salvar uma string única textual (como "Cliente 12 salvou"), salvamos o template de chaves ("Cliente {Id} salvou"). Isso permite que indexadores de Big Data vasculhem em milissegundos todas as ações ligadas especificamente ao ID "12", acelerando correções de incidentes em produção.',
    tags: ['Observabilidade', 'Produção', 'Logs'],
    quiz: {
      question: 'Qual padrão/framework de Logs estruturados é imensamente popular e utilizado nativamente na comunidade .NET?',
      options: ['Serilog', 'Vite-Log', 'Docker-Logger', 'C#-Traceable'],
      answerIndex: 0,
      explanation: 'Serilog é o rei indiscutível dos logs modernos estruturados do ecossistema ASP.NET Core.'
    }
  },
  {
    id: 'performance',
    name: 'performance',
    level: 'intermediário',
    category: 'Performance',
    simpleExplanation: 'Performance é a capacidade do backend responder rápido, gastar pouca memória e não travar quando muitas pessoas usam a API ao mesmo tempo. No .NET, isso passa por boas queries, menos alocações, cache, paginação e operações assíncronas bem usadas.',
    interviewExplanation: 'Em aplicações .NET, performance envolve medir gargalos reais antes de otimizar. Usamos logs, métricas, profiling, AsNoTracking em leituras, paginação, índices no banco, cache e async/await para liberar threads em operações de I/O.',
    practicalExample: 'var clientes = await _db.Clientes\n  .AsNoTracking()\n  .Where(c => c.Ativo)\n  .OrderBy(c => c.Nome)\n  .Take(50)\n  .ToListAsync();',
    whenToUse: 'Sempre que uma rota estiver lenta, consumir muita memória, bater no banco demais ou quando o sistema precisa atender muitas requisições sem perder estabilidade.',
    commonErrors: ['Otimizar no escuro sem medir o gargalo real com logs, métricas ou profiler.', 'Retornar listas enormes sem paginação, fazendo a API carregar dados demais na memória e no JSON.'],
    interviewQuestion: 'Como você investigaria um problema de performance em uma API .NET?',
    shortInterviewAnswer: 'Eu mediria primeiro: logs, métricas, tempo de query e uso de memória. Depois atacaria o gargalo real, como query sem índice, N+1, falta de paginação, cache ausente ou uso incorreto de async.',
    betterInterviewAnswer: 'Eu começaria por observabilidade: tempo por endpoint, SQL gerado, contagem de chamadas ao banco, alocações e erros. Em seguida, aplicaria correções focadas: paginação, projeções com Select, AsNoTracking em leitura, índices, cache com TTL e remoção de loops que disparam queries repetidas. Performance boa nasce de medição, não de chute.',
    tags: ['Performance', 'Profiling', 'EF Core', 'Cache'],
    quiz: {
      question: 'Qual é o primeiro passo mais seguro ao investigar lentidão em uma API?',
      options: ['Adicionar cache em tudo imediatamente', 'Medir o gargalo real com logs, métricas ou profiler', 'Trocar todo o backend de linguagem', 'Remover todos os testes unitários'],
      answerIndex: 1,
      explanation: 'Sem medição, a otimização vira chute. Primeiro descobrimos onde o tempo ou a memória estão sendo gastos.'
    }
  },
  {
    id: 'seguranca',
    name: 'segurança',
    level: 'intermediário',
    category: 'Segurança',
    simpleExplanation: 'Segurança no backend é proteger dados, identidade e regras do sistema. Envolve autenticação, autorização, validação de entrada, cuidado com senhas, tokens, logs e ataques como SQL Injection ou exposição de dados sensíveis.',
    interviewExplanation: 'Em Web APIs .NET, segurança passa por autenticar corretamente, aplicar autorização por policies/roles, validar DTOs, nunca confiar no cliente, usar hashing forte para senhas, HTTPS, proteção contra SQL Injection e tratamento de erros sem vazar stack trace.',
    practicalExample: '[Authorize]\n[HttpPost]\npublic async Task<IActionResult> CriarPedido(CriarPedidoDto dto) {\n  if (!ModelState.IsValid) return BadRequest(ModelState);\n  return Ok(await _service.CriarAsync(dto));\n}',
    whenToUse: 'Em todas as rotas e fluxos que lidam com dados de usuários, permissões, pagamentos, cadastros, arquivos, tokens ou integrações externas.',
    commonErrors: ['Confiar em dados enviados pelo frontend sem validação no backend.', 'Salvar senha em texto puro ou registrar tokens e dados sensíveis nos logs.'],
    interviewQuestion: 'Quais cuidados básicos de segurança você aplicaria em uma Web API .NET?',
    shortInterviewAnswer: 'Eu validaria entradas, usaria autenticação e autorização corretas, protegeria senhas com hash, evitaria SQL Injection, não vazaria dados sensíveis em logs ou erros e aplicaria HTTPS.',
    betterInterviewAnswer: 'Eu trataria segurança em camadas: DTOs validados, autenticação via JWT ou provedor confiável, autorização por policy, queries parametrizadas/EF Core contra injection, senhas com hash forte, secrets fora do código, HTTPS, logs sem dados sensíveis e middleware global para retornar erros seguros sem expor stack trace.',
    tags: ['Segurança', 'Auth', 'JWT', 'Validation'],
    quiz: {
      question: 'Qual prática é perigosa em uma API .NET?',
      options: ['Validar DTOs no backend', 'Usar queries parametrizadas', 'Salvar senhas em texto puro', 'Aplicar autorização em endpoints privados'],
      answerIndex: 2,
      explanation: 'Senhas nunca devem ser salvas em texto puro. O correto é usar hash forte com salt e uma estratégia segura.'
    }
  },
  {
    id: 'git',
    name: 'Git',
    level: 'básico',
    category: 'Git e trabalho em equipe',
    simpleExplanation: 'Git é o sistema de versionamento que registra a história do código. Ele permite trabalhar em branches, revisar mudanças, voltar versões e colaborar com outras pessoas sem perder controle do projeto.',
    interviewExplanation: 'No dia a dia de backend, Git organiza colaboração: branches para features, commits pequenos, pull requests, resolução de conflitos e histórico rastreável. Em entrevistas, importa mostrar que você entende fluxo de equipe, não só comandos decorados.',
    practicalExample: 'git checkout -b feature/criar-clientes\ngit add .\ngit commit -m "Add customer creation endpoint"\ngit push origin feature/criar-clientes',
    whenToUse: 'Sempre no desenvolvimento profissional: para versionar mudanças, abrir PRs, revisar código, criar releases e manter um histórico seguro do projeto.',
    commonErrors: ['Fazer commits gigantes misturando várias mudanças sem relação.', 'Resolver conflitos sem entender os dois lados do código, apagando trabalho de outra pessoa.'],
    interviewQuestion: 'Como você costuma organizar seu trabalho com Git em equipe?',
    shortInterviewAnswer: 'Eu crio uma branch por tarefa, faço commits pequenos, abro pull request, reviso conflitos com cuidado e mantenho a main estável.',
    betterInterviewAnswer: 'Eu separo o trabalho em branches pequenas e descritivas, mantenho commits com escopo claro, sincronizo com a main antes do PR, resolvo conflitos entendendo o contexto dos dois lados e uso o pull request para revisão técnica. Isso reduz risco de regressão e facilita rastrear o motivo de cada mudança.',
    tags: ['Git', 'Branch', 'Pull Request', 'Teamwork'],
    quiz: {
      question: 'Por que commits pequenos e focados ajudam uma equipe?',
      options: ['Porque impedem qualquer bug automaticamente', 'Porque facilitam revisão, rollback e entendimento da mudança', 'Porque removem a necessidade de testes', 'Porque tornam o banco de dados mais rápido'],
      answerIndex: 1,
      explanation: 'Commits focados deixam o histórico legível, tornam revisão mais simples e permitem desfazer mudanças específicas com menos risco.'
    }
  },
  {
    id: 'docker',
    name: 'Docker',
    level: 'intermediário',
    category: 'Docker e deploy',
    simpleExplanation: 'O Docker empacota o seu aplicativo .NET dentro de um "contêiner blindado isolado" contendo os arquivos compilação, o sistema operacional e tudo o que o C# precisa para rodar em qualquer computador ou servidor idêntico, prevenindo o fantasma do "na minha máquina funcionava".',
    interviewExplanation: 'Docker é uma plataforma de conteinerização baseada em recursos de isolamento do Kernel Linux (cgroups, namespaces). Ele encapsula aplicações em camadas de imagens compartilhadas de fácil transporte e distribuição.',
    practicalExample: 'FROM mcr.microsoft.com/dotnet/aspnet:8.0\nWORKDIR /app\nCOPY . .\nENTRYPOINT ["dotnet", "MinhaApi.dll"]',
    whenToUse: 'Para empacotar aplicações backend garantindo estabilidade no deploy para sistemas Cloud modernas (Azure, Kubernetes, AWS, Google Cloud).',
    commonErrors: ['Escrever imagens Docker gigantescas incluindo pacotes pesados das pastas bin/obj ou compiladores de teste que comprometem drasticamente a leveza das imagens.'],
    interviewQuestion: 'Como funciona o processo de build do Dockerfile em C# aplicando Multi-Stage Build?',
    shortInterviewAnswer: 'Usamos uma imagem pesada com SDK para o processo de compilação, e copiamos os arquivos leves compilados que de fato interessam para uma imagem final de runtime enxuta.',
    betterInterviewAnswer: 'Multi-stage builds declaram múltiplos blocos "FROM" em um único arquivo Dockerfile. Usamos inicialmente a imagem robusta "dotnet/sdk" para restaurar pacotes Nuget e compilar o app. Em seguida, iniciamos um novo estágio usando uma imagem muito leve "dotnet/aspnet" que apenas possui o runtime essencial de rede executável. Copiamos o binário gerado do primeiro estágio e descartamos as dependências pesadas de compilação, gerando imagens leves e imensamente seguras de produção.',
    tags: ['Containers', 'DevOps', 'Docker'],
    quiz: {
      question: 'A principal promessa de valor do Docker no ciclo de desenvolvimento moderno é:',
      options: ['Melhorar o design estético de botões', 'Garantir que a aplicação execute com consistência absoluta em desenvolvimento, testes e servidores Cloud produtivos por meio do isolamento operacional', 'Remover vírus automaticamente', 'Facilitar downloads redundantes do nuget'],
      answerIndex: 1,
      explanation: 'Isolamento de ambiente e portabilidade de infraestrutura constituem as colunas mestras do Docker.'
    }
  },
  {
    id: 'cache',
    name: 'cache',
    level: 'intermediário',
    category: 'Mensageria, cache e jobs',
    simpleExplanation: 'Cache é como colar um "post-it" na geladeira com o número do telefone que você mais liga. Em vez de ir buscar um menu pesado de categorias no banco de dados lento a cada clique dos usuários, você salva essa lista na memória rápida do servidor .NET ou Redis por 10 minutos.',
    interviewExplanation: 'O Cache armazena temporariamente respostas caras de dados em locais de memória de altíssima velocidade para pular re-consultas redundantes a drives rígidos. Opera em memória local (IMemoryCache) ou de forma distribuída (Redis, Memcached) gerenciando chaves e regras TTL.',
    practicalExample: 'var cacheKey = "produtos_ativos";\nif(!_cache.TryGetValue(cacheKey, out List<Produto> lista)) {\n  lista = await BuscarBanco();\n  _cache.Set(cacheKey, lista, TimeSpan.FromMinutes(10));\n}',
    whenToUse: 'Para listagem e leituras massivas de APIs que sofrem grande concorrência mas que mudam de valor de forma infrequente (ex: cep, categorias de catálogo, listagens estáticas de produtos).',
    commonErrors: ['Não colocar tempo de expiração (TTL - Time to Live) nas chaves do cache, deixando o sistema exibindo dados antigos ou comendo toda a memória RAM até explodir o servidor.'],
    interviewQuestion: 'O que é o Cache In-Memory vs Cache Distribuído?',
    shortInterviewAnswer: 'In-Memory guarda os arquivos na RAM do próprio servidor Web onde seu app está rodando. Distribuído compartilha o cache em um servidor autônomo (ex: Redis) sustentável para várias instâncias paralelas.',
    betterInterviewAnswer: 'O In-Memory cache reside na RAM nativa da própria API C#, sendo rápido mas morrendo se o app reiniciar ou sendo inconsistente se escalarmos em múltiplos servidores. O Cache Distribuído roda em cluster separado conectado de rede (ex: Redis). Ele permite cache unificado independente do número de servidores e persiste mesmo se as APIs desligarem.',
    tags: ['Performance', 'Redis', 'MemoryCache'],
    quiz: {
      question: 'O que representa o TTL (Time to Live) em ferramentas de Cache?',
      options: ['O tempo de resposta do banco', 'O prazo de vida limite configurado para de forma autônoma expirar e remover a chave cacheada da memória trazendo consistência', 'A velocidade do processador do servidor', 'O número de acessos simultâneos'],
      answerIndex: 1,
      explanation: 'TTL determina o ciclo de validade dos tempos de dados, forçando a atualização após expirar o prazo estipulado.'
    }
  },
  {
    id: 'fila',
    name: 'fila',
    level: 'intermediário',
    category: 'Mensageria, cache e jobs',
    simpleExplanation: 'A fila (fila de mensagens) é como uma "esteira rolante de pedidos". Se o seu usuário faz uma compra grande, em vez do site ficar esperando a nota fiscal ser gerada e o e-mail enviado de forma travada de monitor, você joga essa tarefa de faturar na fila (ex: RabbitMQ/SQS) e um serviço de background do C# processa ela aos poucos de forma assíncrona.',
    interviewExplanation: 'Consiste na comunicação ponta a ponta assíncrona e desacoplada baseada no padrão produtor-consumidor (Message Queueing). Permite processamento paralelo não-bloqueante escalável e resiliência garantida por enfileiramento.',
    practicalExample: 'await _queueService.PublishAsync(new ProcessarPedidoEvent(12));',
    whenToUse: 'Sempre que você precisar desacoplar serviços pesados ou necessitar integrar microsserviços distintos de forma isolada sem riscos de quedas em cascata.',
    commonErrors: ['Esquecer tratadores de erro adequados de mensagens em processadores de background (fila sem Dead-Letter Queue - DLQ pode entrar em loop infinito de crash consumindo e reprocessando lógicas zumbis derror).'],
    interviewQuestion: 'Para que serve uma Dead Letter Queue (DLQ) no tratamento de mensagens?',
    shortInterviewAnswer: 'É uma lixeira ou gaveta de quarentena. Se uma mensagem dá erro repetidas vezes ao ser processada, ela é direcionada à DLQ para análise manual, sem travar a fila principal.',
    betterInterviewAnswer: 'A Dead Letter Queue (DLQ) é crucial para a saúde e resiliência de canais de mensageria. Quando o C# falha por erros intermitentes ao executar uma mensagem, ocorrem tentativas automáticas de entrega. Se após o limite de retentativas o erro transacional resistir, colocá-la na DLQ previne loops de erros caros, permitindo que a linha produtiva continue fluindo e facilitando a depuração humana sequencial.',
    tags: ['Messaging', 'RabbitMQ', 'BackgroundServices', 'Resiliência'],
    quiz: {
      question: 'Qual o principal benefício de desacoplar processos pesados utilizando canais de mensageria?',
      options: ['Aumentar o tráfego de dados de download do CSS', 'Melhorar exponencialmente a vazão de rede de requisições, liberando imediato retorno do app para os cliques dos usuários em ambientes redundantes de falhas', 'Evitar backups de bancos de dados', 'Otimizar o tempo de compilação da IDE'],
      answerIndex: 1,
      explanation: 'Mensageria assegura vazão de requisição limpa ao transferir o processamento imperativo em background não-bloqueante.'
    }
  },
  {
    id: 'httpclient',
    name: 'HttpClient',
    level: 'básico',
    category: 'Integrações externas',
    simpleExplanation: 'O HttpClient é o "navegador de internet em forma de código". Você o utiliza para que a sua API C# possa conversar, consultar ou bater em endpoints e dados de outras APIs pela web externa (ex: consultar o ViaCEP, bater no gateway de pagamento da Stone ou Stripe).',
    interviewExplanation: 'Classe instanciável no .NET que fornece recursos para efetuar chamadas de requisição HTTP em rede. Em sistemas de alto desempenho, as conexões físicas subjacentes de soquete devem ser orquestradas usando o ecossistema "IHttpClientFactory" para coibir o esgotamento de conexões abertas.',
    practicalExample: 'var response = await _httpClient.GetFromJsonAsync<CepResponse>("https://viacep.com.br/ws/01001000/json/");',
    whenToUse: 'Integrações de dados com parceiros corporativos nativos, chamadas REST avulsas ou consumo geral de APIs externas do negócio.',
    commonErrors: ['Instanciar e descartar o HttpClient manualmente com "using" de forma recursiva a cada clique de API (isso causa vazamentos graves e exaustão silenciosa de portas lógicas TCP do servidor - Socket Exhaustion).'],
    interviewQuestion: 'Por que não devemos instanciar manualmente o HttpClient com blocos de "using" em Web APIs .NET?',
    shortInterviewAnswer: 'Porque as portas TCP de conexão física com o servidor externo não são fechadas na hora do descarte, permanecendo presas em estado TIME_WAIT, gerando exaustão catastrófica de soquetes locais.',
    betterInterviewAnswer: 'Embora o HttpClient implemente IDisposable, o descarte manual em loops de conexões não fecha de forma imediata o canal de soquete TCP no barramento do sistema operacional, mantendo-as travadas em TIME_WAIT. Sob alta volumetria, isso acarreta Socket Exhaustion e colapsos de rede da API. O remédio oficial é injetar e orquestrar clientes por meio do IHttpClientFactory nos nossos Program.cs, que gerencia as pools e reutiliza os ciclos de conexões de forma segura.',
    tags: ['Integrações', 'Net-Core', 'IHttpClientFactory', 'Sockets'],
    quiz: {
      question: 'Qual componente deve ser injetado para resolver de forma otimizada as pools de conexões e instanciadores do HttpClient sem sofrer Socket Exhaustion?',
      options: ['xUnit runner', 'IHttpClientFactory', 'ILoggerProvider', 'DbContext factory'],
      answerIndex: 1,
      explanation: 'O IHttpClientFactory resolve o tempo de vida síncrono de soquetes de forma eficaz por trás de instâncias transparentes.'
    }
  }
];
