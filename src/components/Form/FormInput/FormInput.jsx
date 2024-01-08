import "./FormInput.css";

function FormInput({
    value,
    name,
    span,
    placeholder,
    inputsValid,
    message,
    onChange,
    minLength,
    maxLength,
    type,
}) {
    return (
        <div className="form__input-container">
            <span className="form__input-name">{span}</span>
            <input
                type={type}
                className={`form__input ${
                    !inputsValid ? "form__input_error" : ""
                }`}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                name={name}
                required
            />
            <span className="form__input-message">{message}</span>
        </div>
    );
}

export default FormInput;
