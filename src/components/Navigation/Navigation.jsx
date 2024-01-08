import "./Navigation.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../../images/headerlogo.svg";
import NavigationPromo from "./NavigationPromo/NavigtionPromo";
import NavigationUser from "./NavigationUser/NavigationUser";
import { IsLoggedInContext } from "../../contexts/IsLoggedInContext";

function Navigation() {
    const loggedIn = useContext(IsLoggedInContext);
    return (
        <nav className="navigation">
            <Link to={"/"} tabIndex={1}>
                <img src={logo} alt="Логотип" className="navigation__logo" />
            </Link>
            {loggedIn ? <NavigationUser /> : <NavigationPromo />}
        </nav>
    );
}

export default Navigation;
