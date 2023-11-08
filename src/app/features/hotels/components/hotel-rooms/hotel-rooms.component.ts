import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { Hotel, Room } from '../../models/hotels.models';
import { HotelsService } from '../../services/hotels.service';
import { HotelRoomsDetailComponent } from '../hotel-rooms-detail/hotel-rooms-detail.component';
import { HotelRoomsListComponent } from '../hotel-rooms-list/hotel-rooms-list.component';

@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatExpansionModule, 
    MatButtonModule, 
    MatTabsModule, 
    HotelRoomsDetailComponent,
    HotelRoomsListComponent
  ],
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  
  hotel!: Hotel;

  constructor(
    private hotelService: HotelsService,
    public dialogRef: MatDialogRef<HotelRoomsComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.hotel) {
      this.hotel = this.data.hotel;
    }
  }

  onAddRoom(room: Room) {
    this.hotelService.addRoomToHotel(room)
      .subscribe(() => {
        this.hotelService.getHotelById(room.hotelId || 0)
        .subscribe( data => {
          this.hotel = data;
        });
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
