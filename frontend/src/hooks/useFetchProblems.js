import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProblems = (operation, min = 0, max = 0) => {
	const [problems, setProblems] = useState([]);

	useEffect(function fetchProblemsWhenMounted() {
		async function fetchProblems() {
			const baseUrl = "https://x-math.herokuapp.com/api";
			const apiCalls = [];
			for (let i = 0; i < 40; i++) {
				if (operation === "add") {
					if (i < 5) {
						max = 10;
					} else if (i < 10) {
						max = 15;
					} else if (i < 15) {
						max = 25;
					} else if (i < 20) {
						max = 50;
					} else if (i < 25) {
						max = 75;
					} else if (i < 30) {
						max = 100;
					} else if (i < 40) {
						max = 1000;
					}
				}

				apiCalls.push(
					axios.get(`${baseUrl}/${operation}/?max=${max}&min=${min}`)
				);
			}
			const allProblems = await Promise.all(apiCalls);
			for (let prob of allProblems) {
				setProblems((problems) => [...problems, prob.data]);
			}
		}
		fetchProblems();
	}, []);

	return [problems, setProblems];
};

export default useFetchProblems;
