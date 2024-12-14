import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Label from "../components/Label";
import Input from "../components/Input";
import FormGroup from "../components/FormGroup";
import Select from "../components/Select";
import { split } from "postcss/lib/list";

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
      console.log(
        parseFloat(calcTot).toFixed(2),
        parseFloat(totalAmt).toFixed(2)
      );
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
        <FormGroup>
          <Label htmlFor="name">Description</Label>
          <Input
            type="text"
            placeholder="desc"
            value={desc}
            onChange={(ev) => setDesc(ev.target.value)}
            id="desc"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="totalAmount">Total Amount Paid</Label>
          <Input
            type="number"
            placeholder="Name"
            value={totalAmt}
            onChange={(ev) => setTotalAmt(ev.target.value)}
            id="totalAmt"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="padiBy">Paid By</Label>
          <Select
            value={paidBy}
            onChange={(ev) => setPaidBy(ev.target.value)}
            className="py-2 px-4"
            id="paidBy"
            options={users.map((user) => [user.id, user.name])}
            required
          />
        </FormGroup>
        <FormGroup className="pt-6">
          <Label className="text-2xl font-normal">Splits:-</Label>
          <button type="button" onClick={splitEqually}>
            Click here to split equally
          </button>
        </FormGroup>
        {splits.map((split) => (
          <FormGroup key={split.id + "ads"}>
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
          </FormGroup>
        ))}
        <div className="flex gap-4 py-2">
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
