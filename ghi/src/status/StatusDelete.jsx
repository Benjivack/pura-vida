import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const StatusDelete = () => {
  const [logger, setLogger] = useState("");
  const navigate = useNavigate();
  let { status_title, status_user_id, status_id } = useParams();

  const fetchLoggedInUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setLogger(data);
    }
  };

  useEffect(() => {
    fetchLoggedInUserData();
  }, []);

  const DeleteUser = async (status_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/status/${status_id}`;
    const fetchOption = {
      method: "DELETE",
      credentials: "include",
    };

    const response = await fetch(url, fetchOption);
    if (response.ok) {
      alert(`${status_title}'s status has been deleted`);
    }
  };

  const navigateToProfile = async (status_id) => {
    DeleteUser(status_id);
    navigate("/profile");
  };

  return (
    <div>
      <h2> Are you sure you want to delete {status_title}'s status? </h2>
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td>---</td>
          </tr>
          <tr>
            <td>
              {status_user_id === `${logger.id}` ? (
                <button
                  className="m-4 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => navigateToProfile(status_id)}
                >
                  Delete
                </button>
              ) : null}
            </td>
            <td> </td>
            <td> </td>
            <td>
              {status_user_id === `${logger.id}` ? (
                <button
                  className="m-4 bg-gray-300 hover:bg-blue-300 text-black font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatusDelete;
