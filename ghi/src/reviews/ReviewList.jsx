import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { token } = useToken();

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/review`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const navigateToReview = async (review_id) => {
      navigate(`/reviews/${review_id}`);
    };

    const navigateToCreateReview = async () => {
      navigate(`/review`);
    };

    return (
      <div>
        {token ? (
          <button onClick={() => navigateToCreateReview()}>Create Review</button>
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Trail Rating</th>
              <th>Trail Id</th>
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