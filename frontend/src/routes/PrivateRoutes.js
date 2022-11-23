import { Outlet, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../redux-slices/auth/authSlice";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
	const currentUser = useSelector(selectCurrentUser);
	return currentUser ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
