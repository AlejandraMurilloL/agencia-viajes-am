import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchReservation } from '../../models/reservations.models';

@Component({
  selector: 'app-search-reservation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule],
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

  onSearch() {
    console.log(this.search);
  }
}
