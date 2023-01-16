import "../profileCSS/banner.css";
import React, {useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Banner(props) {

    const axiosPrivate = useAxiosPrivate();

    const { theme, userInfo } = props;

    const [message, setMessage] = useState("");
    const [uploadBtn, setUploadBtn] = useState(false);
    const [bannerImage, setBannerImage] = useState({
        theme: theme,
        image: ""
    });

    const bannerImageLight = userInfo.bannerImageLight;
    const bannerImageShadow = userInfo.bannerImageShadow;
    console.log("theme", theme)

    useEffect(()=>{
        setBannerImage((prevData)=>({...prevData, theme: theme}))
    },[theme]);

    //Sets the background image for the banner component.
    const style = theme === "light" ? `url(${bannerImageLight})` : `url(${bannerImageShadow})`;

    //Update banner image
    const handlebannerImage = async (e) => {
        e.preventDefault();
        setUploadBtn(true);
        const file = e.target.files[0];
        if (file && file.type.substring(0, 5) === 'image') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setBannerImage((prevData) => ({...prevData, image: reader.result }));
            }
        }
    }

    const changeBannerImage = async () => {
        console.log("banner image", bannerImage.image)
        const response = await axiosPrivate.put(`/users/${userInfo.id}`, bannerImage);
        if (response.status === 200) {
            window.location.reload();
        } else {
            setMessage("Could not upload image!");
        }

    }

    return (
        <header id="banner" style={{ backgroundImage: style }}>
            <div id="editBanner">
                <label htmlFor="editBannerPicture" className="inputFile">Edit Banner</label>
                {uploadBtn ? <button onClick={() => changeBannerImage()}>Upload</button> : ""}
                <p>{message}</p>
                <input
                    type="file"
                    id="editBannerPicture"
                    accept="/image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handlebannerImage(e)}
                />
            </div>
        </header>
    )
}

export default Banner