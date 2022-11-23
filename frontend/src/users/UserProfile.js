import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux-slices/user/userSlice";

const UserProfile = () => {
	const dispatch = useDispatch();
	const { username, token } = useSelector((state) => state.auth);
	const { id, joinAt } = useSelector((state) => state.user);

	useEffect(() => {
		if (!id) {
			dispatch(getUser({ username, token }));
		}
	}, [id]);

	return (
		<div>
			<h1>{username}</h1>
			<p>Joined: {joinAt}</p>
		</div>
	);
};

export default UserProfile;
