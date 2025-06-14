import PopupWrapper from "../popups/PopupWrapper";

export default function GroupMenuPopup({ onAdd, onEditToggle, isEditMode, onClearAll, onClose }) {
  return (
    <PopupWrapper title="Manage Group" onClose={onClose}>
<button onClick={() => {
  onClose(); // Cierra el menú flotante
  onAdd();   // Llama la función que activa el popup de añadir miembros
}}>
  ➕ Add Member
</button>


      <br />
      <button onClick={() => {
        if (window.confirm("Remove all members?")) onClearAll();
        onClose();
      }}>🗑️ Remove All</button>
    </PopupWrapper>
  );
}
