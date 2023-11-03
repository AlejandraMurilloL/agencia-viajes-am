import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Hotel, Room, RoomType } from '../../models/hotels.models';

@Component({
  selector: 'app-hotel-rooms-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './hotel-rooms-detail.component.html',
  styleUrls: ['./hotel-rooms-detail.component.css']
})
export class HotelRoomsDetailComponent implements OnInit {
  
  @Input() hotel!: Hotel;
  @Output() addRoom: EventEmitter<Room> = new EventEmitter<Room>();
  form!: FormGroup;
  
  roomTypes: RoomType[] = [
    {
      Id: '001',
      Name: 'Doble'
    },
    {
      Id: '002',
      Name: 'Familiar'
    },
    {
      Id: '003',
      Name: 'Suite'
    },
  ];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id         : [''],
      Name       : ['', Validators.required],
      BaseCost   : ['', Validators.required],
      Taxes      : ['', Validators.required],
      RoomType   : [''],
      RoomTypeId : ['', Validators.required],
      Location   : ['', Validators.required],
      Active     : [true],
      HotelId    : [this.hotel.Id]
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

  addRoomEmit(room: Room) {
    this.addRoom.emit(room);
  }
}
