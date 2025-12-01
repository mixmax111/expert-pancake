import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from '../../services/tmdb.service';
import { Movie, Genre } from '../../interfaces/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = [];
  years: number[] = [];

  // STATO
  searchTerm: string = '';
  selectedGenreId: string = '';
  selectedYear: number = 2025;
  currentPage: number = 1;
  isLoading: boolean = false;

  constructor(
    private tmdbService: TmdbService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.generateYears();

    this.tmdbService.getGenres().subscribe(resp => {
      this.genres = resp.genres;
    });

    this.applyFilters();
  }

  generateYears() {
    const currentYear = 2025;
    for (let i = 0; i < 30; i++) {
      this.years.push(currentYear - i);
    }
  }

  // --- LOGICA PAGINAZIONE DINAMICA ---
  // Calcola i 5 numeri da mostrare (es: se sei a pag 4 mostra 2,3,4,5,6)
  get visiblePages(): number[] {
    const totalToShow = 5;
    let startPage = Math.max(1, this.currentPage - 2);

    // Se siamo alle pagine 1 o 2, blocchiamo l'inizio a 1
    if (this.currentPage <= 3) {
      startPage = 1;
    }

    return Array.from({ length: totalToShow }, (_, i) => startPage + i);
  }

  goToPage(page: number) {
    if (page < 1 || page === this.currentPage) return;
    this.currentPage = page;
    this.applyFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changePage(delta: number) {
    this.goToPage(this.currentPage + delta);
  }
  // ------------------------------------

  applyFilters() {
    const term = this.searchTerm.trim();
    this.isLoading = true;

    // Helper per gestire la risposta e aggiornare la vista
    const handleResponse = (resp: any) => {
      this.movies = resp.results;
      this.isLoading = false;
      this.cd.detectChanges();
    };

    if (term) {
      this.tmdbService.searchMovies(term).subscribe({
        next: handleResponse,
        error: () => { this.isLoading = false; this.cd.detectChanges(); }
      });
    } else {
      const genreId = this.selectedGenreId ? Number(this.selectedGenreId) : undefined;
      this.tmdbService.getDiscoverMovies(this.selectedYear, genreId, this.currentPage).subscribe({
        next: handleResponse,
        error: () => { this.isLoading = false; this.cd.detectChanges(); }
      });
    }
  }

  onFilterChange() {
    this.currentPage = 1;
    this.applyFilters();
  }
}
