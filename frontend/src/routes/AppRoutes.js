import ProblemBoxGame from "../math-squared/ProblemBoxGame";
import AuthRoutes from "./AuthRoutes";
import ProfileRoutes from "./ProfileRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../home/Home";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<Home />} />
			<Route path={"/game"} element={<ProblemBoxGame />} />
			<Route path={"/auth/*"} element={<AuthRoutes />} />
			<Route element={<PrivateRoutes />}>
				<Route path={"/profile/*"} element={<ProfileRoutes />} />
			</Route>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
