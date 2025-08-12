document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");
  const content = document.getElementById("content");
  
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      content.innerHTML = `<h2>${chip.textContent}</h2><p>Conteúdo de ${chip.textContent}</p>`;
    });
  });
});
