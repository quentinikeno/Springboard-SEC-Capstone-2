import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="has-text-centered">
			<section className="hero is-medium has-background-grey-lighter box">
				<div className="hero-body ">
					<div className="container">
						<h1 className="title is-size-1">Math Squared</h1>
						<p className="subtitle">Practice your artihmetic!</p>

						<Link to="/game">
							<div className="button is-primary is-large">
								Start!
							</div>
						</Link>
					</div>
				</div>
			</section>

			<div className="columns is-desktop">
				<section className="my-6 column">
					<h2 className="title is-size-2">About the Game:</h2>
					<p>
						Solve addtion, subtraction, multiplication, and division
						problems that get harder as you progress. You'll start
						by solving addition problems and as you complete more
						you will be able to start solving subtraction problems.
						Then complete subtraction problems to start working on
						multiplication problems and finally complete
						multiplication problems to start working on division
						problems until you see problem squares for all four
						operations.
					</p>
				</section>
				<section className="my-6 column">
					<h3 className="title is-size-3">
						Login/Sign Up to Save Your Score.
					</h3>
					<i className="fa-solid fa-user-plus fa-xl"></i>
					<div className="buttons is-justify-content-center my-4">
						<Link to="/auth/login">
							<div className="button is-primary mr-3">Login</div>
						</Link>
						<Link to="/auth/register">
							<div className="button is-link">Sign Up</div>
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
