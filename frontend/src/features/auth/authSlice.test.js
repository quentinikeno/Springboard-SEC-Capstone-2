import { store } from "../../store/store";
import { setCredentials, logOut } from "./authSlice";

const initialState = { token: null, error: null };
const testUser = {
	username: "testUser",
	email: "testUser@example.com",
	password: "password",
};

it("starts with no tokens in the state", () => {
	expect(store.getState().auth).toEqual(initialState);
});

describe("test authSlice reducers", () => {
	test("setCredentials should set the token in the state", () => {
		store.dispatch(setCredentials({ token: "testToken" }));
		expect(store.getState().auth).toEqual({
			token: "testToken",
			error: null,
		});
	});

	beforeEach(() => {
		store.dispatch(setCredentials({ token: "testToken" }));
	});

	test("logOut removes the users token from the state", () => {
		expect(store.getState().auth).toEqual({
			token: "testToken",
			error: null,
		});
		store.dispatch(logOut());
		expect(store.getState().auth).toEqual({
			token: null,
			error: null,
		});
	});
});
