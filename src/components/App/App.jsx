import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CurrentSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
//user authorization api
import authApi from "../../utils/Auth";
// main api
import mainApi from "../../utils/MainApi";
// components
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Page404 from "../Page404/Page404";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Popup from "../Popup/Popup";
import Preloader from "../Movies/Preloader/Preloader";

import { MESSAGE_DISPLAY_TIME } from "../../utils/config";
import {
    SUCCESSFUL_REGISTRATION_MESSAGE,
    SUCCESSFUL_USER_UPDATED_MESSAGE,
    MOVIE_NOT_DELETED_MESSAGE,
    MOVIE_NOT_SAVED_MESSAGE,
    BAD_REQUEST_ERROR_CODE,
    AUTH_ERROR_CODE,
    AUTH_ERROR_MESSAGE,
    CONFLICT_ERROR_CODE,
    CONFLICT_ERROR_MESSAGE,
    SERVER_ERROR_MESSAGE,
} from "../../utils/constants";

function App() {
    const [isRender, setIsRender] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isResponseMessage, setIsResponseMessage] = useState("");
    const [isPopupMessage, setIsPopupMessage] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState({});
    const [isCurrentMovies, setIsCurrentMovies] = useState([]);

    // check token and authorize user
    useEffect(() => {
        if (localStorage.getItem("_id")) {
            authApi
                .checkToken()
                .then((data) => {
                    if (data) setIsLogged(true);
                })
                .catch(() => openPopup(SERVER_ERROR_MESSAGE));
        }
    }, []);

    function removeResponseMessage() {
        setTimeout(() => setIsResponseMessage(""), MESSAGE_DISPLAY_TIME);
    }

    // popups
    function closePopup() {
        setIsOpenPopup(false);
        setIsPopupMessage("");
    }

    function openPopup(message) {
        setIsPopupMessage(message);
        setIsOpenPopup(true);
    }

    // register
    function onRegister(userData) {
        authApi
            .registerUser(userData)
            .then(() => {
                openPopup(SUCCESSFUL_REGISTRATION_MESSAGE);
                delete userData.name;
                onLogin(userData);
            })
            .catch((error) => {
                if (error === CONFLICT_ERROR_CODE) {
                    setIsResponseMessage(CONFLICT_ERROR_MESSAGE);
                } else setIsResponseMessage(SERVER_ERROR_MESSAGE);
                removeResponseMessage();
            });
    }

    // login
    function onLogin(userData) {
        authApi
            .loginUser(userData)
            .then((result) => {
                if (result._id) {
                    localStorage.setItem("_id", result._id);
                    setIsLogged(true);
                }
            })
            .catch((error) => {
                if (error === AUTH_ERROR_CODE) {
                    setIsResponseMessage(AUTH_ERROR_MESSAGE);
                } else setIsResponseMessage(SERVER_ERROR_MESSAGE);
                removeResponseMessage();
            });
    }

    // logout
    function onLogout() {
        authApi
            .logoutUser()
            .then(() => {
                localStorage.clear();
                setIsLogged(false);
                setIsCurrentUser({});
                setIsCurrentMovies([]);
            })
            .catch(() => openPopup(SERVER_ERROR_MESSAGE));
    }

    // update user
    function onUpdateUser(userData) {
        mainApi
            .addUserInfo(userData)
            .then(() => {
                openPopup(SUCCESSFUL_USER_UPDATED_MESSAGE);
            })
            .catch(() => {
                setIsResponseMessage(SERVER_ERROR_MESSAGE);
                removeResponseMessage();
            });
    }

    // delete movie
    function onClickDeleteMovie(id) {
        mainApi
            .deleteMovie(id)
            .then((result) => {
                if (result._id)
                    setIsCurrentMovies((prev) =>
                        prev.filter((item) => item._id !== id)
                    );
            })
            .catch((error) => {
                if (error === BAD_REQUEST_ERROR_CODE)
                    openPopup(MOVIE_NOT_DELETED_MESSAGE);
                else openPopup(SERVER_ERROR_MESSAGE);
            });
    }

    // save movie
    function onClickSaveMovie(movie, typeBtn, id) {
        if (typeBtn === "delete") {
            onClickDeleteMovie(id);
            return;
        }
        const savedMovie = {
            ...movie,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        };
        savedMovie.movieId = savedMovie.id;
        delete savedMovie.id;
        delete savedMovie.created_at;
        delete savedMovie.updated_at;
        mainApi
            .savеMovie(savedMovie)
            .then((result) => {
                if (result._id) setIsCurrentMovies((prev) => [...prev, result]);
            })
            .catch((error) => {
                if (error === BAD_REQUEST_ERROR_CODE)
                    openPopup(MOVIE_NOT_SAVED_MESSAGE);
                else openPopup(SERVER_ERROR_MESSAGE);
            });
    }

    // get current user data
    useEffect(() => {
        if (isLogged) {
            mainApi
                .getUserInfo()
                .then((userData) => setIsCurrentUser(userData))
                .catch((error) => console.log(error));
        }
    }, [isLogged]);

    // get saved movies
    useEffect(() => {
        if (isLogged) {
            mainApi
                .getSavedMovies()
                .then((savedMovies) => setIsCurrentMovies(savedMovies))
                .catch((error) => console.log(error));
        }
    }, [isLogged]);

    useEffect(() => {
        const timeout = setTimeout(() => setIsRender(true), 1000);
        return () => clearTimeout(timeout);
    }, [isRender]);

    if (!isRender) return <Preloader />;

    return (
        <CurrentUserContext.Provider value={isCurrentUser}>
            <CurrentSavedMoviesContext.Provider value={isCurrentMovies}>
                <div className="app">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Main isLogged={isLogged} />}
                        />
                        <Route element={<ProtectedRoute isLogged={isLogged} />}>
                            <Route
                                path="/movies"
                                element={
                                    <Movies
                                        onClickSaveMovie={onClickSaveMovie}
                                        isLogged={isLogged}
                                    />
                                }
                            />
                            <Route
                                path="/saved-movies"
                                element={
                                    <SavedMovies
                                        onClickDeleteMovie={onClickDeleteMovie}
                                        isLogged={isLogged}
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                        onLogout={onLogout}
                                        isLogged={isLogged}
                                        onSubmitForm={onUpdateUser}
                                        isResponseMessage={isResponseMessage}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            path="/signin"
                            element={
                                isLogged ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Login
                                        onLogin={onLogin}
                                        isResponseMessage={isResponseMessage}
                                    />
                                )
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                isLogged ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Register
                                        onRegister={onRegister}
                                        isResponseMessage={isResponseMessage}
                                    />
                                )
                            }
                        />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                    <Popup
                        isOpen={isOpenPopup}
                        onClose={closePopup}
                        isPopupMessage={isPopupMessage}
                    />
                </div>
            </CurrentSavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
