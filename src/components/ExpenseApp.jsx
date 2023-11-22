import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";

const ExpenseApp = () => {

  const [expenses, setExpenses] = useState([
    { id: 1, description: "Apple", amount: 10, category: "Groceries" },
    { id: 2, description: "Burger", amount: 10, category: "Fast food" },
    { id: 3, description: "Movie", amount: 10, category: "Entertainment" },
    { id: 4, description: "Shirt", amount: 10, category: "Cloths" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const deleteExpense = (id) => {
    console.log("Button Pressed ID: " + id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const onSubmit = (data) => {
    setExpenses([...expenses, {...data, id: expenses.length+1}])
  }

  const onSelectCategory = (category) => {
    setSelectedCategory(category);
  }

  // filter the expenses according to category
  const visibleExpenses = selectedCategory
  ? expenses.filter((expense) => expense.category === selectedCategory)
  : expenses;

  return (
    <>
        <div className="mb-5">
            <ExpenseForm onSubmit={onSubmit}/>
        </div>
        <div className="mb-3">
            <ExpenseFilter  onSelectCategory={onSelectCategory}/>
        </div>
        <div>
            <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense}/>
        </div>
    </>
  )
};

export default ExpenseApp;
