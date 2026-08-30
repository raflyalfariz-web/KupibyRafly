The drink card: tags, name, one-line blurb, then a price row per size.

```jsx
<ProductCard
  name="Kopi Susu Gula Aren"
  blurb="Manisnya dari gula aren asli, nggak bikin serak."
  tags={[{ label: "Paling laris", tone: "amber" }]}
  sizes={[{ size: "500ml", price: 22000 }, { size: "1L", price: 40000, note: "hemat Rp4.000" }]}
  footer={<QtyStepper value={1} />}
/>
```

2px border + soft shadow on `--surface-card`. No product photography — the system has none; keep the card typographic.
