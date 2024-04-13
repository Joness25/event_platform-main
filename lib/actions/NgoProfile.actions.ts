// NgoProfileSchema
// NgoProfile
// IProfile
// createNgoPricing
// updateNgoPricing
// getAllNgoPricing

"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import NgoProfile from "@/lib/database/models/ngoprofile.model";
import PricingNgo from "@/lib/database/models/pricingNgo.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
  CreateNgoProfileParams,
  DeleteNgoProfileParams,
  GetAllNgoProfilesParams,
  GetNgoProfilesByUserParams,
  UpdateNgoProfileParams,
} from "@/types";

const getPricingByPageType = async (name: string) => {
  return PricingNgo.findOne({ name: { $regex: name, $options: "i" } });
};

const populatePricing = (query: any) => {
  return query.populate({
    path: "price",
    model: PricingNgo,
    select: "_id pageType",
  });
};

const populateNgoProfile = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "price",
      model: PricingNgo,
      select: "_id pageType priceInUsd priceInKsh description productNumber ",
    });
};

export async function createNgoProfile({
  userId,
  ngoProfile,
  path,
}: CreateNgoProfileParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await NgoProfile.create({
      ...ngoProfile,
      title: "Ngo Profile Information",
      price: ngoProfile.priceId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getNgoProfileById(ngoProfileId: string) {
  try {
    await connectToDatabase();

    const ngoProfile = await populateNgoProfile(
      NgoProfile.findById(ngoProfileId)
    );

    if (!ngoProfile) throw new Error("Business ad not found");

    return JSON.parse(JSON.stringify(ngoProfile));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateNgoProfile({
  userId,
  ngoProfile,
  path,
}: UpdateNgoProfileParams) {
  try {
    await connectToDatabase();

    const ngoProfileToUpdate = await NgoProfile.findById(ngoProfile._id);
    if (
      !ngoProfileToUpdate ||
      ngoProfileToUpdate.organizer.toHexString() !== userId
    ) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedNgoProfile = await NgoProfile.findByIdAndUpdate(
      ngoProfile._id,
      { ...ngoProfile, price: ngoProfile.priceId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedNgoProfile));
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
export async function deleteNgoProfile({
  ngoProfileId,
  path,
}: DeleteNgoProfileParams) {
  try {
    await connectToDatabase();

    const deletedNgoProfile = await NgoProfile.findByIdAndDelete(ngoProfileId);
    if (deletedNgoProfile) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS
// export async function getAllNgoProfiles({
//   query,
//   limit = 6,
//   page,
//   price,
// }: GetAllNgoProfilesParams) {
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
//     const ngoProfileQuery = NgoProfile.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const ngoProfiles = await populateNgoProfile(ngoProfileQuery);
//     const ngoProfilesCount = await NgoProfile.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(ngoProfiles)),
//       totalPages: Math.ceil(ngoProfilesCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }

// GET EVENTS BY ORGANIZER
export async function getNgoProfilesByUser({
  userId,
  limit = 6,
  page,
}: GetNgoProfilesByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const ngoProfilesQuery = NgoProfile.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const ngoProfiles = await populateNgoProfile(ngoProfilesQuery);
    const ngoProfilesCount = await NgoProfile.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(ngoProfiles)),
      totalPages: Math.ceil(ngoProfilesCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getAllNgoProfiles({
  query,
  limit = 6,
  page,
  price,
}: GetAllNgoProfilesParams) {
  try {
    await connectToDatabase();

    // const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    // const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      // $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const ngoProfilesQuery = NgoProfile.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const ngoProfiles = await populateNgoProfile(ngoProfilesQuery);
    const ngoProfilesCount = await NgoProfile.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(ngoProfiles)),
      totalPages: Math.ceil(ngoProfilesCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

//try to get with the same pricing ie page type
// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
// export async function getRelatedEventsByCategory({
//   categoryId,
//   ngoProfileId,
//   limit = 3,
//   page = 1,
// }: GetRelatedEventsByCategoryParams) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = {
//       $and: [{ category: categoryId }, { _id: { $ne: ngoProfileId } }],
//     };

//     const ngoProfilesQuery = NgoProfile.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const ngoProfiles = await populateEvent(ngoProfilesQuery);
//     const ngoProfilesCount = await NgoProfile.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(ngoProfiles)),
//       totalPages: Math.ceil(ngoProfilesCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
