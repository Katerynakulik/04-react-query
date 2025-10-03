import type { Movie } from "./movie";

export interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}
