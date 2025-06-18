import React, { useMemo } from "react";
import { getColorForTag } from "../utils/tagColors";
import { FiCheckCircle, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ShoppingList({ items, setItems, people, onAddItem }) {
  const [activeFilters, setActiveFilters] = React.useState({
    bought: "all",
    storeTag: null,
    useTag: null,
    assignedTo: null,
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

  const tagStyle = {
    background: "#eee",
    color: "#333",
    fontSize: "0.65rem",
    fontWeight: 500,
    padding: "2px 6px",
    borderRadius: "12px",
    marginRight: 4,
    marginTop: 2,
  };

  const storeTags = useMemo(
    () => [...new Set(items.map((i) => i.storeTag).filter(Boolean))],
    [items]
  );
  const assignedTags = useMemo(
    () => [...new Set(items.map((i) => i.assignedTo).filter(Boolean))],
    [items]
  );
  const useTags = useMemo(
    () => [...new Set(items.map((i) => i.useTag).filter(Boolean))],
    [items]
  );

  const filteredItems = items.filter((item) => {
    if (activeFilters.bought !== "all" && item.bought !== activeFilters.bought)
      return false;
    if (activeFilters.storeTag && item.storeTag !== activeFilters.storeTag)
      return false;
    if (
      activeFilters.assignedTo &&
      item.assignedTo !== activeFilters.assignedTo
    )
      if (activeFilters.useTag && item.useTag !== activeFilters.useTag)
        return false;
        return true;
  });

  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Shopping List</h3>
        {onAddItem && <button onClick={onAddItem}>➕</button>}
      </div>

      {items.length >= 2 && (
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <select
            value={activeFilters.bought}
            onChange={(e) =>
              setActiveFilters((prev) => ({
                ...prev,
                bought:
                  e.target.value === "all" ? "all" : e.target.value === "true",
              }))
            }
          >
            <option value="all">All</option>
            <option value="true">Bought</option>
            <option value="false">Pending</option>
          </select>

          <select
            value={activeFilters.storeTag || ""}
            onChange={(e) =>
              setActiveFilters((prev) => ({
                ...prev,
                storeTag: e.target.value || null,
              }))
            }
          >
            <option value="">Store</option>
            {storeTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            value={activeFilters.assignedTo || ""}
            onChange={(e) =>
              setActiveFilters((prev) => ({
                ...prev,
                assignedTo: e.target.value || null,
              }))
            }
          >
            <option value="">Assigned to</option>
            {assignedTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            value={activeFilters.useTag || ""}
            onChange={(e) =>
              setActiveFilters((prev) => ({
                ...prev,
                useTag: e.target.value || null,
              }))
            }
          >
            <option value="">Use tag</option>
            {useTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {Object.values(activeFilters).some(v => v && v !== "all") && (
  <button
    className={`fade-clear ${
    Object.values(activeFilters).some(v => v && v !== "all") ? "" : "hidden"
  }`}
  onClick={() =>
    setActiveFilters({
      bought: "all",
      storeTag: null,
      useTag: null,
      assignedTo: null,
    })
  }
  style={{
    background: "#444",
    color: "#fff",
    fontSize: "0.75rem",
    padding: "6px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    marginTop: 4,
  }}

>
  ✖️ Clear Filters
</button>

)}
        </div>
      )}

      {filteredItems.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: item.bought ? "#333" : "#222",
            color: "#fff",
            padding: "8px 10px",
            borderRadius: 8,
            marginBottom: 8,
            fontSize: "0.9rem",
            opacity: item.bought ? 0.5 : 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FiCheckCircle
            onClick={() => toggleBought(idx)}
            title="Mark as bought"
            style={{
              cursor: "pointer",
              color: item.bought ? "#0a0" : "#646cff",
              flexShrink: 0,
              fontSize: "1.8rem",
              marginRight: "10px",
              transition: "transform 0.2s ease, color 0.2s ease",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.9)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          <div
            style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <span style={{ fontWeight: 600 }}>
              {item.name}
              {item.quantity && <span> – {item.quantity}</span>}
            </span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                marginTop: 4,
              }}
            >
              {item.storeTag && (
                <span style={{ ...tagStyle, backgroundColor: "#1abc9c" }}>
                  Store
                </span>
              )}
              {item.useTag && (
                <span style={{ ...tagStyle, backgroundColor: "#e91e63" }}>
                  Use tag
                </span>
              )}
              {item.assignedTo && (
                <span style={{ ...tagStyle, backgroundColor: "#f1c40f" }}>
                  Assigned to
                </span>
              )}
            </div>
          </div>

          <span
            style={{
              display: "flex",
              gap: 12,
              fontSize: "1.8rem",
              marginRight: "2px",
            }}
          >
            <FiEdit2
              onClick={() => handleEdit(idx)}
              title="Edit"
              style={{
                cursor: "pointer",
                color: "#646cff",
                marginRight: "10px",
                transition: "transform 0.2s ease, color 0.2s ease",
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.9)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
            <FiTrash2
              onClick={() => handleDelete(idx)}
              title="Delete"
              style={{
                cursor: "pointer",
                color: "#646cff",
                transition: "transform 0.2s ease, color 0.2s ease",
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.9)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </span>
        </div>
      ))}
    </div>
  );
}
