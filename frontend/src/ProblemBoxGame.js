import { useState, useEffect } from "react";
import ProblemBox from "./ProblemBox";
import Loading from "./common/Loading";
import useFetchProblems from "./hooks/useFetchProblems";

const ProblemBoxGame = () => {
	const [level, setLevel] = useState({ add: 1, sub: 1, mul: 1, div: 1 });
	const [addProblems, setAddProblems] = useFetchProblems("add");
	const [subProblems, setSubProblems] = useFetchProblems("sub");
	const [mulProblems, setMulProblems] = useFetchProblems("mul");
	const [divProblems, setDivProblems] = useFetchProblems("div");

	if (addProblems.length === 0) return <Loading />;
	return (
		<div className="grid">
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
	);
};

export default ProblemBoxGame;
