import { formatDate } from "../utils/formatDate.js";

export class Expense {
  id;
  description;
  paidBy; //id
  splits; // [{id,amount}]
  totalPaid; // [{id,amount}]
  dateTime;
  constructor({ id, description, paidBy, splits, totalPaid, dateTime }) {
    let nowDate = Date.now();
    this.id = id || nowDate;
    this.description = description;
    this.paidBy = paidBy;
    this.splits = splits;
    this.totalPaid = totalPaid;
    this.dateTime = dateTime || formatDate(nowDate);
  }
}
