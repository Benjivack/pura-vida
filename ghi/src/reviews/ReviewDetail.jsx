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
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              <button
                className="m-4 bg-red-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigateToReviews(review_id)}
              >
                Delete
              </button>
            </td>
            <td> </td>
            <td> </td>
            <td>
              <button
                className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigateToReview()}
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReviewDetail;
