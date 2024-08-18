import MoviesList from "../../components/MoviesList/MoviesList";
import { useEffect, useState } from "react";
import { getMovies } from "../../services/api";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const data = await getMovies();
        console.log(data);
        setTrendingMovies(() => data.results);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.pageHeader}>Trending this week</h1>
      <MoviesList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;
