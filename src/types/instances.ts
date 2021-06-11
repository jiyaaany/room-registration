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
  floor: number | string
  sunlightDirection: string
  leasableArea: number
  pet: boolean
  thumbnail: string
  canceled: boolean
}