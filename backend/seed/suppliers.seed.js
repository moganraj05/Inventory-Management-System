import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Supplier from "../models/Supplier.js";
import { faker } from "@faker-js/faker";

export const seedProducts = async () => {
  const categories = await Category.find();
  const suppliers = await Supplier.find();

  const products = [];

  for (let i = 0; i < 500; i++) {
    const price = faker.number.int({ min: 100, max: 50000 });
    const quantity = faker.number.int({ min: 0, max: 300 });

    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: categories[i % categories.length]._id,
      supplier: suppliers[i % suppliers.length]._id,
      price,
      quantity,
      minStockLevel: faker.number.int({ min: 5, max: 30 })
    });
  }

  await Product.deleteMany();
  await Product.insertMany(products);

  console.log(`${products.length} products seeded`);
};
