// src/v1/generators/prng.js
import crypto from "node:crypto";

export class SeededRandom {
  constructor(seed) {
    // Generate a 32-bit integer from MD5 hash of seed
    const hash = crypto.createHash("md5").update(String(seed)).digest("hex");
    this.state = parseInt(hash.substring(0, 8), 16);
  }

  // Linear Congruential Generator (LCG)
  next() {
    this.state = (this.state * 1664525 + 1013904223) % 4294967296;
    return this.state / 4294967296;
  }

  // Return a deterministic floating point or integer within a range [min, max]
  number(min, max, integer = true) {
    const val = min + this.next() * (max - min);
    return integer ? Math.floor(val) : val;
  }

  // Pick an array item deterministically
  pick(array) {
    if (!array || array.length === 0) return null;
    const index = Math.floor(this.next() * array.length);
    return array[index];
  }

  // Pick a key from a weighted object: { itemA: 2, itemB: 1 }
  pickWeighted(weights) {
    const keys = Object.keys(weights);
    if (keys.length === 0) return null;

    const totalWeight = keys.reduce((sum, key) => sum + Number(weights[key]), 0);

    let randomVal = this.next() * totalWeight;
    for (const key of keys) {
      if (randomVal < weights[key]) return key;
      randomVal -= weights[key];
    }
    return keys[0];
  }
}