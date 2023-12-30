import { useState } from "react";
import "./Register.css";
import FormHeading from "../Form/FormHeading/FormHeading";
import FormInput from "../Form/FormInput/FormInput";
import FormButtons from "../Form/FormButtons/FormButtons";

const Register = () => {
    const [name, setName] = useState("Виталий");
    const [email, setEmail] = useState("pochta@yandex.ru|");
    const [password, setPassword] = useState("••••••••••••••");

    return (
        <div className="register">
            <FormHeading />
            <main className="register__main">
                <form className="register__form">
                    <div className="register__inputs">
                        <FormInput
                            type="text"
                            required
                            minLength={2}
                            maxLength={30}
                            value={name}
                            setValue={setName}
                            span={"Имя"}
                            placeholder={"Введите имя"}
                        />
                        <FormInput
                            type="email"
                            required
                            value={email}
                            setValue={setEmail}
                            span={"E-mail"}
                            placeholder={"Введите e-mail"}
                        />
                        <FormInput
                            type="text"
                            minLength={2}
                            maxLength={30}
                            required
                            value={password}
                            setValue={setPassword}
                            span={"Пароль"}
                            placeholder={"Введите пароль"}
                            classError={"form-input_error"}
                            errorMessage={"Что-то пошло не так..."}
                        />
                    </div>
                    <FormButtons />
                </form>
            </main>
        </div>
    );
};

export default Register;
