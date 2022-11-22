import { render } from "@testing-library/react";
import LoginUserForm from "./LoginUserForm";

it("renders without crashing", () => {
	render(<LoginUserForm />);
});
