import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Reservation } from '../../models/reservations.models';

@Component({
  selector: 'app-create-reservation-basic-info',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-reservation-basic-info.component.html',
  styleUrls: ['./create-reservation-basic-info.component.css']
})
export class CreateReservationBasicInfoComponent implements OnInit {

  @Output() basicInfoAdded: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

  }

  ngOnInit(): void {
    const selectedRoom = this.data.availableRoom;

    this.form = this.formBuilder.group({
      hotelName   : [{ value: selectedRoom.hotelName, disabled: true }, Validators.required],
      roomName    : [{ value: selectedRoom.roomName, disabled: true }, Validators.required],
      startDate   : [{ value: selectedRoom.startDate, disabled: true }, Validators.required],
      endDate     : [{ value: selectedRoom.endDate, disabled: true }, Validators.required],
      contactName : ['', Validators.required],
      contactPhone: ['', Validators.required],
      guests      : [[]],
      hotelId     : [selectedRoom.hotelId],
      roomId      : [selectedRoom.roomId]
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

  passToGuestsStep() {
    const reservation = this.form.value;
    reservation.startDate = this.data.availableRoom.startDate;
    reservation.endDate = this.data.availableRoom.endDate;
    this.basicInfoAdded.emit(reservation);
  }
}
