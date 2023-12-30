import "./More.css";

function More({ isShowMore }) {
    return (
        <section className={`more ${isShowMore ? "more-show" : "more-hide"}`}>
            <button
                type="button"
                className={`more__button ${
                    isShowMore ? "" : "more__button_hide"
                }`}>
                Ещё
            </button>
        </section>
    );
}
export default More;
