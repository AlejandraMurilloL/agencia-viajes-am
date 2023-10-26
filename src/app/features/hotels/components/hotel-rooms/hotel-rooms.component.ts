import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Hotel, Room, RoomType } from '../../models/hotels.models';

@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule, FormsModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatPaginatorModule, MatTableModule, MatTabsModule],
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  hotel!: Hotel;
  room: Room = {
    Id: '',
    Name: '',
    BaseCost: 0,
    Taxes: 0,
    RoomType: '',
    RoomTypeId: '',
    Location: '',
    Active: true
  };
  roomTypes: RoomType[] = [
    {
      Id: '001',
      Name: 'Doble'
    },
    {
      Id: '002',
      Name: 'Familiar'
    },
    {
      Id: '003',
      Name: 'Suite'
    },
  ];

  displayedColumns: string[] = ['Name', 'BaseCost', 'Taxes', 'RoomType', 'Location', 'Active', 'Actions'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<HotelRoomsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.hotel) {
      this.hotel = this.data.hotel;
      this.dataSource = new MatTableDataSource(this.hotel.Rooms);
    }
  }

  onAddRoom() {
    console.log(this.room);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
