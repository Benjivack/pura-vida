import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const PostsForm = () => {
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [zipcode, setZipcode] = useState("");
  const [body, setBody] = useState("");
  const [created_by, setCreatedBy] = useState("");
  const { token } = useToken();
  const navigate = useNavigate();

  const fetchData = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/user`;
        // const fetchUserOption = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // }
        const response = await fetch(url, {credentials: 'include'});
        if (response.ok) {
          const data = await response.json();
          setCreatedBy(data["id"]);
        }
    }

  useEffect(() => {
        fetchData();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const _date = new Date();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();
    const year = _date.getFullYear();

    const postData = {
      title: title,
      latitude: latitude,
      longitude: longitude,
      zipcode: zipcode,
      body: body,
      created_by: created_by,
      created_at: `${year}-${month}-${day}`
    };

    const postUrl = `${process.env.REACT_APP_API_HOST}/api/posts`;
    const fetchOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    }
    const response = await fetch(postUrl, fetchOption);
    if (response.ok) {
        e.target.reset();
        navigate("/posts");
    }
  };


  if (token) {
      return (
        <div className="w-full max-w-xs">
          <h5 className="card-header">Create Post</h5>
          <div className="card-body">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  name="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Latitude
                </label>
                <input
                  name="latitude"
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Latitude"
                  onChange={(e) => {
                    setLatitude(e.target.value);
                  }}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Longitude
                </label>
                <input
                  name="longitude"
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Longitude"
                  onChange={(e) => {
                    setLongitude(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Zipcode
                </label>
                <input
                  name="zipcode"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="5 Digit Zipcode"
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Body
                </label>
                <input
                  name="body"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Body"
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="Create Post"
                />
              </div>
            </form>
          </div>
        </div>
      );
  } else {
    return (
        <div>
            YOU MUST BE LOGGED IN TO CREATE A POST!
        </div>
    )
  }
};

export default PostsForm;
