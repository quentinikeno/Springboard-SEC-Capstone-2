import { Outlet, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../redux-slices/user/userSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
	const currentUser = useSelector(selectCurrentUser);
	const username = Cookies.get("username");
	return currentUser || username ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
