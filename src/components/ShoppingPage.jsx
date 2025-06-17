import React from "react";
import ShoppingList from "./ShoppingList";
import NavMenu from "./NavMenu";
import AddItemPopup from "../popups/AddItemPopup";
import AddExpensePopup from "../popups/AddExpensePopup";

export default function ShoppingPage({
  items,
  setItems,
  people,
  expenses,
  setExpenses,
  activePopup,
  setActivePopup,
  setView,
}) {
  const handleAddItem = (item) => {
    setItems((prev) => [...prev, item]);
    setActivePopup(null);
  };
  const handleAddExpense = (expense) => {
    console.log("Expense added from ShoppingPage:", expense);
    setActivePopup(null);
  };
  const [expenseAddedMsg, setExpenseAddedMsg] = React.useState(false);

  return (
    <div>
      {expenseAddedMsg && (
        <div
          style={{
            background: "#333",
            color: "#0f0",
            padding: "8px 12px",
            borderRadius: 8,
            margin: "10px auto",
            textAlign: "center",
            width: "fit-content",
            fontSize: "0.9rem",
          }}
        >
          ✅ Expense added!
        </div>
      )}

      <ShoppingList
        items={items}
        setItems={setItems}
        people={people}
        onAddItem={() => setActivePopup("addItem")}
      />

      {activePopup === "addItem" && (
        <AddItemPopup
          people={people}
          onAdd={handleAddItem}
          onClose={() => setActivePopup(null)}
        />
      )}

      {activePopup === "addExpense" && (
        <AddExpensePopup
          people={people}
          onAdd={(expense) => {
            setExpenses((prev) => [...prev, expense]);
            setActivePopup(null);
            setExpenseAddedMsg(true); // mostrar mensaje
            setTimeout(() => setExpenseAddedMsg(false), 2000); // ocultar tras 2s
          }}
          onClose={() => setActivePopup(null)}
        />
      )}

      <NavMenu
        setView={setView}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
        currentView="shopping"
      />
    </div>
  );
}
