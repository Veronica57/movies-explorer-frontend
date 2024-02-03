import "./InfoToolTip.css";
import { useEffect } from "react";
import fail from "../../images/fail.svg";
import success from "../../images/success.svg";

function InfoToolTip({ onClose, isOpen, isSuccess, infoToolTipMessage }) {

    function useEscapeClose(isOpen, onClose) {
        useEffect(() => {
            function handleEscapeClose(event) {
                if (event.key === "Escape") {
                    onClose();
                }
            }
            if (isOpen) document.addEventListener("keydown", handleEscapeClose);
            return () =>
                document.removeEventListener("keydown", handleEscapeClose);
        }, [onClose, isOpen]);
    }

    useEscapeClose(isOpen, onClose);

    return (
        <div
            className={`popup info-tooltip
            onClick={onClose}> ${isOpen && "popup_opened"}`}>
            <div className=" info-tooltip__container">
                <img
                    className="info-tooltip__image"
                    src={isSuccess ? success : fail}
                    alt="Результат запроса"
                />
                <p className="info-tooltip__subtitle">{infoToolTipMessage}</p>
                <button
                    className="button info-tooltip__close"
                    type="button"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export default InfoToolTip;
