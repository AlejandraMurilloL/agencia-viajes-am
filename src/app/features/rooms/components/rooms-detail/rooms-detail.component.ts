import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Room, RoomType } from '../../models/rooms.models';

@Component({
  selector: 'app-rooms-detail',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatDialogModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.css']
})
export class RoomsDetailComponent implements OnInit {
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
  ]

  constructor(
    public dialogRef: MatDialogRef<RoomsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void { 
    if (this.data.room) {
      this.room = this.data.room;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
