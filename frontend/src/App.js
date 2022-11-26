import AppRoutes from "./routes/AppRoutes";
import Navbar from "./navbar/Navbar";
import Loading from "./common/Loading";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setLoading } from "./redux-slices/user/userSlice";
import Cookies from "js-cookie";
import "./App.css";

function App() {
	const { token, username, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			const attr = { expires: 30, secure: true };
			Cookies.set("token", token, attr);
		}
	}, [token]);

	useEffect(() => {
		if (username) {
			const attr = { expires: 30, secure: true };
			Cookies.set("username", username, attr);
		}
	}, [username]);

	useEffect(() => {
		const token = Cookies.get("token");
		const username = Cookies.get("username");
		if (token && username) {
			dispatch(getUser({ token, username }));
		}
	}, []);

	return (
		<div className="App container">
			{loading ? (
				<Loading />
			) : (
				<>
					<Navbar />
					<AppRoutes />
				</>
			)}
		</div>
	);
}

export default App;
