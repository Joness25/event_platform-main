"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import PricingBusiness from "@/lib/database/models/pricingBusiness.model";

import { handleError } from "@/lib/utils";
import { UpdatePricingParams, CreatePricingParams } from "@/types";

// createNgoPricing
// updateNgoPricing
// createBusinessPricing
// updateBusinessPricing

export async function createBusinessPricing({
  pricing,
  path,
}: CreatePricingParams) {
  try {
    await connectToDatabase();

    const newPricing = await PricingBusiness.create({
      ...pricing,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newPricing));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateBusinessPricing({
  pricing,
  path,
}: UpdatePricingParams) {
  try {
    await connectToDatabase();

    const pricingToUpdate = await PricingBusiness.findById(pricing._id);
    if (!pricingToUpdate) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedPricing = await PricingBusiness.findByIdAndUpdate(
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

export const getAllBusinessPricing = async () => {
  try {
    await connectToDatabase();

    const categories = await PricingBusiness.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
