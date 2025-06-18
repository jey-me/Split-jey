import React from "react";
import ExpensesList from "./ExpensesList";
import AddItemPopup from "../popups/AddItemPopup";
import AddMemberPopup from "../popups/AddMemberPopup";
import AddExpensePopup from "../popups/AddExpensePopup";
import GroupMenuPopup from "../popups/GroupMenuPopup";
import NavMenu from "./NavMenu";

export default function ExpensesPage({
  expenses,
  setExpenses,
  people,
  items,
  setItems,
  activePopup,
  setActivePopup,
  setView,
  simplifyExpenses,
  transactions,
  setPeople,
  editMode,
  handleEditToggle,
}) {
  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
    console.log("Expense added from ShoppingPage:", expense);
    setActivePopup(null);
  };
  const [expenseAddedMsg, setExpenseAddedMsg] = React.useState(false);
  const [itemAddedMsg, setItemAddedMsg] = React.useState(false);
  const [showExportMessage, setShowExportMessage] = React.useState(false);

  return (
    <React.Fragment>
      {showExportMessage && (
        <div
          style={{
            background: "#333",
            color: "#ff0",
            padding: "8px 12px",
            borderRadius: 8,
            margin: "10px auto",
            textAlign: "center",
            width: "fit-content",
            fontSize: "0.9rem",
            fontWeight: 500,
            opacity: 0.9,
          }}
        >
          🚧 Exports coming soon!
        </div>
      )}

      {itemAddedMsg && (
        <div
          style={{
            background: "#333",
            color: "#0f0",
            padding: "8px 12px",
            borderRadius: 8,
            marginBottom: 10,
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          ✅ Item added!
        </div>
      )}

      <div style={{ paddingBottom: 80 }}>
       

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <button onClick={simplifyExpenses}>Simplify</button>

          <button
            style={{ opacity: 0.5 }} 
            onClick={() => {
              setShowExportMessage(true);
              setTimeout(() => setShowExportMessage(false), 2000);
            }}
          >
            Export
          </button>
        </div>

        {transactions.length > 0 && (
          <div style={{ marginTop: 10 }}>
            {transactions.map((t, idx) => (
              <div key={idx}>
                {t.from} → {t.to}: €{t.amount}
              </div>
            ))}
          </div>
        )}

        <ExpensesList
          expenses={expenses}
          people={people}
          onAddExpense={() => setActivePopup("addExpense")}
        />

        {/* Popups */}

        {activePopup === "addItem" && (
          <AddItemPopup
            people={people}
            onAdd={(item) => {
              setItems([...items, item]);
              setActivePopup(null);
              setItemAddedMsg(true);
              setTimeout(() => setItemAddedMsg(false), 2000);
            }}
            onClose={() => setActivePopup(null)}
          />
        )}

        {activePopup === "addMember" && (
          <AddMemberPopup
            existingNames={people}
            onAdd={(newNames) => setPeople([...people, ...newNames])}
            onClose={() => setActivePopup(null)}
          />
        )}

        {activePopup === "group" && (
          <GroupMenuPopup
            onAdd={() => setActivePopup("addMember")}
            onEditToggle={handleEditToggle}
            isEditMode={editMode}
            onClearAll={() => setPeople([])}
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
          currentView="expenses"
        />
      </div>
    </React.Fragment>
  );
}
