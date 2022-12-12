import AppRoutes from "./routes/AppRoutes";
import Navbar from "./navbar/Navbar";
import Loading from "./common/Loading";
import Footer from "./common/Footer";
import FlashMessages from "./flash-messages/FlashMessages";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setCredentials } from "./redux-slices/user/userSlice";
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
			dispatch(setCredentials({ token }));
		}
	}, []);

	return (
		<div className="App">
			<div className="container">
				{loading ? (
					<Loading />
				) : (
					<>
						<Navbar />
						<FlashMessages />
						<AppRoutes />
					</>
				)}
			</div>
			<Footer />
		</div>
	);
}

export default App;
