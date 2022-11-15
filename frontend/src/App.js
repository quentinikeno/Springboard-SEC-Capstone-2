import ProblemBoxGame from "./ProblemBoxGame";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="container">
				<ProblemBoxGame />
			</div>
		</div>
	);
}

export default App;
