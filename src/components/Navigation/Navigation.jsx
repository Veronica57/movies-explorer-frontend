import "./Navigation.css";

import NavigationPromo from "./NavigationPromo/NavigtionPromo";
import NavigationMovies from "./NavigationMovies/NavigationMovies";

function Navigation({ isLogged }) {
    return isLogged ? <NavigationMovies /> : <NavigationPromo />;
}

export default Navigation;
