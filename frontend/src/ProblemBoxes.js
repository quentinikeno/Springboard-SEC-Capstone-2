import ProblemBox from "./ProblemBox";

const ProblemBoxes = ({
	level,
	setLevel,
	addProblems,
	subProblems,
	mulProblems,
	divProblems,
}) => {
	return (
		<>
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
		</>
	);
};

export default ProblemBoxes;
