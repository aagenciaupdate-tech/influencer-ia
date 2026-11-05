# Influencer IA

Site estático responsivo em português, com questionário criativo em quatro etapas, resultado personalizado, três prompts de exemplo e briefing para download. Layout inspirado no formato de funil da referência fornecida, com identidade e ilustração originais.

## Desenvolvimento

Requer Node.js 22 ou superior. Não há dependências externas.

```sh
npm start
npm run check
npm run build
```

O servidor usa a porta 3000 (ou `PORT`). A compilação copia os arquivos públicos para `dist/`. A aplicação não gera imagens, não processa pagamentos, não coleta leads e não usa rastreadores. Respostas permanecem somente em memória no navegador e são apagadas ao atualizar ou recomeçar.

## Publicação

GitHub Pages: publicar da branch `main`, diretório raiz `/`. Os arquivos usam caminhos relativos para funcionar em um endereço de projeto. Para outras hospedagens estáticas, usar `npm run build` e publicar `dist/`.

## Verificação realizada

Análise sintática, build e testes em Chromium: quatro perguntas, resultado, revisão, reinício, download do briefing, diálogo de privacidade e largura no celular. O site de referência contém outros conteúdos e integrações que não fazem parte desta implementação.
