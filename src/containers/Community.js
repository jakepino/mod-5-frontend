import React from "react";
import Post from "./Post";

export default class Community extends React.Component {
	state = {
		posts: [],
		search: "",
		postTitle: "",
		postContent: "",
		showForm: false,
	};

	componentDidMount() {
		fetch("http://localhost:3000/posts")
			.then((response) => response.json())
			.then((postData) => {
				this.setState({ posts: postData });
			});
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleForm = (e) => {
		this.setState({ showForm: !this.state.showForm });
	};

	handlePostSubmit = (e) => {
		e.preventDefault();
		const postMethod = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: this.state.postTitle,
				content: this.state.postContent,
				user_id: this.props.currentUser,
			}),
		};
		fetch("http://localhost:3000/posts", postMethod)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					posts: [data, ...this.state.posts],
					postTitle: "",
					postContent: "",
					showForm: false,
				});
			});
	};

	deletePost = (id) => {
		fetch(`http://localhost:3000/posts/${id}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => {
				let updatedPosts = this.state.posts.filter(
					(post) => post.id !== data.id
				);
				this.setState({ posts: updatedPosts });
			});
	};

	render() {
		let filteredPosts = this.state.posts.filter((post) =>
			post.title.toLowerCase().includes(this.state.search.toLowerCase())
		);

		return (
			<div id="main-holder">
				<div className="input">
					<input
						id="post-search"
						placeholder="Search by Post Title..."
						onChange={this.handleChange}
						value={this.state.search}
						name="search"
					/>
				</div>
				<br></br>
				{this.props.currentUser ? (
					<button className="add-post" onClick={this.handleForm}>
						{" "}
						Add New Post
					</button>
				) : null}
				{this.state.showForm ? (
					<form className="new-post-form" onSubmit={this.handlePostSubmit}>
						<input
							className="add-post"
							placeholder="What's the title?"
							name="postTitle"
							value={this.state.postTitle}
							onChange={this.handleChange}
						/>{" "}
						<br></br>
						<textarea
							className="add-post"
							placeholder="Put your content here"
							name="postContent"
							value={this.state.postContent}
							onChange={this.handleChange}
						/>
						<br></br>
						<button className="submit-post">Submit Post</button>
					</form>
				) : null}

				<div id="post-container">
					{filteredPosts.map((post) => (
						<Post
							post={post}
							key={post.id}
							currentUser={this.props.currentUser}
							deletePost={this.deletePost}
							handleView={this.props.handleView}
						/>
					))}
				</div>
			</div>
		);
	}
}
