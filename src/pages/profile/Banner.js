import "../profileCSS/banner.css";
import React, { useEffect } from "react";
import InputFile from "../../components/InputFile";

function Banner(props) {

    const { theme, userInfo, setUserInfo } = props;


    const bannerImageLight = userInfo.bannerImageLight;
    const bannerImageShadow = userInfo.bannerImageShadow;


    //Sets the background image for the banner component.
    const bannerImage = theme === "light" ? bannerImageLight : bannerImageShadow;
    return (
        userInfo?.isPublic
            ? (
                <header id="banner">
                    <img src={bannerImage} id="bannerImage" alt="banner image" />
                </header >
            )
            : (
                <header id="banner">
                    <img src={bannerImage} id="bannerImage" alt="banner image" />
                    <div id="editBanner">
                        <InputFile id="editBannerPicture" label="Edit Banner" userId={userInfo.id} setUserInfo={setUserInfo} theme={theme} imageKey="banner" />
                    </div>
                </header >
            )

    )
}

export default Banner