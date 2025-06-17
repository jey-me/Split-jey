import React, { useState } from "react";
import PopupWrapper from "../popups/PopupWrapper";

export default function AddMemberPopup({ existingNames, onAdd, onClose }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    const newNames = input
      .split(",")
      .map(name => name.trim())
      .filter(name => name && !existingNames.includes(name));

    if (newNames.length > 0) onAdd(newNames);
    onClose();
  };

  return (
    <PopupWrapper title="Add Member(s)" onClose={onClose}>
      <label>
        Enter name(s), separated by commas:
        <input          
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", marginTop: 8 }}
        />
      </label>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Add</button>
      </div>
    </PopupWrapper>
  );
}
