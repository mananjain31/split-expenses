import React from "react";
import Input from "./Input";

export default function SplitsView({ splits, users }) {
  const getSplitAmtByUserId = (userId) => {
    for (const split of splits) {
      if (split.id === userId) return split.amount;
    }
    return "-";
  };
  return (
    <>
      <h2 className="px-5 py-2 text-xl">Splits:</h2>
      <div className="flex flex-wrap gap-4 py-2 px-5">
        {users.map((user) => (
          <Input
            key={user.id + "splitsview"}
            label={user.name}
            value={getSplitAmtByUserId(user.id)}
            disabled
            className="min-w-2"
          />
        ))}
      </div>
    </>
  );
}
