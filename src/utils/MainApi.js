class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    // get user content
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
        }).then((res) => this._checkResponse(res));
    }

    // get saved movies
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: "include",
        }).then((res) => this._checkResponse(res));
    }

    // add user data
    addUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((res) => this._checkResponse(res));
    }

    // add new movie to saved movies
    savеMovie(movieData) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
        }).then((res) => this._checkResponse(res));
    }

    // delete movie from saved movies
    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            credentials: "include",
        }).then((res) => this._checkResponse(res));
    }
}

const mainApi = new MainApi({
    baseUrl: "https://api.nikeliot.nomoredomainsmonster.ru",
    // baseUrl: 'http://localhost:3000',
});

export default mainApi;
