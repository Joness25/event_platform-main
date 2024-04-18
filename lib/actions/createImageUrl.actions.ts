import { CreateImageUrlParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import ImageInfo from "../database/models/ImageInfo.model";
import User from "../database/models/user.model";

// CreateImageUrlParams;
// UpdateImageUrlParams;
export async function createImageUrl({
  userId,
  imageInfo,
}: CreateImageUrlParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newImageUrl = await ImageInfo.create({
      ...imageInfo,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newImageUrl));
  } catch (error) {
    handleError(error);
  }
}
