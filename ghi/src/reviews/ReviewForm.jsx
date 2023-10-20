import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";


function ReviewForm() {
    const [body, setBody] = useState([])
    const [rating, setRating] = useState([])
    const [user_id, setUser] = useState([])
    const { token } = useToken();
    let { post_id } = useParams();

    const getUser = async () => {
        const userUrl = `${process.env.REACT_APP_API_HOST}/api/user`
        const response = await fetch(
            userUrl,
            {credentials: "include",}
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data["id"])
        }
    }

    useEffect(()=>{
        getUser()
    }, [])

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
            created_at: `${year}-${month}-${day}`
        };

        const reviewUrl = `${process.env.REACT_APP_API_HOST}/api/review`;
        const fetchOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
        }
        const response = await fetch(reviewUrl, fetchOption);
        if (response.ok) {
            event.target.reset();
        }
    }


    if (token) {
      return (
        <div className="card text-bg-light mb-3">
          <h5 className="card-header">Create Review</h5>
          <div className="card-body">
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="mb-3">
                <label className="form-label">body</label>
                <input
                  name="body"
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setBody(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">rating</label>
                <input
                  name="rating"
                  type="number"
                  className="form-control"
                  onChange={(event) => {
                    setRating(event.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  className="btn btn-primary"
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

export default ReviewForm