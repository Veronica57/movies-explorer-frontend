import { Link, NavLink } from "react-router-dom";
import "./MenuCover.css";

function MenuCover({ isMenuOpen }) {
    return (
        <div
            className={`cover-container ${
                isMenuOpen ? "cover-container_active" : ""
            }`}>
            <div
                className={`navigation-cover ${
                    isMenuOpen ? "navigation-cover_active" : ""
                }`}>
                <ul className="navigation-cover__links">
                    <li>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                `navigation-cover__link ${
                                    isActive ? "cover-active" : ""
                                }`
                            }
                            tabIndex={1}>
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/movies"}
                            className={({ isActive }) =>
                                `navigation-cover__link ${
                                    isActive ? "cover-active" : ""
                                }`
                            }
                            tabIndex={1}>
                            Фильмы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/saved-movies"}
                            className={({ isActive }) =>
                                `navigation-cover__link ${
                                    isActive ? "cover-active" : ""
                                }`
                            }
                            tabIndex={1}>
                            Сохраненные фильмы
                        </NavLink>
                    </li>
                </ul>
                <Link
                    to={"/profile"}
                    className="navigation-cover__profile-link"
                    tabIndex={1}>
                    <div className="navigation-cover__profile-picture"></div>
                    Аккаунт
                </Link>
            </div>
        </div>
    );
}
export default MenuCover;
