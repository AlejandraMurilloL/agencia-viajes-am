import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AvailableRooms } from '../../models/reservations.models';

@Component({
  selector: 'app-available-rooms-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './available-rooms-list.component.html',
  styleUrls: ['./available-rooms-list.component.css']
})
export class AvailableRoomsListComponent implements OnInit {
  
  @Input() availableRooms: AvailableRooms[] = [];
  @Output() openConfirmReservation: EventEmitter<AvailableRooms> = new EventEmitter<AvailableRooms>(); 

  displayedColumns: string[] = ['Hotel', 'Room', 'StartDate', 'EndDate', 'Price', 'Actions'];
  dataSource: MatTableDataSource<AvailableRooms> = new MatTableDataSource();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.availableRooms);
  }

  doConfirmReservation(selectedRoom: AvailableRooms) {
    this.openConfirmReservation.emit(selectedRoom);
  }
}
