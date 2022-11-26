import UserProfile from "../users/UserProfile";
import { Routes, Route } from "react-router-dom";
import UserDetail from "../users/UserDetail";

const ProfileRoutes = () => {
	return (
		<Routes>
			<Route
				path={"/"}
				element={<UserProfile child={<UserDetail />} />}
			/>
		</Routes>
	);
};

export default ProfileRoutes;
