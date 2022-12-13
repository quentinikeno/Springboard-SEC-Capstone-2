import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProblemBoxes from "./ProblemBoxes";
import {
	reset,
	getHighScore,
	postHighScore,
	patchHighScore,
} from "../redux-slices/math-squared/mathSquaredSlice";
import "./ProblemBoxGame.css";

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
	}, [token, dispatch]);

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
	}, [solved, token, dispatch]);

	return (
		<div className="ProblemBoxGame mt-3 mb-6">
			<div>
				<div id="stats" className="box has-text-centered mx-auto px-6">
					<h1 className="title mb-3">
						Your Progress{" "}
						<i className="fa-solid fa-bars-progress"></i>
					</h1>
					<p>
						Solved:{" "}
						<span className="has-text-success">{solved}</span>{" "}
						<i className="fa-solid fa-check"></i>
					</p>
					<p>
						Incorrrect Guesses:{" "}
						<span className="has-text-danger">
							{incorrectGuesses}
						</span>
					</p>
					<p>
						Accuracy:{" "}
						{solved + incorrectGuesses > 0
							? `${Math.round(
									(100 * solved) / (solved + incorrectGuesses)
							  )}%`
							: "N/A"}
					</p>
					<button
						className="button is-primary mt-3 is-fullwidth"
						onClick={resetGame}
					>
						Restart from Beginning{" "}
						<i className="fa-solid fa-arrow-rotate-left ml-3"></i>
					</button>
				</div>
				<ProblemBoxes />
			</div>
		</div>
	);
};

export default ProblemBoxGame;
