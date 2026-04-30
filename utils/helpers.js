import { spinRoulette, spinSlot, updateBalance } from "../utils/helpers.js";
import crypto from "crypto";
/* =========================
   🔐 SECURE RNG (CASINO CORE)
========================= */
export const secureRandom = (min, max) => {
  const range = max - min + 1;
  const rand = crypto.randomBytes(4).readUInt32LE(0);
  return min + (rand % range);
};

/* =========================
   🎡 ROULETTE ENGINE
========================= */
export const spinRoulette = () => {
  return secureRandom(0, 36);
};

/* =========================
   🎰 SLOT MACHINE ENGINE
========================= */
const symbols = ["🍒", "💎", "7", "⭐", "🔔"];

export const spinSlot = () => {
  return [
    symbols[secureRandom(0, symbols.length - 1)],
    symbols[secureRandom(0, symbols.length - 1)],
    symbols[secureRandom(0, symbols.length - 1)]
  ];
};

/* =========================
   💰 WALLET CALCULATOR
========================= */
export const updateBalance = (balance, amount, type) => {
  if (type === "bet") return balance - amount;
  if (type === "win") return balance + amount;
  return balance;
};

/* =========================
   🧠 WIN CALCULATOR
========================= */
export const calculateWin = (bet, multiplier) => {
  return bet * multiplier;
};

/* =========================
   🔁 SHUFFLE ARRAY (FAIR)
========================= */
export const shuffleArray = (arr) => {
  return arr
    .map(value => ({ value, sort: crypto.randomBytes(4).readUInt32LE() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

/* =========================
   🧾 TRANSACTION ID
========================= */
export const generateTransactionId = () => {
  return "TX-" + crypto.randomBytes(10).toString("hex").toUpperCase();
};

/* =========================
   🔐 PROVABLY FAIR SEED
========================= */
export const generateServerSeed = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const hashSeed = (seed) => {
  return crypto.createHash("sha256").update(seed).digest("hex");
};

/* =========================
   💵 FORMAT MONEY
========================= */
export const formatMoney = (amount) => {
  return Number(amount).toFixed(2);
};
