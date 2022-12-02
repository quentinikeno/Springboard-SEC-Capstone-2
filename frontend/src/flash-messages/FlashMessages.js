import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FlashMessage from "./FlashMessage";
import usePreviousLocation from "../hooks/usePreviousLocation";

const FlashMessages = () => {
	const location = useLocation();
	const previousLocation = usePreviousLocation(location);
	const { error } = useSelector((state) => state.user);
	const [errors, setErrors] = useState([error]);

	useEffect(() => {
		if (location !== previousLocation) {
			setErrors([]);
		}
	}, [location]);

	return errors.map((error) => error && <FlashMessage error={error} />);
};

export default FlashMessages;
