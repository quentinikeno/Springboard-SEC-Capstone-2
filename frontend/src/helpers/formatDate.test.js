import { formatDate } from "./formatDate";

it("formats a Postgresql timestamp into a human readable date", () => {
	expect(formatDate("2022-11-21 18:02:39.862016")).toBe("November 21, 2022");
});
