import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const StatusList = () => {
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/status`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setStatus(data);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navigateToPostStatus = async (status_id) => {
    navigate(`/post/${status_id}`);
  };

  const navigateToCreateStatus = async (post_id) => {
    navigate(`/post/${post_id}/statusform`);
  };

  return (
    <div>
      {token ? (
        <button onClick={() => navigateToCreateStatus()}>Create Status</button>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>Trail Rating</th>
            <th>Trail Id</th>
            <th>View Review</th>
          </tr>
        </thead>
        <tbody>
          {status.map((status) => {
            return (
              <tr key={status.id}>
                <td>{status.rating}</td>
                <td>{status.post_id}</td>
                <td>
                  <button onClick={() => navigateToPostStatus(status.id)}>
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
