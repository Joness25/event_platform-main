// DeleteEventParams
// GetAllEventsParams
// GetEventsByUserParams
// GetRelatedEventsByCategoryParams

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

//Create NGO PARAMS
export type CreateNgoParams = {
  userId: string;
  ngo: {
    name: string;
    physicalAddress: string;
    postalAddress: string;
    telephoneNumber: string;
    faxNumber?: string;
    categoryId: string;
    email: string;
    website?: string;
    contactPersonName: string;
    contactPersonTitle: string;
    createdAtt: Date;
    isFree: boolean;
  };
  path: string;
};

export type UpdateNgoParams = {
  userId: string;
  ngo: {
    _id: string;
    name: string;
    physicalAddress: string;
    postalAddress: string;
    telephoneNumber: string;
    faxNumber?: string;
    categoryId: string;
    email: string;
    website?: string;
    contactPersonName: string;
    contactPersonTitle: string;
    createdAtt: Date;
    isFree: boolean;
    // areaOfInterest: string;
  };
  path: string;
};

//CREATE NGO PROFILE PARAMS
export type CreateNgoProfileParams = {
  userId: string;
  ngoProfile: {
    description: string; // Array of illustration URLs
    priceId: string;
    imageUrl?: string;
    name: string;
    physicalAddress: string;
    postalAddress: string;
    telephoneNumber: string;
    faxNumber?: string;
    categoryId: string;
    email: string;
    website?: string;
    contactPersonName: string;
    contactPersonTitle: string;
    createdAtt: Date;
    isFree: boolean;
  };
  path: string;
};

export type UpdateNgoProfileParams = {
  userId: string;
  ngoProfile: {
    _id: string;
    description: string; // Array of illustration URLs
    priceId: string;
    imageUrl?: string;
    name: string;
    physicalAddress: string;
    postalAddress: string;
    telephoneNumber: string;
    faxNumber?: string;
    categoryId: string;
    email: string;
    website?: string;
    contactPersonName: string;
    contactPersonTitle: string;
    createdAtt: Date;
    isFree: boolean;
  };
  path: string;
};

//CREATE PRICING PARAMS
export type CreatePricingParams = {
  pricing: {
    productNumber: string;
    pageType: string;
    priceInUsd: string;
    priceInKsh: string;
    description: string;
    // areaOfInterest: string;
  };
  path: string;
};
export type UpdatePricingParams = {
  pricing: {
    _id: string;
    productNumber: string;
    pageType: string;
    priceInUsd: string;
    priceInKsh: string;
    description: string;
    // areaOfInterest: string;
  };
  path: string;
};
//======CREATE BUSINESSAD PARAMS
export type CreateBusinessADParams = {
  userId: string;
  businessAd: {
    clientsName: string;
    companyName: string;
    telephoneNumber: string;
    email: string;
    orderAwarderName: string;
    designation: string;
    website?: string;
    priceId: string;
    description: string; // Array of illustration URLs
    imageUrl?: string;
    createdAtt: Date;
    isFree: boolean;
  };
  path: string;
};

export type UpdateBusinessADParams = {
  userId: string;
  businessAd: {
    _id: string;
    clientsName: string;
    companyName: string;
    telephoneNumber: string;
    email: string;
    orderAwarderName: string;
    designation: string;
    // categoryId: string;
    website?: string;
    priceId: string;
    description: string; // Array of illustration URLs
    imageUrl?: string;
    createdAtt: Date;
    isFree: boolean;
  };
  path: string;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type DeleteBusinessAdParams = {
  businessAdId: string;
  path: string;
};
export type DeleteNgoParams = {
  ngoId: string;
  path: string;
};
export type DeleteNgoProfileParams = {
  ngoProfileId: string;
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetAllBusinessAdsParams = {
  query: string;
  price: string;
  limit: number;
  page: number;
};
export type GetAllNgosParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};
export type GetAllNgoProfilesParams = {
  query: string;
  price: string;
  limit: number;
  page: number;
};
export type GetNgosByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};
export type GetBusinessAdsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};
export type GetNgoProfilesByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};
export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};
export type GetRelatedNgosByCategoryParams = {
  categoryId: string;
  ngoId: string;
  limit?: number;
  page: number | string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CheckoutBusinessOrderParams = {
  companyName: string;
  businessAdId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CheckoutNgoOrderParams = {
  name: string;
  ngoProfileId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type CreateBusinessOrderParams = {
  stripeId: string;
  businessAdId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type CreateNgoProfileOrderParams = {
  stripeId: string;
  ngoProfileId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};
export type GetOrdersByBusinessAdParams = {
  businessAdId: string;
  searchString: string;
};
export type GetOrdersByNgoProfileParams = {
  ngoProfileId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
