import axios from "axios";

import toast from "react-hot-toast";
import type { MoviesHttpResponse } from "../types/responce";

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

    console.log("Fetched movies:", response.data.results);

    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Помилка при запиті:", error);
    toast.error("Failed to fetch movies. Please try again.");
    return {
      results: [],
      total_pages: 0,
    };
  }
};
