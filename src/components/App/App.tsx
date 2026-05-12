import { useState } from 'react'
import css from './App.module.css'
// import type { Movie } from "../../types/movie"
import { fetchMovies } from "../../services/movieService"
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
// import ErrorMessage from '../ErrorMessage/ErrorMessage'
// import MovieModal from '../MovieModal/MovieModal'
// import toast, { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query !== '',
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 0, 500);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {isError && <p>Something went wrong...</p>}

      {movies.length > 0 && <MovieGrid movies={movies} />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
}


//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
//   const handleSearch = async (query: string) => {
//     try {
//       setMovies([]);
//       setError(false);
//       setLoading(true);

//       const data = await fetchMovies(query);

//       if (data.length === 0) {
//         toast.error("No movies found for your request.");
//       }

//       setMovies(data);
//     } catch {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <SearchBar onSubmit={handleSearch} />
//       <Toaster />

//       {loading && <Loader />}
//       {error && <ErrorMessage />}
//       {movies.length > 0 && (
//         <MovieGrid movies={movies} onSelect={setSelectedMovie} />
//       )}

//       {selectedMovie && (
//         <MovieModal
//           movie={selectedMovie}
//           onClose={() => setSelectedMovie(null)}
//         />
//       )}
//     </>
//   );
// }