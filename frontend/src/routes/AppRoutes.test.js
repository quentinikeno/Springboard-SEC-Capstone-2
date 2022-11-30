import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<AppRoutes />
			</MemoryRouter>
		</Provider>
	);
});
