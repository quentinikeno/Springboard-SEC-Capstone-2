import { render } from "@testing-library/react";
import RegisterUserForm from "./RegisterUserForm";

it("renders without crashing", () => {
	render(<RegisterUserForm />);
});
