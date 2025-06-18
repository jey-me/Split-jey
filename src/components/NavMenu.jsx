import React, { useEffect, useRef, useState } from "react";
import AddMenuPopup from "../popups/AddMenuPopup";
import MoreMenuPopup from "../popups/MoreMenuPopup";
import {
  HiOutlineHome,
  HiHome,
  HiOutlineShoppingCart,
  HiShoppingCart,
  HiOutlinePlusCircle,
  HiPlusCircle,
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
  const navRef = useRef();
  const [dotLeft, setDotLeft] = useState(0);

  const buttonsRef = {
    main: useRef(),
    shopping: useRef(),
    add: useRef(),
    expenses: useRef(),
    more: useRef(),
  };

useEffect(() => {
  const currentKey =
    activePopup === "addMenu"
      ? "add"
      : activePopup === "more"
      ? "more"
      : currentView;

  const el = buttonsRef[currentKey]?.current;
  const nav = navRef.current;

  if (el && nav) {
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const newLeft = elRect.left + elRect.width / 2 - navRect.left - 6;
    setDotLeft(newLeft);
  }
}, [currentView, activePopup]);

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
  };

return (
  <>
    <div
      ref={navRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "65px",
        paddingBottom: "7px",
        paddingTop: "4px",
        background: "#111",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <button
        ref={buttonsRef.main}
        onClick={() => setView("main")}
        style={buttonStyle}
      >
        {currentView === "main" ? (
          <HiHome size={24} className="nav-icon active" />
        ) : (
          <HiOutlineHome size={24} className="nav-icon" />
        )}
      </button>

      <button
        ref={buttonsRef.shopping}
        onClick={() => setView("shopping")}
        style={buttonStyle}
      >
        {currentView === "shopping" ? (
          <HiShoppingCart size={24} className="nav-icon active" />
        ) : (
          <HiOutlineShoppingCart size={24} className="nav-icon" />
        )}
      </button>

      <button
        ref={buttonsRef.add}
        onClick={() =>
          setActivePopup(activePopup === "addMenu" ? null : "addMenu")
        }
        style={buttonStyle}
      >
        {activePopup === "addMenu" ? (
          <HiPlusCircle size={28} className="nav-icon active" />
        ) : (
          <HiOutlinePlusCircle size={28} className="nav-icon" />
        )}
      </button>

      <button
        ref={buttonsRef.expenses}
        onClick={() => setView("expenses")}
        style={buttonStyle}
      >
        {currentView === "expenses" ? (
          <RiMoneyEuroCircleFill size={24} className="nav-icon active" />
        ) : (
          <RiMoneyEuroCircleLine size={24} className="nav-icon" />
        )}
      </button>

      <button
        ref={buttonsRef.more}
        onClick={() => setActivePopup(activePopup === "more" ? null : "more")}
        style={buttonStyle}
      >
        {activePopup === "more" ? (
          <HiDotsHorizontal size={24} className="nav-icon active" />
        ) : (
          <HiOutlineDotsHorizontal size={24} className="nav-icon" />
        )}
      </button>

      <div className="nav-indicator" style={{ left: dotLeft }} />
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
)};
