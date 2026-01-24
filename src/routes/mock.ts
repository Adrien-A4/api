import { Router } from "express";
import crypto from "crypto";

const router = Router();

const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Charlie",
  "Emma",
  "Liam",
  "Olivia",
];
const lastNames = [
  "Doe",
  "Smith",
  "Johnson",
  "Brown",
  "Williams",
  "Jones",
  "Miller",
  "Davis",
];
const domains = ["example.com", "test.org", "mail.net", "website.io"];
const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Berlin",
  "Toronto",
];
const streets = ["Main St", "Broadway", "High St", "Park Ave", "5th Ave"];
const products = [
  "Laptop",
  "Phone",
  "Headphones",
  "Watch",
  "Camera",
  "Tablet",
  "Monitor",
];
const companies = [
  "Acme Corp",
  "Globex",
  "Soylent Corp",
  "Umbrella Corp",
  "Stark Ind",
  "Wayne Ent",
];

function pick<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)] ?? arr[0];
}

router.get("/user", (req, res) => {
  const first = pick(firstNames);
  const last = pick(lastNames);
  res.json({
    id: crypto.randomUUID(),
    firstName: first,
    lastName: last,
    email: `${first?.toLowerCase()}.${last?.toLowerCase()}@${pick(domains)}`,
    avatar: `https://ui-avatars.com/api/?name=${first?.replace(/\s+/g, "+")}+${last?.replace(/\s+/g, "+")}`,
  });
});

router.get("/product", (req, res) => {
  res.json({
    id: crypto.randomUUID(),
    name: pick(products),
    price: (Math.random() * 1000).toFixed(2),
    inStock: Math.random() > 0.2,
  });
});

router.get("/address", (req, res) => {
  res.json({
    street: `${Math.floor(Math.random() * 999)} ${pick(streets)}`,
    city: pick(cities),
    zipCode: Math.floor(Math.random() * 90000) + 10000,
    country: "Mockland",
  });
});

router.get("/company", (req, res) => {
  res.json({
    id: crypto.randomUUID(),
    name: pick(companies),
    catchPhrase: "We do things better.",
    bs: "synergize scalable solutions",
  });
});

router.get("/uuid", (req, res) => {
  res.json({ result: crypto.randomUUID() });
});

router.get("/ipv4", (req, res) => {
  res.json({
    result: Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 256))
      .join("."),
  });
});

router.get("/ipv6", (req, res) => {
  res.json({
    result: Array(8)
      .fill(0)
      .map(() => Math.floor(Math.random() * 65536).toString(16))
      .join(":"),
  });
});

router.get("/mac-address", (req, res) => {
  res.json({
    result: Array(6)
      .fill(0)
      .map(() =>
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0"),
      )
      .join(":"),
  });
});

router.get("/lorem", (req, res) => {
  res.json({
    result:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });
});

export default router;
