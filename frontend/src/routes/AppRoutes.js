import ProblemBoxGame from "../ProblemBoxGame";
import RegisterUserForm from "../users/RegisterUserForm";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<ProblemBoxGame />} />
			<Route path={"/auth/login"} element={<RegisterUserForm />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
