import "./SavedMovies.css";
import { useState, useContext, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import ResponseSection from "../ResponseSection/ResponseSection";
import { NOT_FOUND_MESSAGE } from "../../utils/constants";
import { searchSavedMovie } from "../../utils/utils";
import { CurrentSavedMoviesContext } from "../../context/CurrentSavedMoviesContext";

function SavedMovies({ onClickDeleteMovie, loggedIn }) {
    const savedMovies = useContext(CurrentSavedMoviesContext);
    const [isPreloader, setIsPreloader] = useState(false);
    const [isRender, setIsRender] = useState(false);
    const [isFoundMovies, setIsFoundMovies] = useState([]);
    const [isResponseMessage, setIsResponseMessage] = useState("");

    function renderMovies() {
        setIsPreloader(true);
        const foundMovies = searchSavedMovie(savedMovies);
        if (foundMovies.length === 0) {
            setIsRender(false);
            setIsPreloader(false);
            setIsResponseMessage(NOT_FOUND_MESSAGE);
        } else {
            setIsRender(true);
            setIsPreloader(false);
            setIsFoundMovies(foundMovies);
        }
    }

    function onSubmitSearchMovies(searchText, shortMovieSwitch) {
        localStorage.setItem("savedMovieSearchText", searchText);
        localStorage.setItem("shortSavedMovieSwitch", shortMovieSwitch);
        renderMovies();
    }

    function onClickShortMovie(shortMovieSwitch) {
        localStorage.setItem("shortSavedMovieSwitch", shortMovieSwitch);
        renderMovies();
    }

    useEffect(() => {
        setIsPreloader(true);
        renderMovies();
    }, [savedMovies]);

    return (
        <div className="saved-movies">
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm
                    displayOption={"save"}
                    onSubmitSearchMovies={onSubmitSearchMovies}
                    onClickShortMovie={onClickShortMovie}
                />
                {isPreloader ? (
                    <Preloader />
                ) : isRender ? (
                    <MoviesCardList
                        movies={isFoundMovies}
                        displayOption={"save"}
                        onClickMovieBtn={onClickDeleteMovie}
                    />
                ) : (
                    isResponseMessage && (
                        <ResponseSection
                            isResponseMessage={isResponseMessage}
                        />
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}

export default SavedMovies;
