import "./Login.css";
import { useEffect } from "react";
import FormHeading from "../Form/FormHeading/FormHeading";
import FormInput from "../Form/FormInput/FormInput";
import FormButtons from "../Form/FormButtons/FormButtons";
import { useValidation } from "../../hooks/useValidation";
import { REG_EXP_EMAIL, messages } from "../../utils/constants";

function Login({ handleSubmitLogin, isLoading }) {
    const {
        isFormValid,
        errors,
        onChange,
        inputsValid,
        setInputsValid,
        values,
        handleInput,
    } = useValidation();
    const { email, password } = values;

    useEffect(() => {
        setInputsValid({ name: true, email: true, password: true });
    }, []);

    return (
        <div className="login">
            <FormHeading />
            <main className="login__main">
                <form
                    className="form"
                    noValidate
                    onSubmit={(event) =>
                        handleSubmitLogin(event, email, password)
                    }>
                    <div className="form__inputs">
                        <FormInput
                            value={email || ""}
                            type="email"
                            name="email"
                            span="E-mail"
                            placeholder="Введите e-mail"
                            inputsValid={inputsValid.email}
                            message={errors.email || ""}
                            onChange={(event) =>
                                handleInput(
                                    event,
                                    REG_EXP_EMAIL,
                                    messages.INPUT_EMAIL
                                )
                            }
                        />
                        <FormInput
                            type="password"
                            value={password || ""}
                            name="password"
                            span="Пароль"
                            minLength="6"
                            placeholder="Введите пароль"
                            inputsValid={inputsValid.password}
                            message={errors.password || ""}
                            onChange={onChange}
                        />
                    </div>
                    <FormButtons
                        isFormValid={isFormValid}
                        isLoading={isLoading}
                    />
                </form>
            </main>
        </div>
    );
}
export default Login;
