import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Page404 from "../Page404/Page404";

function App() {
    return (
        <div className="page">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/saved-movies" element={<SavedMovies />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default App;
