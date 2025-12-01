export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids?: number[]; // Usato nella Home (array di numeri)
  genres?: Genre[];     // Usato nel Dettaglio (array di oggetti)

  // Campi extra che causano il tuo errore (ora li aggiungiamo)
  runtime?: number;     // Durata in minuti
  tagline?: string;     // Frase a effetto
  status?: string;      // Stato (es. Released)
}

export interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}
