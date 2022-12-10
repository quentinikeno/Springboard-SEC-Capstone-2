import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import { updateUser } from "../redux-slices/user/userSlice";
import { useSelector } from "react-redux";

const EditPasswordForm = () => {
	const initialState = { oldPassword: "", newPassword: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { username, token } = useSelector((state) => state.user);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await dispatch(
				updateUser({ username, token, data: formData })
			).unwrap();
			navigate("/profile");
		} catch (error) {}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label htmlFor="oldPassword" className="label">
					Current Password
				</label>
				<div className="control">
					<input
						type="password"
						className="input"
						onChange={handleChange}
						id="oldPassword"
						name="oldPassword"
						value={formData.oldPassword}
						required
					/>
				</div>
			</div>
			<div className="field">
				<label htmlFor="newPassword" className="label">
					New Password
				</label>
				<div className="control">
					<input
						type="password"
						className="input"
						onChange={handleChange}
						id="newPassword"
						name="newPassword"
						value={formData.newPassword}
						required
					/>
				</div>
			</div>
			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-link">
						Change password
					</button>
				</div>
			</div>
		</form>
	);
};

export default EditPasswordForm;
