import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import userData from "../../utils/userData";

function Profile() {
    const [isDisabled, setIsDisabled] = useState(true);
    const isError = false;
    const { name, email } = userData;

    return (
        <>
            <Header />
            <main className="profile">
                <h1 className="profile__title">Привет, Виталий!</h1>
                <form className="profile__form">
                    <div className="profile__inputs">
                        <label className="profile__label">
                            <span className="profile__input-name">Имя</span>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Введите имя"
                                className="profile__input"
                                minLength={2}
                                maxLength={30}
                                defaultValue={name}
                                disabled={isDisabled}
                                required
                                autoComplete="off"
                            />
                        </label>
                        <label className="profile__label">
                            <span className="profile__input-name">E-mail</span>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Введите e-mail"
                                className="profile__input"
                                defaultValue={email}
                                disabled={isDisabled}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>
                    {isError && (
                        <span className="profile__error">
                            При обновлении профиля произошла ошибка.
                        </span>
                    )}
                    {isDisabled ? (
                        <div className="profile__buttons">
                            <p
                                className="profile__edit"
                                onClick={() => setIsDisabled(!isDisabled)}>
                                Редактировать
                            </p>
                            <Link to={"/"} className="profile__logout">
                                Выйти из аккаунта
                            </Link>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className={`profile__button-save ${
                                isError
                                    ? "profile__button-save_disabled"
                                    : "profile__button-save"
                            }`}
                            disabled={isError}>
                            Сохранить
                        </button>
                    )}
                </form>
            </main>
        </>
    );
}
export default Profile;
