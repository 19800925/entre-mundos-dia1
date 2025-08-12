
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-button");
    const sections = document.querySelectorAll(".tab-section");

    function activateTab(tabName) {
        // Remover a classe 'active' de todas as abas
        tabs.forEach(tab => tab.classList.remove("active"));
        // Esconder todas as secções
        sections.forEach(section => section.style.display = "none");

        // Ativar a aba clicada
        const activeTab = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add("active");
        }

        // Mostrar a secção correspondente
        const activeSection = document.querySelector(`.tab-section[data-section="${tabName}"]`);
        if (activeSection) {
            activeSection.style.display = "block";
        }
    }

    // Adicionar evento de clique para cada aba
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const tabName = this.getAttribute("data-tab");
            activateTab(tabName);
        });
    });

    // Ativar a primeira aba por padrão
    if (tabs.length > 0) {
        const firstTabName = tabs[0].getAttribute("data-tab");
        activateTab(firstTabName);
    }
});
