import { store } from "../../store/store";
import { setUser, removeUserOnLogOut, setLoading } from "./userSlice";

const setTestUser = () => {
	store.dispatch(
		setUser({
			id: 1,
			joinAt: "2022-11-21 18:02:39.862016",
			lastLoginAt: "2022-11-24 10:42:48.257598-10",
		})
	);
};

describe("test userSlice reducers", () => {
	describe("test setUser", () => {
		it("updates the user info in the store", () => {
			setTestUser();
			expect(store.getState().user).toEqual({
				id: 1,
				joinAt: "November 21, 2022",
				lastLoginAt: "November 24, 2022",
				error: null,
				loading: false,
			});
		});
	});

	beforeEach(() => {
		setTestUser();
	});

	describe("test removeUserOnLogOut", () => {
		it("resets the user info to the intial state", () => {
			store.dispatch(removeUserOnLogOut());
			expect(store.getState().user).toEqual({
				id: null,
				joinAt: null,
				lastLoginAt: null,
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
});
