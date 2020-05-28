import React from "react";
import Table from "./Table";

export default class Resources extends React.Component {
	state = {
		resources: [],
		search: "",
	};

	componentDidMount() {
		fetch("http://localhost:3000/resources")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ resources: data });
			});
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		let filteredTable = this.state.resources.filter(
			(resource) =>
				resource.rep_type
					.toLowerCase()
					.includes(this.state.search.toLowerCase()) ||
				resource.casting_type
					.toLowerCase()
					.includes(this.state.search.toLowerCase()) ||
				resource.location
					.toLowerCase()
					.includes(this.state.search.toLowerCase()) ||
				resource.company.toLowerCase().includes(this.state.search.toLowerCase())
		);
		return (
			<div>
				<h1 id="table-title">Agents, Managers, and Casting Directors</h1>
				<div className="input">
					<input
						id="casting-search"
						placeholder="Search..."
						onChange={this.handleChange}
						value={this.state.search}
						name="search"
					/>
				</div>
				<div>
					<Table resources={filteredTable} />
				</div>
			</div>
		);
	}
}
