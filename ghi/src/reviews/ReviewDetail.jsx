import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ReviewDetail = () => {
  let param = useParams();
  let { review_id } = useParams();
  let { post_id } = useParams();
  const navigate = useNavigate();

  console.log(param);
  console.log("HIII THIS IS THE REVIEW DETAIL!!!");

  const DeleteReview = async (review_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/review/${review_id}`;
    const fetchOption = {
      method: "DELETE",
      credentials: "include",
    };

    const response = await fetch(url, fetchOption);
    if (response.ok) {
      alert(`${review_id} review has been deleted`);
    }
  };

  const navigateToReviews = async (review_id) => {
    DeleteReview(review_id);
    navigate(`/posts/${post_id}/reviews`);
  };
  const navigateToReview = async () => {
    navigate(`/posts/${post_id}/reviews`);
  };
  return (
    <div>
      <h2> Are you sure you want to delete review? </h2>
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>---</td>
          </tr>
          <tr>
            <td>
              <button onClick={() => navigateToReviews(review_id)}>Delete</button>
            </td>
            <td> </td>
            <td> </td>
            <td>
              <button onClick={() => navigateToReview()}>Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReviewDetail;
