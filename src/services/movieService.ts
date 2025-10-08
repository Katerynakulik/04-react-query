import axios from "axios";

import type { Movie } from "../types/movie";
export interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}
export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesHttpResponse> => {
  try {
    const response = await axios.get<MoviesHttpResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query: query,
          include_adult: false,
          language: "en-US",
          page,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};
