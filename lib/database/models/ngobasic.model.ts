import { Document, Schema, model, models } from "mongoose";

//so that we know in the frontend what our database has
export interface INGO extends Document {
  _id: string; //is automatically
  title: string;
  name: string;
  physicalAddress: string;
  postalAddress: string;
  telephoneNumber: string;
  faxNumber?: string;
  email: string;
  website?: string;
  contactPersonName: string;
  contactPersonTitle: string;
  createdAtt: Date;
  isFree: boolean;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}
const NGOSchema = new Schema({
  title: { type: String },
  name: { type: String, required: true }, //name of organization
  physicalAddress: { type: String, required: true },
  postalAddress: { type: String, required: true },
  telephoneNumber: { type: String, required: true },
  faxNumber: { type: String },
  email: { type: String, required: true },
  website: { type: String }, //url of their website
  contactPersonName: { type: String, required: true },
  contactPersonTitle: { type: String, required: true },
  createdAtt: { type: Date, default: Date.now },
  isFree: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" }, //user that fills in the info
});

const Ngo = models.Ngo || model("Ngo", NGOSchema);

export default Ngo;
