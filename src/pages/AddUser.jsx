import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "../components/Input";

export default function AddUser({ addUser, checkDuplicateUsername }) {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-4 my-4 "
    >
      <h2 className="text-3xl">Add User</h2>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        id="name"
        required
      />
      {checkDuplicateUsername(name) && (
        <span className="text-red-300">{name} already present.</span>
      )}
      <span className="flex gap-2">
        <button
          className="disabled:bg-transparent disabled:border-red-300 disabled:hover:cursor-not-allowed"
          disabled={checkDuplicateUsername(name)}
        >
          Add
        </button>
        <Link to="/" className="text-white">
          <button type="button">Cancel</button>
        </Link>
      </span>
    </form>
  );
}
