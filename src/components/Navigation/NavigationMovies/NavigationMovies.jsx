import "./NavigationMovies.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavigationMovies() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenuCover = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav
                className={`navigation-movies ${
                    isMenuOpen ? "movie-menu_show" : ""
                }`}>
                <div className="navigation-movies__model"></div>
                <div className="navigation-movies_links">
                    <NavLink to="/" className="navigation-movies__link show">
                        Главная
                    </NavLink>
                    <NavLink to="/movies" className="navigation-movies__link">
                        Фильмы
                    </NavLink>
                    <NavLink
                        to="/saved-movies"
                        className="navigation-movies__link">
                        Сохранённые фильмы
                    </NavLink>
                </div>
                <NavLink
                    to="/profile"
                    className="navigation-movies__account-button">
                    Аккаунт
                </NavLink>
            </nav>
            <div
                className={`navigation-movies__cover ${
                    isMenuOpen ? "show" : "hide"
                }`}></div>
            <div
                className={`navigation-movies__mobile
        ${
            isMenuOpen
                ? "navigation-movies__mobile_type_cross"
                : "navigation-movies__mobile_type_hamburger"
        }`}
                onClick={toggleMenuCover}></div>
        </>
    );
}

export default NavigationMovies;
