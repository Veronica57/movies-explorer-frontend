class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    // get user data
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
        }).then((result) => this._checkResponse(result));
    }

    // get saved movies
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: "include",
        }).then((result) => this._checkResponse(result));
    }

    // edit user data
    editUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((result) => this._checkResponse(result));
    }

    // add movies to saved
    savеMovie(movieData) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
        }).then((result) => this._checkResponse(result));
    }

    // delete movie from saved movies
    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            credentials: "include",
        }).then((result) => this._checkResponse(result));
    }
}

const mainApi = new MainApi({
    // baseUrl: "https://api.nikeliot.nomoredomainsmonster.ru",
    baseUrl: "http://localhost:3000",
});

export default mainApi;
