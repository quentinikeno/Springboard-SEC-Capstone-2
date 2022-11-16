import { useState, useEffect } from "react";
import ProblemBox from "./ProblemBox";
import Loading from "./common/Loading";
import useFetchProblems from "./hooks/useFetchProblems";

const ProblemBoxGame = () => {
	const [addLevel, setAddLevel] = useState(1);
	const [addProblems, setAddProblems] = useFetchProblems("add");
	const [subLevel, setSubLevel] = useState(1);
	const [subProblems, setSubProblems] = useFetchProblems("sub");
	const [mulLevel, setMulLevel] = useState(1);
	const [mulProblems, setMulProblems] = useFetchProblems("mul");
	const [divLevel, setDivLevel] = useState(1);
	const [divProblems, setDivProblems] = useFetchProblems("div");

	if (addProblems.length === 0) return <Loading />;
	return (
		<div className="grid">
			<ProblemBox
				level={addLevel}
				setLevel={setAddLevel}
				problems={addProblems}
			/>
			<ProblemBox
				level={subLevel}
				setLevel={setSubLevel}
				problems={subProblems}
			/>
			<ProblemBox
				level={mulLevel}
				setLevel={setMulLevel}
				problems={mulProblems}
			/>
			<ProblemBox
				level={divLevel}
				setLevel={setDivLevel}
				problems={divProblems}
			/>
		</div>
	);
};

export default ProblemBoxGame;
