import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { User } from "./models/User";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import { Expense } from "./models/Expense";
import AddOrEditExpense from "./pages/AddOrEditExpense";
import {
  clearLocalStorage,
  setStateFromLocalStorage,
  setterWithLocalStorage,
} from "./utils/localstorage";
import { f } from "./utils/floatConverter";
import { getUpdatedUsersformExpenses } from "./utils/calculations";
import Navbar from "./components/Navbar";

function App() {
  const [users, _setUsers] = useState([]);
  const [expenses, _setExpenses] = useState([]);

  const setUsers = setterWithLocalStorage("users", _setUsers);
  const setExpenses = setterWithLocalStorage("expenses", _setExpenses);

  useEffect(() => {
    setStateFromLocalStorage(_setUsers, _setExpenses);
    // clearLocalStorage();
  }, []);
  useEffect(() => {
    setUsers((users) => getUpdatedUsersformExpenses(users, expenses));
  }, [expenses]);

  const addUser = (name) => {
    setUsers((users) => [new User(name), ...users]);
  };

  const addExpense = (description, paidBy, splits, paid) => {
    setExpenses((expenses) => [
      ...expenses,
      new Expense({ description, paidBy, splits, totalPaid: paid }),
    ]);
  };
  const updateExpense = (id, description, paidBy, splits, paid) => {
    setExpenses((expenses) =>
      expenses.map((expense) => {
        console.log(expense.id, id);
        return expense.id == id
          ? new Expense({ description, paidBy, splits, totalPaid: paid })
          : expense;
      })
    );
  };
  const deleteExpense = (id) => {
    console.log(id);
    setExpenses((expenses) => [...expenses.filter((e) => e.id !== id)]);
  };
  const checkDuplicateUsername = (name) => {
    for (const user of users) if (name === user.name) return true;
    return false;
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className=" lg:mx-32">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                {...{
                  users,
                  setUsers,
                  addUser,
                  expenses,
                  setExpenses,
                  deleteExpense,
                }}
              />
            }
          />
          <Route
            path="/add-user"
            element={
              <AddUser
                addUser={addUser}
                checkDuplicateUsername={checkDuplicateUsername}
              />
            }
          />
          <Route
            path="/add-expense"
            element={<AddOrEditExpense {...{ users, addExpense }} />}
          />
          <Route
            path="/edit-expense/:id"
            element={
              <AddOrEditExpense
                edit
                {...{ users, expenses, addExpense, updateExpense }}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
