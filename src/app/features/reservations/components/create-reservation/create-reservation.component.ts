import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Guest, Reservation } from '../../models/reservations.models';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, FormsModule, MatTabsModule, MatIconModule, MatExpansionModule, MatPaginatorModule, MatTableModule],
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

  guest: Guest = {
    FirstName: '',
    LastName: '',
    Birthday: new Date(),
    DocumentType: '',
    DocumentNumber: '',
    Gender: '',
    Email: '',
    ContactPhone: ''
  }

  displayedColumns: string[] = ['FirstName', 'LastName', 'Birthday', 'Gender', 'DocumentType', 'DocumentNumber', 'Email', 'ContactPhone'];
  dataSource: MatTableDataSource<Guest> = new MatTableDataSource();

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
