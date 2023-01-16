import "../profileCSS/usercard.css";
import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UserCard(props) {

    const axiosPrivate = useAxiosPrivate();

    const [uploadBtn, setUploadBtn] = useState(false);
    const [message, setMessage] = useState("");
    const [totalPosts, setTotalPosts] = useState(0);
    const [newProfilePicture, setNewProfilePicture] = useState({
        profilePicture: ""
    });
    const [userBio, setUserBio] = useState({
        content: ""
    });


    const { theme, userInfo, numberOfPosts } = props;
    const { username, profilePicture, bio, id } = userInfo;

    const handleProfileImage = async (e) => {
        e.preventDefault();
        setUploadBtn(true);
        const file = e.target.files[0];

        if (file && file.type.substring(0, 5) === 'image') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                console.log("reader.results", reader.result)
                setNewProfilePicture({ profilePicture: reader.result });
            }
        }
    }

    const handleSubmit = async () => {
        console.log("clicked")
        const response = await axiosPrivate.put(`/users/${id}`, newProfilePicture);
        if (response.status === 200) {
            window.location.reload();
        } else {
            setMessage("Could not update!");
        }
    }

    const handleSubmitBio = async () => {
        console.log("userBio", userBio)
        const response = await axiosPrivate.put(`/users/${id}`, userBio);
        if (response.status === 200) {
            window.location.reload();
        } else {
            setMessage("Could not update!");
        }
    }

    return (
        <aside id="userCardWrapper" className={theme === "light" ? "lightUserCard" : "shadowUserCard"}>
            <div id="userCardProfilePictureWrapper" className="profilePictureWrapper">
                <img id="userCardProfilePicture" className="profilePicture" src={profilePicture} alt="avatar" />
                <label htmlFor="profilePicture" className="inputFile">Edit Picture</label>
                <input
                    type="file"
                    id="profilePicture"
                    accept="/image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleProfileImage(e)}
                />

            </div>
            {uploadBtn ? <button onClick={() => handleSubmit()}>Upload</button> : ""}
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