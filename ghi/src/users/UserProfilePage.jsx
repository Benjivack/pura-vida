import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const UserProfilePage = () => {
  const [user, setUser] = useState("");

  const [loggedPosts, setLoggedPosts] = useState([]);
  const [loggedReviews, setLoggedReviews] = useState([]);
  const [loggedStatus, setLoggedStatus] = useState([]);
  const [loggedFavorites, setLoggedFavorites] = useState([]);

  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const fetchLoggedInUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(url, {credentials: 'include'});
    if (response.ok) {
        const data = await response.json();
        setUser(data)
    }
  };

  const fetchPostsData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/posts`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      };
  };

  const fetchReviewsData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/review/`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      };
  };

  const fetchStatusData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/status/`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      };
  };

  const fetchFavoriteTrails = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/favorites`
    const response = await fetch(url, {credentials: 'include'});
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      };
  };


  useEffect(() => {
    fetchLoggedInUserData();
    fetchPostsData();
    fetchReviewsData();
    fetchStatusData();
    fetchFavoriteTrails();
  }, []);

  const profileData = async (posts, reviews, status, favorites, user) => {
    const loggedPostList = posts.filter((post) => post.created_by === user.id);
    setLoggedPosts(loggedPostList);

    const loggedReviewsList = reviews.filter((review) => review.user_id === user.id);
    setLoggedReviews(loggedReviewsList);

    const loggedStatusList = status.filter((stat) => stat.user_id === user.id);
    setLoggedStatus(loggedStatusList);

    const loggedFavoritesList = favorites.filter(favorite => favorite.user_id === user.id);
    setLoggedFavorites(loggedFavoritesList);
  };

  useEffect(() => {
    profileData(posts, reviews, status, favorites, user);
  }, [posts, reviews, status, favorites, user]);

  const navigateToPost = (post_id) => {
    navigate(`/posts/${post_id}`)
  };

    return (
      <div>
        <h3>User Info</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.joined}</td>
            </tr>
          </tbody>
        </table>

        <h3>List of Status</h3>
        <table>
          <thead>
            <tr>
              <th>Trail Name</th>
              <th>Condition</th>
              <th>Foot Traffic</th>
              <th>Open?</th>
            </tr>
          </thead>
          <tbody>
                {loggedStatus.map(stat => {
                    return (
                    <tr key = { stat.id }>
                        <td>
                            <button onClick={() => navigateToPost(stat.post_id)}>
                            { stat.title }
                            </button>
                        </td>
                        <td>{ stat.condition }</td>
                        <td>{ stat.foot_traffic }</td>
                        <td>{ stat.is_open }</td>
                    </tr>
                );
                })}
          </tbody>
        </table>

        <h3>List of Favorites</h3>
        <table>
          <thead>
            <tr>
              <th>Trail Name</th>
              <th>Saved On</th>
            </tr>
          </thead>
          <tbody>
                {loggedFavorites.map(favorite => {
                    return (
                    <tr key = { favorite.id }>
                        <td>
                            <button onClick={() => navigateToPost(favorite.post_id)}>
                            { favorite.title }
                            </button>
                        </td>
                        <td>{ favorite.created_at }</td>
                    </tr>
                );
                })}
          </tbody>
        </table>

        <h3>List of Posts</h3>
        <table>
          <thead>
            <tr>
              <th>Trail Name</th>
              <th>Created On</th>
              <th>author</th>
            </tr>
          </thead>
          <tbody>
                {loggedPosts.map(post => {
                    return (
                    <tr key = { post.id }>
                        <td>
                            <button onClick={() => navigateToPost(post.id)}>
                            { post.title }
                            </button>
                        </td>
                        <td>{ post.created_at }</td>
                        <td>{ post.author }</td>
                    </tr>
                );
                })}
          </tbody>
        </table>

        <h3>List of Reviews</h3>
        <table>
          <thead>
            <tr>
              <th>Trail Name</th>
              <th>Review</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
                {loggedReviews.map(review => {
                    return (
                    <tr key = { review.id }>
                        <td>
                            <button onClick={() => navigateToPost(review.post_id)}>
                            { review.title }
                            </button>
                        </td>
                        <td>{ review.body }</td>
                        <td>{ review.created_at }</td>
                    </tr>
                );
                })}
          </tbody>
        </table>

      </div>
    );
}

export default UserProfilePage
