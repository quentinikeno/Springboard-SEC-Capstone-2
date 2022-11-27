import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/store";
import UserProfileMenuLink from "./UserProfileMenuLink";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<UserProfileMenuLink to={"/profile"} text={"testUser"} />
			</MemoryRouter>
		</Provider>
	);
});
