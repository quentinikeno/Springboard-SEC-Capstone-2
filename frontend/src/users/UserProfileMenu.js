import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux-slices/user/userSlice";
import UserProfileMenuLink from "./UserProfileMenuLink";

const UserProfileMenu = () => {
	const username = useSelector(selectCurrentUser);

	return (
		<aside className="menu">
			<p className="menu-label">Your Profile</p>
			<ul className="menu-list">
				<UserProfileMenuLink to={"/profile"} text={username} />
			</ul>
			<p className="menu-label">Edit Your Info</p>
			<ul className="menu-list">
				<UserProfileMenuLink
					to={"/profile/edit/username"}
					text={"Username"}
				/>
				<UserProfileMenuLink
					to={"/profile/edit/email"}
					text={"Email"}
				/>
				<UserProfileMenuLink
					to={"/profile/edit/password"}
					text={"Password"}
				/>
			</ul>
			<p className="menu-label">Delete Your Account</p>
			<ul className="menu-list">
				<UserProfileMenuLink to={"/profile/delete"} text={"Delete"} />
			</ul>
		</aside>
	);
};

export default UserProfileMenu;
