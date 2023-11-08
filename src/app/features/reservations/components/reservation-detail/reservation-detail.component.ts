import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Guest, Reservation } from '../../models/reservations.models';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatTabsModule, 
    MatButtonModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatDialogModule, 
    MatTableModule
  ],
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  reservation: Reservation = {
    hotelId: '',
    roomId: '',
    startDate: new Date(),
    endDate: new Date(),
    contactName: '',
    contactPhone: '',
    guests: []
  };

  displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'gender', 'documentType', 'documentNumber', 'email', 'contactPhone'];
  dataSource: MatTableDataSource<Guest> = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<ReservationDetailComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    
  }

  ngOnInit(): void { 
    if (this.data.Reservation) {
      this.reservation = this.data.Reservation;
      this.dataSource = new MatTableDataSource(this.reservation.guests);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
