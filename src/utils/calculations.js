export const getCalculations = (users) => {
  const matrix = [];
  const totalRecieving = users.map((u) => 0);
  const totalPaid = users.map((u) => u.totalPaid);

  for (const [i, user] of users.entries()) {
    const row = [];
    for (const [j, inuser] of users.entries()) {
      if (inuser.id === user.id) {
        row.push("-");
        continue;
      }
      let val =
        (inuser.toRecieve[user.id] || 0) - (user.toRecieve[inuser.id] || 0);
      totalRecieving[j] += val;
      row.push(val);
    }
    matrix.push(row);
  }

  return { matrix, totalRecieving, totalPaid };
};
//     {users.map((inuser) => {
//       let val = 0;
//       if (inuser.id === user.id) val = "-";
//       else val = user.toRecieve[inuser.id] || "-";
//       return (
//           title={`${inuser.name} owes ${user.name} - ${val} Amount`}
//           {val}
//         </td>
//       );
//     })}
//   </tr>
