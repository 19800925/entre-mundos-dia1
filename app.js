/* Entre Mundos — Oráculo inline (home) */
(function(){
  const elMsg = document.getElementById('oracleMsg');
  const btnNova = document.getElementById('btnNova');
  const btnCopiar = document.getElementById('btnCopiar');
  const btnWhats = document.getElementById('btnWhats');

  let frases = [];
  let lastIndex = -1;

  // Util: limpar números finais (ex: "texto (94)" ou "texto 94")
  function limparNumeracao(s){
    if(!s) return "";
    return s
      .replace(/\s*[\(\[\{]?\s*\d{1,4}\s*[\)\]\}]?\s*$/,'')  // remove (94), [94], 94
      .replace(/\s+/g,' ')
      .trim();
  }

  function escolherAleatoria(){
    if (!frases.length) return null;
    if (frases.length === 1) return 0;
    let i = Math.floor(Math.random() * frases.length);
    if (i === lastIndex) {
      i = (i + 1) % frases.length; // evita repetição imediata
    }
    lastIndex = i;
    return i;
  }

  function mostrar(frase){
    elMsg.textContent = frase;
  }

  function novaMensagem(){
    if(!frases.length){
      mostrar("A carregar mensagens do oráculo…");
      return;
    }
    const idx = escolherAleatoria();
    if (idx === null) return;
    const limpa = limparNumeracao(frases[idx]);
    mostrar(limpa);
    // Guardar no sessionStorage para partilha/copy coerente
    sessionStorage.setItem('entre_mundos_oraculo_atual', limpa);
  }

  async function carregarFrases(){
    try{
      const url = './oraculo.json?v=' + Date.now(); // evita cache
      const res = await fetch(url, {cache:'no-store'});
      const data = await res.json();
      if (Array.isArray(data)) {
        frases = data.map(limparNumeracao).filter(Boolean);
      } else if (Array.isArray(data.frases)) {
        frases = data.frases.map(limparNumeracao).filter(Boolean);
      }
      if(!frases.length){
        frases = ["A tua luz guia-te no silêncio.", "Confia no tempo divino, ele nunca se atrasa.", "És maior do que o medo."];
      }
    }catch(e){
      frases = ["A tua luz guia-te no silêncio.", "Confia no tempo divino, ele nunca se atrasa.", "És maior do que o medo."];
    }
  }

  function copiar(){
    const txt = sessionStorage.getItem('entre_mundos_oraculo_atual') || elMsg.textContent || "";
    if(!txt) return;
    // clipboard API com fallback iOS
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(()=>{
        btnCopiar.textContent = "Copiado ✓";
        setTimeout(()=>btnCopiar.textContent="Copiar", 1200);
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = txt;
      ta.setAttribute('readonly','');
      ta.style.position='absolute'; ta.style.left='-9999px';
      document.body.appendChild(ta);
      ta.select(); ta.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(ta);
      btnCopiar.textContent = "Copiado ✓";
      setTimeout(()=>btnCopiar.textContent="Copiar", 1200);
    }
  }

  function partilharWhatsApp(){
    const txt = sessionStorage.getItem('entre_mundos_oraculo_atual') || elMsg.textContent || "";
    if(!txt) return;
    const encoded = encodeURIComponent(txt);
    const url = 'https://wa.me/?text=' + encoded;
    // Em iOS Safari abrir numa nova tab pode ser bloqueado se for async; abrir direto
    window.location.href = url;
  }

  btnNova.addEventListener('click', novaMensagem);
  btnCopiar.addEventListener('click', copiar);
  btnWhats.addEventListener('click', partilharWhatsApp);

  // Boot
  carregarFrases().then(()=>{
    // não mostra nada até o utilizador tocar em "Nova mensagem"
  });
})();
