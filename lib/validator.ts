import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

export const businessFormSchema = z.object({
  clientsName: z.string().min(3, "Client's Name must be at least 3 characters"),
  companyName: z
    .string()
    .min(1, "Company's Name must be at least 3 characters"),

  // pageSize: z.string(),
  telephoneNumber: z
    .string()
    .min(3, "Telephone Number must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  orderAwarderName: z
    .string()
    .min(3, "Order Awarder's Name must be at least 3 characters"),
  designation: z.string().min(3, "Designation must be at least 3 characters"),
  // logo: z.array(z.string()).optional(), // Array of logo URLs, optional
  website: z.string().url().optional(), // Optional website URL
  description: z.string().min(3, "Description must be at least 3 characters"),
  imageUrl: z.string().optional(), // Array of image URLs
  imageTitle: z.string().optional(), //image title
  priceId: z.string().min(3, "Page number/size is required "),
  createdAtt: z.date(),
  isFree: z.boolean(),
});

export const ngosBasicFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  physicalAddress: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  postalAddress: z
    .string()
    .min(3, "Postal Address must be at least 3 characters"),
  telephoneNumber: z
    .string()
    .min(3, "Telephone Number must be at least 3 characters"),
  faxNumber: z
    .string()
    .min(3, "Fax Number must be at least 3 characters")
    .optional(), // Optional fax number
  email: z.string().email("Invalid email format"),
  website: z.string().url().optional(), // Optional website URL
  contactPersonName: z
    .string()
    .min(3, "Contact Person's Name must be at least 3 characters"),
  contactPersonTitle: z
    .string()
    .min(3, "Contact Person's Title must be at least 3 characters"),
  categoryId: z.string().min(1, "Price ID is required"), // Add default value and validation message,
  createdAtt: z.date(),
  isFree: z.boolean(),
});

export const ngosProfileFormSchema = z.object({
  description: z.string().min(3, "Text must be at least 3 characters"),
  priceId: z.string().min(1, "Page number/size is required "),
  imageUrl: z.string().optional(), // Array of image URLs
  imageTitle: z.string().optional(), //image title
  // For Ngo
  name: z.string().min(3, "Name must be at least 3 characters"),
  physicalAddress: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  postalAddress: z
    .string()
    .min(3, "Postal Address must be at least 3 characters"),
  telephoneNumber: z
    .string()
    .min(3, "Telephone Number must be at least 3 characters"),
  faxNumber: z
    .string()
    .min(3, "Fax Number must be at least 3 characters")
    .optional(), // Optional fax number
  email: z.string().email("Invalid email format"),
  website: z.string().url().optional(), // Optional website URL
  contactPersonName: z
    .string()
    .min(3, "Contact Person's Name must be at least 3 characters"),
  contactPersonTitle: z
    .string()
    .min(3, "Contact Person's Title must be at least 3 characters"),
  categoryId: z.string().min(1, "Please pick or add a category "),
  createdAtt: z.date(),
  isFree: z.boolean(),
});

export const pricingFormSchema = z.object({
  productNumber: z.string(),
  pageType: z.string(),
  priceInUsd: z.string(),
  priceInKsh: z.string(),
  description: z.string(),
});

export const ImageFormSchema = z.object({
  title: z.string().optional(),
  imageUrl: z.string().optional(),
});
