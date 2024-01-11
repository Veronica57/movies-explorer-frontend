import React from "react";
import { useEffect } from "react";
import "./Popup.css";

function Popup({ isOpen, onClose, isPopupMessage }) {
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
        <article className={`popup ${isOpen && "popup_opened"}`}>
            <div onClick={onClose} className="popup__overlay"></div>
            <div className="popup__wrapper">
                <h2 className="popup__text">{isPopupMessage}</h2>
                <button
                    className="popup__close-btn hover-btn"
                    aria-label="сlose"
                    type="button"
                    onClick={onClose}></button>
            </div>
        </article>
    );
}

export default Popup;
