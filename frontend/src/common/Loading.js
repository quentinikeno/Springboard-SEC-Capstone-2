const Loading = () => {
	return (
		<div className="my-6">
			Loading...{" "}
			<progress className="progress is-small is-primary" max="100">
				15%
			</progress>
		</div>
	);
};

export default Loading;
