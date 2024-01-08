import "./SearchForm.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CheckboxFilter from "./CheckboxFilter/CheckboxFilter";

function SearchForm({
    setValueInputMovie,
    handleSubmit,
    handleCheckbox,
    valueInputMovie,
    isChecked,
    handleSavedMoviesCheckbox,
    isSavedMoviesChecked,
    setValueInputSavedMovie,
    valueInputSavedMovie,
    handleSubmitSearchSavedMovies,
    setIsSavedMoviesChecked,
}) {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/saved-movies") {
            setValueInputSavedMovie("");
            setIsSavedMoviesChecked(false);
        }
    }, []);

    return (
        <section className="search">
            {location.pathname === "/movies" ? (
                <form
                    className="search__form"
                    onSubmit={(e) => handleSubmit(e, isChecked)}>
                    <input
                        className="search__form-input"
                        type="text"
                        placeholder="Фильм"
                        tabIndex={1}
                        value={valueInputMovie}
                        onChange={(e) => setValueInputMovie(e.target.value)}
                    />
                    <button
                        className="search__form-button"
                        type="submit"
                        tabIndex={1}>
                        Найти
                    </button>
                </form>
            ) : (
                <form
                    className="search__form"
                    onSubmit={(e) => handleSubmitSearchSavedMovies(e)}>
                    <input
                        className="search__form-input"
                        type="text"
                        placeholder="Фильм"
                        tabIndex={1}
                        value={valueInputSavedMovie}
                        onChange={(e) =>
                            setValueInputSavedMovie(e.target.value)
                        }
                    />
                    <button
                        className="search__form-button"
                        type="submit"
                        tabIndex={1}>
                        Найти
                    </button>
                </form>
            )}

            <CheckboxFilter
                handleCheckbox={handleCheckbox}
                isChecked={isChecked}
                handleSavedMoviesCheckbox={handleSavedMoviesCheckbox}
                isSavedMoviesChecked={isSavedMoviesChecked}
            />
            {/* <div className="search__checkbox-wrapper">
                <label className="search__label-wrapper">
                    <input
                        className="search__checkbox-default"
                        type="checkbox"
                        value="short"
                    />
                    <span className="search__checkbox-custom"></span>
                </label>
                <p className="search__checkbox-name">Короткометражки</p>
            </div> */}
        </section>
    );
}

export default SearchForm;
