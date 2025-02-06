import { Expense } from "../models/Expense";
import { User } from "../models/User";

export const updateLocalStorage = (obj) => {
  const lsobj = localStorage.getItem("obj1");
  const currObj = lsobj ? JSON.parse(lsobj) : { users: [], expenses: [] };
  localStorage.setItem("obj1", JSON.stringify({ ...currObj, ...obj }));
};

export const clearLocalStorage = () => {
  // localStorage.clear();
  localStorage.setItem("obj1", JSON.stringify({ users: [], expenses: [] }));
};

export const setStateFromLocalStorage = (_setUsers, _setExpenses) => {
  let lsobj = localStorage.getItem("obj1");
  if (lsobj) {
    _setUsers(
      JSON.parse(lsobj)?.users
        ? JSON.parse(lsobj)?.users.map((user) => new User(user))
        : []
    );
    _setExpenses(
      JSON.parse(lsobj)?.expenses
        ? JSON.parse(lsobj)?.expenses.map((expense) => new Expense(expense))
        : []
    );
  }
};

export const getFromLocalStorage = (name) => {
  let lsobj = localStorage.getItem("obj1");
  switch (name) {
    case "expenses":
      return JSON.parse(lsobj)?.expenses
        ? JSON.parse(lsobj)?.expenses.map((expense) => new Expense(expense))
        : [];
    case "expenses":
      return JSON.parse(lsobj)?.expenses
        ? JSON.parse(lsobj)?.expenses.map((expense) => new Expense(expense))
        : [];
    default:
      throw new Error(`Invalid state name to fetch from localstorage: ${name}`);
  }
};

export const setterWithLocalStorage = (name, setter) => (arg) => {
  if (typeof arg === "function") {
    setter((state) => {
      const updatedVal = arg(state);
      updateLocalStorage({ [name]: updatedVal });
      return updatedVal;
    });
  } else {
    updateLocalStorage(arg);
    setter(arg);
  }
};
