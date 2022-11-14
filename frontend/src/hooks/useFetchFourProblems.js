import { useState, useEffect } from "react";
import axios from "axios";

const useFetchFourProblems = () => {
	const [problems, setProblems] = useState([]);

	useEffect(function fetchProblemsWhenMounted() {
		async function fetchProblems() {
			const baseUrl = "https://x-math.herokuapp.com/api";
			const probs = await Promise.all([
				axios.get(`${baseUrl}/add/?max=100&min=0`),
				axios.get(`${baseUrl}/sub?max=100&min=0`),
				axios.get(`${baseUrl}/mul?max=10&min=0`),
				axios.get(`${baseUrl}/div?max=10&min=0`),
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
