import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/store";
import EditUsernameForm from "./EditUsernameForm";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<EditUsernameForm />
			</MemoryRouter>
		</Provider>
	);
});
