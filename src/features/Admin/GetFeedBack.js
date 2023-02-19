import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useRef } from "react";

const GetFeedBack = () => {
    const [feedback, setFeedback] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRun = useRef(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getFeedback = async () => {
            try {
                const response = await axiosPrivate.get('/feedback', {
                    signal: controller.signal
                });
                const feedbacks = response.data.map(feedback => feedback.content);
                console.log(response.data);
                isMounted && setFeedback(feedbacks);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        if (effectRun.current) {
            getFeedback();
        }

        return () => {
            isMounted = false;
            controller.abort();
            effectRun.current = true;
        }
    }, [])

    return (
        <section className="adminHome">
            <Link to="/">Home</Link>
            <h2>Feedback ({feedback?.length})</h2>
            <br/>
            {feedback?.length > 0 
                ? (
                    <ul>
                        {feedback.map((content, i) => <li key={i}>{i+1}. {content}</li>)}
                    </ul>
                ) : <p>No feedback to display</p>
            }
        </section>
    );
};

export default GetFeedBack;
