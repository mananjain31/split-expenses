import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { User } from "./models/User";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import { Expense } from "./models/Expense";
import AddExpense from "./pages/AddExpense";
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
            element={<AddExpense {...{ users, addExpense }} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
