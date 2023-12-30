import "./FormInput.css";

function FormInput({
    value,
    setValue,
    span,
    placeholder,
    classError,
    errorMessage,
}) {
    return (
        <div className="form__input-container">
            <span className="form__input-name">{span}</span>
            <input
                className={`form__input ${classError}`}
                placeholder={placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <span className="form__input-error">{errorMessage}</span>
        </div>
    );
}

export default FormInput;
