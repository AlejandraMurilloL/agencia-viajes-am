import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Hotel } from '../../models/hotels.models';
import { HotelsService } from '../../services/hotels.service';
import { HotelDetailComponent } from '../hotel-detail/hotel-detail.component';
import { HotelRoomsComponent } from '../hotel-rooms/hotel-rooms.component';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSlideToggleModule, MatIconModule, MatButtonModule, MatExpansionModule],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @Input() hotel!: Hotel;
  @Output() onHotelEdit = new EventEmitter<void>();

  constructor(
    private hotelsService: HotelsService,
    public dialog: MatDialog) {
    
  }

  openHotelDialog() {
    const dialogRef = this.dialog.open(HotelDetailComponent, {
      width: '400px',
      data: { hotel: { ...this.hotel } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hotelsService.updateHotel(result);
        this.onHotelEdit.emit();
      }
    });
  }

  openRoomsDialog() {
    const dialogRef = this.dialog.open(HotelRoomsComponent, {
      width: '1000px',
      data: { hotel: { ...this.hotel } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onHotelEdit.emit();
      }
    });
  }
}
