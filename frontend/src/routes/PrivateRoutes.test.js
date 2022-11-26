import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/store";
import PrivateRoutes from "./PrivateRoutes";

beforeEach(() => {
	Object.defineProperty(document, "cookie", {
		writable: true,
		value: "username=test",
	});
});

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<PrivateRoutes />
			</MemoryRouter>
		</Provider>
	);
});
