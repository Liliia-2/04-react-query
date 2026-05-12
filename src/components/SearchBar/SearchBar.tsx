import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({
  onSubmit,
}: SearchBarProps) {
  const handleSubmit = (formData: FormData): void => {
    const query = formData.get('query') as string;

    if (query.trim() === '') {
      toast.error('Please enter search term!');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <form action={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          className={css.input}
        />

        <button type="submit">Search</button>
      </form>
    </header>
  );
}