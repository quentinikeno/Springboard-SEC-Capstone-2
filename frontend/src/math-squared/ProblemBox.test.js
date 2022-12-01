import { render } from "@testing-library/react";
import ProblemBox from "./ProblemBox";
import { store } from "../store/store";
import { Provider } from "react-redux";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<ProblemBox operation={"add"} />
		</Provider>
	);
});
