import React, { useState } from "react";
import AddMenuPopup from "../popups/AddMenuPopup";
import MoreMenuPopup from "../popups/MoreMenuPopup";

import {
  HiOutlineHome,
  HiHome,
  HiOutlineShoppingCart,
  HiShoppingCart,
  HiOutlinePlusCircle,
  HiPlusCircle,
  HiOutlineUsers,
  HiUsers,
  HiOutlineDotsHorizontal,
  HiDotsHorizontal,
} from "react-icons/hi";

import { RiMoneyEuroCircleLine, RiMoneyEuroCircleFill } from "react-icons/ri";

export default function NavMenu({
  setView,
  activePopup,
  setActivePopup,
  currentView,
  setEditingTitle,
}) {
  const navStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "#111",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 999,
  };

  const addMenuStyle = {
    position: "fixed",
    bottom: "60px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#222",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    padding: "10px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 1000,
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
  };

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const toggleMoreMenu = () => {
    setShowMoreMenu((prev) => !prev);
    setActivePopup(null);
  };

  return (
    <>
      <div style={navStyle}>
        <button onClick={() => setView("main")} style={buttonStyle}>
          {currentView === "main" ? (
            <HiHome size={24} />
          ) : (
            <HiOutlineHome size={24} />
          )}
        </button>

        <button onClick={() => setView("shopping")} style={buttonStyle}>
          {currentView === "shopping" ? (
            <HiShoppingCart size={24} />
          ) : (
            <HiOutlineShoppingCart size={24} />
          )}
        </button>

        <button
          onClick={() =>
            setActivePopup(activePopup === "addMenu" ? null : "addMenu")
          }
          style={{
            ...buttonStyle,
            transform: activePopup === "addMenu" ? "scale(1.2)" : "none",
            transition: "transform 0.2s ease",
          }}
        >
          {activePopup === "addMenu" ? (
            <HiPlusCircle size={28} />
          ) : (
            <HiOutlinePlusCircle size={28} />
          )}
        </button>

        <button onClick={() => setView("expenses")} style={buttonStyle}>
          {currentView === "expenses" ? (
            <RiMoneyEuroCircleFill size={24} />
          ) : (
            <RiMoneyEuroCircleLine size={24} />
          )}
        </button>

        <button
          onClick={() => {
            setActivePopup(activePopup === "more" ? null : "more");
          }}
          style={buttonStyle}
        >
          {activePopup === "more" ? (
            <HiDotsHorizontal size={24} />
          ) : (
            <HiOutlineDotsHorizontal size={24} />
          )}
        </button>
      </div>

      {activePopup === "addMenu" && (
        <AddMenuPopup setActivePopup={setActivePopup} />
      )}

      {activePopup === "more" && (
        <MoreMenuPopup
          setActivePopup={setActivePopup}
          setEditingTitle={setEditingTitle}
        />
      )}
    </>
  );
}
