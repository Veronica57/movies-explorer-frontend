import "./Login.css";
import Form from "../Form/Form";

function Login({ onLogin, responseMessage }) {
    return (
        <Form
            title={"Рады видеть!"}
            type={"signin"}
            button={"Войти"}
            text={`Еще не зарегистрированы? `}
            onSubmitForm={onLogin}
            responseMessage={responseMessage}
        />
    );
}

export default Login;
