import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agencia-viajes-am';
}
