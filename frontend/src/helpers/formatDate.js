export const formatDate = (
	dateString,
	options = { year: "numeric", month: "long", day: "numeric" }
) => new Date(dateString).toLocaleDateString(undefined, options);
