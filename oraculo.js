/*! Oráculo — v8: 1000 frases internas, aleatório, sem números, sem mexer no layout */
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

  if (!elText) { console.warn('[Oráculo v8] container não encontrado.'); return; }

  const SINGLES = [
    "Tu és a casa antes do mundo.","O azul lembra-te: tudo volta ao lugar.",
    "O que é teu por verdade não faz barulho.","O silêncio também responde.",
    "Há um porto seguro dentro de ti.","Hoje escolhe a gentileza contigo.",
    "A respiração abre portas que a mente não vê.","Onde pões a atenção, pões a vida.",
    "Tudo o que procuras pede-te presença.","A alma sussurra quando o ruído descansa.",
    "Aceitar também é movimento.","A pausa é sagrada.","És suficiente tal como és.",
    "Volta, quantas vezes for preciso.","O amor sabe o caminho.",
    "Confia no passo pequeno e verdadeiro.","A tua voz interior é clara quando escutas.",
    "Respirar é regressar.","Luz não grita; ilumina.","O coração entende o simples."
  ];
  const INTROS = ["Respira e","Fecha os olhos e","Sente o corpo e","Pousa o peso e","Abaixa os ombros e","Repara no coração e","Lembra-te de quem és e","Volta a ti e","Entrega o controlo e","Confia no caminho e","Acolhe o silêncio e","Abraça a pausa e","Aceita o agora e","Sorri por dentro e","Escuta com calma e","Honra a tua verdade e","Agradece o que tens e","Sê gentil contigo e","Solta o que pesa e","Descansa por um momento e"];
  const VERBS  = ["permite que a paz te encontre","deixa que a respiração te guie","escuta o que não precisa de palavras","recorda a tua própria luz","abre espaço para o simples","acolhe o que é sem resistência","confia no tempo do coração","sente o chão que te sustenta","reconhece o que já é suficiente","permite que o corpo te conte a verdade","abraça o começo que se insinua","permite que a mente descanse","volta ao porto azul dentro de ti","permite que o amor te atravesse","ouve o sussurro da alma","descobre o que fica quando tudo cala","deixa o mar dentro de ti acalmar","encosta a cabeça no céu por um segundo","permite que o coração responda","fica com o que é vivo em ti"];
  const ENDS   = ["agora.","com suavidade.","sem pressa.","em silêncio.","com gratidão.","a partir do peito.","como quem regressa a casa.","com presença.","sem te cobrar nada.","como quem confia.","na luz do teu próprio ritmo.","com ternura.","de olhos abertos para dentro.","de mãos dadas contigo.","com humildade.","a partir do que sentes.","no tempo certo.","até te encontrares.","com coragem mansa.","com verdade."];

  function gerarFrases(n=1000){
    const out = new Set(SINGLES);
    outer: for (let i=0;i<INTROS.length;i++){
      for (let j=0;j<VERBS.length;j++){
        for (let k=0;k<ENDS.length;k++){
          out.add(`${INTROS[i]} ${VERBS[j]} ${ENDS[k]}`);
          if (out.size >= n) break outer;
        }
      }
    }
    return Array.from(out).slice(0,n);
  }
  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]] } return a; }

  const DECK = shuffle(gerarFrases(1000));
  console.log('[Oráculo v8] deck size =', DECK.length);
  elText.setAttribute('data-deck', String(DECK.length));

  let idx = 0, last = "";

  function novaFrase(){
    if (!DECK.length) return;
    if (idx >= DECK.length){ shuffle(DECK); idx = 0; }
    let f = DECK[idx++];
    if (f === last && idx < DECK.length) f = DECK[idx++];
    last = f;
    elText.textContent = f;
  }
  function copiar(){
    const t = (elText.textContent||'').trim(); if (!t) return;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(t).catch(()=>{});
    else { const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch{} ta.remove(); }
  }
  function whats(){
    const t = encodeURIComponent((elText.textContent||'').trim()); if (!t) return;
    location.href = 'https://wa.me/?text=' + t;
  }

  btnNova   && btnNova  .addEventListener('click', novaFrase);
  btnCopiar && btnCopiar.addEventListener('click', copiar);
  btnWhats  && btnWhats .addEventListener('click', whats);

  if (!elText.textContent || /Nova mensagem/i.test(elText.textContent))
    elText.textContent = 'Toca em “Nova mensagem” para receber a tua mensagem.';
})();
