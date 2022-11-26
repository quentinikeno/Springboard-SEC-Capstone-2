import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu";

const UserProfile = () => {
	const { username, id, joinAt } = useSelector((state) => state.user);
	const location = useLocation();

	return (
		<div className="columns is-desktop">
			<div className="column">
				<UserProfileMenu location={location} username={username} />
			</div>
			<div className="column is-three-quarters">
				<h1>{username}</h1>
				<p>Joined: {joinAt}</p>
			</div>
		</div>
	);
};
export default UserProfile;
