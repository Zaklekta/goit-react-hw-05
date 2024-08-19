import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { getMovieById } from "../../services/api";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "./movies");

  useEffect(() => {
    async function fetchSingleMovieById() {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSingleMovieById();
  }, [movieId]);

  return (
    <>
      {movie !== null && (
        <div className={css.pageWrap}>
          <Link className={css.goBackBtn} to={backLinkRef.current}>
            {" "}
            <IoMdArrowRoundBack />
            Go Back
          </Link>
          <div className={css.wrapper}>
            <div>
              {" "}
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
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
            </div>
          </div>
          {isLoading && <Loader />}
          {error !== null && <ErrorMessage />}
          <div className={css.castWrap}>
            <ul className={css.linkWrap}>
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
