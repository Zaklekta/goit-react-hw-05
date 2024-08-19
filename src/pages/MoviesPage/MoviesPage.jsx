import { useEffect, useState } from "react";
import SearchMoviesForm from "../../components/SearchMoviesForm/SearchMoviesForm";
import { getMoviesBySearchValue } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import css from "./MoviesPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesBySearchValue, setMoviesBySearchValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  console.log(location);

  const query = searchParams.get("query");

  const onSearch = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };
  useEffect(() => {
    if (query === null) return;
    const fetchMoviesBySearchValue = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getMoviesBySearchValue(query);
        console.log(data);
        setMoviesBySearchValue(data.results);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesBySearchValue();
  }, [query]);
  return (
    <>
      <div className={css.container}>
        <SearchMoviesForm onSearch={onSearch} />
        <MoviesList movies={moviesBySearchValue} />
        {isLoading && <Loader />}
        {error !== null && <ErrorMessage />}
      </div>
    </>
  );
};

export default MoviesPage;
