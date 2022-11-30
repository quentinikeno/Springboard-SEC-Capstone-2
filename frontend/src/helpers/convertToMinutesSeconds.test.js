import { convertToMinutesSeconds } from "./convertToMinutesSeconds";

describe("test convertToMinutesSeconds", () => {
	it("should convert 120 seconds to 2:00", () => {
		expect(convertToMinutesSeconds(120)).toBe("2:00");
	});

	it("should convert 95 seconds to 1:35", () => {
		expect(convertToMinutesSeconds(95)).toBe("1:35");
	});

	it("should convert 0 seconds to 0:00", () => {
		expect(convertToMinutesSeconds(0)).toBe("0:00");
	});
});
