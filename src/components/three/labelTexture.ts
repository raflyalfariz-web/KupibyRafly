import * as THREE from "three";

/** Sampled from the real label artwork. */
const CREAM = "#fff7dc";
const INK = "#2a1608";

/** Wrap texture proportions, matching the label's height on the bottle. */
const WIDTH = 1240;
const HEIGHT = 1000;

/**
 * The brand's own label artwork — the same file that is printed on the bottle,
 * cropped to its content and re-encoded to WebP (596 KB PNG → 37 KB).
 */
const ARTWORK_SRC = "/brand/kupi-label.webp";
const ARTWORK_ASPECT = 622 / 1140;

/** Artwork covers most of the label height; the rest is cream margin. */
const ARTWORK_HEIGHT_FRACTION = 0.88;

/**
 * Builds the wrap-around bottle label.
 *
 * The real label artwork is composited onto the front of the wrap so the mark,
 * wordmark and the genuine QR code are exactly the ones printed on the bottle.
 * Because that is an async image load, the canvas is first painted with a
 * drawn-from-scratch version of the same layout — so the bottle is never blank,
 * and it still looks right if the image never arrives.
 *
 * Artwork is centred at u = 0.5; the label mesh is rotated a half turn so that
 * point faces the camera and the texture seam hides at the back.
 */
export function createLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;

  paintBase(ctx);
  paintFallbackArtwork(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  // Swap in the real artwork as soon as it decodes.
  const image = new Image();
  image.decoding = "async";
  image.src = ARTWORK_SRC;
  image
    .decode()
    .then(() => {
      paintBase(ctx);
      paintArtwork(ctx, image);
      texture.needsUpdate = true;
    })
    .catch(() => {
      // Keep the drawn fallback already on the canvas.
    });

  return texture;
}

/** Cream stock, faint print speckle, and the small print around the back. */
function paintBase(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "rgba(36,26,18,0.045)";
  for (let i = 0; i < 1100; i += 1) {
    ctx.fillRect(Math.random() * WIDTH, Math.random() * HEIGHT, 1, 1);
  }

  // Back of the bottle: recipe and storage notes, well clear of the artwork.
  ctx.fillStyle = "rgba(36,26,18,0.45)";
  ctx.textAlign = "center";
  ctx.font = "400 21px Helvetica, Arial, sans-serif";
  ctx.fillText("85% SUSU", 118, 452);
  ctx.fillText("10% ESPRESSO", 118, 484);
  ctx.fillText("5% GULA AREN", 118, 516);
  ctx.fillText("SIMPAN DINGIN", WIDTH - 118, 468);
  ctx.fillText("HABISKAN 2 HARI", WIDTH - 118, 500);
}

/** Draws the real label art centred on the front face of the wrap. */
function paintArtwork(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
): void {
  const drawH = HEIGHT * ARTWORK_HEIGHT_FRACTION;
  const drawW = drawH * ARTWORK_ASPECT;
  ctx.drawImage(image, (WIDTH - drawW) / 2, (HEIGHT - drawH) / 2, drawW, drawH);
}

/**
 * The same layout drawn with primitives — roofline, wordmark, signature, rule,
 * and a placeholder block where the QR sits. Deliberately not a QR-shaped
 * pattern: a fake code that cannot be scanned would be worse than an honest
 * blank, and this only ever shows if the artwork fails to load.
 */
function paintFallbackArtwork(ctx: CanvasRenderingContext2D): void {
  const cx = WIDTH / 2;
  const drawH = HEIGHT * ARTWORK_HEIGHT_FRACTION;
  const top = (HEIGHT - drawH) / 2;
  const half = 170;

  // Roofline mark
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.moveTo(cx, top + 20);
  ctx.lineTo(cx + half, top + 150);
  ctx.lineTo(cx + half, top + 196);
  ctx.lineTo(cx, top + 66);
  ctx.lineTo(cx - half, top + 196);
  ctx.lineTo(cx - half, top + 150);
  ctx.closePath();
  ctx.fill();

  ctx.textAlign = "center";
  ctx.font = "600 104px Georgia, 'Times New Roman', serif";
  drawTracked(ctx, "KUPI", cx, top + 316, 14);

  ctx.font = "italic 46px Georgia, 'Times New Roman', serif";
  ctx.fillText("by Rafly", cx + 52, top + 386);

  ctx.strokeStyle = "rgba(36,26,18,0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - half, top + 440);
  ctx.lineTo(cx + half, top + 440);
  ctx.stroke();

  ctx.font = "500 24px Helvetica, Arial, sans-serif";
  ctx.fillStyle = "rgba(36,26,18,0.55)";
  drawTracked(ctx, "ES KUPI GULA AREN", cx, top + 700, 5);
  drawTracked(ctx, "250 ML  ·  TANGERANG", cx, top + 738, 4);
}

/** Canvas 2D letter-spacing is not universally supported; space glyphs by hand. */
function drawTracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  tracking: number,
): void {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total =
    widths.reduce((sum, w) => sum + w, 0) + tracking * (chars.length - 1);
  let x = centerX - total / 2;
  const previousAlign = ctx.textAlign;
  ctx.textAlign = "left";
  chars.forEach((char, i) => {
    ctx.fillText(char, x, y);
    x += widths[i] + tracking;
  });
  ctx.textAlign = previousAlign;
}
