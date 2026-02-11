import Category from "../models/Category.js";

export const seedCategories = async () => {
  const categories = [];

  const names = [
    "Electronics",
    "Groceries",
    "Stationery",
    "Furniture",
    "Clothing",
    "Medical",
    "Automobile",
    "Hardware",
    "Books",
    "Sports"
  ];

  for (let name of names) {
    categories.push({ name });
  }

  await Category.deleteMany();
  await Category.insertMany(categories);

  console.log(`${categories.length} categories seeded`);
};
