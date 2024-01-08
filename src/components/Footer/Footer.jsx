import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="footer">
            <h3 className="footer__title">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </h3>
            <div className="footer__container">
                <p className="footer__date">&copy; 2023</p>
                <nav>
                    <ul className="footer__links">
                        <li>
                            <Link
                                className="footer__link"
                                to={"https://practicum.yandex.ru/"}
                                target="blank"
                                tabIndex={1}>
                                Яндекс.Практикум
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="footer__link"
                                to={"https://github.com/Veronica57"}
                                target="blank"
                                tabIndex={1}>
                                Github
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
