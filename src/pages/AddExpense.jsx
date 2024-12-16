import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Label from "../components/Label";
import Input from "../components/Input";
import FormGroup from "../components/FormGroup";
import Select from "../components/Select";
import handScissor from "../assets/hand-scissors.svg";

export default function AddExpense({ users, addExpense }) {
  const [desc, setDesc] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [paidBy, setPaidBy] = useState(" ");
  const [splits, setSplits] = useState([]);
  const [unsplittedAmt, setUnsplittedAmt] = useState(0);

  const navigate = useNavigate();

  const updateSplit = (id, _val) => {
    let val = parseFloat(_val).toFixed(2);
    if (val.toString() === "NaN") val = 0;
    setSplits((splits) => {
      let calcTot = 0;
      const updatedSplits = splits.map((split) => {
        let amount = split.amount;
        if (split.id == id) amount = val;
        calcTot =
          Number(parseFloat(calcTot).toFixed(2)) +
          Number(parseFloat(amount).toFixed(2));
        return { ...split, amount };
      });
      if (
        Number(parseFloat(calcTot).toFixed(2)) <=
        Number(parseFloat(totalAmt).toFixed(2))
      )
        return updatedSplits;

      return splits;
    });
  };

  const splitEqually = () => {
    setSplits((splits) => {
      let length = splits.length;
      let equalAmt = Number(parseFloat(Number(totalAmt) / length).toFixed(2));
      return splits.map((split) => ({ ...split, amount: equalAmt }));
    });
  };

  const resetSplits = () => {
    setSplits((splits) => splits.map((split) => ({ ...split, amount: 0 })));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    addExpense(desc, paidBy, splits, totalAmt);
    navigate("/");
    return false;
  };

  useEffect(() => {
    setSplits(users.map(({ id, name }) => ({ id, name, amount: 0 })));
  }, [users]);

  useEffect(() => {
    let splittedAmt = 0;
    for (const split of splits)
      splittedAmt =
        Number(parseFloat(splittedAmt).toFixed(2)) +
        Number(parseFloat(split.amount).toFixed(2));
    let unsplittedAmt = Number(totalAmt) - Number(splittedAmt);
    if (unsplittedAmt < 0) {
      resetSplits();
      setUnsplittedAmt(totalAmt);
    }
    setUnsplittedAmt(parseFloat(unsplittedAmt).toFixed(2));
  }, [splits, totalAmt]);

  return (
    <>
      <div className="flex my-4">
        <h2 className="text-3xl">Add Expenses</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-start gap-2 "
      >
        <div className="flex flex-wrap gap-4  md:gap-8">
          <FormGroup>
            <Input
              autoFocus
              label="Description"
              className="w-32"
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(ev) => setDesc(ev.target.value)}
              id="desc"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              label="Total Amout Paid"
              type="number"
              value={totalAmt}
              onChange={(ev) => setTotalAmt(ev.target.value)}
              id="totalAmt"
              required
            />
          </FormGroup>
          <FormGroup>
            <Select
              label="Paid By"
              value={paidBy}
              onChange={(ev) => setPaidBy(ev.target.value)}
              id="paidBy"
              options={users.map((user) => [user.id, user.name])}
              placeholder="Paid by"
              required
            />
          </FormGroup>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

        <FormGroup className="">
          <Label className="text-3xl font-normal">Splits</Label>
          <button
            type="button"
            onClick={splitEqually}
            className="flex items-center gap-1"
          >
            Split equally
            <img className="w-7" src={handScissor} alt="+" />
          </button>
        </FormGroup>
        {splits.map((split) => (
          <div key={split.id + "ads"} className="grid grid-cols-2 text-left">
            <Label>{split.name}</Label>
            <Input
              type="number"
              placeholder="Name"
              value={split.amount}
              onChange={(ev) => updateSplit(split.id, ev.target.value)}
              id="totalAmt"
              required
              step=".02"
            />
          </div>
          // <FormGroup key={split.id + "ads"}>
          //   <Label>{split.name}</Label>
          //   <Input
          //     type="number"
          //     placeholder="Name"
          //     value={split.amount}
          //     onChange={(ev) => updateSplit(split.id, ev.target.value)}
          //     id="totalAmt"
          //     required
          //     step=".02"
          //   />
          // </FormGroup>
        ))}
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex gap-4">
          <button>
            Add Expense {"( Unsplitted Amount = " + unsplittedAmt + ")"}
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
