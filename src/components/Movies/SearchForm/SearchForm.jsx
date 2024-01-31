import "./SearchForm.css";
import { useEffect, useState } from "react";

function SearchForm({
    onSubmitSearchMovies,
    onClickShortMovie,
    displayOption,
}) {
    const [isSearchValue, setIsSearchValue] = useState("");
    const [isShortSwitch, setIsShortSwitch] = useState(false);
    const [isValidationError, setIsValidationError] = useState("");
    const [isValid, setIsValid] = useState(false);

    function handleChangeSearch(evt) {
        setIsValidationError(evt.target.validationMessage);
        setIsSearchValue(evt.target.value);
        setIsValid(evt.target.closest("form").checkValidity());
    }

    function onSubmitSearch(evt) {
        evt.preventDefault();
        if (!isValid) return;
        onSubmitSearchMovies(isSearchValue, isShortSwitch);
        setIsValid(false);
    }

    function handleChangeShortSwitch() {
        onClickShortMovie(!isShortSwitch);
        setIsShortSwitch(!isShortSwitch);
    }

    useEffect(() => {
        if (displayOption === "all") {
            const searchText = localStorage.getItem("searchText");
            const shortMovieSwitch = localStorage.getItem("shortMovieSwitch");
            if (searchText && shortMovieSwitch) {
                setIsSearchValue(searchText);
                shortMovieSwitch === "true"
                    ? setIsShortSwitch(true)
                    : setIsShortSwitch(false);
            }
        } else {
            localStorage.setItem("savedMovieSearchText", "");
            localStorage.setItem("shortSavedMovieSwitch", "false");
            setIsShortSwitch(false);
        }
    }, [displayOption]);

    return (
        <section className="search">
            <form
                className={`search__form ${
                    isValidationError && "search__form-error"
                }`}
                onSubmit={onSubmitSearch}
                noValidate>
                <input
                    className="search__form-input"
                    type="text"
                    required
                    placeholder="Фильм"
                    value={isSearchValue}
                    onChange={handleChangeSearch}
                />
                <button
                    className={`search__form-button ${
                        isValid
                            ? "hover-button"
                            : "search__form-button_disabled"
                    }`}
                    type="button"
                    onClick={onSubmitSearch}>
                    Найти
                </button>
            </form>
            {/* <div className="search__error">{isValidationError}</div> */}
            <div className="search__checkbox-wrapper">
                <label className="search__label-wrapper">
                    <input
                        className="search__checkbox-default"
                        checked={isShortSwitch ? true : false}
                        type="checkbox"
                        value="shortMovieSwitch"
                        onChange={handleChangeShortSwitch}
                    />
                    <span className="search__checkbox-custom"></span>
                </label>
                <p className="search__checkbox-name">Короткометражки</p>
            </div>
        </section>
    );
}

export default SearchForm;
