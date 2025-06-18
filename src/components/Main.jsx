import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import ExpensesList from "./ExpensesList";
import AddExpensePopup from "../popups/AddExpensePopup";
import AddItemPopup from "../popups/AddItemPopup";
import AddMemberPopup from "../popups/AddMemberPopup";
import GroupMenuPopup from "../popups/GroupMenuPopup";
import NavMenu from "./NavMenu";
import ShoppingPage from "./ShoppingPage";
import ExpensesPage from "./ExpensesPage";

export default function Main() {
  const [tripTitle, setTripTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [people, setPeople] = useState(["Jey", "Eli", "Victor", "Yoli", "Alex", "Jordi"]);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = useState([]);
  const handleEditToggle = () => setEditMode((prev) => !prev);
  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const [view, setView] = useState("main");

  const simplifyExpenses = () => {
    const balances = {};
    people.forEach((person) => (balances[person] = 0));
    for (const expense of expenses) {
      const { paid_by, amount, split_between } = expense;
      const splitAmount = amount / split_between.length;
      split_between.forEach((person) => (balances[person] -= splitAmount));
      balances[paid_by] += amount;
    }
    for (const person in balances) {
      balances[person] = Math.round(balances[person] * 100) / 100;
    }
    const creditors = [],
      debtors = [];
    for (const person in balances) {
      const balance = balances[person];
      if (balance > 0) creditors.push({ person, amount: balance });
      else if (balance < 0) debtors.push({ person, amount: -balance });
    }
    const simplified = [];
    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const settledAmount = Math.min(debtor.amount, creditor.amount);
      simplified.push({
        from: debtor.person,
        to: creditor.person,
        amount: settledAmount.toFixed(2),
      });
      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;
      if (Math.abs(debtor.amount) < 0.01) i++;
      if (Math.abs(creditor.amount) < 0.01) j++;
    }
    setTransactions(simplified);
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      {view === "shopping" ? (
        <ShoppingPage
          items={items}
          setItems={setItems}
          people={people}
          expenses={expenses}
          setExpenses={setExpenses}
          setActivePopup={setActivePopup}
          activePopup={activePopup}
          setView={setView}
        />
      ) : view === "expenses" ? (
<ExpensesPage
  expenses={expenses}
  setExpenses={setExpenses}
  people={people}
  items={items}
  setItems={setItems}
  activePopup={activePopup}
  setActivePopup={setActivePopup}
  setView={setView}
  simplifyExpenses={simplifyExpenses}
  transactions={transactions}
  setPeople={setPeople}
  editMode={editMode}
  handleEditToggle={handleEditToggle}
/>
      ) : (
        <>
          <h3
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              opacity: 0.5,
              marginBottom: 1,
              marginTop: 2,
              textAlign: "center",
            }}
          >
            splitter by jey
          </h3>

          <div
            style={{
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {editingTitle ? (
              <input
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                onBlur={() => {
                  if (tripTitle.trim() !== "") setEditingTitle(false);
                }}
                placeholder="Enter trip name..."
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  width: "100%",
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  borderRadius: 6,
                }}
              />
            ) : (
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  flex: 1,
                  paddingLeft: 4,
                  textAlign: "center",
                }}
              >
                {tripTitle}
                <button
                  onClick={() => setEditingTitle(true)}
                  title="Edit trip name"
                  style={{
                    marginLeft: 12,
                    fontSize: "1rem",
                    background: "none",
                    border: "none",
                    color: "#666",
                    cursor: "pointer",
                  }}
                >
                  ✏️
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: 10, textAlign: "center" }}>
            <button onClick={simplifyExpenses}>Simplify</button>
          </div>

          <div>
            {transactions.map((t, idx) => (
              <div key={idx}>
                {t.from} → {t.to}: €{t.amount}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>Group Members</h3>
            <div style={{ display: "flex", gap: 10 }}>
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  style={{
                    background: "#333",
                    border: "1px solid #555",
                    padding: "4px 8px",
                    fontSize: "0.9rem",
                    borderRadius: 6,
                  }}
                >
                  ✅ Done Editing
                </button>
              )}
              <button
                onClick={() => setActivePopup("group")}
                title="Manage group"
              >
                ⚙️
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {people.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "#333",
                  padding: "6px 12px",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>
                  {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
                </span>
                {editMode && (
                  <button
                    onClick={() =>
                      setPeople((prev) => prev.filter((_, i) => i !== idx))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#f55",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                    title="Remove"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <ExpensesList
              expenses={expenses}
              people={people}
              onAddExpense={() => setActivePopup("addExpense")}
            />
          </div>

          <ShoppingList
            items={items}
            setItems={setItems}
            people={people}
            onAddItem={() => setActivePopup("addItem")}
          />

          <NavMenu
            setActivePopup={setActivePopup}
            activePopup={activePopup}
            setView={setView}
            currentView="main"
          />

          {activePopup === "addExpense" && (
            <AddExpensePopup
              people={people}
              onAdd={handleAddExpense}
              onClose={() => setActivePopup(null)}
            />
          )}

          {activePopup === "addItem" && (
            <AddItemPopup
              people={people}
              onAdd={(item) => setItems([...items, item])}
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
        </>
      )}
    </div>
  );
}
