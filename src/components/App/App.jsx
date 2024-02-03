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
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import Preloader from "../Movies/Preloader/Preloader";
// constants
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
    const [infoToolTipMessage, setInfoToolTipMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [currentMovies, setCurrentMovies] = useState([]);
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

    // get current user data
    useEffect(() => {
        if (loggedIn) {
            mainApi
                .getUserInfo()
                .then((userData) => setCurrentUser(userData))
                .catch((error) => console.log(error));
        }
    }, [loggedIn]);

    // get saved movies
    useEffect(() => {
        if (loggedIn) {
            mainApi
                .getSavedMovies()
                .then((savedMovies) => setCurrentMovies(savedMovies))
                .catch((error) => console.log(error));
        }
    }, [loggedIn]);

    const removeResponseMessage = () => {
        setTimeout(() => setResponseMessage(""), MESSAGE_DISPLAY_TIME);
    };

    // tooltip
    const closeToolTip = () => {
        setIsOpenToolTip(false);
        setInfoToolTipMessage("");
    };

    const openToolTip = (message) => {
        setInfoToolTipMessage(message);
        setIsOpenToolTip(true);
    };

    // register
    const handleRegister = (userData) => {
        authApi
            .registerUser(userData)
            .then(() => {
                openToolTip(SUCCESSFUL_REGISTRATION_MESSAGE);
                setIsSuccess(true);
                delete userData.name;
                handleLogin(userData);
            })
            .catch((error) => {
                if (error === CONFLICT_ERROR_CODE) {
                    setResponseMessage(CONFLICT_ERROR_MESSAGE);
                } else setResponseMessage(SERVER_ERROR_MESSAGE);
                removeResponseMessage();
            });
    };

    // login
    const handleLogin = (userData) => {
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
                    setResponseMessage(AUTH_ERROR_MESSAGE);
                } else setResponseMessage(SERVER_ERROR_MESSAGE);
                removeResponseMessage();
            });
    };

    // logout
    const handleLogout = () => {
        authApi
            .logoutUser()
            .then(() => {
                localStorage.clear();
                setLoggedIn(false);
                setCurrentUser({});
                setCurrentMovies([]);
                navigate("/", { replace: true });
            })
            .catch(() => openToolTip(SERVER_ERROR_MESSAGE));
    };

    // update user
    const handleUpdateUser = (userData) => {
        mainApi
            .editUserInfo(userData)
            .then(() => {
                openToolTip(SUCCESSFUL_USER_UPDATED_MESSAGE);
                setIsSuccess(true);
            })
            .catch(() => {
                setResponseMessage(SERVER_ERROR_MESSAGE);
                removeResponseMessage();
            });
    };

    // ***************  MOVIES *******************************//
    // delete movie
    const handleDeleteMovie = (id) => {
        mainApi
            .deleteMovie(id)
            .then((result) => {
                if (result._id)
                    setCurrentMovies((prev) =>
                        prev.filter((item) => item._id !== id)
                    );
            })
            .catch((error) => {
                if (error === BAD_REQUEST_ERROR_CODE) {
                    openToolTip(MOVIE_NOT_DELETED_MESSAGE);
                    setIsSuccess(false);
                } else {
                    openToolTip(SERVER_ERROR_MESSAGE);
                    setIsSuccess(false);
                }
            });
    };

    // save movie
    const handleSaveMovie = (movie, buttonType, id) => {
        if (buttonType === "delete") {
            handleDeleteMovie(id);
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
                if (result._id) setCurrentMovies((prev) => [...prev, result]);
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
    };

    if (!isRender) return <Preloader />;

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CurrentSavedMoviesContext.Provider value={currentMovies}>
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
                                        onClickSaveMovie={handleSaveMovie}
                                        loggedIn={loggedIn}
                                    />
                                }
                            />
                            <Route
                                path="/saved-movies"
                                element={
                                    <SavedMovies
                                        onClickDeleteMovie={handleDeleteMovie}
                                        loggedIn={loggedIn}
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                        onLogout={handleLogout}
                                        loggedIn={loggedIn}
                                        onSubmitForm={handleUpdateUser}
                                        responseMessage={responseMessage}
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
                                        onLogin={handleLogin}
                                        responseMessage={responseMessage}
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
                                        onRegister={handleRegister}
                                        responseMessage={responseMessage}
                                    />
                                )
                            }
                        />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                    <InfoToolTip
                        isOpen={isOpenToolTip}
                        onClose={closeToolTip}
                        infoToolTipMessage={infoToolTipMessage}
                        isSuccess={isSucces}
                    />
                </div>
            </CurrentSavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
