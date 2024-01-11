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

function MoviesCardList({ movies, displayOption, onClickMovieBtn }) {
    const [isMoviesCounter, setIsMoviesCounter] = useState(0);
    const [isQtyAddMovies, setIsQtyAddMovies] = useState(0);

    // counter for added movies
    function setNumberMovies(windowWidth) {
        switch (true) {
            case windowWidth > WINDOW_WIDTH_1279:
                setIsMoviesCounter(QTY_MOVIES_WIDTH_MORE_1279);
                setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_1279);
                break;
            case windowWidth > WINDOW_WIDTH_1024:
                setIsMoviesCounter(QTY_MOVIES_WIDTH_MORE_1024);
                setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_1024);
                break;
            case windowWidth > WINDOW_WIDTH_600:
                setIsMoviesCounter(QTY_MOVIES_WIDTH_MORE_600);
                setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_600);
                break;
            default:
                setIsMoviesCounter(QTY_MOVIES_WIDTH_MOBILE);
                setIsQtyAddMovies(QTY_ADD_MOVIES_WIDTH_MORE_MOBILE);
        }
    }

    function setMovieCounter() {
        setIsMoviesCounter(isMoviesCounter + isQtyAddMovies);
    }

    function slowDownResize(callback) {
        let blockedCall = false;
        return function () {
            if (blockedCall) return;
            const context = this;
            const args = arguments;
            blockedCall = true;
            setTimeout(() => {
                callback.apply(context, args);
                blockedCall = false;
            }, 500);
        };
    }

    useEffect(() => {
        setNumberMovies(window.innerWidth);
        window.addEventListener(
            "resize",
            (window.fn = slowDownResize((evt) =>
                setNumberMovies(evt.currentTarget.innerWidth)
            ))
        );
        return () => window.removeEventListener("resize", window.fn);
    }, []);

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__cards">
                {displayOption === "all"
                    ? movies.slice(0, isMoviesCounter).map((item) => {
                          return (
                              <MoviesCard
                                  movie={item}
                                  key={item.id}
                                  displayOption="all"
                                  onClickMovieBtn={onClickMovieBtn}
                              />
                          );
                      })
                    : movies.map((item) => {
                          return (
                              <MoviesCard
                                  movie={item}
                                  key={item._id}
                                  onClickMovieBtn={onClickMovieBtn}
                              />
                          );
                      })}
            </ul>
            {movies.length > isMoviesCounter && displayOption === "all" ? (
                <More setMovieCounter={setMovieCounter} />
            ) : (
                <More isBtnHiden={true} />
            )}
        </section>
    );
}

export default MoviesCardList;
