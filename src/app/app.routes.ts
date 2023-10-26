import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hoteles'
    },
    {
        path: 'hoteles',
        loadComponent: () => import('./features/hotels/hotels.component').then(comp => comp.HotelsComponent)
    },
    {
        path: 'reservas',
        loadComponent: () => import('./features/reservations/reservations.component').then(comp => comp.ReservationsComponent)
    }
];
