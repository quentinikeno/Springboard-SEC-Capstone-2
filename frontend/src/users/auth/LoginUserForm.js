import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../../hooks/useFormState";
import { loginUser } from "../../features/auth/authSlice";

const LoginUserForm = () => {
	const initialState = { username: "", password: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(loginUser(formData));
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
						onChange={handleChange}
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
						type="password"
						className="input"
						onChange={handleChange}
						id="password"
						name="password"
						value={formData.password}
						required
					/>
				</div>
			</div>

			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-link">
						Login
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

export default LoginUserForm;
