import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProblemBoxes from "./ProblemBoxes";
import { decrementSeconds } from "../redux-slices/problemBoxes/problemBoxesSlice";
import { convertToMinutesSeconds } from "../helpers/convertToMinutesSeconds";

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

	return (
		<div className="ProblemBoxGame">
			<h2>{convertToMinutesSeconds(seconds)}</h2>

			{seconds > 0 ? <ProblemBoxes /> : <div>Time's up!.</div>}
		</div>
	);
};

export default ProblemBoxGame;
