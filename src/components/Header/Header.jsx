import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
    const location = useLocation();
    return (
        <header className={location.pathname === '/' ? "header" : "header header_white-theme"}>
            <Link to="/" className="header__logo" />
            <Navigation loggedIn={loggedIn} />
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
