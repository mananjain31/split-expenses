import React, { useState } from "react";
import { useAccordian } from "../hooks/useAccordian";
import arrowDown from "../assets/arrow-circle-down-svgrepo-com.svg";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";
import { AddExpenseLink } from "./Navbar.jsx";
import SplitsView from "./SplitsView.jsx";
import PopUpModal from "./PopUpModal.jsx";
import useToggle from "../hooks/useToggle.js";
import { useNavigate } from "react-router";

const ArrowComp = ({ open }) => (
  <img
    className={`w-6 min-w-5 ${
      open
        ? "transition-all duration-200 -rotate-180"
        : "transition-all duration-200 -rotate-0"
    }`}
    src={arrowDown}
  />
);

const DeleteIconButton = ({ onClick, id }) => (
  <button
    onClick={(ev) => onClick(ev, id)}
    className="bg-inherit px-2 py-2 flex text-red-200 focus:outline-none hover:border-red-400"
  >
    <img className={`text-red-300 w-6 min-w-5`} src={deleteIcon} />
  </button>
);

const EditIconButton = ({ onClick, id }) => (
  <button
    onClick={(ev) => onClick(ev, id)}
    className="bg-inherit px-2 py-2 flex focus:outline-none text-red-200 "
  >
    <img className={`text-red-300 w-6 min-w-5`} src={editIcon} />
  </button>
);

export default function ExpenseHistory({ deleteExpense, expenses, users }) {
  const { isAccOpen, toggleAccordian, toggleAllAccordian, allOpen } =
    useAccordian(expenses.length);

  const [popupOpen, togglePopup] = useToggle(false);
  const [selectedId, setSelectedId] = useState();

  const navigate = useNavigate();

  const getUserNameById = (id) => {
    for (const user of users) {
      if (user.id == id) return user.name;
    }
    return "";
  };

  const onEditClick = (ev, id) => {
    ev.stopPropagation();
    navigate("edit-expense/" + id);
  };

  const onDeleteClick = (ev, id) => {
    ev.stopPropagation();
    setSelectedId(id);
    togglePopup();
  };
  const deleteExpenseConfirmed = () => {
    togglePopup();
    if (selectedId !== 0 && !selectedId) return;
    // delete expense
    deleteExpense(selectedId);
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
            {expenses.length > 0 && (
              <>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  {expenses.length ? <ArrowComp open={allOpen} /> : <></>}
                </th>
              </>
            )}
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
              <React.Fragment key={expense.id + "tbodytr"}>
                <tr
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

                  <td scope="col" className="py-3">
                    <EditIconButton onClick={onEditClick} id={expense.id} />
                  </td>
                  <td scope="col" className="py-3">
                    <DeleteIconButton onClick={onDeleteClick} id={expense.id} />
                  </td>
                  <td className="px-6 py-4">
                    <ArrowComp open={isAccOpen[idx]} />
                  </td>
                </tr>
                <tr
                  className={`
                  bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                  `}
                >
                  <td colSpan={7}>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isAccOpen?.[idx] ? "max-h-screen" : "max-h-0"}`}
                    >
                      {/* <SplitsTable splits={expense.splits} users={users} /> */}
                      <SplitsView splits={expense.splits} users={users} />
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      <PopUpModal
        open={popupOpen}
        content={"Are you sure you want to delete this expense ?"}
        onAccept={deleteExpenseConfirmed}
        onClose={togglePopup}
      />
    </div>
  );
}
