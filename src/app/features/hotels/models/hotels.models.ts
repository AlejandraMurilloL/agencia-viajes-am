export interface Hotel {
    Id: string;
    Name: string;
    Description: string;
    City: string;
    Active: boolean;
    Rooms: HotelRoom[];
}

export interface HotelRoom {
    Id: string;
    Name: string;
}