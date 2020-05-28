import React from "react";
import OtherProfile from "./OtherProfile";
export default class Search extends React.Component {
	state = {
		search: "",
		seeProfile: null,
		filteredList: [],
	};

	handleSearch = (e) => {
		this.setState({
			search: e.target.value,
			seeProfile: null,
			filteredList: [],
		});
	};

	seeProfile = (user) => {
		this.setState({
			seeProfile: user,
		});
	};

	filterSearch = () => {
		let filteredUsers = this.props.users.filter((user) =>
			user.name.toLowerCase().includes(this.state.search.toLowerCase())
		);
		this.setState({
			filteredList: filteredUsers,
		});
	};

	render() {
		return (
			<div>
				<input
					id="search-bar"
					placeholder="Search for User"
					value={this.state.search}
					onChange={this.handleSearch}
				/>
				<button onClick={this.filterSearch}>Search for User</button>
				<div className="results">
					{this.state.seeProfile
						? null
						: this.state.filteredList.map((user) => (
								<p key={user.id} onClick={() => this.seeProfile(user)}>
									{user.name}
								</p>
						  ))}
				</div>
				<div>
					{this.state.seeProfile && (
						<OtherProfile user={this.state.seeProfile} />
					)}
				</div>
			</div>
		);
	}
}
