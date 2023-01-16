import "../profileCSS/post.css";

function Post(props) {

    const { username, content, profilePicture, theme, date } = props;

    const newDate = new Date(date);

    const month = newDate.getMonth() + 1;
    const day = newDate.getDate() + 1;
    const year = newDate.getFullYear();
    const dateOfPost = `${month}/${day}/${year}`;

    return (
        <article id="postContentWrapper" className={theme === "light" ? "lightPostCard" : "shadowPostCard"}>
            <div className="postUserInfoFlex">
                <div id="postProfilePicture" className="profilePictureWrapper">
                    <img className="profilePicture" src={profilePicture} alt="profile picture" />
                </div>
                <h3 id="postUsername">{username}</h3>
                <p id="postDate">{dateOfPost}</p>
            </div>
            <p>{content}</p>
        </article>
    )
}

export default Post;