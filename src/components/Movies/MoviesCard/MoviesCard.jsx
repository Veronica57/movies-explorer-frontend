import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {
    const location = useLocation();
    return (
        <li className="card">
            <img src={card.image} alt={card.nameRU} className="card__image" />
            <div className="card__description">
                <div className="card__line">
                    <h3 className="card__name">{card.nameRU}</h3>
                    {location.pathname === "/movies" ||
                    location.pathname === "/movies/" ? (
                        <button type="button" className="card__checkbox" />
                    ) : (
                        <button
                            className="card__delete-button"
                            type="button"></button>
                    )}
                </div>
                <p className="card__duration">{card.duration}</p>
            </div>
        </li>
    );
}

export default MoviesCard;
