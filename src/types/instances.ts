export type RealEstate = 'ONE_ROOM' | 'TWO_ROOM' | 'APARTMENT' | 'EFFICIENCY_APARTMENT';
export type RealEstatePriceType = 'MONTHLY' | 'JEONSE' | 'SELLING';
export type MaintenanceFeeItem = 'ELECTRIC' | 'GAS' | 'WATERWORKS' | 'INTERNET' | 'TV';
export type SunlightDirection = 'EAST' | 'WEST' | 'SOUTH' | 'NORTH' | 'SOUTH_EAST' | 'SOUTH_WEST' | 'NORTH_WEST' | 'NORTH_EAST';

export interface FormData {
  address: string,
  detailAddress: string,
  realEstate: RealEstate,
  realEstatePriceType: RealEstatePriceType,
  depositAmount: number,
  rentAmount: number,
  maintenanceFee: number,
  maintenanceFeeItems: MaintenanceFeeItem[],
  floor: string,
  sunlightDirection: SunlightDirection,
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
  pk: number
};