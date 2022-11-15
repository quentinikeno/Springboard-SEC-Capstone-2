const Loading = () => {
	return (
		<div>
			Loading...{" "}
			<progress className="progress is-small is-primary" max="100">
				15%
			</progress>
		</div>
	);
};

export default Loading;
