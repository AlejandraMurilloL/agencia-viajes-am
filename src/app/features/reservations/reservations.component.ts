import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { Reservation } from './models/reservations.models';
import { ReservationsService } from './services/reservations.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  displayedColumns: string[] = ['Hotel', 'Room', 'StartDate', 'EndDate', 'ContactName', 'ContactPhone', 'Actions'];
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource();

  constructor(
    private reservationsService: ReservationsService,
    public dialog: MatDialog
    ) {
    
  }

  ngOnInit(): void {
    this._loadReservations();
  }

  openDialog(reservation: Reservation) {
    const dialogRef = this.dialog.open(ReservationDetailComponent, {
      width: '1100px',
      data: { Reservation: {...reservation} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        
      }      
    });
  }

  private _loadReservations() {
    this.reservationsService.getReservations().subscribe(data => this.dataSource = new MatTableDataSource(data));
  }
}
