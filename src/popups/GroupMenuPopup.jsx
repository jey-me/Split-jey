import PopupWrapper from "../popups/PopupWrapper";

export default function GroupMenuPopup({
  onAdd,
  onEditToggle,
  isEditMode,
  onClearAll,
  onClose,
}) {
  return (
    <PopupWrapper title="Manage Group" onClose={onClose}>
      <button
        onClick={() => {
          onClose();
          onAdd(); 
        }}
      >
        ➕ Add Member
      </button>

      <button
        onClick={() => {
          onEditToggle();
          onClose();
        }}
      >
        ✏️ Edit Members
      </button>

    </PopupWrapper>
  );
}
