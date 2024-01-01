import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
    const [name, setName] = useState("Виталий");
    const [email, setEmail] = useState("pochta@yandex.ru");

    return (
        <div className="profile">
            <Header />
            <main className="profile__main">
                <h1 className="profile__title">Привет, Виталий!</h1>
                <form className="profile__form">
                    <div className="profile__inputs">
                        <label className="profile__label">
                            <span className="profile__input-name">Имя</span>
                            <input
                                type="text"
                                placeholder="Введите имя"
                                className="profile__input"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </label>
                        <label className="profile__label">
                            <span className="profile__input-name">E-mail</span>
                            <input
                                type="text"
                                placeholder="Введите e-mail"
                                className="profile__input"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className="profile__buttons">
                        <button
                            type="submit"
                            className="profile__submit-button">
                            Редактировать
                        </button>
                        <Link to={"/signin"} className="profile__logout-button">
                            Выйти из аккаунта
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}
export default Profile;