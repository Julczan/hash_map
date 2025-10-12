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
  set(key, value) {
    let hashedKey = this.hash(key);
    let bucket = this.buckets[hashedKey];
    for (let e of bucket) {
      if (e.key === key) {
        e.value = value;
        return;
      }
    }
    bucket.push({ key, value });
  }
}

const hashMap = new HashMap();

hashMap.populateArr(hashMap.capacity);

console.log(hashMap.set("apple", "red"));
console.log(hashMap.set("apple", "green"));

console.log(hashMap.buckets);
