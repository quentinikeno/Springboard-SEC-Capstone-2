const FlashMessage = ({ error }) => {
	return <div className="notification is-danger">{error}</div>;
};

export default FlashMessage;
