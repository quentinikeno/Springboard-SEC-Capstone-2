import { store } from "../../store/store";
import { setCredentials, logOut } from "./authSlice";

const initialState = { token: null, username: null, error: null };

it("starts with no tokens in the state", () => {
	expect(store.getState().auth).toEqual(initialState);
});

describe("test authSlice reducers", () => {
	describe("test setCredentials", () => {
		it("sets the token and username in the state", () => {
			store.dispatch(
				setCredentials({ token: "testToken", username: "testUser" })
			);
			expect(store.getState().auth).toEqual({
				token: "testToken",
				username: "testUser",
				error: null,
			});
		});
	});

	beforeEach(() => {
		store.dispatch(
			setCredentials({ token: "testToken", username: "testUser" })
		);
	});

	describe("test logOut", () => {
		test("removes the users token from the state", () => {
			store.dispatch(logOut());
			expect(store.getState().auth).toEqual({
				token: null,
				username: null,
				error: null,
			});
		});
	});
});
