import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import More from "../More/More";
import {
    WINDOW_WIDTH_1279,
    WINDOW_WIDTH_1024,
    WINDOW_WIDTH_600,
    QTY_MOVIES_WIDTH_MORE_1279,
    QTY_MOVIES_WIDTH_MORE_1024,
    QTY_MOVIES_WIDTH_MORE_600,
    QTY_MOVIES_WIDTH_MOBILE,
    QTY_ADD_MOVIES_WIDTH_MORE_1279,
    QTY_ADD_MOVIES_WIDTH_MORE_1024,
    QTY_ADD_MOVIES_WIDTH_MORE_600,
    QTY_ADD_MOVIES_WIDTH_MORE_MOBILE,
} from "../../../utils/config";

function MoviesCardList({ movies, displayOption, onClickMovieButton }) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [moviesCounter, setMoviesCounter] = useState(0);
    const [addedMoviesNumber, setAddedMoviesNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        checkMoviesQty();
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    const setCounter = () => {
        setMoviesCounter(addedMoviesNumber + moviesCounter);
    }

    // counter for added movies
    function checkMoviesQty(windowWidth) {
        switch (true) {
            case windowWidth > WINDOW_WIDTH_1279:
                setMoviesCounter(QTY_MOVIES_WIDTH_MORE_1279);
                setAddedMoviesNumber(QTY_ADD_MOVIES_WIDTH_MORE_1279);
                break;
            case windowWidth > WINDOW_WIDTH_1024:
                setMoviesCounter(QTY_MOVIES_WIDTH_MORE_1024);
                setAddedMoviesNumber(QTY_ADD_MOVIES_WIDTH_MORE_1024);
                break;
            case windowWidth > WINDOW_WIDTH_600:
                setMoviesCounter(QTY_MOVIES_WIDTH_MORE_600);
                setAddedMoviesNumber(QTY_ADD_MOVIES_WIDTH_MORE_600);
                break;
            default:
                setMoviesCounter(QTY_MOVIES_WIDTH_MOBILE);
                setAddedMoviesNumber(QTY_ADD_MOVIES_WIDTH_MORE_MOBILE);
        }
    }

    function handleResize() {
        setWindowWidth(window.innerWidth);
    }

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__cards">
                {displayOption === "all"
                    ? movies
                          .slice(0, moviesCounter )
                          .map((item) => {
                              return (
                                  <MoviesCard
                                      movie={item}
                                      key={item.id}
                                      displayOption="all"
                                      onClickMovieButton={onClickMovieButton}
                                  />
                              );
                          })
                    : movies.map((item) => {
                          return (
                              <MoviesCard
                                  movie={item}
                                  key={item._id}
                                  onClickMovieButton={onClickMovieButton}
                              />
                          );
                      })}
            </ul>
            {movies.length > moviesCounter  &&
                displayOption === "all" ? (
                    <More
                        isButtonHidden={false}
                        setMovieCounter={setCounter}
                    />
            ) : (
                    <More isButtonHidden={true} />
                )}
             
        </section>
    );
}

export default MoviesCardList;

