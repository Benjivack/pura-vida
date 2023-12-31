import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ReviewForm() {
  const [body, setBody] = useState([]);
  const [rating, setRating] = useState([]);
  const [user_id, setUser] = useState([]);
  const { token } = useToken();
  let { post_id } = useParams();
  const navigate = useNavigate();

  const getUser = async () => {
    const userUrl = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(userUrl, { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      setUser(data["id"]);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const reviewData = {
      body: body,
      rating: rating,
      user_id: user_id,
      post_id: post_id,
      created_at: `${year}-${month}-${day}`,
    };

    const reviewUrl = `${process.env.REACT_APP_API_HOST}/api/review`;
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    };
    const response = await fetch(reviewUrl, fetchOption);
    if (response.ok) {
      event.target.reset();
      navigate(`/posts/${post_id}/reviews`);
    }
  };

  if (token) {
    return (
      <div className="w-full max-w-xs">
        <h5 className="card-header">New Review</h5>
        <div className="card-body">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Body
              </label>
              <input
                name="body"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Body"
                onChange={(event) => {
                  setBody(event.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Rating
              </label>
              <input
                name="rating"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1 - 5"
                onChange={(event) => {
                  setRating(event.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="Create Review"
              />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>YOU MUST BE LOGGED IN TO CREATE A REVIEW!</div>;
  }
}

export default ReviewForm;
