import LoginUserForm from "../users/auth/LoginUserForm";
import RegisterUserForm from "../users/auth/RegisterUserForm";
import { Routes, Route } from "react-router-dom";

const AuthRoutes = () => {
	return (
		<Routes>
			<Route path={"/register"} element={<RegisterUserForm />} />
			<Route path={"/login"} element={<LoginUserForm />} />
		</Routes>
	);
};

export default AuthRoutes;
