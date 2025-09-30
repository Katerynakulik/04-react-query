import axios from "axios";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";

interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get<MoviesHttpResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query: query,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    console.log("Fetched movies:", response.data.results);

    return response.data.results;
  } catch (error) {
    console.error("Помилка при запиті:", error);
    toast.error("Failed to fetch movies. Please try again.");
    return [];
  }
};
