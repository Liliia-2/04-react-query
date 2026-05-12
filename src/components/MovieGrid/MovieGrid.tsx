import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key={movie.id}
                className={css.item}
                onClick={() => onSelect(movie)}>
                <img
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className={css.image}
          />    
                        <h2 className={css.title}>{movie.title}</h2>
                 </li>
    ))}
        </ul>
    );
}