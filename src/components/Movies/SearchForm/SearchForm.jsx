import "./SearchForm.css";
import { useEffect, useState } from "react";

function SearchForm({
    onSubmitSearchMovies,
    onClickShortMovie,
    displayOption,
}) {
    const [searchValue, setSearchValue] = useState(""); 
    const [errors, setErrors] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
    
    useEffect(() => {
        if (displayOption === "all") {
            const searchText = localStorage.getItem("searchText");
            const shortMovieCheckbox = localStorage.getItem("shortMovieSwitch");
            if (searchText && shortMovieCheckbox) {
                setSearchValue(searchText);
                shortMovieCheckbox === "true"
                    ? setIsActiveCheckbox(true)
                    : setIsActiveCheckbox(false);
            }
        } else {
            localStorage.setItem("savedMovieSearchText", "");
            localStorage.setItem("shortSavedMovieSwitch", "false");
            setIsActiveCheckbox(false);
        }
    }, [displayOption]);

    const handleChangeSearch = (evt) => {
        setErrors(evt.target.validationMessage);
        setSearchValue(evt.target.value);
        setIsValid(evt.target.closest("form").checkValidity());
    }

    const onSubmitSearch = (evt) => {
        evt.preventDefault();
        if (!isValid) return;
        onSubmitSearchMovies(searchValue, isActiveCheckbox);
        setIsValid(false);
    }

    const handleChangeCheckbox = () => {
        onClickShortMovie(!isActiveCheckbox);
        setIsActiveCheckbox(!isActiveCheckbox);
    }

    return (
        <section className="search">
            <form
                className={`search__form ${
                    errors && "search__form-error"
                }`}
                onSubmit={onSubmitSearch}
                noValidate>
                <input
                    className="search__form-input"
                    type="text"
                    required
                    placeholder="Фильм"
                    value={searchValue}
                    onChange={handleChangeSearch}
                />
                <button
                    className={
                        isValid
                            ? "search__form-button"
                            : "search__form-button_disabled"
                    }
                    type="submit"
                    onClick={onSubmitSearch}>
                    Найти
                </button>
            </form>
            <div className={isValid ? "search__error_hidden":"search__error"}>{errors}</div>
            <div className="search__checkbox-wrapper">
                <label className="search__label-wrapper">
                    <input
                        className="search__checkbox-default"
                        checked={isActiveCheckbox ? true : false}
                        type="checkbox"
                        value="shortMovieSwitch"
                        onChange={handleChangeCheckbox}
                    />
                    <span className="search__checkbox-custom"></span>
                </label>
                <p className="search__checkbox-name">Короткометражки</p>
            </div>
        </section>
    );
}

export default SearchForm;
