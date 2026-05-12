import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
//   onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key = { movie.id }>
                    
                        <h2 className={css.title}>{movie.title}</h2>
                 </li>
    ))}
        </ul>
    );
}