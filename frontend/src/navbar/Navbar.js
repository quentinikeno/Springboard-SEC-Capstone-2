import { selectCurrentUser } from "../redux-slices/auth/authSlice";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux-slices/auth/authSlice";

const Navbar = () => {
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(logOut());
	};

	const loginAndSignup = (
		<>
			<NavLink className="navbar-item" to="/auth/login">
				Login
			</NavLink>
			<NavLink className="navbar-item" to="/auth/register">
				Sign Up
			</NavLink>
		</>
	);
	const profileAndSignout = (
		<>
			<NavLink className="navbar-item" to="/profile">
				{currentUser}'s Profile
			</NavLink>
			<Link className="navbar-item" to="/" onClick={handleLogOut}>
				Sign Out
			</Link>
		</>
	);
	return (
		<nav
			className="navbar my-3"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-start">
				<div className="navbar-brand">
					<span className="navbar-item is-size-2 has-text-primary">
						Math Games
					</span>
				</div>
				<NavLink className="navbar-item" to="/">
					Home
				</NavLink>
			</div>

			<div className="navbar-end">
				{currentUser ? profileAndSignout : loginAndSignup}
			</div>
		</nav>
	);
};

export default Navbar;
