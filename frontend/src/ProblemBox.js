import { useState, useEffect } from "react";
import axios from "axios";

const ProblemBox = ({ problems, level, correct, setCorrect }) => {
	const [formData, setFormData] = useState({ answer: "" });
	const [submittedAnswer, setSubmittedAnswer] = useState(null);
	// const [fact, setFact] = useState(null);
	const { expression, answer, operation } = problems[level - 1] || {
		expression: null,
		answer: null,
		operation: null,
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (+formData.answer === answer) {
			setCorrect(() => true);
			setSubmittedAnswer(() => null);
		} else {
			setSubmittedAnswer(() => +formData.answer);
		}
	};

	// useEffect(
	// 	function fetchNumberFact() {
	// 		async function fetchFact() {
	// 			let { data } = await axios.get(
	// 				`http://numbersapi.com/${answer}/trivia/`
	// 			);
	// 			if (
	// 				data ===
	// 				`${answer} is a number for which we're missing a fact (submit one to numbersapi at google mail!).`
	// 			)
	// 				data = "Correct!";
	// 			setFact(() => data);
	// 		}
	// 		fetchFact();
	// 	},
	// 	[answer]
	// );
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
				{submittedAnswer && !correct && (
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
