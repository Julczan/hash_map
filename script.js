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
      return true;
    } else {
      return false;
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
}

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
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
    return this.buckets[hashedKey];
  }

  check(key) {
    let b = this.bucket(key);
    return b.contains(key);
  }

  set(key, value) {
    let b = this.bucket(key);

    if (this.check(key)) {
      b.overwrite(key, value);
      return;
    }
    b.append(key, value);
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("apple", "green");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");

console.log(test.buckets);

// console.log(test.buckets);
