import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/store";
import UserProfile from "./UserProfile";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<UserProfile />
			</MemoryRouter>
		</Provider>
	);
});
