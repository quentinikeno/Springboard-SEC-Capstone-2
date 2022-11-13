import useFetchFourProblems from "./hooks/useFetchFourProblems";
import ProblemBox from "./ProblemBox";
import "./App.css";

function App() {
	const [problems, setProblems] = useFetchFourProblems();

	return (
		<div className="App">
			<div className="container">
				<div className="grid">
					{problems.map((prob) => (
						<ProblemBox prob={prob} />
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
