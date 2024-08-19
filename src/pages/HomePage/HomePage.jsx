import MoviesList from "../../components/MoviesList/MoviesList";
import { useEffect, useState } from "react";
import { getMovies } from "../../services/api";
import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getMovies();
        console.log(data);
        setTrendingMovies(() => data.results);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.pageHeader}>Trending this week</h1>
      {isLoading && <Loader />}
      <MoviesList movies={trendingMovies} />
      {error !== null && <ErrorMessage />}
    </div>
  );
};

export default HomePage;
