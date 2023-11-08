import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AvailableRooms, Reservation, SearchAvailableRooms } from '../models/reservations.models';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  urlApi: string = environment.baseUrlApi;

  constructor(private http: HttpClient) {
    
  }

  getReservations() {
    return this.http.get<Reservation[]>(`${this.urlApi}reservations`);
  }

  getAvailableRooms(filter: SearchAvailableRooms) {
    return this.http.get<AvailableRooms[]>(`${this.urlApi}reservations/available?startDate=${filter.startDate.toDateString()}&endDate=${filter.endDate.toDateString()}&peopleCount=${filter.peopleCount}&city=${filter.city}`);
  }

  confirmReservation(reservation: Reservation) {
    return this.http.post(`${this.urlApi}reservations`, reservation);
  }

  reservations: Reservation[] = [
    
  ];

}
