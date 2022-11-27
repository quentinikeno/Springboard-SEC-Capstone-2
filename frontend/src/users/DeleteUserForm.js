import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import { deleteUser } from "../redux-slices/user/userSlice";
import { useSelector } from "react-redux";

const DeleteUserForm = () => {
	const initialState = { password: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { username, token } = useSelector((state) => state.user);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(deleteUser({ username, token, data: formData }));
		navigate("/");
	};
	return (
		<>
			<h2>
				Please provide your password and click the button below to
				delete your account.
			</h2>
			<form onSubmit={handleSubmit}>
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
						<button type="submit" className="button is-danger">
							Delete account
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default DeleteUserForm;
