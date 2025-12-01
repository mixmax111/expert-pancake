import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importiamo la Navbar per poterla usare nell'HTML
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Qui dichiariamo che usiamo RouterOutlet e NavbarComponent
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html', // Deve puntare al file rinominato
  styleUrl: './app.component.css'      // Deve puntare al file css creato
})
export class AppComponent {
  title = 'ITSCinemaX';
}
