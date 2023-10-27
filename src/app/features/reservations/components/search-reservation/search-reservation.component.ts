import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SearchReservation, SearchReservationResult } from '../../models/reservations.models';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-search-reservation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatCardModule],
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.css']
})
export class SearchReservationComponent {
  search: SearchReservation = {
    StartDate: new Date,
    EndDate: new Date,
    PeopleCount: 0,
    City: ''
  }

  showSearchResult: boolean = false;
  displayedColumns: string[] = ['Hotel', 'Room', 'StartDate', 'EndDate', 'Price', 'Actions'];
  dataSource: MatTableDataSource<SearchReservationResult> = new MatTableDataSource();

  constructor(private reservationService: ReservationsService) {
    
  }

  onSearch() {
    this.showSearchResult = true;
    this._loadAvailableRooms();
    console.log(this.search);
  }

  private _loadAvailableRooms() {
    this.reservationService.getAvailableRooms().subscribe(data => this.dataSource = new MatTableDataSource(data));
  }
}
