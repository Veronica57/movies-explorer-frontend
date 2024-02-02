import "./Movies.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import ResponseSection from "../ResponseSection/ResponseSection";
import moviesApi from "../../utils/MoviesApi";
import { searchMovie } from "../../utils/utils";
import {
    NOT_FOUND_MESSAGE,
    REQUEST_ERROR_MESSAGE,
} from "../../utils/constants";

function Movies({ onClickSaveMovie, loggedIn }) {
  
  const [isPreloader, setIsPreloader] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  function renderMovies() {
    setIsPreloader(false);
    const foundMovies = searchMovie();
    if (foundMovies.length === 0) {
      setResponseMessage(NOT_FOUND_MESSAGE);
      setIsRender(false);
    } else {
      setFoundMovies(foundMovies);
      setIsRender(true);
    }
  }

  function onSubmitSearchMovies(searchText, shortMovieCheckbox) {
    setIsPreloader(true);
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("shortMovieCheckbox", shortMovieCheckbox);
    if (!localStorage.getItem("movieDataBase")) {
      moviesApi
        .getMovies()
        .then((result) => {
          localStorage.setItem("movieDataBase", JSON.stringify(result));
          renderMovies();
        })
        .catch(() => {
          setIsPreloader(false);
          setResponseMessage(REQUEST_ERROR_MESSAGE);
        });
    } else renderMovies();
  }

  function onClickShortMovie(shortMovieCheckbox) {
    localStorage.setItem("shortMovieCheckbox", shortMovieCheckbox);
    if (localStorage.getItem("movieDataBase")) renderMovies();
  }

  useEffect(() => {
    if (localStorage.getItem("movieDataBase")) {
      setIsPreloader(true);
      setIsRender(true);
      renderMovies();
    } else {
      setIsPreloader(true);
      moviesApi
        .getMovies()
        .then((result) => {
          localStorage.setItem("movieDataBase", JSON.stringify(result));
          renderMovies();
        })
        .catch(() => {
          setIsPreloader(false);
          setResponseMessage(REQUEST_ERROR_MESSAGE);
        });
    }
  }, []);
    
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="movies">
                <SearchForm
                    displayOption={"all"}
                    onSubmitSearchMovies={onSubmitSearchMovies}
                    onClickShortMovie={onClickShortMovie}
                />
                {isPreloader ? (
                    <Preloader />
                ) : isRender ? (
                    <MoviesCardList
                        movies={foundMovies}
                        displayOption={"all"}
                        onClickMovieButton={onClickSaveMovie}
                    />
                ) : (
                    responseMessage && (
                        <ResponseSection
                            responseMessage={responseMessage}
                        />
                    )
                )}
            </main>
            <Footer />
        </>
    );
}

export default Movies;
