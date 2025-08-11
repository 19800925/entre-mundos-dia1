
function shareOraculoMessage(message) {
    if (navigator.share) {
        navigator.share({
            title: 'Mensagem do Oráculo',
            text: message,
        })
        .then(() => console.log('Mensagem partilhada com sucesso!'))
        .catch((error) => console.error('Erro ao partilhar:', error));
    } else {
        // Fallback: abrir diretamente o WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}
