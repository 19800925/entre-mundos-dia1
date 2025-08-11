
// Função para partilhar mensagem do Oráculo no WhatsApp
function shareOnWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encodedMessage}`;
    window.open(url, '_blank');
}

// Atualizar botão para ter ícone e letras brancas
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("share-whatsapp");
    if (btn) {
        btn.style.color = "#fff";
        btn.style.backgroundColor = "#25D366";
        btn.innerHTML = '<i class="fab fa-whatsapp" style="color:white; margin-right:6px;"></i> Partilhar no WhatsApp';
    }
});
