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

    const deleteFavorite = async (favorites_id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/favorites/${favorites_id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (response.ok) {
                // Remove the deleted favorite from the state
                setFavoriteTrails(prevFavorites => prevFavorites.filter(favorite => favorite.id !== favorites_id));
            }
        } catch (error) {
            console.error("Error deleting favorite:", error);
        }
    }

    useEffect(() => {
        console.log(`useEffect running with token ${token}`);
        if (token) {
            fetchFavoriteTrails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const navigateToTrail = (post_id) => {
        navigate(`/posts/${post_id}`);
    }
    if (token) {
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
                                    <button onClick={() => navigateToTrail(trail.post_id)}>View</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteFavorite(trail.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>YOU MUST BE LOGGED IN TO VIEW FAVORITES!</div>
        );
    }
}

export default Favorites;
