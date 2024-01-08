import { BASE_MOVIES_URL } from "./constants";

function checkResponse(res, setMessage) {
    if (!res.ok) {
        throw new Error(setMessage);
    }
    return res.json();
}
async function request(url, setMessage) {
    const res = await fetch(`${BASE_MOVIES_URL}${url}`);
    return checkResponse(res, setMessage);
}

export function getMovies() {
    return request("/beatfilm-movies", "Ошибка на сервере");
}
