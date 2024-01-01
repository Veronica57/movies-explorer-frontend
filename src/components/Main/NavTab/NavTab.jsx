import "./NavTab.css";

function NavTab() {
    return (
        <nav className="nav-tab">
            <ul className="nav-tab__links">
                <li className="nav-tab__link-container">
                    <a href="#about-project" className="nav-tab__link">
                        Узнать больше
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default NavTab;
