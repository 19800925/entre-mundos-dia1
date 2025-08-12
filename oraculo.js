
const mensagens = [
    "Segue o brilho que só tu vês. Hoje é o dia.",
    "A tua luz é necessária no mundo.",
    "O silêncio traz respostas."
];

function novaMensagem() {
    const idx = Math.floor(Math.random() * mensagens.length);
    document.getElementById("oraculo-texto").textContent = mensagens[idx];
    document.getElementById("whatsapp-share").href =
        "https://wa.me/?text=" + encodeURIComponent(mensagens[idx]);
}

function copiarMensagem() {
    const texto = document.getElementById("oraculo-texto").textContent;
    navigator.clipboard.writeText(texto);
    alert("Mensagem copiada!");
}
