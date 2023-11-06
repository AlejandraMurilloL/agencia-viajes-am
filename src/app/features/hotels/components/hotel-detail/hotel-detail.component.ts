import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Hotel } from '../../models/hotels.models';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTabsModule,  
    ReactiveFormsModule
  ],
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit  {

  form!: FormGroup;
  hotel: Hotel = {
    id: '',
    name: '',
    description: '',
    city: '',
    active: true,
    rooms: []
  };

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<HotelDetailComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.hotel) {
      this.hotel = this.data.hotel;
    }

    this.form = this.formBuilder.group({
      name        : [this.hotel.name, Validators.required],
      city        : [this.hotel.city, Validators.required],
      description : [this.hotel.description],
      id          : [this.hotel.id],
      active      : [this.hotel.active ?? true],
      rooms       : [this.hotel.rooms ?? []]
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
}
