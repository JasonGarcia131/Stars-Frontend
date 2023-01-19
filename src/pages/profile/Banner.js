import "../profileCSS/banner.css";
import React from "react";
import InputFile from "../../components/InputFile";

function Banner(props) {

    const { theme, userInfo } = props;

    const bannerImageLight = userInfo.bannerImageLight;
    const bannerImageShadow = userInfo.bannerImageShadow;

    //Sets the background image for the banner component.
    const style = theme === "light" ? `url(${bannerImageLight})` : `url(${bannerImageShadow})`;
    return (
        <header id="banner" style={{ backgroundImage: style }}>
            <div id="editBanner">
                <InputFile id="editBannerPicture" label="Edit Banner" userId={userInfo.id} theme={theme} imageKey="image" />
            </div>
        </header>
    )
}

export default Banner