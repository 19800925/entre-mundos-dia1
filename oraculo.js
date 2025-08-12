
const msgEl = document.getElementById('message');
const openBtn = document.getElementById('open');
const copyBtn = document.getElementById('copy');
const waBtn = document.getElementById('shareWA');
const counter = document.getElementById('counter');

let frases = [];
let usados = new Set();

// Try to load external JSON if available, else fallback to a short list
async function loadFrases(){
  try{
    const r = await fetch('oraculo.json', {cache:'no-store'});
    if(r.ok){
      const data = await r.json();
      // Accept arrays of strings or objects {texto:"..."}
      frases = Array.isArray(data) ? data : (data.frases || []);
      frases = frases.map(f => (typeof f === 'string' ? f : (f.texto || '')))
                     .map(t => t.toString().replace(/\s*\(\d+\)\s*$/,'')) // remove trailing numbers like (94)
                     .filter(Boolean);
    }
  }catch(e){ /* ignore */ }
  if(frases.length === 0){
    frases = [
      'Confia no tempo divino, ele nunca se atrasa.',
      'A vida fala em sinais, aprende a escutar.',
      'Aquilo que procuras também te procura.',
      'O silêncio é a ponte para a tua verdade.'
    ];
  }
  shuffle(frases);
  updateCounter();
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
}

function novaMensagem(){
  if(usados.size === frases.length){
    usados.clear();
    shuffle(frases);
  }
  let idx;
  do{
    idx = Math.floor(Math.random()*frases.length);
  }while(usados.has(idx) && usados.size < frases.length);
  usados.add(idx);
  const texto = frases[idx];
  msgEl.textContent = texto;
  updateCounter();
  return texto;
}

function updateCounter(){
  counter.textContent = usados.size>0 ? `${usados.size} de ${frases.length}` : `0 de ${frases.length}`;
}

openBtn.addEventListener('click', novaMensagem);
copyBtn.addEventListener('click', ()=>{
  if(!msgEl.textContent.trim()) return;
  navigator.clipboard.writeText(msgEl.textContent.trim()).catch(()=>{});
  copyBtn.textContent = 'Copiado ✓';
  setTimeout(()=>copyBtn.textContent='Copiar', 1200);
});

waBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  const texto = msgEl.textContent.trim() || novaMensagem();
  const encoded = encodeURIComponent(texto + '\\n— Entre Mundos');
  // WhatsApp deep link (mobile)
  const href = `https://wa.me/?text=${encoded}`;
  window.location.href = href;
});

loadFrases();
