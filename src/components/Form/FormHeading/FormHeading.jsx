import "./FormHeading.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../images/headerlogo.svg";

function FormHeading() {
    const location = useLocation();
    return (
        <header className="heading">
            <Link to={"/"} className="heading__container">
                <img src={logo} alt="Логотип" className="heading__logo" />
            </Link>
            <h2 className="heading__title">
                {location.pathname === "/signup"
                    ? "Добро пожаловать!"
                    : "Рады видеть!"}
            </h2>
        </header>
    );
}

export default FormHeading;
