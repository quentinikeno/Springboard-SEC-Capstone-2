import ProblemBoxGame from "../ProblemBoxGame";
import LoginUserForm from "../users/LoginUserForm";
import RegisterUserForm from "../users/RegisterUserForm";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<ProblemBoxGame />} />
			<Route path={"/auth/register"} element={<RegisterUserForm />} />
			<Route path={"/auth/login"} element={<LoginUserForm />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
