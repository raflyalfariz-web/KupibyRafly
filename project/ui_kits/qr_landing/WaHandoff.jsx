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

function WaHandoff({ state, onBack }) {
  const { ChatBubble, Button } = KUPI_WA;
  const total = state.ml500 * 22000 + state.l1 * 40000;
  const msg = buildMessage(state);
  const recap =
    "Rincian pesanan " + (state.name || "kamu") + "\n\n" +
    (state.ml500 ? state.ml500 + " × 500ml gula aren   Rp" + (state.ml500 * 22000).toLocaleString("id-ID") + "\n" : "") +
    (state.l1 ? state.l1 + " × 1L gula aren      Rp" + (state.l1 * 40000).toLocaleString("id-ID") + "\n" : "") +
    "Antar (3 km)          gratis\n———————————————\nTotal                 Rp" + total.toLocaleString("id-ID") +
    "\n\nTransfer BCA 1234567890 (Rafly) atau bayar cash pas terima.";
  return (
    <div style={{ position: "fixed", inset: 0, width: 390, background: "#ECE5DD", display: "flex", flexDirection: "column", fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif" }}>
      <div style={{ background: "#075E54", color: "#fff", padding: "6px 14px 3px", fontSize: 12, display: "flex", justifyContent: "space-between" }}>
        <span>09.41</span><span>▮▮▮ 82%</span>
      </div>
      <div style={{ background: "#075E54", color: "#fff", display: "flex", gap: 9, alignItems: "center", padding: "9px 12px" }}>
        <button onClick={onBack} aria-label="Kembali" style={{ background: "none", border: "none", color: "#fff", fontSize: 22, lineHeight: "22px", cursor: "pointer", padding: 0 }}>‹</button>
        <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--cream-200)", display: "grid", placeItems: "center", color: "var(--brown-700)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>K</span>
        <span><strong style={{ fontSize: 16 }}>KUPI by Rafly</strong><br /><span style={{ fontSize: 12, opacity: .85 }}>online</span></span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
        <ChatBubble from="customer" time="09.40">{msg}</ChatBubble>
        <ChatBubble from="shop" time="09.41">{"Siap, kecatat ya " + (state.name ? state.name.split(" ")[0] : "") + " 🙏"}</ChatBubble>
        <ChatBubble from="shop" time="09.41">{recap}</ChatBubble>
        <ChatBubble from="shop" time="09.42">{"Aku antar " + (state.time || "pagi") + ", nanti aku kabarin pas otw."}</ChatBubble>
      </div>
      <div style={{ padding: "var(--sp-3) var(--gutter-mobile) var(--sp-4)", background: "var(--surface-page)" }}>
        <Button variant="secondary" size="md" onClick={onBack}>Kembali ke halaman kopi</Button>
      </div>
    </div>
  );
}

Object.assign(window, { WaHandoff, buildMessage });
