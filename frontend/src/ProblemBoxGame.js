import { useState, useEffect, useRef } from "react";
import ProblemBoxes from "./ProblemBoxes";
import Loading from "./common/Loading";
import useFetchProblems from "./hooks/useFetchProblems";
import useToggleState from "./hooks/useToggleState";

const ProblemBoxGame = () => {
	const [isLoaded, toggleLoaded] = useToggleState(false);
	const [level, setLevel] = useState({ add: 1, sub: 1, mul: 1, div: 1 });
	const [addProblems, setAddProblems] = useFetchProblems("add");
	const [subProblems, setSubProblems] = useFetchProblems("sub");
	const [mulProblems, setMulProblems] = useFetchProblems("mul");
	const [divProblems, setDivProblems] = useFetchProblems("div");
	const [seconds, setSeconds] = useState(300);
	const timerId = useRef();

	useEffect(() => {
		toggleLoaded();
	}, [addProblems]);

	useEffect(() => {
		if (!isLoaded) {
			timerId.current = setInterval(() => {
				if (seconds <= 0) {
					clearInterval(timerId.current);
				} else {
					setSeconds((seconds) => seconds - 1);
				}
			}, 1000);
			return () => {
				clearInterval(timerId.current);
			};
		}
	}, [isLoaded, seconds]);

	const convertToMinutesSeconds = (seconds) => {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return min + ":" + `${sec}`.padStart(2, "0");
	};

	if (isLoaded) return <Loading />;
	return (
		<div className="ProblemBoxGame">
			<h2>{convertToMinutesSeconds(seconds)}</h2>

			<ProblemBoxes
				level={level}
				setLevel={setLevel}
				addProblems={addProblems}
				subProblems={subProblems}
				mulProblems={mulProblems}
				divProblems={divProblems}
			/>
		</div>
	);
};

export default ProblemBoxGame;
