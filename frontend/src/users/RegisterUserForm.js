import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import { registerUser } from "../features/auth/authSlice";

const RegisterUserForm = () => {
	const initialState = { username: "", password: "", email: "" };
	const [formData, handleChange] = useFormState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(registerUser(formData));
		navigate("/");
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label htmlFor="username" className="label">
					Username
				</label>
				<div className="control">
					<input
						type="text"
						className="input"
						onchange={handleChange}
						id="username"
						name="username"
						value={formData.username}
						required
					/>
				</div>
			</div>
			<div className="field">
				<label htmlFor="password" className="label">
					Password
				</label>
				<div className="control">
					<input
						type="text"
						className="input"
						onchange={handleChange}
						id="password"
						name="password"
						value={formData.username}
						required
					/>
				</div>
			</div>
			<div className="field">
				<label htmlFor="email" className="label">
					Email
				</label>
				<div className="control">
					<input
						type="email"
						className="input"
						onchange={handleChange}
						id="email"
						name="email"
						value={formData.username}
						required
					/>
				</div>
			</div>
			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-link">
						Save
					</button>
				</div>
				<div className="control">
					<Link to="/" className="button is-link is-light">
						Cancel
					</Link>
				</div>
			</div>
		</form>
	);
};

export default RegisterUserForm;
