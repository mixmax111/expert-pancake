import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenreResponse, Movie, TmdbResponse } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.apiToken}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // Gestisce Anno e Genere
  getDiscoverMovies(year: number, genreId?: number, page: number = 1): Observable<TmdbResponse> {
    let params = new HttpParams()
      .set('primary_release_year', year.toString())
      .set('sort_by', 'popularity.desc')
      .set('page', page.toString())
      .set('language', 'it-IT');

    // Se c'è un genere selezionato, lo aggiungiamo
    if (genreId) {
      params = params.set('with_genres', genreId.toString());
    }

    return this.http.get<TmdbResponse>(`${environment.tmdbBaseUrl}/discover/movie`, {
      headers: this.headers,
      params
    });
  }

  searchMovies(query: string): Observable<TmdbResponse> {
    const params = new HttpParams()
      .set('query', query)
      .set('language', 'it-IT');

    return this.http.get<TmdbResponse>(`${environment.tmdbBaseUrl}/search/movie`, {
      headers: this.headers,
      params
    });
  }

  getGenres(): Observable<GenreResponse> {
    return this.http.get<GenreResponse>(`${environment.tmdbBaseUrl}/genre/movie/list?language=it-IT`, {
      headers: this.headers
    });
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.tmdbBaseUrl}/movie/${id}?language=it-IT`, {
      headers: this.headers
    });
  }
}
