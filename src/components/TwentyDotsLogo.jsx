import React from "react";

export default function TwentyDotsLogo() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "0.7rem",
      marginTop: "0.7rem",
      zIndex: 1,
      userSelect: "none"
    }}>
      <span style={{
        fontWeight: 900,
        fontSize: "2.3rem",
        letterSpacing: "2px",
        color: "#222",
      }}>
        TWENTY
      </span>
      <span style={{ display: "flex", gap: "0.5rem", marginTop: "0.2rem" }}>
        <span style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: "#fc6262", color: "#fff", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: "1.3rem", boxShadow: "0 2px 10px #fc626233"
        }}>d</span>
        <span style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: "#3ddc97", color: "#fff", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: "1.3rem", boxShadow: "0 2px 10px #3ddc9733"
        }}>o</span>
        <span style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: "#ffe156", color: "#333", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: "1.3rem", boxShadow: "0 2px 10px #ffe15633"
        }}>t</span>
        <span style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: "#3e6ff4", color: "#fff", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: "1.3rem", boxShadow: "0 2px 10px #3e6ff433"
        }}>s</span>
      </span>
    </div>
  );
}