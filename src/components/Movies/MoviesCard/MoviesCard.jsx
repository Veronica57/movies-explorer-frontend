import "./MoviesCard.css";
import { useContext } from "react";
import { CurrentSavedMoviesContext } from "../../../context/CurrentSavedMoviesContext";
import { getFormattedTime } from "../../../utils/utils";

function MoviesCard({
    movie, displayOption, onClickMovieButton
}) {
    const CurrentSavedMovies = useContext(CurrentSavedMoviesContext);

    const { nameRU, duration, image } = movie;

    const moviesData = CurrentSavedMovies.filter(
        (item) => item.movieId === movie.id
    );

    const isSaved = moviesData.length > 0;

    return (
        <li className="movies-card">
            <a
                className="movies-card__trailer"
                href={movie.trailerLink}
                target={"_blank"}
                rel="noreferrer">
                <img
                    className="movies-card__image"
                    src={
                        displayOption === "all"
                            ? `https://api.nomoreparties.co${image.url}`
                            : movie.image
                    }
                    alt={nameRU}
                />
            </a>
            <div className="movies-card__info">
                <div className="movies-card__wrapper">
                    <h2 className="movies-card__title">{nameRU}</h2>
                    {displayOption === "all" ? (
                        isSaved ? (
                            <button
                                type="button"
                                className="movies-card__button movies-card__button_liked"
                                onClick={() =>
                                    onClickMovieButton(
                                        movie,
                                        "delete",
                                        moviesData[0]._id
                                    )
                                }></button>
                        ) : (
                            <button
                                type="button"
                                className="movies-card__button movies-card__button_unliked"
                                onClick={() =>
                                    onClickMovieButton(movie, "save", null)
                                }></button>
                        )
                    ) 
                    : (
                        <button
                            type="button"
                            className="movies-card__button movies-card__button_delete"
                            onClick={() =>
                                onClickMovieButton(movie._id)
                            }
                            ></button>
                        )
                    }
                </div>
                <p className="movies-card__duration">
                    {getFormattedTime(duration)}
                </p>
            </div>
        </li>
    );
}

export default MoviesCard;
