import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { Reservation } from '../../models/reservations.models';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, FormsModule, MatTabsModule, MatIconModule],
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  reservation: Reservation = {
    Hotel: '',
    Room: '',
    StartDate: new Date(),
    EndDate: new Date(),
    ContactName: '',
    ContactPhone: '',
    Guests: []
  };

  constructor(
    public dialogRef: MatDialogRef<CreateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.search) {
      const { StartDate, EndDate, Hotel, Room } = this.data.search;
      console.log(this.data.search)
      this.reservation.Hotel = Hotel;
      this.reservation.Room = Room;
      this.reservation.StartDate = StartDate.toLocaleDateString();
      this.reservation.EndDate = EndDate.toLocaleDateString();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
