import React from "react";
import Profile from "./containers/Profile";
import NavBar from "./containers/NavBar";
import Community from "./containers/Community";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Search from "./containers/Search";
import Resources from "./containers/Resources";

class App extends React.Component {
	state = {
		users: [],
		view: "",
		currentUser: null,
	};

	componentDidMount() {
		fetch("http://localhost:3000/users/")
			.then((resp) => resp.json())
			.then((usersData) => {
				this.setState({ users: usersData });
			});
	}
	handleView = (newState) => {
		this.setState({
			view: newState,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		event.persist();
		let email = event.target.email.value;
		let password = event.target.password.value;
		let user = this.state.users.find(
			(user) => user.email === email && user.password === password
		);
		if (user) {
			fetch(`http://localhost:3000/find-user/${user.id}`).then((resp) => {
				if (resp.ok) {
					resp.json();
					this.setState({
						currentUser: user.id,
						view: "profile",
					});
				}
			});
		} else {
			alert("Email or Password incorrect");
		}
	};

	logOutUser = () => {
		this.setState({ currentUser: null });
	};

	render() {
		return (
			<div id="main">
				<div>
					<NavBar
						handleView={this.handleView}
						currentUser={this.state.currentUser}
					/>
				</div>
				<div>
					{this.state.view === "" ? (
						<div id="welcome">
							Welcome to Collapperate, <br></br>
							please login{" "}
							<div className="login" onClick={() => this.handleView("login")}>
								{" "}
								Login
							</div>
						</div>
					) : null}
					{this.state.view === "profile" && (
						<Profile
							currentUser={this.state.currentUser}
							logOutUser={this.logOutUser}
							handleView={this.handleView}
						/>
					)}
					{this.state.view === "community" && (
						<Community
							currentUser={this.state.currentUser}
							handleView={this.handleView}
						/>
					)}
					{this.state.view === "login" && (
						<Login
							handleSubmit={this.handleSubmit}
							handleView={this.handleView}
						/>
					)}
					{this.state.view === "signup" && <SignUp />}
					{this.state.view === "search" && <Search users={this.state.users} />}
					{this.state.view === "resources" && <Resources />}
				</div>
			</div>
		);
	}
}

export default App;
