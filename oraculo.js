const mensagens = [
  "A tua alma já sabe o caminho. Só precisas de confiar.",
  "Nem tudo precisa de resposta hoje. Às vezes, sentir é suficiente.",
  "O silêncio também fala. E hoje… ele tem algo para te dizer.",
  "O que procuras fora… já está dentro de ti.",
  "Confia no que sentes, mesmo que não consigas explicar.",
  "Há algo a alinhar-se na tua vida… mesmo que ainda não vejas.",
  "Nem tudo o que se afasta é perda. Às vezes é libertação.",
  "O teu tempo não está atrasado. Está a acontecer exatamente como precisa.",
  "A tua energia muda mais do que imaginas.",
  "Respira. Estás exatamente onde precisas estar.",
  "Não forces o que já está a fluir dentro de ti.",
  "O que é verdadeiro… permanece.",
  "Há uma versão tua a nascer neste momento.",
  "Nem tudo precisa de ser resolvido agora.",
  "Confia no processo, mesmo no caos.",
  "O que te inquieta… está a tentar mostrar-te algo.",
  "A tua sensibilidade é força, não fraqueza.",
  "Há respostas que só chegam quando paras.",
  "Nem todos vão entender o teu caminho. E está tudo bem.",
  "Tu não estás perdido. Estás a transformar-te."
];

const el = document.getElementById("oracleMsg");
const btnNova = document.getElementById("btnNova");
const btnCopiar = document.getElementById("btnCopiar");
const btnWhats = document.getElementById("btnWhats");

function novaMensagem() {
  const i = Math.floor(Math.random() * mensagens.length);
  const msg = mensagens[i];

  if (el) el.textContent = msg;
}

btnNova?.addEventListener("click", novaMensagem);

btnCopiar?.addEventListener("click", () => {
  const texto = el?.textContent || "";
  navigator.clipboard.writeText(texto);
});

btnWhats?.addEventListener("click", () => {
  const texto = encodeURIComponent(el?.textContent || "");
  window.open(`https://wa.me/?text=${texto}`, "_blank");
});
