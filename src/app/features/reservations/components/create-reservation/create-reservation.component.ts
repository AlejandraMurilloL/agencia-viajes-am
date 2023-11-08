import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Guest, Reservation } from '../../models/reservations.models';
import { CreateReservationBasicInfoComponent } from '../create-reservation-basic-info/create-reservation-basic-info.component';
import { CreateReservationGuestsComponent } from '../create-reservation-guests/create-reservation-guests.component';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatTabsModule, 
    MatIconModule,  
    CreateReservationBasicInfoComponent,
    CreateReservationGuestsComponent
  ],
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent {
  
  selectedIndex = 0;
  reservation: Reservation = {
    hotel: '',
    room: '',
    startDate: new Date(),
    endDate: new Date(),
    contactName: '',
    contactPhone: '',
    guests: []
  };
  
  constructor(public dialogRef: MatDialogRef<CreateReservationComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addGuestsStep(reservation: Reservation) {
    this.reservation = reservation;
    this.selectedIndex = 1;
  }

  addGuestToReservation(guest: Guest) {
    this.reservation.guests.push(guest);
  }
}
