import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRun = useRef(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                const userNames = response.data.map(user => user.username);
                console.log(response.data);
                isMounted && setUsers(userNames);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        if (effectRun.current) {
            getUsers();
        }

        return () => {
            isMounted = false;
            controller.abort();
            effectRun.current = true;
        }
    }, [])

    return (
        <article>
            {/* <h2>Users List</h2>
            {users?.length > 0 
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}><Link to='/publicProfile'>{user}</Link></li>)}
                    </ul>
                ) : <p>No users to display</p>
            } */}
        </article>
    );
};

export default Users;
