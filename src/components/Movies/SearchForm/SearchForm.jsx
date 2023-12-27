import "./SearchForm.css";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input
                    className="search-form__input"
                    type="text"
                    placeholder="Фильм"
                />
                <button className="search-form__button" type="button">
                    Найти
                </button>
            </form>
            <div className="search__checkbox-wrapper">
                <label className="search__label-wrapper">
                    <input
                        className="search__checkbox-default"
                        type="checkbox"
                        value="short"
                    />
                    <span className="search__checkbox-custom"></span>
                </label>
                <p className="search__checkbox-name">Короткометражки</p>
            </div>
        </section>
    );
}

export default SearchForm;
