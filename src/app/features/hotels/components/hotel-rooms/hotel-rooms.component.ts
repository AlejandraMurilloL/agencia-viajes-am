import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Hotel, Room, RoomType } from '../../models/hotels.models';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatOptionModule, 
    MatDialogModule, 
    MatExpansionModule, 
    MatIconModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSlideToggleModule, 
    MatPaginatorModule, 
    MatTableModule, 
    MatTabsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {

  form!: FormGroup;
  hotel!: Hotel;
  room: Room = {
    Id: '',
    Name: '',
    BaseCost: 0,
    Taxes: 0,
    RoomType: '',
    RoomTypeId: '',
    Location: '',
    Active: true
  };
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

  displayedColumns: string[] = ['Name', 'BaseCost', 'Taxes', 'RoomType', 'Location', 'Active', 'Actions'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource();

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelsService,
    public dialogRef: MatDialogRef<HotelRoomsComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.hotel) {
      this.hotel = this.data.hotel;
      this.dataSource = new MatTableDataSource(this.hotel.Rooms);
    }

    this.form = this.formBuilder.group({
      Id         : [this.room.Id],
      Name       : [this.room.Name, Validators.required],
      BaseCost   : [this.room.BaseCost, Validators.required],
      Taxes      : [this.room.Taxes, Validators.required],
      RoomType   : [this.room.RoomType ?? true],
      RoomTypeId : [this.room.RoomTypeId ?? [], Validators.required],
      Location   : [this.room.Location, Validators.required],
      Active     : [this.room.Active ?? true],
      HotelId    : [this.hotel.Id]
    });
  }

  onAddRoom(room: Room) {
    this.hotelService.addRoomToHotel(room);
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
