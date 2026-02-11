import mongoose from "mongoose";
import dotenv from "dotenv";

import { seedCategories } from "./categories.seed.js";
import { seedSuppliers } from "./suppliers.seed.js";
import { seedProducts } from "./products.seed.js";

dotenv.config();

const runSeeder = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await seedCategories();
  await seedSuppliers();
  await seedProducts();

  console.log("Seeding completed");
  process.exit();
};

runSeeder();
