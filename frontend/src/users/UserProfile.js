import UserProfileMenu from "./UserProfileMenu";

const UserProfile = ({ child }) => {
	return (
		<div className="columns is-desktop">
			<div className="column">
				<UserProfileMenu />
			</div>
			<div className="column is-three-quarters">{child}</div>
		</div>
	);
};
export default UserProfile;
