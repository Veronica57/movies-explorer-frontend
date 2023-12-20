import "./MovieCard.css";
import { useLocation } from "react-router-dom";

function MovieCard({ card }) {
    const location = useLocation();
    return (
        <li className="card">
            <img src={card.image} alt={card.nameRU} className="card__image" />
            <div className="card__description">
                <div>
                    <h3 className="card__name">{card.nameRU}</h3>
                    <p className="card__duration">{card.duration}</p>
                </div>
                {location.pathname === "/movies" ||
                location.pathname === "/movies/" ? (
                    <input type="text" className="card__checkbox" />
                ) : (
                    <button
                        className="card__delete - button"
                        type="button"></button>
                )}
            </div>
        </li>
    );
}

export default MovieCard;
