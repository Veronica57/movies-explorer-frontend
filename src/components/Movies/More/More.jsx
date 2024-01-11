import "./More.css";

function More({ setMovieCounter, isButtonHidden = false }) {
    return (
        <section
            className={`more ${isButtonHidden ? "more-show" : "more-hide"}`}>
            <button
                type="button"
                className={`more__button ${
                    isButtonHidden ? "" : "more__button_hide"
                }`}
                onClick={setMovieCounter}>
                Ещё
            </button>
        </section>
    );
}
export default More;
