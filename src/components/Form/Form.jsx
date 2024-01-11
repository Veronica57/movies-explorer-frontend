import "./Form.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { REG_EXP_EMAIL, REG_EXP_NAME } from "../../utils/constants";

function Form({
    title,
    pageType,
    button,
    text,
    onSubmitForm,
    isResponseMessage,
}) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmitForm(values);
        setIsValid(false);
    }

    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            <Link to="/" className="form__logo"></Link>
            <h1 className="form__title">{title}</h1>
            <fieldset className="form__fieldset">
                {pageType === "signup" && (
                    <div className="form__field">
                        <label htmlFor="name" className="form__label">
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form__input ${errors.name && "error"}`}
                            placeholder="Введите имя"
                            value={values.name || ""}
                            autoComplete="off"
                            required
                            pattern={REG_EXP_NAME}
                            minLength={2}
                            maxLength={30}
                            onChange={handleChange}
                        />
                        <span className="form__input-error">{errors.name}</span>
                    </div>
                )}
                <div className="form__field">
                    <label htmlFor="email" className="form__label">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form__input ${errors.email && "error"}`}
                        placeholder="Введите E-mail"
                        value={values.email || ""}
                        autoComplete="off"
                        required
                        pattern={REG_EXP_EMAIL}
                        onChange={handleChange}
                    />
                    <span className="form__input-error">{errors.email}</span>
                </div>
                <div className="form__field">
                    <label htmlFor="password" className="form__label">
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`form__input ${errors.password && "error"}`}
                        placeholder="Введите пароль"
                        value={values.password || ""}
                        autoComplete="off"
                        required
                        onChange={handleChange}
                    />
                    <span className="form__input-error">{errors.password}</span>
                </div>
            </fieldset>
            <div className="form__response-error">{isResponseMessage}</div>
            <button
                type="submit"
                className={`form__button ${
                    isValid ? "hover-button" : "form__button_disabled"
                }`}
                disabled={!isValid}>
                {button}
            </button>
            <p className="form__link-wrapper">
                {text}
                {pageType === "signup" ? (
                    <Link className="form__link" to="/signin">
                        Войти
                    </Link>
                ) : (
                    <Link className="form__link" to="/signup">
                        Регистрация
                    </Link>
                )}
            </p>
        </form>
    );
}

export default Form;
