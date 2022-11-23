import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux-slices/user/userSlice";
import { useLocation } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu";

const UserProfile = () => {
	const dispatch = useDispatch();
	const { username, token } = useSelector((state) => state.auth);
	const { id, joinAt } = useSelector((state) => state.user);
	const location = useLocation();

	useEffect(() => {
		if (!id) {
			dispatch(getUser({ username, token }));
		}
	}, [id]);

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
