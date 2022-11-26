import UserProfile from "../users/UserProfile";
import { Routes, Route } from "react-router-dom";
import UserDetail from "../users/UserDetail";
import EditUsernameForm from "../users/EditUsernameForm";

const ProfileRoutes = () => {
	return (
		<Routes>
			<Route
				path={"/"}
				element={<UserProfile child={<UserDetail />} />}
			/>
			<Route
				path={"/edit/username"}
				element={<UserProfile child={<EditUsernameForm />} />}
			/>
		</Routes>
	);
};

export default ProfileRoutes;
