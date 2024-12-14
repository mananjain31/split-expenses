import React from "react";
import SplitsTable from "./SplitsTable.jsx";
import { useAccordian } from "../hooks/useAccordian";
import arrowDown from "../assets/arrow-circle-down-svgrepo-com.svg";
import arrowUp from "../assets/arrow-circle-up-svgrepo-com.svg";
import { AddExpenseLink } from "./Navbar.jsx";

export default function ExpenseHistory({ expenses, users }) {
  const { isAccOpen, toggleAccordian, toggleAllAccordian, allOpen } =
    useAccordian(expenses.length);

  const getUserNameById = (id) => {
    for (const user of users) {
      if (user.id == id) return user.name;
    }
    return "";
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 cursor-pointer">
          <tr onClick={() => toggleAllAccordian()}>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Paid By
            </th>
            <th scope="col" className="px-6 py-3">
              Paid Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Date - Time
            </th>
            <th scope="col" className="px-6 py-3">
              <img
                className="w-6 min-w-5"
                src={!allOpen ? arrowDown : arrowUp}
                alt="expand-collapse all"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
              <th
                scope="row"
                colSpan={5}
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <AddExpenseLink />
              </th>
            </tr>
          ) : (
            expenses.map((expense, idx) => (
              <>
                <tr
                  key={expense.id + "tbodytr"}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => toggleAccordian(idx)}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {expense.description}
                  </th>
                  <td className="px-6 py-4">
                    {getUserNameById(expense.paidBy)}
                  </td>
                  <td className="px-6 py-4">{expense.totalPaid}</td>
                  <td className="py-4">{expense.dateTime}</td>
                  <td className="px-6 py-4">
                    <img
                      className="w-6 min-w-5"
                      src={isAccOpen[idx] ? arrowUp : arrowDown}
                    />
                  </td>
                </tr>
                <tr
                  className={`
                  bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                  `}
                >
                  <td colSpan={5}>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isAccOpen?.[idx] ? "max-h-screen" : "max-h-0"}`}
                    >
                      <SplitsTable splits={expense.splits} users={users} />
                    </div>
                  </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
