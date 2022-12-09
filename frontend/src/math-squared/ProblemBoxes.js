import ProblemBox from "./ProblemBox";
import PlacholderBox from "./PlaceholderBox";
import { useSelector } from "react-redux";

const ProblemBoxes = () => {
	const { level } = useSelector((state) => state.mathSquared);
	return (
		<>
			<div className="columns">
				<ProblemBox operation={"add"} iconClass={"fa-plus"}/>
				{level["add"] > 5 ? <ProblemBox operation={"sub"} iconClass={"fa-minus"}/> : <PlacholderBox iconClass={"fa-minus"} />}
			</div>
			<div className="columns">
				{level["sub"] > 5 ? <ProblemBox operation={"mul"} iconClass={"fa-xmark"} /> : <PlacholderBox iconClass={"fa-xmark"} />}
				{level["mul"] > 5 ? <ProblemBox operation={"div"} iconClass={"fa-divide"}/> : <PlacholderBox iconClass={"fa-divide"} />}
			</div>
		</>
	);
};

export default ProblemBoxes;
