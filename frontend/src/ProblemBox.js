import { useState } from "react";

const ProblemBox = ({ prob: { expression, answer } }) => {
	const [formData, setFormData] = useState({ answer: null });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	return (
		<div className="box">
			<p>{expression}</p>

			<form className="my-5">
				<div className="field">
					<label htmlFor="answer" className="label">
						Label
					</label>
					<div className="control">
						<input
							className="input"
							type="number"
							onChange={handleChange}
							value={formData.answer}
							id="answer"
							name="answer"
							required
						/>
					</div>
					<div className="control my-3">
						<button className="button is-primary">Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProblemBox;
