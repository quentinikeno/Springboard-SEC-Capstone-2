const FlashMessage = ({ error }) => {
	return (
		<div className="notification is-danger">
			<button className="delete"></button>
			{error}
		</div>
	);
};

export default FlashMessage;
