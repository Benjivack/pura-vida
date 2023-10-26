import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const fetchLoggedInUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(url, {credentials: 'include'});
    if (response.ok) {
        const data = await response.json();
        setRole(data["role"])
    }
  };

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/users`;
    const response = await fetch(url, {credentials: 'include'});
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchLoggedInUserData();
    if (role === "admin") {
        fetchData();
    }
    }, [role]);

  const navigateToUser = async (username) => {
    navigate(`/users/${username}`);
  };

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>User Details</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                return (
                    <tr key = { user.id }>
                        <td>{ user.id }</td>
                        <td>{ user.username }</td>
                        <td>{ user.email }</td>
                        <td>{ user.role }</td>
                        <td>{ user.joined }</td>
                        <td>
                            <button onClick={()=> navigateToUser(user.username)}>View</button>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
};
export default UsersList;
