import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { Room } from './models/rooms.models';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RoomsListComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit  {
  rooms: Room[] = [];

  constructor(private roomsService: RoomsService) {    
  }

  ngOnInit(): void {
    this._loadRooms();    
  }

  private _loadRooms() {
    this.roomsService.getRooms().subscribe(data => this.rooms = data);
  }
}
