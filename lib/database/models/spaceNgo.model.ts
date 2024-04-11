import { Document, Schema, model, models } from "mongoose";

export interface INgoSpace extends Document {
  _id: string;
  space: string;
  price: string;
}

const NgoSpaceSchema = new Schema({
  space: { type: String, required: true },
  price: { type: String, required: true },
});

const NgoSpace = models.NgoSpace || model("NgoSpace", NgoSpaceSchema);

export default NgoSpace;
