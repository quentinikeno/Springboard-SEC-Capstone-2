import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import { updateUser } from "../redux-slices/user/userSlice";
import { useSelector } from "react-redux";

const EditEmailForm = () => {
	const initialState = { email: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { username, token } = useSelector((state) => state.user);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			dispatch(updateUser({ username, token, data: formData })).unwrap();
			navigate("/profile");
		} catch (error) {}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label htmlFor="email" className="label">
					New Email
				</label>
				<div className="control">
					<input
						type="text"
						className="input"
						onChange={handleChange}
						id="email"
						name="email"
						value={formData.email}
						required
					/>
				</div>
			</div>
			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-link">
						Change email
					</button>
				</div>
			</div>
		</form>
	);
};

export default EditEmailForm;
