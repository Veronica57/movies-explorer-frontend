import "./NavigationMovies.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MenuCover from "../MenuCover/MenuCover";

function NavigationMovies() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenuCover = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const location = useLocation();

    return (
        <>
          
            {!isMenuOpen ? (
                <button
                    className={location.pathname === '/' ? "menu-hamburger_main" : "menu-hamburger"}
                    onClick={toggleMenuCover}
                    tabIndex={1}
                />
            ) : (
                <button
                        className= "menu-hamburger_close"
                    onClick={toggleMenuCover}
                    tabIndex={1}
                />
            )}
            <MenuCover isMenuOpen={isMenuOpen} />
                <div className="navigation-movies">
                <ul className="navigation-movies__links">
                    <li>
                        <NavLink
                            to={"/movies"}
                            className={({ isActive }) => location.pathname === '/' ?
                                `navigation-movies__link_login ${
                                    isActive ? "active" : ""
                                }` : `navigation-movies__link ${
                                    isActive ? "active" : ""
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
                            location.pathname === '/' ?
                            `navigation-movies__link_login ${
                                isActive ? "active" : ""
                            }` : `navigation-movies__link ${
                                isActive ? "active" : ""
                            }` 
                            }
                            tabIndex={1}>
                            Сохранённые фильмы
                        </NavLink>
                    </li>
                </ul>
                <Link
                    to={"/profile"}
                    className={ location.pathname === '/' ?
                    "navigation-movies__profile-link_login" :"navigation-movies__profile-link"
                     }
                    tabIndex={1}>
                    <div className="navigation-movies__profile-picture"></div>
                    Аккаунт
                </Link>
                </div>
        </>
    );
}

export default NavigationMovies;