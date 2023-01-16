import { useState } from "react"
import { axiosPrivate } from "../api/axios";
import { Link } from "react-router-dom";

const Feedback = () => {

    const [feedback, setFeedback] = useState({
        content: ""
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        console.log("clicked")
        e.preventDefault();

        if (feedback.content.length < 0) return setMessage("Seems like your comment is blank.");

        if (feedback.content.length > 100) return setMessage("Seems like your comment is too long.");

        try {

            const response = await axiosPrivate.post('/feedback', feedback);

            setFeedback({
                content: ""
            });

        } catch (e) {
            setMessage("Something went wrong.")
        }
        setMessage("Thank you for your feedback.");
    }


    return (
        <section class="sectionWrapper">
            <Link to="/">Home</Link>
            <h1>Feedback</h1>
            <p>Your feedback can help improve the app's design to fit your needs.</p>
            <input
                type="textbox"
                className="postTextBoxWrapper"
                placeholder="Your feedback is very appreciated."
                maxLength={100}
                name='feedback'
                value={feedback.content}
                onChange={(e) => setFeedback({ content: e.target.value })}
            />
            <p>{message}</p>
            <button onClick={handleSubmit}>Submit</button>
        </section>
    )
}

export default Feedback;