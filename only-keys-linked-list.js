class keysLinkedList {
  constructor() {
    this.firstNode = null;
  }
  append(key) {
    if (this.firstNode === null) this.prepend(key);
    else {
      this.tmp = this.firstNode;
      while (this.tmp.nextNode !== null) {
        this.tmp = this.tmp.nextNode;
      }
      this.tmp.nextNode = new keysNode(key);
    }
  }
  overwrite(key) {
    this.tmp = this.firstNode;
    while (this.tmp !== null && this.tmp.key !== key) {
      this.tmp = this.tmp.nextNode;
    }
    if (this.tmp !== null) {
      this.tmp.key = key;
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
  prepend(key) {
    this.firstNode = new keysNode(key, this.firstNode);
    return this.firstNode;
  }
  head() {
    return this.firstNode;
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

  contains(key) {
    this.tmp = this.firstNode;
    while (this.tmp !== null && this.tmp.key !== key) {
      this.tmp = this.tmp.nextNode;
    }
    if (this.tmp !== null) {
      return this.tmp.key;
    } else {
      return null;
    }
  }

  keysArray() {
    this.tmp = this.firstNode;
    this.result = [];
    this.result.push(this.tmp.key);
    while (this.tmp.nextNode !== null) {
      this.tmp = this.tmp.nextNode;
      this.result.push(this.tmp.key);
    }
    return this.result;
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

class keysNode {
  constructor(key, nextNode = null) {
    this.key = key;
    this.nextNode = nextNode;
  }
}

export default keysLinkedList;
