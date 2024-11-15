import cappuccino from "/public/images/iced-cappuccino.webp";
import americano from "/public/images/iced-americano.webp";
import caramelMacchiato from "/public/images/iced-caramel-macchiato.webp";
import roseLatte from "/public/images/iced-rose-latte.webp";
import mocha from "/public/images/iced-mocha.webp";
import arenLatte from "/public/images/iced-aren-latte.webp";
import tiramisu from "/public/images/iced-tiramisu.webp";
import butterscotchSeasaltLatte from "/public/images/iced-butterscotch-seasalt-latte.webp";
import butterCroissant from "/public/images/butter-croissant.jpg";
import almondCroissant from "/public/images/almond-croissant.jpg";
import painAuChocolat from "/public/images/pain-au-chocola.jpg";
import tripleCheeseDanish from "/public/images/triple-cheese-danish.jpg";
import bananaCake from "/public/images/banana-cake.jpg";
import icedManukaAmericano from "/public/images/iced-manuka-americano.jpg";

export const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Cappuccino",
    price: 25000,
    image: cappuccino,
    category: "beverage",
  },
  {
    id: 2,
    name: "Americano",
    price: 20000,
    image: americano,
    category: "beverage",
  },
  {
    id: 3,
    name: "Iced Caramel Macchiato",
    price: 30000,
    image: caramelMacchiato,
    category: "beverage",
  },
  {
    id: 4,
    name: "Iced Rose Latte",
    price: 30000,
    image: roseLatte,
    category: "beverage",
  },
  {
    id: 5,
    name: "Iced Mocha",
    price: 28000,
    image: mocha,
    category: "beverage",
  },
  {
    id: 6,
    name: "Iced Aren Latte",
    price: 25000,
    image: arenLatte,
    category: "beverage",
  },
  {
    id: 7,
    name: "Iced Tiramisu",
    price: 30000,
    image: tiramisu,
    category: "beverage",
  },
  {
    id: 8,
    name: "Iced Butterscotch Seasalt Latte",
    price: 28000,
    image: butterscotchSeasaltLatte,
    category: "beverage",
  },
  {
    id: 9,
    name: "Butter Croissant",
    price: 22000,
    image: butterCroissant,
    category: "pastry",
  },
  {
    id: 10,
    name: "Almond Croissant",
    price: 26000,
    image: almondCroissant,
    category: "pastry",
  },
  {
    id: 11,
    name: "Pain Au Cholocat",
    price: 26000,
    image: painAuChocolat,
    category: "pastry",
  },
  {
    id: 12,
    name: "Triple Cheese Danish",
    price: 26000,
    image: tripleCheeseDanish,
    category: "pastry",
  },
  {
    id: 13,
    name: "Banana Cake",
    price: 24000,
    image: bananaCake,
    category: "pastry",
  },
  {
    id: 14,
    name: "Iced Manuka Americano",
    price: 25000,
    image: icedManukaAmericano,
    category: "beverage",
  },
];

export const DUMMY_MODIFIERS = {
  size: [
    { id: 1, name: "Regular", price: 0 },
    { id: 3, name: "Large", price: 8000 },
  ],
  ice: [
    { id: 1, name: "Regular", price: 0 },
    { id: 2, name: "Less Ice", price: 0 },
    { id: 3, name: "More Ice", price: 0 },
  ],
  sweetness: [
    { id: 1, name: "Regular", price: 0 },
    { id: 2, name: "Less Sweet", price: 0 },
    { id: 3, name: "More Sweet", price: 0 },
  ],
  diary: [
    { id: 1, name: "Milk", price: 0 },
    { id: 2, name: "Soy Milk", price: 11000 },
    { id: 3, name: "Oat Milk", price: 18000 },
  ],
  extras: [
    { id: 1, name: "Extra Shot", price: 6000 },
    { id: 2, name: "Aren", price: 6000 },
    { id: 3, name: "Caramel", price: 6000 },
    { id: 4, name: "Hazelnut", price: 6000 },
    { id: 5, name: "Vanilla", price: 6000 },
    { id: 6, name: "Chocolate", price: 6000 },
    { id: 7, name: "Manuka Honey", price: 6000 },
  ],
};
