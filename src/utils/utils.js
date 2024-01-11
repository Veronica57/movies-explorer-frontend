import { MAX_LENGTH_SHORT_FILM } from "./config";

// get formatted time
export const getFormattedTime = (duration) => {
    const hours = Math.trunc(duration / 3600);
    const minutes = (duration / 60) % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

// search movies
export const searchMovie = () => {
    const movieDataBase = JSON.parse(localStorage.getItem("movieDataBase"));
    const searchText = localStorage.getItem("searchText").toLowerCase();
    const shortMovieSwitch = localStorage.getItem("shortMovieSwitch");

    const foundMovies = movieDataBase.filter(
        (movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0
    );
    if (shortMovieSwitch === "true")
        return foundMovies.filter(
            (movie) => movie.duration < MAX_LENGTH_SHORT_FILM
        );
    else return foundMovies;
};

// search saved movies
export const searchSavedMovie = (movie) => {
    const shortMovieSwitch = localStorage.getItem("shortSavedMovieSwitch");
    const savedMovieSearchText = localStorage
        .getItem("savedMovieSearchText")
        .toLowerCase();

    const foundMovies = movie.filter(
        (movie) => movie.nameRU.toLowerCase().indexOf(savedMovieSearchText) >= 0
    );
    if (shortMovieSwitch === true || shortMovieSwitch === "true") {
        return foundMovies.filter(
            (movie) => movie.duration < MAX_LENGTH_SHORT_FILM
        );
    } else return foundMovies;
};
