export const BASE_MOVIES_URL = "https://api.nomoreparties.co";
export const BASE_URL = "api.nikeliot.nomoredomainsmonster.ru";

export const REG_EXP_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

export const REG_EXP_NAME = /^[А-ЯA-Zё\s-]+$/imu;

export const messages = {
    SUCCESS_REGISTRATION: "Регистрация прошла успешно",
    SUCCESS_LOGIN: "Вы вошли в аккаунт",
    LOGOUT_SUCCESS: "Вы вышли из аккаунта",
    SERVER_ERROR: "Ошибка на сервере",
    ADD_MOVIE: "Фильм добавлен в избранные",
    REMOVE_MOVIE: "Фильм удален из избранных",
    KEY_WORD: "Введите ключевое слово",
    UPDATE_PROFILE: "Изменения в профиле сохранены",
    INPUT_EMAIL: "Неверный формат почты",
    INPUT_NAME: "Недопустимый символ",
};
