import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function AddFavoriteForm() {
    const [trailId, setTrailId] = useState([]);
    const [userId, setUserId] = useState([]);
    const { token } = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        const jsDate = new Date();
        const isoDate = jsDate.toISOString().split('T')[0];
        const favoriteData = {
            post_id: trailId,
            user_id: userId,
            created_at: isoDate
        };
        console.log(favoriteData);

        const favoriteUrl = `${process.env.REACT_APP_API_HOST}/api/favorites`;
        console.log(favoriteUrl);
        const fetchOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(favoriteData)
        };
        const response = await fetch(favoriteUrl, fetchOption);
        if (response.ok) {
            event.target.reset();
            navigate("/favorites");
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    };
    if (token) {
        return (
          <div className="w-full max-w-xs">
            <h5 className="card-header">Create Favorite</h5>
            <div className="card-body">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={(event) => handleSubmit(event)}
              >
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Trail ID
                  </label>
                  <input
                    name="trailId"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="##"
                    onChange={(event) => {
                      setTrailId(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    User
                  </label>
                  <input
                    name="userId"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="User Id"
                    onChange={(event) => {
                      setUserId(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    value="Add Favorite"
                  />
                </div>
              </form>
            </div>
          </div>
        );
    } else {
        return (
            <div>YOU MUST BE LOGGED IN TO ADD A FAVORITE!</div>
        );
    }
}

export default AddFavoriteForm;
