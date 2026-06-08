import { RoadmapStep } from '../types';

export const STUDY_CATEGORIES = [
  'C# básico/intermediário',
  'Orientação a objetos',
  'Coleções e LINQ',
  'Async, Task e concorrência',
  'Exceptions e tratamento de erro',
  'ASP.NET Core / Web API',
  'HTTP e REST',
  'DTO, Models e validação',
  'Injeção de dependência',
  'Entity Framework Core',
  'Banco de dados e SQL',
  'Autenticação e autorização',
  'Arquitetura backend',
  'SOLID e clean code',
  'Testes',
  'Logs e produção',
  'Performance',
  'Segurança',
  'Git e trabalho em equipe',
  'Docker e deploy',
  'Mensageria, cache e jobs',
  'Integrações externas'
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: 'C# base',
    categoryName: 'C# básico/intermediário',
    description: 'Fundamentos básicos do C#, tipos de referência vs valor e imutabilidade.',
    recommendedDuration: '1 semana',
    termIds: ['class', 'struct', 'record']
  },
  {
    id: 2,
    title: 'Orientação a objetos',
    categoryName: 'Orientação a objetos',
    description: 'Os 4 pilares do POO combinados com Interfaces de forma prática.',
    recommendedDuration: '1 semana',
    termIds: ['interface', 'classe-abstrata', 'heranca', 'polimorfismo', 'encapsulamento']
  },
  {
    id: 3,
    title: 'Coleções e LINQ',
    categoryName: 'Coleções e LINQ',
    description: 'Manipulação eficiente de dados em memória e queries simplificadas com LINQ.',
    recommendedDuration: '1 semana',
    termIds: ['list', 'ienumerable', 'iqueryable', 'linq', 'where', 'select', 'firstordefault']
  },
  {
    id: 4,
    title: 'Async/await',
    categoryName: 'Async, Task e concorrência',
    description: 'Trabalho assíncrono para melhorar vazão de requisições de servidores.',
    recommendedDuration: '1 semana',
    termIds: ['async', 'await', 'task', 'cancellationtoken']
  },
  {
    id: 5,
    title: 'Exceptions',
    categoryName: 'Exceptions e tratamento de erro',
    description: 'Proteção de aplicações de falhas e gerenciamento de erros inesperados.',
    recommendedDuration: '3 dias',
    termIds: ['try-catch', 'exception']
  },
  {
    id: 6,
    title: 'HTTP/REST',
    categoryName: 'HTTP e REST',
    description: 'Entendimento pleno do protocolo HTTP, métodos corretos e conceitos de REST.',
    recommendedDuration: '4 dias',
    termIds: ['request', 'response', 'get', 'post', 'put', 'patch', 'delete']
  },
  {
    id: 7,
    title: 'ASP.NET Core Web API',
    categoryName: 'ASP.NET Core / Web API',
    description: 'Pilares fundamentais da Web API, funcionamento de rotas e middlewares.',
    recommendedDuration: '1 semana',
    termIds: ['middleware', 'controller', 'endpoint', 'rota']
  },
  {
    id: 8,
    title: 'DTO e validação',
    categoryName: 'DTO, Models e validação',
    description: 'Separação das entidades do banco com modelos de exibição seguros e validados.',
    recommendedDuration: '3 dias',
    termIds: ['dto', 'entidade', 'validacao']
  },
  {
    id: 9,
    title: 'Injeção de dependência',
    categoryName: 'Injeção de dependência',
    description: 'Ciclos de vida (Transient, Scoped, Singleton) e baixo acoplamento.',
    recommendedDuration: '4 dias',
    termIds: ['injecao-dependencia', 'transient', 'scoped', 'singleton']
  },
  {
    id: 10,
    title: 'SQL',
    categoryName: 'Banco de dados e SQL',
    description: 'Conceitos fundamentais de banco de dados relacionais e otimizações de query.',
    recommendedDuration: '1 semana',
    termIds: ['inner-join', 'left-join', 'indice', 'transacao', 'normalizacao']
  },
  {
    id: 11,
    title: 'Entity Framework Core',
    categoryName: 'Entity Framework Core',
    description: 'O principal ORM do .NET. Consultas eficientes e controle de concorrência.',
    recommendedDuration: '1 semana',
    termIds: ['dbcontext', 'dbset', 'migration', 'include', 'asnotracking', 'n-plus-1']
  },
  {
    id: 12,
    title: 'Autenticação/JWT',
    categoryName: 'Autenticação e autorização',
    description: 'Segurança de endpoints usando Tokens JWT, claims e perfis.',
    recommendedDuration: '1 semana',
    termIds: ['jwt', 'autenticacao', 'autorizacao', 'claims', 'roles']
  },
  {
    id: 13,
    title: 'Arquitetura em camadas',
    categoryName: 'Arquitetura backend',
    description: 'Separação física de responsabilidades para projetos manuteníveis.',
    recommendedDuration: '1 semana',
    termIds: ['arquitetura-camadas', 'service', 'repository']
  },
  {
    id: 14,
    title: 'SOLID',
    categoryName: 'SOLID e clean code',
    description: 'Princípios matemáticos de design de código robusto.',
    recommendedDuration: '5 dias',
    termIds: ['solid']
  },
  {
    id: 15,
    title: 'Testes',
    categoryName: 'Testes',
    description: 'Criação de testes unitários para garantir que o seu backend funciona de verdade.',
    recommendedDuration: '5 dias',
    termIds: ['teste-unitario']
  },
  {
    id: 16,
    title: 'Logs',
    categoryName: 'Logs e produção',
    description: 'Importância de monitoramento através de logs estruturados e observabilidade.',
    recommendedDuration: '3 dias',
    termIds: ['log']
  },
  {
    id: 17,
    title: 'Performance',
    categoryName: 'Performance',
    description: 'Boas práticas para otimizar queries, loops e alocação de memória.',
    recommendedDuration: '4 dias',
    termIds: ['performance']
  },
  {
    id: 18,
    title: 'Segurança',
    categoryName: 'Segurança',
    description: 'Evitar injeções, vazamentos e aplicar criptografia onde é necessário.',
    recommendedDuration: '4 dias',
    termIds: ['seguranca']
  },
  {
    id: 19,
    title: 'Docker',
    categoryName: 'Docker e deploy',
    description: 'Conteinerização e padronização do ambiente local e de deploy.',
    recommendedDuration: '4 dias',
    termIds: ['docker']
  },
  {
    id: 20,
    title: 'Deploy/CI-CD',
    categoryName: 'Git e trabalho em equipe',
    description: 'Como funciona o controle de versão e Integração Contínua para times.',
    recommendedDuration: '3 dias',
    termIds: ['git']
  },
  {
    id: 21,
    title: 'Cache',
    categoryName: 'Mensageria, cache e jobs',
    description: 'Evitar idas desnecessárias ao banco de dados com Redis ou cache em memória.',
    recommendedDuration: '4 dias',
    termIds: ['cache']
  },
  {
    id: 22,
    title: 'Fila/mensageria',
    categoryName: 'Mensageria, cache e jobs',
    description: 'Arquiteturas assíncronas e mensageria para desacoplamento de microsserviços.',
    recommendedDuration: '1 semana',
    termIds: ['fila']
  },
  {
    id: 23,
    title: 'Integrações externas',
    categoryName: 'Integrações externas',
    description: 'Uso de APIs externas de forma otimizada com conexões persistentes.',
    recommendedDuration: '3 dias',
    termIds: ['httpclient']
  }
];
