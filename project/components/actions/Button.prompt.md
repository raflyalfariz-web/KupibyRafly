The tap target. `variant="primary"` is reserved for the WhatsApp order action — one per screen.

```jsx
<Button variant="primary" size="cta" icon="message-circle" href="https://wa.me/6281234567890">
  Pesan lewat WhatsApp
</Button>
<Button variant="secondary" size="md">Lihat menu</Button>
```

Variants: primary (green, 56px, raised 2px and drops on press), secondary (2px brown outline on cream), accent (amber — promos only), link. Buttons are full-width by default; that is deliberate for one-handed Android use. `pressed` forces the down state for specimens.
