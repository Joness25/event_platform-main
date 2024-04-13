import { Schema, model, models, Document } from "mongoose";

export interface IBusinessOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  businessAd: {
    //from event to businessAd
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type IBusinesssOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  businessAdId: string;
  buyerId: string;
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
