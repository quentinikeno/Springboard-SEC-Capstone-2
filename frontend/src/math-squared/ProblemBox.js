import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormState from "../hooks/useFormState";
import useToggleState from "../hooks/useToggleState";
import {
	incrementLevel,
	decrementLevel,
	incrementIncorrectGuesses,
	incrementSolved,
	getNewProblem,
} from "../redux-slices/math-squared/mathSquaredSlice";

const ProblemBox = ({ operation, iconClass }) => {
	const dispatch = useDispatch();
	const initialState = { answer: "" };
	const [formData, setFormData, handleChange] = useFormState(initialState);
	const [submittedAnswer, setSubmittedAnswer] = useState(null);
	const [isVertical, toggleIsVertical] = useToggleState(true);
	const { problems } = useSelector((state) => state.mathSquared);
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
			dispatch(incrementSolved());
			dispatch(getNewProblem(operation));
		} else {
			dispatch(decrementLevel(operation));
			dispatch(incrementIncorrectGuesses());
			setSubmittedAnswer(() => +formData.answer);
		}
		setFormData(() => initialState);
	};

	return (
		<div className="column">
			<div className="box mb-4">
				<h2 className="is-2 has-text-centered mb-3">
					<i className={`fa-solid ${iconClass} fa-xl`}></i>
				</h2>

				<div className="field">
					<div className="label">
						<label className="label is-sr-only">
							Display vertical:
						</label>
					</div>
					<div className="field">
						<div className="control">
							<label className="checkbox">
								<input
									className="mr-3"
									type="checkbox"
									onClick={toggleIsVertical}
								/>
								Display problems vertically.
							</label>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="my-5">
					<div
						className={`field ${isVertical ? "is-horizontal" : ""}`}
					>
						<div className="field-label is-normal">
							<label
								htmlFor="answer"
								className="label has-text-right"
							>
								{isVertical ? (
									<>{expression} = </>
								) : (
									<>
										<div>{first}</div>
										<div>
											{operationSymbol} {second}
										</div>
										<hr className="has-background-grey-lighter" />
									</>
								)}
							</label>
						</div>
						<div
							className={`field-body mr-5 ${
								isVertical ? "" : "is-justify-content-end"
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
					<div className="control my-5">
						<button className="button is-success is-fullwidth">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProblemBox;
