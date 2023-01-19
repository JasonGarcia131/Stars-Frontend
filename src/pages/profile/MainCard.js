import "../profileCSS/maincard.css";
import { useEffect } from "react";
import { handleInfiniteScroll } from "../../components/handlePaginate";
import React, { useState } from "react";
import PostTextBox from "./PostTextBox";
import Post from "./Post";
import InfiniteScroll from 'react-infinite-scroll-component';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function MainCard(props) {

    const axiosPrivate = useAxiosPrivate();

    const [editMode, setEditMode] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const { theme, userInfo, paginatedPosts, setPost, post, message, page, getPosts, setPaginatedPosts, handleSubmit } = props;

    const { id, username, profilePicture } = userInfo;

    const handleDelete = async (id) => {

        //Toggles delete button to hide or show
        if (!id) return setEditMode(!editMode);

        try {
            const response = await axiosPrivate.delete(`/posts/${id}`);
            if (response.status === 200) {
                const filteredPost = paginatedPosts.flat().filter(post => post._id !== response.data._id);
                setPaginatedPosts(filteredPost);
            }
        } catch (e) {
            if (!e?.response) {
                setErrMsg("No Server Response");
            }
            else if (e.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
        }
    }

    useEffect(() => {
        getPosts(1);
    }, [theme])

    return (
        <div id="postWrapper" className={theme === "light" ? "postWrapperLight" : "postWrapperShadow"}>
            {theme === "light" ? <h2>Affirmations</h2> : <h2>Shadow Thoughts</h2>}
            <div className={!editMode ? "hide" : "unhide"} onClick={() => setEditMode(!editMode)}>Delete Entries</div>
            <PostTextBox theme={theme} id={id} setPost={setPost} post={post} handleSubmit={handleSubmit} />
            <p>{message.length > 0 ? message : ""}</p>
            <div id="infinteScrollWrapper">
                <InfiniteScroll
                    dataLength={paginatedPosts.length}
                    next={() => handleInfiniteScroll(getPosts, page)}
                    hasMore={page.next}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={.99}
                >
                    {paginatedPosts.flat().map((post, index) => (
                        <div id="postCardWrapper" key={index}>
                            <Post username={username} profilePicture={profilePicture} content={post.content} handleDelete={handleDelete} theme={post.theme} date={post.createdAt} />
                            <div className="deleteButtonWrapper">
                                <div onClick={() => handleDelete()}>ooo</div>
                                <button onClick={() => handleDelete(post._id)} className={editMode ? "unhide" : "hide"}>Delete</button>
                                <p>{post.isPrivate ? "Private" : "Public"}</p>
                            </div>
                        </div>
                    ))}

                </InfiniteScroll>
            </div>

        </div>
    )
}

export default MainCard;