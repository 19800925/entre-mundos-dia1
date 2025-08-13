/*! Oráculo simples */
(() => {
  const elText = document.querySelector('#oracleMsg');
  const btnNova = document.querySelector('#btnNova');
  const btnCopiar = document.querySelector('#btnCopiar');
  const btnWhats = document.querySelector('#btnWhats');

  if (!elText) return;

  const frases = [
    "Tu és a casa antes do mundo.",
    "O azul lembra-te: tudo volta ao lugar.",
    "O que é teu por verdade não faz barulho.",
    "O silêncio também responde.",
    "Há um porto seguro dentro de ti."
  ];

  function novaFrase(){
    const frase = frases[Math.floor(Math.random()*frases.length)];
    elText.textContent = frase;
  }

  function copiar(){
    const t = (elText.textContent||"").trim();
    if (!t) return;
    navigator.clipboard?.writeText(t).catch(()=>{});
  }

  function whats(){
    const t = encodeURIComponent((elText.textContent||"").trim());
    if (!t) return;
    location.href = 'https://wa.me/?text=' + t;
  }

  btnNova && btnNova.addEventListener('click', novaFrase);
  btnCopiar && btnCopiar.addEventListener('click', copiar);
  btnWhats && btnWhats.addEventListener('click', whats);

})();