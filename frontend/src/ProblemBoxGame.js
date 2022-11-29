import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProblemBoxes from "./ProblemBoxes";
import { decrementSeconds } from "./redux-slices/problemBoxes/problemBoxesSlice";

const ProblemBoxGame = () => {
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

	return (
		<div className="ProblemBoxGame">
			<h2>{convertToMinutesSeconds(seconds)}</h2>

			{seconds > 0 ? <ProblemBoxes /> : <div>Time's up!.</div>}
		</div>
	);
};

export default ProblemBoxGame;
