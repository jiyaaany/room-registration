export interface FormData {
  address: string,
  detailAddress: string,
  realEstate: string,
  realEstatePriceType: string,
  depositAmount: number,
  rentAmount: number,
  maintenanceFee: number,
  maintenanceFeeItems: string[],
  floor: string,
  sunlightDirection: string,
  leasableArea: number,
  pet: boolean,
  canceled: boolean,
  thumbnail: string,
};

export interface RealEstates { [key: string]: string };

export interface RealEstatePriceTypes { [key: string]: string };

export interface MaintenanceFeeItems { [key: string]: string };

export interface SunlightDirections { [key: string]: string };

export interface Floors { [key: string]: string };

export interface Room extends FormData {
  pk: string
};