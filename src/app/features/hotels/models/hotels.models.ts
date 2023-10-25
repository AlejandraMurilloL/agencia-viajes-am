export interface Hotel {
    id: string;
    name: string;
    description: string;
    city: string;
    active: boolean;
    rooms: HotelRoom[];
}

export interface HotelRoom {
    id: string;
    name: string;
}