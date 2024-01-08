import "./More.css";

function More({ getMoreMovies, isButtonHidden }) {
    return (
        <section
            className={`more ${isButtonHidden ? "more-show" : "more-hide"}`}>
            <button
                type="button"
                className={`more__button ${
                    isButtonHidden ? "" : "more__button_hide"
                }`}
                onClick={getMoreMovies}>
                Ещё
            </button>
        </section>
    );
}
export default More;
