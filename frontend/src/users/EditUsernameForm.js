import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import { updateUser } from "../redux-slices/user/userSlice";

const EditUsernameForm = () => {
	const initialState = { username: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(updateUser(formData));
		navigate("/profile");
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label htmlFor="username" className="label">
					New Username
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
			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-link">
						Change Username
					</button>
				</div>
			</div>
		</form>
	);
};

export default EditUsernameForm;
