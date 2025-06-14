import React, { useState, useMemo } from "react";
import AddItemPopup from "../popups/AddItemPopup";
import { getColorForTag } from "../utils/tagColors";

export default function ShoppingList({ people, items, setItems }) {
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    storeTag: null,
    useTag: null,
    assignedTo: null
  });

  const toggleBought = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this item?")) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    alert("Edit feature pending");
  };

  const renderTag = (label) => {
    const color = getColorForTag(label);
    return (
      <span
        key={label}
        style={{
          backgroundColor: color,
          opacity: 0.7,
          borderRadius: 12,
          padding: "4px 10px",
          fontSize: "0.75rem",
          color: "#000",
          fontWeight: 500,
          marginRight: 6,
          display: "inline-block",
          marginTop: 4,
        }}
      >
        {label}
      </span>
    );
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v !== null);


  const renderTagLabelValue = (label, value) =>
    value ? renderTag(`${label}: ${value}`) : null;

  const storeTags = useMemo(
    () => [...new Set(items.map((i) => i.storeTag).filter(Boolean))],
    [items]
  );
  const useTags = useMemo(
    () => [...new Set(items.map((i) => i.useTag).filter(Boolean))],
    [items]
  );
  const assignedTags = useMemo(
    () => [...new Set(items.map((i) => i.assignedTo).filter(Boolean))],
    [items]
  );

  const filteredItems = items.filter((item) => {
    if (activeFilters.storeTag && item.storeTag !== activeFilters.storeTag)
      return false;
    if (activeFilters.useTag && item.useTag !== activeFilters.useTag)
      return false;
    if (activeFilters.assignedTo && item.assignedTo !== activeFilters.assignedTo)
      return false;
    return true;
  });

  const FilterGroup = ({ label, options, filterKey }) => (
    <div style={{ marginBottom: 6 }}>
      <strong style={{ fontSize: '0.8rem', opacity: 0.7 }}>{label}</strong>{" "}
      {options.map((tag) => {
        const isActive = activeFilters[filterKey] === tag;
        return (
          <button
            key={tag}
            onClick={() =>
              setActiveFilters((prev) => ({
                ...prev,
                [filterKey]: prev[filterKey] === tag ? null : tag
              }))
            }
            style={{
              backgroundColor: getColorForTag(tag),
              opacity: isActive ? 1 : 0.5,
              color: "#000",
              fontWeight: 500,
              fontSize: "0.75rem",
              padding: "4px 10px",
              borderRadius: 20,
              border: isActive ? "2px solid #000" : "1px solid #aaa",
              marginRight: 6,
              marginTop: 4,
              cursor: "pointer"
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Shopping List</h3>
        <button onClick={() => setShowAddItem(true)}>➕</button>
      </div>

      {items.length >= 2 && (
        <div style={{ marginTop: 10, marginBottom: 12 }}>
          <FilterGroup label="Store" options={storeTags} filterKey="storeTag" />
          <FilterGroup label="Use tag" options={useTags} filterKey="useTag" />
          <FilterGroup label="Assigned to" options={assignedTags} filterKey="assignedTo" />
        </div>
      )}

      {hasActiveFilters && (
  <div style={{ marginBottom: 10 }}>
    <button
      onClick={() =>
        setActiveFilters({ storeTag: null, useTag: null, assignedTo: null })
      }
      style={{
        background: "#444",
        color: "#fff",
        fontSize: "0.75rem",
        padding: "6px 10px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer"
      }}
    >
      ✖️ Clear Filters
    </button>
  </div>
)}


      <div style={{ marginTop: 10 }}>
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: 12,
              marginBottom: 10,
              borderRadius: 8,
              border: "1px solid #ddd",
              opacity: item.bought ? 0.5 : 1,
              background: item.bought ? "#333" : "#222",
              transition: "opacity 0.3s",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{item.name}</strong>{" "}
                {item.quantity && (
                  <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                    — Quantity: {item.quantity}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => toggleBought(idx)} title="Mark as bought">✅</button>
                <button onClick={() => handleEdit(idx)} title="Edit">✏️</button>
                <button onClick={() => handleDelete(idx)} title="Delete">🗑️</button>
              </div>
            </div>
            <div style={{ marginTop: 6 }}>
              {renderTagLabelValue("Store", item.storeTag)}
              {renderTagLabelValue("Use", item.useTag)}
              {renderTagLabelValue("Assigned to", item.assignedTo)}
            </div>
          </div>
        ))}
      </div>

      {showAddItem && (
        <AddItemPopup
          people={people}
          onAdd={(item) => {
            setItems((prev) => [...prev, item]);
            setShowAddItem(false);
          }}
          onClose={() => setShowAddItem(false)}
        />
      )}
    </div>
  );
}
