import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { Hotel } from './models/hotels.models';
import { HotelsService } from './services/hotels.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    HotelCardComponent,
    HotelDetailComponent,
    MatDialogModule,
  ],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent {
  hotels: Hotel[] = [];

  constructor(
    private hotelsService: HotelsService,
    public dialog: MatDialog
  ) {
    this.loadHotels();
  }

  openDialog() {
    const dialogRef = this.dialog.open(HotelDetailComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = crypto.randomUUID();
        this.hotelsService.createHotel(result);
        this.loadHotels();
      }
    });
  }

  loadHotels() {
    this.hotelsService.getHotels().subscribe(data => (this.hotels = data));
  }
}
