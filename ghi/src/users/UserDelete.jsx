import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'


const UserDelete = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  let { username } = useParams();

  const fetchLoggedInUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(url, {credentials: 'include'});
    if (response.ok) {
        const data = await response.json();
        setRole(data["role"])
    }
  };

    useEffect(() => {
        fetchLoggedInUserData();
    }, [role, username]);

    const DeleteUser = async (username) => {
        const url = `${process.env.REACT_APP_API_HOST}/api/users/${username}`;
        const fetchOption = {
            method: 'DELETE',
            credentials: 'include'
        }

        const response = await fetch(url, fetchOption);
        if (response.ok) {
            alert(`${username} account has been deleted`)
        }
    };

    const navigateToUsers = async (username) => {
        DeleteUser(username)
        navigate(`/users/`)
    };

    const navigateToUser = async (username) => {
        navigate(`/users/${username}`)
    };

    return (
      <div>
        <h2> Are you sure you want to delete {username}? </h2>
        <table>
          <thead>
            <tr>
                <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>---</td>
            </tr>
            <tr>
              <td>
                {role === "admin" ? (
                    <button onClick={() => navigateToUsers(username)}>
                        Delete
                    </button>
                ) : null}
              </td>
              <td>        </td>
              <td>        </td>
              <td>
                {role === "admin" ? (
                    <button onClick={() => navigateToUser(username)}>
                        Cancel
                    </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default UserDelete
