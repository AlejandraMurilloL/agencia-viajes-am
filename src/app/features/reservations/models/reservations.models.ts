export interface Reservation {
    hotel: string;
    room: string;
    startDate: Date;
    endDate: Date;
    contactName: string;
    contactPhone: string;
    guests: Guest[];
}

export interface Guest {
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
    documentType: string;
    documentNumber: string;
    email: string;
    cContactPhone: string;
}

export interface SearchAvailableRooms {
    startDate: Date;
    endDate: Date;
    peopleCount: number;
    city: string;
}

export interface AvailableRooms {
    startDate: Date;
    endDate: Date;
    hotel: string;
    room: string;
    price: number;
}