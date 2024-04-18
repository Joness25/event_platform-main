import { Document, Schema, model, models } from "mongoose";

export interface IBusinessImage extends Document {
  _id: string;
  title?: string;
  imageUrl?: string;
  businessAd: {
    _id: string;
    title: string;
    companyName: string;
    clientsName: string;
    telephoneNumber: string;
    email: string;
    orderAwarderName: string;
    designation: string;
    // logo?: string[];
    website?: string;
    description: string; // Array of illustration URLs
    imageUrl?: string; // Array of photograph URLs
    imageTitle?: string;
    price: {
      _id: string; // Automatically generated by MongoDB
      productNumber: string;
      pageType: string;
      priceInUsd: string;
      priceInKsh: string;
      description: string;
    };
    createdAtt: Date;
    isFree: boolean;
    organizer: { _id: string; firstName: string; lastName: string };
  };
  organizer: { _id: string; firstName: string; lastName: string };
}

const BusinessImageSchema = new Schema({
  title: { type: String },
  imageUrl: { type: String }, // Array of URLs to suitable
  businessAd: {
    type: Schema.Types.ObjectId,
    ref: "BusinessAd",
  },
  organizer: { type: Schema.Types.ObjectId, ref: "User" }, //user that fills in the info
});

const BusinessImage =
  models?.BusinessImage || model("BusinessImage", BusinessImageSchema);

export default BusinessImage;