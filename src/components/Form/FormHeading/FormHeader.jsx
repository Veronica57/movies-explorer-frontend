import "./FormHeading.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../images/headerlogo.svg";

function FormHeading() {
    const location = useLocation();
    return (
        <section className="form-header">
            <Link to={"/"}>
                <img src={logo} alt="Логотип" className="form-header__logo" />
            </Link>
            <h2 className="form-header__title">
                {location.pathname === "/signup"
                    ? "Добро пожаловать!"
                    : "Рады видеть!"}
            </h2>
        </section>
    );
}

export default FormHeading;
