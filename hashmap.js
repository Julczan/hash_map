import linkedList from "./linked-list.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.count = 0;
    this.buckets = Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let hashedKey = this.hash(key);
    if (this.buckets[hashedKey]) {
      this.buckets[hashedKey].append(key, value);
      this.count++;
    } else {
      this.buckets[hashedKey] = new linkedList();
      this.buckets[hashedKey].append(key, value);
      this.count++;
      return;
    }
    this.buckets[hashedKey].overwrite(key, value);
  }

  get(key) {
    let hashedKey = this.hash(key);
    if (hashedKey < 0 || hashedKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[hashedKey]) {
      return this.buckets[hashedKey].contains(key);
    } else {
      return null;
    }
  }

  has(key) {
    let hashedKey = this.hash(key);
    if (this.buckets[hashedKey].contains(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    let hashedKey = this.hash(key);
    if (this.has(key)) {
      this.buckets[hashedKey].delete(key);
      if (!this.buckets[hashedKey].head()) {
        delete this.buckets[hashedKey];
      }
      this.count--;
      return true;
    } else {
      return false;
    }
  }

  length() {
    return this.count;
  }

  clear() {
    this.capacity = 16;
    this.count = 0;
    this.buckets = Array(this.capacity);
  }

  keys(key) {
    let filteredArr = this.buckets.filter((element) => element);
    let result = [];
    for (let i = 0; i < filteredArr.length; i++) {
      result.push(...filteredArr[i].keysArray());
    }
    return result;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.keys());

// test.set("apple", "brown");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray");
// test.set("frog", "green");
// test.set("grape", "purple");

// console.log(test.clear());
