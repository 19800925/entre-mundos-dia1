/* Entre Mundos — Oráculo (autopath + baralho sem números)
   v2.1 — remove "Mensagem inspiradora N" fallback
*/
(function () {
  const el = (sel) => document.querySelector(sel);
  const $nova = el('#btnNova') || el('[data-nova]') || el('button#nova-mensagem');
  const $copiar = el('#btnCopiar') || el('[data-copiar]');
  const $whats = el('#btnWhats') || el('[data-whats]');
  const $out = el('#oracleMsg') || el('#oracleText') || el('[data-oraculo]') || el('[data-output]');

  // Guard: if we don't find an output element, bail quietly.
  if (!$out) return;

  // Build candidate URLs so it works both at domain root and subfolders (GitHub Pages).
  const base = window.location.pathname.replace(/\/[^/]*$/, '/');
  const candidates = [
    base + 'assets/messages.json',
    base + 'messages.json',
    '/assets/messages.json',
    'assets/messages.json',
    'messages.json',
    base + 'assets/oraculo.json',
  ];

  // Local fallback list (10 nice phrases; no numbers)
  const FALLBACK = [
    'Respira fundo. O caminho abre-se a cada passo.',
    'A tua verdade não precisa gritar para ser ouvida.',
    'Sê gentil contigo enquanto aprendes o novo.',
    'Hoje, escolhe a calma antes da pressa.',
    'O azul é porto seguro — volta a ele quando precisares.',
    'A tua presença é mais que suficiente.',
    'Honra o teu ritmo: ele sabe chegar.',
    'A vida fala em sinais; aprende a escutar.',
    'Aquilo que procuras, procura-te também.',
    'Quando voltares a ti, tudo volta ao lugar.'
  ];

  let deck = null;
  let allPhrases = null;

  function shuffle(arr) {
    // Fisher–Yates
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function nextFromDeck() {
    if (!deck || deck.length === 0) deck = shuffle(allPhrases);
    return deck.pop();
  }

  async function loadPhrases() {
    for (const url of candidates) {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) continue;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          allPhrases = data.filter(x => typeof x === 'string' && x.trim().length > 0);
          if (allPhrases.length > 0) return true;
        }
      } catch (e) {
        // try next url
      }
    }
    // Fallback
    allPhrases = FALLBACK;
    console.warn('[Oráculo] A carregar fallback local (não encontrou assets/messages.json).');
    return true;
  }

  function render(text) {
    $out.textContent = text;
  }

  async function init() {
    await loadPhrases();
    render('Toca em “Nova mensagem” para receber a tua mensagem.');
  }

  function handleNova() {
    const frase = nextFromDeck();
    render(frase);
  }

  async function handleCopiar() {
    try {
      await navigator.clipboard.writeText($out.textContent || '');
      if ($copiar) {
        const old = $copiar.textContent;
        $copiar.textContent = 'Copiado ✓';
        setTimeout(() => { $copiar.textContent = old; }, 1200);
      }
    } catch (_e) {}
  }

  function handleWhats() {
    const text = ($out.textContent || '').trim();
    const url = 'https://wa.me/?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
  }

  // Wire events if buttons exist
  if ($nova) $nova.addEventListener('click', handleNova);
  if ($copiar) $copiar.addEventListener('click', handleCopiar);
  if ($whats) $whats.addEventListener('click', handleWhats);

  // Boot
  init();
})();
