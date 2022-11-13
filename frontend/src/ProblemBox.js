const ProblemBox = ({ prob: { expression, answer } }) => {
	return (
		<div className="box">
			{expression} = {answer}
		</div>
	);
};

export default ProblemBox;
