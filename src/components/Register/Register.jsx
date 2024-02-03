import "./Register.css";
import Form from "../Form/Form";

function Register({ onRegister, responseMessage }) {
    return (
        <Form
            title={"Добро пожаловать!"}
            pageType={"signup"}
            button={"Зарегистрироваться"}
            text={`Уже зарегистрированы? `}
            onSubmitForm={onRegister}
            responseMessage={responseMessage}
        />
    );
}

export default Register;
