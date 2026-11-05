const app = document.querySelector('#app');
const answers = [];
let step = 0;
const questions = [
  { title: 'Você já tentou criar uma influencer de IA? 👀', icon: '✦', options: [['🌱', 'Ainda não. Quero começar do zero.'], ['💡', 'Já tentei, mas preciso de uma direção.'], ['✨', 'Já crio e quero evoluir meus resultados.']] },
  { title: 'Qual é o seu principal objetivo?', icon: '◎', options: [['📱', 'Criar conteúdo para redes sociais'], ['🛍️', 'Apresentar uma marca ou produto'], ['🎨', 'Explorar um projeto criativo']] },
  { title: 'Que estilo combina com a sua personagem?', icon: '◈', options: [['📷', 'Editorial e realista'], ['🌈', 'Artístico e expressivo'], ['⚡', 'Futurista e tecnológico']] },
  { title: 'Por onde você quer começar?', icon: '↗', options: [['👤', 'Identidade e personalidade'], ['🖼️', 'Primeiras imagens e conceitos'], ['📝', 'Planejamento de conteúdo']] }
];
const prompts = [
  ['Retrato editorial', 'Retrato editorial de uma personagem virtual adulta original, expressão confiante, roupa casual elegante, iluminação natural lateral, fundo neutro, composição vertical. Identificar como criação de IA na publicação.'],
  ['Campanha de marca', 'Crie o conceito de uma campanha com uma personagem virtual adulta original. Defina público, mensagem, paleta de cores e três cenas com roupas e contexto adequados à marca. Não use a aparência de pessoas reais.'],
  ['Calendário de conteúdo', 'Monte um calendário de 7 dias para uma influencer virtual. Inclua tema, formato, legenda e chamada para ação. Alterne apresentação, bastidores criativos e conteúdo educativo. Sinalize a natureza virtual da personagem.']
];
const art = `<div class="showcase"><span class="art-label">PERSONAGEM VIRTUAL · CONCEITO</span><svg viewBox="0 0 384 400" role="img" aria-label="Ilustração original de uma personagem virtual com cabelo escuro, jaqueta laranja e cenário futurista"><defs><linearGradient id="skin" x2="1" y2="1"><stop stop-color="#e7b499"/><stop offset="1" stop-color="#ad705c"/></linearGradient><linearGradient id="coat" x2="1" y2="1"><stop stop-color="#ffae46"/><stop offset="1" stop-color="#b54b1f"/></linearGradient></defs><g fill="none" stroke="#ef9440" opacity=".22"><circle cx="192" cy="173" r="132"/><circle cx="192" cy="173" r="145"/><path d="M0 100h384M0 290h384M65 0v400M320 0v400"/></g><path fill="#161316" d="M110 255C90 170 91 68 176 60c93-16 120 60 107 186l-70 49z"/><path fill="url(#coat)" d="M49 400l16-82c5-40 60-53 93-64h68c45 11 86 30 98 66l17 80z"/><path fill="url(#skin)" d="M163 211h59l7 54-34 38-39-41z"/><path fill="url(#skin)" d="M133 128c1-41 93-54 108 4l-1 55c-3 37-29 60-49 60s-48-25-52-55z"/><path fill="#231b20" d="M118 170c-10-61 1-108 65-108 57-3 88 35 69 99-12-18-16-51-27-57-20 28-53 38-93 41l-2 51z"/><g fill="none" stroke="#3d2524" stroke-width="3" stroke-linecap="round"><path d="M151 158q12-7 23 0m31 0q13-7 23 0"/><path d="M154 169q9 5 18 0m35 0q9 5 17 0"/><path d="M191 173l-4 22 9 1"/></g><path fill="#9d4b48" d="M175 211q17 9 33-1-17 20-33 1"/><circle cx="138" cy="192" r="8" fill="none" stroke="#ffcb77" stroke-width="3"/><path fill="#111" d="M156 266l39 37 34-37 18 134H140z"/><path fill="none" stroke="#ffd398" stroke-width="2" d="M141 273l-25 38 23 21-30 68m131-126 26 37-21 21 30 68"/><g fill="#fda33b"><circle cx="310" cy="100" r="4"/><circle cx="72" cy="240" r="3"/></g></svg><div class="art-caption"><div>INFLUENCER IA<strong>Sua ideia ganha identidade.</strong></div><span class="round">↗</span></div></div>`;
function render() {
  if (step === 0) {
    app.innerHTML = `<section class="center fade"><span class="eyebrow">CRIATIVIDADE + INTELIGÊNCIA ARTIFICIAL</span><h1>CRIE SUA <span class="orange">INFLUENCER DE IA</span> PARA CONTEÚDOS <span class="orange">ORIGINAIS</span> 🔥</h1>${art}<p class="intro-copy">Descubra como transformar uma ideia em uma <span class="orange">personagem virtual com identidade, estilo e conteúdo.</span> 👇</p><button class="primary" data-next>QUERO VER COMO FUNCIONA <span>→</span></button><p class="note">4 perguntas rápidas · Sem cadastro · Briefing gratuito</p></section>`;
  } else if (step <= questions.length) {
    const q = questions[step - 1];
    app.innerHTML = `<section class="fade"><div class="topline"><button class="back" data-back>← Voltar</button><span>Pergunta ${step} de ${questions.length}</span></div><div class="progress" role="progressbar" aria-label="Progresso do questionário" aria-valuemin="0" aria-valuemax="4" aria-valuenow="${step}"><span style="width:${step / questions.length * 100}%"></span></div><div class="center"><span class="step-icon orange">${q.icon}</span><h1>${q.title}</h1><p class="note">Escolha a opção que mais combina com você.</p></div><div class="options">${q.options.map(([emoji, text], i) => `<button class="option" data-answer="${i}"><span class="emoji" aria-hidden="true">${emoji}</span><span>${text}</span><span class="arrow" aria-hidden="true">›</span></button>`).join('')}</div><p class="note">Não existe resposta certa. O projeto é seu.</p></section>`;
  } else {
    const style = ['Editorial e realista', 'Artístico e expressivo', 'Futurista e tecnológico'][answers[2]];
    const goal = ['Conteúdo para redes sociais', 'Apresentação de marca ou produto', 'Projeto criativo'][answers[1]];
    app.innerHTML = `<section class="center fade"><div class="topline"><button class="back" data-back>← Revisar respostas</button><span>Seu ponto de partida está pronto</span></div><div class="progress"><span style="width:100%"></span></div><span class="step-icon">✨</span><h1>Uma nova personagem.<br><span class="orange">Com a sua direção criativa.</span></h1><p>Use este plano como ponto de partida para tirar sua ideia do papel.</p><div class="result-card"><span class="tag">SEU PERFIL CRIATIVO</span><h2>${style}</h2><p>Objetivo: <strong>${goal}</strong></p><ul class="features"><li><span>✓</span> Defina nome, personalidade e público.</li><li><span>✓</span> Crie referências de estilo e iluminação.</li><li><span>✓</span> Mantenha a identidade entre as imagens.</li><li><span>✓</span> Informe que a personagem é virtual.</li></ul></div><button class="primary" data-download>BAIXAR MEU BRIEFING <span>↓</span></button><p class="note">Arquivo de texto gratuito. Nenhum dado é enviado.</p><h2>Seu primeiro passo:<br><span class="orange">3 prompts para experimentar.</span></h2><p class="note">Exemplos para usar na ferramenta de IA de sua escolha. As imagens não são geradas neste site.</p>${prompts.map(([title, text], i) => `<article class="prompt-card"><h3>${i + 1}. ${title}</h3><p>${text}</p><button class="copy" data-copy="${i}">Copiar prompt ⧉</button></article>`).join('')}<p class="status" id="status" role="status"></p><h2>Dúvidas frequentes</h2><details><summary>O site cria imagens automaticamente?</summary><p>Não. Aqui você organiza sua direção criativa e recebe prompts de exemplo. A criação de imagens acontece na ferramenta que você escolher.</p></details><details><summary>Posso usar uma pessoa real como modelo?</summary><p>Crie personagens originais e respeite os direitos de imagem. O uso de aparência, voz ou identidade de uma pessoa real exige autorização adequada.</p></details><details><summary>Este material garante resultados financeiros?</summary><p>Não. Resultados dependem de execução, público, ferramentas e estratégia. Este site fornece apenas um ponto de partida criativo.</p></details><button class="secondary" data-restart>Criar outro briefing ↻</button></section>`;
  }
}
function move(next) { step = next; render(); window.scrollTo({ top: 0, behavior: 'instant' }); app.focus({ preventScroll: true }); }
function restart() { answers.length = 0; move(0); }
function briefing() {
  return 'MEU BRIEFING — INFLUENCER IA\n\n' + questions.map((q, i) => q.title + '\n' + q.options[answers[i]][1]).join('\n\n') + '\n\nPRIMEIROS PROMPTS\n\n' + prompts.map(([t, p]) => t + '\n' + p).join('\n\n') + '\n\nCrie personagens originais e sinalize o uso de IA.\n';
}
app.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-next')) move(1);
  if (button.hasAttribute('data-back')) move(Math.max(0, step - 1));
  if (button.hasAttribute('data-answer')) { answers[step - 1] = Number(button.dataset.answer); move(step + 1); }
  if (button.hasAttribute('data-restart')) restart();
  if (button.hasAttribute('data-download')) {
    const url = URL.createObjectURL(new Blob([briefing()], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'meu-briefing-influencer-ia.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  if (button.hasAttribute('data-copy')) {
    const text = prompts[Number(button.dataset.copy)][1];
    try { await navigator.clipboard.writeText(text); button.textContent = 'Copiado ✓'; }
    catch { document.querySelector('#status').textContent = 'Selecione o texto do prompt acima e copie manualmente.'; }
  }
});
document.querySelector('#restart').addEventListener('click', restart);
const dialog = document.querySelector('#privacy-dialog');
document.querySelector('#privacy').addEventListener('click', () => dialog.showModal());
document.querySelector('#close-privacy').addEventListener('click', () => dialog.close());
document.querySelector('#year').textContent = new Date().getFullYear();
render();
