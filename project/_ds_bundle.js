/* @ds-bundle: {"format":4,"namespace":"KUPIByRaflyDesignSystem_40eb5d","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"QtyStepper","sourcePath":"components/actions/QtyStepper.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"BatchInfo","sourcePath":"components/commerce/BatchInfo.jsx"},{"name":"PriceDisplay","sourcePath":"components/commerce/PriceDisplay.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"NoteLine","sourcePath":"components/feedback/NoteLine.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Icon","sourcePath":"components/icon/Icon.jsx"},{"name":"ChevronRule","sourcePath":"components/layout/ChevronRule.jsx"},{"name":"SectionHeading","sourcePath":"components/layout/SectionHeading.jsx"},{"name":"ChatBubble","sourcePath":"components/messaging/ChatBubble.jsx"},{"name":"PhoneScreen","sourcePath":"components/messaging/PhoneScreen.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"2b6b89b765cf","components/actions/QtyStepper.jsx":"026ad0930c17","components/brand/Logo.jsx":"6f94cc71dddf","components/commerce/BatchInfo.jsx":"6c89219a767d","components/commerce/PriceDisplay.jsx":"75e1c0e707cc","components/commerce/ProductCard.jsx":"133cf9ab8261","components/feedback/NoteLine.jsx":"85b574745f2a","components/feedback/Tag.jsx":"ca48d9790808","components/icon/Icon.jsx":"99c111c37851","components/layout/ChevronRule.jsx":"dc4747af856f","components/layout/SectionHeading.jsx":"d5f87e5bed6b","components/messaging/ChatBubble.jsx":"69b912e705a6","components/messaging/PhoneScreen.jsx":"5fcfdce75722","ui_kits/qr_landing/App.jsx":"59f8dc28cd0a","ui_kits/qr_landing/Landing.jsx":"c62d1e28893a","ui_kits/qr_landing/OrderSheet.jsx":"1b399a29d69f","ui_kits/qr_landing/WaHandoff.jsx":"7e388e6e08c9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KUPIByRaflyDesignSystem_40eb5d = window.KUPIByRaflyDesignSystem_40eb5d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
/* The KUPI mark and wordmark are supplied artwork (assets/logo-*.png).
   This component only places them at legal sizes with legal clear space.
   Pass `base` = path from your page to the project's assets/ folder. */
const FILES = {
  mark: {
    light: "logo-mark.png",
    dark: "logo-mark-cream.png",
    ratio: 1236 / 653
  },
  stacked: {
    light: "logo-stacked.png",
    dark: "logo-stacked-cream.png",
    ratio: 1236 / 1155
  },
  horizontal: {
    light: "logo-horizontal.png",
    dark: "logo-horizontal-cream.png",
    ratio: 1093 / 420
  },
  wordmark: {
    light: "logo-wordmark.png",
    dark: "logo-wordmark-cream.png",
    ratio: 865 / 617
  }
};

/* Minimum on-screen widths, below which the lettering breaks up. */
const MINIMUM = {
  mark: 24,
  stacked: 96,
  horizontal: 140,
  wordmark: 88
};
function Logo({
  lockup = "horizontal",
  on = "light",
  width = 180,
  clearSpace = false,
  base = "assets",
  style
}) {
  const spec = FILES[lockup];
  const w = Math.max(width, MINIMUM[lockup]);
  const src = base.replace(/\/$/, "") + "/" + (on === "dark" ? spec.dark : spec.light);
  const pad = clearSpace ? lockup === "mark" ? w * 0.5 : w * 0.16 : 0;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      padding: pad,
      outline: clearSpace ? "1px dashed var(--neutral-300)" : "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "KUPI by Rafly",
    style: {
      display: "block",
      width: w,
      height: w / spec.ratio
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PriceDisplay.jsx
try { (() => {
function rupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}
function PriceDisplay({
  size,
  price,
  was,
  note,
  layout = "row",
  emphasis = "normal",
  style
}) {
  const big = emphasis === "hero";
  const isRow = layout === "row";
  /* Row layout is always two columns (size left, price right) with the note on
     its own line beneath — so prices stay right-aligned down a menu. */
  const body = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: isRow ? "row" : "column",
      alignItems: isRow ? "baseline" : "flex-start",
      justifyContent: isRow ? "space-between" : "flex-start",
      gap: isRow ? "var(--sp-3)" : "2px",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-medium)",
      fontSize: big ? "var(--type-subheading)" : "var(--type-body)",
      color: "var(--text-body)"
    }
  }, size), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--sp-2)"
    }
  }, was ? /*#__PURE__*/React.createElement("s", {
    style: {
      fontSize: "var(--type-body-sm)",
      color: "var(--text-muted)",
      textDecorationThickness: "1px"
    }
  }, rupiah(was)) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-semibold)",
      fontSize: big ? "var(--type-price-xl)" : "var(--type-price)",
      lineHeight: big ? "var(--lh-price-xl)" : "var(--lh-price)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-price)",
      fontVariantNumeric: "tabular-nums"
    }
  }, rupiah(price))), !isRow && note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption)",
      color: "var(--text-muted)"
    }
  }, note) : null);
  if (!isRow) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-text)",
      ...style
    }
  }, body);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      fontFamily: "var(--font-text)",
      ...style
    }
  }, body, note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption)",
      color: "var(--text-muted)"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { PriceDisplay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PriceDisplay.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
const TONES = {
  neutral: {
    background: "var(--surface-sunken)",
    color: "var(--brown-700)",
    border: "transparent"
  },
  amber: {
    background: "var(--amber-100)",
    color: "var(--amber-600)",
    border: "transparent"
  },
  success: {
    background: "var(--state-success-bg)",
    color: "var(--state-success)",
    border: "transparent"
  },
  warning: {
    background: "var(--state-warning-bg)",
    color: "var(--state-warning)",
    border: "transparent"
  },
  outline: {
    background: "transparent",
    color: "var(--brown-700)",
    border: "var(--border-default)"
  }
};
function Tag({
  children,
  tone = "neutral",
  style
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-text)",
      fontSize: "var(--type-label)",
      lineHeight: "var(--lh-label)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      padding: "6px var(--sp-2)",
      borderRadius: "var(--radius-sm)",
      background: t.background,
      color: t.color,
      border: "var(--border-hairline) solid " + t.border,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function ProductCard({
  name,
  blurb,
  sizes = [],
  tags = [],
  footer,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: "var(--surface-card)",
      border: "var(--border-solid) solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--sp-5)",
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)",
      ...style
    }
  }, tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      flexWrap: "wrap"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t.label,
    tone: t.tone
  }, t.label))) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--type-heading)",
      lineHeight: "var(--lh-heading)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)"
    }
  }, name), blurb ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-text)",
      fontSize: "var(--type-body-sm)",
      lineHeight: "var(--lh-body-sm)",
      color: "var(--text-muted)",
      textWrap: "pretty"
    }
  }, blurb) : null, sizes.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-2)",
      borderTop: "var(--border-hairline) solid var(--border-subtle)",
      paddingTop: "var(--sp-3)"
    }
  }, sizes.map(s => /*#__PURE__*/React.createElement(__ds_scope.PriceDisplay, {
    key: s.size,
    size: s.size,
    price: s.price,
    was: s.was,
    note: s.note
  }))) : null, footer);
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/icon/Icon.jsx
try { (() => {
/* Lucide-backed icon. The page must load Lucide from CDN:
   <script src="https://unpkg.com/lucide@0.453.0/dist/umd/lucide.min.js"></script>
   KUPI has no icon set of its own — Lucide is the flagged substitute
   (2px stroke, rounded caps, matches --border-solid). */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  style
}) {
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
      attrs: {
        width: size,
        height: size,
        stroke: color,
        "stroke-width": strokeWidth
      }
    });
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      flex: "0 0 auto",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
const BASE = {
  fontFamily: "var(--font-text)",
  fontWeight: "var(--weight-semibold)",
  border: "var(--border-solid) solid transparent",
  borderRadius: "var(--radius-md)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--sp-2)",
  cursor: "pointer",
  width: "100%",
  textDecoration: "none",
  transition: "background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
  WebkitTapHighlightColor: "transparent"
};
const SIZES = {
  cta: {
    minHeight: "var(--tap-cta)",
    fontSize: "18px",
    padding: "0 var(--sp-5)"
  },
  md: {
    minHeight: "var(--tap-min)",
    fontSize: "16px",
    padding: "0 var(--sp-4)"
  },
  sm: {
    minHeight: "40px",
    fontSize: "14px",
    padding: "0 var(--sp-3)"
  }
};
function skin(variant, pressed) {
  if (variant === "primary") return {
    background: pressed ? "var(--action-primary-press)" : "var(--action-primary)",
    color: "#FFFFFF",
    borderColor: pressed ? "var(--action-primary-press)" : "var(--action-primary)",
    boxShadow: pressed ? "var(--shadow-press)" : "var(--shadow-raise)",
    transform: pressed ? "translateY(2px)" : "none"
  };
  if (variant === "secondary") return {
    background: pressed ? "var(--cream-200)" : "transparent",
    color: "var(--action-secondary)",
    borderColor: "var(--action-secondary)",
    transform: pressed ? "translateY(1px)" : "none"
  };
  if (variant === "accent") return {
    background: pressed ? "var(--accent-press)" : "var(--accent)",
    color: "#FFFFFF",
    borderColor: pressed ? "var(--accent-press)" : "var(--accent)",
    boxShadow: pressed ? "var(--shadow-press)" : "var(--shadow-raise)",
    transform: pressed ? "translateY(2px)" : "none"
  };
  return {
    background: "transparent",
    color: pressed ? "var(--brown-900)" : "var(--brown-700)",
    borderColor: "transparent",
    textDecoration: "underline",
    textUnderlineOffset: "3px"
  };
}
function Button({
  children,
  variant = "primary",
  size = "cta",
  icon,
  pressed = false,
  disabled = false,
  href,
  onClick,
  style
}) {
  const [held, setHeld] = React.useState(false);
  const isDown = pressed || held;
  const Tag = href ? "a" : "button";
  const s = {
    ...BASE,
    ...SIZES[size],
    ...skin(variant, isDown),
    ...(disabled ? {
      background: "var(--neutral-100)",
      color: "var(--neutral-300)",
      borderColor: "var(--neutral-100)",
      boxShadow: "none",
      transform: "none",
      cursor: "not-allowed"
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: disabled ? undefined : onClick,
    style: s,
    disabled: Tag === "button" ? disabled : undefined,
    onPointerDown: () => setHeld(true),
    onPointerUp: () => setHeld(false),
    onPointerLeave: () => setHeld(false)
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "sm" ? 18 : 22
  }) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/QtyStepper.jsx
try { (() => {
const btn = {
  width: "var(--tap-min)",
  height: "var(--tap-min)",
  display: "grid",
  placeItems: "center",
  background: "var(--surface-card)",
  color: "var(--brown-700)",
  border: "var(--border-solid) solid var(--border-strong)",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent"
};
function QtyStepper({
  value = 0,
  min = 0,
  max = 99,
  onChange,
  label
}) {
  const set = n => onChange && onChange(Math.max(min, Math.min(max, n)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Kurangi " + (label || ""),
    style: {
      ...btn,
      opacity: value <= min ? 0.4 : 1
    },
    onClick: () => set(value - 1)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--type-price)",
      color: "var(--text-price)",
      minWidth: "32px",
      textAlign: "center",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Tambah " + (label || ""),
    style: btn,
    onClick: () => set(value + 1)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 20
  })));
}
Object.assign(__ds_scope, { QtyStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/QtyStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/BatchInfo.jsx
try { (() => {
function BatchInfo({
  batch,
  brewed,
  bestBefore,
  beans,
  rows,
  style
}) {
  const items = rows || [{
    icon: "hash",
    label: "Batch",
    value: batch
  }, {
    icon: "sun",
    label: "Diseduh",
    value: brewed
  }, {
    icon: "snowflake",
    label: "Baik sebelum",
    value: bestBefore
  }, {
    icon: "coffee",
    label: "Biji",
    value: beans
  }].filter(r => r.value);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      border: "var(--border-hairline) solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "var(--sp-4)",
      display: "grid",
      gap: "var(--sp-3)",
      fontFamily: "var(--font-text)",
      ...style
    }
  }, items.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-2)",
      color: "var(--text-muted)",
      fontSize: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      fontWeight: "var(--weight-semibold)",
      minWidth: "132px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: r.icon,
    size: 16
  }), r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-body)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-body)",
      fontVariantNumeric: "tabular-nums"
    }
  }, r.value))));
}
Object.assign(__ds_scope, { BatchInfo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/BatchInfo.jsx", error: String((e && e.message) || e) }); }

// components/feedback/NoteLine.jsx
try { (() => {
function NoteLine({
  children,
  icon = "info",
  tone = "muted",
  style
}) {
  const color = tone === "warning" ? "var(--state-warning)" : tone === "strong" ? "var(--text-body)" : "var(--text-muted)";
  return /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      alignItems: "flex-start",
      margin: 0,
      fontFamily: "var(--font-text)",
      fontSize: "var(--type-caption)",
      lineHeight: "var(--lh-caption)",
      color,
      textWrap: "pretty",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    style: {
      marginTop: "1px"
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { NoteLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/NoteLine.jsx", error: String((e && e.message) || e) }); }

// components/layout/ChevronRule.jsx
try { (() => {
/* Divider built from the joglo mark artwork — the brand's only ornament. */
function ChevronRule({
  base = "assets",
  on = "light",
  width = 28,
  count = 3,
  style
}) {
  const src = base.replace(/\/$/, "") + "/" + (on === "dark" ? "logo-mark-cream.png" : "logo-mark.png");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.85,
      ...style
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: src,
    alt: "",
    style: {
      display: "block",
      width,
      height: width / (1236 / 653)
    }
  })));
}
Object.assign(__ds_scope, { ChevronRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ChevronRule.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  children,
  sub,
  align = "left",
  rule = true,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-2)",
      textAlign: align,
      alignItems: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-text)",
      fontSize: "var(--type-label)",
      lineHeight: "var(--lh-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      fontWeight: "var(--weight-semibold)",
      color: "var(--accent-press)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--type-display-l)",
      lineHeight: "var(--lh-display-l)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)",
      textWrap: "pretty"
    }
  }, children), sub ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-text)",
      fontSize: "var(--type-body)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-muted)",
      textWrap: "pretty"
    }
  }, sub) : null, rule ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: "48px",
      height: "3px",
      background: "var(--brown-700)",
      marginTop: "var(--sp-1)"
    }
  }) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/messaging/ChatBubble.jsx
try { (() => {
/* WhatsApp mock bubble. WhatsApp gives us no type or colour control, so the
   design lives in the structure of the message. These are the real WA
   surface colours, used only for mocks — not brand colours. */
function ChatBubble({
  children,
  from = "shop",
  time = "09.41",
  ticks = "read",
  style
}) {
  const mine = from === "shop";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: mine ? "flex-end" : "flex-start",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "82%",
      background: mine ? "#DCF8C6" : "#FFFFFF",
      borderRadius: "10px",
      borderTopRightRadius: mine ? "2px" : "10px",
      borderTopLeftRadius: mine ? "10px" : "2px",
      padding: "7px 9px 5px",
      boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
      fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontSize: "15px",
      lineHeight: "20px",
      color: "#111B21",
      whiteSpace: "pre-wrap"
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "3px",
      marginTop: "2px",
      fontSize: "11px",
      color: "#667781"
    }
  }, time, mine ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: ticks === "read" ? "#53BDEB" : "#667781",
      fontSize: "12px"
    }
  }, "\u2713\u2713") : null)));
}
Object.assign(__ds_scope, { ChatBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/ChatBubble.jsx", error: String((e && e.message) || e) }); }

// components/messaging/PhoneScreen.jsx
try { (() => {
/* Android-proportioned frame for WhatsApp and browser mocks. 390×780 by default. */
function PhoneScreen({
  children,
  title,
  subtitle,
  chrome = "whatsapp",
  width = 390,
  height = 780,
  style
}) {
  const wa = chrome === "whatsapp";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: "22px",
      overflow: "hidden",
      border: "8px solid #1B1B1B",
      background: wa ? "#ECE5DD" : "var(--surface-page)",
      display: "flex",
      flexDirection: "column",
      fontFamily: wa ? "'Helvetica Neue',Helvetica,Arial,sans-serif" : "var(--font-text)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "5px 14px 3px",
      fontSize: "12px",
      background: wa ? "#075E54" : "var(--brown-700)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", null, "09.41"), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: "1px"
    }
  }, "\u25AE\u25AE\u25AE 82%")), title ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "9px 12px",
      background: wa ? "#075E54" : "var(--brown-700)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "20px",
      lineHeight: "20px"
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: "var(--cream-200)",
      display: "grid",
      placeItems: "center",
      color: "var(--brown-700)",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "14px",
      flex: "0 0 auto"
    }
  }, "K"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: "16px",
      fontWeight: 600
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      opacity: 0.85
    }
  }, subtitle) : null)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: wa ? "10px 8px" : 0
    }
  }, children), wa ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      padding: "8px",
      background: "#F0F0F0",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      background: "#fff",
      borderRadius: "18px",
      padding: "9px 12px",
      fontSize: "14px",
      color: "#8696A0"
    }
  }, "Ketik pesan"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "50%",
      background: "#075E54",
      color: "#fff",
      display: "grid",
      placeItems: "center"
    }
  }, "\u27A4")) : null);
}
Object.assign(__ds_scope, { PhoneScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/PhoneScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qr_landing/App.jsx
try { (() => {
function App() {
  const [view, setView] = React.useState("landing");
  const [state, setState] = React.useState({
    ml500: 1,
    l1: 0,
    sweet: "Normal",
    name: "",
    addr: "",
    time: ""
  });
  const set = patch => setState(s => ({
    ...s,
    ...patch
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BrandBar, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Menu, {
    onOrder: () => setView("order")
  }), /*#__PURE__*/React.createElement(ShopInfo, null), /*#__PURE__*/React.createElement(Footer, null), view === "landing" ? /*#__PURE__*/React.createElement(StickyCta, {
    onOrder: () => setView("order")
  }) : null, view === "order" ? /*#__PURE__*/React.createElement(OrderSheet, {
    state: state,
    set: set,
    onClose: () => setView("landing"),
    onSend: () => setView("wa")
  }) : null, view === "wa" ? /*#__PURE__*/React.createElement(WaHandoff, {
    state: state,
    onBack: () => setView("landing")
  }) : null);
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qr_landing/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qr_landing/Landing.jsx
try { (() => {
const KUPI = window.KUPIByRaflyDesignSystem_40eb5d;
function BrandBar() {
  const {
    Logo,
    Icon
  } = KUPI;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--brown-700)",
      padding: "12px var(--gutter-mobile)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    lockup: "horizontal",
    on: "dark",
    width: 150,
    base: "../../assets"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      color: "var(--cream-200)",
      fontSize: "var(--type-caption)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 15
  }), "Kaliurang"));
}
function Hero({
  onOrder
}) {
  const {
    SectionHeading,
    PriceDisplay,
    BatchInfo,
    NoteLine,
    Tag
  } = KUPI;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--sp-6) var(--gutter-mobile) var(--sp-5)",
      display: "grid",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "success"
  }, "Botol ini"), /*#__PURE__*/React.createElement(Tag, {
    tone: "amber"
  }, "Batch 0824-03")), /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Yang kamu pegang",
    sub: "Kopi seduh dingin, susu segar, gula aren asli dari Bantul. Manisnya lembut."
  }, "Kopi Susu Gula Aren"), /*#__PURE__*/React.createElement(PriceDisplay, {
    size: "500ml \xB7 botol ini",
    price: 22000,
    note: "cukup 2 gelas",
    layout: "stack",
    emphasis: "hero"
  }), /*#__PURE__*/React.createElement(BatchInfo, {
    batch: "0824-03",
    brewed: "24 Agu, 05.30",
    bestBefore: "27 Agu",
    beans: "Gayo, medium"
  }), /*#__PURE__*/React.createElement(NoteLine, {
    icon: "snowflake"
  }, "Simpan di kulkas ya. Kalau sudah dibuka, habiskan hari itu."));
}
function Menu({
  onOrder
}) {
  const {
    SectionHeading,
    ProductCard,
    Button
  } = KUPI;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--sp-2) var(--gutter-mobile) var(--sp-6)",
      display: "grid",
      gap: "var(--sp-4)",
      background: "var(--cream-100)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Menu hari ini",
    sub: "Diseduh subuh, siap dari jam 7.",
    style: {
      paddingTop: "var(--sp-6)"
    }
  }, "Mau nambah?"), /*#__PURE__*/React.createElement(ProductCard, {
    name: "Kopi Susu Gula Aren",
    blurb: "Yang paling sering dipesan. Manisnya dari gula aren asli.",
    tags: [{
      label: "Paling laris",
      tone: "amber"
    }, {
      label: "Ready 12",
      tone: "success"
    }],
    sizes: [{
      size: "500ml",
      price: 22000
    }, {
      size: "1L",
      price: 40000,
      note: "hemat Rp4.000"
    }]
  }), /*#__PURE__*/React.createElement(ProductCard, {
    name: "Kopi Hitam Dingin",
    blurb: "Tanpa susu, tanpa gula. Pahitnya bersih, nggak asam.",
    tags: [{
      label: "Tanpa gula",
      tone: "outline"
    }, {
      label: "Sisa 4",
      tone: "warning"
    }],
    sizes: [{
      size: "500ml",
      price: 18000
    }, {
      size: "1L",
      price: 33000
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    icon: "qr-code",
    onClick: onOrder
  }, "Pesan yang lain"));
}
function ShopInfo() {
  const {
    SectionHeading,
    NoteLine,
    ChevronRule,
    Icon
  } = KUPI;
  const rows = [{
    icon: "clock",
    k: "Buka",
    v: "Setiap hari, 07.00–17.00"
  }, {
    icon: "truck",
    k: "Antar",
    v: "Gratis radius 3 km, pesan sebelum 09.00"
  }, {
    icon: "wallet",
    k: "Bayar",
    v: "Transfer BCA atau cash pas terima"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--sp-6) var(--gutter-mobile)",
      display: "grid",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Info toko"
  }, "Cara pesan"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-3)"
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.k,
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      flex: "0 0 auto",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)",
      display: "grid",
      placeItems: "center",
      color: "var(--brown-700)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-body)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, r.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, r.v))))), /*#__PURE__*/React.createElement(NoteLine, {
    icon: "info"
  }, "Pesanan lebih dari 5 botol, kabarin sehari sebelumnya ya."), /*#__PURE__*/React.createElement(ChevronRule, {
    base: "../../assets",
    style: {
      marginTop: "var(--sp-4)"
    }
  }));
}
function Footer() {
  const {
    Logo
  } = KUPI;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--brown-700)",
      padding: "var(--sp-6) var(--gutter-mobile) 96px",
      display: "grid",
      gap: "var(--sp-3)",
      justifyItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    lockup: "stacked",
    on: "dark",
    width: 104,
    base: "../../assets"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--cream-200)",
      fontSize: "var(--type-caption)",
      lineHeight: "var(--lh-caption)"
    }
  }, "Diseduh sendiri tiap subuh di Kaliurang.", /*#__PURE__*/React.createElement("br", null), "WA 0812-3456-7890"));
}
function StickyCta({
  onOrder
}) {
  const {
    Button
  } = KUPI;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      width: 390,
      padding: "var(--sp-3) var(--gutter-mobile) var(--sp-4)",
      background: "linear-gradient(to top,var(--cream-50) 62%,rgba(253,249,240,0))"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "cta",
    icon: "message-circle",
    onClick: onOrder
  }, "Pesan lewat WhatsApp"));
}
Object.assign(window, {
  BrandBar,
  Hero,
  Menu,
  ShopInfo,
  Footer,
  StickyCta
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qr_landing/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qr_landing/OrderSheet.jsx
try { (() => {
const KUPI_OS = window.KUPIByRaflyDesignSystem_40eb5d;
function SweetPicker({
  value,
  onChange
}) {
  const opts = ["Normal", "Kurang gula", "Tanpa gula"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)"
    }
  }, opts.map(o => {
    const on = o === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o,
      onClick: () => onChange(o),
      style: {
        flex: 1,
        minHeight: 44,
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        fontFamily: "var(--font-text)",
        fontSize: 13,
        fontWeight: 600,
        background: on ? "var(--brown-700)" : "var(--surface-card)",
        color: on ? "var(--text-on-ink)" : "var(--text-body)",
        border: "var(--border-solid) solid " + (on ? "var(--brown-700)" : "var(--border-default)")
      }
    }, o);
  }));
}
function Field({
  label,
  placeholder,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "grid",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value),
    style: {
      minHeight: 48,
      borderRadius: "var(--radius-md)",
      padding: "0 var(--sp-3)",
      border: "var(--border-solid) solid var(--neutral-200)",
      background: "var(--surface-card)",
      fontFamily: "var(--font-text)",
      fontSize: 16,
      color: "var(--text-body)"
    }
  }));
}
function OrderSheet({
  state,
  set,
  onSend,
  onClose
}) {
  const {
    Button,
    QtyStepper,
    PriceDisplay,
    NoteLine,
    Icon
  } = KUPI_OS;
  const total = state.ml500 * 22000 + state.l1 * 40000;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      width: 390,
      background: "rgba(42,22,8,.45)",
      display: "flex",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxHeight: "94vh",
      overflowY: "auto",
      background: "var(--surface-page)",
      borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
      padding: "var(--sp-5) var(--gutter-mobile) var(--sp-6)",
      display: "grid",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-heading)",
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, "Pesan kopi"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Tutup",
    style: {
      width: 44,
      height: 44,
      borderRadius: "var(--radius-md)",
      border: "none",
      background: "transparent",
      color: "var(--brown-700)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-3)",
      background: "var(--surface-card)",
      border: "var(--border-solid) solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(PriceDisplay, {
    size: "500ml",
    price: 22000,
    layout: "stack"
  }), /*#__PURE__*/React.createElement(QtyStepper, {
    value: state.ml500,
    label: "500ml",
    onChange: n => set({
      ml500: n
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-subtle)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(PriceDisplay, {
    size: "1L",
    price: 40000,
    layout: "stack"
  }), /*#__PURE__*/React.createElement(QtyStepper, {
    value: state.l1,
    label: "1L",
    onChange: n => set({
      l1: n
    })
  }))), /*#__PURE__*/React.createElement(SweetPicker, {
    value: state.sweet,
    onChange: v => set({
      sweet: v
    })
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Nama",
    placeholder: "Bu Ratna",
    value: state.name,
    onChange: v => set({
      name: v
    })
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Alamat / patokan",
    placeholder: "Kaliurang 42, pagar hijau",
    value: state.addr,
    onChange: v => set({
      addr: v
    })
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Jam mau diterima",
    placeholder: "08.00",
    value: state.time,
    onChange: v => set({
      time: v
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)",
      padding: "var(--sp-4)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-subheading)",
      fontWeight: 500
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--type-price-xl)",
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-price)"
    }
  }, "Rp" + total.toLocaleString("id-ID"))), /*#__PURE__*/React.createElement(NoteLine, {
    icon: "info"
  }, "Belum dibayar apa-apa. Pesanan masuk lewat WhatsApp dulu, bayar nanti."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "cta",
    icon: "message-circle",
    disabled: total === 0,
    onClick: onSend
  }, total === 0 ? "Pilih dulu jumlahnya" : "Kirim ke WhatsApp")));
}
Object.assign(window, {
  OrderSheet,
  SweetPicker,
  Field
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qr_landing/OrderSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/qr_landing/WaHandoff.jsx
try { (() => {
const KUPI_WA = window.KUPIByRaflyDesignSystem_40eb5d;
function buildMessage(s) {
  const lines = ["Halo mas, mau pesan:"];
  if (s.ml500) lines.push(s.ml500 + " × 500ml");
  if (s.l1) lines.push(s.l1 + " × 1L");
  lines.push("Gula: " + s.sweet.toLowerCase());
  lines.push("");
  lines.push("Nama: " + (s.name || "—"));
  lines.push("Alamat: " + (s.addr || "—"));
  lines.push("Jam: " + (s.time || "—"));
  return lines.join("\n");
}
function WaHandoff({
  state,
  onBack
}) {
  const {
    ChatBubble,
    Button
  } = KUPI_WA;
  const total = state.ml500 * 22000 + state.l1 * 40000;
  const msg = buildMessage(state);
  const recap = "Rincian pesanan " + (state.name || "kamu") + "\n\n" + (state.ml500 ? state.ml500 + " × 500ml gula aren   Rp" + (state.ml500 * 22000).toLocaleString("id-ID") + "\n" : "") + (state.l1 ? state.l1 + " × 1L gula aren      Rp" + (state.l1 * 40000).toLocaleString("id-ID") + "\n" : "") + "Antar (3 km)          gratis\n———————————————\nTotal                 Rp" + total.toLocaleString("id-ID") + "\n\nTransfer BCA 1234567890 (Rafly) atau bayar cash pas terima.";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      width: 390,
      background: "#ECE5DD",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#075E54",
      color: "#fff",
      padding: "6px 14px 3px",
      fontSize: 12,
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, "09.41"), /*#__PURE__*/React.createElement("span", null, "\u25AE\u25AE\u25AE 82%")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#075E54",
      color: "#fff",
      display: "flex",
      gap: 9,
      alignItems: "center",
      padding: "9px 12px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Kembali",
    style: {
      background: "none",
      border: "none",
      color: "#fff",
      fontSize: 22,
      lineHeight: "22px",
      cursor: "pointer",
      padding: 0
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: "var(--cream-200)",
      display: "grid",
      placeItems: "center",
      color: "var(--brown-700)",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 14
    }
  }, "K"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 16
    }
  }, "KUPI by Rafly"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      opacity: .85
    }
  }, "online"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "10px 8px",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(ChatBubble, {
    from: "customer",
    time: "09.40"
  }, msg), /*#__PURE__*/React.createElement(ChatBubble, {
    from: "shop",
    time: "09.41"
  }, "Siap, kecatat ya " + (state.name ? state.name.split(" ")[0] : "") + " 🙏"), /*#__PURE__*/React.createElement(ChatBubble, {
    from: "shop",
    time: "09.41"
  }, recap), /*#__PURE__*/React.createElement(ChatBubble, {
    from: "shop",
    time: "09.42"
  }, "Aku antar " + (state.time || "pagi") + ", nanti aku kabarin pas otw.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-3) var(--gutter-mobile) var(--sp-4)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    onClick: onBack
  }, "Kembali ke halaman kopi")));
}
Object.assign(window, {
  WaHandoff,
  buildMessage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/qr_landing/WaHandoff.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.QtyStepper = __ds_scope.QtyStepper;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.BatchInfo = __ds_scope.BatchInfo;

__ds_ns.PriceDisplay = __ds_scope.PriceDisplay;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.NoteLine = __ds_scope.NoteLine;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ChevronRule = __ds_scope.ChevronRule;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ChatBubble = __ds_scope.ChatBubble;

__ds_ns.PhoneScreen = __ds_scope.PhoneScreen;

})();
