import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const [favoriteTrails, setFavoriteTrails] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { token } = useToken();
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    const fetchLoggedInUserData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/user`;
      const response = await fetch(url, {credentials: 'include'});
      if (response.ok) {
          const data = await response.json();
          setUser(data)
      }
    };

    const fetchFavoriteTrails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/favorites`, {
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
                setFavoriteTrails(prevFavorites => prevFavorites.filter(favorite => favorite.id !== favorites_id));
            }
        } catch (error) {
            console.error("Error deleting favorite:", error);
        }
    }

    useEffect(() => {
        console.log(`useEffect running with token ${token}`);
            fetchLoggedInUserData();
            fetchFavoriteTrails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const MyFavoritesData = async (favoriteTrails) => {
      const myFavoritesList = favoriteTrails.filter(favorite => favorite.user_id === user.id);
      setFavorites(myFavoritesList);
    };

  useEffect(() => {
    MyFavoritesData(favoriteTrails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteTrails]);

    const navigateToTrail = (post_id) => {
        navigate(`/posts/${post_id}`);
    }
    if (token) {
        return (
          <div>
            <h2>Favorites</h2>
            <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <thead>
                <tr>
                  <th className="p-4">Trail Name</th>
                  <th className="p-4">View Trail</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((trail) => (
                  <tr key={trail.id}>
                    <td className="p-4">{trail.title}</td>
                    <td className="p-4">
                      <button onClick={() => navigateToTrail(trail.post_id)}>
                        View
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        className="m-4 bg-red-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => deleteFavorite(trail.id)}
                      >
                        Delete
                      </button>
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
