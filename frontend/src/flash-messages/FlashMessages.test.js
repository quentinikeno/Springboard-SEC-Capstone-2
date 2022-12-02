import { render } from "@testing-library/react";
import FlashMessages from "./FlashMessages";
import { store } from "../store/store";
import { Provider } from "react-redux";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<FlashMessages />
		</Provider>
	);
});
