import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const InputFile = (props) => {

    const axiosPrivate = useAxiosPrivate();

    const { theme, imageKey, id, label, userId, setUserInfo } = props;

    const [uploadBtn, setUploadBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState({
        theme: theme,
    })

    //Initializes the theme value with the current theme everytime its changed.
    useEffect(() => {
        setImage((prevData) => ({ ...prevData, theme: theme }));
    }, [theme]);

    const handleChange = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const file = e.target.files[0];

        if (file && file.type.substring(0, 5) === 'image') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setIsLoading(false);
                setUploadBtn(true);

                //Sets the name of the key based on the string that was passed in the props.
                //This is for the userControllers to know which field to update in the Users db collection. 
                if (imageKey === "banner") setImage((prevData) => ({ ...prevData, image: reader.result }));
                if (imageKey === "profilePicture") setImage({ profilePicture: reader.result });

            }
        }

    }


    // Setting image values to userinfo state when post response is ok.
    const handleSubmit = async () => {
        const response = await axiosPrivate.put(`/users/${userId}`, image);
        if (response.status === 200) {
            if (imageKey === "banner") {
                switch (theme) {
                    case "light":
                        setUserInfo((prevData) => ({ ...prevData, bannerImageLight: image.image }));
                        break;
                    case "shadow":
                        setUserInfo((prevData) => ({ ...prevData, bannerImageShadow: image.image }));
                        break;
                }

            }

            if (imageKey === "profilePicture") setUserInfo((prevData) => ({ ...prevData, profilePicture: image.profilePicture }));
            
            setUploadBtn(false);

        } else {
            setMessage("Could not upload image!");
        }

    }

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            {message}
            <input
                type="file"
                id={id}
                accept="/image/*"
                style={{ display: "none" }}
                onChange={(e) => handleChange(e)}
            />
            {
                isLoading
                    ? <p>Uploading...</p>
                    : uploadBtn
                        ? <button onClick={() => handleSubmit()}>Upload</button>
                        : ""
            }
        </div>

    )
}

export default InputFile;