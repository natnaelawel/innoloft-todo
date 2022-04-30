import type { PropsWithChildren } from "react";

export type WithChildren<T = {}> = T & PropsWithChildren<{}>;

export type WithClassName<T = {}> = T & {
  className?: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  picture?: string;
  type: {
    id: number;
    name: string;
  };
  categories: Array<Category> | null;
  implementationEffortText?: null;
  investmentEffort?: string;
  trl: TRL;
  user: User;
  company: Company;
  businessModels: Array<BusinessModel> | null;
};

export type TRL = {
  id: number;
  name: string;
};
export type Category = {
  id: number;
  name: string;
};

export type BusinessModel = {
  id: number;
  name: string;
};

export type AppConfiguration = {
  id: number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  sex: number;
  profilePicture: string;
  position: string;
};

export type Company = {
  name: string;
  logo: string;
  address: {
    id: string | null;
    country: {
      name: string;
      region: string | null;
    };
    state: string | null;
    city: {
      name: string;
      countryId: string | null;
      stateId: string | null;
    };
    street: string;
    house: string;
    zipCode: string;
    longitude: number;
    latitude: number;
    fallbackString: string | null;
    cityRegion: string | null;
  };
};
