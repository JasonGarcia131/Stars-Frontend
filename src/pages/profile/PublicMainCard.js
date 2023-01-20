import { handleInfiniteScroll } from "../../components/handlePaginate";
import React from "react";
import Post from "./Post";
import InfiniteScroll from 'react-infinite-scroll-component';

function PublicMainCard(props) {


    const { theme, user, paginatedPosts, page, getPosts } = props;

    return (
        <div id="postWrapper" className={theme === "light" ? "postWrapperLight" : "postWrapperShadow"}>
            {theme === "light" ? <h2>Affirmations</h2> : <h2>Shadow Thoughts</h2>}
            <div id="infinteScrollWrapper">

            <InfiniteScroll
                dataLength={paginatedPosts?.length}
                next={()=>handleInfiniteScroll(getPosts, page)}
                hasMore={page.next}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
                scrollThreshold={.99}
            >
                {paginatedPosts.flat().map((post, index) => (
                    <div key={index}>
                        <Post username={user.username} profilePicture={user.profilePicture} content={post.content}theme={post.theme} date={post.createdAt} />
                    </div>
                ))}
            </InfiniteScroll>
            </div>
        </div>
    )
}

export default PublicMainCard;