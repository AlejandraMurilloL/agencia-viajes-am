import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AvailableRooms, SearchAvailableRooms } from '../../models/reservations.models';
import { ReservationsService } from '../../services/reservations.service';
import { AvailableRoomsFilterComponent } from '../available-rooms-filter/available-rooms-filter.component';
import { AvailableRoomsListComponent } from '../available-rooms-list/available-rooms-list.component';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';

@Component({
  selector: 'app-available-rooms',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    AvailableRoomsFilterComponent,
    AvailableRoomsListComponent
  ],
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css']
})
export class AvailableRoomsComponent {

  availableRooms: AvailableRooms[] = [];
  showSearchResult = false;

  constructor(
    private reservationService: ReservationsService,
    public dialog: MatDialog) {
    
  }

  doSearch(filter: SearchAvailableRooms) {
    this.showSearchResult = true;
    this._loadAvailableRooms(filter);
  }

  openConfirmReservation(available: AvailableRooms) {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '800px',
      data: { availableRoom: { ...available } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.reservationService.confirmReservation(result)
          .subscribe(() => {
            this.availableRooms = [];
          }
        );
      }      
    });
  }

  private _loadAvailableRooms(filter: SearchAvailableRooms) {
    this.reservationService
      .getAvailableRooms(filter)
      .subscribe(data => this.availableRooms = data);
  }
}
