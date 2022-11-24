import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setLoading } from "../redux-slices/user/userSlice";
import { useLocation } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu";
import Loading from "../common/Loading";

const UserProfile = () => {
	const dispatch = useDispatch();
	const { username, token } = useSelector((state) => state.auth);
	const { id, joinAt, loading } = useSelector((state) => state.user);
	const location = useLocation();

	useEffect(() => {
		if (!id && token) {
			dispatch(setLoading(true));
			dispatch(getUser({ username, token }));
		}
	}, [id, token]);

	return loading ? (
		<Loading />
	) : (
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
