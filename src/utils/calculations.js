import { f } from "./floatConverter";

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

export const getUpdatedUsersformExpenses = (users, expenses) => {
  return users.map((user) => {
    let totalPaid = 0;
    let toRecieve = {};
    expenses.forEach((expense) => {
      if (user.id == expense.paidBy)
        totalPaid = f(totalPaid) + f(expense.totalPaid);
      else
        for (const split of expense.splits)
          toRecieve[split.id] = f(toRecieve[split.id] || 0) + f(split.amount);
    });
    return user.getUpdatedClone({ totalPaid, toRecieve });
  });
};

// export class Expense {
//   id;
//   description;
//   paidBy; //id
//   splits; // [{id,amount}]
//   totalPaid; // [{id,amount}]
//   dateTime;
//   constructor({ id, description, paidBy, splits, totalPaid, dateTime }) {
//     let nowDate = Date.now();
//     this.id = id || nowDate;
//     this.description = description;
//     this.paidBy = paidBy;
//     this.splits = splits;
//     this.totalPaid = totalPaid;
//     this.dateTime = dateTime || formatDate(nowDate);
//   }
// }

// export class User {
//   id;
//   name;
//   totalPaid;
//   toRecieve; // {id:amount}
//   constructor(objOrName) {
//     if (typeof objOrName === "string") {
//       this.id = Date.now();
//       this.name = objOrName;
//       this.totalPaid = 0;
//       this.toRecieve = {};
//     } else {
//       this.id = objOrName.id;
//       this.name = objOrName.name;
//       this.totalPaid = objOrName.totalPaid;
//       this.toRecieve = objOrName.toRecieve;
//     }
//   }
//   getUpdatedClone({
//     id = this.id,
//     name = this.name,
//     totalPaid = this.totalPaid,
//     toRecieve = this.toRecieve,
//   }) {
//     let clone = new User(name);
//     clone.id = id;
//     clone.name = name;
//     clone.totalPaid = totalPaid;
//     clone.toRecieve = toRecieve;
//     return clone;
//   }
// }
