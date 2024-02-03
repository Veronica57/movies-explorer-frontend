import { MAX_LENGTH_SHORT_FILM } from "./config";

// get formatted time
export const getFormattedTime = (duration) => {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

// search movies
export const searchMovie = () => {
    const movieDataBase = JSON.parse(localStorage.getItem("movieDataBase"));
    const shortMovieCheckbox = localStorage.getItem("shortMovieCheckbox");
    let searchText = localStorage.getItem("searchText");
    let foundMovies;
  
    if (!searchText) {
      foundMovies = movieDataBase;
    } else {
      searchText = searchText.toLowerCase();
      foundMovies = movieDataBase.filter(
        (movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0
      );
    }
  
    if (shortMovieCheckbox === "true")
      return foundMovies.filter(
        (movie) => movie.duration < MAX_LENGTH_SHORT_FILM
      );
    else return foundMovies;
};

// search saved movies
export const searchSavedMovie = (movie) => {
    const shortMovieCheckbox = localStorage.getItem("shortSavedMovieCheckbox");
    const savedMovieSearchText = localStorage
        .getItem("savedMovieSearchText")
        .toLowerCase();

    const foundMovies = movie.filter(
        (movie) => movie.nameRU.toLowerCase().indexOf(savedMovieSearchText) >= 0
    );
    if (shortMovieCheckbox === true || shortMovieCheckbox === "true") {
        return foundMovies.filter(
            (movie) => movie.duration < MAX_LENGTH_SHORT_FILM
        );
    } else return foundMovies;
};
