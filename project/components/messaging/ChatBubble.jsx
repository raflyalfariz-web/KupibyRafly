import React from "react";

/* WhatsApp mock bubble. WhatsApp gives us no type or colour control, so the
   design lives in the structure of the message. These are the real WA
   surface colours, used only for mocks — not brand colours. */
export function ChatBubble({ children, from = "shop", time = "09.41", ticks = "read", style }) {
  const mine = from === "shop";
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", ...style }}>
      <div
        style={{
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
        }}
      >
        {children}
        <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "3px", marginTop: "2px", fontSize: "11px", color: "#667781" }}>
          {time}
          {mine ? <span style={{ color: ticks === "read" ? "#53BDEB" : "#667781", fontSize: "12px" }}>✓✓</span> : null}
        </span>
      </div>
    </div>
  );
}
