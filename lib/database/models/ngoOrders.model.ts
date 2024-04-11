import { Schema, model, models, Document } from "mongoose";

export interface IBusinessOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  companyName: {
    _id: string;
    companyName: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type INgoOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  companyName: string;
  ngoProfileId: string;
  buyer: string;
};

const NgoOrderSchema = new Schema({
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

const NgoOrder = models.NgoOrder || model("NgoOrder", NgoOrderSchema);

export default NgoOrder;
