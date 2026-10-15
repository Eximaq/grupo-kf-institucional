#!/usr/bin/env bash
set -euo pipefail
SOURCE_DIR="public/assets/photos"
OUTPUT_DIR="public/assets/videos"
OUTPUT="$OUTPUT_DIR/grupo-kf-reel.mp4"
FFMPEG_BIN="${FFMPEG_BIN:-ffmpeg}"
if ! command -v "$FFMPEG_BIN" >/dev/null 2>&1; then
  echo "FFmpeg is required to assemble the local institutional reel." >&2
  exit 1
fi
mkdir -p "$OUTPUT_DIR"
# Use actual licensed aerial footage when the three source files are present.
# In the absence of real footage, preserve the existing photographic reel and
# label it accurately as an illustrative presentation.
# Download originals from the public video provider when source files are not yet committed.
# The exact asset IDs match user-supplied footage; fail safely to the existing reel on blocked requests.
MEDIA_DIR="public/assets/video-sources"
mkdir -p "$MEDIA_DIR"
fetch_scene() {
  local name="$1" id="$2" variant="$3"
  local dest="$MEDIA_DIR/$name.mp4"
  if [[ -s "$dest" ]]; then return; fi
  local url="https://videos.pexels.com/video-files/$id/$id-$variant.mp4"
  echo "Checking licensed video: $id"
  if ! curl --fail --location --retry 2 --connect-timeout 10 --max-time 120 --silent --show-error "$url" -o "$dest.partial"; then
    rm -f "$dest.partial"
    echo "Video $id could not be retrieved: keeping existing fallback"
    return
  fi
  if [[ $(stat -c%s "$dest.partial") -lt 100000 ]]; then rm -f "$dest.partial"; return; fi
  mv "$dest.partial" "$dest"
}
fetch_scene maceio 13867959 uhd_3840_2160_24fps
fetch_scene santa-catarina 14219178 uhd_3840_2160_60fps
fetch_scene rio-grande-do-sul 13678764 hd_1920_1080_60fps
MACEIO="$MEDIA_DIR/maceio.mp4"
SANTA="$MEDIA_DIR/santa-catarina.mp4"
SUL="$MEDIA_DIR/rio-grande-do-sul.mp4"
REAL_FOOTAGE=false
if [[ -s "$MACEIO" && -s "$SANTA" && -s "$SUL" ]]; then
  REAL_FOOTAGE=true
  "$FFMPEG_BIN" -hide_banner -loglevel error -y \
    -ss 0 -t 4.5 -i "$MACEIO" \
    -ss 0 -t 4.5 -i "$SANTA" \
    -ss 0 -t 4.5 -i "$SUL" \
    -filter_complex "[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=25,format=yuv420p,setsar=1,trim=duration=4.5,setpts=PTS-STARTPTS[v0];[1:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=25,format=yuv420p,setsar=1,trim=duration=4.5,setpts=PTS-STARTPTS[v1];[2:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=25,format=yuv420p,setsar=1,trim=duration=4.5,setpts=PTS-STARTPTS[v2];[v0][v1]xfade=transition=fade:duration=0.6:offset=3.9[m];[m][v2]xfade=transition=fade:duration=0.6:offset=7.8[out]" \
    -map '[out]' -an -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p \
    -movflags +faststart -t 12.3 "$OUTPUT"
fi
if [[ "$REAL_FOOTAGE" == "false" && -s "$MACEIO" ]]; then
  # Maceió drone footage followed by clearly labelled illustrative segment stills.
  "$FFMPEG_BIN" -hide_banner -loglevel error -y \
    -ss 1 -t 4.5 -i "$MACEIO" \
    -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/air.webp" \
    -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/agro.webp" \
    -filter_complex "[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=25,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS[v0];[1:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS[v1];[2:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS[v2];[v0][v1]xfade=transition=fade:duration=0.6:offset=3.9[w];[w][v2]xfade=transition=fade:duration=0.6:offset=7.8[out]" \
    -map '[out]' -an -c:v libx264 -preset veryfast -crf 27 \
    -pix_fmt yuv420p -movflags +faststart -t 12.3 "$OUTPUT"
elif [[ "$REAL_FOOTAGE" == "false" ]]; then
"$FFMPEG_BIN" -hide_banner -loglevel error -y \
  -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/horizonte.webp" \
  -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/air.webp" \
  -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/agro.webp" \
  -filter_complex "[0:v]scale=1360:765:force_original_aspect_ratio=increase,crop=1360:765,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,setpts=PTS-STARTPTS,fps=25,settb=AVTB,format=yuv420p[v0];[1:v]scale=1360:765:force_original_aspect_ratio=increase,crop=1360:765,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,setpts=PTS-STARTPTS,fps=25,settb=AVTB,format=yuv420p[v1];[2:v]scale=1360:765:force_original_aspect_ratio=increase,crop=1360:765,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,setpts=PTS-STARTPTS,fps=25,settb=AVTB,format=yuv420p[v2];[v0][v1]xfade=transition=fade:duration=0.6:offset=3.9[w];[w][v2]xfade=transition=fade:duration=0.6:offset=7.8[out]" \
  -map '[out]' -an -c:v libx264 -preset veryfast -crf 27 \
  -pix_fmt yuv420p -movflags +faststart -t 12.3 "$OUTPUT"
fi
MACEIO_REAL=false
if [[ -s "$MACEIO" ]]; then MACEIO_REAL=true; fi
printf '{"realFootage":%s,"maceioReal":%s,"duration":12.3,"sceneStarts":[0,3.9,7.8]}\n' "$REAL_FOOTAGE" "$MACEIO_REAL" > "$OUTPUT_DIR/reel-manifest.json"
echo "Reel assembled at $OUTPUT (licensed aerial sources present: $REAL_FOOTAGE)"
