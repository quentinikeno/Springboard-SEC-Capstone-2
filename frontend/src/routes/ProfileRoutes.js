import UserProfile from "../users/UserProfile";
import { Routes, Route } from "react-router-dom";

const ProfileRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<UserProfile />} />
		</Routes>
	);
};

export default ProfileRoutes;
