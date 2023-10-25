import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Room } from '../models/rooms.models';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor() {}

  getRooms() {
    const rooms: Room[] = this.rooms;
    return of(rooms);
  }

  rooms: Room[] = [
    {
      Id: '001',
      Name: 'Habitación 201',
      BaseCost: 110000,
      Taxes: 10000,
      RoomType: 'Doble',
      Location: 'Piso 2',
      Active: true,
    },
    {
      Id: '002',
      Name: 'Habitación 202',
      BaseCost: 110002,
      Taxes: 10000,
      RoomType: 'Doble',
      Location: 'Piso 2',
      Active: true,
    },
    {
      Id: '001',
      Name: 'Habitación 301',
      BaseCost: 110003,
      Taxes: 10000,
      RoomType: 'Suit',
      Location: 'Piso 3',
      Active: true,
    },
  ];
}
