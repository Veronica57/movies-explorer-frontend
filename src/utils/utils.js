// get formatted time
export const getFormattedTime = (duration) => {
    const hours = Math.trunc(duration / 3600);
    const minutes = (duration / 60) % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

// Get filtered movies
export const getFilteredMovies = (arrayMovies, value) => {
    return Array.from(arrayMovies).filter((item) => {
        return (
            item.nameRU
                .toLowerCase()
                .trim()
                .includes(value.toLowerCase().trim()) ||
            item.nameEN
                .toLowerCase()
                .trim()
                .includes(value.toLowerCase().trim())
        );
    });
};

// Filter short movies
export const filterShortMovies = (movies) => {
    return movies.filter((film) => {
        return film.duration <= 40;
    });
};

//Filter saved moves
export const filterSavedMovies = (movies, movieID) => {
    return movies.filter((newCard) => {
        return newCard._id !== movieID;
    });
};
