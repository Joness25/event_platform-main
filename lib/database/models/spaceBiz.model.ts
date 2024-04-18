import { Document, Schema, model, models } from "mongoose";

export interface IBusinessSpace extends Document {
  _id: string;
  space: string;
  price: string;
}

const BusinessSpaceSchema = new Schema({
  space: { type: String, required: true },
  price: { type: String, required: true },
});

const BusinessSpace =
  models?.BusinessSpace || model("BusinessSpace", BusinessSpaceSchema);

export default BusinessSpace;
