import React from "react";

class Post extends React.Component {
	state = {
		comments: [],
		newComment: "",
		hideComments: true,
	};

	componentDidMount() {
		fetch("http://localhost:3000/comments")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ comments: data });
			});
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	deleteComment = (id) => {
		fetch(`http://localhost:3000/comments/${id}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => {
				let updatedComments = this.state.comments.filter(
					(comment) => comment.id !== data.id
				);
				this.setState({ comments: updatedComments });
			});
	};

	addNewComment = (e) => {
		e.preventDefault();
		fetch("http://localhost:3000/comments/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: this.state.newComment,
				post_id: this.props.post.id,
				user_id: this.props.currentUser,
			}),
		})
			.then((response) => response.json())
			.then((newCommentData) => {
				this.setState({
					comments: [newCommentData, ...this.state.comments],
					newComment: "",
				});
			});
	};

	handleHideComment = () => {
		this.setState({ hideComments: !this.state.hideComments });
	};

	render() {
		let postComments = this.state.comments.filter(
			(comment) => comment.post_id === this.props.post.id
		);
		let options = {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		let postDate = new Date(this.props.post.created_at).toLocaleString(
			"en-US",
			options
		);

		return (
			<div>
				<div className="post-card">
					<h6>
						{" "}
						Posted by {this.props.post.user.name} on {postDate}
					</h6>
					<div className="title-container">
						<h4>{this.props.post.title}</h4>
						<p className="post-content">{this.props.post.content}</p>
						<button className="show-comment" onClick={this.handleHideComment}>
							Show {postComments.length}{" "}
							{postComments.length > 1 ? "Comments" : "Comment"}
						</button>
					</div>

					{this.state.hideComments
						? null
						: postComments.map((comment, index) => {
								const commentDate = new Date(comment.created_at).toLocaleString(
									"en-US",
									options
								);
								return (
									<div className="comments" key={index}>
										<h6>
											{comment.user.name} on {commentDate}
										</h6>
										<p className="comment-text">{comment.content}</p>
										{this.props.currentUser === comment.user_id ? (
											<button
												className="delete-comment"
												onClick={() => this.deleteComment(comment.id)}
											>
												{" "}
												delete comment
											</button>
										) : null}
									</div>
								);
						  })}
					{this.props.currentUser ? (
						<form className="new-comment" onSubmit={this.addNewComment}>
							<input
								className="new-comment"
								placeholder="Add comment..."
								name="newComment"
								onChange={this.handleChange}
								value={this.state.newComment}
							/>
							<button>submit</button>
						</form>
					) : null}
					{this.props.currentUser === this.props.post.user_id ? (
						<button
							className="delete"
							onClick={() => this.props.deletePost(this.props.post.id)}
						>
							delete post
						</button>
					) : null}
				</div>
			</div>
		);
	}
}
export default Post;
