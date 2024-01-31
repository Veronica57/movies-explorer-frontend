class AuthApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    // user register
    registerUser(userData) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((res) => this._checkResponse(res));
    }

    // user login
    loginUser(userData) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((res) => this._checkResponse(res));
    }

    // user logout
    logoutUser(email) {
        return fetch(`${this._baseUrl}/signout`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        }).then((res) => this._checkResponse(res));
    }

    // check token
    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => this._checkResponse(res));
    }
}

// const authApi = new AuthApi("https://api.nikeliot.nomoredomainsmonster.ru");
const authApi = new AuthApi("http://localhost:3000");

export default authApi;
