import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Tech/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Promo from "./Promo/Promo";
import Portfolio from "./Portfolio/Portfolio";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main({ isLogged }) {
    return (
        <>
            <Header isLogged={isLogged} />
            <main className="main">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
        </>
    );
}

export default Main;
