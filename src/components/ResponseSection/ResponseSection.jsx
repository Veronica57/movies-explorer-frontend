import "./ResponseSection.css";

function ResponseSection({ responseMessage }) {
    return (
        <section className="response">
            <div className="response__message">{responseMessage}</div>
        </section>
    );
}

export default ResponseSection;
