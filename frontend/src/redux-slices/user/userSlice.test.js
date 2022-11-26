import { store } from "../../store/store";
import { setCredentials, logOut, setUser, setLoading } from "./userSlice";

const setTestUser = () => {
	store.dispatch(
		setCredentials({ token: "testToken", username: "testUser" })
	);
	store.dispatch(
		setUser({
			id: 1,
			joinAt: "2022-11-21 18:02:39.862016",
			lastLoginAt: "2022-11-24 10:42:48.257598-10",
		})
	);
};

describe("test setCredentials", () => {
	it("sets the token and username in the state", () => {
		store.dispatch(
			setCredentials({ token: "testToken", username: "testUser" })
		);
		expect(store.getState().user).toEqual({
			token: "testToken",
			username: "testUser",
			id: null,
			joinAt: null,
			lastLoginAt: null,
			loading: false,
			error: null,
		});
	});
});

describe("test logOut", () => {
	it("removes the users token from the state", () => {
		setTestUser();
		store.dispatch(logOut());
		expect(store.getState().user).toEqual({
			token: null,
			username: null,
			id: null,
			joinAt: null,
			lastLoginAt: null,
			loading: false,
			error: null,
			error: null,
		});
	});
});

describe("test setUser", () => {
	it("updates the user info in the store", () => {
		setTestUser();
		expect(store.getState().user).toEqual({
			token: "testToken",
			username: "testUser",
			id: 1,
			joinAt: "November 21, 2022",
			lastLoginAt: "November 24, 2022",
			error: null,
			loading: false,
		});
	});
});

describe("test setLoading", () => {
	it("can set loading to true", () => {
		store.dispatch(setLoading(true));
		expect(store.getState().user.loading).toBe(true);
	});

	it("can set loading to false", () => {
		store.dispatch(setLoading(false));
		expect(store.getState().user.loading).toBe(false);
	});
});
