import UserProfileMenu from "./UserProfileMenu";

const UserProfile = () => {
	return (
		<div className="columns is-desktop">
			<div className="column">
				<UserProfileMenu />
			</div>
			<div className="column is-three-quarters"></div>
		</div>
	);
};
export default UserProfile;
