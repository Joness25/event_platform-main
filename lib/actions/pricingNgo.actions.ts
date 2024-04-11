"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import PricingNgo from "@/lib/database/models/pricingNgo.model";

import { handleError } from "@/lib/utils";
import { UpdatePricingParams, CreatePricingParams } from "@/types";

// createNgoPricing
// updateNgoPricing
// createBusinessPricing
// updateBusinessPricing

export async function createNgoPricing({ pricing, path }: CreatePricingParams) {
  try {
    await connectToDatabase();

    const newPricing = await PricingNgo.create({
      ...pricing,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newPricing));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateNgoPricing({ pricing, path }: UpdatePricingParams) {
  try {
    await connectToDatabase();

    const pricingToUpdate = await PricingNgo.findById(pricing._id);
    if (!pricingToUpdate) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedPricing = await PricingNgo.findByIdAndUpdate(
      pricing._id,
      { ...pricing },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedPricing));
  } catch (error) {
    handleError(error);
  }
}

export const getAllNgoPricing = async () => {
  try {
    await connectToDatabase();

    const categories = await PricingNgo.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
