export interface Hotel {
    id: string;
    name: string;
    description: string;
    city: string;
    active: boolean;
    rooms: Room[];
}

export interface Room {
    id: number;
    name: string;
    hotelId: number;
	baseCost: number;
	taxes: number;
	roomTypeName: string;
	roomTypeId: string;
	location: string;
	active: boolean;
}

export interface RoomType {
	id: string,
	name: string;
}