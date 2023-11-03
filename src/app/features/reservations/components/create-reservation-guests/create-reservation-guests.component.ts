import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
    ReactiveFormsModule,
  ],
  templateUrl: './create-reservation-guests.component.html',
  styleUrls: ['./create-reservation-guests.component.css']
})
export class CreateReservationGuestsComponent implements OnInit {
  form!: FormGroup;
  guests: Guest[] = [];

  displayedColumns: string[] = ['FirstName', 'LastName', 'Birthday', 'Gender', 'DocumentType', 'DocumentNumber', 'Email', 'ContactPhone'];
  dataSource: MatTableDataSource<Guest> = new MatTableDataSource();

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      FirstName     : ['', Validators.required],
      LastName      : ['', Validators.required],
      Birthday      : ['', Validators.required],
      DocumentType  : ['', Validators.required],
      DocumentNumber: ['', Validators.required],
      Gender        : ['', Validators.required],
      Email         : ['', [Validators.required, Validators.email]],
      ContactPhone  : ['', Validators.required]
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
}
