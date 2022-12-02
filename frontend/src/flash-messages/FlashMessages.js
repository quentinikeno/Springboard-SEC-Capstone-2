import { useSelector } from "react-redux";

const FlashMessages = () => {
	const { error } = useSelector((state) => state.user);
	return (
		<div class="notification is-danger is-light">
			<button class="delete"></button>
			{error}
		</div>
	);
};

export default FlashMessages;
