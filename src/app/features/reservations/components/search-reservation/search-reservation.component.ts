import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AvailableRooms, SearchAvailableRooms } from '../../models/reservations.models';
import { ReservationsService } from '../../services/reservations.service';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';

@Component({
  selector: 'app-search-reservation',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    MatButtonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatCardModule, 
    MatDialogModule, 
    ReactiveFormsModule
  ],
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.css']
})
export class SearchReservationComponent implements OnInit {
  form!: FormGroup;
  search: SearchAvailableRooms = {
    StartDate: new Date,
    EndDate: new Date,
    PeopleCount: 0,
    City: ''
  }

  showSearchResult: boolean = false;
  displayedColumns: string[] = ['Hotel', 'Room', 'StartDate', 'EndDate', 'Price', 'Actions'];
  dataSource: MatTableDataSource<AvailableRooms> = new MatTableDataSource();

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationsService,
    public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      StartDate   : ['', Validators.required],
      EndDate     : ['', Validators.required],
      PeopleCount : ['', Validators.required],
      City        : ['', Validators.required]
    })
  }

  onSearch() {
    this.showSearchResult = true;
    this._loadAvailableRooms();
  }

  openConfirmReservation(available: AvailableRooms) {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '800px',
      data: { availableRoom: { ...available } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }      
    });
  }

  checkForErrorsIn(formControlName: string): string {
    if (!this.form.get(formControlName)?.touched || 
        !this.form.get(formControlName)?.invalid) 
        return '';

    if (this.form.get(formControlName)?.errors?.['required']) {
      return 'El campo es obligatorio.'
    }

    return '';
  }

  private _loadAvailableRooms() {
    this.reservationService.getAvailableRooms().subscribe(data => this.dataSource = new MatTableDataSource(data));
  }
}
