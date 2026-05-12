import axios from 'axios';
import type { MoviesResponse } from "../types/movie";

// const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
// if (!TOKEN) {
//   throw new Error("TMDB token is missing");
// }

interface FetchMoviesParams {
  query: string;
  page: number;
}
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
  

export const fetchMovies = async ({
  query,
  page,
}: FetchMoviesParams): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>('/search/movie', {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return response.data;
};