import ProblemBox from "./ProblemBox";
import PlacholderBox from "./PlaceholderBox";
import { useSelector } from "react-redux";

const ProblemBoxes = () => {
	const { level } = useSelector((state) => state.mathSquared);
	const { add: addLevel, sub: subLevel, mul: mulLevel } = level;
	const numToBeat = 5;
	return (
		<>
			<div className="columns">
				<ProblemBox operation={"add"} iconClass={"fa-plus"} />
				{addLevel > numToBeat ? (
					<ProblemBox operation={"sub"} iconClass={"fa-minus"} />
				) : (
					<PlacholderBox
						iconClass={"fa-minus"}
						progress={Math.round(
							(100 * (addLevel - 1)) / numToBeat
						)}
					/>
				)}
			</div>
			<div className="columns">
				{subLevel > numToBeat ? (
					<ProblemBox operation={"mul"} iconClass={"fa-xmark"} />
				) : (
					<PlacholderBox
						iconClass={"fa-xmark"}
						progress={Math.round(
							(100 * (subLevel - 1)) / numToBeat
						)}
					/>
				)}
				{mulLevel > numToBeat ? (
					<ProblemBox operation={"div"} iconClass={"fa-divide"} />
				) : (
					<PlacholderBox
						iconClass={"fa-divide"}
						progress={Math.round(
							(100 * (mulLevel - 1)) / numToBeat
						)}
					/>
				)}
			</div>
		</>
	);
};

export default ProblemBoxes;
