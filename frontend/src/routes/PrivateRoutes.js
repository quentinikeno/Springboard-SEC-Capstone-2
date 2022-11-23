import { Outlet, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../redux-slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const PrivateRoutes = () => {
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	return currentUser ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
