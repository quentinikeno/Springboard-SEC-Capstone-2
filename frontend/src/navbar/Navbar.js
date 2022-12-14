import { selectCurrentUser } from "../redux-slices/user/userSlice";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux-slices/user/userSlice";
import useToggleState from "../hooks/useToggleState";
import Cookies from "js-cookie";
import "./Navbar.css";

const Navbar = () => {
	const currentUser = useSelector(selectCurrentUser);
	const [hamburger, setHamburger] = useToggleState(false);
	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(logOut());
		Cookies.remove("token");
		Cookies.remove("username");
	};

	const loginAndSignup = (
		<>
			<NavLink
				className="navbar-item has-background-light"
				to="/auth/login"
			>
				Login
			</NavLink>
			<NavLink
				className="navbar-item has-background-light"
				to="/auth/register"
			>
				Sign Up
			</NavLink>
		</>
	);
	const profileAndSignout = (
		<>
			<NavLink className="navbar-item has-background-light" to="/profile">
				{currentUser}'s Profile
			</NavLink>
			<Link
				className="navbar-item has-background-light"
				to="/"
				onClick={handleLogOut}
			>
				<button className="button is-link">Sign Out</button>
			</Link>
		</>
	);
	return (
		<nav
			className="navbar has-background-light mb-3"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-brand">
				<span className="navbar-item is-size-2 has-text-primary">
					Math Squared
				</span>
			</div>

			<a
				role="button"
				className={`navbar-burger ${hamburger ? "is-active" : ""}`}
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarTarget"
				onClick={setHamburger}
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>

			<div
				id="navbarTarget"
				className={`navbar-menu has-background-light ${
					hamburger ? "is-active" : ""
				}`}
			>
				<div className="navbar-start">
					<NavLink
						className="navbar-item has-background-light"
						to="/"
					>
						Home
					</NavLink>
				</div>
				<div className="navbar-end">
					{currentUser ? profileAndSignout : loginAndSignup}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
