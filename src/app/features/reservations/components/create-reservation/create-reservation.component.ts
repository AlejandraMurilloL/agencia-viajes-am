import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Guest, Reservation } from '../../models/reservations.models';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule,  
    MatFormFieldModule, 
    MatInputModule, 
    MatTabsModule, 
    MatIconModule, 
    MatExpansionModule, 
    MatPaginatorModule, 
    MatTableModule, 
    ReactiveFormsModule
  ],
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  form!: FormGroup;
  guestForm!: FormGroup;
  reservation: Reservation = {
    Hotel: '',
    Room: '',
    StartDate: new Date(),
    EndDate: new Date(),
    ContactName: '',
    ContactPhone: '',
    Guests: []
  };

  guest: Guest = {
    FirstName: '',
    LastName: '',
    Birthday: new Date(),
    DocumentType: '',
    DocumentNumber: '',
    Gender: '',
    Email: '',
    ContactPhone: ''
  }

  displayedColumns: string[] = ['FirstName', 'LastName', 'Birthday', 'Gender', 'DocumentType', 'DocumentNumber', 'Email', 'ContactPhone'];
  dataSource: MatTableDataSource<Guest> = new MatTableDataSource();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateReservationComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.availableRoom) {
      const { StartDate, EndDate, Hotel, Room } = this.data.availableRoom;
      this.reservation.Hotel = Hotel;
      this.reservation.Room = Room;
      this.reservation.StartDate = StartDate.toLocaleDateString();
      this.reservation.EndDate = EndDate.toLocaleDateString();
    }

    this.form = this.formBuilder.group({
      Hotel       : [{ value: this.reservation.Hotel, disabled: true }, Validators.required],
      Room        : [{ value: this.reservation.Room, disabled: true }, Validators.required],
      StartDate   : [{ value: this.reservation.StartDate, disabled: true }, Validators.required],
      EndDate     : [{ value: this.reservation.EndDate, disabled: true }, Validators.required],
      ContactName : ['', Validators.required],
      ContactPhone: ['', Validators.required],
      Guests      : [[]]
    });

    this.guestForm = this.formBuilder.group({
      FirstName     : ['', Validators.required],
      LastName      : ['', Validators.required],
      Birthday      : ['', Validators.required],
      DocumentType  : ['', Validators.required],
      DocumentNumber: ['', Validators.required],
      Gender        : ['', Validators.required],
      Email         : ['', [Validators.required, Validators.email]],
      ContactPhone  : ['']
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
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

  checkForGuestErrorsIn(formControlName: string): string {
    if (!this.guestForm.get(formControlName)?.touched || 
        !this.guestForm.get(formControlName)?.invalid) 
        return '';

    if (this.guestForm.get(formControlName)?.errors?.['required']) {
      return 'El campo es obligatorio.'
    }

    if (this.guestForm.get(formControlName)?.errors?.['email']) {
      return 'El email debe contener el formato correcto example@email.com'
    }

    return '';
  }
}
