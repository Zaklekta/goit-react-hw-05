import { useEffect, useState } from "react";
import SearchMoviesForm from "../../components/SearchMoviesForm/SearchMoviesForm";
import { getMoviesBySearchValue } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [moviesBySearchValue, setMoviesBySearchValue] = useState(null);
  const onSearch = (searchQuery) => {
    setSearchValue(searchQuery);
  };
  useEffect(() => {
    if (searchValue === null) return;
    const fetchMoviesBySearchValue = async () => {
      try {
        const data = await getMoviesBySearchValue(searchValue);
        console.log(data);
        setMoviesBySearchValue(data.results);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMoviesBySearchValue();
  }, [searchValue]);
  return (
    <>
      <div className={css.container}>
        <SearchMoviesForm onSearch={onSearch} />
        <MoviesList movies={moviesBySearchValue} />
      </div>
    </>
  );
};

export default MoviesPage;
