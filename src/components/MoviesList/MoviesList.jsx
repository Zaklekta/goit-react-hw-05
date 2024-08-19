import css from "./MoviesList.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {Array.isArray(movies) &&
        movies.map((movie) => {
          return (
            <li key={movie.id} className={css.item}>
              <Link
                state={{ from: location }}
                className={css.link}
                to={`/movies/${movie.id}`}
              >
                {" "}
                {movie.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MoviesList;
