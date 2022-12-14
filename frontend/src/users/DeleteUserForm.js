import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import { deleteUser } from "../redux-slices/user/userSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const DeleteUserForm = () => {
	const initialState = { password: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { username, token } = useSelector((state) => state.user);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await dispatch(
				deleteUser({ username, token, data: formData })
			).unwrap();
			Cookies.remove("token");
			Cookies.remove("username");
			navigate("/");
		} catch (error) {}
	};
	return (
		<>
			<h2 className="is-size-4 has-text-centered">
				Please provide your password and click the button below to
				delete your account.
			</h2>
			<div className="columns is-desktop mb-6">
				<form
					onSubmit={handleSubmit}
					className="column box is-half mx-auto mt-5"
				>
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
			</div>
		</>
	);
};

export default DeleteUserForm;
