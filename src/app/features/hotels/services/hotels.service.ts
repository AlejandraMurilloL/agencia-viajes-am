import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Hotel, Room, RoomType } from '../models/hotels.models';

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

  getHotelById(id: number) {
    return this.http.get<Hotel>(`${this.urlApi}hotels/${id}`);
  }

  createHotel(hotel: Hotel) {
    return this.http.post(`${this.urlApi}hotels`, hotel);
  }

  updateHotel(hotel: Hotel) {    
    return this.http.put(`${this.urlApi}hotels/${hotel.id}`, hotel);
  }

  changeHotelStatus(hotelId: string, status: boolean) {
    const request = { id: hotelId, Active: status };
    return this.http.put(`${this.urlApi}hotels/${hotelId}/status`, request);
  }

  // ROOM
  
  getAllRoomTypes() {
    return this.http.get<RoomType[]>(`${this.urlApi}roomTypes`);
  }

  addRoomToHotel(room: Room) {
    return this.http.post(`${this.urlApi}hotels/${room.hotelId}/rooms`, room);
  }

  changeRoomStatus(hotelId: number, roomId: number, status: boolean) {
    const request = { id: roomId, hotelId: hotelId, Active: status };
    return this.http.put(`${this.urlApi}hotels/${hotelId}/rooms/${roomId}/status`, request);
  }
}
