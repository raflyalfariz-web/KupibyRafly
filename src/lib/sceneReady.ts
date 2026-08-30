/**
 * Tiny pub/sub so the Preloader can wait for the 3D scene's first painted
 * frame without either component importing the other's tree.
 */
type Listener = () => void;

let painted = false;
const listeners = new Set<Listener>();

export function markSceneReady(): void {
  if (painted) return;
  painted = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Fires immediately if the scene already painted. Returns an unsubscribe. */
export function onSceneReady(fn: Listener): () => void {
  if (painted) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
