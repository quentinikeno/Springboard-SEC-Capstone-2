import { useState, useEffect } from "react";
import axios from "axios";

const useFetchFourProblems = () => {
	const [problems, setProblems] = useState([]);

	useEffect(function fetchProblemsWhenMounted() {
		async function fetchProblems() {
			const baseUrl = "https://x-math.herokuapp.com/api";
			const probs = await Promise.all([
				axios.get(`${baseUrl}/add`),
				axios.get(`${baseUrl}/sub`),
				axios.get(`${baseUrl}/mul`),
				axios.get(`${baseUrl}/div`),
			]);
			for (let problem of probs) {
				setProblems((problems) => [...problems, problem.data]);
			}
		}
		fetchProblems();
	}, []);

	return [problems, setProblems];
};

export default useFetchFourProblems;
