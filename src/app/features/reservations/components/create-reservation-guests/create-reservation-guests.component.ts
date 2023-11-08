import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Guest } from '../../models/reservations.models';

@Component({
  selector: 'app-create-reservation-guests',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule, 
    MatPaginatorModule, 
    MatTableModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-reservation-guests.component.html',
  styleUrls: ['./create-reservation-guests.component.css']
})
export class CreateReservationGuestsComponent implements OnInit {
  @Output() addGuestToReservation: EventEmitter<Guest> = new EventEmitter<Guest>();
  form!: FormGroup;
  guests: Guest[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'gender', 'documentType', 'documentNumber', 'email', 'contactPhone'];
  dataSource: MatTableDataSource<Guest> = new MatTableDataSource();

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName     : ['', Validators.required],
      lastName      : ['', Validators.required],
      birthday      : ['', Validators.required],
      documentType  : ['', Validators.required],
      documentNumber: ['', Validators.required],
      gender        : ['', Validators.required],
      email         : ['', [Validators.required, Validators.email]],
      contactPhone  : ['', Validators.required]
    });
  }

  checkForGuestErrorsIn(formControlName: string): string {
    if (!this.form.get(formControlName)?.touched || 
        !this.form.get(formControlName)?.invalid) 
        return '';

    if (this.form.get(formControlName)?.errors?.['required']) {
      return 'El campo es obligatorio.'
    }

    if (this.form.get(formControlName)?.errors?.['email']) {
      return 'El email debe contener el formato correcto example@email.com'
    }

    return '';
  }

  addGuest(guest: Guest){
    this.guests.push(guest);
    this.dataSource = new MatTableDataSource(this.guests);
    this.form.reset();
    this.addGuestToReservation.emit(guest);
  }
}
