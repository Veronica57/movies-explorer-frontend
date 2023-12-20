import "./Profile.css";
import AuthTitle from "../../upd/AuthTitle/AuthTitle";

function Profile({
    user,
    isEdit,
    onSignOut,
    onSubmit,
    onEditProfile,
    isFormValid,
}) {
    return (
        <section className="profile">
            <AuthTitle headerTitle={`Привет, ${user.name}!`} place="profile" />
            <form className="profile__form">
                <label htmlFor="name-input" className="profile__input">
                    Имя
                </label>
                <input
                    type="text"
                    className="profile__field"
                    name="name"
                    id="name-input"
                    minLength={2}
                    maxLength={40}
                    placeholder="Имя"
                    required
                />
                <label htmlFor="email-input" className="profile__input">
                    E-mail{" "}
                </label>
                <input
                    type="email"
                    className="profile__field"
                    id="email-input"
                    placeholder="E-mail"
                    required
                />
                <button className="profile__button-subbmit">
                    Редактировать
                </button>
                <button className="profile__logout">Выйти</button>
            </form>
        </section>
    );
}

export default Profile;
