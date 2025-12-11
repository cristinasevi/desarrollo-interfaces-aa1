import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, getGenres } from '../services/tmdbApi.ts';
import MovieGrid from '../components/MovieGrid.tsx';
import SearchBar from '../components/SearchBar.tsx';
import Loading from '../components/Loading.tsx';
import type { Movie, Genre } from '../types/movie.ts';
import './Search.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    getGenres().then(data => setGenres(data));
  }, []);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    searchMovies(query).then(data => {
      setMovies(data.results);
      setFilteredMovies(data.results);
      setLoading(false);
    });
  }, [query]);

  useEffect(() => {
    let peliculas = movies;

    if (selectedGenre) {
      peliculas = movies.filter(pelicula => 
        pelicula.genre_ids.includes(Number(selectedGenre))
      );
    }

    if (sortOrder === 'asc') {
      peliculas = [...peliculas].sort((a, b) => a.vote_average - b.vote_average);
    }
    if (sortOrder === 'desc') {
      peliculas = [...peliculas].sort((a, b) => b.vote_average - a.vote_average);
    }

    setFilteredMovies(peliculas);
  }, [movies, selectedGenre, sortOrder]);

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
            <div className="search__controls">
              <div className="search__filter">
                <label>Filtrar por género:</label>
                <select 
                  value={selectedGenre} 
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="search__select"
                >
                  <option value="">Todos los géneros</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search__sort">
                <label>Ordenar por puntuación:</label>
                <select 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="search__select"
                >
                  <option value="">Sin ordenar</option>
                  <option value="desc">Mayor a menor</option>
                  <option value="asc">Menor a mayor</option>
                </select>
              </div>
            </div>

            <p className="search__info">
              Resultados para: <strong>{query}</strong> ({filteredMovies.length} películas)
            </p>
            <MovieGrid movies={filteredMovies} />
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
