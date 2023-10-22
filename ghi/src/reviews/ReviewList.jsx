import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { token } = useToken();
    let { post_id } = useParams();


      const getReviews = async (post_id) => {
          const url = `${process.env.REACT_APP_API_HOST}/api/review/${post_id}`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setReviews(data);
          }
      }

    useEffect(() => {
      getReviews(post_id);
    }, [post_id]);

    const navigateToReview = async (review_id) => {
      navigate(`/reviews/${review_id}`);
    };

    const navigateToCreateReview = async () => {
      navigate(`/posts/${post_id}/review`);
    };
    // const navigateToPost = async (post_id) => {
    //   navigate(`/posts/${post_id}`);
    // };

    return (
      <div>
        {token ? (
          <button onClick={() => navigateToCreateReview()}>
            Create Review
          </button>
        ) : null}
        {/* {token ? (
          <button onClick={() => navigateToPost()}>
            Post
          </button>
        ) : null} */}
        <table>
          <thead>
            <tr>
              <th>Trail Rating</th>
              <th>Trail Name</th>
              <th>View Review</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => {
              return (
                <tr key={review.id}>
                  <td>{review.rating}</td>
                  <td>{review.post_id}</td>
                  <td>
                    <button onClick={() => navigateToReview(review.id)}>
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default ReviewList