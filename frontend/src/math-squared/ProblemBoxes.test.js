import { render } from "@testing-library/react";
import ProblemBoxes from "./ProblemBoxes";
import { store } from "../store/store";
import { Provider } from "react-redux";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<ProblemBoxes />
		</Provider>
	);
});
