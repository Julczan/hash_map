class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class linkedList {
  constructor() {
    this.head = null;
  }
  append(key, value) {
    if (this.head === null) {
      this.prepend(key, value);
    } else {
      this.tmp = this.head;
      while (this.tmp.next !== null) {
        this.tmp = this.tmp.next;
      }
      this.tmp.next = new Node(key, value, null);
    }
  }

  prepend(key, value) {
    this.head = new Node(key, value, this.head);
  }

  contains(key) {
    this.tmp = this.head;
    while (this.tmp !== null && this.tmp.key !== key) {
      this.tmp = this.tmp.next;
    }
    if (this.tmp !== null) {
      return this.tmp.value;
    } else {
      return null;
    }
  }

  overwrite(key, value) {
    this.tmp = this.head;
    while (this.tmp !== null && this.tmp.key !== key) {
      this.tmp = this.tmp.next;
    }
    if (this.tmp !== null) {
      this.tmp.value = value;
    }
  }

  delete(key) {
    if (this.head === null) throw new Error("cannot delete");

    if (this.head.key === key) {
      this.head = this.head.next;
      return;
    }

    this.cur = this.head;
    this.prev = null;

    while (this.cur !== null && this.cur.key !== key) {
      this.prev = this.cur;
      this.cur = this.cur.next;
    }

    if (this.cur === null) throw new Error("cannot delete");

    this.prev.next = this.cur.next;
  }
}

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.count = 0;
    this.buckets = Array.from(
      { length: this.capacity },
      () => new linkedList()
    );
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

  bucket(key) {
    let hashedKey = this.hash(key);
    if (hashedKey < 0 || hashedKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.buckets[hashedKey];
  }

  get(key) {
    let b = this.bucket(key);
    return b.contains(key);
  }

  set(key, value) {
    let b = this.bucket(key);

    if (this.get(key)) {
      b.overwrite(key, value);
      return;
    }
    b.append(key, value);
    this.count++;
  }

  has(key) {
    let b = this.bucket(key);

    if (b.contains(key)) {
      return true;
    } else {
      return false;
    }
  }
  remove(key) {
    let b = this.bucket(key);
    if (this.has(key)) {
      b.delete(key);
      this.count--;
      return true;
    } else {
      return false;
    }
  }
  length() {
    return this.count;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("apple", "brown");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");

console.log(test.length());
