import "./Promo.css";
import NavTab from "../NavTab/NavTab";

function Promo() {
    return (
        <section className="promo">
            <div>
                <div className="promo__container">
                    <h2 className="promo__title">
                        Учебный проект студента факультета
                        <br />
                        Веб-разработки.
                    </h2>
                    <p className="promo__description">
                        Листайте ниже, чтобы узнать больше про этот проект
                        и&nbsp;его создателя.
                    </p>
                    <NavTab />
                </div>
            </div>
            <div className="promo__image-container">
                <div className="promo__image"></div>
            </div>
        </section>
    );
}

export default Promo;
