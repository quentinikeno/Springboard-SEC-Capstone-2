import { render } from "@testing-library/react";
import FlashMessage from "./FlashMessage";
import { store } from "../store/store";
import { Provider } from "react-redux";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<FlashMessage />
		</Provider>
	);
});
