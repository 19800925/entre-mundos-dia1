
/*! Oráculo — drop‑in, sem mexer no layout. 
   - Procura elementos existentes (texto e botões).
   - Se existir /assets/messages.json (array de strings), usa-o.
   - Caso contrário, gera 1000 frases localmente.
   - Sem números, aleatório, sem repetir consecutivamente.
*/
(function () {
  function onReady(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  onReady(function(){
    // ---------- Seletores (sem impor markup novo) ----------
    var $ = function (s) { return document.querySelector(s); };

    var elText = $('#oracleMsg') || $('#oracleText') || $('#oracle_text') || $('#oracle-msg') || $('[data-oraculo-text]') || $('.oracle-text');
    var btnNova = $('#btnNova') || $('#btnNovaMensagem') || $('#oracle-new') || $('[data-oraculo-new]') || $('.oracle-new');
    var btnCopiar = $('#btnCopiar') || $('#oracle-copy') || $('[data-oraculo-copy]') || $('.oracle-copy');
    var btnWhats = $('#btnWhats') || $('#oracle-wa') || $('[data-oraculo-wa]') || $('.oracle-wa');

    if (!elText) {
      console.warn('[Oráculo] Elemento de texto não encontrado (#oracleMsg/oracleText/etc). Patch inofensivo — a UI mantém-se.');
      return;
    }

    // ---------- Deck de mensagens ----------
    var INTROS = ["Respira e","Fecha os olhos e","Sente o corpo e","Pousa o peso e","Abaixa os ombros e","Repara no coração e","Lembra-te de quem és e","Volta a ti e","Entrega o controlo e","Confia no caminho e","Acolhe o silêncio e","Abraça a pausa e","Aceita o agora e","Sorri por dentro e","Escuta com calma e","Honra a tua verdade e","Agradece o que tens e","Sê gentil contigo e","Solta o que pesa e","Descansa por um momento e"];
    var VERBS  = ["permite que a paz te encontre","deixa que a respiração te guie","escuta o que não precisa de palavras","recorda a tua própria luz","abre espaço para o simples","acolhe o que é sem resistência","confia no tempo do coração","sente o chão que te sustenta","reconhece o que já é suficiente","permite que o corpo te conte a verdade","abraça o começo que se insinua","permite que a mente descanse","volta ao porto azul dentro de ti","permite que o amor te atravesse","ouve o sussurro da alma","descobre o que fica quando tudo cala","deixa o mar dentro de ti acalmar","encosta a cabeça no céu por um segundo","permite que o coração responda","fica com o que é vivo em ti"];
    var ENDS   = ["agora.","com suavidade.","sem pressa.","em silêncio.","com gratidão.","a partir do peito.","como quem regressa a casa.","com presença.","sem te cobrar nada.","como quem confia.","na luz do teu próprio ritmo.","com ternura.","de olhos abertos para dentro.","de mãos dadas contigo.","com humildade.","a partir do que sentes.","no tempo certo.","até te encontrares.","com coragem mansa.","com verdade."];
    var SINGLES= ["Tu és a casa antes do mundo.","O azul lembra-te: tudo volta ao lugar.","O que é teu por verdade não faz barulho.","O silêncio também responde.","Há um porto seguro dentro de ti.","Hoje escolhe a gentileza contigo.","A respiração abre portas que a mente não vê.","Onde pões a atenção, pões a vida.","Tudo o que procuras pede-te presença.","A alma sussurra quando o ruído descansa.","Aceitar também é movimento.","A pausa é sagrada.","És suficiente tal como és.","Volta, quantas vezes for preciso.","O amor sabe o caminho.","Confia no passo pequeno e verdadeiro.","A tua voz interior é clara quando escutas.","Respirar é regressar.","Luz não grita; ilumina.","O coração entende o simples."];

    function gerarFrases(n){
      var set = new Set(SINGLES);
      outer: for (var i=0;i<INTROS.length;i++){
        for (var j=0;j<VERBS.length;j++){
          for (var k=0;k<ENDS.length;k++){
            set.add(INTROS[i]+' '+VERBS[j]+' '+ENDS[k]);
            if (set.size >= n) break outer;
          }
        }
      }
      return Array.from(set).slice(0,n);
    }

    function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=(Math.random()*(i+1))|0; var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }

    var DECK = [];
    var idx = 0, last = '';

    function usarDeck(arr){
      if (!Array.isArray(arr) || !arr.length){ arr = gerarFrases(1000); }
      DECK = shuffle(arr.slice());  // cópia + embaralhar
      idx = 0; last='';
    }

    function novaFrase(){
      if (!DECK.length) usarDeck(null);
      if (idx >= DECK.length){ shuffle(DECK); idx = 0; }
      var f = DECK[idx++];
      if (f === last && idx < DECK.length) f = DECK[idx++];
      last = f;
      elText.textContent = f;
    }

    function copiar(){
      var t = (elText.textContent||'').trim();
      if (!t) return;
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(t).catch(function(){});
      } else {
        var ta = document.createElement('textarea');
        ta.value = t; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); }catch(e){}
        document.body.removeChild(ta);
      }
    }

    function whats(){
      var t = encodeURIComponent((elText.textContent||'').trim());
      if (!t) return;
      location.href = 'https://wa.me/?text='+t;
    }

    // Tenta carregar /assets/messages.json (se existir)
    fetch('/assets/messages.json', {cache:'no-store'})
      .then(function(r){ return r.ok ? r.json() : []; })
      .catch(function(){ return []; })
      .then(function(arr){ usarDeck(arr); });

    // Mensagem de arranque se vazio
    if (!elText.textContent || /Nova mensagem/i.test(elText.textContent)){
      elText.textContent = 'Toca em “Nova mensagem” para receber a tua mensagem.';
    }

    // Eventos (só liga se o botão existir)
    btnNova   && btnNova  .addEventListener('click', novaFrase);
    btnCopiar && btnCopiar.addEventListener('click', copiar);
    btnWhats  && btnWhats .addEventListener('click', whats);
  });
})();
