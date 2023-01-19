import "../profileCSS/profile.css"
import { useState, useEffect } from "react";
import Banner from "./Banner";
import UserCard from "./UserCard";
import MainCard from "./MainCard";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import jwt_decode from "jwt-decode";
import NavBar from "./NavBar";

const LIMIT = 10;
function Profile() {

    //Authenticated User
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();


    //User info decoded from the access token
    const decode = auth.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    // Getting user info for http requests.
    const user = decode?.UserInfo;
    const id = user?.userId;

    const [theme, setTheme] = useState("light");
    const [errMsg, setErrMsg] = useState("");
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: 0,
        username: "",
        profilePicture: "",
        bio: "",
        bannerImageLight: "",
        bannerImageShadow: ""
    });

    // State variable for a single post
    const [post, setPost] = useState({
        id: id,
        postTheme: theme,
        content: "",
        isPrivate: false
    });

    //State variable for the pagination results
    const [page, setPage] = useState({
        next: {
            page: 0,
            limit: 0
        },
        previous: {
            page: 0,
            limit: 0
        },
    });

    //State variable for any error messages
    const [message, setMessage] = useState("");

    //Fetch posts on page load.
    useEffect(() => {
        setLoading(true);
        getUser();
        getPosts(1);
    }, []);

    //Changes the theme of the page.
    const handleChangeTheme = (themeChosen) => {
        setPaginatedPosts([]);
        setTheme(themeChosen);
        setPost((prevData) => ({ ...prevData, postTheme: themeChosen }));
    }

    const getUser = async () => {
        const controller = new AbortController();
        try {

            const response = await axiosPrivate.get(`/users/${id}`, {
                signal: controller.signal
            });

            if (response) {
                setLoading(false);
            }

            controller.abort();

            setUserInfo({
                id: response?.data?._id,
                username: response?.data?.username,
                profilePicture: response?.data?.profilePicture,
                bio: response?.data?.bio,
                bannerImageLight: response?.data?.bannerImageLight,
                bannerImageShadow: response?.data?.bannerImageShadow
            });

        } catch (e) {

            if (!e?.response) {
                setErrMsg("No Server Response");
            } 
            else if (e.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }

    }

    const getPosts = async (nextPage) => {
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get(`/posts/paginate/?id=${id}&page=${nextPage}&limit=${LIMIT}&theme=${theme}&public=false`, {
                signal: controller.signal
            });

            controller.abort();

            setPage({
                next: response?.data?.next,
                previous: response?.data?.previous,
                total: response?.data?.total
            });

            setPaginatedPosts([...paginatedPosts, response?.data?.results]);

        } catch (e) {
            if (!e?.response) {
                setErrMsg("No Server Response");
            } 
            else if (e.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (post.content.length === 0) return setMessage("Oops... please try again.");

        if (post.length > 100) return setMessage("You've exceeded the number of words!");

        try {

            const response = await axiosPrivate.post(`/posts`, post);

            //Sets the most recent post on the page.
            setPaginatedPosts([...paginatedPosts, response.data]);
            setPage((prevData) => ({ ...prevData, total: page.total + 1 }));

            //Re-initialize state variables
            setPost({
                id: id,
                postTheme: theme,
                content: "",
                isPrivate: false
            })

            setMessage("Entry recored");
            // window.location.reload();

        } catch (e) {
            if (!e?.response) {
                setErrMsg("No Server Response");
            } 
            else if (e.response?.status === 401) {
                setErrMsg('Unauthorized');
            } 
        }

    }

    return (
        <div id="profileWrapper">
            {
                loading
                    ? <p style={{ position: "absolute", top: "0" }}>Loading...</p>
                    : (
                        <>
                            <div className="flexCenter">
                                <NavBar theme={theme} handleChangeTheme={handleChangeTheme} />

                            </div>
                            <Banner theme={theme} userInfo={userInfo} />
                            <UserCard theme={theme} userInfo={userInfo} numberOfPosts={page.total} />
                            <div className="flexCenter">
                                <MainCard theme={theme} userInfo={userInfo} paginatedPosts={paginatedPosts.flat()} setPaginatedPosts={setPaginatedPosts} setPost={setPost} post={post} handleSubmit={handleSubmit} message={message} page={page} getPosts={getPosts} />
                            </div>
                        </>
                    )
            }

        </div>
    )

}

export default Profile;