import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import useScreenOrientation from "../../../hooks/useScreenOrientation";
import Preloader from "../Preloader/Preloader";
import More from "../More/More";
import useCountMovies from "../../../hooks/useCountMovies";

function MoviesCardList({
    movies,
    isLoading,
    isChecked,
    shortFilms,
    isMoviesNotFound,
    isSavedMoviesNotFound,
    handleLikeMovie,
    savedMovies,
    shortSavedFilms,
    handleRemoveButton,
    isSavedMoviesChecked,
    filteredSavedMovies,
}) {
    const location = useLocation();
    const orientation = useScreenOrientation();
    const { getMoreMovies, countRenderMovies } = useCountMovies(orientation);

    return (
        <section className="movies-card-list">
            {location.pathname === "/movies" ? (
                (isLoading && <Preloader />) || (
                    <>
                        {(isMoviesNotFound ||
                            (isChecked && shortFilms.length === 0)) && (
                            <h2 className="movies-card-list__not-found">
                                Ничего не найдено
                            </h2>
                        )}
                        {
                            <ul className="movies-card-list__cards">
                                {(isChecked ? shortFilms : movies)
                                    .slice(0, countRenderMovies)
                                    .map((card, i) => (
                                        <MoviesCard
                                            card={card}
                                            key={card.id}
                                            handleLikeMovie={handleLikeMovie}
                                            savedMovies={savedMovies}
                                        />
                                    ))}
                            </ul>
                        }
                        {isChecked
                            ? shortFilms.length > countRenderMovies && (
                                  <More getMoreMovies={getMoreMovies} />
                              )
                            : movies.length > countRenderMovies && (
                                  <More getMoreMovies={getMoreMovies} />
                              )}
                    </>
                )
            ) : (
                <>
                    {(isSavedMoviesNotFound ||
                        (isSavedMoviesChecked &&
                            shortSavedFilms.length === 0)) && (
                        <h2 className="movies-card-list__not-found">
                            Ничего не найдено
                        </h2>
                    )}
                    <ul className="movies-card-list__cards">
                        {(isSavedMoviesChecked
                            ? shortSavedFilms
                            : filteredSavedMovies
                        )
                            .slice(0, countRenderMovies)
                            .map((card, i) => (
                                <MoviesCard
                                    card={card}
                                    key={card._id}
                                    handleRemoveButton={handleRemoveButton}
                                    savedMovies={savedMovies}
                                />
                            ))}
                    </ul>
                </>
            )}
        </section>
    );
}

export default MoviesCardList;
