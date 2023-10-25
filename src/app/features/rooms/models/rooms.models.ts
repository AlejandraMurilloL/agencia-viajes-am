export interface Room {
  Id: string;
  Name: string;
  HotelId?: string;
  BaseCost: number;
  Taxes: number;
  RoomType: string;
  Location: string;
  Active: boolean;
}
