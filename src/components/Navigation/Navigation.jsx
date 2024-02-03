import "./Navigation.css";

import NavigationPromo from "./NavigationPromo/NavigtionPromo";
import NavigationMovies from "./NavigationMovies/NavigationMovies";

function Navigation({ loggedIn }) {
    return loggedIn ? <NavigationMovies /> : <NavigationPromo />;
}

export default Navigation;
