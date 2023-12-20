import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Tech/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Promo from "./Promo/Promo";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
    return (
        <main className="main">
            {/* <Navigation /> */}
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}

export default Main;
