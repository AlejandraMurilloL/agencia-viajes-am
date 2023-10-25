import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Hotel } from '../../models/hotels.models';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSlideToggleModule, MatIconModule, MatButtonModule],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;
}
