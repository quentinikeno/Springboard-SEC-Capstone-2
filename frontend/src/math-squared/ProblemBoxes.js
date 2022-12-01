import ProblemBox from "./ProblemBox";
import { useSelector } from "react-redux";

const ProblemBoxes = () => {
	const { level } = useSelector((state) => state.mathSquared);
	return (
		<>
			<div className="columns">
				<ProblemBox operation={"add"} />
				{level["add"] > 5 && <ProblemBox operation={"sub"} />}
			</div>
			<div className="columns">
				{level["sub"] > 5 && <ProblemBox operation={"mul"} />}
				{level["mul"] > 5 && <ProblemBox operation={"div"} />}
			</div>
		</>
	);
};

export default ProblemBoxes;
