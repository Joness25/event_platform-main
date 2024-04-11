export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};

export const businessFormDefaultValues = {
  clientsName: "",
  companyName: "",
  telephoneNumber: "",
  email: "",
  orderAwarderName: "",
  designation: "",
  // logo: "",
  website: "",
  description: "", // Array of illustration URLs
  imageUrl: "", // Array of photograph URLs
  priceId: "",
  createdAtt: new Date(),
  isFree: false,
};

export const ngosBasicFormDefaultValues = {
  name: "", //name of organization
  physicalAddress: "",
  postalAddress: "",
  telephoneNumber: "",
  faxNumber: "",
  email: "",
  website: "", //url of their website
  contactPersonName: "",
  contactPersonTitle: "",
  categoryId: "",
  createdAtt: new Date(),
  isFree: true,
};

export const ngosProfileFormDefaultValues = {
  description: "",
  email: "",
  website: "",
  priceId: "",
  ngoId: "",
  imageUrl: "", // Array of photo URLs
  createdAtt: new Date(),
  isFree: false,
  name: "", //name of organization
  physicalAddress: "",
  postalAddress: "",
  telephoneNumber: "",
  faxNumber: "",
  contactPersonName: "",
  contactPersonTitle: "",
  categoryId: "",
};

export const pricingDefaultValues = {
  productNumber: "",
  pageType: "",
  priceInUsd: "",
  priceInKsh: "",
  description: "",
};
