// import "./NavigationMovies.css";
// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// function NavigationMovies() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const toggleMenuCover = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     return (
//         <>
//             <nav
//                 className={`navigation-movies ${
//                     isMenuOpen ? "movie-menu_show" : ""
//                 }`}>
//                 {/* <div className="navigation-movies__model"></div> */}
//                 <div className="navigation-movies_links">
//                     <NavLink to="/" className="navigation-movies__link show">
//                         Главная
//                     </NavLink>
//                     <NavLink to="/movies" className="navigation-movies__link">
//                         Фильмы
//                     </NavLink>
//                     <NavLink
//                         to="/saved-movies"
//                         className="navigation-movies__link">
//                         Сохранённые фильмы
//                     </NavLink>
//                 </div>
//                 <Link
//                     to="/profile"
//                     className="navigation-movies__account-button">
//                     <div className="navigation-movies__account-picture">Аккаунт</div>
//                 </Link>
//             </nav>
//             <div
//                 className={`navigation-movies__cover ${
//                     isMenuOpen ? "show" : "hide"
//                 }`}></div>
//             <div
//                 className={`navigation-movies__mobile
//         ${
//             isMenuOpen
//                 ? "navigation-movies__mobile_type_cross"
//                 : "navigation-movies__mobile_type_hamburger"
//         }`}
//                 onClick={toggleMenuCover}></div>
//         </>
//     );
// }

// export default NavigationMovies;
import "./NavigationMovies.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuCover from "../MenuCover/MenuCover";

function NavigationMovies() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenuCover = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {!isMenuOpen ? (
                <button
                    className="menu-hamburger"
                    onClick={toggleMenuCover}
                    tabIndex={1}
                />
            ) : (
                <button
                    className="menu-hamburger_close"
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
                            className={({ isActive }) =>
                                `navigation-movies__link ${
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
                                `navigation-movies__link ${
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
                    className="navigation-movies__profile-link"
                    tabIndex={1}>
                    <div className="navigation-movies__profile-picture"></div>
                    Аккаунт
                </Link>
            </div>
        </>
    );
}

export default NavigationMovies;