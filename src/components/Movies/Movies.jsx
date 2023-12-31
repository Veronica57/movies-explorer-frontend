import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import More from "../Movies/More/More";
import Footer from "../Footer/Footer";
import "./Movies.css";

import movies from "../../utils/MoviesConstants";

function Movies() {
    const isPreloader = false;

    return (
        <>
            <Header />
            <main className="movies">
                <SearchForm />
                {isPreloader ? (
                    <Preloader />
                ) : (
                    <>
                        <MoviesCardList movies={movies} type="all" />
                        <More isShowMore={true} />
                    </>
                )}
            </main>

            <Footer />
        </>
    );
}

export default Movies;
