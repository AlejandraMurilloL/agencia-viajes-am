import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Hotel, Room } from '../models/hotels.models';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  urlApi = environment.baseUrlApi;
  
  constructor(private http: HttpClient) {

  }

  getHotels() {
    return this.http.get<Hotel[]>(`${this.urlApi}hotels`);
  }

  createHotel(hotel: Hotel) {
    return this.http.post(`${this.urlApi}hotels`, hotel);
  }

  updateHotel(hotel: Hotel) {    
    this.hotels = this.hotels.map(obj => obj.id === hotel.id ? { ...hotel } : obj);
  }

  addRoomToHotel(room: Room) {
    const hotel = this.hotels.find(hotel => hotel.id === room.hotelId);
    hotel?.rooms.push(room);
  }

  hotels: Hotel[] = [ 
    {
      id: '001',
      name: 'Hotel Gales',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      city: 'Sogamoso, Boyacá',
      active: true,
      rooms: [{
        id: '001',
        baseCost: 80000,
        taxes: 0,
        active: true,
        name: '201',
        roomTypeId: '001',
        location: 'Piso 2',
        hotelId: '001',
        roomType: ''
      }]
    },
    {
      id: '002',
      name: 'Hotel Panorama',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      city: 'Paipa, Boyacá',
      active: false,
      rooms: []
    },
    {
      id: '003',
      name: 'Hotel Zuhe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      city: 'Paipa, Boyacá',
      active: true,
      rooms: []
    },
  ];
}
