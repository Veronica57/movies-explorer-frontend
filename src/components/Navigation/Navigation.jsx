import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/headerlogo.svg";
import NavigationPromo from "../Navigation/NavigationPromo/NavigtionPromo";
import NavigationMovies from "../Navigation/NavigationMovies/NavigationMovies";

function Navigation() {
    const location = useLocation();

    return (
        <nav className="navigation">
            <Link to={"/"} tabIndex={1}>
                <img src={logo} alt="Логотип" className="navigation__logo" />
            </Link>
            {location.pathname === "/" ? (
                <NavigationPromo />
            ) : (
                <NavigationMovies />
            )}
        </nav>
    );
}

export default Navigation;
