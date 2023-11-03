import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Room } from '../../models/hotels.models';

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
export class HotelRoomsListComponent implements OnInit {
  
  @Input() rooms: Room[] = [];

  displayedColumns: string[] = ['Name', 'BaseCost', 'Taxes', 'RoomType', 'Location', 'Active', 'Actions'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.rooms);
  }
}
