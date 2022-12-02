import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProblemBoxes from "./ProblemBoxes";
import {
	decrementSeconds,
	reset,
	getHighScore,
	postHighScore,
	patchHighScore,
} from "../redux-slices/math-squared/mathSquaredSlice";
import { convertToMinutesSeconds } from "../helpers/convertToMinutesSeconds";

const ProblemBoxGame = () => {
	const timerId = useRef();
	const { token } = useSelector((state) => state.user);
	const { seconds, solved, incorrectGuesses, highScore } = useSelector(
		(state) => state.mathSquared
	);
	const dispatch = useDispatch();

	const resetGame = () => {
		dispatch(reset());
	};

	const sendScoreAPI = () => {
		const data = {
			gameId: 1,
			highScore: solved,
			token,
		};
		if (token && highScore && solved > highScore) {
			dispatch(patchHighScore(data));
		} else if (token && !highScore) {
			dispatch(postHighScore(data));
		}
	};

	useEffect(() => {
		if (token) dispatch(getHighScore({ gameId: 1, token }));
	}, [token]);

	useEffect(() => {
		timerId.current = setInterval(() => {
			if (seconds <= 0) {
				clearInterval(timerId.current);
				sendScoreAPI();
			} else {
				dispatch(decrementSeconds());
			}
		}, 1000);
		return () => {
			clearInterval(timerId.current);
		};
	}, [seconds, token]);

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
