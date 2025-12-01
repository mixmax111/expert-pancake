import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- 1. IMPORTA
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../interfaces/movie';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  videoUrl: SafeResourceUrl | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private cd: ChangeDetectorRef // <--- 2. INIETTA QUI
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.loadMovie(id);
      this.setupVideo(idParam);
    } else {
      this.isLoading = false;
    }
  }

  loadMovie(id: number) {
    this.tmdbService.getMovieById(id).subscribe({
      next: (resp) => {
        console.log('Film caricato:', resp.title);
        this.movie = resp;
        this.isLoading = false;

        this.cd.detectChanges(); // <--- 3. FORZA L'AGGIORNAMENTO QUI
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Impossibile caricare il film.';
        this.isLoading = false;

        this.cd.detectChanges(); // <--- E ANCHE QUI IN CASO DI ERRORE
      }
    });
  }

  setupVideo(id: string) {
    const rawUrl = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  goBack() {
    this.location.back();
  }

  get imageUrl(): string {
    return this.movie?.poster_path
      ? `${environment.tmdbImageBaseUrl}${this.movie.poster_path}`
      : 'assets/no-image.png';
  }
}
