import "./NavigationPromo.css";
import { Link } from "react-router-dom";

function NavigationPromo() {
    return (
        <ul className="navigation-promo">
            <li>
                <Link
                    to={"/signup"}
                    className="navigation-promo__link"
                    tabIndex={1}>
                    Регистрация
                </Link>
            </li>
            <li>
                <Link
                    to={"/signin"}
                    className="navigation-promo__button"
                    tabIndex={1}>
                    Войти
                </Link>
            </li>
        </ul>
    );
}

export default NavigationPromo;
