import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProblemBoxes from "./ProblemBoxes";
import useFetchProblems from "./hooks/useFetchProblems";
import { decrementSeconds } from "./redux-slices/problemBoxes/problemBoxesSlice";

const ProblemBoxGame = () => {
	const [level, setLevel] = useState({ add: 1, sub: 1, mul: 1, div: 1 });
	const [addProblems, setAddProblems] = useFetchProblems("add");
	const [subProblems, setSubProblems] = useFetchProblems("sub");
	const [mulProblems, setMulProblems] = useFetchProblems("mul");
	const [divProblems, setDivProblems] = useFetchProblems("div");

	const timerId = useRef();
	const { seconds } = useSelector((state) => state.problemBoxes);
	const dispatch = useDispatch();

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

	const convertToMinutesSeconds = (seconds) => {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return min + ":" + `${sec}`.padStart(2, "0");
	};

	const calcScore = (levels) =>
		Object.values(levels).reduce((sum, nextLevel) => sum + nextLevel, 0) -
		4;

	return (
		<div className="ProblemBoxGame">
			<h2>{convertToMinutesSeconds(seconds)}</h2>

			{seconds > 0 ? (
				<ProblemBoxes
					level={level}
					setLevel={setLevel}
					addProblems={addProblems}
					subProblems={subProblems}
					mulProblems={mulProblems}
					divProblems={divProblems}
				/>
			) : (
				<div>Time's up! Your score is {calcScore(level)}.</div>
			)}
		</div>
	);
};

export default ProblemBoxGame;
