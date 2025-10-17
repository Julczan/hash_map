class linkedList {
  constructor() {
    this.firstNode = null;
  }
  append(key, value) {
    if (this.firstNode === null) this.prepend(key, value);
    else {
      this.tmp = this.firstNode;
      while (this.tmp.nextNode !== null) {
        this.tmp = this.tmp.nextNode;
      }
      this.tmp.nextNode = new Node(key, value);
    }
  }
  size() {
    this.count = 0;
    this.tmp = this.firstNode;
    while (this.tmp !== null) {
      this.count++;
      this.tmp = this.tmp.nextNode;
    }
    return this.count;
  }
  prepend(key, value) {
    this.firstNode = new Node(key, value, this.firstNode);
    return this.firstNode;
  }
  head() {
    return this.firstNode;
  }
  tail() {
    this.tmp = this.firstNode;
    while (this.tmp.nextNode !== null) {
      this.tmp = this.tmp.nextNode;
    }
    return this.tmp;
  }
  at(index) {
    this.count = 0;
    this.tmp = this.firstNode;
    while (this.tmp !== null && this.count !== index) {
      this.count++;
      this.tmp = this.tmp.nextNode;
    }
    return this.tmp;
  }
  pop() {
    this.cur = this.firstNode;
    this.prev = null;
    while (this.cur.nextNode !== null) {
      this.prev = this.cur;
      this.cur = this.cur.nextNode;
    }
    this.prev.nextNode = this.cur.nextNode;
  }
  contains(key) {
    this.tmp = this.firstNode;
    while (this.tmp !== null && this.tmp.key !== key) {
      this.tmp = this.tmp.nextNode;
    }
    if (this.tmp !== null) {
      return this.tmp.value;
    } else {
      return null;
    }
  }
  overwrite(key, value) {
    this.tmp = this.firstNode;
    while (this.tmp !== null && this.tmp.key !== key) {
      this.tmp = this.tmp.nextNode;
    }
    if (this.tmp !== null) {
      this.tmp.value = value;
    }
  }
  find(value) {
    this.index = 0;
    this.tmp = this.firstNode;
    while (this.tmp !== null && this.tmp.value !== value) {
      this.index++;
      this.tmp = this.tmp.nextNode;
    }
    if (this.tmp !== null) {
      return this.index;
    } else {
      return null;
    }
  }
  toString() {
    this.tmp = this.firstNode;
    this.result = ` ( ${this.tmp.value} ) ->`;
    while (this.tmp.nextNode !== null) {
      this.tmp = this.tmp.nextNode;
      this.result += ` ( ${this.tmp.value} ) ->`;
    }
    this.result += ` null`;
    return this.result;
  }
  insertAt(value, index) {
    this.count = 0;
    this.prev = null;
    this.cur = this.firstNode;
    if (this.cur === null) return null;
    if (index === 0) {
      this.prepend(value);
      return;
    }
    while (this.cur !== null && this.count !== index) {
      this.count++;
      this.prev = this.cur;
      this.cur = this.cur.nextNode;
    }
    if (this.cur !== null) {
      this.prev.nextNode = new Node(value, this.cur);
    }
    if (index === this.size()) {
      this.append(value);
    }
  }
  delete(key) {
    if (this.firstNode === null) throw new Error("cannot delete");
    if (this.firstNode.key === key) {
      this.firstNode = this.firstNode.nextNode;
      return;
    }
    this.prev = null;
    this.cur = this.firstNode;

    while (this.cur !== null && this.cur.key !== key) {
      this.prev = this.cur;
      this.cur = this.cur.nextNode;
    }
    if (this.cur === null) throw new Error("cannot delete");
    this.prev.nextNode = this.cur.nextNode;
  }
}

class Node {
  constructor(key, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default linkedList;
