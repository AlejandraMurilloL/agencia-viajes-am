import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RoomsDetailComponent } from './components/rooms-detail/rooms-detail.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { Room } from './models/rooms.models';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RoomsListComponent, MatDialogModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit  {
  rooms: Room[] = [];

  constructor(
    private roomsService: RoomsService,
    public dialog: MatDialog
    ) {    
  }

  ngOnInit(): void {
    this._loadRooms();    
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(RoomsDetailComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        result.Id = crypto.randomUUID();
        this.roomsService.createRoom(result);
        this._loadRooms();
      }      
    });
  }

  onEditRoom() {
    this._loadRooms();
  }

  private _loadRooms() {
    this.roomsService.getRooms().subscribe(data => this.rooms = data);
  }

}
