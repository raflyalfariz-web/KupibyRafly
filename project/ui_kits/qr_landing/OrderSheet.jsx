const KUPI_OS = window.KUPIByRaflyDesignSystem_40eb5d;

function SweetPicker({ value, onChange }) {
  const opts = ["Normal", "Kurang gula", "Tanpa gula"];
  return (
    <div style={{ display: "flex", gap: "var(--sp-2)" }}>
      {opts.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              flex: 1, minHeight: 44, borderRadius: "var(--radius-md)", cursor: "pointer",
              fontFamily: "var(--font-text)", fontSize: 13, fontWeight: 600,
              background: on ? "var(--brown-700)" : "var(--surface-card)",
              color: on ? "var(--text-on-ink)" : "var(--text-body)",
              border: "var(--border-solid) solid " + (on ? "var(--brown-700)" : "var(--border-default)")
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)" }}>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          minHeight: 48, borderRadius: "var(--radius-md)", padding: "0 var(--sp-3)",
          border: "var(--border-solid) solid var(--neutral-200)", background: "var(--surface-card)",
          fontFamily: "var(--font-text)", fontSize: 16, color: "var(--text-body)"
        }}
      />
    </label>
  );
}

function OrderSheet({ state, set, onSend, onClose }) {
  const { Button, QtyStepper, PriceDisplay, NoteLine, Icon } = KUPI_OS;
  const total = state.ml500 * 22000 + state.l1 * 40000;
  return (
    <div style={{ position: "fixed", inset: 0, width: 390, background: "rgba(42,22,8,.45)", display: "flex", alignItems: "flex-end" }}>
      <div style={{ width: "100%", maxHeight: "94vh", overflowY: "auto", background: "var(--surface-page)", borderRadius: "var(--radius-lg) var(--radius-lg) 0 0", padding: "var(--sp-5) var(--gutter-mobile) var(--sp-6)", display: "grid", gap: "var(--sp-4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--type-heading)", fontWeight: 600, color: "var(--text-strong)" }}>Pesan kopi</h2>
          <button onClick={onClose} aria-label="Tutup" style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", border: "none", background: "transparent", color: "var(--brown-700)", cursor: "pointer" }}>
            <Icon name="x" size={22} />
          </button>
        </div>

        <div style={{ display: "grid", gap: "var(--sp-3)", background: "var(--surface-card)", border: "var(--border-solid) solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--sp-4)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--sp-3)" }}>
            <PriceDisplay size="500ml" price={22000} layout="stack" />
            <QtyStepper value={state.ml500} label="500ml" onChange={(n) => set({ ml500: n })} />
          </div>
          <div style={{ height: 1, background: "var(--border-subtle)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--sp-3)" }}>
            <PriceDisplay size="1L" price={40000} layout="stack" />
            <QtyStepper value={state.l1} label="1L" onChange={(n) => set({ l1: n })} />
          </div>
        </div>

        <SweetPicker value={state.sweet} onChange={(v) => set({ sweet: v })} />
        <Field label="Nama" placeholder="Bu Ratna" value={state.name} onChange={(v) => set({ name: v })} />
        <Field label="Alamat / patokan" placeholder="Kaliurang 42, pagar hijau" value={state.addr} onChange={(v) => set({ addr: v })} />
        <Field label="Jam mau diterima" placeholder="08.00" value={state.time} onChange={(v) => set({ time: v })} />

        <div style={{ background: "var(--surface-sunken)", borderRadius: "var(--radius-md)", padding: "var(--sp-4)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--type-subheading)", fontWeight: 500 }}>Total</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--type-price-xl)", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "var(--text-price)" }}>
            {"Rp" + total.toLocaleString("id-ID")}
          </span>
        </div>
        <NoteLine icon="info">Belum dibayar apa-apa. Pesanan masuk lewat WhatsApp dulu, bayar nanti.</NoteLine>
        <Button variant="primary" size="cta" icon="message-circle" disabled={total === 0} onClick={onSend}>
          {total === 0 ? "Pilih dulu jumlahnya" : "Kirim ke WhatsApp"}
        </Button>
      </div>
    </div>
  );
}

Object.assign(window, { OrderSheet, SweetPicker, Field });
