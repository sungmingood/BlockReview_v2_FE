import {Dispatch, SetStateAction} from "react";

export interface SignUpSetType {
  setStep: Dispatch<SetStateAction<number>>;
  setUserType: Dispatch<SetStateAction<number>>;
}

export interface BtnType {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export interface StoreType {
  name: string;
  description?: string;
  imgUrl: string;
  storeId?: number;
  reviews?: any;
  id?: string;
  address: string;
}

export interface StoreCategoryType {
  name: string;
  id: number;
}

export interface StoreInfoType {
  address: string;
  category: number;
  description: string;
  id: string;
  imgUrl: string;
  name: string;
  registeredAt: string;
  tel: string;
}

export enum StoreCategory {
  RESTAURANT,
  CAFE,
  LEISURE,
  ACCOMODATION,
  ACADEMY,
  COMPANY,
  ETC,
}

export interface UserInfoType {
  auth: boolean;
  crnNumber: string | null;
  email: string;
  eoa: string;
  phoneNumber: string;
  registeredAt: string;
  signature: string;
  userType: number;
  store: StoreInfoType | null;
}

export interface StoreListType extends StoreType {
  reviews: any;
}
