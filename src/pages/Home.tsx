import { useState, useEffect } from 'react';
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies } from '../services/tmdbApi.ts';
import MovieGrid from '../components/MovieGrid.tsx';
import SearchBar from '../components/SearchBar.tsx';
import Loading from '../components/Loading.tsx';
import type { Movie } from '../types/movie.ts';
import './Home.css';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      
      const popular = await getPopularMovies();
      const nowPlaying = await getNowPlayingMovies();
      const topRated = await getTopRatedMovies();

      setPopularMovies(popular.results);
      setNowPlayingMovies(nowPlaying.results);
      setTopRatedMovies(topRated.results);
      
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="home">
      <section className="home__hero">
        <h1>Descubre películas increíbles</h1>
        <SearchBar />
      </section>

      <div className="home__content">
        <MovieGrid movies={popularMovies} title="Películas Populares" />
        <MovieGrid movies={nowPlayingMovies} title="En Cartelera" />
        <MovieGrid movies={topRatedMovies} title="Mejor Valoradas" />
      </div>
    </div>
  );
}
