import "./CheckboxFilter.css";
import { useLocation } from "react-router-dom";

function CheckboxFilter({
    handleCheckbox,
    isChecked,
    handleSavedMoviesCheckbox,
    isSavedMoviesChecked,
}) {
    const location = useLocation();

    return (
        <div className="search__checkbox-wrapper">
            {location.pathname === "/movies" ? (
                <label className="search__label-wrapper">
                    <input
                        type="chekbox"
                        className="search__checkbox-default"
                        tabIndex={1}
                        checked={isChecked}
                        onChange={handleCheckbox}
                    />
                    <span className="search__checkbox-custom"></span>
                </label>
            ) : (
                <label className="search__label-wrapper">
                    <input
                        className="search__checkbox-default"
                        type="checkbox"
                        tabIndex={1}
                        checked={isSavedMoviesChecked}
                        onChange={handleSavedMoviesCheckbox}
                    />
                    <span className="search__checkbox-custom"></span>
                </label>
            )}
            <p className="search__checkbox-name">Короткометражки</p>
        </div>
    );
}
export default CheckboxFilter;
