import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Stars</h1>  
            <br/>
            <p>Your digital journal</p>
            <br/>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/register">Register</Link>
            <br/>
            <Link to="/about">About Stars</Link>
        </section>
    )
}

export default LinkPage
