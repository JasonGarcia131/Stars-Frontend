import Banner from "./Banner";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/axios";
import NavBar from "./NavBar";
import PublicUserCard from "./PublicUserCard";
import PublicMainCard from "./PublicMainCard";

const LIMIT = 10;
function PublicProfile() {

    const userId = window.location.pathname.split("/")[2];

    const [errMsg, setErrMsg] = useState("");
    const [userInfo, setUserInfo] = useState({
        id: userId,
        username: "",
        bio: "",
        profilePicture: ""

    });
    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(false);
    const [paginatedPosts, setPaginatedPosts] = useState([]);

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

    useEffect(() => {
        getUser();
        getPosts(1);        
    }, [theme]);

    const handleChangeTheme = (themeChosen) => {
        setPaginatedPosts([]);
        setTheme(themeChosen);
    }

    const getPosts = async (nextPage) => {
        const controller = new AbortController();
        try {

            const response = await axios.get(`/posts/paginate/public/?id=${userId}&page=${nextPage}&limit=${LIMIT}&theme=${theme}&public=true`, {
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
            } 
        }
    }

    const getUser = async () => {
        const controller = new AbortController();

        try {
            const response = await axios.get(`/users/${userId}`, {
                signal: controller.signal
            });

            if (response) {
                setLoading(false);
            }

            setUserInfo({
                id: response?.data?._id,
                username: response?.data?.username,
                bio: response?.data?.bio,
                profilePicture: response?.data?.profilePicture
            })

            setPaginatedPosts([...paginatedPosts, response.data]);
            controller.abort();

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
            <div className="flexCenter">
                <NavBar theme={theme} handleChangeTheme={handleChangeTheme} />
            </div>
            <Banner userInfo={userInfo} theme={theme} setTheme={setTheme} handleChangeTheme={handleChangeTheme} />
            <PublicUserCard theme={theme} userInfo={userInfo} numberOfPosts={page.total} />
            <div className="flexCenter">

                <PublicMainCard theme={theme} user={userInfo} paginatedPosts={paginatedPosts.flat()} setPaginatedPosts={setPaginatedPosts} page={page} getPosts={getPosts} />
            </div>

        </div>
    )

}

export default PublicProfile;