import { useState } from 'react'
// import css from './App.module.css'
import type { Movie } from "../../types/movie"
import { fetchMovies } from "../../services/movieService"
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import { Toaster, toast } from "react-hot-toast";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);
  
  
const { data, isLoading, isError, isSuccess, isFetching, } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies( query, page ),
  enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
  };
const handlePageChange = ({
    selected,
  }: {
    selected: number;}): void => {
    setPage(selected + 1);
  };

  if (isSuccess && data.results.length === 0) {
    toast.error('No movies found!');
  }
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage/>}

      {data && (
        <MovieGrid
          movies={data.results}
          onSelect={setSelectedMovie} />)}
      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          onPageChange={handlePageChange}
          forcePage={page - 1}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <Toaster />
    </div>
  );
}
      

    