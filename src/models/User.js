export class User {
  id;
  name;
  totalPaid;
  toRecieve; // {id:amount}
  constructor(objOrName) {
    if (typeof objOrName === "string") {
      this.id = Date.now();
      this.name = objOrName;
      this.totalPaid = 0;
      this.toRecieve = {};
    } else {
      this.id = objOrName.id;
      this.name = objOrName.name;
      this.totalPaid = objOrName.totalPaid;
      this.toRecieve = objOrName.toRecieve;
    }
  }
  getUpdatedClone({
    id = this.id,
    name = this.name,
    totalPaid = this.totalPaid,
    toRecieve = this.toRecieve,
  }) {
    let clone = new User(name);
    clone.id = id;
    clone.name = name;
    clone.totalPaid = totalPaid;
    clone.toRecieve = toRecieve;
    return clone;
  }
}
