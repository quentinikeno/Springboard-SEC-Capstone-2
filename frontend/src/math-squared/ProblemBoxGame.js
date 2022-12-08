import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProblemBoxes from "./ProblemBoxes";
import {
	reset,
	getHighScore,
	postHighScore,
	patchHighScore,
} from "../redux-slices/math-squared/mathSquaredSlice";

const ProblemBoxGame = () => {
	const { token } = useSelector((state) => state.user);
	const { solved, incorrectGuesses, highScore } = useSelector(
		(state) => state.mathSquared
	);
	const dispatch = useDispatch();

	const resetGame = () => {
		dispatch(reset());
	};

	useEffect(() => {
		if (token) dispatch(getHighScore({ gameId: 1, token }));
	}, [token]);

	useEffect(() => {
		const data = {
			gameId: 1,
			highScore: solved,
			token,
		};
		if (token && highScore && solved > highScore) {
			dispatch(patchHighScore(data));
		} else if (token && !highScore && solved > 0) {
			dispatch(postHighScore(data));
		}
	}, [solved, token]);

	return (
		<div className="ProblemBoxGame">
			<div>
				<ProblemBoxes />
				<div>
					<p>Solved: {solved}</p>
					<p>Incorrrect Guesses: {incorrectGuesses}</p>
					<p>
						Accuracy:{" "}
						{solved + incorrectGuesses > 0
							? `${Math.round(
									(100 * solved) / (solved + incorrectGuesses)
							  )}%`
							: "N/A"}
					</p>
					<button class="button is-primary" onClick={resetGame}>
						Restart from Beginning
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProblemBoxGame;
