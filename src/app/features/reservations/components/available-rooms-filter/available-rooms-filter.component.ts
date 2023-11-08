import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchAvailableRooms } from '../../models/reservations.models';

@Component({
  selector: 'app-available-rooms-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './available-rooms-filter.component.html',
  styleUrls: ['./available-rooms-filter.component.css']
})
export class AvailableRoomsFilterComponent implements OnInit {

  @Output() doSearch: EventEmitter<SearchAvailableRooms> = new EventEmitter<SearchAvailableRooms>();
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate   : ['', Validators.required],
      endDate     : ['', Validators.required],
      peopleCount : ['', Validators.required],
      city        : ['', Validators.required]
    })
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

  doSearchRooms() {
    this.doSearch.emit(this.form.value);
  }
}
