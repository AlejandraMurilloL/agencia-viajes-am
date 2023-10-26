import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Reservation } from '../models/reservations.models';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor() { }

  getReservations() {
    const reservations: Reservation[] = this.reservations;
    return of(reservations);
  }

  reservations: Reservation[] = [
    {
      Hotel: 'Gales',
      Room: '201',
      StartDate: new Date(2023, 10, 30),
      EndDate: new Date(2023, 10, 31),
      ContactName: 'Alejandra Murillo',
      ContactPhone: '32037635630',
      Guests: [
        {
          FirstName: 'Alejandra',
          LastName: 'Murillo',
          Birthday: new Date(1999, 1, 16),
          Gender: 'F',
          DocumentType: 'CC',
          DocumentNumber: '123456789',
          Email: 'malemurillo15@gmail.com',
          ContactPhone: '3203763530'
        },
        {
          FirstName: 'Samuel',
          LastName: 'Murillo',
          Birthday: new Date(2023, 3, 4),
          Gender: 'M',
          DocumentType: 'RC',
          DocumentNumber: '123456789',
          Email: 'samuel@gmail.com',
          ContactPhone: '1111111111'
        }
      ]
    }
  ];

}