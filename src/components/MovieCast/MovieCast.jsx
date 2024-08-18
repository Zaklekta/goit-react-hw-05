import { useParams } from "react-router-dom";
import { getCastInfo } from "../../services/api";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  console.log(movieId);
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        const data = await getCastInfo(movieId);
        console.log(data);
        setMovieCast(data.cast);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return <div>Hello</div>;
};

export default MovieCast;
