import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/store";
import DeleteUserForm from "./DeleteUserForm";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<DeleteUserForm />
			</MemoryRouter>
		</Provider>
	);
});
