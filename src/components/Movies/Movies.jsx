import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
// import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
// import More from "../Movies/More/More";
import Footer from "../Footer/Footer";

function Movies({
    movies,
    setValueInputMovie,
    handleSubmit,
    isLoading,
    isMoviesNotFound,
    handleCheckbox,
    shortFilms,
    isChecked,
    valueInputMovie,
    handleLikeMovie,
    savedMovies,
}) {
    return (
        <>
            <Header />
            <main className="movies">
                <SearchForm
                    setValueInputMovie={setValueInputMovie}
                    handleSubmit={handleSubmit}
                    handleCheckbox={handleCheckbox}
                    valueInputMovie={valueInputMovie}
                    isChecked={isChecked}
                />
                <MoviesCardList
                    movies={movies}
                    shortFilms={shortFilms}
                    isLoading={isLoading}
                    isMoviesNotFound={isMoviesNotFound}
                    isChecked={isChecked}
                    handleLikeMovie={handleLikeMovie}
                    savedMovies={savedMovies}
                />
            </main>
            <Footer />
        </>
    );
}

export default Movies;
