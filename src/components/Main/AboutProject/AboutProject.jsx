import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <ul className="about-project__list">
                <li>
                    <h3 className="about-project__subtitle">
                        Дипломный проект включал 5&nbsp;этапов
                    </h3>
                    <p className="about-project__description">
                        Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и&nbsp;финальные доработки.
                    </p>
                </li>
                <li>
                    <h3 className="about-project__subtitle">
                        На&nbsp;выполнение диплома ушло 5&nbsp;недель
                    </h3>
                    <p className="about-project__description">
                        У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>
            <ul className="about-project__deadline">
                <li>
                    <h4 className="about-project__deadline-name about-project__deadline-name_back">
                        1&nbsp;неделя
                    </h4>
                    <p className="about-project__deadline-description">
                        Back-end
                    </p>
                </li>
                <li>
                    <h4 className="about-project__deadline-name about-project__deadline-name_front">
                        4&nbsp;недели
                    </h4>
                    <p className="about-project__deadline-description">
                        Front-end
                    </p>
                </li>
            </ul>
        </section>
    );
}

export default AboutProject;
