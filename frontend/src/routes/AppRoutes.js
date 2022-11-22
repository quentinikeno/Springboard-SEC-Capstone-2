import ProblemBoxGame from "../ProblemBoxGame";
import LoginUserForm from "../users/auth/LoginUserForm";
import RegisterUserForm from "../users/auth/RegisterUserForm";
import UserProfile from "../users/UserProfile";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<ProblemBoxGame />} />
			<Route path={"/auth/register"} element={<RegisterUserForm />} />
			<Route path={"/auth/login"} element={<LoginUserForm />} />
			<Route path={"/profile"} element={<UserProfile />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
