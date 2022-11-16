import { useState, useEffect } from "react";
import axios from "axios";

const determineMax = (operation, i) => {
	if (operation === "add" || operation === "sub") {
		if (i < 5) {
			return 10;
		} else if (i < 10) {
			return 15;
		} else if (i < 15) {
			return 25;
		} else if (i < 20) {
			return 50;
		} else if (i < 25) {
			return 75;
		} else if (i < 30) {
			return 100;
		} else if (i < 40) {
			return 1000;
		}
	} else {
		if (i < 10) {
			return 5;
		} else if (i < 20) {
			return 10;
		} else if (i < 25) {
			return 15;
		} else if (i < 30) {
			return 20;
		} else if (i < 40) {
			return 25;
		}
	}
};

const useFetchProblems = (operation) => {
	const [problems, setProblems] = useState([]);

	useEffect(function fetchProblemsWhenMounted() {
		async function fetchProblems() {
			const baseUrl = "https://x-math.herokuapp.com/api";
			const apiCalls = [];
			for (let i = 0; i < 40; i++) {
				const min = 0;
				const max = determineMax(operation, i);

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
