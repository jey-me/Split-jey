import React from "react";
import NavMenu from "../components/navMenu";

export default function ShoppingPage({ setActivePopup, activePopup, setView }) {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>🛒 Shopping List</h2>
      <p style={{ textAlign: "center", marginBottom: 30, opacity: 0.6 }}>
        Aquí verás los ítems agregados a la lista de compras (próximamente).
      </p>

      {/* Aquí podrías renderizar la lista en el futuro */}
      <div
        style={{
          textAlign: "center",
          padding: 20,
          border: "1px dashed #999",
          borderRadius: 12,
        }}
      >
        Coming soon...
      </div>

      {/* Menú de navegación */}
      <NavMenu
        setActivePopup={setActivePopup}
        activePopup={activePopup}
        setView={setView}
      />
    </div>
  );
}
