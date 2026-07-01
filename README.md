# .NET Interview Roadmap

Um app de estudo para revisar C# e .NET com trilha, roadmap, simulador e foco em sessão curta.

## Rodar localmente

1. Instale as dependências: `npm install`
2. Inicie o app: `npm run dev`

## Sincronização com Google Drive

O app pode salvar o progresso completo do usuário no Google Drive usando a pasta privada `appDataFolder`, incluindo status dos termos, nota de confiança, desempenho do simulado, rascunhos do simulado, pergunta atual e outros dados presentes no `localStorage` do app.

Para ativar localmente:

1. Crie um OAuth Client ID do tipo Web no Google Cloud Console.
2. Adicione a origem do app em **Authorized JavaScript origins** (ex.: `http://localhost:3000`).
3. Copie `.env.example` para `.env.local` e preencha `VITE_GOOGLE_CLIENT_ID`.
4. Reinicie o Vite e use o botão **Google Drive** no cabeçalho.

Ao conectar em um Drive que já possui dados, o app mescla os dados locais com os remotos e guarda um backup local antes de restaurar, reduzindo o risco de sobrescrever progresso importante. Sem `VITE_GOOGLE_CLIENT_ID`, o app continua funcionando somente com `localStorage`.

## Build

`npm run build`

## Deploy no GitHub Pages

`npm run deploy`
