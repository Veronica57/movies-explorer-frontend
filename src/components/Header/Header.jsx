import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    return (
        <header
            className={
                location.pathname === "/"
                    ? "header"
                    : "header header_white-theme"
            }>
            <Navigation className="navigation" />
        </header>
    );
}

export default Header;
