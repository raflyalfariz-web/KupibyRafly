Places the supplied logo artwork at a legal size — the only correct way to put the mark on a page.

```jsx
<Logo lockup="horizontal" width={200} base="../../assets" />
<Logo lockup="mark" on="dark" width={40} base="../../assets" />
```

Minimums are enforced in code: mark 24px, wordmark 88px, stacked 96px, horizontal 140px. `on="dark"` swaps to the cream artwork for brown backgrounds. `clearSpace` draws the envelope for specimens. Set `base` to the relative path to `assets/`.
