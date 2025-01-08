import { useState } from "react";
import { useNavigate } from "react-router";
import useToggle from "../hooks/useToggle";
import TabbedPanel from "../components/TabbedPanel";
import UsersTable from "../components/UserTable";
import ExpenseHistory from "../components/ExpenseHistory";
import clearIcon from "../assets/erase-text-svgrepo-com.svg";
import { clearLocalStorage } from "../utils/localstorage";
import PopUpModal from "../components/PopUpModal";

const ClearAllLocalStorageDataButton = ({ onClick }) => (
  <button
    data-modal-target="popup-modal"
    tabIndex={10}
    className="flex items-center gap-1"
    onClick={onClick}
  >
    Clear All Records <img className="w-4" src={clearIcon} alt="+" />
  </button>
);

function Home({ users, setUsers, expenses, setExpenses, deleteExpense }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Final Calculations");
  const [popupOpen, togglePopup] = useToggle(false);
  const tabs = ["Final Calculations", "Expense History"];
  const clearAllRecords = () => {
    clearLocalStorage();
    setUsers([]);
    setExpenses([]);
    togglePopup();
  };

  return (
    <div>
      <div>
        <TabbedPanel
          {...{ activeTab, setActiveTab, tabs }}
          actions={[<ClearAllLocalStorageDataButton onClick={togglePopup} />]}
        />
        {activeTab === "Final Calculations" && <UsersTable users={users} />}
        {activeTab === "Expense History" && (
          <ExpenseHistory
            deleteExpense={deleteExpense}
            expenses={expenses}
            users={users}
          />
        )}
      </div>
      <PopUpModal
        content={`Are you sure you want to clear All records (users and expenses data)?`}
        open={popupOpen}
        onClose={togglePopup}
        onAccept={clearAllRecords}
      />
    </div>
  );
}

export default Home;
