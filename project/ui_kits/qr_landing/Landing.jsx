const KUPI = window.KUPIByRaflyDesignSystem_40eb5d;

function BrandBar() {
  const { Logo, Icon } = KUPI;
  return (
    <header style={{ background: "var(--brown-700)", padding: "12px var(--gutter-mobile)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Logo lockup="horizontal" on="dark" width={150} base="../../assets" />
      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--cream-200)", fontSize: "var(--type-caption)" }}>
        <Icon name="map-pin" size={15} />
        Kaliurang
      </span>
    </header>
  );
}

function Hero({ onOrder }) {
  const { SectionHeading, PriceDisplay, BatchInfo, NoteLine, Tag } = KUPI;
  return (
    <section style={{ padding: "var(--sp-6) var(--gutter-mobile) var(--sp-5)", display: "grid", gap: "var(--sp-4)" }}>
      <div style={{ display: "flex", gap: "var(--sp-2)" }}>
        <Tag tone="success">Botol ini</Tag>
        <Tag tone="amber">Batch 0824-03</Tag>
      </div>
      <SectionHeading eyebrow="Yang kamu pegang" sub="Kopi seduh dingin, susu segar, gula aren asli dari Bantul. Manisnya lembut.">
        Kopi Susu Gula Aren
      </SectionHeading>
      <PriceDisplay size="500ml · botol ini" price={22000} note="cukup 2 gelas" layout="stack" emphasis="hero" />
      <BatchInfo batch="0824-03" brewed="24 Agu, 05.30" bestBefore="27 Agu" beans="Gayo, medium" />
      <NoteLine icon="snowflake">Simpan di kulkas ya. Kalau sudah dibuka, habiskan hari itu.</NoteLine>
    </section>
  );
}

function Menu({ onOrder }) {
  const { SectionHeading, ProductCard, Button } = KUPI;
  return (
    <section style={{ padding: "var(--sp-2) var(--gutter-mobile) var(--sp-6)", display: "grid", gap: "var(--sp-4)", background: "var(--cream-100)" }}>
      <SectionHeading eyebrow="Menu hari ini" sub="Diseduh subuh, siap dari jam 7." style={{ paddingTop: "var(--sp-6)" }}>
        Mau nambah?
      </SectionHeading>
      <ProductCard
        name="Kopi Susu Gula Aren"
        blurb="Yang paling sering dipesan. Manisnya dari gula aren asli."
        tags={[{ label: "Paling laris", tone: "amber" }, { label: "Ready 12", tone: "success" }]}
        sizes={[{ size: "500ml", price: 22000 }, { size: "1L", price: 40000, note: "hemat Rp4.000" }]}
      />
      <ProductCard
        name="Kopi Hitam Dingin"
        blurb="Tanpa susu, tanpa gula. Pahitnya bersih, nggak asam."
        tags={[{ label: "Tanpa gula", tone: "outline" }, { label: "Sisa 4", tone: "warning" }]}
        sizes={[{ size: "500ml", price: 18000 }, { size: "1L", price: 33000 }]}
      />
      <Button variant="secondary" size="md" icon="qr-code" onClick={onOrder}>Pesan yang lain</Button>
    </section>
  );
}

function ShopInfo() {
  const { SectionHeading, NoteLine, ChevronRule, Icon } = KUPI;
  const rows = [
    { icon: "clock", k: "Buka", v: "Setiap hari, 07.00–17.00" },
    { icon: "truck", k: "Antar", v: "Gratis radius 3 km, pesan sebelum 09.00" },
    { icon: "wallet", k: "Bayar", v: "Transfer BCA atau cash pas terima" }
  ];
  return (
    <section style={{ padding: "var(--sp-6) var(--gutter-mobile)", display: "grid", gap: "var(--sp-4)" }}>
      <SectionHeading eyebrow="Info toko">Cara pesan</SectionHeading>
      <div style={{ display: "grid", gap: "var(--sp-3)" }}>
        {rows.map((r) => (
          <div key={r.k} style={{ display: "flex", gap: "var(--sp-3)", alignItems: "flex-start" }}>
            <span style={{ width: 34, height: 34, flex: "0 0 auto", borderRadius: "var(--radius-sm)", background: "var(--surface-sunken)", display: "grid", placeItems: "center", color: "var(--brown-700)" }}>
              <Icon name={r.icon} size={18} />
            </span>
            <span>
              <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "var(--type-body)", fontWeight: 600, color: "var(--text-strong)" }}>{r.k}</strong>
              <span style={{ fontSize: "var(--type-body-sm)", color: "var(--text-muted)" }}>{r.v}</span>
            </span>
          </div>
        ))}
      </div>
      <NoteLine icon="info">Pesanan lebih dari 5 botol, kabarin sehari sebelumnya ya.</NoteLine>
      <ChevronRule base="../../assets" style={{ marginTop: "var(--sp-4)" }} />
    </section>
  );
}

function Footer() {
  const { Logo } = KUPI;
  return (
    <footer style={{ background: "var(--brown-700)", padding: "var(--sp-6) var(--gutter-mobile) 96px", display: "grid", gap: "var(--sp-3)", justifyItems: "center", textAlign: "center" }}>
      <Logo lockup="stacked" on="dark" width={104} base="../../assets" />
      <p style={{ margin: 0, color: "var(--cream-200)", fontSize: "var(--type-caption)", lineHeight: "var(--lh-caption)" }}>
        Diseduh sendiri tiap subuh di Kaliurang.<br />WA 0812-3456-7890
      </p>
    </footer>
  );
}

function StickyCta({ onOrder }) {
  const { Button } = KUPI;
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, width: 390, padding: "var(--sp-3) var(--gutter-mobile) var(--sp-4)", background: "linear-gradient(to top,var(--cream-50) 62%,rgba(253,249,240,0))" }}>
      <Button variant="primary" size="cta" icon="message-circle" onClick={onOrder}>Pesan lewat WhatsApp</Button>
    </div>
  );
}

Object.assign(window, { BrandBar, Hero, Menu, ShopInfo, Footer, StickyCta });
