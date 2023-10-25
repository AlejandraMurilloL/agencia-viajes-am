import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Hotel } from '../../models/hotels.models';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit  {
  hotel: Hotel = {
    Id: '',
    Name: '',
    Description: '',
    City: '',
    Active: true,
    Rooms: []
  };

  constructor(
    public dialogRef: MatDialogRef<HotelDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.hotel) {
      this.hotel = this.data.hotel;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
