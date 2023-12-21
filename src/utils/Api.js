class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(endpoint, options) {
        return fetch(`${this._baseUrl}${endpoint}`, options).then(
            this._checkResponse
        );
    }

    getMovies() {
        return this._request("/", {
            headers: this._headers,
        });
    }
}

const moviesApi = new Api({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json",
    },
});

export default Api;
