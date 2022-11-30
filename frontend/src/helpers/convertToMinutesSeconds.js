export const convertToMinutesSeconds = (seconds) => {
	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	return min + ":" + `${sec}`.padStart(2, "0");
};
