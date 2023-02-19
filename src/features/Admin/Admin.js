import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <div>
                <Link to="/">Home</Link>
                <br/>
                <Link to="/getfeedback">Feedback</Link>
            </div>
        </section>
    )
}

export default Admin
