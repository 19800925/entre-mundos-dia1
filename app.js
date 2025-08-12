
const elMsg = document.getElementById('mensagemHoje');
const btnNova = document.getElementById('btnNovaMensagem');
const btnCopiar = document.getElementById('btnCopiar');
const btnWhats = document.getElementById('btnWhats');

const FRASES = [
  "Segue o brilho que só tu vês. Hoje é o dia.",
  "A tua luz guia-te no silêncio.",
  "Confia no tempo divino, ele nunca se atrasa.",
  "A vida fala em sinais; aprende a escutar.",
  "Volta ao azul quando o ruído te cansar."
];

function fraseAleatoria(){
  const i = Math.floor(Math.random() * FRASES.length);
  return FRASES[i];
}

btnNova?.addEventListener('click', () => {
  elMsg.textContent = fraseAleatoria();
  atualizaWhats();
});

btnCopiar?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(elMsg.textContent.trim());
    btnCopiar.textContent = "Copiado!";
    setTimeout(() => btnCopiar.textContent = "Copiar", 1200);
  } catch(e) {
    alert("Não foi possível copiar.");
  }
});

function atualizaWhats(){
  const txt = elMsg.textContent.trim() + " — Entre Mundos";
  const url = "https://wa.me/?text=" + encodeURIComponent(txt);
  btnWhats.setAttribute('href', url);
}

atualizaWhats();
