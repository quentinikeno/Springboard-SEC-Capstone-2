import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux-slices/user/userSlice";

const UserProfileMenu = () => {
	const location = useLocation();
	const username = useSelector(selectCurrentUser);
	return (
		<aside className="menu">
			<p className="menu-label">Your Profile</p>
			<ul className="menu-list">
				<li>
					<Link
						className={`${
							location.pathname === "/profile" ? "is-active" : ""
						}`}
						to="/profile"
					>
						{username}
					</Link>
				</li>
			</ul>
			<p className="menu-label">Edit Your Info</p>
			<ul className="menu-list">
				<li>
					<Link
						className={`${
							location.pathname === "/profile/edit/username"
								? "is-active"
								: ""
						}`}
						to="/profile/edit/username"
					>
						Username
					</Link>
				</li>
				<li>
					<Link
						className={`${
							location.pathname === "/profile/edit/email"
								? "is-active"
								: ""
						}`}
						to="/profile/edit/email"
					>
						Email
					</Link>
				</li>
			</ul>
		</aside>
	);
};

export default UserProfileMenu;
