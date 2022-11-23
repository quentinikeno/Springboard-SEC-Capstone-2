import { Link } from "react-router-dom";

const UserProfileMenu = ({ location, username }) => {
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
		</aside>
	);
};

export default UserProfileMenu;
