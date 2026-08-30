import React from "react";

/* Android-proportioned frame for WhatsApp and browser mocks. 390×780 by default. */
export function PhoneScreen({ children, title, subtitle, chrome = "whatsapp", width = 390, height = 780, style }) {
  const wa = chrome === "whatsapp";
  return (
    <div
      style={{
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
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 14px 3px", fontSize: "12px", background: wa ? "#075E54" : "var(--brown-700)", color: "#fff" }}>
        <span>09.41</span>
        <span style={{ letterSpacing: "1px" }}>▮▮▮ 82%</span>
      </div>
      {title ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", background: wa ? "#075E54" : "var(--brown-700)", color: "#fff" }}>
          <span style={{ fontSize: "20px", lineHeight: "20px" }}>‹</span>
          <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--cream-200)", display: "grid", placeItems: "center", color: "var(--brown-700)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", flex: "0 0 auto" }}>K</span>
          <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <strong style={{ fontSize: "16px", fontWeight: 600 }}>{title}</strong>
            {subtitle ? <span style={{ fontSize: "12px", opacity: 0.85 }}>{subtitle}</span> : null}
          </span>
        </div>
      ) : null}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "6px", padding: wa ? "10px 8px" : 0 }}>{children}</div>
      {wa ? (
        <div style={{ display: "flex", gap: "8px", padding: "8px", background: "#F0F0F0", alignItems: "center" }}>
          <span style={{ flex: 1, background: "#fff", borderRadius: "18px", padding: "9px 12px", fontSize: "14px", color: "#8696A0" }}>Ketik pesan</span>
          <span style={{ width: 38, height: 38, borderRadius: "50%", background: "#075E54", color: "#fff", display: "grid", placeItems: "center" }}>➤</span>
        </div>
      ) : null}
    </div>
  );
}
