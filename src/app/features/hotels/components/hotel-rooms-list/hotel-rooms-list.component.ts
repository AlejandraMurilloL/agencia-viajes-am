import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Room } from '../../models/hotels.models';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-hotel-rooms-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './hotel-rooms-list.component.html',
  styleUrls: ['./hotel-rooms-list.component.css']
})
export class HotelRoomsListComponent implements OnInit, OnChanges {
  
  @Input() rooms: Room[] = [];

  displayedColumns: string[] = ['Name', 'BaseCost', 'Taxes', 'RoomTypeName', 'Location', 'Active'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource();

  constructor(private hotelService: HotelsService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rooms = changes['rooms'].currentValue;
    this.dataSource = new MatTableDataSource(this.rooms);    
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.rooms);
  }

  changeRoomStatus(room: Room) {
    const roomToChange = this.rooms.find(x => x.id === room.id);

    if (!roomToChange) return;

    roomToChange.active = !roomToChange?.active;
    this.hotelService.changeRoomStatus(room.hotelId, room.id, roomToChange.active).subscribe();
  }
}
