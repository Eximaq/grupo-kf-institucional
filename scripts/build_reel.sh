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
MEDIA_DIR="public/assets/video-sources"
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
if [[ "$REAL_FOOTAGE" == "false" ]]; then
"$FFMPEG_BIN" -hide_banner -loglevel error -y \
  -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/horizonte.webp" \
  -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/air.webp" \
  -loop 1 -framerate 25 -t 4.5 -i "$SOURCE_DIR/agro.webp" \
  -filter_complex "[0:v]scale=1360:765:force_original_aspect_ratio=increase,crop=1360:765,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,setpts=PTS-STARTPTS,fps=25,settb=AVTB,format=yuv420p[v0];[1:v]scale=1360:765:force_original_aspect_ratio=increase,crop=1360:765,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,setpts=PTS-STARTPTS,fps=25,settb=AVTB,format=yuv420p[v1];[2:v]scale=1360:765:force_original_aspect_ratio=increase,crop=1360:765,zoompan=z='min(zoom+0.0008,1.12)':d=1:s=1280x720:fps=25,trim=duration=4.5,setpts=PTS-STARTPTS,fps=25,settb=AVTB,format=yuv420p[v2];[v0][v1]xfade=transition=fade:duration=0.6:offset=3.9[w];[w][v2]xfade=transition=fade:duration=0.6:offset=7.8[out]" \
  -map '[out]' -an -c:v libx264 -preset veryfast -crf 27 \
  -pix_fmt yuv420p -movflags +faststart -t 12.3 "$OUTPUT"
fi
printf '{"realFootage":%s,"duration":12.3,"sceneStarts":[0,3.9,7.8]}\n' "$REAL_FOOTAGE" > "$OUTPUT_DIR/reel-manifest.json"
echo "Reel assembled at $OUTPUT (licensed aerial sources present: $REAL_FOOTAGE)"
