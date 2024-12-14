import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function AddUser({ addUser }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    addUser(name);
    // setName("");
    navigate("/");
    return false;
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 my-4">
      <label htmlFor="name">Add User :</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        className="p-2"
        id="name"
        required
      />
      <button>Add</button>
      <Link to="/" className="text-white">
        <button type="button">Cancel</button>
      </Link>
    </form>
  );
}
