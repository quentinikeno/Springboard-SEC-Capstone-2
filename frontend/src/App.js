import AppRoutes from "./routes/AppRoutes";
import Navbar from "./navbar/Navbar";
import "./App.css";

function App() {
	return (
		<div className="App container">
			<Navbar />
			<AppRoutes />
		</div>
	);
}

export default App;
