import { render } from "@testing-library/react";
import ProblemBoxGame from "./ProblemBoxGame";
import { store } from "../store/store";
import { Provider } from "react-redux";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<ProblemBoxGame />
		</Provider>
	);
});
