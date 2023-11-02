import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Hotel } from '../../models/hotels.models';
import { HotelsService } from '../../services/hotels.service';
import { HotelDetailComponent } from '../hotel-detail/hotel-detail.component';
import { HotelRoomsComponent } from '../hotel-rooms/hotel-rooms.component';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [ 
    MatCardModule, 
    MatSlideToggleModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;
  @Output() hotelEdited = new EventEmitter<void>();

  constructor(
    private hotelsService: HotelsService,
    public dialog: MatDialog) {
    
  }

  openHotelDetail() {
    const dialogRef = this.dialog.open(HotelDetailComponent, {
      width: '400px',
      data: { hotel: { ...this.hotel } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hotelsService.updateHotel(result);
        this.hotelEdited.emit();
      }
    });
  }

  openHotelRooms() {
    const dialogRef = this.dialog.open(HotelRoomsComponent, {
      width: '1000px',
      data: { hotel: { ...this.hotel } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hotelEdited.emit();
      }
    });
  }
}
