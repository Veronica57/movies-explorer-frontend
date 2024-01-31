import "./Profile.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { REG_EXP_EMAIL, REG_EXP_NAME } from "../../utils/constants";
import Header from "../Header/Header";

function Profile({ onLogout, loggedIn, onSubmitForm, isResponseMessage }) {
    const currentUser = useContext(CurrentUserContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isUserData, setIsUserData] = useState({});
    const [isErorrMessage, setIsErorrMessage] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIsUserData((previos) => ({ ...previos, [name]: value }));
        setIsErorrMessage((previos) => ({
            ...previos,
            [name]: event.target.validationMessage,
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        onSubmitForm(isUserData);
        currentUser.name = isUserData.name;
        currentUser.email = isUserData.email;
        setIsDisabled(!isDisabled);
        setIsValid(false);
    }

    useEffect(() => {
        if (isErorrMessage.name || isErorrMessage.email) {
            setIsValid(false);
        } else if (
            currentUser.name === isUserData.name &&
            currentUser.email === isUserData.email
        ) {
            setIsValid(false);
        } else setIsValid(true);
    }, [isErorrMessage, isUserData]);

    useEffect(() => {
        setIsUserData({ name: currentUser.name, email: currentUser.email });
    }, [currentUser]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="profile">
                <h1 className="profile__title">{`Привет, ${isUserData.name}!`}</h1>
                <form
                    className="profile__form"
                    onSubmit={handleSubmit}
                    noValidate>
                    <div className="profile__inputs">
                        <label className="profile__label">
                            <span className="profile__input-name">Имя</span>
                            <input
                                className="profile__input"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Введите имя"
                                defaultValue={isUserData.name}
                                values={isUserData.name}
                                required
                                pattern={REG_EXP_NAME}
                                minLength={2}
                                maxLength={30}
                                disabled={isDisabled}
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </label>
                        <div className="profile__input-error">
                            {isErorrMessage.name}
                        </div>
                        <label htmlFor="email" className="profile__label">
                            <span className="profile__input-name">E-mail</span>
                            <input
                                className="profile__input"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Введите E-mail"
                                defaultValue={isUserData.email}
                                values={isUserData.email}
                                required
                                pattern={REG_EXP_EMAIL}
                                disabled={isDisabled}
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </label>
                        <div className="profile__input-error profile__input-error_email">
                            {isErorrMessage.email}
                        </div>
                    </div>
                    <span className="profile__error">{isResponseMessage}</span>
                    {isDisabled ? (
                        <div className="profile__buttons">
                            <p
                                className="profile__edit"
                                onClick={() => setIsDisabled(!isDisabled)}>
                                Редактировать
                            </p>
                            <Link
                                to={"/"}
                                className="profile__logout"
                                onClick={onLogout}>
                                Выйти из аккаунта
                            </Link>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className={`profile__button-save ${
                                !isValid
                                    ? "profile__button-save_disabled"
                                    : "profile__button-save hover-button"
                            }`}
                            disabled={!isValid}>
                            Сохранить
                        </button>
                    )}
                </form>
            </main>
        </>
    );
}
export default Profile;
