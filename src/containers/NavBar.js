import React from "react";

const Navbar = (props) => {
	return (
		<div>
			<ul id="navbar-main">
				<li
					className="nav-component"
					onClick={() => props.handleView("community")}
				>
					Community Posts
				</li>
				<li
					className="nav-component"
					onClick={() => props.handleView("profile")}
				>
					Profile
				</li>

				<li
					className="nav-component"
					onClick={() => props.handleView("search")}
				>
					Search
				</li>
				<li
					className="nav-component"
					onClick={() => props.handleView("resources")}
				>
					Resources
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
