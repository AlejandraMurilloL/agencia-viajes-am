export interface Hotel {
    id: string;
    name: string;
    description: string;
    city: string;
    active: boolean;
    rooms: Room[];
}

export interface Room {
    id: string;
    name: string;
    hotelId?: string;
	baseCost: number;
	taxes: number;
	roomType: string;
	roomTypeId: string;
	location: string;
	active: boolean;
}

export interface RoomType {
	id: string,
	name: string;
}