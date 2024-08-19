import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";

export const getMovies = async () => {
  const searchParams = new URLSearchParams({
    api_key: "43688c617df5a43779f16acd97cb09c2",
  });
  const { data } = await axios.get(`3/trending/movie/week?${searchParams}`);
  return data;
};

export const getMoviesBySearchValue = async (searchValue) => {
  const searchParams = new URLSearchParams({
    api_key: "43688c617df5a43779f16acd97cb09c2",
    query: searchValue,
  });
  const { data } = await axios.get(`3/search/movie?${searchParams}`);
  return data;
};

export const getMovieById = async (movieId) => {
  const searchParams = new URLSearchParams({
    api_key: "43688c617df5a43779f16acd97cb09c2",
  });
  const { data } = await axios.get(`3/movie/${movieId}?${searchParams}`);
  return data;
};

export const getCastInfo = async (movieId) => {
  const searchParams = new URLSearchParams({
    api_key: "43688c617df5a43779f16acd97cb09c2",
  });
  const { data } = await axios.get(
    `3/movie/${movieId}/credits?${searchParams}`
  );
  return data;
};

export const getMovieReviews = async (movieId) => {
  const searchParams = new URLSearchParams({
    api_key: "43688c617df5a43779f16acd97cb09c2",
  });
  const { data } = await axios.get(
    `3/movie/${movieId}/reviews?${searchParams}`
  );
  return data;
};
