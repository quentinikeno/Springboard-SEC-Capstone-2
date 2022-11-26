import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import UserDetail from "./UserDetail";

it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<UserDetail />
		</Provider>
	);
});
