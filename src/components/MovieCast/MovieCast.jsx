import { useParams } from "react-router-dom";
import { getCastInfo } from "../../services/api";
import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    async function fetchMovieCast() {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getCastInfo(movieId);
        console.log(data);
        setMovieCast(data.cast);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <ul className={css.castList}>
        {Array.isArray(movieCast) &&
          movieCast.map((item) => {
            return (
              <li key={item.id} className={css.item}>
                <div className={css.imgWrap}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
                    alt={item.name}
                  />
                </div>

                <div className={css.actorInfo}>
                  {" "}
                  <h3>{item.name}</h3>
                  <p>Character: {item.character}</p>
                </div>
              </li>
            );
          })}
      </ul>
      {isLoading && <Loader />}
      {error !== null && <ErrorMessage />}
    </div>
  );
};

export default MovieCast;
