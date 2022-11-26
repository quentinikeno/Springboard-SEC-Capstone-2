import { useSelector } from "react-redux";

const UserDetail = () => {
	const { username, id, joinAt } = useSelector((state) => state.user);
	return (
		<>
			<h1>{username}</h1>
			<p>Joined: {joinAt}</p>
		</>
	);
};

export default UserDetail;
