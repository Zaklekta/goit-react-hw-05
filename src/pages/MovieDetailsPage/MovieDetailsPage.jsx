import { useParams, NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { getMovieById } from "../../services/api";
import { useEffect, useState } from "react";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  console.log(movieId);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchSingleMovieById() {
      try {
        const data = await getMovieById(movieId);
        console.log(data);
        setMovie(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchSingleMovieById();
  }, [movieId]);

  return (
    <>
      {movie !== null && (
        <div className={css.wrapper}>
          <div>
            {" "}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className={css.contentWrap}>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.text}>{movie.overview}</p>
            <p
              className={css.score}
            >{`User score: ${movie.vote_average}/10`}</p>
            <p className={css.genresText}>Genres:</p>
            <ul className={css.genresList}>
              {movie.genres.map((item) => (
                <li key={item.id} className={css.genresItem}>
                  {item.name}
                </li>
              ))}
            </ul>
            <ul>
              <li className={css.item}>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li className={css.item}>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
            <div>
              {" "}
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
