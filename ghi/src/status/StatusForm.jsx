import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";

const StatusForm = () => {
  let { post_id } = useParams();
  const [userId, setUserId] = useState("");
  //   const [postId, setPostId] = useState("");
  const [condition, setCondition] = useState("");
  const [footTraffic, setFootTraffic] = useState("");
  const [isOpen, setIsOpen] = useState("");
  const { token } = useToken();

  const getUserId = async () => {
    const userUrl = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(userUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setUserId(data["id"]);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  //   const getPostId = async () => {
  //     const postUrl = `${process.env.REACT_APP_API_HOST}/api/posts/${post_id}`;
  //     const response = await fetch(postUrl, { credentials: "include" });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setPostId(data["id"]);
  //     }
  //   };
  //   useEffect(() => {
  //     getPostId();
  //   }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      user_id: userId,
      post_id: post_id,
      condition: condition,
      foot_traffic: footTraffic,
      is_open: isOpen,
    };
    console.log(data);
    const statusUrl = `${process.env.REACT_APP_API_HOST}/api/status`;
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(statusUrl, fetchOption);
    if (response.ok) {
      event.target.reset();
    }
  };
  if (token) {
    return (
      <div className="card text-bg-light mb-3">
        <h5 className="card-header">Create Status</h5>
        <div className="card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Condition</label>
              <input
                name="condition"
                type="number"
                className="form-control"
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Foot Traffic</label>
              <input
                name="foot_traffic"
                type="number"
                className="form-control"
                onChange={(e) => {
                  setFootTraffic(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Is Open</label>
              <input
                name="is_open"
                type="number"
                className="form-control"
                onChange={(e) => {
                  setIsOpen(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="btn btn-primary"
                type="submit"
                value="Create Status"
              />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>YOU MUST BE LOGGED IN TO CREATE A STATUS!</div>;
  }
};
export default StatusForm;
