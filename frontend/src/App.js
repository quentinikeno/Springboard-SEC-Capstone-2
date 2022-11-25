import AppRoutes from "./routes/AppRoutes";
import Navbar from "./navbar/Navbar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "./redux-slices/auth/authSlice";
import Cookies from "js-cookie";
import "./App.css";

function App() {
	const { token, username } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token && username) {
			const attr = { expires: 30, secure: true };
			Cookies.set("token", token, attr);
			Cookies.set("username", username, attr);
		}
	}, [token]);

	useEffect(() => {
		const token = Cookies.get("token");
		const username = Cookies.get("username");
		if (token && username) {
			dispatch(setCredentials({ token, username }));
		}
	}, []);

	return (
		<div className="App container">
			<Navbar />
			<AppRoutes />
		</div>
	);
}

export default App;
