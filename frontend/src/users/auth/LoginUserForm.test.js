import { render } from "@testing-library/react";
import LoginUserForm from "./LoginUserForm";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginUserForm />
			</MemoryRouter>
		</Provider>
	);
});
