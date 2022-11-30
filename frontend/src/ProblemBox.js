import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormState from "./hooks/useFormState";
import useToggleState from "./hooks/useToggleState";
import { incrementLevel } from "./redux-slices/problemBoxes/problemBoxesSlice";

const ProblemBox = ({ operation }) => {
	const dispatch = useDispatch();
	const initialState = { answer: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const [submittedAnswer, setSubmittedAnswer] = useState(null);
	const [isHorizontal, toggleIsHorizontal] = useToggleState(true);
	const { problems } = useSelector((state) => state.problemBoxes);
	const {
		expression,
		first,
		second,
		operation: operationSymbol,
		answer,
	} = problems[operation];

	const handleSubmit = (event) => {
		event.preventDefault();
		if (+formData.answer === answer) {
			setSubmittedAnswer(() => null);
			dispatch(incrementLevel(operation));
		} else {
			setSubmittedAnswer(() => +formData.answer);
		}
		setFormData(() => initialState);
	};

	return (
		<div className="column">
			<div className=" box mb-4">
				<h2 className="is-2">{operation}</h2>

				<div className="field">
					<div className="label">
						<label className="label">Display:</label>
					</div>
					<div className="field">
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
