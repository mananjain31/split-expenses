import React from "react";

export default function AccorianTable({ splits, users }) {
  const getSplitAmtByUserId = (userId) => {
    for (const split of splits) {
      if (split.id === userId) return split.amount;
    }
    return "-";
  };
  return (
    <div className="relative overflow-x-auto py-2 px-2">
      <table className="w-full text-sm text-left rtl:text-right text-teal-500 dark:text-teal-400">
        <thead className="text-xs text-teal-700  bg-teal-50 dark:bg-teal-700 dark:text-teal-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Users
            </th>
            {users.map((user) => (
              <th key={user.id + "split"} scope="col" className="px-6 py-3">
                user.name
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-teal-800 dark:border-teal-700 ">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-teal-900 whitespace-nowrap dark:text-white"
            >
              Splits
            </th>
            {users.map((user) => (
              <td className="px-6 py-4" key={user.id + "amt"}>
                {getSplitAmtByUserId(user.id)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
