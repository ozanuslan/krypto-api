class HashTable {
  constructor() {
    this.table = new Array(137);
    this.values = [];
  }

  // Defining the hashing function which allows a sting to be used as a key
  hash(string) {
    const H = 37;
    let total = 0;

    for (var i = 0; i < string.length; i++) {
      total += H * total + string.charCodeAt(i);
    }
    total %= this.table.length;
    if (total < 1) {
      this.table.length - 1;
    }
    return parseInt(total);
  }

  showDistro() {
    for (const key in this.table) {
      if (this.table[key] !== undefined) {
        console.log(key, " : ", this.table[key]);
      }
    }
  }

  put(data) {
    const pos = this.hash(data);
    this.table[pos] = data;
  }

  get(key) {
    return this.table[this.hash(key)];
  }
}

// HashTable with Linear Probing technique of collision-resolution.
module.exports = class HashMap extends HashTable {
  constructor() {
    super();
    this.values = new Array();
  }

  put(key, data) {
    const pos = this.hash(key);
    if (this.table[pos] === undefined) {
      this.table[pos] = key;
      this.values[pos] = data;
    } else {
      while (this.table[pos] !== undefined) {
        pos++;
      }
      this.table[pos] = key;
      this.values[pos] = data;
    }
  }

  get(key) {
    const hash = this.hash(key);
    if (hash > -1) {
      for (let i = hash; this.table[i] !== undefined; i++) {
        if (this.table[i] === key) {
          return this.values[i];
        }
      }
    }
    return undefined;
  }

  containsKey(key) {
    const hash = this.hash(key);
    if (hash > -1) {
      for (let i = hash; this.table[i] !== undefined; i++) {
        if (this.table[i] === key) {
          return true;
        }
      }
    }
    return false;
  }
};
