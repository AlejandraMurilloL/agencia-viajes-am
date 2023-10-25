import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { Hotel } from './models/hotels.models';
import { HotelsService } from './services/hotels.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, HotelCardComponent],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  hotels: Hotel[] = [];

  constructor(private hotelsService: HotelsService) {
    this._loadHotels();
  }

  private _loadHotels() {
    this.hotelsService
      .getHotels()
      .subscribe((data) => this.hotels = data);
  }
}
