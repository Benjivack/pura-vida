import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const fetchData = async (setPost, post_id) => {
  const url = `${process.env.REACT_APP_API_HOST}/api/posts/${post_id}`;
  const response = await fetch(url, { credentials: "include" });
  if (response.ok) {
    const data = await response.json();
    setPost(data);
  }
};

const PostDetail = () => {
  let { post_id } = useParams();
  const [post, setPost] = useState("");
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(setPost, post_id);
  }, [setPost, post_id]);

  console.log(post_id);
  const navigateToCreateReview = async (post_id) => {
    navigate(`/posts/${post_id}/review`);
  };
  const navigateToReviewList = async (post_id) => {
    navigate(`/posts/${post_id}/reviews`);
  };

  const navigateToStatusList = async (post_id) => {
    navigate(`/posts/${post_id}/statuses`);
  };

  const navigateToCreateStatus = async (post_id) => {
    navigate(`/posts/${post_id}/status`);
  };
  return (
    <div>
      {token ? (
        <button onClick={() => navigateToCreateReview(post_id)}>
          Create Review
        </button>
      ) : null}
      {token ? (
        <button onClick={() => navigateToReviewList(post_id)}>
          Review List
        </button>
      ) : null}
      <button onClick={() => navigateToStatusList(post_id)}>
        Trail Status
      </button>
      {token ? (
        <button onClick={() => navigateToCreateStatus(post_id)}>
          Create Status
        </button>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Zipcode</th>
            <th>Body</th>
            <th>Created By</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{post.title}</td>
            <td>{post.latitude}</td>
            <td>{post.longitude}</td>
            <td>{post.zipcode}</td>
            <td>{post.body}</td>
            <td>{post.created_by}</td>
            <td>{post.created_at}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostDetail;
