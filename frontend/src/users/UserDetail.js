import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHighScore } from "../redux-slices/math-squared/mathSquaredSlice";
import "./UserDetail.css";

const UserDetail = () => {
	const { username, joinAt, token } = useSelector((state) => state.user);
	const { highScore } = useSelector((state) => state.mathSquared);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!highScore) {
			dispatch(getHighScore({ gameId: 1, token }));
		}
	}, [highScore]);

	return (
		<div className="has-text-centered box">
			<div className="icon icon-circle " id="user-icon-div">
				<i className="fa-solid fa-user fa-2xl"></i>
			</div>
			<h1 className="title my-5">{username}</h1>
			<p className="subtitle mb-5">
				<span className="icon">
					<i className="fa-solid fa-calendar"></i>
				</span>{" "}
				Joined: {joinAt}
			</p>
			<div className="icon icon-circle ">
				<i className="fa-solid fa-trophy fa-2xl"></i>
			</div>
			<h2 className="is-size-5 my-3">All Time High Score:</h2>
			<p>{highScore}</p>
		</div>
	);
};

export default UserDetail;
