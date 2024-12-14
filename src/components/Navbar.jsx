import { Link } from "react-router";
import addIcon from "../assets/add-plus-svgrepo-com.svg";
import expenseIcon from "../assets/cash-register-svgrepo-com.svg";

export const AddUserLink = () => (
  <Link to="/add-user">
    <button className="flex items-center gap-1">
      Add User
      <img className="w-4" src={addIcon} alt="+" />
    </button>
  </Link>
);
export const AddExpenseLink = () => (
  <Link to="/add-expense">
    <button className="flex items-center gap-1">
      Add Expense
      <img className="w-4" src={expenseIcon} alt="+" />
    </button>
  </Link>
);

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row mb-4 md:mb-0">
      <Link to="/" className="flex">
        <h1>Split Expenses</h1>
      </Link>
      <div className="flex gap-4 py-4 flex-1  md:justify-end">
        <AddUserLink />
        <AddExpenseLink />
      </div>
    </nav>
  );
}
