import UserProfile from "../users/UserProfile";
import { Routes, Route, Navigate } from "react-router-dom";
import UserDetail from "../users/UserDetail";
import EditUsernameForm from "../users/EditUsernameForm";
import EditEmailForm from "../users/EditEmailForm";
import EditPasswordForm from "../users/EditPasswordForm";
import DeleteUserForm from "../users/DeleteUserForm";

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
			<Route
				path={"/edit/password"}
				element={<UserProfile child={<EditPasswordForm />} />}
			/>
			<Route
				path={"/delete"}
				element={<UserProfile child={<DeleteUserForm />} />}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default ProfileRoutes;
