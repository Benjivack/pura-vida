import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const [favoriteTrails, setFavoriteTrails] = useState([]);
    const { token } = useToken();
    const navigate = useNavigate();

    const fetchFavoriteTrails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/favorites`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setFavoriteTrails(data);
            }
        } catch (error) {
            console.error("Error fetching favorite trails:", error);
        }
    }

    useEffect(() => {
        console.log(`useEffect running with token ${token}`);
        if (token) {
            fetchFavoriteTrails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const navigateToTrail = (trail_id) => {
        navigate(`/posts/${trail_id}`);
    }

    return (
        <div>
            <h2>Favorites</h2>
            <table>
                <thead>
                    <tr>
                        <th>Trail Name</th>
                        <th>View Trail</th>
                    </tr>
                </thead>
                <tbody>
                    {favoriteTrails.map(trail => (
                        <tr key={trail.id}>
                            <td>{trail.title}</td>
                            <td>
                                <button onClick={() => navigateToTrail(trail.id)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Favorites;
