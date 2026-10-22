#!/usr/bin/env bash
set -euo pipefail

# Materialize the client-selected Pexels photo for deployment.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PHOTO="$ROOT/public/assets/photos/kf-agro-capa.jpg"
mkdir -p "$(dirname "$PHOTO")"
if [[ -s "$PHOTO" ]]; then
  echo "Using provided KF Agro cover"
  exit 0
fi

curl --fail --location --silent --show-error --retry 3 --retry-delay 2 --max-time 60 \
  'https://images.pexels.com/photos/13077530/pexels-photo-13077530.jpeg?auto=compress&cs=tinysrgb&w=1920' \
  --output "$PHOTO"

[ "$(wc -c < "$PHOTO")" -gt 30000 ] || { echo "Invalid KF Agro photo" >&2; exit 1; }
echo "KF Agro photo ready: $(wc -c < "$PHOTO") bytes"
