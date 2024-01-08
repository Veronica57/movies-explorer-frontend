import { BASE_URL } from "./constants";

function checkResponse(res, setMessage) {
    if (!res.ok) {
        res.text().then((text) => {
            setMessage &&
                setMessage(JSON.parse(text).message || "Произошла ошибка");
        });
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

async function request(url, options, setMessage) {
    const res = await fetch(`${BASE_URL}${url}`, options);
    return checkResponse(res, setMessage);
}

// user register
export function register(name, email, password, setMessage) {
    return request(
        "/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
        },
        setMessage
    );
}

// user login
export function login(email, password, setMessage) {
    return request(
        "/signin",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        },
        setMessage
    ).then((data) => {
        if (data) {
            localStorage.setItem("jwt", "isLoggedIn");
            return data;
        }
    });
}

// user logout
export function logout(setMessage) {
    return request(
        "/signout",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        setMessage
    );
}

// get current user data
export function getCurrentUser(setMessage) {
    return request(
        "/users/me",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        setMessage
    );
}

// update user data
export function updateProfile(data, setMessage) {
    return request(
        "/users/me",
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            }),
        },
        setMessage
    );
}

// add movie to saved movies
export function saveMovie(dataMovie, setMessage) {
    return request(
        "/movies",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                country: dataMovie.country,
                director: dataMovie.director,
                duration: dataMovie.duration,
                year: dataMovie.year,
                description: dataMovie.description,
                image: dataMovie.image,
                trailerLink: dataMovie.trailerLink,
                thumbnail: dataMovie.thumbnail,
                movieId: dataMovie.movieId,
                nameRU: dataMovie.nameRU,
                nameEN: dataMovie.nameEN,
            }),
        },
        setMessage
    );
}

// get saved movies
export function getSavedMovies(setMessage) {
    return request(
        "/movies",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        setMessage
    );
}

// delete movie
export function deleteMovie(movieID, setMessage) {
    return request(
        `/movies/${movieID}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        setMessage
    );
}
