import { useEffect, useRef } from "react";

const usePreviousLocation = (location) => {
	const previousLocation = useRef(location);

	useEffect(() => {
		previousLocation.current = location;
	}, [location]);

	return previousLocation.current;
};

export default usePreviousLocation;
