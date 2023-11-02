export interface Reservation {
    Hotel: string;
    Room: string;
    StartDate: Date;
    EndDate: Date;
    ContactName: string;
    ContactPhone: string;
    Guests: Guest[];
}

export interface Guest {
    FirstName: string;
    LastName: string;
    Birthday: Date;
    Gender: string;
    DocumentType: string;
    DocumentNumber: string;
    Email: string;
    ContactPhone: string;
}

export interface SearchAvailableRooms {
    StartDate: Date;
    EndDate: Date;
    PeopleCount: number;
    City: string;
}

export interface AvailableRooms {
    StartDate: Date;
    EndDate: Date;
    Hotel: string;
    Room: string;
    Price: number;
}