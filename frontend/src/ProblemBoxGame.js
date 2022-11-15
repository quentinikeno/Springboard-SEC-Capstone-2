import { useState, useEffect } from "react";
import ProblemBox from "./ProblemBox";
import Loading from "./common/Loading";
import useFetchProblems from "./hooks/useFetchProblems";

const ProblemBoxGame = () => {
	const [level, setLevel] = useState(1);
	const [problems, setProblems] = useFetchProblems("add");
	const [correct, setCorrect] = useState(false);

	useEffect(() => {
		setLevel((level) => level + 1);
		setCorrect(() => false);
	}, [correct]);

	if (problems.length === 0) return <Loading />;
	return (
		<ProblemBox
			level={level}
			problems={problems}
			correct={correct}
			setCorrect={setCorrect}
		/>
	);
};

export default ProblemBoxGame;
