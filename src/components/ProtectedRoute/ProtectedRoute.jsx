import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ loggedIn }) {
    return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
