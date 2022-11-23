import ProblemBoxGame from "../ProblemBoxGame";
import AuthRoutes from "./AuthRoutes";
import UserProfile from "../users/UserProfile";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<ProblemBoxGame />} />
			<Route path={"/auth/*"} element={<AuthRoutes />} />
			<Route path={"/profile"} element={<UserProfile />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
