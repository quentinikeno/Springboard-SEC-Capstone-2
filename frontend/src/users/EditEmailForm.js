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
			await dispatch(
				updateUser({ username, token, data: formData })
			).unwrap();
			navigate("/profile");
		} catch (error) {}
	};
	return (
		<div className="columns is-desktop mb-6">
			<form
				onSubmit={handleSubmit}
				className="column box is-half mx-auto mt-5"
			>
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
		</div>
	);
};

export default EditEmailForm;
