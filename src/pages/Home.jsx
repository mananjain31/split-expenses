import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import { Link, useNavigate } from "react-router";
import TabbedPanel from "../components/TabbedPanel";
import UsersTable from "../components/UserTable";
import ExpenseHistory from "../components/ExpenseHistory";

function Home({ users, setUsers, expenses }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Final Calculations");
  const tabs = ["Final Calculations", "Expense History"];
  //   useEffect(() => {
  //     console.log("userEffect", localStorage.getItem("users"));
  //     let users_str = JSON.stringify({ users: users });
  //     let lsUsers = localStorage.getItem("users");
  //     console.log(lsUsers);
  //     if (localStorage.getItem("users")) {
  //         console.log();
  //       if (users_str == lsUsers) return;
  //     }
  //     localStorage.setItem("users", users_str);
  //   }, [users]);

  return (
    <div>
      <div>
        <TabbedPanel {...{ activeTab, setActiveTab, tabs }} />
        {activeTab === "Final Calculations" && <UsersTable users={users} />}
        {activeTab === "Expense History" && (
          <ExpenseHistory expenses={expenses} users={users} />
        )}
      </div>
    </div>
  );
}

export default Home;
