/* Oráculo inline — comportamento */
(function(){
  // CONFIG: caminho do JSON com as frases
  const JSON_URL = 'oraculo.json';

  // cria cartão dentro do placeholder #oraculo-inline
  const mount = document.getElementById('oraculo-inline');
  if(!mount) return;

  mount.innerHTML = `
    <section class="oraculo-card" role="region" aria-label="Oráculo — Entre Mundos">
      <h3 class="oraculo-title">Oráculo — Entre Mundos</h3>
      <div id="oraculoMsg" class="oraculo-msg">Toca em "Nova mensagem" e recebe a tua mensagem.</div>
      <div class="oraculo-actions">
        <button id="btnOraculoNew">Nova mensagem</button>
        <button id="btnOraculoCopy">Copiar</button>
        <button id="btnOraculoWA"><span class="wa"></span> Partilhar no WhatsApp</button>
      </div>
      <div class="oraculo-tip">Dica: se o WhatsApp não abrir, a mensagem já está copiada — é só colar.</div>
    </section>
  `;

  const elMsg = document.getElementById('oraculoMsg');
  const btnNew = document.getElementById('btnOraculoNew');
  const btnCopy = document.getElementById('btnOraculoCopy');
  const btnWA   = document.getElementById('btnOraculoWA');

  let frases = [];
  let lastIndex = -1;

  function limparNumero(f){
    // remove sufixos numéricos como " (94)" ou "94."
    return f.replace(/\s*\(?\d+\)?\.?\s*$/,'').trim();
  }

  function aleatoria(){
    if(!frases.length) return '';
    let i = Math.floor(Math.random() * frases.length);
    if(i === lastIndex){ i = (i + 1) % frases.length; }
    lastIndex = i;
    return limparNumero(frases[i]);
  }

  function atualizar(){
    const txt = aleatoria() || 'Respira…';
    elMsg.textContent = txt;
    return txt;
  }

  function copiar(txt){
    try{
      navigator.clipboard.writeText(txt);
    }catch(e){ /* no-op */ }
  }

  // eventos
  btnNew.addEventListener('click', ()=>{
    const txt = atualizar();
    copiar(txt); // já deixa copiado
  });

  btnCopy.addEventListener('click', ()=>{
    copiar(elMsg.textContent.trim());
  });

  btnWA.addEventListener('click', ()=>{
    const txt = elMsg.textContent.trim();
    const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(txt);
    try{
      window.location.href = url;
    }catch(e){
      window.open(url,'_blank');
    }
  });

  // carrega frases
  fetch(JSON_URL, {cache:'no-store'})
    .then(r => r.json())
    .then(data => {
      frases = Array.isArray(data) ? data : (data.frases || []);
      frases = frases.map(limparNumero).filter(Boolean);
      atualizar();
    })
    .catch(()=>{
      frases = ['Confia no tempo divino, ele nunca se atrasa.',
                'A tua luz guia-te no silêncio.',
                'Segue o brilho que só tu vês. Hoje é o dia.'];
      atualizar();
    });
})();