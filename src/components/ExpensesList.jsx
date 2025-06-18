import React from "react";

export default function ExpensesList({ expenses, people, onAddExpense }) {
  return (
    
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Expenses</h3>
        {onAddExpense && <button onClick={onAddExpense}>➕</button>}
      </div>

      {expenses.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.6, marginTop: 12 }}>
          No expenses yet.
        </p>
      ) : (
        <div style={{ marginTop: 6 }}>
          {expenses.map((exp, idx) => {
            const isSplitWithAll = exp.split_between.length === people.length;
            return (
              <div key={idx} style={{ marginBottom: 8 }}>
                <strong>{exp.paid_by}</strong> paid €{exp.amount} for{" "}
                <em>{exp.name}</em>, split between{" "}
                {isSplitWithAll ? "everyone" : exp.split_between.join(", ")}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
