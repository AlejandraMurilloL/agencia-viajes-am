import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AvailableRooms, Reservation } from '../models/reservations.models';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  getReservations() {
    const reservations: Reservation[] = this.reservations;
    return of(reservations);
  }

  getAvailableRooms() {
    const available: AvailableRooms[] = this.availableRooms;
    return of(available);
  }

  confirmReservation(reservation: Reservation) {
    this.reservations.push(reservation);
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

  availableRooms: AvailableRooms[] = [
    {
      StartDate: new Date(2023, 12, 15),
      EndDate: new Date(2023, 12, 25),
      Hotel: 'Gales',
      Room: '202',
      Price: 155000
    }
  ]

}
