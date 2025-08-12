// Carrega e baralha frases; remove números finais como (94)
let frases = [];
let cursor = 0;

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function cleanTail(s){
  return s.replace(/\s*\(\d+\)\s*$/,'').trim();
}

async function init(){
  const res = await fetch('oraculo.json');
  const data = await res.json();
  frases = shuffle(data.map(cleanTail));
  cursor = 0;
  updateCount();
}

function updateCount(){
  const el = document.getElementById('countInfo');
  el.textContent = `${cursor} de ${frases.length}`;
}

function render(){
  document.getElementById('msg').textContent = frases[cursor] || '—';
  updateCount();
}

document.getElementById('newMsg').addEventListener('click', ()=>{
  if(!frases.length) return;
  cursor = (cursor + 1) % frases.length;
  render();
});

document.getElementById('copyMsg').addEventListener('click', ()=>{
  const t = document.getElementById('msg').textContent;
  navigator.clipboard?.writeText(t);
});

document.getElementById('sendWA').addEventListener('click', ()=>{
  const t = document.getElementById('msg').textContent;
  const url = `https://wa.me/?text=${encodeURIComponent(t)}`;
  window.location.href = url;
});

init().then(()=>{
  // mostra a primeira imediatamente
  render();
});
