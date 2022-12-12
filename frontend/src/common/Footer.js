import { Link } from "react-router-dom";
import { selectCurrentUser } from "../redux-slices/user/userSlice";
import { useSelector } from "react-redux";

const Footer = () => {
	const currentUser = useSelector(selectCurrentUser);

	const loginAndSignup = (
		<>
			<li className="list-item">
				<Link to="/auth/login">Login</Link>
			</li>
			<li className="list-item">
				<Link to="/auth/register">Sign Up</Link>
			</li>
		</>
	);

	const profile = (
		<li className="list-item">
			<Link to="/profile">{currentUser}'s Profile</Link>
		</li>
	);

	return (
		<footer className="footer mt-6 has-background-grey-lighter">
			<div className="container content mx-auto columns is-desktop">
				<div className="column ">
					<strong>Math Squared</strong>
				</div>
				<div className="column">
					<strong>Navigation</strong>
					<ul className="list">
						<li className="list-item">
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/game">Practice Math</Link>
						</li>
					</ul>
				</div>
				<div className="column">
					<strong>Account</strong>
					<ul className="list">
						{currentUser ? profile : loginAndSignup}
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
