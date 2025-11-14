export interface Travelproduct {
  _id: string;
  name: string;
  remarks: string;
  contents: string;
  price?: number | null;
  tags?: string[] | null;
  images?: string[] | null;
  travelproductAddress?: TravelproductAddress | null;
  seller?: User | null;
  createdAt: any;
  updatedAt: any;
  deletedAt?: any | null;
  pickedCount?: number | null;
  soldAt?: any | null;
}

export interface TravelproductAddress {
  _id: string;
  zipcode?: string | null;
  address?: string | null;
  addressDetail?: string | null;
  lat?: number | null;
  lng?: number | null;
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any | null;
}

export interface User {
  _id: string;
  name?: string | null;
}

export interface ITripsWriteProps {
  isEdit: boolean;
}
