import React from "react";

export default class Profile extends React.Component {
	state = {
		user: {},
		showForm: false,
		newBio: "",
	};

	componentDidMount() {
		fetch("http://localhost:3000/users/")
			.then((response) => response.json())
			.then((users) => {
				let userData = users.find((user) => user.id === this.props.currentUser);
				this.setState({ user: userData });
			});
	}

	displayForm = () => {
		this.setState({ showForm: !this.state.showForm });
	};

	handleBioChange = (e) => {
		this.setState({ newBio: e.target.value });
	};

	handlePatchBio = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3000/users/${this.props.currentUser}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ personal_info: this.state.newBio }),
		})
			.then((resp) => resp.json())
			.then((data) => {
				this.setState({
					user: data,
					showForm: false,
				});
			});
	};

	loggedInUser = () => {
		if (this.props.currentUser) {
			return (
				<div>
					<div className="profile-container">
						<div className="image-container">
							<p className="name">{this.state.user.name}</p>
							<p className="name">{this.state.user.email}</p>
							<img src={this.state.user.image_url} alt={"No pic yet"} />{" "}
						</div>
						<div className="bio">
							<div id="info">
								<p>{this.state.user.personal_info}</p>
							</div>
							<div>
								<button className="update" onClick={this.displayForm}>
									{" "}
									Edit Personal Info
								</button>
							</div>
						</div>
					</div>

					{this.state.showForm ? (
						<div id="update-form">
							<form onSubmit={this.handlePatchBio}>
								<label className="label"> Update info</label>
								<br></br>
								<textarea
									className="label"
									onChange={this.handleBioChange}
									value={this.state.newBio}
								/>
								<br></br>
								<button className="label"> Submit</button>
							</form>
						</div>
					) : null}

					<button id="logout" onClick={this.props.logOutUser}>
						Log out
					</button>
				</div>
			);
		} else {
			return (
				<div className="login-error">
					<h1>Please try logging in again</h1>
					<button onClick={() => this.props.handleView("login")}> Login</button>
				</div>
			);
		}
	};

	render() {
		return <this.loggedInUser />;
	}
}
