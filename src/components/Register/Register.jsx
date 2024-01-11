import "./Register.css";
import Form from "../Form/Form";

function Register({ onRegister, isResponseMessage }) {
    return (
        <Form
            title={"Добро пожаловать!"}
            pageType={"signup"}
            button={"Зарегистрироваться"}
            text={`Уже зарегистрированы? `}
            onSubmitForm={onRegister}
            isResponseMessage={isResponseMessage}
        />
    );
}

export default Register;

// import { useEffect } from "react";
// import "./Register.css";
// import FormHeading from "../Form/FormHeading/FormHeading";
// import FormInput from "../Form/FormInput/FormInput";
// import FormButtons from "../Form/FormButtons/FormButtons";
// import { useValidation } from "../../hooks/useValidation";
// import { REG_EXP_EMAIL, REG_EXP_NAME, messages } from "../../utils/constants";

// const Register = ({ handleSubmitRegistration, isLoading }) => {
//     const {
//         isFormValid,
//         errors,
//         onChange,
//         inputsValid,
//         setInputsValid,
//         values,
//         handleInput,
//     } = useValidation();
//     const { name, email, password } = values;

//     useEffect(() => {
//         setInputsValid({ name: true, email: true, password: true });
//     }, []);

//     return (
//         <div className="register">
//             <FormHeading />
//             <main className="register__main">
//                 <form
//                     className="form"
//                     noValidate
//                     onSubmit={(e) =>
//                         handleSubmitRegistration(e, name, email, password)
//                     }>
//                     <div className="form__inputs">
//                         <FormInput
//                             type="text"
//                             value={name || ""}
//                             name="name"
//                             span="Имя"
//                             minLength={2}
//                             maxLength={30}
//                             placeholder="Введите имя"
//                             message={errors.name || ""}
//                             inputsValid={inputsValid.name}
//                             onChange={(event) =>
//                                 handleInput(
//                                     event,
//                                     REG_EXP_NAME,
//                                     messages.INPUT_NAME
//                                 )
//                             }
//                         />
//                         <FormInput
//                             value={email || ""}
//                             type="email"
//                             name="email"
//                             span="E-mail"
//                             placeholder="Введите e-mail"
//                             inputsValid={inputsValid.email}
//                             message={errors.email || ""}
//                             onChange={(event) =>
//                                 handleInput(
//                                     event,
//                                     REG_EXP_EMAIL,
//                                     messages.INPUT_EMAIL
//                                 )
//                             }
//                         />
//                         <FormInput
//                             type="password"
//                             value={password || ""}
//                             name="password"
//                             span="Пароль"
//                             minLength="6"
//                             placeholder="Введите пароль"
//                             inputsValid={inputsValid.password}
//                             message={errors.password || ""}
//                             onChange={onChange}
//                         />
//                     </div>
//                     <FormButtons
//                         isFormValid={isFormValid}
//                         isLoading={isLoading}
//                     />
//                 </form>
//             </main>
//         </div>
//     );
// };

// export default Register;
