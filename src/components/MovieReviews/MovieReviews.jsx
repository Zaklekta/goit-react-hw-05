import { getMovieReviews } from "../../services/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        console.log(data);
        setMovieReviews(data.results);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieReviews();
  }, [movieId]);
  return (
    <div className={css.reviewsContainer}>
      {movieReviews.length > 0 ? (
        <ul>
          {Array.isArray(movieReviews) &&
            movieReviews.map((review) => {
              return (
                <li key={review.id} className={css.reviewItem}>
                  <p className={css.reviewAuthor}>
                    Review author:{" "}
                    <span className={css.reviewAuthorBold}>
                      {review.author}
                    </span>
                  </p>
                  <p className={css.reviewText}>{review.content}</p>
                </li>
              );
            })}
        </ul>
      ) : (
        <p>There is no any reviews for this movie</p>
      )}
      {isLoading && <Loader />}
      {error !== null && <ErrorMessage />}
    </div>
  );
};
export default MovieReviews;
