import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeError } from "../redux-slices/user/userSlice";
import FlashMessage from "./FlashMessage";

const FlashMessages = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { error } = useSelector((state) => state.user);
	const [errors, setErrors] = useState([error]);

	// useEffect(() => {
	// 	setErrors([]);
	// }, [error]);
	// console.log(location);

	return errors.map((error) => error && <FlashMessage error={error} />);
};

export default FlashMessages;
