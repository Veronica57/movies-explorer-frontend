import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, type }) {
    const { nameRU, duration, image, saved } = movie;

    function getFormattedTime(duration) {
        const hours = Math.trunc(duration / 3600);
        const minutes = (duration / 60) % 60;
        return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
    }

    const formattedTime = getFormattedTime(duration);

    const location = useLocation();
    return (
        <li className="movies-card">
            <img className="movies-card__image" src={image} alt={nameRU} />
            <div className="movies-card__info">
                <div className="movies-card__wrapper">
                    <h2 className="movies-card__title">{nameRU}</h2>
                    {(type === "all" && location.pathname === "/movies") ||
                    location.pathname === "/movies/" ? (
                        saved ? (
                            <button
                                type="button"
                                className="movies-card__button movies-card__button_liked"></button>
                        ) : (
                            <button
                                type="button"
                                className="movies-card__button movies-card__button_unliked"></button>
                        )
                    ) : (
                        <button
                            type="button"
                            className="movies-card__button movies-card__button_delete"></button>
                    )}
                </div>
                <p className="movies-card__duration">{formattedTime}</p>
            </div>
        </li>
    );
}

export default MoviesCard;
