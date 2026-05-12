import axios from 'axios';
import type { Movie } from "../types/movie";

// const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
// if (!TOKEN) {
//   throw new Error("TMDB token is missing");
// }
interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
      },
      ...options,
    }
  );

  return response.data;
};