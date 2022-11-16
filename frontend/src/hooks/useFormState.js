import { useState } from "react";

const useFormState = (initialState) => {
	const [formData, setFormData] = useState(initialState);
	const [formErrors, setFormErrors] = useState([]);
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	return [formData, setFormData, handleChange, formErrors, setFormErrors];
};

export default useFormState;
