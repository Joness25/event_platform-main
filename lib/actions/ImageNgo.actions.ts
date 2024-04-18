import { connectToDatabase } from "../database";
import NgoImage from "../database/models/ImagesNgo.model";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { CreateNgoImageUrlParams } from "@/types";

// //CREATE NGO IMAGE URL PARAMS
// export type CreateNgoImageUrlParams = {
//     userId: string;
//     ngoProfile: string;
//     formValues: {
//       title?: string;
//       imageUrl?: string;
//     };
//   };

//   export type UpdateNgoImageUrlParams = {
//     userId: string;
//     ngoProfile: string;
//     formValues: {
//       _id: string;
//       title?: string;
//       imageUrl?: string;
//     };
//   };

//   // CREATE BUSINESS IMAGE URL PARAMS
//   export type CreateBusinessImageUrlParams = {
//     userId: string;
//     businessAd: string;
//     formValues: {
//       title?: string;
//       imageUrl?: string;
//     };
//   };

//   export type UpdateNgoBusinessUrlParams = {
//     userId: string;
//     businessAd: string;
//     formValues: {
//       _id: string;
//       title?: string;
//       imageUrl?: string;
//     };
//   };
export async function createNgoImage({
  userId,
  ngoProfileId,
  formValues,
}: CreateNgoImageUrlParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");
    console.log(userId, ngoProfileId);
    const newtEvent = await NgoImage.create({
      ...formValues,
      organizer: userId,
      ngoProfile: ngoProfileId,
    });

    return JSON.parse(JSON.stringify(newtEvent));
  } catch (error) {
    handleError(error);
  }
}

// // UPDATE
// export async function updateNgoProfile({
//   userId,
//   ngoProfileImage,
//   path,
// }: UpdateNgoProfileParams) {
//   try {
//     await connectToDatabase();

//     const ngoProfileToUpdate = await NgoImage.findById(ngoProfile._id);
//     if (
//       !ngoProfileToUpdate ||
//       ngoProfileToUpdate.organizer.toHexString() !== userId
//     ) {
//       throw new Error("Unauthorized or event not found");
//     }

//     const updatedNgoProfile = await NgoProfile.findByIdAndUpdate(
//       ngoProfile._id,
//       { ...ngoProfile, price: ngoProfile.priceId },
//       { new: true }
//     );
//     revalidatePath(path);

//     return JSON.parse(JSON.stringify(updatedNgoProfile));
//   } catch (error) {
//     handleError(error);
//   }
// }

//   // GET ONE EVENT BY ID
// export async function getNgoProfileById(ngoProfileId: string) {
//     try {
//       await connectToDatabase();

//       const ngoProfile = await populateNgoProfile(
//         NgoProfile.findById(ngoProfileId)
//       );

//       if (!ngoProfile) throw new Error("Business ad not found");

//       return JSON.parse(JSON.stringify(ngoProfile));
//     } catch (error) {
//       handleError(error);
//     }
//   }
