import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../../models/hotels.models';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent {
  hotel: Hotel = {
    id: '',
    name: '',
    description: '',
    city: '',
    active: true,
    rooms: []
  };

  constructor(
    public dialogRef: MatDialogRef<HotelDetailComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
