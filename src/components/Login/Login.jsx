import "./Login.css";
import FormHeading from "../Form/FormHeading/FormHeading";
import FormInput from "../Form/FormInput/FormInput";
import FormButtons from "../Form/FormButtons/FormButtons";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("pochta@yandex.ru|");
    const [password, setPassword] = useState("");
    return (
        <div className="login">
            <FormHeading />
            <main className="login__main">
                <form className="login__form">
                    <div className="login__inputs">
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
                            placeholder={""}
                        />
                    </div>
                    <FormButtons />
                </form>
            </main>
        </div>
    );
}
export default Login;
