import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotels.models';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  constructor() {}

  getHotels() {
    const hotels: Hotel[] = this.hotels;
    return of(hotels);
  }

  createHotel(hotel: Hotel) {
    this.hotels.push(hotel);
  }

  updateHotel(hotel: Hotel) {
    this.hotels = this.hotels.map(obj =>
      obj.id === hotel.id ? { ...hotel } : obj
    );
  }

  hotels: Hotel[] = [
    {
      id: '001',
      name: 'Hotel Gales',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      city: 'Sogamoso, Boyacá',
      active: true,
      rooms: [],
    },
    {
      id: '002',
      name: 'Hotel Panorama',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      city: 'Paipa, Boyacá',
      active: false,
      rooms: [],
    },
    {
      id: '003',
      name: 'Hotel Zuhe',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      city: 'Paipa, Boyacá',
      active: true,
      rooms: [],
    },
  ];
}
