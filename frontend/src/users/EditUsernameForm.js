import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import { updateUser } from "../redux-slices/user/userSlice";
import { useSelector } from "react-redux";

const EditUsernameForm = () => {
	const initialState = { username: "" };
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
		<div className="columns is-desktop">
			<form
				onSubmit={handleSubmit}
				className="column is-half box mt-5 mx-auto"
			>
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
		</div>
	);
};

export default EditUsernameForm;
