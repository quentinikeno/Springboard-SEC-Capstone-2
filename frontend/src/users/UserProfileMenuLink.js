import { Link, useLocation } from "react-router-dom";

const UserProfileMenuLink = ({ to, text }) => {
	const location = useLocation();
	return (
		<li>
			<Link
				className={`${location.pathname === { to } ? "is-active" : ""}`}
				to={to}
			>
				{text}
			</Link>
		</li>
	);
};

export default UserProfileMenuLink;
