#!/usr/bin/env bash
set -e
ARCH="_archive"
mkdir -p "$ARCH"

move() {
  for p in "$@"; do
    for f in $p; do
      [ -e "$f" ] || continue
      # Não mover os que devem ficar
      case "$f" in
        index.html|app.js|tabs-hotfix.js|oraculo.js|respiracao.js|respiracao.css|silencio.js|silencio.css|app.css|style.css|styles.css|manifest.json|sw.js|assets|assets/*|_archive|_archive/*)
          echo "Manter: $f"
          ;;
        *)
          echo "Mover -> $ARCH/$f"
          mkdir -p "$ARCH/$(dirname "$f")"
          git mv -k "$f" "$ARCH/$f" 2>/dev/null || mv "$f" "$ARCH/$f"
          ;;
      esac
    done
  done
}

# HTMLs antigos / testes
move "index-*.html" "oraculo-*.html" "debug*.html" "*teste*.html" "test*.html" "*oraculo*inline*.html" "*silencio*.html" "*_exemplo*.html"

# JS duplicados de abas e oráculo antigos
move "tabs.js" "tabs-fix*.js" "tabs-hotfix*.js" "tabs-*.js" "share-oraculo*.js" "oraculo-*.js" "oraculo_home*.js" "oraculoInline*.js" "messages*.js"

# CSS redundante
move "oraculo*.css" "styles-snippet.css" "*inline*.css" "old*.css"

# Dados/JSON antigos
move "oraculo.json" "messages.json" "*.json"

# Patches/snippets
move "patch_respiracao.html" "*patch*.html" "*patch*.js" "*patch*.css"

# Qualquer ficheiro solto não listado explicitamente como 'ficar'
# (ajusta esta linha se necessário)
# move "*.md" "*.txt"

echo "Done. Revê a pasta $ARCH e faz commit."
