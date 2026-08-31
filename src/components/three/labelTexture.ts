import * as THREE from "three";

/** Sampled from the printed label stock. */
const CREAM = "#faf0dc";
const INK = "#4a2c14";

/**
 * The printed label artwork, as supplied.
 *
 * It is a front-only sticker, not a wrap, so this texture is just the label
 * itself — mapped 1:1 onto a partial cylinder covering the front arc of the
 * bottle. Nothing is drawn for the sides or the back; there is no label there.
 */
const ARTWORK_SRC = "/brand/kupi-label.jpg";

/** Source artwork is 709 × 1063. The mesh is sized from this. */
export const LABEL_ASPECT = 709 / 1063;

const WIDTH = 709;
const HEIGHT = 1063;

/**
 * Builds the label texture.
 *
 * The image load is async, so the canvas is first painted with a
 * drawn-from-scratch version of the same layout — the bottle is never blank,
 * and it still reads correctly if the image never arrives.
 */
export function createLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;

  paintFallback(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  const image = new Image();
  image.decoding = "async";
  image.src = ARTWORK_SRC;
  image
    .decode()
    .then(() => {
      ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
      texture.needsUpdate = true;
    })
    .catch(() => {
      // Keep the drawn fallback already on the canvas.
    });

  return texture;
}

/**
 * The same layout drawn with primitives — roofline, wordmark, signature, rule,
 * product line and the production-date field. Deliberately no QR-shaped block
 * where the code sits: something that looks scannable but is not would be
 * worse than an honest gap, and this only ever shows if the artwork fails.
 */
function paintFallback(ctx: CanvasRenderingContext2D): void {
  const cx = WIDTH / 2;

  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Roofline mark
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.moveTo(cx, 34);
  ctx.lineTo(cx + 240, 218);
  ctx.lineTo(cx + 240, 282);
  ctx.lineTo(cx, 98);
  ctx.lineTo(cx - 240, 282);
  ctx.lineTo(cx - 240, 218);
  ctx.closePath();
  ctx.fill();

  ctx.textAlign = "center";
  ctx.font = "600 132px Georgia, 'Times New Roman', serif";
  ctx.fillText("KUPI", cx, 330);

  ctx.font = "italic 60px Georgia, 'Times New Roman', serif";
  ctx.fillText("by Rafly", cx + 78, 440);

  ctx.strokeStyle = INK;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx - 210, 492);
  ctx.lineTo(cx + 210, 492);
  ctx.stroke();

  ctx.font = "500 54px Georgia, 'Times New Roman', serif";
  ctx.fillText("Kupi Susu Gula Aren", cx, 562);

  ctx.font = "500 44px Georgia, 'Times New Roman', serif";
  ctx.fillText("Production Date:", cx, 910);
  ctx.font = "500 48px Georgia, 'Times New Roman', serif";
  ctx.fillText("__ / __ / ____", cx, 985);
}
