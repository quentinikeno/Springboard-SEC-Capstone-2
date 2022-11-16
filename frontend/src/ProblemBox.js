import { useState } from "react";

const ProblemBox = ({ problems, level, setLevel, operation, previousBox }) => {
	const initialState = { answer: "" };
	const [formData, setFormData] = useState(initialState);
	const [submittedAnswer, setSubmittedAnswer] = useState(null);
	const { expression, answer } = problems[level[operation] - 1] || {
		expression: null,
		answer: null,
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (+formData.answer === answer) {
			setSubmittedAnswer(() => null);
			setLevel((level) => {
				const updatedLevel = { ...level };
				updatedLevel[operation] = updatedLevel[operation] + 1;
				return updatedLevel;
			});
		} else {
			setSubmittedAnswer(() => +formData.answer);
		}
		setFormData(() => initialState);
	};

	if (expression === null) {
		return <div className="box">You've completed all of the problems.</div>;
	}

	return (
		<div className="box">
			<h2 className="is-2">{operation}</h2>

			<form onSubmit={handleSubmit} className="my-5">
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
				{submittedAnswer && (
					<p className="help is-danger">
						{submittedAnswer} is incorrect. Please try again.
					</p>
				)}
				<div className="control my-3">
					<button className="button is-primary">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default ProblemBox;
