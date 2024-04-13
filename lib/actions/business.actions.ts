"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import BusinessAd from "@/lib/database/models/businessad.model";
import PricingBusiness from "@/lib/database/models/pricingBusiness.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
  CreateBusinessADParams,
  DeleteBusinessAdParams,
  GetAllBusinessAdsParams,
  GetBusinessAdsByUserParams,
  UpdateBusinessADParams,
} from "@/types";

const getPricingByPageType = async (name: string) => {
  return PricingBusiness.findOne({ name: { $regex: name, $options: "i" } });
};

const populatePricing = (query: any) => {
  return query.populate({
    path: "price",
    model: PricingBusiness,
    select: "_id pageType",
  });
};

const populateBusinessAd = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "price",
      model: PricingBusiness,
      select: "_id pageType priceInUsd priceInKsh description productNumber ",
    });
};

export async function createBusinessAD({
  userId,
  businessAd,
  path,
}: CreateBusinessADParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await BusinessAd.create({
      ...businessAd,
      title: "Business Advertisement Information",
      price: businessAd.priceId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getBusinessAdById(businessAdId: string) {
  try {
    await connectToDatabase();

    const businessAd = await populateBusinessAd(
      BusinessAd.findById(businessAdId)
    );

    if (!businessAd) throw new Error("Business ad not found");

    return JSON.parse(JSON.stringify(businessAd));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateBusinessAd({
  userId,
  businessAd,
  path,
}: UpdateBusinessADParams) {
  try {
    await connectToDatabase();

    const businessAdToUpdate = await BusinessAd.findById(businessAd._id);
    if (
      !businessAdToUpdate ||
      businessAdToUpdate.organizer.toHexString() !== userId
    ) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedBusinessAd = await BusinessAd.findByIdAndUpdate(
      businessAd._id,
      { ...businessAd, price: businessAd.priceId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedBusinessAd));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteBusinessAd({
  businessAdId,
  path,
}: DeleteBusinessAdParams) {
  try {
    await connectToDatabase();

    const deletedBusinessAd = await BusinessAd.findByIdAndDelete(businessAdId);
    if (deletedBusinessAd) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
// GetAllBusinessAdsParams;
// GetAllNgoProfilesParams;
// GetAllNgosParams;
// DeleteBusinessAdParams;
// DeleteNgoParams;
// DeleteNgoProfileParams;
// GetNgosByUserParams;
// GetBusinessAdsByUserParams;
// GetNgoProfilesByUserParams;
// GetRelatedNgosByCategoryParams
export async function getBusinessAdsByUser({
  userId,
  limit = 6,
  page,
}: GetBusinessAdsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const businessAdsQuery = BusinessAd.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const businessAds = await populateBusinessAd(businessAdsQuery);
    const businessAdsCount = await BusinessAd.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(businessAds)),
      totalPages: Math.ceil(businessAdsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// getAllNgoProfiles
// getAllBusinessAds
export async function getAllBusinessAds({
  query,
  limit = 6,
  page,
  price,
}: GetAllBusinessAdsParams) {
  try {
    await connectToDatabase();

    // const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    // const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      // $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const businessAdsQuery = BusinessAd.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const businessAds = await populateBusinessAd(businessAdsQuery);
    const businessAdsCount = await BusinessAd.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(businessAds)),
      totalPages: Math.ceil(businessAdsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS
// export async function getAllEvents({
//   query,
//   limit = 6,
//   page,
//   price,
// }: GetAllBusinessAdsParams) {
//   try {
//     await connectToDatabase();

//     const titleCondition = query
//       ? { title: { $regex: query, $options: "i" } }
//       : {};
//     const categoryCondition = category
//       ? await getCategoryByName(category)
//       : null;
//     const conditions = {
//       $and: [
//         titleCondition,
//         categoryCondition ? { category: categoryCondition._id } : {},
//       ],
//     };

//     const skipAmount = (Number(page) - 1) * limit;
//     const businessAdQuery = Event.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const businessAds = await populateEvent(businessAdQuery);
//     const businessAdsCount = await BusinessAd.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(businessAds)),
//       totalPages: Math.ceil(businessAdsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }

// GET EVENTS BY ORGANIZER
// export async function getEventsByUser({
//   userId,
//   limit = 6,
//   page,
// }: GetBusinessAdsByUserParams) {
//   try {
//     await connectToDatabase();

//     const conditions = { organizer: userId };
//     const skipAmount = (page - 1) * limit;

//     const businessAdsQuery = BusinessAd.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const businessAds = await populateEvent(businessAdsQuery);
//     const businessAdsCount = await BusinessAd.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(businessAds)),
//       totalPages: Math.ceil(businessAdsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }

//try to get with the same pricing ie page type
// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
// export async function getRelatedEventsByCategory({
//   categoryId,
//   businessAdId,
//   limit = 3,
//   page = 1,
// }: GetRelatedEventsByCategoryParams) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = {
//       $and: [{ category: categoryId }, { _id: { $ne: businessAdId } }],
//     };

//     const businessAdsQuery = BusinessAd.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const businessAds = await populateEvent(businessAdsQuery);
//     const businessAdsCount = await BusinessAd.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(businessAds)),
//       totalPages: Math.ceil(businessAdsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
