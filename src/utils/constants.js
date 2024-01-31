// export const BASE_MOVIES_URL = "https://api.nomoreparties.co";
// export const BASE_URL = "api.nikeliot.nomoredomainsmonster.ru";

const REG_EXP_EMAIL = "^[^ ]+@[^ ]+.[a-z]{2,3}$";

const REG_EXP_NAME = "^[A-Za-zА-Яа-яЁё /s -]+$";

const BAD_REQUEST_ERROR_CODE = 400;
const AUTH_ERROR_CODE = 401;
const CONFLICT_ERROR_CODE = 409;

const AUTH_ERROR_MESSAGE = "Incorrect data";
const CONFLICT_ERROR_MESSAGE = "User already exists";
const SERVER_ERROR_MESSAGE = "Internal Server Error";
const SUCCESSFUL_REGISTRATION_MESSAGE = "Registration completed successfully!";
const SUCCESSFUL_USER_UPDATED_MESSAGE = "User data has been updated";
const MOVIE_NOT_DELETED_MESSAGE = "Impossible to delete";
const MOVIE_NOT_SAVED_MESSAGE = "Impossible to save";
const NOT_FOUND_MESSAGE = "Nothing found";
const REQUEST_ERROR_MESSAGE = `Bad Request Error. Please try again later`;

module.exports = {
    SUCCESSFUL_REGISTRATION_MESSAGE,
    SUCCESSFUL_USER_UPDATED_MESSAGE,
    MOVIE_NOT_DELETED_MESSAGE,
    MOVIE_NOT_SAVED_MESSAGE,
    BAD_REQUEST_ERROR_CODE,
    AUTH_ERROR_CODE,
    CONFLICT_ERROR_CODE,
    AUTH_ERROR_MESSAGE,
    CONFLICT_ERROR_MESSAGE,
    SERVER_ERROR_MESSAGE,
    NOT_FOUND_MESSAGE,
    REQUEST_ERROR_MESSAGE,
    REG_EXP_EMAIL,
    REG_EXP_NAME,
};
