import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, useParams } from "react-router-dom";

const StatusList = () => {
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();
  let { post_id } = useParams();

  const fetchData = async (post_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/status/${post_id}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setStatus(data);
    }
  };

  useEffect(() => {
    fetchData(post_id);
    const interval = setInterval(() => {
      fetchData(post_id);
    }, 30000);
    return () => clearInterval(interval);
  }, [post_id]);

  const navigateToPostStatus = async (post_id) => {
    navigate(`/posts/${post_id}`);
  };

  const navigateToCreateStatus = async (post_id) => {
    navigate(`/post/${post_id}/status`);
  };

  return (
    <div>
      {token ? (
        <button onClick={() => navigateToCreateStatus()}>Create Status</button>
      ) : null}
      <table className="table-auto">
        <thead>
          <tr>
            <th>Trail</th>
            <th>Trail Condition</th>
            <th>Foot Traffic</th>
            <th>Is it open?</th>
            <th>Status by</th>
          </tr>
        </thead>
        <tbody>
          {status.map((status) => {
            return (
              <tr key={status.id}>
                <td>{status.title}</td>
                <td>{status.condition}</td>
                <td>{status.foot_traffic}</td>
                <td>{status.is_open}</td>
                <td>{status.username}</td>
                <td>
                  <button onClick={() => navigateToPostStatus(post_id)}>
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
};
export default StatusList;
