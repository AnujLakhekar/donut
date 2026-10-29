// prng.js
import crypto from 'node:crypto';

export class SeededRandom {
  constructor(seed) {
    // Generate a 32-bit integer from MD5 hash of seed
    const hash = crypto.createHash('md5').update(seed).digest('hex');
    this.state = parseInt(hash.substring(0, 8), 16);
  }

  // Linear Congruential Generator (LCG)
  next() {
    this.state = (this.state * 1664525 + 1013904223) % 4294967296;
    return this.state / 4294967296;
  }

  // Pick random element from an array
  pick(array) {
    const index = Math.floor(this.next() * array.length);
    return array[index];
  }
}