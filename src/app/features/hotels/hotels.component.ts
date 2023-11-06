import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { Hotel } from './models/hotels.models';
import { HotelsService } from './services/hotels.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    HotelCardComponent,
    MatDialogModule
  ],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  hotels: Hotel[] = [];

  constructor(
    private hotelsService: HotelsService,
    public dialog: MatDialog
  ) {
    this._loadHotels();
  }

  openHotelDetail() {
    const dialogRef = this.dialog.open(HotelDetailComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.hotelsService.createHotel(result)
        .subscribe(() => this._loadHotels());
      }      
    });
  }

  hotelEdited() {
    this._loadHotels();
  }

  private _loadHotels() {
    this.hotelsService
      .getHotels()
      .subscribe((data) => this.hotels = data);
  }
}
