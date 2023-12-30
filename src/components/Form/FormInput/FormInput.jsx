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
        <div className="form-input__container">
            <span className="form-input__name">{span}</span>
            <input
                className={`form-input ${classError}`}
                placeholder={placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <span className="form-input__error-message">{errorMessage}</span>
        </div>
    );
}

export default FormInput;
