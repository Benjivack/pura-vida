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
            <div className="card text-bg-light mb-3">
                <h5 className="card-header">Create Favorite</h5>
                <div className="card-body">
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="mb-3">
                            <label className="form-label">Trail ID</label>
                            <input
                                name="trailId"
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setTrailId(event.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">User</label>
                            <input
                                name="userId"
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setUserId(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <input
                                className="btn btn-primary"
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
