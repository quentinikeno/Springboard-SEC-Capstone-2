import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/store";
import EditPasswordForm from "./EditPasswordForm";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<EditPasswordForm />
			</MemoryRouter>
		</Provider>
	);
});
