import React, { Component } from "react";

export default class Login extends Component {
	state = {
		email: "",
		password: "",
	};
	changeState = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	render() {
		return (
			<div>
				<div id="login-form">
					<form onSubmit={this.props.handleSubmit}>
						<h1>Login Here</h1>
						<label>
							Email:
							<input
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.changeState}
							/>
						</label>
						<br></br>
						<label>
							Password:
							<input
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.changeState}
							/>
						</label>
						<br></br>
						<br></br>

						<button>Login</button>
					</form>
					<br></br>
					<h2> Or Make a Profile</h2>
					<button onClick={() => this.props.handleView("signup")}>
						{" "}
						Sign Up
					</button>
				</div>
			</div>
		);
	}
}
