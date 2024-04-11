import { Document, Schema, model, models } from "mongoose";

export interface INgoCategory extends Document {
  _id: string;
  name: string;
}

const NgoCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const NgoCategory =
  models.NgoCategory || model("NgoCategory", NgoCategorySchema);

export default NgoCategory;
