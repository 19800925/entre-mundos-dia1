// Alternar abas
document.querySelectorAll('.chip[data-tab]').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
    document.getElementById(chip.dataset.tab).style.display = 'block';
    if (chip.dataset.tab !== 'cardOraculo') {
      document.getElementById('cardOraculo').style.display = 'block';
    }
  });
});