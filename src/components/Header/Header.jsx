import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ isLogged }) {
    return (
        <header className="header">
            <Link to="/" className="header__logo" />
            <Navigation isLogged={isLogged} />
        </header>
        // <header
        //     className={
        //         location.pathname === "/"
        //             ? "header"
        //             : "header header_white-theme"
        //     }>
        //     <Navigation className="navigation" />
        // </header>
    );
}

export default Header;
