const mensagens = [
  "A tua alma já sabe o caminho.",
  "Nem tudo precisa de resposta hoje.",
  "O silêncio também é uma resposta.",
  "O que procuras… já está dentro de ti.",
  "Confia no que sentes, mesmo que não entendas.",
  "Há algo a alinhar-se… mesmo que não vejas.",
  "A tua energia muda tudo à tua volta.",
  "Não forces. Flui.",
  "O que é teu… encontra-te sempre.",
  "Respira. Estás exatamente onde precisas estar."
];

function gerarMensagem() {
  const random = Math.floor(Math.random() * mensagens.length);
  return mensagens[random];
}
