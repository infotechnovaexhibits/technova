const { db } = require("../config/firebase");
const consoleManager = require("../utils/consoleManager");

class CountService {
  static counts = {
    leads: 0,
    portfolios: 0,
    testimonials: 0,
    services: 0,
    brands: 0,
  };
  static isInitialized = false;

  static async initCounts() {
    if (this.isInitialized) return;

    const collections = ["leads", "portfolios", "testimonials", "services", "brands"];

    for (let collectionName of collections) {
      try {
        const snapshot = await db.collection(collectionName).get();
        this.counts[collectionName] = snapshot.size; // ✅ `snapshot.size` se count milta hai
      } catch (error) {
        consoleManager.error(`❌ Error getting count for ${collectionName}:`, error.message);
        this.counts[collectionName] = 0;
      }
    }

    this.isInitialized = true;
  }

  static getCounts() {
    consoleManager.log("Returning cached counts");
    return this.counts;
  }

  static async refreshCounts() {
    this.isInitialized = false;
    await this.initCounts();
    return this.counts;
  }
}

module.exports = CountService;
