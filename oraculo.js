/*! Oráculo — 509 frases internas, numeradas internamente (não aparecem), offline */
(() => {
  const $ = (s) => document.querySelector(s);
  const elText =
    $('#oracleMsg') || $('#oracleText') || $('#oracle-msg') || $('#oracle_text');
  const btnNova =
    $('#btnNova') || $('#btnNovaMensagem') || $('#oracle-new') || $('#btn-oraculo-nova');
  const btnCopiar =
    $('#btnCopiar') || $('#oracle-copy') || $('#btn-oraculo-copiar');
  const btnWhats =
    $('#btnWhats') || $('#oracle-wa') || $('#btn-oraculo-wa');
  if (!elText) return;

  // ------- Bancos de texto (variedade alta, estilo "Entre Mundos") -------
  const OPEN = [
    "Respira fundo","Fica perto de ti","Volta a ti","Abranda","Olha por dentro",
    "Sê gentil contigo","Agradece o agora","Celebra o simples","Confia no processo",
    "Diz sim ao que é","Permite-te sentir","Entrega o controlo","Aceita o silêncio",
    "Faz espaço","Abraça a pausa","Escuta o corpo","Sente o chão","Honra o teu ritmo",
    "Sorri por dentro","Permite-te recomeçar","Oferece-te descanso","Sê presença",
    "Pousa os ombros","Aquece o coração","Leva a mão ao peito","Reconhece a verdade",
    "Cuida do que é vivo","Lembra-te de respirar","Mantém-te humilde","Fica no essencial"
  ];
  const VERB = [
    "a tua coragem cresce","a clareza chega","o coração responde","o medo diminui",
    "a mente sossega","a paz encontra-te","a intuição fala","a luz expande",
    "o corpo sabe","a alma acalma","o caminho aparece","a ternura conduz",
    "o amor organiza","o silêncio explica","a presença cura","a confiança floresce",
    "a vergonha solta-se","a esperança renasce","a dúvida abre espaço","o cansaço descansa",
    "a paciência aprende","o espírito recorda","o tempo certo chega","o futuro desanuvia"
  ];
  const TAIL = [
    "sem pressa","com suavidade","em pequenas ações","no teu tempo","devagar e bem",
    "sem te cobrares","com pés no chão","de olhos abertos","com verdade","com gratidão",
    "sem barulho","em silêncio","com presença","com ternura","a partir do peito",
    "como quem regressa a casa","com respeito por ti","com curiosidade","com amor manso",
    "como quem confia","na direção do simples","um passo de cada vez"
  ];
  const TPL = [
    "{o}, e {v} {t}.",
    "{o}. Deixa que {v} {t}.",
    "{o} até que {v} {t}.",
    "{o}; {v} {t}.",
    "Hoje, {o} — {v} {t}.",
    "Quando te esqueceres, {o} e {v} {t}.",
    "Sem te apressares, {o}; {v} {t}.",
    "Se doer, {o}: {v} {t}.",
    "Antes de responderes, {o}; {v} {t}.",
    "Mesmo cansado, {o} e {v} {t}."
  ];
  const SINGLES = [
    "Tu és casa antes do mundo.","Não precisas provar nada para merecer descanso.",
    "A tua sensibilidade é força, não falha.","Quando soltas, a vida encontra-te.",
    "O essencial não grita.","Sê fiel ao que te mantém vivo.",
    "A respiração é uma porta que nunca fecha.","O azul lembra-te: estás a salvo.",
    "O teu ritmo não é atraso, é sabedoria.","Há respostas que só o silêncio entrega.",
    "A ternura também é coragem.","Podes começar pequeno e ainda assim começar.",
    "A tua presença muda a sala.","O coração entende antes de explicar.",
    "A paz não é meta; é caminho.","Permitir é diferente de desistir.",
    "O corpo não mente; escuta-o.","Nem tudo pede solução; algumas coisas pedem colo.",
    "Volta quantas vezes for preciso.","És suficiente agora.",
    "A intuição fala baixo — aproxima-te.","Escolhe o que te devolve a ti.",
    "O amor reorganiza o caos.","A pausa é parte da música.",
    "Há mar entre um pensamento e outro.","Aceitar não te diminui, liberta-te.",
    "O que é verdadeiro permanece simples.","O teu ‘não’ também é sagrado.",
    "O amanhã não precisa de pressa hoje.","A luz não exige; oferece.",
    "Estás a aprender a pertencer a ti.","O caminho abre onde pousas atenção.",
    "Descansar também é trabalho de alma.","Sente orgulho do que já curaste.",
    "A tua voz interna é nítida quando confias.","Há beleza no intervalo.",
    "Respirar é regressar.","Mesmo no escuro, continuas inteiro.",
    "Se te perderes, volta ao corpo.","A bondade é a tua revolução.",
    "A coragem pode ser mansa.","O cuidado contigo é trabalho divino.",
    "O amor-próprio não é ego, é raiz.","A presença afina o mundo.",
    "Há bênçãos discretas a acontecer.","Quando sabes pausar, sabes viver.",
    "A vida também te escolhe.","Deixar ir abre espaço para chegar.",
    "Toma o teu lugar com quietude.","O teu coração sabe o caminho curto."
  ];
  const EXTRA_Q = [
    "O que precisas de largar agora?","Qual é o gesto pequeno que muda o dia?",
    "Que verdade pede espaço em ti?","Onde o teu corpo diz não?",
    "Qual é a parte tua que pede colo?","O que o silêncio te está a ensinar?",
    "Que promessa podes fazer a ti hoje?","Qual é a escolha que te devolve paz?"
  ];

  // ------- Gerar 509 únicas -------
  const EXPECTED = 509;
  const set = new Set();
  // singles primeiro
  SINGLES.forEach(s => set.add(s));

  function cap(s){ return s.replace(/\s+/g,' ').replace(/\s([.,;:!?])/g,'$1')
    .replace(/^./, c => c.toUpperCase()); }

  let guard = 0;
  while (set.size < EXPECTED && guard < 40000){
    const o = OPEN[(Math.random()*OPEN.length)|0];
    const v = VERB[(Math.random()*VERB.length)|0];
    const t = TAIL[(Math.random()*TAIL.length)|0];
    const tpl = TPL[(Math.random()*TPL.length)|0];
    set.add(cap(tpl.replace("{o}", o).replace("{v}", v).replace("{t}", t)));
    guard++;
  }
  // se ainda faltar, perguntas/reflexões
  let qi = 0;
  while (set.size < EXPECTED){
    set.add(EXTRA_Q[qi++ % EXTRA_Q.length]);
  }

  // cria array e numera internamente [001], [002], ...
  const RAW = Array.from(set).slice(0, EXPECTED).map((txt, i) => {
    const n = String(i+1).padStart(3,'0');
    return `[${n}] ${txt}`;
  });

  // embaralha
  for (let i=RAW.length-1; i>0; i--){
    const j = (Math.random()*(i+1))|0; [RAW[i], RAW[j]] = [RAW[j], RAW[i]];
  }

  // deck para exibir (sem numeração)
  const DECK = RAW.map(s => s.replace(/^\[\d+\]\s*/, ""));

  // diagnóstico não intrusivo
  elText.setAttribute('data-deck', String(DECK.length));
  console.log("[Oráculo 509] deck =", DECK.length);

  let idx = 0, last = "";
  function novaFrase(){
    if (!DECK.length) return;
    if (idx >= DECK.length) { idx = 0; }
    let f = DECK[idx++];
    if (f === last && idx < DECK.length) f = DECK[idx++];
    last = f;
    elText.textContent = f;
  }
  function copiar(){
    const t = (elText.textContent||'').trim(); if (!t) return;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(t).catch(()=>{});
    else { const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta);
      ta.select(); try{document.execCommand('copy');}catch{} ta.remove(); }
  }
  function whats(){
    const t = encodeURIComponent((elText.textContent||'').trim()); if (!t) return;
    location.href = 'https://wa.me/?text=' + t;
  }

  btnNova   && btnNova  .addEventListener('click', novaFrase);
  btnCopiar && btnCopiar.addEventListener('click', copiar);
  btnWhats  && btnWhats .addEventListener('click', whats);

  if (!elText.textContent || /Nova mensagem/i.test(elText.textContent))
    elText.textContent = "Toca em “Nova mensagem” para receber a tua mensagem.";
})();