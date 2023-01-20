import { Link } from "react-router-dom";

const About = () => {
    return (
        <section className="sectionWrapper">
            <Link to="/home">back</Link>
            <h1>About Stars</h1>
            <br />
            <p>Stars is a digital journal that gives you the space to journal your greatest achievements or express your vulnerable emotions.</p>
            <br/>
            <p>You can select whether an entry is public to share with everyone or private for your own read.</p>
            <br/>
            <p>The customizable banner allows you to upload an image that brings you inspiration or calmness.</p>
            <br/>
            <p>Switching between themes filters your thoughts any way you wish.</p>
        </section>
    )
}

export default About;