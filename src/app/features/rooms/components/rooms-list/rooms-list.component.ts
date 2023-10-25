import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Room } from '../../models/rooms.models';
import { RoomsService } from '../../services/rooms.service';
import { RoomsDetailComponent } from '../rooms-detail/rooms-detail.component';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() rooms: Room[] = [];
  @Output() onEditRoom: EventEmitter<void> = new EventEmitter<void>();
  
  displayedColumns: string[] = ['Name', 'BaseCost', 'Taxes', 'RoomType', 'Location', 'Active', 'Actions'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource(this.rooms);
  
  constructor(
    private roomsService: RoomsService,
    public dialog: MatDialog
  ) {    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rooms = changes['rooms'].currentValue;
    this.dataSource = new MatTableDataSource(this.rooms);
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.rooms);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(room: Room) {
    const dialogRef = this.dialog.open(RoomsDetailComponent, {
      width: '400px',
      data: { room : { ...room } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.roomsService.updateRoom(result);
        this.onEditRoom.emit();
      }      
    });
  }
}
