const key = 'entreMundos.mockExact.active';
const screens = document.querySelectorAll('.screen');
const buttons = document.querySelectorAll('.nav-taps button');

function showScreen(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  localStorage.setItem(key, id);
}
buttons.forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.tab));
});

showScreen(localStorage.getItem(key) || 'mensagem');
