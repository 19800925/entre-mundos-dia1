#!/usr/bin/env bash
set -e
ARCH="_archive"
[ -d "$ARCH" ] || { echo "Nada para repor. ($ARCH não existe)"; exit 0; }

# percorre todos os ficheiros em _archive e move de volta
find "$ARCH" -type f | while read -r f; do
  rel="${f#"$ARCH/"}"
  echo "Repor $rel"
  mkdir -p "$(dirname "$rel")"
  git mv -k "$f" "$rel" 2>/dev/null || mv "$f" "$rel"
done

echo "Reposição concluída. Podes apagar a pasta $ARCH se quiseres."
