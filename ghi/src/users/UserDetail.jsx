import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'


const UserDetail = () => {
  const [user, setUser] = useState("");
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

  const fetchData = async (username) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/users/${username}`;
    const response = await fetch(url, {credentials: 'include'});
    if (response.ok) {
        const data = await response.json();
        setUser(data);
    }
  };

    useEffect(() => {
        fetchLoggedInUserData();
        if (role === "admin") {
            fetchData(username)
        };
    }, [role, username]);

    const navigateToDelete = async (username) => {
        navigate(`/users/${username}/delete`)
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>{role === "admin" ? "Delete" : null}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.joined}</td>
              <td>
                {role === "admin" ? (
                    <button onClick={() => navigateToDelete(username)}>
                        Delete
                    </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default UserDetail
