import "../profileCSS/usercard.css";
import React, { useState } from "react";
import InputFile from "../../components/InputFile";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UserCard(props) {

    const axiosPrivate = useAxiosPrivate();

    const { theme, userInfo, setUserInfo, numberOfPosts } = props;
    const { username, profilePicture, bio, id } = userInfo;

    const [message, setMessage] = useState("");
    const [userBio, setUserBio] = useState({
        content: ""
    });

    const handleSubmitBio = async () => {
        const response = await axiosPrivate.put(`/users/${id}`, userBio);
        if(!response) setMessage("No server response");
        if (response.status === 200) {
            setUserInfo((prevData)=>({...prevData, bio: userBio.content}));
        } else {
            setMessage("Could not update!");
        }
    }

    return (
        <aside id="userCardWrapper" className={theme === "light" ? "lightUserCard" : "shadowUserCard"}>
            <div id="userCardProfilePictureWrapper" className="profilePictureWrapper">
                <InputFile id="editProfilePicture" label="Edit Picture" imageKey="profilePicture" userId={id} setUserInfo={setUserInfo} />
                <br/>
                <img id="userCardProfilePicture" className="profilePicture" src={profilePicture} alt="avatar" />
            </div>
            <br />
            <p>{message}</p>
            <br />
            <h1 id="userNameWrapper">
                {username}
            </h1>
            <p id="userBioWrapper">
                "{bio}"
            </p>
            <br />
            <div id="editBioWrapper">
                <input
                    type="textbox"
                    name="userBio"
                    placeholder="Edit bio"
                    value={userBio.content}
                    onChange={(e) => setUserBio({ content: e.target.value })}
                />
                <button onClick={() => handleSubmitBio()}>Edit bio</button>
            </div>

            <br />
            <div id="journalEntriesCount">
                {numberOfPosts} <span>Journal Entries</span>
            </div>
        </aside>
    )
}

export default UserCard;