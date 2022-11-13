import { useState } from "react";

const ProblemBox = ({ prob: { expression, operation, answer } }) => {
	const [formData, setFormData] = useState({ answer: null });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	return (
		<div className="box">
			<h2 className="is-2">{operation}</h2>

			<form className="my-5">
				<div className="field is-horizontal">
					<div className="field-label is-normal">
						<label htmlFor="answer" className="label">
							{expression} =
						</label>
					</div>
					<div className="field-body">
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
					</div>
				</div>
				<div className="control my-3">
					<button className="button is-primary">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default ProblemBox;
