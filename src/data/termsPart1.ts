import { StudyTerm } from '../types';

export const TERMS_PART1: StudyTerm[] = [
  {
    id: 'class',
    name: 'class',
    level: 'básico',
    category: 'C# básico/intermediário',
    simpleExplanation: 'Classe é o molde para criar objetos com estado e comportamento. É um tipo de referência (Reference Type): a variável guarda uma referência para o objeto, e mais de uma variável pode apontar para a mesma instância.',
    interviewExplanation: 'Em C#, uma class combina dados e comportamentos por meio de campos, propriedades e métodos. Ao atribuir uma variável de classe a outra, a referência é copiada, não o objeto. Por isso, alterações feitas por uma variável podem ser vistas pela outra quando ambas apontam para a mesma instância.',
    practicalExample: 'public class Cliente {\n  public string Nome { get; set; }\n  public void Ativar() { /* ativa o cliente */ }\n}',
    whenToUse: 'Sempre que você precisar modelar entidades de negócio complexas, serviços da aplicação ou controllers.',
    commonErrors: ['Usar == esperando comparação automática de todas as propriedades. Por padrão, classes usam igualdade de referência, salvo quando o tipo redefine esse comportamento.', 'Criar objetos temporários em excesso sem necessidade, aumentando o trabalho do Garbage Collector.'],
    interviewQuestion: 'O que significa dizer que uma class é um tipo de referência no C#?',
    shortInterviewAnswer: 'Significa que a variável guarda uma referência para o objeto. Ao atribuí-la a outra variável, copiamos a referência, então as duas podem apontar para a mesma instância.',
    betterInterviewAnswer: 'Uma variável de class não contém diretamente todos os dados do objeto: ela contém uma referência para uma instância no managed heap. Ao copiar essa variável, o objeto não é clonado; a nova variável aponta para a mesma instância. Assim, uma alteração feita por uma referência pode ser observada pela outra. Classes também suportam herança e identidade compartilhada.',
    tags: ['C#', 'OOP', 'Reference Type'],
    quiz: {
      question: 'O que acontece ao atribuir uma variável de class a outra variável?',
      options: ['O objeto é clonado automaticamente', 'A referência para o mesmo objeto é copiada', 'A variável original é apagada', 'Todas as propriedades são zeradas'],
      answerIndex: 1,
      explanation: 'Classes são tipos de referência. A atribuição copia a referência, então as duas variáveis podem apontar para a mesma instância.'
    }
  },
  {
    id: 'struct',
    name: 'struct',
    level: 'intermediário',
    category: 'C# básico/intermediário',
    simpleExplanation: 'Struct é um tipo de valor (Value Type). Ela copia os dados por valor e costuma ser usada para estruturas pequenas e imutáveis. O local físico na memória depende do contexto, então não trate Stack como regra absoluta.',
    interviewExplanation: 'Uma struct no C# é um Value Type que carrega seus dados por valor. Ela é ideal para estruturas pequenas e imutáveis, não suporta herança de outras classes ou structs e pode ficar cara se for muito grande, porque cada atribuição copia o conteúdo.',
    practicalExample: 'public struct GeoPonto {\n  public double Latitude { get; }\n  public double Longitude { }\n  public GeoPonto(double lat, double lon) { Latitude = lat; Longitude = lon; }\n}',
    whenToUse: 'Para representar conceitos matemáticos ou de domínio pequenos, imutáveis e de vida curta (ex: coordenadas, frações, cores RGB).',
    commonErrors: ['Criar structs gigantescas (causando lentidão ao passar por parâmetros por causa da cópia)', 'Criar structs mutáveis (gerando confusão já que alterações em cópias não se refletem na struct original).'],
    interviewQuestion: 'Qual é a principal diferença entre class e struct no C#?',
    shortInterviewAnswer: 'Class é um tipo de referência: a atribuição copia a referência para o mesmo objeto. Struct é um tipo de valor: a atribuição copia os dados para uma nova variável.',
    betterInterviewAnswer: 'Classes têm semântica de referência, permitem que duas variáveis apontem para a mesma instância e suportam herança. Structs têm semântica de valor: cada atribuição ou passagem por valor copia seus dados, e elas não participam de hierarquias de herança de classes. O local físico de uma struct na memória depende do contexto; a diferença essencial é a semântica de cópia.',
    tags: ['C#', 'Value Type', 'Memory'],
    quiz: {
      question: 'O que acontece ao passar uma "struct" como parâmetro para um método por padrão?',
      options: ['Passa uma referência para a mesma instância', 'Lança uma exceção de compilação', 'Uma cópia do valor é passada ao método', 'A struct é automaticamente destruída'],
      answerIndex: 2,
      explanation: 'Por padrão, a passagem de um tipo de valor copia o valor. O local físico na memória depende do contexto e não define essa semântica.'
    }
  },
  {
    id: 'record',
    name: 'record',
    level: 'intermediário',
    category: 'C# básico/intermediário',
    simpleExplanation: 'O Record é uma função nova do C# feita para facilitar a criação de objetos que servem apenas para carregar dados de forma imutável. Por padrão, ele compara os objetos pelos valores internos e não pelo endereço de memória.',
    interviewExplanation: 'Records são tipos (classe ou struct) com comportamento interno focado em imutabilidade e igualdade baseada em valores (value-based equality). Eles geram automaticamente boilerplate útil como desestruturadores, comparadores Equals estruturados e clone parcial através do operador "with".',
    practicalExample: 'public record ProdutoRecord(string Colecao, decimal Preco);\n// Comparação:\nvar p1 = new ProdutoRecord("A", 10);\nvar p2 = new ProdutoRecord("A", 10);\nbool saoIguais = p1 == p2; // true!',
    whenToUse: 'Para criar DTOs (Data Transfer Objects), eventos ou objetos de valor que não sofrem alterações constantes.',
    commonErrors: ['Esquecer que records padrão são de referência (record class) e achar que guardam na stack como structs, a menos que mude explicitamente para "record struct".'],
    interviewQuestion: 'O que é "Value-Based Equality" gerado pelo record?',
    shortInterviewAnswer: 'É a capacidade de dois objetos de instâncias diferentes serem considerados iguais (==) se todos os seus valores de propriedades forem idênticos.',
    betterInterviewAnswer: 'Ao contrário de classes padrão que usam igualdade referencial (comparam se apontam para o mesmo local de memória), os records usam igualdade de valores. O compilador gera funções automatizadas que comparam propriedade por propriedade. Se todas forem equivalentes, duas instâncias distintas retornam igualdade verdadeira.',
    tags: ['C#', 'Imutabilidade', 'Records'],
    quiz: {
      question: 'Qual operador do C# é tipicamente usado com records para clonagem e alteração parcial de propriedades de forma imutável?',
      options: ['operator clone', 'with', 'using', 'as'],
      answerIndex: 1,
      explanation: 'O operador "with" permite clonar um record existente alterando apenas propriedades selecionadas (ex: var novo = p1 with { Preco = 12 });.'
    }
  },
  {
    id: 'interface',
    name: 'interface',
    level: 'básico',
    category: 'Orientação a objetos',
    simpleExplanation: 'A interface funciona como um contrato. Ela não sabe fazer nada, apenas diz o que quem assinar o contrato tem que fazer. Ela define as assinaturas de métodos e propriedades que a classe deve criar.',
    interviewExplanation: 'Uma Interface no .NET define um contrato comportamental sem estado de instância que classes e structs podem implementar. Ela é a base de padrões de desacoplamento, testes unitários com mocks e do princípio da inversão de dependência.',
    practicalExample: 'public interface INotificador {\n  void EnviarEmail(string msg);\n}',
    whenToUse: 'Sempre que você quiser simular múltiplos comportamentos em classes diferentes ou precisar desacoplar a lógica usando Injeção de Dependência.',
    commonErrors: ['Criar interfaces para absolutamente qualquer classe que nunca será substituída ou simulada (exagerar em interfaces gera complexidade desnecessária).'],
    interviewQuestion: 'Por que usamos Interfaces no desenvolvimento e testes?',
    shortInterviewAnswer: 'Usamos interfaces para desacoplar o código de detalhes concretos, permitindo trocar implementações facilmente e criar mocks ou dublês de testes em testes unitários.',
    betterInterviewAnswer: 'Interfaces permitem programar voltado à abstração e não ao acoplamento. Elas viabilizam a Inversão de Dependência (D do SOLID), onde módulos de alto nível não dependem de detalhes, mas sim de contratos. Exemplo: podemos injetar um mock "IEmailService" nos testes sem disparar emails reais.',
    tags: ['OOP', 'Abstração', 'Arquitetura'],
    quiz: {
      question: 'Qual das alternativas é uma característica de Interfaces no C# moderno (C# 8+)?',
      options: ['Não podem ter métodos', 'Eles podem conter Default Implementations (implementações padrão de métodos)', 'Podem armazenar variáveis privadas de instância', 'Apenas structs podem usá-las'],
      answerIndex: 1,
      explanation: 'A partir do C# 8, interfaces podem ter "Default Interface Methods", ou seja, implementações padrão para evitar quebrar códigos antigos que assinam o contrato.'
    }
  },
  {
    id: 'classe-abstrata',
    name: 'classe abstrata',
    level: 'intermediário',
    category: 'Orientação a objetos',
    simpleExplanation: 'Classe abstrata é uma classe "meio termo": ela não pode ser instanciada diretamente com "new", mas serve como base para outras classes herdarem. Ela pode ter códigos já prontos e também métodos vazios que os filhos são obrigados a codificar.',
    interviewExplanation: 'Classes abstratas (abstract classes) servem para definir comportamentos padrão compartilhados por subclasses relacionadas (reuso de código), ao mesmo tempo em que forçam a assinatura de comportamentos específicos com métodos abstratos.',
    practicalExample: 'public abstract class MeioPagamento {\n  public void RegistrarLog() { /* código compartilhado */ }\n  public abstract void Processar(); // filho obrigatoriamente implementa\n}',
    whenToUse: 'Quando várias classes filhas compartilham o mesmo código base, mas possuem algumas regras específicas de execução.',
    commonErrors: ['Esquecer que o C# não aceita herança múltipla, então se você herdar de uma classe abstrata, não poderá herdar de mais nada (ao contrário de interfaces).'],
    interviewQuestion: 'Qual a diferença crucial entre classe abstrata e interface no C#?',
    shortInterviewAnswer: 'Classe abstrata pode armazenar estado de instância (campos) e herdar código pronto, mas o C# permite apenas uma classe base. Interfaces são contratos puros (sem herança de campo múltipla) e podem ser implementadas em lote.',
    betterInterviewAnswer: 'Interfaces descrevem "comportamento" (contrato puro) e podem ser implementadas em lote por uma única classe (herança múltipla de contratos). Classes abstratas descrevem "identidade" (representam uma herança direta "é um"), permitindo armazenar estado em variáveis e compartilhar código base reutilizável, mas limitam o filho a herdar apenas dela.',
    tags: ['OOP', 'Herança', 'Abstração'],
    quiz: {
      question: 'Podemos criar um objeto diretamente usando "new MinhaClasseAbstrata()"?',
      options: ['Sim, funciona normalmente', 'Não, pois classes abstratas não podem ser instanciadas diretamente', 'Apenas se usarmos reflection', 'Apenas no C# 10 em diante'],
      answerIndex: 1,
      explanation: 'Classes abstratas são feitas puramente para herança e não aceitam instanciação direta.'
    }
  },
  {
    id: 'heranca',
    name: 'herança',
    level: 'básico',
    category: 'Orientação a objetos',
    simpleExplanation: 'Herança permite que uma classe nova (filho) herde todos os atributos e funções de uma classe já existente (pai), evitando ter que digitar as mesmas propriedades e métodos novamente.',
    interviewExplanation: 'Herança define uma relação "é um" entre classes. Possibilita o reaproveitamento de código e a extensão de tipos no .NET, utilizando a palavra-chave ":" para herdar.',
    practicalExample: 'public class Funcionario { public decimal Salario { get; set; } }\npublic class Gerente : Funcionario { public decimal Bonus { get; set; } }',
    whenToUse: 'Quando há uma relação de especialização natural de tipos onde o reuso de código poupa refatorações massivas.',
    commonErrors: ['Usar herança apenas para poupar digitação quando não há relação real "é um", gerando acoplamento gigante. Nesses casos, prefira composição sobre herança.'],
    interviewQuestion: 'O .NET suporta herança múltipla de classes?',
    shortInterviewAnswer: 'Não. O C# suporta apenas herança simples de classe (uma classe herda de somente uma classe base), mas aceita implementar múltiplas interfaces.',
    betterInterviewAnswer: 'No C#, a herança múltipla de classes foi rejeitada por causar contradições (como o Problema do Diamante). Por isso, uma classe pode possuir apenas uma classe pai. Caso precise de múltiplos comportamentos, deve-se usar composição ou implementar múltiplas interfaces.',
    tags: ['OOP', 'Herança', 'Reuso de código'],
    quiz: {
      question: 'Qual palavra-chave ou separador é usado para indicar que uma classe herda de outra no C#?',
      options: ['inherits', 'extends', 'O caractere dois-pontos ( : )', 'implements'],
      answerIndex: 2,
      explanation: 'No C#, usamos o sinal de dois pontos ":" tanto para herdar de outra classe quanto para implementar interfaces.'
    }
  },
  {
    id: 'polimorfismo',
    name: 'polimorfismo',
    level: 'intermediário',
    category: 'Orientação a objetos',
    simpleExplanation: 'Polimorfismo significa "muitas formas". Em programação, é a capacidade de chamar o mesmo método (como "CalcularDesconto") de maneiras diferentes dependendo de qual objeto filho está executando aquele código.',
    interviewExplanation: 'O polimorfismo permite tratar objetos genéricos e ter comportamentos específicos baseados em tipos reais no runtime. No .NET, ocorre via sobreposição (override) de métodos marcados como "virtual" ou "abstract" da classe pai.',
    practicalExample: 'public class Animal { public virtual void FazerSom() => Console.WriteLine("Som"); }\npublic class Gato : Animal { public override void FazerSom() => Console.WriteLine("Miau"); }',
    whenToUse: 'Para remover fluxos complexos de switch/case em códigos que realizam lógicas diferentes para tipos diferentes de um mesmo grupo.',
    commonErrors: ['Esquecer de marcar o método pai como "virtual" ou "abstract", fazendo com que a sobrescrita falhe ou mude apenas na assinatura da classe filha (shadowing).'],
    interviewQuestion: 'Como funciona a sobrescrita de método no polimorfismo?',
    shortInterviewAnswer: 'O método na classe pai deve ser marcado com a palavra-chave "virtual" ou "abstract", e o método correspondente no filho deve usar o modificador "override".',
    betterInterviewAnswer: 'Para que o polimorfismo dinâmico funcione no C#, a classe pai precisa permitir a extensão marcando o método como virtual ou abstract. No filho, usamos override. Se não usarmos override mas sim "new", causamos ocultação de membro (shadowing), o que quebra o polimorfismo se o objeto for referenciado pelo tipo pai.',
    tags: ['OOP', 'Polimorfismo', 'Clean Code'],
    quiz: {
      question: 'O que o modificador "override" faz na assinatura de um método?',
      options: ['Sobrescreve a implementação de um método virtual ou abstrato da classe base', 'Esconde o método da memória RAM', 'Cria um método estático na classe filha', 'Força o método a disparar uma exceção'],
      answerIndex: 0,
      explanation: 'O override substitui de forma polimórfica a lógica original declarada no método virtual/abstrato pai.'
    }
  },
  {
    id: 'encapsulamento',
    name: 'encapsulamento',
    level: 'básico',
    category: 'Orientação a objetos',
    simpleExplanation: 'Encapsular é esconder o funcionamento interno de um objeto e expor apenas o que for seguro. É o mesmo que colocar os códigos em uma "cápsula" protetora usando chaves de acesso como "private" para dados e "public" para comportamentos externos.',
    interviewExplanation: 'Encapsulamento garante a integridade de dados restringindo acesso interno a propriedades sensíveis e forçando mudanças de estado via métodos controladores (ex: alterar saldo de conta apenas através de um método Sacar).',
    practicalExample: 'public class ContaBancaria {\n  private decimal _saldo;\n  public void Depositar(decimal valor) {\n    if (valor > 0) _saldo += valor;\n  }\n}',
    whenToUse: 'Sempre que você estiver escrevendo propriedades e campos que exijam validação ou que não devam ser alterados diretamente por fontes externas para evitar bugs de estado inconsistente.',
    commonErrors: ['Deixar todos os campos públicos (public get; public set;) em entidades críticas, permitindo que qualquer parte do software avacalhe os valores legítimos do sistema.'],
    interviewQuestion: 'Qual o valor do encapsulamento no Domain-Driven Design (DDD) ou Entities?',
    shortInterviewAnswer: 'Evitar que as entidades entrem em estado inconsistente. Controlamos toda alteração de dados através de validações internas em comportamentos explícitos.',
    betterInterviewAnswer: 'O encapsulamento protege a saúde das entidades de domínio. Ao desativar setters públicos diretos e expor apenas métodos com regras de negócio claras, garantimos que de fora não se quebrem regras lógicas internas, mantendo os dados persistidos sempre válidos.',
    tags: ['OOP', 'Encapsulamento', 'Segurança'],
    quiz: {
      question: 'Qual caractere/palavra-chave é usada no C# para impedir acesso a um campo fora do escopo da própria classe?',
      options: ['public', 'private', 'internal', 'protected'],
      answerIndex: 1,
      explanation: 'Atributos privados ("private") só são lidos e modificados por códigos dentro da própria classe.'
    }
  },
  {
    id: 'list',
    name: 'List',
    level: 'básico',
    category: 'Coleções e LINQ',
    simpleExplanation: 'List<T> é uma lista dinâmica na memória. Diferente de um array tradicional que tem tamanho fixo, a List aumenta automaticamente à medida que você vai adicionando novos itens.',
    interviewExplanation: 'A List<T> é uma coleção genérica indexável baseada em um array interno cujo tamanho cresce dinamicamente conforme necessário.',
    practicalExample: 'List<string> nomes = new List<string>();\nnomes.Add("João");\nnomes.Add("Maria");',
    whenToUse: 'Quando você precisar coletar, manipular, ordenar e adicionar/remover dados dinamicamente em memória RAM.',
    commonErrors: ['Usar List<T> em rotas de API expondo todo o poder de alteração da lista de forma livre à camada superior (nesse caso, exponha apenas ler, ex: IEnumerable ou IReadOnlyList).'],
    interviewQuestion: 'Como funciona o redimensionamento interno da List<T> no C#?',
    shortInterviewAnswer: 'Internamente há um array fixo. Quando ele enche, a classe aloca um array maior e copia todos os itens existentes.',
    betterInterviewAnswer: 'Quando a capacidade é excedida, a List<T> realoca um array interno maior, copia os dados anteriores e segue crescendo de forma amortizada. Métodos como Add() costumam ser O(1) amortizado, enquanto o resize em si custa O(n).',
    tags: ['Coleções', 'C#', 'Data Structures'],
    quiz: {
      question: 'O que representa o tipo genérico "<T>" em uma "List<T>"?',
      options: ['O tempo de resposta da lista', 'O tipo dos itens armazenados na lista (ex: string, int, Cliente)', 'Uma função estática de ordenação', 'O índice de início da coleção'],
      answerIndex: 1,
      explanation: 'O <T> representa Generics, indicando que a lista guardará itens estritamente daquele tipo T.'
    }
  },
  {
    id: 'ienumerable',
    name: 'IEnumerable',
    level: 'intermediário',
    category: 'Coleções e LINQ',
    simpleExplanation: 'O IEnumerable é o "leitor básico de listas". Ele apenas sabe ler uma coleção do começo ao fim, um por um. Ele não permite adicionar, remover ou saber o tamanho total sem contar tudo de novo.',
    interviewExplanation: 'IEnumerable<T> é a interface base para todas as coleções enumeráveis no .NET. Ela expõe o padrão Iterator e funciona de forma "Lazy Evaluation" (avaliação preguiçosa), gerando os dados por demanda.',
    practicalExample: 'IEnumerable<int> numeros = new List<int> { 1, 2, 3 };\nforeach(var n in numeros) { Console.WriteLine(n); }',
    whenToUse: 'Para retornar listas apenas para leitura em métodos de regras de negócio, garantindo que quem consuma não vá modificar a coleção (Adicionar/Remover).',
    commonErrors: ['Iterar várias vezes sobre o mesmo IEnumerable que executa consultas caras (causando múltiplas execuções redundantes - resolva chamando `.ToList()` na fonte).'],
    interviewQuestion: 'O que significa "Deferred Execution" (execução adiada) associado ao IEnumerable?',
    shortInterviewAnswer: 'Significa que a consulta LINQ configurada não roda imediatamente no banco ou memória, apenas quando você itera a lista (ex: no foreach ou .ToList()).',
    betterInterviewAnswer: 'IEnumerable permiteDeferred Execution. Quando você declara filtros com Where ou Select, você apenas monta um plano de execução. A operação real só é processada no hardware quando formos ler os dados de fato (avaliar com loops ou conversores de fechamento coletores como .ToList()).',
    tags: ['LINQ', 'IEnumerable', 'Lazy'],
    quiz: {
      question: 'Assinale a opção VERDADEIRA sobre o IEnumerable<T>:',
      options: ['Permite adicionar itens diretamente com o método .Add()', 'É uma interface apenas para leitura sequencial (Iterator)', 'Exige conexão de banco de dados sempre aberta', 'Não funciona com loops foreach'],
      answerIndex: 1,
      explanation: 'Ela expõe apenas a iteração direta. Não oferece métodos para modificação estrutural como Add ou Remove.'
    }
  },
  {
    id: 'iqueryable',
    name: 'IQueryable',
    level: 'avançado',
    category: 'Coleções e LINQ',
    simpleExplanation: 'O IQueryable é uma interface para consultas que um provider pode traduzir. Em muitos casos isso vira SQL e roda no banco antes de trazer os dados para a memória.',
    interviewExplanation: 'IQueryable<T> estende IEnumerable e armazena a expressão da consulta para que um provider decida como executá-la. Com EF Core, isso normalmente vira SQL; com outros providers, pode ser traduzido para outras fontes de dados.',
    practicalExample: 'IQueryable<Usuario> query = dbContext.Usuarios.Where(u => u.Ativo);\n// SQL gerado: SELECT ... FROM Usuarios WHERE Ativo = 1',
    whenToUse: 'Para montar queries dinâmicas que buscam dados diretamente do banco de dados (SQL Server, Postgres) antes de materializá-las.',
    commonErrors: ['Misturar métodos em memória (.ToString()) com filtros IQueryable que o banco não entende, gerando um erro de runtime ao traduzir a expressão.'],
    interviewQuestion: 'Qual a diferença crucial entre IEnumerable e IQueryable?',
    shortInterviewAnswer: 'IEnumerable filtra os dados na memória RAM do servidor C#. IQueryable gera comandos de banco e faz o filtro direto no servidor SQL.',
    betterInterviewAnswer: 'IEnumerable trabalha em memória usando delegados (Func) locais. IQueryable aceita Expression Trees que herdam e convertem código LINQ para chamadas remotas (ex: banco relacional). Se você filtrar dados do banco usando IEnumerable, toda a tabela do banco pode ser carregada para a memória do App antes do processamento.',
    tags: ['EF Core', 'SQL', 'Expressions'],
    quiz: {
      question: 'Onde ocorre a filtragem quando aplicamos o comando ".Where()" em um objeto do tipo "IQueryable"?',
      options: ['No navegador do usuário', 'No servidor de banco de dados (via SQL traduzido)', 'Na memória RAM do servidor da Web API', 'No compilador .NET'],
      answerIndex: 1,
      explanation: 'O filtro é traduzido para SQL e resolvido de forma otimizada direto na engine de banco de dados.'
    }
  },
  {
    id: 'linq',
    name: 'LINQ',
    level: 'básico',
    category: 'Coleções e LINQ',
    simpleExplanation: 'LINQ (Language Integrated Query) é um jeito unificado que o C# oferece para pesquisar, ordenar e listar elementos de coleções sem precisar fazer vários blocos de "if" e "for" aninhados.',
    interviewExplanation: 'LINQ unifica sintaxe de consultas sobre qualquer fonte de dados (coleções em memória, XML ou bancos de dados). Ele tem dois formatos: Query Syntax (cláusulas SQL-like) e Method Syntax (usando Lambda expressions).',
    practicalExample: 'var jovens = usuarios.Where(u => u.Idade < 18).ToList();',
    whenToUse: 'Para realizar buscas, agrupamentos, filtros, projeções ou transformações em qualquer coleção no backend de forma elegante.',
    commonErrors: ['Abusar do LINQ em partes críticas de altíssima performance onde alocações excessivas de objetos de closure geram lentidão visível.'],
    interviewQuestion: 'O que é LINQ e quais suas duas principais sintaxes?',
    shortInterviewAnswer: 'É uma extensão do .NET para realizar queries e filtros em coleções. Pode ser escrito usando sintaxe de método (Method-Lambda) ou sintaxe de consulta (Query).',
    betterInterviewAnswer: 'Language Integrated Query (LINQ) permite escrever declarações sobre estruturas de dados usando tipagem forte. Oferece a Sintaxe de Consulta (como select, from, where) e a Sintaxe de Métodos que utiliza expressões lambda conectadas, a qual é amplamente mais utilizada na comunidade pela legibilidade e poder de encadeamento.',
    tags: ['LINQ', 'C#', 'Filtros'],
    quiz: {
      question: 'Qual o principal benefício do uso do LINQ?',
      options: ['Deixar o app offline', 'Escrever códigos de filtragem expressivos, fortemente tipados e fáceis de ler no C#', 'Acelerar backups do banco de dados', 'Compilar o código C# para linguagem C++'],
      answerIndex: 1,
      explanation: 'O LINQ traz expressividade matemática de dados, tipagem forte do compilador e legibilidade absurda para o código.'
    }
  },
  {
    id: 'where',
    name: 'Where',
    level: 'básico',
    category: 'Coleções e LINQ',
    simpleExplanation: 'O comando Where serve para filtrar informações. Ele funciona como o "filtro da tabela": você passa uma condição para ele e ele te devolve apenas os itens que cumprem aquela condição.',
    interviewExplanation: 'Method extension do LINQ que filtra uma sequência de valores baseada em um predicado booleano em tempo de avaliação incremental (Deferred Execution).',
    practicalExample: 'var ativos = db.Sellers.Where(x => x.IsAtivo == true);',
    whenToUse: 'Filtros gerais em listas de itens ou tabelas em banco para reter subgrupos válidos.',
    commonErrors: ['Adicionar um Where() que não faz nada ou fazer testes nulos manuais de forma repetida na mesma consulta.'],
    interviewQuestion: 'O método Where altera a lista original?',
    shortInterviewAnswer: 'Não, o LINQ é imutável. O Where gera uma nova cadeia de leitura com os itens filtrados, sem alterar a fonte de dados.',
    betterInterviewAnswer: 'No .NET, métodos do LINQ seguem o paradigma de pureza de funções. O operador Where não mutaciona a coleção de origem; ele retorna um IEnumerable ou IQueryable que, ao ser enumerado, entrega os resultados filtrados baseados na condição parametrizada.',
    tags: ['LINQ', 'Filtros', 'Fluent'],
    quiz: {
      question: 'O método "Where" aceita qual tipo de parâmetro principalmente?',
      options: ['Um número Inteiro representativo de um índice', 'Um predicado ou expressão funcional (lambda) que retorne "true" ou "false"', 'Uma string de comando SQL bruta', 'Um arquivo JSON completo'],
      answerIndex: 1,
      explanation: 'O Where recebe uma função lambda (predicado booleano) para testar se cada item deve ou não permanecer na lista filtrada.'
    }
  },
  {
    id: 'select',
    name: 'Select',
    level: 'básico',
    category: 'Coleções e LINQ',
    simpleExplanation: 'O Select serve para transformar os dados de uma lista. Se você tem uma lista de "Clientes" e só quer uma lista contendo os "Nomes" deles prontos para exibir, você usa o Select para fazer essa transformação.',
    interviewExplanation: 'O método Select é um operador de projeção do LINQ. Ele mapeia os elementos individuais de uma coleção para um novo formato ou tipo de objeto (ex: mapear uma Entidade do banco de dados de volta em um DTO leve).',
    practicalExample: 'var nomes = clientes.Select(c => c.NomeCompleto).ToList();',
    whenToUse: 'Sempre que você precisar projetar apenas propriedades desejadas de objetos para reduzir consumo de peso e dados transmitidos do backend ao frontend.',
    commonErrors: ['Esquecer de projetar dados pesados no Entity Framework (não usar Select faz com que todas as colunas sejam consultadas do banco de dados desperdiçando banda).'],
    interviewQuestion: 'Para que serve o método Select em termos de ganho de performance em consultas?',
    shortInterviewAnswer: 'Serve para trazer apenas os campos específicos que você de fato vai utilizar na sua aplicação, evitando trazer colunas ou arquivos pesados de forma desnecessária.',
    betterInterviewAnswer: 'O Select realiza projeção de dados. Quando usado com Entity Framework Core (IQueryable), ele altera a instrução SQL gerada de "SELECT *" para "SELECT campoA, campoB". Isso reduz radicalmente a banda trafegada na rede e o tempo de materialização rápida dos objetos na memória.',
    tags: ['LINQ', 'Performance', 'Projeção'],
    quiz: {
      question: 'Dizer que o Select faz uma "Projeção" significa o quê?',
      options: ['Ele joga as informações na parede', 'Ele transforma ou converte o formato/tipo do objeto contido na coleção original', 'Ele faz upload dos itens para a nuvem', 'Ele calcula a probabilidade matemática do número de itens'],
      answerIndex: 1,
      explanation: 'Projetar denota remapear os dados, transformando o tipo original em outro (ex: ClasseEntidade em DTOViewModel).'
    }
  },
  {
    id: 'firstordefault',
    name: 'FirstOrDefault',
    level: 'básico',
    category: 'Coleções e LINQ',
    simpleExplanation: 'O FirstOrDefault busca o primeiro item que atende a uma condição. Se não achar nada, ele não dá erro, apenas te devolve "null" ou o valor padrão (default) daquele tipo de variável.',
    interviewExplanation: 'FirstOrDefault() retorna o primeiro elemento de uma coleção que satisfaz a condição informada, ou o valor padronizado (null para classes e 0 ou struct padrão para tipos primitivos) se nenhum elemento for localizado.',
    practicalExample: 'var cliente = clientes.FirstOrDefault(c => c.Id == 12);',
    whenToUse: 'Quando você vai ler um elemento específico do qual você tem o identificador exclusivo (como ID ou CPF), esperando receber nulo sem crashes caso não exista no banco.',
    commonErrors: ['Utilizar .First() em vez de .FirstOrDefault() esperando encontrar um registro opcional (o First lhes gerará uma Exception crítica de parada completa se a lista vier limpa).'],
    interviewQuestion: 'Qual a diferença crucial entre usar First() e FirstOrDefault()?',
    shortInterviewAnswer: 'First() lança um erro (exceção) caso nada seja localizado com o filtro. FirstOrDefault() é seguro pois retorna valor nulo sem quebras.',
    betterInterviewAnswer: 'Ambos buscam o primeiro item compatível. No entanto, se o resultado for vazio, .First() estoura um InvalidOperationException parando a execução. Já o .FirstOrDefault() é defensivo e retorna nulo (para reference types) ou o default do tipo de valor.',
    tags: ['LINQ', 'Segurança', 'Nulabilidade'],
    quiz: {
      question: 'O que o FirstOrDefault retorna para uma lista de classes que está com zero registros compatíveis com a pesquisa?',
      options: ['Estoura erro imediatamente', 'Uma nova instância vazia da classe', 'null', 'Retorna o número zero'],
      answerIndex: 2,
      explanation: 'Para reference types (classes), o valor default oficial em C# é null.'
    }
  },
  {
    id: 'async',
    name: 'async',
    level: 'intermediário',
    category: 'Async, Task e concorrência',
    simpleExplanation: 'O modificador async serve para sinalizar ao compilador do C# que um método é assíncrono. Isso significa que ele vai usar recursos modernos do computador para não travar a aplicação enquanto espera respostas lentas, como uma ida à internet.',
    interviewExplanation: 'A palavra "async" modifica a declaração de um método para habilitar a palavra-chave "await" em seu interior e instrui o compilador C# a reescrever o método em uma máquina de estados (State Machine) assíncrona sob o capô.',
    practicalExample: 'public async Task<string> ObterInformacoesAsync() {\n  // lógica...\n}',
    whenToUse: 'Em quase todos os métodos de API que envolvem operações pesadas de Entrada e Saída (I/O Bound) como acesso a banco, salvar arquivos e requisições HTTP externas.',
    commonErrors: ['Criar métodos marcados com "async" e esquecer de usar a palavra "await" em seu corpo (o compilador vai rodar o código de forma síncrona comum avisando com um alerta).'],
    interviewQuestion: 'Usar "async" cria uma nova thread do processador por si só?',
    shortInterviewAnswer: 'Não, o modelo "async/await" não cria necessariamente threads. Ele usa eventos do sistema para liberar a thread atual para trabalhar enquanto a resposta demora.',
    betterInterviewAnswer: 'Não. O modelo assíncrono do C# foca em operações sem uso de threads (I/O completion ports). Quando uma chamada assíncrona pesada começa, a thread de processamento é liberada para atender outras requisições HTTP na API. Não há desperdício de threads em estado de IDLE esperando respostas do banco de dados.',
    tags: ['Assincronismo', 'Performance', 'Task'],
    quiz: {
      question: 'Qual o papel fundamental do modificador "async"?',
      options: ['Compilar em código assembly puro', 'Instruir que o método possui comportamento assíncrono e deve permitir o uso de await', 'Deixar o software com visual bonito', 'Resetar o pool do IIS'],
      answerIndex: 1,
      explanation: 'O async ativa a State Machine e permite o uso do operador await no corpo do método para liberar threads.'
    }
  },
  {
    id: 'await',
    name: 'await',
    level: 'intermediário',
    category: 'Async, Task e concorrência',
    simpleExplanation: 'O await diz ao aplicativo: "Espere este comando demorado terminar, mas não trave nada por aqui. Pode liberar a linha de processamento para rodar outras tarefas e me avise quando o resultado estiver pronto".',
    interviewExplanation: 'O operador await suspende a execução do método assíncrono delimitado até que a tarefa aguardada seja concluída. Ele não bloqueia a thread chamadora e recupera o resultado da Task de forma transparente.',
    practicalExample: 'var dados = await _httpClient.GetStringAsync("https://api.com");',
    whenToUse: 'Sempre que você estiver trabalhando com Tasks e precisar que o resultado esteja disponível na linha seguinte do seu algoritmo.',
    commonErrors: ['Esquecer o await e tentar ler a variável esperando o tipo real de retorno, recebendo no lugar uma "Task<T>" pendente de execução.', 'Usar taticas nocivas de bloqueio com `.Result` ou `.Wait()` (causam altíssimo risco de Deadlocks fatais!).'],
    interviewQuestion: 'O que acontece com a thread Web quando o compilador bate em um comando "await"?',
    shortInterviewAnswer: 'A thread é liberada de volta para o Pool de aplicações do ASP.NET para responder outras solicitações, e o sistema ativa um sinalizador para reatar o método após o fim da tarefa.',
    betterInterviewAnswer: 'O await realiza suspensão não bloqueante. A execução do método é pausada criando um ponto de continuação. A thread que estava ali é imediatamente devolvida ao ThreadPool para processar outros pacotes de rede. Quando o recurso é retornado, uma thread pega o estado salvo da State Machine e conclui o método.',
    tags: ['Assincronismo', 'ThreadPool', 'C#'],
    quiz: {
      question: 'O que acontece em um sistema Web API se você usar ".Result" em vez de usar "await"?',
      options: ['O código executa duas vezes mais rápido', 'A thread corrente é bloqueada de forma síncrona agressiva, podendo causar esgotamento de threads (Thread Starvation) ou Deadlocks', 'O código é deletado pelo servidor', 'O .NET ignora e executa em segundo plano'],
      answerIndex: 1,
      explanation: 'Ler .Result força uma espera síncrona bloqueante devastando o ThreadPool sob estresse.'
    }
  },
  {
    id: 'task',
    name: 'Task',
    level: 'intermediário',
    category: 'Async, Task e concorrência',
    simpleExplanation: 'A Task representa um trabalho futuro de processamento que ainda vai terminar. Pense nela como uma "promessa" de entrega de um resultado ou ação que está rodando de forma assíncrona no ecossistema .NET.',
    interviewExplanation: 'Task e Task<TResult> são tipos de referência que representam o andamento de operações assíncronas no .NET. Eles encapsulam estados de ciclo de vida (Criado, Aguardando, Rodando, Concluído, Cancelado, Falhou) retornando dados ao fim.',
    practicalExample: 'Task salvarNoBanco = dbContext.SaveChangesAsync();\nawait salvarNoBanco; // Aguarda a tarefa na hora certa',
    whenToUse: 'Como tipo de retorno de qualquer método assíncrono que precise ser monitorado por quem for chamá-lo.',
    commonErrors: ['Escrever métodos "async void" (a menos que seja um handler de eventos de UI). O async void gera falha catastrófica se disparar uma exceção pois o servidor não consegue capturar o erro com try/catch.'],
    interviewQuestion: 'Por que devemos usar "Task" em vez de "void" para métodos assíncronos que não retornam valor?',
    shortInterviewAnswer: 'Porque um retorno "Task" permite rastrear erros com try/catch e aguardar com o await. O "async void" perde essa habilidade, podendo quebrar o processo web todo.',
    betterInterviewAnswer: 'O retorno do tipo "Task" permite gerenciar o contexto e ciclo de vida da execução assíncrona. Caso um erro ocorra dentro do método que retorna Task, ele é capturado na propriedade Exception da Task. Em contraste, com "async void", o erro não é registrado na pilha segura e derruba a aplicação por completo pois o sincronizador de contexto não consegue lidar com ele.',
    tags: ['Assincronismo', 'Task', 'Threads'],
    quiz: {
      question: 'Qual das opções é o melhor retorno para uma API assíncrona que executa um processo pesado e não precisa devolver dados?',
      options: ['async void', 'async Task', 'async object', 'async int'],
      answerIndex: 1,
      explanation: 'Sempre prefira `async Task` em vez de `async void`. O async void só existe para compatibilidade com eventos legados de desktop (WPF, Windows Forms).'
    }
  },
  {
    id: 'cancellationtoken',
    name: 'CancellationToken',
    level: 'avançado',
    category: 'Async, Task e concorrência',
    simpleExplanation: 'O CancellationToken é como uma "ficha de desistência". Se uma consulta demorada no banco está rodando e o usuário fecha o navegador ou desiste do request, esse token avisa o .NET a parar imediatamente a query de processar no banco, economizando processamento.',
    interviewExplanation: 'Um CancellationToken faz parte da estrutura de cancelamento cooperativo do .NET. Passado entre chamadas assíncronas consecutivas, ele propaga uma notificação de solicitação de cancelamento que cancela operações pendentes de I/O de forma precoce, disparando uma OperationCanceledException.',
    practicalExample: 'public async Task<List<Produto>> ListarAsync(CancellationToken cancellationToken) {\n  return await db.Produtos.ToListAsync(cancellationToken);\n}',
    whenToUse: 'Em rotas e endpoints de pesquisas complexas ou downloads que podem ser abortados pelo usuário ou por regras de tempo limite (timeout).',
    commonErrors: ['Esquecer de repassar o "cancellationToken" recebido no parâmetro da API para os métodos do banco de dados (EF Core) ou chamadas de Http concorrentes.'],
    interviewQuestion: 'Para que serve passar um "CancellationToken" para as queries do Entity Framework?',
    shortInterviewAnswer: 'Para cancelar a consulta que está executando no banco se o usuário cancelar o request HTTP na API, liberando conexões de banco de dados e CPU úteis.',
    betterInterviewAnswer: 'O uso de CancellationToken viabiliza cancelamentos cooperativos em cascata. Se a requisição web expira ou o usuário desconecta, o ASP.NET sinaliza o token. Quando esse token se propaga para as chamadas internas do Entity Framework, a query SQL ativa em progresso no banco é abortada remotamente, prevenindo gargalos e loops órfãos de processamento.',
    tags: ['Cancelamento', 'EF Core', 'Performance', 'Resiliência'],
    quiz: {
      question: 'De onde surge prioritariamente o CancellationToken injetado nos controllers do ASP.NET Core?',
      options: ['Do HD do usuário', 'Do próprio framework ASP.NET Core, baseado nas conexões TCP ativas do cliente que enviou o request', 'Do compilador C#', 'Do banco de dados relacional remoto'],
      answerIndex: 1,
      explanation: 'O runtime do ASP.NET Core cria um token monitorando o canal de rede do cliente; se a requisição é cancelada pelo browser, o token entra em estado de cancelamento.'
    }
  },
  {
    id: 'try-catch',
    name: 'try/catch',
    level: 'básico',
    category: 'Exceptions e tratamento de erro',
    simpleExplanation: 'O bloco try/catch serve para evitar que seu programa quebre. Você coloca o código perigoso que pode dar erro dentro do "try" (tentar). Se der ruim, o fluxo desvia para o bloco "catch" (capturar) onde você pode tratar o erro educadamente.',
    interviewExplanation: 'A estrutura de tratamento estruturado de exceções (Structured Exception Handling) do C# avalia um bloco vigiado (try) e direciona uma Exception lançada para um ou mais tratadores compatíveis (catch), com a possibilidade de limpar recursos ao final com finally.',
    practicalExample: 'try {\n  var num = int.Parse("TextoInvalido");\n} catch (FormatException ex) {\n  Console.WriteLine("Por favor, digite um número!");\n}',
    whenToUse: 'Sempre que houver risco real de erros externos incontroláveis (ex: problemas na rede, conexões de banco fora do ar, arquivos corrompidos).',
    commonErrors: ['Usar "catch(Exception ex)" capturando Deus e o mundo de forma cega nas camadas internas sem resolver o log, escondendo defeitos crônicos da aplicação.', 'Fazer rethrow de exceção fazendo "throw ex;" – isso destrói todo o StackTrace original! Use apenas "throw;".'],
    interviewQuestion: 'Qual a diferença crucial entre escrever "throw ex;" e "throw;" no C# para relançar um erro?',
    shortInterviewAnswer: '"throw ex;" reseta a pilha de erros (StackTrace) ocultando onde o erro original de fato nasceu. "throw;" preserva todo o histórico real facilitando a descoberta do problema nos logs.',
    betterInterviewAnswer: 'Ao usar "throw ex;", o .NET reescreve o ponto de origem do erro na propriedade StackTrace para a linha atual de relançamento, ocultando onde o crash inicial correu. Ao usar simplesmente "throw;", preservamos toda a pilha original de execução intacta. Isso é de vital importância para ferramentas de monitoramento de erros em ambiente de produção.',
    tags: ['Exceptions', 'Tratamento de erro', 'C#'],
    quiz: {
      question: 'Qual o impacto negativo de capturar exceções com try-catch vazios (silent catch)?',
      options: ['O site roda duas vezes mais rápido', 'Ocultação de bugs silenciosos que dificultam severamente a manutenção e monitoração do software', 'Dobra o uso de memória', 'Nenhum, pois limpar erros é correto'],
      answerIndex: 1,
      explanation: 'Pegar erros e abafar (silent catch) impede que você e o time saibam que as lógicas falharam no dia a dia.'
    }
  },
  {
    id: 'exception',
    name: 'exception',
    level: 'básico',
    category: 'Exceptions e tratamento de erro',
    simpleExplanation: 'Uma exceção representa um erro grave que ocorre enquanto o aplicativo está sendo executado. É uma mensagem padronizada do .NET contendo detalhes sobre o que deu errado e onde o erro aconteceu.',
    interviewExplanation: 'Em C#, todas as exceções derivam da classe base System.Exception. Elas representam condições extraordinárias de desvio do fluxo regular do sistema e carregam metadados preciosos para telemetria de erros (Mensagem, StackTrace e InnerException).',
    practicalExample: 'throw new ArgumentNullException(nameof(userId), "O ID informado não pode estar nulo.");',
    whenToUse: 'Sempre que um fluxo de execução encontrar uma inconsistência insustentável de dados onde prosseguir coloque a segurança de banco ou negócios em risco imediato.',
    commonErrors: ['Usar Exceções para controlar o fluxo rotineiro do sistema (ex: usar erro para dizer que validação de login falhou). Exceptions são lentas e custosas (geram overhead pesado na alocação da pilha de execução).'],
    interviewQuestion: 'Por que o uso excessivo de exceções afeta a performance da API?',
    shortInterviewAnswer: 'Porque instanciar exceções gera grande consumo de processamento para colher o StackTrace detalhado de memória RAM.',
    betterInterviewAnswer: 'Exceções devem ser reservadas para casos genuinamente "excepcionais". Quando uma exceção é gerada (thrown), o runtime precisa mapear todo o estado da pilha de chamadas e alocar grandes buffers de string para o StackTrace. Esse processo é nocivo para a performance se usado de forma recorrente (como validação trivial de formulário; para isso, prefira padrões voltados à validação defensiva).',
    tags: ['Exceptions', 'Desempenho', 'C#-Core'],
    quiz: {
      question: 'Qual classe funciona como mãe de todos os erros e exceções no ecossistema .NET?',
      options: ['System.Class', 'System.Exception', 'System.ErrorList', 'System.FatalEvent'],
      answerIndex: 1,
      explanation: 'Todas as exceções customizadas ou nativas derivam diretamente ou indiretamente de System.Exception.'
    }
  }
];
