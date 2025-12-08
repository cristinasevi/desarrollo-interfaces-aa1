import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdbApi.ts';
import MovieGrid from '../components/MovieGrid.tsx';
import SearchBar from '../components/SearchBar.tsx';
import Loading from '../components/Loading.tsx';
import type { Movie } from '../types/movie.ts';
import './Search.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      const data = await searchMovies(query);
      setMovies(data.results);
      setLoading(false);
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="search">
      <div className="search__header">
        <h1>Buscar Películas</h1>
        <SearchBar />
      </div>

      <div className="search__content">
        {loading && <Loading />}
        {!loading && query && (
          <>
            <p className="search__info">
              Resultados para: <strong>{query}</strong> ({movies.length} películas)
            </p>
            <MovieGrid movies={movies} />
          </>
        )}
        {!query && (
          <div className="search__empty">
            <p>Escribe algo para buscar películas</p>
          </div>
        )}
      </div>
    </div>
  );
}
