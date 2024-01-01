import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, type }) {
    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__cards">
                {movies.map((item) => (
                    <MoviesCard movie={item} key={item._id} type={type} />
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;
