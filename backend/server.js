/** Express app for math games API. */

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => {
	console.log(`Server starting on port 5000`);
});
