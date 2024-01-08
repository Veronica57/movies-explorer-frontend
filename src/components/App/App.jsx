import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { IsLoggedInContext } from "../../contexts/IsLoggedInContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// movie api
import { getMovies } from "../../utils/MoviesApi";
// main api
import {
    getCurrentUser,
    getSavedMovies,
    login,
    logout,
    register,
    deleteMovie,
    saveMovie,
    updateProfile,
} from "../../utils/MainApi";
import {
    filterSavedMovies,
    filterShortMovies,
    getFilteredMovies,
} from "../../utils/utils";
import { messages } from "../../utils/constants";
// components
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Page404 from "../Page404/Page404";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Notification from "../Notification/Notification";

function App() {
    const [initialMovies, setInitialMovies] = useState([]);
    const [findedMovies, setFindedMovies] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [shortFilms, setShortFilms] = useState([]);
    const [shortSavedFilms, setShortSavedFilms] = useState([]);
    const [valueInputMovie, setValueInputMovie] = useState("");
    const [valueInputSavedMovie, setValueInputSavedMovie] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isSavedMoviesChecked, setIsSavedMoviesChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [message, setMessage] = useState("");
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
    const [isSavedMoviesNotFound, setIsSavedMoviesNotFound] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("savedData"));
        if (localStorageData) {
            const { movies, initialMovies, text, checkbox } = localStorageData;
            setFindedMovies(movies);
            setInitialMovies(initialMovies);
            setValueInputMovie(text);
            setIsChecked(checkbox);
            setShortFilms(filterShortMovies(movies));
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, [loggedIn]);

    async function checkToken() {
        const path = location.pathname;
        try {
            const token = localStorage.getItem("jwt");

            if (token) {
                const profileData = await getCurrentUser();
                setCurrentUser(profileData.data);
                setLoggedIn(true);
                if (path !== "/signin") {
                    navigate(path);
                }
                const savedMovies = await getSavedMovies();
                updateSavedMovies(savedMovies.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function updateSavedMovies(savedMovies) {
        try {
            setSavedMovies(savedMovies);
            setShortSavedFilms(filterShortMovies(savedMovies));
        } catch (err) {
            console.error(err);
        }
    }

    // *** USERS *** //
    // user registration
    async function handleSubmitRegistration(e, name, email, password) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(name, email, password, setMessage);
            await handleSubmitLogin(e, email, password);
            setMessage(messages.SUCCESS_REGISTRATION);
            setNotificationIsOpen(true);
        } catch (err) {
            console.error(err);
            setNotificationIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    // user login
    async function handleSubmitLogin(e, email, password) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password, setMessage);
            setLoggedIn(true);
            navigate("/movies", { replace: true });
            setMessage(messages.SUCCESS_LOGIN);
            setNotificationIsOpen(true);
        } catch (err) {
            console.error(err);
            setNotificationIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    // user logout
    async function handleLogout() {
        try {
            await logout();
            setLoggedIn(false);
            localStorage.clear();
            setFindedMovies([]);
            setValueInputMovie("");
            setIsChecked(false);
            setMessage(messages.LOGOUT_SUCCESS);
            setNotificationIsOpen(true);
        } catch (err) {
            console.error(err);
            setMessage(messages.SERVER_ERROR);
            setNotificationIsOpen(true);
        }
    }

    // update user
    async function handleUpdateUser(user) {
        setIsLoading(true);
        try {
            const updated = await updateProfile(user, setMessage);
            setCurrentUser(updated.data);
            setMessage(messages.UPDATE_PROFILE);
            setNotificationIsOpen(true);
        } catch (err) {
            console.error(err);
            setNotificationIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    //*** MOVIES ***//
    // like movie
    async function handleLikeMovie(e, dataMovie) {
        try {
            if (e.target.checked) {
                saveFilm(dataMovie);
            } else {
                removeFilm(dataMovie.movieId);
            }
        } catch (err) {
            console.error(err);
        }
    }

    // add movie to saved movies
    async function saveFilm(dataMovie) {
        try {
            await saveMovie(dataMovie);
            const savedMovies = await getSavedMovies();
            updateSavedMovies(savedMovies.data);
            setMessage(messages.ADD_MOVIE);
            setNotificationIsOpen(true);
        } catch (err) {
            console.error(err);
            setMessage(messages.SERVER_ERROR);
            setNotificationIsOpen(true);
        }
    }

    // delete movie from saved movies
    async function removeFilm(movieId) {
        try {
            const film = savedMovies.find((movie) => movie.movieId === movieId);
            await deleteMovie(film._id);
            const newCards = filterSavedMovies(savedMovies, film._id);
            updateSavedMovies(newCards);
            setMessage(messages.REMOVE_MOVIE);
            setNotificationIsOpen(true);
        } catch (err) {
            console.error(err);
            setMessage(messages.SERVER_ERROR);
            setNotificationIsOpen(true);
        }
    }

    // delete movie from saved movies
    async function handleRemoveButton(cardID) {
        try {
            await deleteMovie(cardID);
            const newCards = filterSavedMovies(savedMovies, cardID);
            updateSavedMovies(newCards);
            setMessage(messages.REMOVE_MOVIE);
            setNotificationIsOpen(true);
        } catch (err) {
            console.error(err);
            setMessage(messages.SERVER_ERROR);
            setNotificationIsOpen(true);
        }
    }

    // checking movies
    function checkIsMoviesNotFound(filteredMovies) {
        filteredMovies.length === 0
            ? setIsMoviesNotFound(true)
            : setIsMoviesNotFound(false);
    }

    // checking saved movies
    function checkIsSavedMoviesNotFound(filteredSavedMovies) {
        filteredSavedMovies.length === 0
            ? setIsSavedMoviesNotFound(true)
            : setIsSavedMoviesNotFound(false);
    }

    // checkboxes
    function handleCheckbox(e) {
        try {
            if (initialMovies.length !== 0) {
                setIsChecked(e.target.checked);
                const filteredMovies = getFilteredMovies(
                    initialMovies,
                    valueInputMovie
                );
                updateAndSaveMovies(e.target.checked, filteredMovies);
            }
        } catch (err) {
            console.error(err);
            setMessage(messages.SERVER_ERROR);
            setNotificationIsOpen(true);
        }
    }

    function handleSavedMoviesCheckbox(e) {
        try {
            setIsSavedMoviesChecked(e.target.checked);
            updateFilteredSavedMovies();
        } catch (err) {
            console.error(err);
            setMessage(messages.SERVER_ERROR);
            setNotificationIsOpen(true);
        }
    }

    // saved movies adding
    async function handleSubmitSearchMovies(e, valueCheckbox) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (valueInputMovie.length === 0) {
                throw new Error(messages.KEY_WORD);
            }
            if (initialMovies.length === 0) {
                const arrayMovies = await getMovies();
                setInitialMovies(arrayMovies);
                const filteredMovies = getFilteredMovies(
                    arrayMovies,
                    valueInputMovie
                );
                updateAndSaveMovies(valueCheckbox, filteredMovies);
            } else {
                const filteredMovies = getFilteredMovies(
                    initialMovies,
                    valueInputMovie
                );
                updateAndSaveMovies(valueCheckbox, filteredMovies);
            }
        } catch (err) {
            if (err.message === messages.KEY_WORD) {
                setMessage(messages.KEY_WORD);
                setNotificationIsOpen(true);
            } else {
                setMessage(messages.SERVER_ERROR);
                setNotificationIsOpen(true);
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    // update and add movies to saved movies
    function updateAndSaveMovies(checkbox, movies) {
        setShortFilms(filterShortMovies(movies));
        checkIsMoviesNotFound(movies);
        setFindedMovies(movies);

        localStorage.setItem(
            "savedData",
            JSON.stringify({
                checkbox: checkbox,
                text: valueInputMovie,
                movies: movies,
                initialMovies: initialMovies,
            })
        );
    }

    // search saved movies
    function handleSubmitSearchSavedMovies(e) {
        e.preventDefault();

        try {
            updateFilteredSavedMovies();
        } catch (err) {
            console.error(err);
        }
    }

    // update saved movies
    function updateFilteredSavedMovies() {
        try {
            const filteredSavedMovies = getFilteredMovies(
                savedMovies,
                valueInputSavedMovie
            );
            setFilteredSavedMovies(filteredSavedMovies);
            setShortSavedFilms(filterShortMovies(filteredSavedMovies));
            checkIsSavedMoviesNotFound(filteredSavedMovies);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <IsLoggedInContext.Provider value={loggedIn}>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route
                            path="/movies"
                            element={
                                <ProtectedRoute
                                    element={Movies}
                                    loggedIn={loggedIn}
                                    movies={findedMovies}
                                    setValueInputMovie={setValueInputMovie}
                                    valueInputMovie={valueInputMovie}
                                    handleSubmit={handleSubmitSearchMovies}
                                    isLoading={isLoading}
                                    handleCheckbox={handleCheckbox}
                                    isChecked={isChecked}
                                    shortFilms={shortFilms}
                                    isMoviesNotFound={isMoviesNotFound}
                                    handleLikeMovie={handleLikeMovie}
                                    savedMovies={savedMovies}
                                />
                            }
                        />
                        <Route
                            path="/saved-movies"
                            element={
                                <ProtectedRoute
                                    element={SavedMovies}
                                    loggedIn={loggedIn}
                                    savedMovies={savedMovies}
                                    filteredSavedMovies={filteredSavedMovies}
                                    handleRemoveButton={handleRemoveButton}
                                    handleSavedMoviesCheckbox={
                                        handleSavedMoviesCheckbox
                                    }
                                    isSavedMoviesChecked={isSavedMoviesChecked}
                                    shortSavedFilms={shortSavedFilms}
                                    setValueInputSavedMovie={
                                        setValueInputSavedMovie
                                    }
                                    valueInputSavedMovie={valueInputSavedMovie}
                                    handleSubmitSearchSavedMovies={
                                        handleSubmitSearchSavedMovies
                                    }
                                    setIsSavedMoviesChecked={
                                        setIsSavedMoviesChecked
                                    }
                                    setFilteredSavedMovies={
                                        setFilteredSavedMovies
                                    }
                                    isSavedMoviesNotFound={
                                        isSavedMoviesNotFound
                                    }
                                    setIsSavedMoviesNotFound={
                                        setIsSavedMoviesNotFound
                                    }
                                />
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute
                                    element={Profile}
                                    loggedIn={loggedIn}
                                    handleUpdateUser={handleUpdateUser}
                                    handleLogout={handleLogout}
                                    isLoading={isLoading}
                                />
                            }
                        />
                        <Route
                            path="/signin"
                            element={
                                <Login
                                    handleSubmitLogin={handleSubmitLogin}
                                    isLoading={isLoading}
                                />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <Register
                                    handleSubmitRegistration={
                                        handleSubmitRegistration
                                    }
                                    isLoading={isLoading}
                                />
                            }
                        />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                    <Notification
                        notificationIsOpen={notificationIsOpen}
                        setNotificationIsOpen={setNotificationIsOpen}
                        message={message}
                    />
                </div>
            </IsLoggedInContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
