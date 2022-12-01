import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProblemBoxes from "./ProblemBoxes";
import {
	decrementSeconds,
	reset,
} from "../redux-slices/math-squared/mathSquaredSlice";
import { convertToMinutesSeconds } from "../helpers/convertToMinutesSeconds";

const ProblemBoxGame = () => {
	const timerId = useRef();
	const { seconds, solved, incorrectGuesses } = useSelector(
		(state) => state.problemBoxes
	);
	const dispatch = useDispatch();

	const resetGame = () => {
		dispatch(reset());
	};

	useEffect(() => {
		timerId.current = setInterval(() => {
			if (seconds <= 0) {
				clearInterval(timerId.current);
			} else {
				dispatch(decrementSeconds());
			}
		}, 1000);
		return () => {
			clearInterval(timerId.current);
		};
	}, [seconds]);

	return (
		<div className="ProblemBoxGame">
			{seconds > 0 ? (
				<>
					<h2>{convertToMinutesSeconds(seconds)}</h2>
					<ProblemBoxes />
				</>
			) : (
				<div>
					<p>Time's up!</p>
					<p>Solved: {solved}</p>
					<p>Incorrrect Guesses: {incorrectGuesses}</p>
					<button class="button is-primary" onClick={resetGame}>
						Retry
					</button>
				</div>
			)}
		</div>
	);
};

export default ProblemBoxGame;
