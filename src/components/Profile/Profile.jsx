import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useValidation } from "../../hooks/useValidation";
import { REG_EXP_EMAIL, REG_EXP_NAME, messages } from "../../utils/constants";

function Profile({ handleUpdateUser, handleLogout, isLoading }) {
    const {
        isFormValid,
        errors,
        inputsValid,
        setInputsValid,
        values,
        resetForm,
        setValues,
        handleInput,
    } = useValidation();
    const { email, name } = values;

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        resetForm();
        setInputsValid({ name: true, email: true });
        setValues({
            name: currentUser.name || "",
            email: currentUser.email || "",
        });
    }, [currentUser]);

    function handleSubmit(event) {
        event.preventDefault();
        handleUpdateUser(values);
    }

    function checkDuplicate() {
        return (
            (currentUser.name === name ? true : false) &&
            (currentUser.email === email ? true : false)
        );
    }

    return (
        <>
            <Header />
            <main className="profile">
                <h1 className="profile__title">{`Привет, ${name}!`}</h1>
                <form
                    className="profile__form"
                    noValidate
                    onSubmit={handleSubmit}>
                    <div className="profile__inputs">
                        <label className="profile__label">
                            <span className="profile__input-name">Имя</span>
                            <input
                                placeholder="Введите имя"
                                className={`profile__input ${
                                    !inputsValid.name
                                        ? "profile__input_error"
                                        : ""
                                }`}
                                type="text"
                                value={name || ""}
                                name="name"
                                minLength={2}
                                maxLength={30}
                                required
                                onChange={(event) =>
                                    handleInput(
                                        event,
                                        REG_EXP_NAME,
                                        messages.INPUT_NAME
                                    )
                                }
                            />
                        </label>
                        <span className="profile__error">{errors.name}</span>
                        <label className="profile__label">
                            <span className="profile__input-name">E-mail</span>
                            <input
                                value={email || ""}
                                type="email"
                                name="email"
                                required
                                placeholder="Введите e-mail"
                                className={`profile__input ${
                                    !inputsValid.email
                                        ? "profile__input_error"
                                        : ""
                                }`}
                                onChange={(event) =>
                                    handleInput(
                                        event,
                                        REG_EXP_EMAIL,
                                        messages.INPUT_EMAIL
                                    )
                                }
                            />
                        </label>
                    </div>
                    <span className="profile__error">{errors.email}</span>
                    <div className="profile__buttons">
                        <button
                            type="submit"
                            className={`profile__edit ${
                                !isFormValid || isLoading
                                    ? "profile__edit_disabled"
                                    : ""
                            }`}
                            disabled={
                                !isFormValid || checkDuplicate() || isLoading
                            }>
                            Редактировать
                        </button>
                        <Link
                            to={"/"}
                            className="profile__logout"
                            onClick={handleLogout}>
                            Выйти из аккаунта
                        </Link>
                    </div>
                    {/* <button
                        type="submit"
                        className={`profile__button-save ${
                            !isFormValid || isLoading
                                ? "profile__button-save_disabled"
                                : ""
                        }`}
                        disabled={
                            !isFormValid || checkDuplicate() || isLoading
                        }>
                        Сохранить
                    </button> */}
                </form>
            </main>
        </>
    );
}
export default Profile;
