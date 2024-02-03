class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    // get movies
    getMovies() {
        return fetch( this._baseUrl , {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => this._checkResponse(res));
    }
}

const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    
});

export default moviesApi;
