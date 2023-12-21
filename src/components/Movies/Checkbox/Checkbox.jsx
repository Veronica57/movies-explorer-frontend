import "./Checkbox.css";
import checkBox from "../../../images/checkbox.svg";

function Checkbox() {
    return (
        <div className="checkbox">
            <p className="checkbox__name">
                <img
                    className="checkbox__image"
                    src={checkBox}
                    alt="Checkbox"
                />
                Коротометражки
            </p>
        </div>
    );
}
export default Checkbox;
