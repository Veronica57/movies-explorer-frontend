import "./MoviesCard.css";
import { Link, useLocation } from "react-router-dom";
import { BASE_MOVIES_URL } from "../../../utils/constants";
import { getFormattedTime } from "../../../utils/utils";

function MoviesCard({
    card,
    handleLikeMovie,
    handleRemoveButton,
    savedMovies,
}) {
    const location = useLocation();
    function checkLike(card) {
        return savedMovies.some((item) => item.movieId === card.id);
    }

    return (
        <li className="movies-card">
            <Link to={card.trailerLink} target="_blank">
                <img
                    className="movies-card__image"
                    src={
                        location.pathname === "/movies"
                            ? `${BASE_MOVIES_URL}${card.image.url}`
                            : `${card.image}`
                    }
                    alt={card.nameRU}
                />
            </Link>
            <div className="movies-card__info">
                <div className="movies-card__wrapper">
                    <h2 className="movies-card__title">{card.nameRU}</h2>
                    {location.pathname === "/movies" ? (
                        <>
                            <input
                                className="movies-card__button-default"
                                type="checkbox"
                                checked={checkLike(card)}
                                onChange={(e) =>
                                    handleLikeMovie(e, {
                                        country: card.country,
                                        director: card.director,
                                        duration: card.duration,
                                        year: card.year,
                                        description: card.description,
                                        image: `${BASE_MOVIES_URL}${card.image.url}`,
                                        trailerLink: card.trailerLink,
                                        thumbnail: `${BASE_MOVIES_URL}${card.image.formats.thumbnail.url}`,
                                        movieId: card.id,
                                        nameRU: card.nameRU,
                                        nameEN: card.nameEN,
                                    })
                                }
                            />
                            <span className="movies-card__button-custom"></span>
                        </>
                    ) : (
                        // <button
                        //     type="button"
                        //     className="movies-card__button movies-card__button_liked"></button>

                        // <button
                        //     type="button"
                        //     className="movies-card__button movies-card__button_unliked"></button>

                        <button
                            type="button"
                            className="movies-card__button movies-card__button_delete"
                            onClick={() =>
                                handleRemoveButton(card._id)
                            }></button>
                    )}
                </div>
                <p className="movies-card__duration">
                    {getFormattedTime(card.duration)}
                </p>
            </div>
        </li>
    );
}

export default MoviesCard;
