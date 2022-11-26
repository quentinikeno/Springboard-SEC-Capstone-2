import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

it("renders without crashing", () => {
	render(
		<MemoryRouter>
			<AuthRoutes />
		</MemoryRouter>
	);
});
