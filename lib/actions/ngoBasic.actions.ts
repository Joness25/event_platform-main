"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Ngo from "@/lib/database/models/ngobasic.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
  UpdateNgoParams,
  CreateNgoParams,
  DeleteBusinessAdParams,
  DeleteNgoParams,
  GetAllNgosParams,
  GetNgosByUserParams,
} from "@/types";
import NgoCategory from "../database/models/ngoCategories.model";

const populateNgo = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: NgoCategory, select: "_id name" });
};

export async function createNgo({ userId, ngo, path }: CreateNgoParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newNgo = await Ngo.create({
      ...ngo,
      title: "Ngo basic information",
      category: ngo.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newNgo));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getNgoById(ngoId: string) {
  try {
    await connectToDatabase();

    const ngo = await populateNgo(Ngo.findById(ngoId));

    if (!ngo) throw new Error("ngo not found");

    return JSON.parse(JSON.stringify(ngo));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateNgo({ userId, ngo, path }: UpdateNgoParams) {
  try {
    await connectToDatabase();

    const ngoToUpdate = await Ngo.findById(ngo._id);
    if (!ngoToUpdate || ngoToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedNgo = await Ngo.findByIdAndUpdate(
      ngo._id,
      { ...ngo },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedNgo));
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

// DELETE
export async function deleteNgo({ ngoId, path }: DeleteNgoParams) {
  try {
    await connectToDatabase();

    const deletedBusinessAd = await Ngo.findByIdAndDelete(ngoId);
    if (deletedBusinessAd) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getAllNgos({
  query,
  limit = 6,
  page,
  category,
}: GetAllNgosParams) {
  try {
    await connectToDatabase();

    // const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    // const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      // $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const ngosQuery = Ngo.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const ngos = await populateNgo(ngosQuery);
    const ngosCount = await Ngo.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(ngos)),
      totalPages: Math.ceil(ngosCount / limit),
    };
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
export async function getNgosByUser({
  userId,
  limit = 6,
  page,
}: GetNgosByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const ngosQuery = Ngo.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const ngos = await populateNgo(ngosQuery);
    const ngosCount = await Ngo.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(ngos)),
      totalPages: Math.ceil(ngosCount / limit),
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
//     const businessAdsCount = await Ngo.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(businessAds)),
//       totalPages: Math.ceil(businessAdsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }

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
