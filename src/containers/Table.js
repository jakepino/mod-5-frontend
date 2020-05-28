import React from "react";

export default class Table extends React.Component {
	renderTableData = () => {
		return this.props.resources.map((resource, index) => {
			const {
				id,
				rep_type,
				company,
				location,
				name,
				contact_info,
				casting_type,
				unsolicited_submissions,
			} = resource;
			const booleanString =
				unsolicited_submissions.toString().charAt(0).toUpperCase() +
				unsolicited_submissions.toString().slice(1);
			return (
				<tr key={id}>
					<td>{index + 1}</td>
					<td>{rep_type}</td>
					<td>{company}</td>
					<td>{location}</td>
					<td>{name}</td>
					<td>{contact_info}</td>
					<td>{casting_type}</td>
					<td>{booleanString}</td>
				</tr>
			);
		});
	};

	render() {
		return (
			<div>
				<table id="resources">
					<tbody>
						<tr>
							<th>Index</th>
							<th>Type</th>
							<th>Company</th>
							<th>Address</th>
							<th>Personnel</th>
							<th>Contact Info</th>
							<th>Reps</th>
							<th>Accept Unsolicited Submissions?</th>
						</tr>
						{this.renderTableData()}
					</tbody>
				</table>
			</div>
		);
	}
}
