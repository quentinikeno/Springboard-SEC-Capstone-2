import { useState, useEffect } from "react";
import axios from "axios";

const ProblemBox = ({ prob: { expression, operation, answer } }) => {
	const [formData, setFormData] = useState({ answer: "" });
	const [submittedAnswer, setSubmittedAnswer] = useState(null);
	const [correct, setCorrect] = useState(false);
	const [fact, setFact] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		+formData.answer === answer
			? setCorrect(() => true)
			: setSubmittedAnswer(() => +formData.answer);
	};

	useEffect(function fetchNumberFact() {
		async function fetchFact() {
			let { data } = await axios.get(
				`http://numbersapi.com/${answer}/trivia/`
			);
			if (
				data ===
				`${answer} is a number for which we're missing a fact (submit one to numbersapi at google mail!).`
			)
				data = "Correct!";
			setFact(() => data);
		}
		fetchFact();
	}, []);

	return (
		<div className="box">
			<h2 className="is-2">{operation}</h2>

			{correct && <p>{fact}</p>}

			{!correct && (
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
			)}
		</div>
	);
};

export default ProblemBox;
