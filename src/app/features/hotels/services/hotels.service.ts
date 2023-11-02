import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Hotel, Room } from '../models/hotels.models';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  getHotels() {
    const hotels: Hotel[] = this.hotels;
    return of(hotels);
  }

  createHotel(hotel: Hotel) {
    this.hotels.push(hotel);
  }

  updateHotel(hotel: Hotel) {    
    this.hotels = this.hotels.map(obj => obj.Id === hotel.Id ? { ...hotel } : obj);
  }

  addRoomToHotel(room: Room) {
    const hotel = this.hotels.find(hotel => hotel.Id === room.HotelId);
    hotel?.Rooms.push(room);
  }

  hotels: Hotel[] = [ 
    {
      Id: '001',
      Name: 'Hotel Gales',
      Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      City: 'Sogamoso, Boyacá',
      Active: true,
      Rooms: [{
        Id: '001',
        BaseCost: 80000,
        Taxes: 0,
        Active: true,
        Name: '201',
        RoomTypeId: '001',
        Location: 'Piso 2',
        HotelId: '001',
        RoomType: ''
      }]
    },
    {
      Id: '002',
      Name: 'Hotel Panorama',
      Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      City: 'Paipa, Boyacá',
      Active: false,
      Rooms: []
    },
    {
      Id: '003',
      Name: 'Hotel Zuhe',
      Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates hic neque amet.',
      City: 'Paipa, Boyacá',
      Active: true,
      Rooms: []
    },
  ];
}
