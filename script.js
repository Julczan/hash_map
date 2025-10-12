class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = Array(this.capacity);
  }
  populateArr(capacity) {
    for (let i = 0; i <= capacity; i++) {
      this.buckets[i] = [];
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
  bucket(key) {
    let hashedKey = this.hash(key);
    return this.buckets[hashedKey];
  }
  entry(key, bucket) {
    for (let e of bucket) {
      if (e.key === key) {
        return e;
      }
    }
    return null;
  }
  set(key, value) {
    let b = this.bucket(key);
    let e = this.entry(key, b);

    if (e) {
      e.value = value;
      return;
    }

    b.push({ key, value });
  }
}

const hashMap = new HashMap();

hashMap.populateArr(hashMap.capacity);

hashMap.set("apple", "red");
hashMap.set("apple", "green");

console.log(hashMap.buckets);
