import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Hotel } from '../../models/hotels.models';
import { MatDialog } from '@angular/material/dialog';
import { HotelDetailComponent } from '../hotel-detail/hotel-detail.component';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css'],
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;
  @Output() onHotelEdit = new EventEmitter<void>();

  constructor(
    private hotelsService: HotelsService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(HotelDetailComponent, {
      width: '400px',
      data: { hotel: { ...this.hotel } },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hotelsService.updateHotel(result);
        this.onHotelEdit.emit();
      }
    });
  }
}
