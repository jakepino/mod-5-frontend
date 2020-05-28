import React from "react";

export default class SignUp extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		personalInfo: "",
		imageURL: "",
	};

	handleChange = (e) => {
		this.setState(
			{
				[e.target.name]: e.target.value,
			},
			() => console.log(this.state.imageURL)
		);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				personal_info: this.state.personalInfo,
				image_url: this.state.imageURL,
			}),
		}).then((response) => response.json());
	};

	render() {
		return (
			<div>
				<h1>Welcome! Fill out the form below and get started!</h1>
				<br></br>
				<form onSubmit={this.handleSubmit}>
					<label>
						Enter Full Name:
						<br></br>
						<input
							type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/>
					</label>
					<br></br>
					<label>
						Enter Email:
						<br></br>
						<input
							type="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</label>
					<br></br>
					<label>
						Enter Password:
						<br></br>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</label>
					<br></br>
					<label>
						Upload Profile Picture:
						<br></br>
						<input
							type="file"
							name="imageURL"
							value={this.state.imageURL}
							onChange={this.handleChange}
						/>
					</label>
					<br></br>
					<label>
						Tell us about you!:
						<br></br>
						<textarea
							type="text"
							name="personalInfo"
							value={this.state.personalInfo}
							onChange={this.handleChange}
						/>
					</label>
					<br></br>
					<button> Submit</button>
				</form>
			</div>
		);
	}
}
