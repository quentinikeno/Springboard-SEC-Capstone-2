import { useState } from "react";
import useFormState from "./hooks/useFormState";
import useToggleState from "./hooks/useToggleState";

const ProblemBox = ({ problems, level, setLevel, operation }) => {
	const initialState = { answer: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const [submittedAnswer, setSubmittedAnswer] = useState(null);
	const [isHorizontal, toggleIsHorizontal] = useToggleState(true);
	const {
		first,
		second,
		expression,
		answer,
		operation: operationSymbol,
	} = problems[level[operation] - 1] || {
		first: null,
		second: null,
		expression: null,
		answer: null,
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
		return (
			<div className="column box">
				You've completed all of the problems.
			</div>
		);
	}

	return (
		<div className="column">
			<div className=" box mb-4">
				<h2 className="is-2">{operation}</h2>

				<div class="field">
					<div class="label">
						<label className="label">Display:</label>
					</div>
					<div class="field">
						<div className="control">
							<label className="checkbox">
								<input
									className="mr-3"
									type="checkbox"
									onClick={() => {
										toggleIsHorizontal();
									}}
								/>
								Display problems horizontally.
							</label>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="my-5">
					<div
						className={`field ${
							isHorizontal ? "is-horizontal" : ""
						}`}
					>
						<div className="field-label is-normal">
							<label htmlFor="answer" className="label">
								{isHorizontal ? (
									<>{expression} = </>
								) : (
									<>
										<div>{first}</div>
										<div>
											{operationSymbol} {second}
										</div>
										<hr />
									</>
								)}
							</label>
						</div>
						<div
							className={`field-body ${
								isHorizontal ? "" : "is-justify-content-end"
							}`}
						>
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
		</div>
	);
};

export default ProblemBox;
