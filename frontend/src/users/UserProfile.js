import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux-slices/user/userSlice";
import { Link } from "react-router-dom";

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
		<div className="columns is-desktop">
			<div className="column">
				<aside className="menu">
					<p className="menu-label">Your Profile</p>
					<ul className="menu-list">
						<li>
							<Link className="is-active" to="/profile">
								{username}
							</Link>
						</li>
					</ul>
				</aside>
			</div>
			<div className="column is-three-quarters">
				<h1>{username}</h1>
				<p>Joined: {joinAt}</p>
			</div>
		</div>
	);
};

export default UserProfile;
