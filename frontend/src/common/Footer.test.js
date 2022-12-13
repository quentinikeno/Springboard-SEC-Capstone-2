import { render } from "@testing-library/react";
import Footer from "./Footer";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Footer />
			</MemoryRouter>
		</Provider>
	);
});
