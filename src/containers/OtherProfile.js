import React from "react";

export default class OtherProfile extends React.Component {
	render() {
		return (
			<div className="profile-container">
				<div className="image-container">
					<p className="name">{this.props.user.name}</p>
					<img src={this.props.user.image_url} alt={"No pic yet"} />{" "}
				</div>
				<div className="bio">
					<p>{this.props.user.personal_info}</p>
				</div>
			</div>
		);
	}
}
