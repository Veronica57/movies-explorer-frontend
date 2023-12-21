import "./SearchForm.css";
import Checkbox from "../Checkbox/Checkbox";

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__line">
                <input
                    type="text"
                    placeholder="Фильм"
                    className="search-form__input"
                    tabIndex={1}
                />
                <button
                    type="button"
                    className="search-form__button"
                    tabIndex={1}>
                    Найти
                </button>
            </form>
            <Checkbox />
        </section>
    );
}

export default SearchForm;
