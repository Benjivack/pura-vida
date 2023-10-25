import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();
  let { post_id } = useParams();

  const getData = async (post_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/review/${post_id}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setReviews(data);
    }
  };

  useEffect(() => {
    getData(post_id);
  }, [post_id]);

  const navigateToReview = async (review_id) => {
    navigate(`/${post_id}/reviews/${review_id}`);
  };

  const navigateToCreateReview = async () => {
    navigate(`/posts/${post_id}/review`);
  };
  const navigateToPost = async () => {
    navigate(`/posts/${post_id}`);
  };

  return (
    <div>
      {token ? (
        <button onClick={() => navigateToCreateReview()}>Create Review</button>
      ) : null}
      {token ? <button onClick={() => navigateToPost()}>Post</button> : null}
      <table>
        <thead>
          <tr>
            <th>Trail Rating</th>
            <th>Trail Name</th>
            <th>Created By</th>
            <th>Review Body</th>
            <th>Delete Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => {
            return (
              <tr key={review.id}>
                <td>{review.rating}</td>
                <td>{review.title}</td>
                <td>{review.username}</td>
                <td>{review.body}</td>
                <td>
                  <button onClick={() => navigateToReview(review.id)}>
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;
