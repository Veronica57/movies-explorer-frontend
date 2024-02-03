import "./AboutMe.css";
import myPhoto from "../../../images/aboutMe.jpg";

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__content">
                    <h3 className="about-me__name">Вероника</h3>
                    <p className="about-me__description">
                        Фронтенд-разработчик
                    </p>
                    <p className="about-me__history">
                        Я&nbsp;работаю в&nbsp;IT сфере уже несколько лет. Живу
                        в&nbsp;Москве, закончила МГТУ им. Баумана
                        в&nbsp;2011&nbsp;году. Обучение на&nbsp;факультете
                        веб-разработке серьезно помогает в&nbsp;текущей работе.
                        Планирую заниматься дополнительно проектами
                        на&nbsp;фрилансе и&nbsp;частично на&nbsp;своем текущем
                        месте работы.
                    </p>
                    <a
                        href="https://github.com/Veronica57"
                        className="about-me__link"
                        target="_blank"
                        rel="noreferrer">
                        Github
                    </a>
                    <img
                        src={myPhoto}
                        alt="Фотография студента"
                        className="about-me__photo"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
