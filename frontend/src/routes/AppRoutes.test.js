import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

it("renders without crashing", () => {
	render(
		<MemoryRouter>
			<AppRoutes />
		</MemoryRouter>
	);
});
