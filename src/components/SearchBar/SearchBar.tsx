import { useState, type FormEvent } from "react";
import styles from "./SearchBar.module.css";


interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!query.trim()) return; 
        onSubmit(query);
    };

    return (

        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(event)=>setQuery(event.target.value)}
                    />
                    <button type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}