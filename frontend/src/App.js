import useFetchFourProblems from "./hooks/useFetchFourProblems";
import "./App.css";

function App() {
	const [problems, setProblems] = useFetchFourProblems();

	return (
		<div className="App">
			<div className="container">
				<div className="grid">
					{problems.map((prob) => (
						<div className="box">
							{prob.expression} = {prob.answer}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
