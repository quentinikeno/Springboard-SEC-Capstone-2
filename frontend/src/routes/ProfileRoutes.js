import UserProfile from "../users/UserProfile";
import { Routes, Route } from "react-router-dom";
import UserDetail from "../users/UserDetail";
import EditUsernameForm from "../users/EditUsernameForm";
import EditEmailForm from "../users/EditEmailForm";

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
			<Route
				path={"/edit/email"}
				element={<UserProfile child={<EditEmailForm />} />}
			/>
		</Routes>
	);
};

export default ProfileRoutes;
