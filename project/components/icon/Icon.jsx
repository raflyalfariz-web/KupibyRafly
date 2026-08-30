import React from "react";

/* Lucide-backed icon. The page must load Lucide from CDN:
   <script src="https://unpkg.com/lucide@0.453.0/dist/umd/lucide.min.js"></script>
   KUPI has no icon set of its own — Lucide is the flagged substitute
   (2px stroke, rounded caps, matches --border-solid). */
export function Icon({ name, size = 20, color = "currentColor", strokeWidth = 2, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = "";
    const holder = document.createElement("i");
    holder.setAttribute("data-lucide", name);
    el.appendChild(holder);
    window.lucide.createIcons({
      icons: window.lucide.icons,
      nameAttr: "data-lucide",
      attrs: { width: size, height: size, stroke: color, "stroke-width": strokeWidth }
    });
  }, [name, size, color, strokeWidth]);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={{ display: "inline-flex", width: size, height: size, flex: "0 0 auto", ...style }}
    />
  );
}
