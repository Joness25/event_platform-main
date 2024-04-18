import { Schema, model, models, Document } from "mongoose";

export interface INgoProfileOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  ngoProfile: {
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

export type INgoProfileOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  ngoProfileId: string;
  buyerId: string;
};

const NgoProfileOrderSchema = new Schema({
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
  ngoProfile: {
    type: Schema.Types.ObjectId,
    ref: "NgoProfile",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const NgoProfileOrder =
  models?.NgoProfileOrder || model("NgoProfileOrder", NgoProfileOrderSchema);

export default NgoProfileOrder;
// BusinessOrder
// NgoProfileOrder
