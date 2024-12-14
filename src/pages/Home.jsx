import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import { Link, useNavigate } from "react-router";
import TabbedPanel from "../components/TabbedPanel";
import UsersTable from "../components/UserTable";
import ExpenseHistory from "../components/ExpenseHistory";
import clearIcon from "../assets/erase-text-svgrepo-com.svg";
import { clearLocalStorage } from "../utils/localstorage";

const ClearAllLocalStorageDataButton = ({ onClick }) => (
  <button className="flex items-center gap-1" onClick={onClick}>
    Clear All Records <img className="w-4" src={clearIcon} alt="+" />
  </button>
);

function Home({ users, setUsers, expenses, setExpenses }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Final Calculations");
  const tabs = ["Final Calculations", "Expense History"];
  const clearAllRecords = () => {
    clearLocalStorage();
    setUsers([]);
    setExpenses([]);
  };

  return (
    <div>
      <div>
        <TabbedPanel
          {...{ activeTab, setActiveTab, tabs }}
          actions={[
            <ClearAllLocalStorageDataButton onClick={clearAllRecords} />,
          ]}
        />
        {activeTab === "Final Calculations" && <UsersTable users={users} />}
        {activeTab === "Expense History" && (
          <ExpenseHistory expenses={expenses} users={users} />
        )}
      </div>
    </div>
  );
}

export default Home;
