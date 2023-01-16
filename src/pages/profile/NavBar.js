import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../profileCSS/navbar.css";

function NavBar(props) {

    const { theme, handleChangeTheme } = props;

    const buttonStyle = theme === "light" ? "lightNavButton" : "shadowNavButton";

    return (
        <nav id="navBarWrapper">
            <button className={buttonStyle} ><Link to='/'><FaHome size="large"/></Link></button>
            <button className={buttonStyle} onClick={()=> handleChangeTheme("light")}>Light</button>
            <button className={buttonStyle} onClick={() => handleChangeTheme("shadow")}>Shadow</button>
        </nav>
    )
}

export default NavBar;