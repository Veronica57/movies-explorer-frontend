import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CurrentSavedMoviesContext } from "../../context/CurrentSavedMoviesContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";
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
// import Popup from "../Popup/Popup";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
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
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("_id") ? true : false
    );
    const [isRender, setIsRender] = useState(false);
    const [isSucces, setIsSuccess] = useState(false);
    const [isOpenToolTip, setIsOpenToolTip] = useState(false);
    const [isInfoToolTipMessage, setIsInfoToolTipMessage] = useState("");
    const [isResponseMessage, setIsResponseMessage] = useState("");
    const [isCurrentUser, setIsCurrentUser] = useState({});
    const [isCurrentMovies, setIsCurrentMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => setIsRender(true), 1000);
        return () => clearTimeout(timeout);
    }, [isRender]);

    // check token and authorize user
    useEffect(() => {
        if (localStorage.getItem("_id")) {
            authApi
                .checkToken()
                .then((data) => {
                    if (data) setLoggedIn(true);
                })
                .catch(() => {
                    setLoggedIn(false);
                    openToolTip(SERVER_ERROR_MESSAGE);
                });
        }
    }, []);

    const removeResponseMessage = () => {
        setTimeout(() => setIsResponseMessage(""), MESSAGE_DISPLAY_TIME);
    };

    // tooltip
    const closeToolTip = () => {
        setIsOpenToolTip(false);
        setIsInfoToolTipMessage("");
    };

    const openToolTip = (message) => {
        setIsInfoToolTipMessage(message);
        setIsOpenToolTip(true);
    };

    // register
    function onRegister(userData) {
        authApi
            .registerUser(userData)
            .then(() => {
                openToolTip(SUCCESSFUL_REGISTRATION_MESSAGE);
                setIsSuccess(true);
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
                    setLoggedIn(true);
                    navigate("/movies", { replace: true });
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
                setLoggedIn(false);
                setIsCurrentUser({});
                setIsCurrentMovies([]);
                navigate("/", { replace: true });
            })
            .catch(() => openToolTip(SERVER_ERROR_MESSAGE));
    }

    // update user
    function onUpdateUser(userData) {
        mainApi
            .editUserInfo(userData)
            .then(() => {
                openToolTip(SUCCESSFUL_USER_UPDATED_MESSAGE);
                setIsSuccess(true);
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
                if (error === BAD_REQUEST_ERROR_CODE) {
                    openToolTip(MOVIE_NOT_DELETED_MESSAGE);
                    setIsSuccess(false);
                } else openToolTip(SERVER_ERROR_MESSAGE);
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
                if (error === BAD_REQUEST_ERROR_CODE) {
                    openToolTip(MOVIE_NOT_SAVED_MESSAGE);
                    setIsSuccess(false);
                } else {
                    openToolTip(SERVER_ERROR_MESSAGE);
                    setIsSuccess(false);
                }
            });
    }

    // get current user data
    useEffect(() => {
        if (loggedIn) {
            mainApi
                .getUserInfo()
                .then((userData) => setIsCurrentUser(userData))
                .catch((error) => console.log(error));
        }
    }, [loggedIn]);

    // get saved movies
    useEffect(() => {
        if (loggedIn) {
            mainApi
                .getSavedMovies()
                .then((savedMovies) => setIsCurrentMovies(savedMovies))
                .catch((error) => console.log(error));
        }
    }, [loggedIn]);

    if (!isRender) return <Preloader />;

    return (
        <CurrentUserContext.Provider value={isCurrentUser}>
            <CurrentSavedMoviesContext.Provider value={isCurrentMovies}>
                <div className="app">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Main loggedIn={loggedIn} />}
                        />
                        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
                            <Route
                                path="/movies"
                                element={
                                    <Movies
                                        onClickSaveMovie={onClickSaveMovie}
                                        loggedIn={loggedIn}
                                    />
                                }
                            />
                            <Route
                                path="/saved-movies"
                                element={
                                    <SavedMovies
                                        onClickDeleteMovie={onClickDeleteMovie}
                                        loggedIn={loggedIn}
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                        onLogout={onLogout}
                                        loggedIn={loggedIn}
                                        onSubmitForm={onUpdateUser}
                                        isResponseMessage={isResponseMessage}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            path="/signin"
                            element={
                                loggedIn ? (
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
                                loggedIn ? (
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
                    <InfoToolTip
                        isOpen={isOpenToolTip}
                        onClose={closeToolTip}
                        isInfoToolTipMessage={isInfoToolTipMessage}
                        isSuccess={isSucces}
                    />
                </div>
            </CurrentSavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
