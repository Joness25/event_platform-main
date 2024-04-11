import { Schema, model, models, Document } from "mongoose";

export interface IBusinessOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  businessAd: {
    _id: string;
    companyName: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type IBusinessOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  companyName: string;
  businessAdId: string;
  buyer: string;
};

const BusinessOrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  businessAd: {
    type: Schema.Types.ObjectId,
    ref: "BusinessAd",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const BusinessOrder =
  models.BusinessOrder || model("BusinessOrder", BusinessOrderSchema);

export default BusinessOrder;
