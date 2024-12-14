import { useEffect, useState } from "react";
import { getCalculations } from "../utils/calculations";

export default function UsersTable({ users, ...props }) {
  const [matrix, setMatrix] = useState(users.map(() => users.map((u) => [])));
  const [totalRecieving, setTotalRecieving] = useState([]);
  const [totalPaid, setTotalPaid] = useState([]);
  useEffect(() => {
    const { matrix, totalRecieving, totalPaid } = getCalculations(users);
    setMatrix(matrix);
    setTotalRecieving(totalRecieving);
    setTotalPaid(totalPaid);
  }, [users]);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Users
              </th>
              {users.map((user) => (
                <th key={user.id + "th"} scope="col" className="px-6 py-3">
                  {user.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, r) => (
              <tr
                key={user.id + "tbodytr"}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name} owes
                </th>
                {users.map((inuser, c) => {
                  let val = 0;
                  if (inuser.id === user.id) val = "-";
                  else val = user.toRecieve[inuser.id] || "-";
                  return (
                    <td
                      key={inuser.id + "inuser"}
                      className="px-6 py-4"
                      title={`${inuser.name} owes ${user.name} - ${val} Amount`}
                    >
                      {matrix[r] ? matrix[r][c] || "-" : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="mt-4 px-6 py-3 text-base"></th>
            </tr>
            <tr className="font-semibold text-gray-900 dark:text-white border dark:border-gray-700">
              <th scope="row" className="mt-4 px-6 py-3 text-base">
                Total Recieving
              </th>
              {totalRecieving.map((val, i) => (
                <td key={i + "i,val" + val} className="px-6 py-3">
                  {val}
                </td>
              ))}
            </tr>
            <tr className="font-semibold text-gray-900 dark:text-white border dark:border-gray-700">
              <th scope="row" className="px-6 py-3 text-base">
                Total Paid
              </th>
              {totalPaid.map((val, i) => (
                <td key={i + "i,val" + val} className="px-6 py-3">
                  {val}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
