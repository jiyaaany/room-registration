export interface RealEstate { [key: string]: string };

export interface RealEstatePriceType { [key: string]: string };

export interface MaintenanceFeeItems { [key: string]: string };

export interface SunlightDirection { [key: string]: string };

export interface Floor { [key: string]: string };

export interface Room {
  pk: number
  address: string
  detailAddress: string
  realEstate: string
  realEstatePriceType: string
  depositAmount: number
  rentAmount: number
  maintenanceFee: number
  maintenanceFeeItems: string[]
  floor: string
  sunlightDirection: string
  leasableArea: number
  pet: boolean
  thumbnail: string
  canceled: boolean
}