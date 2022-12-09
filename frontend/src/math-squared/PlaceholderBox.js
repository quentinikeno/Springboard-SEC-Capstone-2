const PlaceholderBox = ({ iconClass, progress }) => {
	return (
		<div className="column has-text-centered">
			<div className="box">
				<i className={`fa-solid ${iconClass} fa-xl`}></i>
				<progress className="progress my-5" value={progress} max="100">
					{progress}
				</progress>
				<p className="my-5">Progress to Unlock: {progress}%</p>
				<i className="fa-solid fa-lock fa-2xl"></i>
			</div>
		</div>
	);
};

export default PlaceholderBox;
