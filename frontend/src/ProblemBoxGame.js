import { useState, useEffect, useRef } from "react";
import ProblemBox from "./ProblemBox";
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
			<div className="columns">
				<ProblemBox
					level={level}
					setLevel={setLevel}
					operation={"add"}
					problems={addProblems}
				/>
				{level["add"] > 5 && (
					<ProblemBox
						level={level}
						setLevel={setLevel}
						operation={"sub"}
						problems={subProblems}
					/>
				)}
			</div>
			<div className="columns">
				{level["sub"] > 5 && (
					<ProblemBox
						level={level}
						setLevel={setLevel}
						operation={"mul"}
						problems={mulProblems}
					/>
				)}
				{level["mul"] > 5 && (
					<ProblemBox
						level={level}
						setLevel={setLevel}
						operation={"div"}
						problems={divProblems}
					/>
				)}
			</div>
		</div>
	);
};

export default ProblemBoxGame;
