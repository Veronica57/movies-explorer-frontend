import { useState, useCallback } from "react";

export function useValidation() {
    const [values, setValues] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputsValid, setInputsValid] = useState({});
    const [errors, setErrors] = useState({});

    function onChange(event) {
        setIsFormValid(event.target.form.checkValidity());
        setErrors({
            ...errors,
            [event.target.name]: event.target.validationMessage,
        });
        setInputsValid({
            ...inputsValid,
            [event.target.name]: event.target.checkValidity(),
        });
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    function handleInput(event, regExp, message) {
        regExp.test(event.target.value)
            ? event.target.setCustomValidity("")
            : event.target.setCustomValidity(
                  event.target.validationMessage || message
              );
        onChange(event);
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsFormValid(newIsValid);
        },
        [setValues, setErrors, setIsFormValid]
    );

    return {
        isFormValid,
        setIsFormValid,
        errors,
        setErrors,
        onChange,
        inputsValid,
        setInputsValid,
        resetForm,
        values,
        setValues,
        handleInput,
    };
}
