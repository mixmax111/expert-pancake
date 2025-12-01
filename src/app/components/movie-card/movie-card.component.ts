import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  // Costruisce l'URL completo dell'immagine
  get imageUrl(): string {
    return this.movie.poster_path
      ? `${environment.tmdbImageBaseUrl}${this.movie.poster_path}`
      : 'assets/no-image.png'; // Fallback se non c'è immagine (puoi mettere un placeholder)
  }

  // Tronca la descrizione a circa 20 caratteri
  get shortOverview(): string {
    if (!this.movie.overview) return 'Nessuna descrizione';
    return this.movie.overview.length > 20
      ? this.movie.overview.substring(0, 20) + '...'
      : this.movie.overview;
  }
}
