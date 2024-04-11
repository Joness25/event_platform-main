"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import NgoCategory from "../database/models/ngoCategories.model";

export const createNgoCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await NgoCategory.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllNgoCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await NgoCategory.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
