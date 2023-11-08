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
import { HotelsService } from '../../services/hotels.service';

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
  roomTypes: RoomType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelsService) {

  }

  ngOnInit(): void {
    this._loadRoomTypes();
    this.form = this.formBuilder.group({
      id         : [''],
      name       : ['', Validators.required],
      baseCost   : ['', Validators.required],
      taxes      : ['', Validators.required],
      roomType   : [''],
      roomTypeId : ['', Validators.required],
      location   : ['', Validators.required],
      active     : [true],
      hotelId    : [this.hotel.id]
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
    this.form.reset();
    this.addRoom.emit(room);
  }

  private _loadRoomTypes() {
    this.hotelService.getAllRoomTypes().subscribe(data => this.roomTypes = data);
  }
}
