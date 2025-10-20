import keysLinkedList from "./only-keys-linked-list.js";

class HashSet {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.count = 0;
    this.buckets = Array(this.capacity);
  }

  growHashmap() {
    this.capacity *= 2;
    this.count = 0;
    let keysCopy = this.keys();

    this.buckets = Array(this.capacity);

    for (let i = 0; i < keysCopy.length; i++) {
      this.set(keysCopy[i]);
    }
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

  set(key) {
    let hashedKey = this.hash(key);
    if (hashedKey < 0 || hashedKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[hashedKey]) {
      if (this.has(key)) {
        this.buckets[hashedKey].overwrite(key);
        return;
      }
      this.buckets[hashedKey].append(key);
      this.count++;
    } else {
      this.buckets[hashedKey] = new keysLinkedList();
      this.buckets[hashedKey].append(key);
      this.count++;
    }

    this.currLoadFactor = this.count / this.capacity;

    if (this.currLoadFactor > this.loadFactor) {
      this.growHashmap();
    }
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
    if (hashedKey < 0 || hashedKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[hashedKey].contains(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    let hashedKey = this.hash(key);
    if (hashedKey < 0 || hashedKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
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

  keys() {
    let filteredArr = this.buckets.filter((element) => element);
    let result = [];
    for (let i = 0; i < filteredArr.length; i++) {
      result.push(...filteredArr[i].keysArray());
    }
    return result;
  }
}

const test = new HashSet();

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.set("moon");

console.log(test.buckets);
console.log(test.length());
console.log(test.capacity);
