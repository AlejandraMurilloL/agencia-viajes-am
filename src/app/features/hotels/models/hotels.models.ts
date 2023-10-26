export interface Hotel {
    Id: string;
    Name: string;
    Description: string;
    City: string;
    Active: boolean;
    Rooms: Room[];
}

export interface Room {
    Id: string;
    Name: string;
    HotelId?: string;
	BaseCost: number;
	Taxes: number;
	RoomType: string;
	RoomTypeId: string;
	Location: string;
	Active: boolean;
}

export interface RoomType {
	Id: string,
	Name: string;
}